import Personas from "../models/personas";
import Identificadores from "../models/identificadores";
import express, { Express, Request, Response } from "express";
const { Op } = require("sequelize");
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { validationResult } from 'express-validator'
// obtener todos las personas
const getPersonas = async (req: Request, res: Response) => {

  try {
    var personas: Personas[] = [];
    await Personas.findAll({
      where: {
        deletedAt: {
          [Op.is]: null,
        },
      },
    }).then((list: Personas[]) => {
      personas = list;
    });
    return res.json(personas);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

//obtener una persona
const getPersona = async (req: Request, res: Response) => {
  try {
    var id: string = req.params.id;
    var persona: Personas;

    persona = await Personas.findOne({ where: { id: id } }) as any;

    if (persona == undefined || persona == null) {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }
    return res.json(persona);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// post personas
const postPersona = async (req: Request, res: Response) => {
  try {
    let persona: Personas = req.body;
    let identificador: Identificadores | null = await Identificadores.findOne({
      where: {
        persona_id: {
          [Op.is]: null
        }
      }, order: [['id', 'ASC']]
    });
    if (persona.nombres == null) {
      persona.nombres = "";
    }
    if (persona.apellidos == null) {
      persona.apellidos = "";
    }
    persona.encuestado = false;
    persona.nombres.toUpperCase();
    persona.ci == '' ? persona.ci = null as any : persona.ci;
    
    if (identificador == null || identificador == undefined) {
      return res.status(500).json({ message: 'Identificadores no disponibles' });
    }

    persona = await Personas.create(persona);

    identificador.persona_id = persona.id;

    await identificador.save();

    return res.status(200).json(identificador);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// put personas
const putPersonas = async (req: Request, res: Response) => {
  let persona: Personas = req.body;
  const id: string = req.params.id;
  persona.nombres.toUpperCase();
  persona.ci == '' ? persona.ci = null as any : persona.ci;
  try {
    await Personas.update(persona, {
      where: {
        id: id
      }
    });
    // if (persona == undefined || persona == null) {
    //   return res.status(404).json({ message: 'Persona no encontrada' });
    // }
    persona = await Personas.findOne({ where: { id: id } }) as any;
    return res.json(persona);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// delete personas
const deletePersonas = async (req: Request, res: Response) => {
  var id: string = req.params.id;
  try {
    await Personas.findByPk(id);
    Personas.destroy({ 
      where: { 
        id: id 
      },force: true
    });
    return res.status(200).json();
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

//Get persona by codigo_qr
const getPersonaByQr = async (req: Request, res: Response) => {
  const qr: string = req.params.qr;
  try {
    let identificador = await Identificadores.findOne({ where: { codigo_qr: qr } });

    if (identificador == null || identificador == undefined) {
      return res.status(404).json({ message: "Identificador QR no encontrado" })
    }
    if (identificador.persona_id == null || identificador.persona_id == undefined) {
      return res.status(404).json({ message: "Identificador QR no asociado" })
    }

    let persona = await Personas.findOne({ where: { id: identificador.persona_id } });
    return res.json(persona);


  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export { getPersonas, getPersona, postPersona, putPersonas, deletePersonas, getPersonaByQr };
