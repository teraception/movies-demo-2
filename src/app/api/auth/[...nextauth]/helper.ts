import envConfig from "@/config/config";
import { AuthOptions, getServerSession } from "next-auth";
import jwt, { JwtPayload } from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies, headers } from "next/headers";
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
        `https://cognito-idp.${config.aws.region}.amazonaws.com/${config.cognitoAuth.userPoolId}/.well-known/jwks.json`,
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
                    reject(err);
                } else {
                    const decodedToken = decoded as JwtPayload;

                    resolve(decodedToken);
                }
            }
        );
    });
}

export function getToken() {
    let token = cookies().get("auth")?.value;
    if (!token) {
        token = headers().get("authorization")?.split(" ")[1];
    }
    return token;
}

export async function getUser() {
    const decodedToken = await verifyAndDecodeToken(getToken());
    console.log(`🚀 ~ getUser ~ decodedToken:`, decodedToken);

    const user = await userService.getUserByAuthID(decodedToken.sub);
    return user;
}
