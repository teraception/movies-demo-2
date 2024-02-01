import pg from "pg";
import { Sequelize } from "sequelize";
import config from "@/config/config";

export const sequelizeClient = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
        host: config.database.host,
        port: parseInt(config.database.port),
        dialect: "postgres",

        dialectModule: pg,

        define: {
            timestamps: false,
            freezeTableName: true,
        },
        logging: false,
    }
);

sequelizeClient
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });
export default sequelizeClient;
