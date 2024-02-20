const { object } = require("joi");
const mongoose = require("mongoose");



const Schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pelicula: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pelicula',
      required: true,
    },
    reservaPeliculaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reserva',
      required: true,
    },
    asientosUsuario:[],
    estado: {
      type: String,
      enum: ['pendiente', 'confirmada', 'cancelada'],
      default: 'pendiente',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ReservaCliente", FuntionCineSchema);