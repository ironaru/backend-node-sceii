import express from "express";
import { getAutores, getAutor } from "../controllers/autores.controller";

const routerAutores = express.Router();
routerAutores.get("/",getAutores);
routerAutores.get("/:id",getAutor);

export default routerAutores;
