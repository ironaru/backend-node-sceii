import { Sequelize } from "sequelize";

const PORT = 5456;
const HOST = "127.0.0.1";
const DIALECT = "postgres";

const NAME_DATABASE = "tarija_dialoga";
const USER_DATABASE = "ronaru";
const PASS_DATABASE = "@ronaru86iDP";

export const sequelize = new Sequelize(NAME_DATABASE, USER_DATABASE, PASS_DATABASE, {
    host: HOST,
    port: PORT,
    dialect: DIALECT,
    logging: false,
});

export default sequelize;
