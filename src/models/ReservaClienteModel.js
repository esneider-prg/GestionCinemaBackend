const mongoose = require("mongoose");

const ClienteSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    peliculaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pelicula',
      required: true,
    },
    reservaPeliculaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reserva',
      required: true,
    },

    asientosUsuario: [],
    ticketsNum: {
      type: String,
      default: '0',
    },
    valorTotal: {
      type: String,
      default: '0',
    },
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

module.exports = mongoose.model("reservacliente", ClienteSchema);