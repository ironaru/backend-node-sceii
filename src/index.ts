import express, { Express} from "express";
import { sequelize } from "./db/database";
import routerPersonas from "./routers/personas.router";
import routerIdentificadores from "./routers/identificadores.router";
import routerStartups from "./routers/startups.router";
import routerAutores from "./routers/autores.router";
const cors = require('cors')
require('dotenv').config();
const app:Express = express();

const PORT = Number(process.env.PORT) || 3000
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: '*',
  preflightContinue: true
}));

// Routers
app.use("/api/personas", routerPersonas);
app.use("/api/identificadores", routerIdentificadores);
app.use("/api/startups", routerStartups);
app.use("/api/autores", routerAutores);
async function main() { 
  try {
    await sequelize.sync({ force: false}); 
    console.log("Conexión establecida con la base de datos"); 

    app.listen(PORT, () => console.log("Escuchando en el puerto "+PORT));
  } catch (error) { 
    console.error("Error al conectar con la base de datos", error);
  }
}

main();
