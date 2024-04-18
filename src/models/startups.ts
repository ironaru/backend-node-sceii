import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../db/database';
import Personas from "./personas";

interface StartupsAtributos {
    id: number;
    nombre: string;
}

export interface StartupsInput extends Optional<StartupsAtributos, "id"> { }
export interface StartupsOutput extends Required<StartupsAtributos> { }

class Startups extends Model<StartupsAtributos, StartupsInput> implements StartupsAtributos {
    id!: number;
    nombre!: string;
}
Startups.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "nombre"
    }
}, {
    timestamps: false,
    tableName: 'startups',
    sequelize: sequelize,
    paranoid: true
});

const Personas_Startups = sequelize.define('personas_startups', {}, { timestamps: false });
Personas.belongsToMany(Startups, { foreignKey: 'persona_id',through: Personas_Startups });
Startups.belongsToMany(Personas, { foreignKey: 'startup_id',through: Personas_Startups });

export default Startups;