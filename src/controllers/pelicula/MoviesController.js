const Movie = require("../../models/MoviesModel.js");
const asyncHandler = require("express-async-handler");



const importMovies = asyncHandler(async (req, res) => {
    // first we make sure our Movies table is empty by delete all documents
    await Movie.deleteMany({});
    // then we insert all movies from MoviesData
    const movies = await Movie.insertMany(MoviesData);
    res.status(201).json(movies);
  });
  
  // @desc    get all movies
  // @route   GET /api/movies
  // @access  Public
  
  const getMovies = asyncHandler(async (req, res) => {
    try {
      // filter movies by Titulo, Genero, Sinopsis, Formato, Duracion and search
      const { Titulo, Genero, Sinopsis, Formato, Duracion, search } = req.query;
      let query = {
        ...(Titulo && { Titulo }),
        ...(Genero && { Genero }),
        ...(Sinopsis && { Sinopsis }),
        ...(Formato && { Formato }),
        ...(Duracion && { Duracion   }),
        ...(search && { Titulo: { $regex: search, $options: "i" } }),
      };
  
      // load more movies functionality
      const page = Number(req.query.pageNumber) || 1; // if pageNumber is not provided in query we set it to 1
      const limit = 10; // 10 movies per page
      const skip = (page - 1) * limit; // skip 2 movies per page
  
      // find movies by query, skip and limit
      const movies = await Movie.find(query)
        // .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
  
      // get total number of movies
      const count = await Movie.countDocuments(query);
  
      // send response with movies and total number of movies
      res.json({
        movies,
        page,
        pages: Math.ceil(count / limit), // total number of pages
        totalMovies: count, // total number of movies
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

  const updateMovie = asyncHandler(async (req, res) => {
    try {
      // get data from request body
      const {
        Titulo,
        Genero,
        Sinopsis,
        image,
        Formato,
        Duracion,
        Clasificacion,
        Valorboleta,
      } = req.body;
  
      // find movie by id in database
      const movie = await Movie.findById(req.params.id);
  
      if (movie) {
        // update movie data
        movie.Titulo = Titulo || movie.Titulo;
        movie.Genero = Genero || movie.Genero;
        movie.Sinopsis = Sinopsis || movie.Sinopsis;
        movie.image = image || movie.image;
        movie.Formato = Formato || movie.Formato;
        movie.Duracion = Duracion || movie.Duracion;
        movie.Clasificacion = Clasificacion || movie.Clasificacion;
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
  

  // @route   DELETE /api/movies/:id
  // @access  Private/Admin
  
  const deleteMovie = asyncHandler(async (req, res) => {
    try {
      // find movie by id in database
      const movie = await Movie.findById(req.params.id);
      // if the movie is found delete it
      
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

  
  const createMovie = asyncHandler(async (req, res) => {
    try {
      // get data from request body
      const {
        Titulo,
        Genero,
        Sinopsis,
        image,
        Formato,
        Duracion,
        Clasificacion,
        Valorboleta,
      } = req.body;
  
      // create a new movie
      const movie = new Movie({
        Titulo,
        Genero,
        Sinopsis,
        image,
        Formato,
        Duracion,
        Clasificacion,
        Valorboleta,
        userId: req.user._id,
      });
  
      // save the movie in database
      if (movie) {
        const createdMovie = await movie.save();
        res.status(201).json(createdMovie);
      } else {
        res.status(400);
        throw new Error("Invalid movie data");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  module.exports = {
    importMovies,
    getMovies,
    updateMovie,
    deleteMovie,
    createMovie,
  };