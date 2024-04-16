import express, { Express, Request, Response } from "express";
import Identificadores from "../models/identificadores";

const getIdentificador = async (req: Request, res: Response) => {
    
    try{
        var identificadores: Identificadores[] = [];
        await Identificadores.findAll().then((list: Identificadores[])=>{
            identificadores = list
        });
        return res.status(200).json(identificadores);
    }catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
    
};

export {getIdentificador};