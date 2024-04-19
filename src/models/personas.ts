import { CreationOptional, DataTypes, HasManyCountAssociationsMixin, HasManyGetAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute, Optional } from 'sequelize'
import sequelize from '../db/database';
import Identificadores from './identificadores';
import Startups from './startups';
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
// Personas.beforeCreate("verificarIdentificadorDisponible", async (persona: Personas) => {
//     try {
//         let identificador: Identificadores | null= await Identificadores.findOne({
//             where: {
//                 persona_id: {
//                     [Op.is]: null
//                 }
//             }, order: [['id', 'ASC']]
//         });
//         if(persona.nombres == null) {
//             persona.nombres = "";
//         }
//         if(persona.apellidos == null){
//             persona.apellidos = "";
//         }
//         persona.encuestado = false;
//         persona.nombres.toLowerCase();
//         persona.apellidos.toLowerCase();
//         if (identificador == null || identificador == undefined) {
//             throw new Error('Identificadores no disponibles');
//         }
//     } catch (error) {
//         throw error;
//     }
// });
Personas.afterCreate("addQR", async (persona: Personas) => {
    try {
        var identificador: Identificadores | null = await Identificadores.findOne({
            where: {
                persona_id: {
                    [Op.is]: null
                }
            }, order: [['id', 'ASC']]
        });
        if (identificador == null || identificador == undefined) {
            await Personas.destroy({
                where: {
                    id: persona.id,
                },
                force: true,
            });
            throw new Error('Identificadores no disponibles');
        }
        identificador.persona_id = persona.id as number;
        await identificador.save();
        console.log(persona);
        
    } catch (error) {
        throw error;
    }
});
export default Personas;
