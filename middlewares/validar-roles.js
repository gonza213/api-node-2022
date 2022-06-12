const { response } = require("express");

const esAdminRole = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Rol no verificado, token inexistente",
    });
  }

  const { rol, nombre } = req.user;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no esta autorizado para realizar esta petición`,
    });
  }

  next();
};

const tieneRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Rol no verificado, token inexistente",
      });
    }

    if(!roles.includes(req.user.rol)){
            return res.status(401).json({
              msg: `El servicio solicita algunos de estos roles ${roles}`,
            });   
    }

    next();
  };
};

module.exports = {
  esAdminRole,
  tieneRole,
};
