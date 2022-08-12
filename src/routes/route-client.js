const express = require("express");
const router = express.Router();
const queryClientes = require("../database/queryClient");

router.get("/clientes", async (req, res) => {
    const result = await queryClientes.getClientes();

    res.json({
        rowCount: result.rowCount,
        clientes: result.rows,
    });
});

/**
 * Consulta una cliente en espesifico por id
 */
router.get("/cliente/:id", (req, res) => {
    const result = getClientById();
    console.log(result);
});

router.post("/cliente", (req, res) => {
    const { email, password } = req.query;
    res.send("Optener lavador: " + email);
});

module.exports = router;
