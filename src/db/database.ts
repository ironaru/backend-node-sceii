import { Sequelize } from "sequelize";

const PORT = 18020;
const HOST = "181.188.156.195";
const DIALECT = "postgres";

const NAME_DATABASE = "tarijaDialogo";
const USER_DATABASE = "xxxusxrdialogo";
const PASS_DATABASE = "tarija2024";

export const sequelize = new Sequelize(NAME_DATABASE, USER_DATABASE, PASS_DATABASE, {
    host: HOST,
    port: PORT,
    dialect: DIALECT,
    logging: false,
});

export default sequelize;
