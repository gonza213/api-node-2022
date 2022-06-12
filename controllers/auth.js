const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {generarJWT} = require('../helpers/generar-jwt')

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //Verificar si email existe la
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "El usuario y/o contraseña son incorrectas",
      });
    }
    //Verificar si el usuario esta habilitador
    if (!user.estado) {
      return res.status(400).json({
        msg: "El usuario esta inhabilitado",
      });
    }

    //Verificar contraseña
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "El usuario y/o contraseña son incorrectas",
      });
    }
    //Generar JWT

    const token = await generarJWT(user.id)

    res.json({
      user,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Algo salió mal, debe comunicarse con soporte",
    });
  }
};

module.exports = {
  login,
};
