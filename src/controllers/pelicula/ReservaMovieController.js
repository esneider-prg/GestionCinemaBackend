const ReservaMo = require("../../models/ReservaMovieModel");
const asyncHandler = require("express-async-handler");

const getReservaMovies = asyncHandler(async (req, res) => {
  try {

    const ReservasMovie = await ReservaMo.find()
    res.json({ ReservasMovie });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateMovie = asyncHandler(async (req, res) => {
  try {
    // get data from request body
    const {
      Titulo,
      SubTitulo,
      Genero,
      Sinopsis,
      imageCartelera,
      imageBackground,
      Formato,
      Clasificacion,
      HoraDisponibles,
      Valorboleta,
    } = req.body;

    // find movie by id in database
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      // update movie data
      movie.Titulo = Titulo || movie.Titulo;
      movie.SubTitulo = SubTitulo || movie.SubTitulo;
      movie.Genero = Genero || movie.Genero;
      movie.Sinopsis = Sinopsis || movie.Sinopsis;
      movie.image = image || movie.image;
      movie.imageCartelera = imageCartelera || movie.imageCartelera;
      movie.imageBackground = imageBackground || movie.imageBackground;
      movie.Formato = Formato || movie.Formato;
      movie.Clasificacion = Clasificacion || movie.Clasificacion;
      movie.HoraDisponibles = HoraDisponibles || movie.HoraDisponibles;
      movie.Valorboleta = Valorboleta || movie.Valorboleta;
      // save the movie in database

      const updatedMovie = await movie.save();
      // send the updated movie to the client
      res.status(201).json(updatedMovie);
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private/Admin

const deleteMovie = asyncHandler(async (req, res) => {
  try {
    // find movie by id in database
    const movie = await Movie.findById(req.params.id);
    // if the movie is found delete it
    // console.log(movie);
    if (movie) {
      await movie.deleteOne();
      res.json({ message: "Movie removed" });
    }
    // if the movie is not found send 404 error
    else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
const getReservaMovieById = asyncHandler(async (req, res) => {
  try {
    const peliculaId = req.params.id;
    console.log(peliculaId)
    // Buscar las reservas de película en la base de datos con el mismo peliculaId
    const reservasMovie = await ReservaMo.find({ peliculaId: peliculaId });

    // Devolver las reservas de película encontradas
    res.json({ reservasMovie });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


const createReservaMovie = asyncHandler(async (req, res) => {
  try {
    // get data from request body
    const {
      hora,
      sala,
      asientosSala,
      numTickets,
      estado,
      peliculaId,
    } = req.body;

    // create a new movie
    const reservaPelicula = new ReservaMo({
      hora,
      sala,
      asientosSala,
      numTickets,
      estado,
      peliculaId,
      userId: req.user._id,
    });

    // save the movie in database
    if (reservaPelicula) {
      const createdreservaPelicula = await reservaPelicula.save();
      res.status(201).json(createdreservaPelicula);
    } else {
      res.status(400);
      throw new Error("Invalid Reserva Movie data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = {
  createReservaMovie,
  getReservaMovies,
  getReservaMovieById
};
