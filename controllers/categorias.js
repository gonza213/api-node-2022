const { response } = require("express");
const { Categoria} = require("../models");


//Obtener Categorias
const obtenerCategorias = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query), //Cantidad de usuarios
    Categoria.find(query)
    .populate('user', 'nombre')
    .skip(Number(desde))
    .limit(Number(limite)), //Traer todos los usuarios
  ]);

  res.json({
    total,
    categorias,
  });
}

//Obtener Categoria por id
const obtenerCategoria = async (req, res = response) => {

  const {id} = req.params;
  const categoria = await Categoria.findById(id).populate('user', 'nombre');

  res.json({
    categoria
  })
}

//Crear categorias
const crearCategoria = async (req, res = response) => {
  let { nombre } = req.body;
  nombre = nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} existe en la DB`,
    });
  }

  //Generar la data de guardar
  const data = { 
    nombre,
    user: req.user._id
  }

  const categoria = new Categoria(data)

  //Guardar data
  await categoria.save()

  res.status(201).json({
    msg: 'ok',
    categoria
  });
};

//Actualizar Categorias
const actualizarCategoria = async (req, res = response) => {

  const {id} = req.params;
  const {estado, user, ...data} = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.user = req.user._id

  const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true})

  res.json({
    msg: "ok",
    categoria
  })
}

//Borrar categoria 
const borrarCategoria = async (req, res = response) => {

     const {id} = req.params;

     const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true})

     res.json({
      msg: "ok",
      categoriaBorrada
     })
}

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria
};
