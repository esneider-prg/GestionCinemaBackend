const express = require("express");
const {createFuntionCine,deleteFuntionCine,updateFuntionCine,getFuntionCine} = require("../controllers/pelicula/FuntionCineController.js");
const {admin,protect} = require("../middlewares/jsonwebtoken.js");



const router = express.Router();





//Rutas adminstrador
router.post("/", [protect],[admin] ,createFuntionCine);
router.delete("/:id", [protect],[admin] ,deleteFuntionCine);
router.put("/:id", [protect],[admin] ,updateFuntionCine);
router.get("/", [protect],[admin] ,getFuntionCine);





module.exports = router
