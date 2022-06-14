const { response, json } = require("express");
const bcrypt = require("bcryptjs");
const {User} = require('../models')
const { generarJWT, googleVerify  } = require("../helpers");

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

    const token = await generarJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Algo salió mal, debe comunicarse con soporte",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { nombre, img, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        nombre,
        email,
        password: ":p",
        rol: "USER_ROLE",
        img,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    //Si el usuario en DB
    if (!user.estado) {
      return res.status(401).json({
        msg: "Usuario bloqueado, comunicarse con soporte",
      });
    }

    const token = await generarJWT(user.id);

    res.json({
      msg: "ok",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "El token no se pudo verificar",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
