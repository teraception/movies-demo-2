import type { Metadata } from "next";
import "./globals.css";
import "@/config/config";
import Image from "next/image";
import backgroundImg from "@/../public/img/bg-bottom-bar.png";
import { CognitoContextProvider } from "@/app/cognito";
import { LoggedInUserContextProvider } from "@/app/context/loggedInUserContextProvider";

export const metadata: Metadata = {
    title: "Movies App",
    description: "App to create and edit movies",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const session = await getServerSession(authOptions);
    // const heads = headers();

    return (
        <html lang="en">
            <body
                className={`flex flex-col bg-appBg min-h-screen relative text-white gap-12`}>
                <LoggedInUserContextProvider>
                    <CognitoContextProvider>
                        {children}
                        <div className="mt-auto  left-0 right-0 bottom-0">
                            <Image
                                alt=""
                                width="1920"
                                height="1080"
                                src={backgroundImg}
                                className="w-full"
                            />
                        </div>
                    </CognitoContextProvider>
                </LoggedInUserContextProvider>
            </body>
        </html>
    );
}
