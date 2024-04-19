"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartupsResultados = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../db/database"));
const personas_1 = __importDefault(require("./personas"));
class StartupsResultados {
}
exports.StartupsResultados = StartupsResultados;
class Startups extends sequelize_1.Model {
}
Startups.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "nombre"
    },
    foto: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        unique: false,
        field: "foto"
    },
    descripcion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        unique: true,
        field: "descripcion"
    }
}, {
    timestamps: false,
    tableName: 'startups',
    sequelize: database_1.default,
    paranoid: true
});
const Personas_Startups = database_1.default.define('personas_startups', {}, { timestamps: false });
personas_1.default.belongsToMany(Startups, { foreignKey: 'persona_id', through: Personas_Startups });
Startups.belongsToMany(personas_1.default, { foreignKey: 'startup_id', through: Personas_Startups });
exports.default = Startups;
//# sourceMappingURL=startups.js.map