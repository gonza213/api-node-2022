const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { esRolValido, emailExiste } = require("../helpers/db-validators");

const {
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/user");

const router = Router();

router.get("/", getUser);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo no es válido").isEmail(),
    check('email').custom(emailExiste),
    check("password", "El password debe tener al menos 6 carácteres").isLength({
      min: 6,
    }),
    // check("rol", "El rol no es válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  postUser
);
router.put("/:id", putUser);
router.delete("/", deleteUser);

module.exports = router;
