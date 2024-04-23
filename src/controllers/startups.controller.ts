import express, { Express, Request, Response } from "express";
import Startups, { StartupsResultados } from "../models/startups";
import Personas from "../models/personas";
const { Op } = require("sequelize");

const getStartups = async (req: Request, res: Response) => {
    try {
        let startups: Startups[] = [];
        await Startups.findAll({ 
            order: [['id', 'ASC']],
            where: { 
                fecha: { 
                    [Op.eq]: Date.now()
                }
            } 
        }).then((t: Startups[]) => {
            startups = t;
        });
        res.status(200).json(startups);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

const postStartupsEncuesta = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        let persona: Personas = await Personas.findOne({ where: { id: id } }) as any;
        if (persona == null || persona === undefined) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }

        const startups: number[] = req.body;
        if (persona.encuestado == true) {
            return res.status(201).json({ message: 'Persona encuestada' });
        } else {
            persona.setStartups(startups);
            await persona.save();
            return res.status(200).json();
        }

    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

const getResultadosStartups = async (req: Request, res: Response) => {
    try {
        let resultados: StartupsResultados[] = [];
        let startups: Startups[] = [];
        await Startups.findAll({ include: [Personas] }).then((list: Startups[]) => {
            startups = list;
        });
        startups.forEach(async (startup: Startups) => {
            startup.Personas = startup.Personas as any;
            if (startup.Personas == undefined) {
                startup.Personas = [];
            }
            const startupResult: StartupsResultados = { id: startup.id, nombre: startup.nombre, votos: startup.Personas.length };
            resultados.push(startupResult);
        });
        return res.status(200).json(resultados);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

export { getStartups, postStartupsEncuesta, getResultadosStartups };