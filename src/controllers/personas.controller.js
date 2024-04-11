const personas = require("../models/personas");
const { Op } = require("sequelize");
//obtener todos las personas
const getPersonas = async (req, res) => {
  try {
    personas.findAll({
      where:{
        deleted_at: {
          [Op.is] : null 
        }
      }
    }).then((personas) => res.json(personas));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = { getPersonas};