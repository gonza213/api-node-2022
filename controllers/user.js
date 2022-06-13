const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const {User} = require('../models')

const getUser = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query), //Cantidad de usuarios
    User.find(query).skip(Number(desde)).limit(Number(limite)), //Traer todos los usuarios
  ]);

  res.json({
    total,
    users,
  });
};

const postUser = async (req, res = response) => {
  const { nombre, email, password, rol } = req.body;
  const user = new User({ nombre, email, password, rol });

  //Encriptar contraseña
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  //Guardar usuario
  await user.save();

  res.status(201).json({
    msg: "ok",
    user,
  });
};

const putUser = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...resto } = req.body;

  //TODO validar contraseña
  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, resto, {new: true});

  res.json({
    msg: "ok",
    user,
  });
};

const deleteUser = async (req, res = response) => {
  const { id } = req.params;

  //Borramos fisicamente el usuario
  // const user = await User.findByIdAndDelete(id)

  //Inhabilitamos el usuario
  const user = await User.findByIdAndUpdate(id, { estado: false }, {new: true});

  res.json({
    msg: "ok",
    user
  });
};

module.exports = {
  getUser,
  postUser,
  putUser,
  deleteUser,
};
