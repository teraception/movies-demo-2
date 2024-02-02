import { getUser } from "@/app/api/auth/[...nextauth]/helper";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const token = req.headers.get("Authorization").split(" ")[1];
    cookies().set("auth", token);

    return NextResponse.json(await getUser());
};

export const DELETE = async (req: NextRequest) => {
    cookies().delete("auth");
    return NextResponse.json(null);
};
