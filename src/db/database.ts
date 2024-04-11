import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("tarija_dialoga", "ronaru", "@ronaru86iDP", {
    host: "localhost",
    port: 5456,
    dialect: "postgres",
});

export default sequelize;
