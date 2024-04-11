import Personas from "../models/personas";
import express, { Express, Request, Response } from "express";
const { Op } = require("sequelize");
import {validationResult} from 'express-validator'
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
    var persona: Personas = req.body;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()})
    }
    // var p = await Personas.findOne({
    //   where: {
    //     correo: persona.correo
    //   },
    //   paranoid: false
    // });
    // if (p?.deletedAt) {
    //   await Personas.restore({
    //     where: {
    //       [Op.eq]: {
    //         id: persona.id
    //       }
    //     }
    //   });

    // }
      var count = await Personas.count({
      where: {
        correo: persona.correo
      },
      paranoid: false
    });
    if(count>0){
      return res.status(226).json({ message: "El correo ya existe" });
    }

    count = await Personas.count({
      where: {
        celular: persona.celular
      },
      paranoid: false
    });
    if(count>0){
      return res.status(226).json({ message: "El celular ya existe" });
    }


    await Personas.create(persona).then((p: Personas) => {
      persona = p;
    })
    return res.json(persona);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// put personas
const putPersonas = async (req: Request, res: Response) => {
  var persona: Personas = req.body;
  var id: string = req.params.id;
  try {
    await Personas.update(persona, {
      where: {
        id: id
      }
    });
    if (persona == undefined || persona == null) {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }
    persona = await Personas.findOne({ where: { id: id } }) as any;
    return res.json(persona);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// delete personas
const deletePersonas = async (req: Request, res: Response) => {
  var persona: Personas = req.body;
  var id: string = req.params.id;
  try {
    await Personas.findByPk(id);
    return res.json(Personas.destroy({ where: { id: id } }));
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export { getPersonas, getPersona, postPersona, putPersonas, deletePersonas };
