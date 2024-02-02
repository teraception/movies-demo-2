"use client";
import React from "react";
import AppButton from "../form/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import addIcon from "@/../public/img/add-btn.png";
import logoutIcon from "@/../public/img/logout.png";
import { useLoggedInUser } from "@/app/context/loggedInUserContextProvider";
import { useAuth } from "@/app/cognito";

export const Header: React.FC = () => {
    const { loggedInUser } = useLoggedInUser();
    const { logout } = useAuth();

    const router = useRouter();
    async function logoutUser() {
        console.log("logging out");
        signOut();
    }
    return (
        <div>
            <div className="flex items-center gap-1 pt-8">
                <h2 className="text-h2 font-semibold">My movies</h2>
                <Link href="/movie" className="mt-1">
                    <Image
                        alt="Add new image"
                        src={addIcon}
                        width="30"
                        height="30"
                    />
                </Link>
                {loggedInUser && (
                    <div
                        onClick={() => logout()}
                        className="cursor-pointer ml-auto  flex items-center justify-end gap-2">
                        <span className="text-[16px] font-bold hidden md:block">
                            Logout
                        </span>
                        <Image
                            src={logoutIcon}
                            alt="LogoutImg"
                            width="30"
                            height="30"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
