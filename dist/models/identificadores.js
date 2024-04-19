"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../db/database"));
class Identificadores extends sequelize_1.Model {
}
Identificadores.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    codigo_qr: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "codigo_qr"
    },
    persona_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        field: "persona_id",
        unique: true
    }
}, {
    timestamps: false,
    tableName: 'identificadores',
    sequelize: database_1.default,
    paranoid: true
});
exports.default = Identificadores;
//# sourceMappingURL=identificadores.js.map