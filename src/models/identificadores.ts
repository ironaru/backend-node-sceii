import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/database';
import Personas from './personas';

interface IdentificadoresAtributos {
    id: number;
    codigo_qr: string;
    persona_id: number;
}

export interface IdentificadoresInput extends Optional<IdentificadoresAtributos, "id"> { }
export interface IdentificadoresOutput extends Required<IdentificadoresAtributos> { }

class Identificadores extends Model<IdentificadoresAtributos, IdentificadoresInput> implements IdentificadoresAtributos {
    id!: number;
    codigo_qr!: string;
    persona_id!: number;
}

Identificadores.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    codigo_qr: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "codigo_qr"
    },
    persona_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "persona_id"
    }
}, {
    timestamps: false,
    tableName: 'identificadores',
    sequelize: sequelize,
    paranoid: true
});



export default Identificadores;
