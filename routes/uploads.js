const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarSubirArchivo } = require("../middlewares");

const { coleccionesPermitidas } = require("../helpers");

const {
  cargarArchivo,
  actualizarArchivo,
  mostrarImagen,
  actualizarArchivoCloudinary,
} = require("../controllers/uploads");

const router = Router();

router.post("/", [validarSubirArchivo], cargarArchivo);

router.put(
  "/:coleccion/:id",
  [
    validarSubirArchivo,
    check("id", "El ID no es válido").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  // actualizarArchivo
  actualizarArchivoCloudinary
);

router.get(
  "/:coleccion/:id",
  [
    check("id", "El ID no es válido").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  mostrarImagen
);

module.exports = router;
