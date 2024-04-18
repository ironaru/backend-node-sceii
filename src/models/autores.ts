import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../db/database';

interface AutoresAtributos {
    id: number;
    autor: string;
    pais: string;
    descripcion: string;
    bibliografia: string;
    tema: string;
    foto:string;
}

export interface AutoresInput extends Optional<AutoresAtributos, "id"> { }
export interface AutoresOutput extends Required<AutoresAtributos> { }

class Autores extends Model<AutoresAtributos, AutoresOutput> implements AutoresAtributos {
    id!: number;
    autor!: string;
    pais!: string;
    descripcion!: string;
    bibliografia!: string;
    tema!: string;
    foto!: string;
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
        allowNull: false,
        unique: false,
        field: "pais"
    },
    descripcion:{
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false,
        field: "descripcion"
    },
    bibliografia:{
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false,
        field: "bibliografia"
    },
    tema: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false,
        field: "tema"
    },foto: {
        type: DataTypes.TEXT,
        allowNull: false,
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