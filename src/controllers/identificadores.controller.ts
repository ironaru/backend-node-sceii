import express, { Express, Request, Response } from "express";
import Identificadores from "../models/identificadores";
import Personas from "../models/personas";
import { Identificador } from "../models/dto/Identificador";
const { Op } = require("sequelize");
require('dotenv').config();
import * as jwt from 'jsonwebtoken'

const private_key = process.env.JWT_KEY as string;
const getIdentificadores = async (req: Request, res: Response) => {

    try {
        var identificadores: Identificadores[] = [];
        await Identificadores.findAll(
            {
                where: {
                    persona_id: {
                        [Op.not]: null,
                    }
                },
                include: {
                    model: Personas,
                },
                order: [['id', 'ASC']]
            }
        ).then((list: Identificadores[]) => {
            identificadores = list
        });
        return res.status(200).json(identificadores);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }

};
const getIdentificador = async (req: Request, res: Response) => {
    try {
        var id: string = req.params.id;
        var identificador: Identificadores = await Identificadores.findOne({ where: { id: id }, include: Personas }) as any;

        if (identificador == undefined || identificador == null) {
            return res.status(404).json({ message: 'Identificador no encontrado' });
        }
        return res.json(identificador);

    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};


const deletePersonaFromIdentificador = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        let identificador: Identificadores = await Identificadores.findOne({ where: { id: id }, include: Personas }) as any;
        const i = { ...identificador }
        identificador.persona_id = null as any;
        identificador.save();
        await Personas.destroy({ where: { id: i.persona_id }, force: true })
        return res.status(200).json();
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};
export { getIdentificadores, getIdentificador, deletePersonaFromIdentificador};