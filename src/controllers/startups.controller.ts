import express, { Express, Request, Response } from "express";
import Startups, { StartupsResultados, Votos } from "../models/startups";
import Personas_Startups, { Personas_StartupsDTO } from "../models/personas_startups";
import Personas from "../models/personas";
import { formatInTimeZone } from "date-fns-tz";
const { Op } = require("sequelize");

const getStartups = async (req: Request, res: Response) => {
    try {
        let fecha = new Date();

        let startups: any[] = [];
        await Startups.findAll({
            order: [['id', 'ASC']],
            where: {
                fecha: {
                    [Op.eq]: formatInTimeZone(fecha, 'America/La_Paz', 'yyyy-MM-dd')
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
        return res.status(500).json({ message: error.message });
    }
};


const getResultadosStartups = async (req: Request, res: Response) => {
    try {
        let resultados = await resultadosStartups();
        // while (resultados.length > 2) {
        //     resultados.pop();
        // }
        return res.status(200).json(resultados);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }

}
const getResultadosStartupsAntesHoy = async (req: Request, res: Response) => {
    try {
        let resultados = await resultadosStartupsAnteriores();
        return res.status(200).json(resultados);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }

}

export async function resultadosStartupsAnteriores(): Promise<StartupsResultados[]> {
    let resultados: StartupsResultados[] = [];
    let startups: Startups[] = [];
    let fecha = new Date();
    const fechaStr = formatInTimeZone(fecha, 'America/La_Paz', 'yyyy-MM-dd');

    await Startups.findAll({
        where: {
            fecha: {
                [Op.lt]: fechaStr
            }
        }
    }).then((list: Startups[]) => {
        startups = list;
    });
    const opciones: Set<number> = new Set();
    for (const i of startups) {

        let fecha = new Date();
        let fechaS = new Date(i.fecha);

        if (!(fechaS < fecha)) {
            continue;
        }
        let sR: StartupsResultados = new StartupsResultados();
        sR.id = i.id;
        sR.nombre = i.nombre;
        sR.foto = i.foto;
        sR.descripcion = i.descripcion;
        let startupVotos = await Personas_Startups.findAll({ where: { startup_id: i.id } }) as Personas_Startups[];
        for (const s of startupVotos) {
            opciones.add(s.opcion);
        }
        for (const o of opciones) {
            let votos = new Votos();
            votos.opcion = o;
            votos.total = await Personas_Startups.count({ where: { opcion: votos.opcion, startup_id: sR.id } });
            if (votos.opcion === 1) {
                sR.totales_afirmativos = votos.total
            }
            sR.votos_totales.push(votos);
        }

        resultados.push(sR)
    }
    resultados.sort((a, b) => {
        return b.totales_afirmativos - a.totales_afirmativos;
    });

    return resultados;
}
export async function resultadosStartups(): Promise<StartupsResultados[]> {
    let resultados: StartupsResultados[] = [];
    let startups: Startups[] = [];
    let fecha = new Date();
    fecha.setDate(fecha.getDate())
    await Startups.findAll({
        where: {
            fecha: {
                [Op.eq]: fecha
            }
        }
    }).then((list: Startups[]) => {
        startups = list;
    });
    const opciones: Set<number> = new Set();
    for (const i of startups) {

        let sR: StartupsResultados = new StartupsResultados();
        sR.id = i.id;
        sR.nombre = i.nombre;
        sR.foto = i.foto;
        sR.descripcion = i.descripcion;
        let startupVotos = await Personas_Startups.findAll({ where: { startup_id: i.id } }) as Personas_Startups[];
        for (const s of startupVotos) {
            opciones.add(s.opcion);
        }
        for (const o of opciones) {
            let votos = new Votos();
            votos.opcion = o;
            votos.total = await Personas_Startups.count({ where: { opcion: votos.opcion, startup_id: sR.id } });
            if (votos.opcion === 1) {
                sR.totales_afirmativos = votos.total
            }
            sR.votos_totales.push(votos);
        }

        resultados.push(sR)
    }
    resultados.sort((a, b) => {
        return b.totales_afirmativos - a.totales_afirmativos;
    });

    return resultados;
}

export { getStartups, postStartupsEncuesta, getResultadosStartups, getResultadosStartupsAntesHoy };