import { User } from "@/app/user/domainModels/user";
import { USERS_TABLE_NAME } from "@/database/constants";
import { sequelizeClient } from "@/database/sequelize";
import { DataTypes, Model } from "sequelize";

interface UserModelType extends User, Model<User> {}

export const userModel = sequelizeClient.define<UserModelType>(
    USERS_TABLE_NAME,
    {
        id: {
            defaultValue: DataTypes.UUIDV4,
            type: DataTypes.UUID,
            field: "id",
            allowNull: false,
            primaryKey: true,
        },

        authId: {
            field: "auth_id",
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        firstName: {
            field: "first_name",
            type: DataTypes.STRING,
        },
        lastName: {
            field: "last_name",
            type: DataTypes.STRING,
        },
        email: {
            field: "email",
            type: DataTypes.STRING,
        },
        createdAt: {
            field: "created_at",
            allowNull: false,
            type: DataTypes.NUMBER,
        },
        updatedAt: {
            field: "updated_at",
            allowNull: false,
            type: DataTypes.NUMBER,
        },
    }
);
export default userModel;
