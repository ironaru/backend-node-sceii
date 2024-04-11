const express = require("express");
const sequelize = require("./src/db/database");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routers
app.use("/api/personas", require("./src/routers/personas.router"));

async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log("Conexión establecida con la base de datos");

    app.listen(3000, () => console.log("Escuchando en el puerto 3000"));
  } catch (error) {
    console.error("Error al conectar con la base de datos", error);
  }
}


main();
