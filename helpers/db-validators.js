const {Role, User, Categoria, Producto} = require("../models");

//USUARIOS

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

const existeUsuarioId = async (id) => {
  const existeUsuario = await User.findById(id)
  if (!existeUsuario) {
    throw new Error(`El ID ${id} no existe`);
  }
};


//CATEGORIAS
const existeCategoria = async (id) => {
  const existeCategoria = await Categoria.findById(id)
  if (!existeCategoria) {
    throw new Error(`El ID ${id} no existe`);
  }
};

//PRODUCTOS
const existeProducto = async (id) => {
  const existeProducto = await Producto.findById(id)
  if (!existeProducto) {
    throw new Error(`El ID ${id} no existe`);
  }
};


module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioId,
  existeCategoria,
  existeProducto
};
