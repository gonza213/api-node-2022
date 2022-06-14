


const validaCampos  = require("../middlewares/validar-campos");
const validaJWT  = require("../middlewares/validar-jwt");
const validaRoles = require("../middlewares/validar-roles");
const validarSubirArchivo = require('../middlewares/validar-archivo')

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
    ...validarSubirArchivo
}