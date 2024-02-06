const mongoose = require("mongoose");



const FuntionCineSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Sala: {
      type: String,
      required: true,
    },
    Hora: {
      type: String,
      required: true,
    },
    Sillas: {
        type: Number,
        require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FuntionCine", FuntionCineSchema);