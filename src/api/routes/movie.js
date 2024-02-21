const express = require("express");
const {createMovie,deleteMovie,getMovies,updateMovie,getMovieById} = require("../controllers/pelicula/MoviesController.js");
const {admin,protect} = require("../middlewares/jsonwebtoken");



const router = express.Router();

//Rutas publicas
router.get("api/v1/", getMovies);
router.get("api/v1/:id", getMovieById);


//Rutas adminstrador
router.post("api/v1/", [protect],[admin] ,createMovie);
router.delete("api/v1/:id", [protect],[admin] ,deleteMovie);
router.put("api/v1/:id", [protect],[admin] ,updateMovie);



module.exports = router
