import express, { Express} from "express";
import { sequelize } from "./db/database";
import routerPersonas from "./routers/personas.router";
import routerIdentificadores from "./routers/identificadores.router";
import routerStartups from "./routers/startups.router";
import routerExpositores from "./routers/expositores.router";
import routerAuth from "./routers/auth.router";
import routerSugerencias from "./routers/sugerencias.router";
var cors = require('cors');
require('dotenv').config();
var app:Express = express();

const port = Number(process.env.PORT) || 3000;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: 'https://tarija.dialoga.tja.dev.404.codes',
  optionsSuccessStatus: 200,
  preflightContinue: true

}));

// Routers
app.use("/api/sugerencias",routerSugerencias); 
app.use("/api/personas", routerPersonas);
app.use("/api/identificadores", routerIdentificadores);
app.use("/api/startups", routerStartups);
app.use("/api/autores", routerExpositores);
app.use("/api/login",routerAuth);


async function main() { 

  try {
    await sequelize.sync({ force: false }); 
    console.log("Conexión establecida con la base de datos"); 

    app.listen(port, () => console.log("Escuchando en el puerto "+port));
  } catch (error) { 
    console.error("Error al conectar con la base de datos", error);
  }
}

main();
