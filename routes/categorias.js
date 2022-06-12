const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();


//Obtener todas las categorias - público
router.get('/', (req, res) => {
    res.json('Get')
})


//Obtener todas las categorias por id - público
router.get('/:id', (req, res) => {
    res.json('Get  ID')
})


//Crear categoria - privado- token válido
router.post('/', (req, res) => {
    res.json('Post')
})

//Actualizar categoria - privado- token válido
router.put('/:id', (req, res) => {
    res.json('Put')
})

//Borrar categoria - Admin
router.delete('/:id', (req, res) => {
    res.json('Delete')
})





module.exports = router;
