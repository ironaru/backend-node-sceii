import { Sequelize } from "sequelize";

require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL as string;
export const sequelize = new Sequelize(databaseUrl,{
    logging:false,
    timezone:"America/La_Paz"
});

export default sequelize;
