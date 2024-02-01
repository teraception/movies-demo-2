import { Auditor } from "@/types/common";

export interface User extends Pick<Auditor, "createdAt" | "updatedAt"> {
    id: string;
    authId: string;
    firstName: string;
    lastName: string;
    email: string;
}
