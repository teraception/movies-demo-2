import envConfig from "@/config/config";
import { AuthOptions, getServerSession } from "next-auth";
import jwt, { JwtPayload } from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";
import { headers } from "next/headers";
import config from "@/config/config";
import { jwtDecode } from "jwt-decode";
import jwkToPem from "jwk-to-pem";
import * as userService from "@/app/user/services/service";
import { User } from "@/app/user/domainModels/user";

function extractTokenFromHeader(): string {
    const [type, token] = headers().get("authorization")?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
}
export async function verifyAndDecodeToken(token: string) {
    const resp = await fetch(
        `https://cognito-idp.${config.aws.region}.amazonaws.com/${config.aws.userPoolId}/.well-known/jwks.json`,
        {
            method: "get",
        }
    );
    const jwtKey = await resp.json();
    const decoded = jwtDecode(token, {
        header: true,
    });
    const keyId = decoded.kid;
    const matchedKey = jwtKey.keys.find(
        (x: { kid: string }) => x.kid === keyId
    );
    const pem: jwt.Secret | jwt.GetPublicKeyOrSecret =
        matchedKey && jwkToPem(matchedKey);

    return new Promise<JwtPayload>((resolve, reject) => {
        jwt.verify(
            token,
            pem,
            { algorithms: ["RS256"] },
            async function (err, decoded) {
                if (err) {
                    reject(null);
                } else {
                    const decodedToken = decoded as JwtPayload;

                    resolve(decodedToken);
                }
            }
        );
    });
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(
                credentials: Record<"email" | "password", string> | undefined,
                req
            ) {
                const token = extractTokenFromHeader();
                const decodedToken = await verifyAndDecodeToken(token);
                const userId = decodedToken["sub"];
                const user = await userService.getUserByAuthID(userId);
                return user;
            },
        }),
    ],
    secret: envConfig.nextAuthSecretKey,
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user, account }) {
            if (typeof user !== "undefined") {
                return { ...token, ...user };
            }
            return token;
        },
        async session({ session, token, user }) {
            const sanitizedToken = Object.keys(token).reduce((p, c) => {
                // strip unnecessary properties
                if (
                    c !== "iat" &&
                    c !== "exp" &&
                    c !== "jti" &&
                    c !== "apiToken"
                ) {
                    return { ...p, [c]: token[c] };
                } else {
                    return p;
                }
            }, {});
            return {
                ...session,
                user: sanitizedToken,
                apiToken: token.apiToken,
            };
        },
    },
};

export async function getUser() {
    const session = await getServerSession(authOptions);
    const user = session?.user as User;
    return user;
}
