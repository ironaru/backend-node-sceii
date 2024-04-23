import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import Identificadores from '../models/identificadores';
import Personas from '../models/personas';
import { Usuario } from '../models/dto/Usuario';
import * as bcrypt from 'bcrypt';
import { Identificador } from '../models/dto/Identificador';
import { log } from 'console';
require('dotenv').config();
const private_key = process.env.JWT_KEY as string;
const username = process.env.USER as string;
const passwordHashed = process.env.PASSWORD as string;
export const authIdentificador = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const i: Identificadores = jwt.verify(token, private_key) as any;

    var identificador: Identificadores = await Identificadores.findOne({ where: { codigo_qr: i.codigo_qr }, include: Personas }) as any;

    if (identificador == undefined || identificador == null) {
      throw new Error();
    }
    if (identificador.persona_id == undefined || identificador.persona_id == null) {
      throw new Error();
    }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Identificador no permitido' });
  }
};
export const authUsuario = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const i = jwt.decode(token) as any;
    if (i.username != username) {
      throw new Error();
    }
    const isMatch = await bcrypt.compare(i.password, passwordHashed);

    if (isMatch === false) {
      throw new Error();
    }
    const current_time = Math.floor(Date.now() / 1000);
    if ((i.exp as number) - current_time > 0) {
      next();
    } else {
      throw new Error();
    }



  } catch (err) {
    res.status(401).json({ message: 'No autorizado' });
  }
};

export const postLoginUsuario = async (req: Request, res: Response) => {
  try {

    const user: Usuario = req.body;

    if (user.username != username) {
      return res.status(403).json({ message: 'Usuario o contraseña incorrecto' });
    }
    const isMatch = await bcrypt.compare(user.password, passwordHashed);

    if (isMatch === false) {
      return res.status(403).json({ message: 'Usuario o contraseña incorrecto' });
    }
    const current_time = Math.floor(Date.now() / 1000);
    const expiration_time = current_time + 864000;

    const token = jwt.sign(JSON.parse(JSON.stringify(user)), private_key, { algorithm: 'HS256', expiresIn: expiration_time });

    return res.status(200).json(token);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export const postLoginIdentificador = async (req: Request, res: Response) => {
  try {
    const i: Identificador = req.body as any;

    const identificador: Identificadores = await Identificadores.findOne({ where: { codigo_qr: i.codigo_qr }, include: Personas }) as any;

    if (identificador == undefined || identificador == null) {
      return res.status(403).json({ message: 'Identificador no permitido' });
    }
    if (identificador.persona_id == undefined || identificador.persona_id == null) {
      return res.status(403).json({ message: 'Identificador no permitido' });
    }
    const current_time = Math.floor(Date.now() / 1000);
    const expiration_time = current_time + 864000;
    const token = jwt.sign(JSON.parse(JSON.stringify(identificador)), private_key, { algorithm: 'HS256', expiresIn: expiration_time });

    return res.status(200).json(token);

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};