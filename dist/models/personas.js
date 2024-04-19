"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../db/database"));
const identificadores_1 = __importDefault(require("./identificadores"));
const { Op } = require("sequelize");
class Personas extends sequelize_1.Model {
}
Personas.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombres: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    apellidos: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    residencia: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    organizacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    ci: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    plan: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    celular: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    encuestado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: "created_at"
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: "updated_at"
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        field: "deleted_at"
    }
}, {
    tableName: "personas",
    timestamps: true,
    sequelize: database_1.default,
    paranoid: true
});
Personas.hasOne(identificadores_1.default, {
    foreignKey: "persona_id",
    sourceKey: "id",
});
identificadores_1.default.belongsTo(Personas, {
    foreignKey: "persona_id",
    targetKey: "id",
});
Personas.afterCreate("addQR", (persona) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var identificador = yield identificadores_1.default.findOne({
            where: {
                persona_id: {
                    [Op.is]: null
                }
            }, order: [['id', 'ASC']]
        });
        if (identificador == null || identificador == undefined) {
            yield Personas.destroy({
                where: {
                    id: persona.id,
                },
                force: true,
            });
            throw new Error('Identificadores no disponibles');
        }
        identificador.persona_id = persona.id;
        yield identificador.save();
        console.log(persona);
    }
    catch (error) {
        throw error;
    }
}));
exports.default = Personas;
//# sourceMappingURL=personas.js.map