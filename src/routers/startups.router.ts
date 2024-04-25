import express from "express";
import { getStartups, postStartupsEncuesta, getResultadosStartups, getResultadosStartupsAntesHoy} from "../controllers/startups.controller";
import { authIdentificador, authUsuario } from "../controllers/auth.controller";
const routerStartups = express.Router();

routerStartups.get('/', getStartups);
routerStartups.post('/persona/:id', authIdentificador, postStartupsEncuesta);
routerStartups.get('/resultados', getResultadosStartups);
routerStartups.get('/resultados/last', getResultadosStartupsAntesHoy);

export default routerStartups; 
