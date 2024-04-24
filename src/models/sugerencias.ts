import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../db/database";
import Personas from "./personas";

class Sugerencias extends Model<InferAttributes<Sugerencias>, InferCreationAttributes<Sugerencias>> {
    declare id: CreationOptional<number>;
    declare sugerencia: string;
    declare persona_id: string;
}
Sugerencias.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    sugerencia: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    persona_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}
, {
    tableName: "sugerencias",
    timestamps: false,
    sequelize: sequelize,
    paranoid: true
});

Personas.hasMany(Sugerencias, {
    foreignKey: "persona_id",
    sourceKey: "id",
});
Sugerencias.belongsTo(Personas, {
    foreignKey: "persona_id",
    targetKey: "id",
});

export default Sugerencias;