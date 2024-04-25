import { CreationOptional, DataTypes, HasManyCountAssociationsMixin, HasManyGetAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import sequelize from '../db/database';
import Personas from "./personas";
import Personas_Startups from "./personas_startups";


export class StartupsResultados {
    id!: number;
    nombre!: string;
    foto: string = "";
    fecha: string = "";
    descripcion: string = "";
    totales_afirmativos: number = 0;
    votos_totales: Votos[] = [];
}
export class Votos{
    declare opcion:number;
    total:number = 0;
}

class Startups extends Model<InferAttributes<Startups>, InferCreationAttributes<Startups>> {
    declare id: CreationOptional<number>;
    declare nombre: string;
    declare foto: string;
    declare descripcion: string;
    declare fecha: Date;
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
        autoIncrementIdentity:true,
        field: "id"
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "nombre"
    },
    foto: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "foto"
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "descripcion"
    },
    fecha:{
        type: DataTypes.DATEONLY,
        defaultValue: Date.now(),
    }
}, {
    timestamps: false,
    tableName: 'startups',
    sequelize: sequelize,
    paranoid: true
});

Personas.hasMany(Personas_Startups,{
    foreignKey: "persona_id",
    sourceKey: "id",
});
Personas_Startups.belongsTo(Personas, {
    foreignKey: "persona_id",
    targetKey: "id",
});

Startups.hasMany(Personas_Startups,{
    foreignKey: "startup_id",
    sourceKey: "id",
});
Personas_Startups.belongsTo(Startups, {
    foreignKey: "startup_id",
    targetKey: "id",
});

export default Startups;