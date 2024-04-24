import { DataTypes, HasOneSetAssociationMixin, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import Personas from "./personas";
import Startups from "./startups";
import sequelize from "../db/database";

class Personas_Startups  extends Model<InferAttributes<Personas_Startups>, InferCreationAttributes<Personas_Startups>>{
    declare id: number;
    declare persona_id:number;
    declare startup_id:number;
    declare opcion : number;
    declare setPersona: HasOneSetAssociationMixin<Personas,number>;
    declare setStartup: HasOneSetAssociationMixin<Startups,number>;
}
export class Personas_StartupsDTO {
    declare startup_id:number;
    declare opcion : number;
}
Personas_Startups.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false,
    },
    persona_id:{
        type: DataTypes.INTEGER,
        allowNull:true
    },
    startup_id:{
        type: DataTypes.INTEGER,
        allowNull:true
    },
    opcion: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, { 
    timestamps: false,
    tableName: 'personas_startups',
    sequelize: sequelize,
    paranoid: true
});


export default Personas_Startups;
