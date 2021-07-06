const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Importation des routes
// const equipeRoute = require("./api/routers/equipes");
// const joueurRoute = require("./api/routers/joueurs");
// const competitionRoute = require("./api/routers/competitions");
// const entraineurRoute = require("./api/routers/entraineur");
// const arbitreRoute = require("./api/routers/arbitres");
// const saisonRoute = require("./api/routers/saisons");
// const stadeRoute = require("./api/routers/stades");
// const participantRoute = require("./api/routers/participants");

// const userRoute = require("./api/routers/auth");

// Dotenv config
dotenv.config();

// Connect to mongongoose
mongoose.connect(
  process.env.DB_CONNECT_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  () => console.log("Connexion a la base de donnees reussie")
);

const TEST = process.env.TEST || "test pas OK";

// Middleware

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use("/uploads", express.static("uploads"));

// app.use("/equipes/", equipeRoute);
// app.use("/joueurs/", joueurRoute);
// app.use("/comp/", competitionRoute);
// app.use("/entraineurs", entraineurRoute);
// app.use("/arbitres", arbitreRoute);
// app.use("/saisons", saisonRoute);
// app.use("/stades", stadeRoute);
// app.use("/participants", participantRoute);

// app.use("/admin/", userRoute);
app.get("/", (req, res) => {
    res.status(200).json({message: "Bienvenue sur terre..."})
})

app.use((req, res, next) => {
  const error = new Error("Route non définie");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mon serveur node tourne sur le port ${PORT}, ${TEST}`);
});