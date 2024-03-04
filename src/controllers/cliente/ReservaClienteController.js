const ReservaClien = require("../../models/ReservaClienteModel");
const asyncHandler = require("express-async-handler");
const ReservaMo = require("../../models/ReservaMovieModel");
const Movie = require("../../models/MoviesModel.js");

const getReservaCliente = asyncHandler(async (req, res) => {
    try {

        const ReservasCliente = await ReservaClien.find()
        res.json({ ReservasCliente });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const getReservaClienteById = asyncHandler(async (req, res) => {
    try {
        const reservaClienteId = req.params.id;
        console.log(reservaClienteId)
        const reservasClienteValidar = await ReservaClien.find();
        console.log(reservasClienteValidar)
        const reservasEncontradas = reservasClienteValidar.filter(res => res.userId == reservaClienteId);
        console.log("entre" + reservasEncontradas)



        const reservasCliente = await ReservaClien.find({ userId: reservaClienteId }, { reservaPeliculaId: 1, peliculaId: 1, asientosUsuario: 1, ticketsNum: 1, valorTotal: 1, createdAt: 1 });
        console.log(reservasCliente)
        const informacionReservasPeli = [];
        const informacionReservasSala = [];

        const datosSimples = reservasCliente.map(reserva => ({
            id: reserva._id,
            peliculaId: reserva.peliculaId,
            reservaPeliculaId: reserva.reservaPeliculaId,
            userId: reserva.userId
        }));
        //  console.log(reservasCliente)
        for (const reserva of reservasCliente) {
            try {
                const reservasMovie = await Movie.find({ _id: reserva.peliculaId });
                informacionReservasPeli.push(reservasMovie);

                const reservasMovieSala = await ReservaMo.find({ _id: reserva.reservaPeliculaId });
                informacionReservasSala.push(reservasMovieSala);
            } catch (error) {
                console.error(`Error al obtener información de la reserva con ID ${reserva.peliculaId}: ${error.message}`);
            }
        }
        res.json({ reservasCliente, informacionReservasPeli, informacionReservasSala });

    } catch (error) {
        res.status(400).json({ message: "Error Reservas clientessss" });
    }
});

const createReservaCliente = asyncHandler(async (req, res) => {
    try {
        // get data from request body
        const {
            userId,
            peliculaId,
            reservaPeliculaId,
            ticketsNum,
            valorTotal,
            asientosUsuario,
            estado,
        } = req.body;
        // create a new movie
        const reservaReservaCliente = new ReservaClien({
            peliculaId,
            reservaPeliculaId,
            asientosUsuario,
            ticketsNum,
            valorTotal,
            estado,
            userId: req.user._id,
        });

        // save the movie in database
        if (reservaReservaCliente) {
            const reservaReservaClientee = await reservaReservaCliente.save();
            res.status(201).json(reservaReservaClientee);
        } else {
            res.status(400);
            throw new Error("Invalid ReservaCliente data");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = {
    createReservaCliente,
    getReservaCliente,
    getReservaClienteById,
};
