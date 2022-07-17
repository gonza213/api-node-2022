const { Router } = require("express");
const {
  crearOrden,
  notificationOrden,
} = require("../controllers/mercado-pago");

const router = Router();
//Crear categoria - privado- token válido
router.post("/crear-orden", crearOrden);

router.post("/notificacion", notificationOrden);

module.exports = router;
