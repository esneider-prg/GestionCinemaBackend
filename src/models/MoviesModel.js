const mongoose = require("mongoose");



const moviesSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Titulo: {
      type: String,
      required: true,
    },
    Genero: {
      type: String,
      required: true,
    },
    Sinopsis: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    Formato: {
      type: String,
      required: true,
    },
    Duracion: {
      type: String,
      required: true,
    },
    Clasificacion: {
      type: String,
      required: true,
    },
    Valorboleta: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movies", moviesSchema);


