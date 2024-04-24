import express, { Express, Request, Response } from "express";
import Expositores from "../models/expositores";

const getExpositores = async (req: Request, res: Response) => {
    try {
        let autores: Expositores[] = [];
        await Expositores.findAll().then((list:Expositores[]) => {
            autores = list;
        });
        return res.json(autores);
    } catch (error:any) {
        return res.status(500).json({ message: error.message });
    }
};

const getExpositor = async (req: Request, res: Response) => {
    try{
        var id: string = req.params.id;
        var autor: Expositores = await Expositores.findOne({ where: { id: id } }) as any;
        if (autor == undefined || autor == null) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }
        return res.json(autor);
    }catch ( error : any ){
        return res.status(500).json({message : error.message });
    }
}

export {getExpositores, getExpositor};