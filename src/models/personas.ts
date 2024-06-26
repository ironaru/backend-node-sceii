import { CreationOptional, DataTypes, HasManyCountAssociationsMixin, HasManyGetAssociationsMixin, HasManySetAssociationsMixin, HasOneGetAssociationMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute, Optional } from 'sequelize'
import sequelize from '../db/database';
import Identificadores from './identificadores';
import Startups from './startups';
import Sugerencias from './sugerencias';
const { Op } = require("sequelize");

class Personas extends Model<InferAttributes<Personas>, InferCreationAttributes<Personas>> {
    declare id: CreationOptional<number>;
    declare nombres: string;
    declare apellidos: string;
    declare residencia: string;
    declare correo: string;
    declare organizacion: string;
    declare ci: string;
    declare plan: string;
    declare celular: string;
    declare encuestado: boolean;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date>;

    declare getIdentificador: HasOneGetAssociationMixin<Identificadores>;
    declare startups?: NonAttribute<Startups[]>;
    declare getStartups: HasManyGetAssociationsMixin<Startups>;
    declare setStartups: HasManySetAssociationsMixin<Startups, number>;
    declare countStartups: HasManyCountAssociationsMixin;
}

Personas.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity:true
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: true
    },
    residencia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
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
    encuestado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at"
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at"
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "deleted_at"
    }
}, {
    tableName: "personas",
    timestamps: true,
    sequelize: sequelize,
    paranoid: true
}
)
Personas.hasOne(Identificadores, {
    foreignKey: "persona_id",
    sourceKey: "id",
});

Identificadores.belongsTo(Personas, {
    foreignKey: "persona_id",
    targetKey: "id",
}
);


export default Personas;
