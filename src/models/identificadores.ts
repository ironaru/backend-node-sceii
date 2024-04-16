import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../db/database';
import Personas from './personas';

interface IdentificadoresAtributos {
    id: number;
    codigoQr: string;
}

export interface IdentificadoresInput extends Optional<IdentificadoresAtributos, "id"> {} 
export interface IdentificadoresOutput extends Required<IdentificadoresAtributos> {}

class Identificadores extends Model<IdentificadoresAtributos, IdentificadoresInput> implements IdentificadoresAtributos {
    id!: number;
    codigoQr!: string;
}

Identificadores.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        codigoQr: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field:"codigo_qr"
        }
        
    }, {
        timestamps: false,
        tableName: 'identificadores',
        sequelize: sequelize,
        paranoid: true
    }
)

// Identificadores.hasOne(Personas, {
//     foreignKey: "persona",
//     sourceKey: "id",
//     as: "Personas"
    
// });
// Personas.belongsTo(Identificadores);
Identificadores.hasOne(Personas, {
    foreignKey: "identificador_id",
    sourceKey: "id",
  });
Personas.belongsTo(Personas, { foreignKey: "persona_id", targetKey: "id" });

export default Identificadores;