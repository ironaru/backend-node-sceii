import { DataTypes, HasManyCountAssociationsMixin, HasManyGetAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import sequelize from '../db/database';
import Personas from "./personas";


export class StartupsResultados {
    id!: number;
    nombre!: string;
    votos!: number | undefined;
}
class Startups extends Model<InferAttributes<Startups>, InferCreationAttributes<Startups>> {
    declare id: number;
    declare nombre: string;
    declare foto: string;
    declare descripcion: string;

    declare Personas?: NonAttribute<Personas[]>;
    declare getPersonas: HasManyGetAssociationsMixin<Personas>;
    declare setPersonas: HasManySetAssociationsMixin<Personas, number>;
    declare countPersonas: HasManyCountAssociationsMixin;
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
    },
    foto: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
        field: "foto"
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: true,
        field: "descripcion"
    }
}, {
    timestamps: false,
    tableName: 'startups',
    sequelize: sequelize,
    paranoid: true
});

const Personas_Startups = sequelize.define('personas_startups', {}, { timestamps: false });
Personas.belongsToMany(Startups, { foreignKey: 'persona_id', through: Personas_Startups });
Startups.belongsToMany(Personas, { foreignKey: 'startup_id', through: Personas_Startups });

export default Startups;