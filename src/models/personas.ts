import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../db/database';
import Identificadores from './identificadores';
const { Op } = require("sequelize");
interface PersonasAtributos {
    id: number;
    nombres: string;
    apellidos: string;
    residencia: string;
    correo: string;
    organizacion: string;
    ci: string;
    plan: string;
    celular: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface PersonasInput extends Optional<PersonasAtributos, 'id'> { }
export interface PersonasOutput extends Required<PersonasAtributos> { }

class Personas extends Model<PersonasAtributos, PersonasInput> implements PersonasAtributos {
    id!: number;
    nombres!: string;
    apellidos!: string;
    residencia!: string;
    correo!: string;
    organizacion!: string;
    ci!: string;
    plan!: string;
    celular!: string;
    readonly createdAt!: Date;
    readonly updatedAt!: Date;
    readonly deletedAt!: Date;
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
Personas.beforeCreate("verificarIdentificadorDisponible", async (persona: Personas) => {
    try {
        let identificador: Identificadores = await Identificadores.findOne({
            where: {
                persona_id: {
                    [Op.is]: null
                }
            }, order: [['id', 'ASC']]
        }) as any;
        persona.nombres.toLowerCase();
        persona.apellidos.toLowerCase();
        if (identificador==null || identificador == undefined) {
            throw new Error('Identificadores no disponibles');
        }
    } catch (error) {
        throw error;
    }
});
Personas.afterValidate("addQR", async (persona: Personas) => {
    try {
        var identificador: Identificadores = await Identificadores.findOne({
            where: {
                persona_id: {
                    [Op.is]: null
                }
            }, order: [['id', 'ASC']]
        }) as any;
    if (identificador==null || identificador == undefined) {
            await Personas.destroy({
                where: {
                    id: persona.id,
                },
                force: true,
            });
            throw new Error('Identificadores no disponibles');
        }
        identificador.persona_id = persona.id;
        identificador.save();
    } catch (error) {
        throw error;
    }
});
export default Personas;
