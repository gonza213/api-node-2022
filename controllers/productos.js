const { response } = require("express");
const { Producto} = require("../models");


//Obtener Productos
const obtenerProductos = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query), //Cantidad de usuarios
    Producto.find(query)
    .populate('user', 'nombre')
    .populate('categoria', 'nombre')
    .skip(Number(desde))
    .limit(Number(limite)), //Traer todos los usuarios
  ]);

  res.json({
    total,
    productos,
  });
}

//Obtener Producto por id
const obtenerProducto = async (req, res = response) => {

  const {id} = req.params;
  const producto = await Producto.findById(id)
  .populate('user', 'nombre')
  .populate('categoria', 'nombre');

  res.json({
    producto
  })
}

//Crear Producto
const crearProducto = async (req, res = response) => {
  const { estado, user, ...body } = req.body;

  const productoDB = await Producto.findOne({ nombre: body.nombre });

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre} existe en la DB`,
    });
  }

  //Generar la data de guardar
  const data = { 
    ...body,
    nombre: body.nombre.toUpperCase(),
    user: req.user._id
  }

  const producto = new Producto(data)

  //Guardar data
  await producto.save()

  res.status(201).json({
    msg: 'ok',
    producto
  });
};

//Actualizar Producto
const actualizarProducto = async (req, res = response) => {

  const {id} = req.params;
  const {estado, user, ...data} = req.body;

  if(data.nombre){
      data.nombre = data.nombre.toUpperCase();
  }
  data.user = req.user._id

  const producto = await Producto.findByIdAndUpdate(id, data, {new: true})

  res.json({
    msg: "ok",
    producto
  })
}

//Borrar categoria 
const borrarProducto = async (req, res = response) => {

     const {id} = req.params;

     const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true})

     res.json({
      msg: "ok",
      productoBorrado
     })
}

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto
};
