import express, { Express, Request, Response } from "express";
const { Op } = require("sequelize");
import Autores from "../models/autores";

const getAutores = async (req: Request, res: Response) => {
    try {
        let autores: Autores[] = [];
        await Autores.findAll().then((list:Autores[]) => {
            autores = list;
        });
        return res.json(autores);
    } catch (error:any) {
        return res.status(500).json({ message: error.message });
    }
};

const getAutor = async (req: Request, res: Response) => {
    try{
        var id: string = req.params.id;
        var autor: Autores = await Autores.findOne({ where: { id: id } }) as any;
        if (autor == undefined || autor == null) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }
        return res.json(autor);
    }catch ( error : any ){
        return res.status(500).json({message : error.message });
    }
}

export {getAutores, getAutor};