import express, { Express} from "express";
import { sequelize } from "./db/database";
import routerPersonas from "./routers/personas.router";
import routerIdentificadores from "./routers/identificadores.router";
import routerStartups from "./routers/startups.router";
import routerExpositores from "./routers/expositores.router";
import routerAuth from "./routers/auth.router";
import routerSugerencias from "./routers/sugerencias.router";
import Personas from "./models/personas";
import { resultadosStartups } from "./controllers/startups.controller";
import Startups from "./models/startups";
import { formatInTimeZone } from "date-fns-tz";
const cors = require('cors');
require('dotenv').config();
const app:Express = express();
const cron = require('node-cron');

const port = Number(process.env.PORT) || 3000;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: '*',
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

cron.schedule('0 0 * * *', async function () {
  await Personas.update({encuestado:false},{where:{encuestado:true}});
  
});
cron.schedule('0 1 0 25 4 *', async function () {
try {
  
  let resultados = await resultadosStartups();
  while (resultados.length > 2) {
    resultados.pop();
  }
  for(const r of resultados){
    let startup: Startups = new Startups();
    startup.descripcion = r.descripcion;
    let fecha = new Date();
    const fechaStr = formatInTimeZone(fecha, 'America/La_Paz', 'yyyy-MM-dd')
    startup.fecha = formatInTimeZone(fechaStr, 'America/La_Paz', 'yyyy-MM-dd') as any;
    startup.foto = r.foto;
    startup.nombre = r.nombre;
    let body = {foto:startup.foto, nombre:startup.nombre, descripcion:startup.descripcion} as any;
    await Startups.create(body);
  }

} catch (error: any) {
    console.error('Error al agregar startups:', error.message);
}

});
