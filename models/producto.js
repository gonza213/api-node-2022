const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  descripcion: {
    type: String,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  img: {
    type: String
  }
});

ProductoSchema.methods.toJSON = function () {
  const { __v, estado, ...producto } = this.toObject();

  if (producto.user) {
    producto.user.uid = producto.user._id;
    delete producto.user._id;
  }

  return producto;
};

module.exports = model("Producto", ProductoSchema);
