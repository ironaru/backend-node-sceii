import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../db/database";
import Personas from "./personas";

class Sugerencias extends Model<InferAttributes<Sugerencias>, InferCreationAttributes<Sugerencias>> {
    declare id: number;
    declare sugerencia: string;
    declare persona_id: string | null;
}
Sugerencias.init({
    id: {
        primaryKey: true,
        type: DataTypes.NUMBER,
        autoIncrement: true

    },
    sugerencia: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    persona_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
    }
}
    , {
        tableName: "personas",
        timestamps: true,
        sequelize: sequelize,
        paranoid: true
    });
Personas.hasOne(Sugerencias, {
    foreignKey: "persona_id",
    sourceKey: "id",
});

Sugerencias.belongsTo(Personas, {
    foreignKey: "persona_id",
    targetKey: "id",
});

export default Sugerencias;