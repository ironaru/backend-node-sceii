import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import Personas from "./personas";
import Startups from "./startups";
import sequelize from "../db/database";

class Personas_Startups  extends Model<InferAttributes<Personas_Startups>, InferCreationAttributes<Personas_Startups>>{
    // declare id: number;
    declare persona_id:number;
    declare startup_id:number;
    declare opcion : number;
}
Personas_Startups.init({
    persona_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false
    },
    startup_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false
    },
    opcion: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
    },
}, { 
    timestamps: false,
    tableName: 'personas_startups',
    sequelize: sequelize,
    paranoid: true
});
Personas.belongsToMany(Startups, { foreignKey: 'persona_id', through: Personas_Startups });
Startups.belongsToMany(Personas, { foreignKey: 'startup_id', through: Personas_Startups });
// // Personas_Startups.belongsTo(Personas,{as: 'personas_startups'});
// // Personas_Startups.belongsTo(Startups,{as: 'personas_startups'});
// // Personas.hasMany(Personas_Startups);
// // Startups.hasMany(Personas_Startups);
// export default Personas_Startups;