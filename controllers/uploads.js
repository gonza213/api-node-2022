const { response } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivo = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({
      msg: "No hay archivos para cargar",
    });
    return;
  }

  try {

    // const nombre = await subirArchivo(req.files, ['doc', 'dwg'], 'autocad')
    const nombre = await subirArchivo(req.files, undefined, 'images')

    res.json({
      nombre
    })
    
  } catch (msg) {
    
    res.status(400).json({msg})
  }


};

module.exports = {
  cargarArchivo,
};
