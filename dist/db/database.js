"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
require('dotenv').config();
const databaseUrl = process.env.DATABASE_URL;
exports.sequelize = new sequelize_1.Sequelize(databaseUrl, {
    logging: false
});
exports.default = exports.sequelize;
//# sourceMappingURL=database.js.map