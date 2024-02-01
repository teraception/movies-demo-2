import userModel from "@/database/models/user.schema";

export async function getUserByAuthId(authId: string) {
    const user = await userModel.findOne({
        where: { authId: authId },
    });
    return user ? user.toJSON() : null;
}
