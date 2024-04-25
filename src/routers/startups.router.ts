import express from "express";
import { getStartups, postStartupsEncuesta, getResultadosStartups} from "../controllers/startups.controller";
import { authIdentificador, authUsuario } from "../controllers/auth.controller";
const routerStartups = express.Router();

routerStartups.get('/', getStartups);
routerStartups.post('/persona/:id', authIdentificador, postStartupsEncuesta);
routerStartups.get('/resultados', getResultadosStartups);

export default routerStartups; 
