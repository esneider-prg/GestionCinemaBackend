const express = require("express");
const {createReservaMovie,getReservaMovies, getReservaMovieById,updateReservaMovie,getReservaMovieSillas} =require("../controllers/pelicula/ReservaMovieController")
const {admin,protect} = require("../middlewares/jsonwebtoken");



const router = express.Router();

//Rutas publicas
router.get("/", getReservaMovies);
router.get("/:id", getReservaMovieById);
router.put("/asientos/:id", [protect], updateReservaMovie);

router.get("/asientos/:id", getReservaMovieSillas);


//Rutas adminstrador

router.post("/", [protect],[admin] ,createReservaMovie);
// router.delete("/:id", [protect],[admin] ,deleteMovie);
// router.put("/:id", [protect],[admin] ,updateMovie);



module.exports = router
