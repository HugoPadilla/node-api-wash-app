const express = require("express");
const app = express();

const { pool } = require("./src/database/pgSetting");

const PORT = process.env.PORT || 3000;

// 1. Setup use - elementos y complementos
app.use(express.static("public"));

// 3. Definicion API - end-point
app.get("/api", (req, res) => {
    res.send("Api ok");
});

app.get("/api/clientes", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM clientes");
        res.json({
            count: result.rowCount,
            clients: result.rows,
        });
        pool.end();
    } catch (error) {
        console.log(error);
    }
});

// End - Ejecutar server
app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto: " + PORT);
});
