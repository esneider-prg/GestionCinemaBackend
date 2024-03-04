require("dotenv").config(); // Secures variables
const app = require("./utils/app"); // Backend App (server)
const mongo = require("./utils/mongo"); // MongoDB (database)
const { PORT } = require("./constants");
const authRoutes = require("./routes/auth");
const moviesRouter = require("./routes/movie.js");
const funtionRouter = require("./routes/funtioncine.js");
const RouteReservaMovie = require("./routes/reservaMovie.js");
const RouteReservaCliente = require("./routes/reservaCliente.js");
const Uploadrouter = require("./controllers/pelicula/UploadFile.js");
const {admin,protect} = require("./middlewares/jsonwebtoken.js");


async function bootstrap() {
  await mongo.connect();

  app.get("/", (req, res) => res.status(200).json({ message: "Hello Cinema!" }));
  app.get("/health", (req, res) => res.status(200).send());
  app.use("/auth", authRoutes);
  app.use("/movies", moviesRouter);
  app.use("/funtionCine", funtionRouter);
  app.use("/reservaMovie", RouteReservaMovie);
  app.use("/reservaCliente", RouteReservaCliente);
  app.use("/upload", [protect],[admin] ,Uploadrouter);

 

  app.listen(PORT, () => {
    console.log(`✅ Server is listening on port: ${PORT}`);
  });
}

bootstrap();
