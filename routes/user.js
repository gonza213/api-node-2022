const { Router } = require("express");
const { check } = require("express-validator");

const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} = require("../middlewares");

const {
  esRolValido,
  emailExiste,
  existeUsuarioId,
} = require("../helpers/db-validators");

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
    check("email").custom(emailExiste),
    check("password", "El password debe tener al menos 6 carácteres").isLength({
      min: 6,
    }),
    // check("rol", "El rol no es válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  postUser
);
router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioId),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  putUser
);
router.delete(
  "/:id",
  [
    validarJWT,
    // esAdminRole,
    tieneRole("ADMIN_ROLE", "USER_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioId),
    validarCampos,
  ],
  deleteUser
);

module.exports = router;
