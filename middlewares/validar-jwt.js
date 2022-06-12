const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require('../models/user')

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if(!token){
    return res.status(401).json({
        msg: 'No existe token en la petición'
    })
  }

 try {
    
   const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

   const user = await User.findById(uid)

   //Verificar si el usuario existe
   if(!user){
    return res.status(401).json({
        msg: 'Token no válido - usuario inexistente'
    })
   }


   //Verificar su usuario esta en  estado true
   if(!user.estado){
    return res.status(401).json({
        msg: 'Token no válido - estado false'
    })
   }

   req.user = user;

    next();
 } catch (error) {
    console.log(error);
    return res.status(401).json({
        msg: 'Token no válido'
    })
 }

  
};

module.exports = {
  validarJWT,
};
