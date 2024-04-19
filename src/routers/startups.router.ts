import express from "express";
import { getStartups, postStartupsEncuesta, getResultadosStartups} from "../controllers/startups.controller";
const routerStartups = express.Router();

routerStartups.get('/', getStartups);
routerStartups.post('/persona/:id', postStartupsEncuesta);
routerStartups.get('/resultados', getResultadosStartups);

export default routerStartups; 
