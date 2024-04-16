import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../db/database';
import Identificadores from './identificadores';

interface PersonasAtributos {
    id: number;
    nombres: string;
    apellidos: string;
    residencia: string;
    correo: string;
    organizacion: string;
    ci:number;
    plan:string;
    celular:string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface PersonasInput extends Optional<PersonasAtributos, 'id'> {} 
export interface PersonasOutput extends Required<PersonasAtributos> {}

class Personas extends Model<PersonasAtributos, PersonasInput> implements PersonasAtributos {
    id!: number;
    nombres!: string;
    apellidos!: string;
    residencia!: string;
    correo!: string;
    organizacion!: string;
    ci!: number;
    plan!: string; 
    celular!: string;
    readonly createdAt!: Date;
    readonly updatedAt!: Date;
    readonly deletedAt!: Date;
}
Personas.init({
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
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field:"created_at"
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field:"updated_at"
        },
        deletedAt: { 
            type: DataTypes.DATE,
            allowNull: true,
            field:"deleted_at"
        }
    }, {
        tableName: "personas",
        timestamps: true,
        sequelize: sequelize,
        paranoid: true
    }
)

export default Personas;