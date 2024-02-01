import * as userRepo from "@/app/user/repositories/user";

export async function getUserByAuthID(id: string) {
    return await userRepo.getUserByAuthId(id);
}
