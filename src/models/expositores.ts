import { DataTypes, InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize";
import sequelize from '../db/database';

class Expositores extends Model<InferAttributes<Expositores>, InferCreationAttributes<Expositores>> {
    declare id: number;
    declare autor: string;
    declare pais: string;
    declare descripcion: string;
    declare bibliografia: string;
    declare tema: string;
    declare foto: string;
}
Expositores.init({
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
    tableName: 'expositores',
    sequelize: sequelize,
    paranoid: true
});


export default Expositores;