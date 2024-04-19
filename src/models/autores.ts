import { DataTypes, InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize";
import sequelize from '../db/database';

class Autores extends Model<InferAttributes<Autores>, InferCreationAttributes<Autores>> {
    declare id: number;
    declare autor: string;
    declare pais: string;
    declare descripcion: string;
    declare bibliografia: string;
    declare tema: string;
    declare foto: string;
}
Autores.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        field: "autor"
    },
    pais: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
        field: "pais"
    },
    descripcion:{
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
        field: "descripcion"
    },
    bibliografia:{
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
        field: "bibliografia"
    },
    tema: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
        field: "tema"
    },foto: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
        field: "foto"
    }

}, {
    timestamps: false,
    tableName: 'autores',
    sequelize: sequelize,
    paranoid: true
});


export default Autores;