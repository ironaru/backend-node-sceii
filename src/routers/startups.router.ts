import express from "express";
import { getStartups } from "../controllers/startups.controller";
const routerStartups = express.Router();

routerStartups.get('/', getStartups);
export default routerStartups;