const mongoose = require("mongoose");

const instance = new mongoose.Schema(
  { 
    username: {
      type: String,
      min: 4,
      max: 20,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user","admin"],
      default: "user",
    },
   /*idPerson: {
    type: String,
    default: "",
    max:10,
  },
  Document: {
    type: String,
    required: true,
    enum: ["CC","TI"],
  }, email: {
      type: String, 
      unique: true,
      default: "",
      max: 50,
      min: 5,
      max: 10,
     
    },
    phone: {
      type: String,
      default: "",
      min: 4,
      max: 10,
    },*/
  },
  {
    timestamps: true,
  }
);
const modelName = "UserCinema";

module.exports = mongoose.model(modelName, instance);
