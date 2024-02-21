const express = require("express");
const {createReservaMovie,getReservaMovies, getReservaMovieById} =require("../controllers/pelicula/ReservaMovieController")
const {admin,protect} = require("../middlewares/jsonwebtoken");



const router = express.Router();

//Rutas publicas
router.get("api/v1/", getReservaMovies);
 router.get("api/v1/:id", getReservaMovieById);


//Rutas adminstrador

router.post("api/v1/", [protect],[admin] ,createReservaMovie);
// router.delete("/:id", [protect],[admin] ,deleteMovie);
// router.put("/:id", [protect],[admin] ,updateMovie);



module.exports = router
