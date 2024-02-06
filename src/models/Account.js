const mongoose = require("mongoose");

const instance = new mongoose.Schema(
  { 


    tipodocumento: {
      type: String,
      required: true,
      
    },
    document: {
      type: String,
      required: true,
      min: 6,
      max: 12,
    },
   

    username: {
      type: String,
      min: 4,
      max: 20,
      required: true,
      lowercase: true,
      unique: true,
    },
    
    lastname: {
      type: String,
      min: 4,
      max: 20,
      required: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String, 
      unique: true,
      required: true,
      max: 50,
      min: 5,
      max: 10,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
  //comentario
);
const modelName = "UserCinema";

module.exports = mongoose.model(modelName, instance);
