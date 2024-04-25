import express, { Express, Request, Response } from "express";
import Sugerencias from "../models/sugerencias";
import Personas from "../models/personas";

const getSugerencias = async (req: Request, res: Response) =>{
    try {
        let sugerencias: Sugerencias[] = [];
        await Sugerencias.findAll({order:[['id','ASC']],include:[Personas]}).then((list:Sugerencias[])=>{
            sugerencias = list;
        });
        return res.json(sugerencias);
    }catch(error:any){
        return res.status(500).json({ message: error.message });
    }

};
const postSugerencias = async (req: Request, res: Response) =>{
    try {
        let sugerenciaReq: Sugerencias = req.body;
        const persona_id = req.params.id;
        sugerenciaReq.id = null as any;
        sugerenciaReq.persona_id = Number(persona_id) as any;
        if(persona_id == null){
            return res.status(404).json({ message:'Persona no encontrada' });
        }
        let sugerencia = await Sugerencias.create(sugerenciaReq);
        sugerencia.persona_id = persona_id;
        sugerencia.save();
        return res.status(200).json(sugerencia);
    }catch(error:any){
        return res.status(500).json({ message: error.message });
    }
};

export {getSugerencias,postSugerencias};