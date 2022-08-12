const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const LoginRoute = require("./src/routes/LoginRoute");
const routesClientes = require("./src/routes/route-client");
const LavadorRoute = require('./src/routes/LavadorRoute')
const SolicitudesRoute = require("./src/routes/SolicitudesRoute");

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Setup middleware
 */
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

/**
 * Endpoint with modules
 */
app.use("/api", LoginRoute);
app.use("/api", routesClientes);
app.use("/api", LavadorRoute)
app.use("/api", SolicitudesRoute);

app.use(express.static("public"));

/**
 * Endpoint test
 */
app.get("/api", (_req, res) => {
    res.send("Api ok");
});

/**
 * Listener
 */
app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto: " + PORT);
});
