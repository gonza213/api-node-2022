const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { User, Categoria, Producto } = require("../models");

const coleccionesPermitidas = ["categorias", "productos", "roles", "usuarios"];

const buscarUsers = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const user = await User.findById(termino);
    return res.json({
      results: (user) ? [user] : []
    });
  }

  const regex = new RegExp(termino, 'i')

  const user = await User.find({
    $or: [{nombre: regex}, {email: regex}],
    $and: [{estado: true}]
  })

  const total = await User.count({
    $or: [{nombre: regex}, {email: regex}],
    $and: [{estado: true}]
  })

  res.json({
    total,
    results: user
  })
};

const buscarCategorias = async (termino = "", res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
      const categoria = await Categoria.findById(termino);
      return res.json({
        results: (categoria) ? [categoria] : []
      });
    }
  

    const regex = new RegExp(termino, 'i')

    const categoria = await Categoria.find({nombre: regex, estado: true})
  
    const total = await Categoria.count({nombre: regex, estado: true})
    
    res.json({
      total,
      results: categoria
    })

}

const buscarProductos = async (termino = "", res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
      const producto = await Producto.findById(termino).populate('categoria', 'nombre')
      if(producto){
        return res.json({
            results: (producto) ? [producto] : []
          });
      }

      //Buscar productos por ID categoria
      const producxCat = await Producto.find({categoria: termino, estado: true}).populate('categoria', 'nombre')

      if(producxCat){
        return res.json({
            results: (producxCat) ? [producxCat] : []
          });
      }
     
    }
  
    const regex = new RegExp(termino, 'i')

    const producto = await Producto.find({nombre: regex, estado: true}).populate('categoria', 'nombre')
  
    const total = await Producto.count({nombre: regex, estado: true})
  
    res.json({
      total,
      results: producto
    })

}

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "categorias":
        buscarCategorias(termino, res);
      break;

    case "productos":
        buscarProductos(termino, res);
      break;

    case "usuarios":
      buscarUsers(termino, res);
      break;

    default:
      res.status(500).json({
        msg: `Se olvido de hacer esta búsqueda`,
      });
  }
};

module.exports = {
  buscar,
};
