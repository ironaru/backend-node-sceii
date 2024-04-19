"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const PORT = 18020;
const HOST = "181.188.156.195";
const DIALECT = "postgres";
const NAME_DATABASE = "tarijaDialogo";
const USER_DATABASE = "xxxusxrdialogo";
const PASS_DATABASE = "tarija2024";
exports.sequelize = new sequelize_1.Sequelize(NAME_DATABASE, USER_DATABASE, PASS_DATABASE, {
    host: HOST,
    port: PORT,
    dialect: DIALECT,
    logging: false,
});
exports.default = exports.sequelize;
//# sourceMappingURL=database.js.map