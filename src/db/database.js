const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("tarija_dialoga", "ronaru", "@ronaru86iDP", {
    host: "192.168.1.194",
    port:"5456",
    dialect: "postgres",
});

module.exports = sequelize;
