import { authOptions } from "@/app/api/[...nextauth]/helper";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
