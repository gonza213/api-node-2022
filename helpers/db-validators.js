const Role = require("../models/role");
const User = require("../models/user");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const emailExiste = async (email = "") => {
  //Verificar si el email existe
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    throw new Error(`El email ${email} ya esta registrado`);
  }
};

module.exports = {
  esRolValido,
  emailExiste,
};
