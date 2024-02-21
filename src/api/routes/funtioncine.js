const express = require("express");
const {createFuntionCine,deleteFuntionCine,updateFuntionCine,getFuntionCine} = require("../controllers/pelicula/FuntionCineController.js");
const {admin,protect} = require("../middlewares/jsonwebtoken.js");



const router = express.Router();





//Rutas adminstrador
router.post("api/v1/", [protect],[admin] ,createFuntionCine);
router.delete("api/v1/:id", [protect],[admin] ,deleteFuntionCine);
router.put("api/v1/:id", [protect],[admin] ,updateFuntionCine);
router.get("api/v1/", [protect],[admin] ,getFuntionCine);





module.exports = router
