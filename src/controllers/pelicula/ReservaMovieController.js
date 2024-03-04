const ReservaMo = require("../../models/ReservaMovieModel");
const ReservaClien = require("../../models/ReservaClienteModel");
const asyncHandler = require("express-async-handler");


const getReservaMovies = asyncHandler(async (req, res) => {
  try {

    const ReservasMovie = await ReservaMo.find()
    res.json({ ReservasMovie });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateReservaMovie = asyncHandler(async (req, res) => {
  try {
    // get data from request body
    const {
      asientosSala,
      asientosNumeroOcupado,
      estado,
    } = req.body;

    // find movie by id in database
    const reserva = await ReservaMo.findById(req.params.id);

    if (reserva) {
      // update movie data
      reserva.asientosSala = asientosSala || reserva.asientosSala;
      reserva.asientosNumeroOcupado = asientosNumeroOcupado || reserva.asientosNumeroOcupado;
      reserva.estado = estado || reserva.estado;

      // save the movie in database

      const updatedReserva = await reserva.save();
      // send the updated movie to the client
      res.status(201).json(updatedReserva);
    } else {
      res.status(404);
      throw new Error("Reserva no encontrada");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


const getReservaMovieSillas = asyncHandler(async (req, res) => {
  const asientosOcupados = [];
  let totalTickets = 0;
  // try {
  const ReservasMovieSillas = await ReservaMo.findById({ _id: req.params.id })
  //
  if (ReservasMovieSillas) {
    const {
      hora,
      sala,
      asientosSala,
      asientosDisponibles,
      asientosNumeroOcupado,
      estado,
      peliculaId,
      userId,
    } = ReservasMovieSillas;

    const reservaPeliculaSillas = await ReservaClien.find({ reservaPeliculaId: req.params.id }, { asientosUsuario: 1, ticketsNum: 1 });
    // const { asientosUsuario, ticketsNum } = ReservasClienteSillas;
    reservaPeliculaSillas?.forEach((objeto) => {
      asientosOcupados.push(...objeto.asientosUsuario);
      totalTickets += parseInt(objeto.ticketsNum);
    });
    console.log("Asientos acumulados:", asientosOcupados);
    console.log("Total de tickets:", totalTickets);



    if (ReservasMovieSillas) {
      ReservasMovieSillas.asientosSala = asientosOcupados || ReservasMovieSillas.asientosSala;
      ReservasMovieSillas.asientosNumeroOcupado = totalTickets || ReservasMovieSillas.asientosNumeroOcupado;
      ReservasMovieSillas.hora = hora || ReservasMovieSillas.hora;
      ReservasMovieSillas.sala = sala || ReservasMovieSillas.sala;
      ReservasMovieSillas.asientosDisponibles = asientosDisponibles || ReservasMovieSillas.asientosDisponibles;
      ReservasMovieSillas.estado = estado || ReservasMovieSillas.estado;
      ReservasMovieSillas.peliculaId = peliculaId || ReservasMovieSillas.peliculaId;
      ReservasMovieSillas.userId = userId || ReservasMovieSillas.userId;

      const updatedReservaMovieSillas = await ReservasMovieSillas.save();
      res.status(201).json(updatedReservaMovieSillas);
    } else {
      res.status(400).json({ mensaje: "No se creo la reservaSilla" });
    }
    res.json({
      //ReservasMovieSillas
      asientosOcupados: asientosOcupados,
      totalTickets: totalTickets
    });
  } else {
    res.status(400).json({ mensaje: "No se encontró la reserva de la película indicada" });
  }

  // } catch (error) {
  //   res.status(400).json({ mensaje: "No se encontró la reserva de la película indicada" });
  // }
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
      asientosDisponibles,
      asientosNumeroOcupado,
      estado,
      peliculaId,
    } = req.body;

    // create a new movie
    const reservaPelicula = new ReservaMo({
      hora,
      sala,
      asientosSala,
      asientosDisponibles,
      asientosNumeroOcupado,
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
  getReservaMovieById,
  updateReservaMovie,
  getReservaMovieSillas,
};
