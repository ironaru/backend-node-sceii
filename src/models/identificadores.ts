import { DataTypes, InferAttributes, InferCreationAttributes, Model, Optional } from 'sequelize';
import sequelize from '../db/database';

class Identificadores extends Model<InferAttributes<Identificadores>, InferCreationAttributes<Identificadores>> {
    declare id: number;
    declare codigo_qr: string;
    declare persona_id: number;
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
        field: "persona_id",
        unique: true
    }
}, {
    timestamps: false,
    tableName: 'identificadores',
    sequelize: sequelize,
    paranoid: true
});

export default Identificadores;
