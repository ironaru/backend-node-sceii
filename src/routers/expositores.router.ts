import express from "express";
import { getExpositores, getExpositor } from "../controllers/expositores.controller";

const routerExpositores = express.Router();
routerExpositores.get("/",getExpositores);
routerExpositores.get("/:id",getExpositor);

export default routerExpositores;
