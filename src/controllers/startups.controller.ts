import express, { Express, Request, Response } from "express";
import Startups, {StartupsResultados } from "../models/startups";
import Personas_Startups, { Personas_StartupsDTO } from "../models/personas_startups";
import Personas from "../models/personas";
const { Op } = require("sequelize");

const getStartups = async (req: Request, res: Response) => {
    try {
        let startups: any[] = [];
        await Startups.findAll({ 
            order: [['id', 'ASC']],
            where: { 
                fecha: { 
                    [Op.eq]: Date.now()
                }
            }
        }).then((t: any[]) => {
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
        let persona: Personas | null = await Personas.findOne({ where: { id: id } });

        if (!persona) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }

        if (persona.encuestado) {
            return res.status(201).json({ message: 'Persona encuestada' });
        } else {
            let startupsReq: Personas_StartupsDTO[] | undefined = req.body;

            if (!Array.isArray(startupsReq)) {
                return res.status(400).json({ message: 'startups debe ser un array' });
            }

            for (const i of startupsReq) {
                let startup: Personas_Startups = new Personas_Startups();
                startup = await Personas_Startups.create(startup, { include: [Personas, Startups] });
                startup.setPersona(Number(id));
                startup.setStartup(i.startup_id);
                startup.opcion = i.opcion;
                await startup.save();
            }
            persona.encuestado = true;
            await persona.save();
            return res.status(200).json(persona);
        }

    } catch (error: any) {
        console.log({ message: error.message });

        return res.status(500).json({ message: error.message });
    }
};


const getResultadosStartups = async (req: Request, res: Response) => {
    try {
        let resultados: StartupsResultados[] = [];
        let startups: Personas_Startups[] = [];
        await Personas_Startups.findAll({include:[Startups]}).then((list)=>{
            startups = list
        });
        // await Startups.findAll({ include: [Personas] }).then((list: Startups[]) => {
        //     startups = list;
        // });
        // startups.forEach(async (startup: Startups) => {
        //     startup.Personas = startup.Personas as any;
        //     if (startup.Personas == undefined) {
        //         startup.Personas = [];
        //     }
        //     const startupResult: StartupsResultados = { id: startup.id, nombre: startup.nombre, votos: startup.Personas.length };
        //     resultados.push(startupResult);
        // });
        return res.status(200).json(resultados);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

export { getStartups, postStartupsEncuesta, getResultadosStartups };