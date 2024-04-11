import express, { Express} from "express";
import { sequelize } from "./db/database";
import router from "./routers/personas.router";
const app:Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routers
app.use("/api/personas", router);

async function main() {
  console.log("Iniciado");
  try {
    await sequelize.sync({ force: false });
    console.log("Conexión establecida con la base de datos");

    app.listen(3000, () => console.log("Escuchando en el puerto 3000"));
  } catch (error) {
    console.error("Error al conectar con la base de datos", error);
  }
}


main();
