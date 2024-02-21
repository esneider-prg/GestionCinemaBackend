require("dotenv").config(); // Secures variables
const app = require("./utils/app"); // Backend App (server)
const mongo = require("./utils/mongo"); // MongoDB (database)
const { PORT } = require("../api/constants/index.js");
const authRoutes = require("./routes/auth");
const moviesRouter = require("./routes/movie.js");
const funtionRouter = require("./routes/funtioncine.js");
const RouteReservaMovie = require("./routes/reservaMovie.js");
const Uploadrouter = require("./controllers/pelicula/UploadFile.js");
const {admin,protect} = require("./middlewares/jsonwebtoken.js");


async function bootstrap() {
  await mongo.connect();

  app.get("/api", (req, res) => res.status(200).json({ message: "Hello Cinemaaaaa!" }));
  app.get("/api/health", (req, res) => res.status(200).json({ message: "Hello Cinema!" }));
  app.use("/api/auth", authRoutes);
  app.use("/api/movies", moviesRouter);
  app.use("/api/funtionCine", funtionRouter);
  app.use("/api/reservaMovie", RouteReservaMovie);
  app.use("/api/upload",Uploadrouter);

 

  app.listen(PORT, () => {
    console.log(`✅ Server is listening on port: ${PORT}`);
  });
}

bootstrap();
