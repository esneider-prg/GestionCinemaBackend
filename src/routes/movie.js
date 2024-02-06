const express = require("express");
const {createMovie,deleteMovie,getMovies,updateMovie} = require("../controllers/pelicula/MoviesController.js");
const {admin,protect} = require("../middlewares/jsonwebtoken");



const router = express.Router();

//Rutas publicas
router.get("/", getMovies);



//Rutas adminstrador
router.post("/", [protect],[admin] ,createMovie);
router.delete("/:id", [protect],[admin] ,deleteMovie);
router.put("/:id", [protect],[admin] ,updateMovie);



module.exports = router
