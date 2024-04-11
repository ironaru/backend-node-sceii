const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Personas = sequelize.define("personas", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombres: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false
        },
        residencia: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        organizacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ci: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        plan: {
            type: DataTypes.STRING,
            allowNull: false
        },
        celular: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
      timestamps: false,
    }
);

module.exports = Personas;