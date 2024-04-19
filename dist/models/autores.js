"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../db/database"));
class Autores extends sequelize_1.Model {
}
Autores.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    autor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false,
        field: "autor"
    },
    pais: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        unique: false,
        field: "pais"
    },
    descripcion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        unique: false,
        field: "descripcion"
    },
    bibliografia: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        unique: false,
        field: "bibliografia"
    },
    tema: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        unique: false,
        field: "tema"
    }, foto: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        unique: false,
        field: "foto"
    }
}, {
    timestamps: false,
    tableName: 'autores',
    sequelize: database_1.default,
    paranoid: true
});
exports.default = Autores;
//# sourceMappingURL=autores.js.map