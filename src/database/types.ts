import { QueryInterface } from "sequelize";

export interface MigratorJobContext {
    seeder?: any;
    queryInterface: QueryInterface;
}
