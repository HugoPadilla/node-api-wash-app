const express = require("express");
const { updateStateLavador } = require("../database/queryLavador");
const router = express.Router();

/**
 * Actualiza el estado del lavador
 * * Se recibe en el body el id del lavador y el state nuevo
 */
router.put('/lavador', async (reques, response) => {
    try {

        const {id_lavador, state} = reques.body;

        const result = await updateStateLavador(id_lavador, state);

        console.log(result);

        response.status(202).json({
            status:"success",
            message: "Se ha actualzado el estado",
            data: null
        })
        
    } catch (error) {
        response.status(404).json({
            code: error.code,
            status: "error",
            message: error.detail
        })
    }
})

module.exports = router;
