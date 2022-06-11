const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const getUser = (req = request, res = response) => {
  const { q, page, limit } = req.query;

  res.json({
    msg: "Get API - Controller",
    q,
    page,
    limit
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

  res.json({
    user,
  });
};

const putUser = (req, res = response) => {
  const { id } = req.params;

  res.json({
    msg: "Put API - Controller",
    id,
  });
};

const deleteUser = (req, res = response) => {
  res.json({
    msg: "Delete API - Controller",
  });
};

module.exports = {
  getUser,
  postUser,
  putUser,
  deleteUser,
};
