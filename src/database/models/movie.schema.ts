import { Movie } from "@/app/movie/domainModels/movie";
import { sequelizeClient } from "@/database/sequelize";
import { DataTypes, Model } from "sequelize";
import dayjs from "dayjs";
import userModel from "@/database/models/user.schema";
import { MOVIES_TABLE_NAME } from "@/database/constants";
export interface MovieModelType extends Movie, Model<Movie> {}

// define movie model
export const movieModel = sequelizeClient.define<MovieModelType>(
    MOVIES_TABLE_NAME,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            field: "title",
            type: DataTypes.STRING,
            allowNull: false,
        },
        poster: {
            field: "poster",
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            field: "year",
            type: DataTypes.INTEGER,
            defaultValue: false,
            allowNull: false,
        },
        createdAt: {
            field: "created_at",
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: dayjs().unix(),
        },
        createdById: {
            field: "created_by_id",
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        updatedAt: {
            field: "updated_at",
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: dayjs().unix(),
        },
        updatedById: {
            field: "updated_by_id",
            type: DataTypes.UUID,
            allowNull: false,
        },
    }
);

movieModel.belongsTo(userModel, {
    foreignKey: "created_by_id",
});

export default movieModel;
