import dayjs from "dayjs";
import pg from "pg";
import { Sequelize } from "sequelize";
import config from "@/config/config";


const idleTIme = 1000 * (5 * 60);

export const sequelizeClient = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
        host: config.database.host,
        port: parseInt(config.database.port),
        dialect: "postgres",

        dialectModule: pg,
        dialectOptions: {
            ssl: config.database.enableTLS,
        },
        pool: {
            idle: idleTIme,
            acquire: 30 * 1000,
            max: config.database.maxConnections,
        },
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
export default initDatabase;
