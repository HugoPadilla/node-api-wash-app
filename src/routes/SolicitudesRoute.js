const express = require("express");
const {
    insertSolicitudByClient,
    getSolicitudesDelCliente,
    getSolicitudesDelLavador,
    updateStateOfSolicitud,
} = require("../database/Quety/QuerySolicitudes");
const { changeLavadorForCurrentSolicitude } = require("../helper/algoritmo");
const router = express.Router();

/**
 * Obtener la solicitudes registradas
 * * En funcion del roll de usuario delvuente sus propias solicitudes
 */
router.get("/solicitudes", async (req, res) => {
    const { id_owner, roll } = req.query;

    let result = {
        count: null,
        solicitudes: [],
    };

    try {
        if (roll === "cliente") {
            result = await getSolicitudesDelCliente(id_owner);
        }

        if (roll === "lavador") {
            result = await getSolicitudesDelLavador(id_owner);
        }

        console.log(result);

        res.status(202).json({
            status: "success",
            count: result.rowCount,
            solicitudes: result.rows,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: error.severity,
            message: error.detail,
        });
    }
});

/**
 * Inserta un nueva solicitud
 * *
 * Todo: Implemenetar la asignacion de un lavador a una solicitud nueva
 */
router.post("/solicitudes", async (req, res) => {
    console.info(req);

    try {
        const { solicitud } = req.body;
        const { id_cliente, fecha_creacion, fecha_lavado, type_auto, placa } =
            solicitud;
        const defaultState = "pendiente";

        const result = await insertSolicitudByClient(
            id_cliente,
            fecha_creacion,
            fecha_lavado,
            type_auto,
            placa,
            defaultState
        );

        console.info(result);

        /**
         * Todo: Crear una funcion para asignar un lavador a esta solicitud
         * ? En funcion de los lavadores dispinibles.
         *
         * ! Se querie ademas, cambiar el estado de la solicitud de 'pendiente' a 'asignado'
         *
         **/

        const resultAfterChange = await changeLavadorForCurrentSolicitude(result.rows[0]);

        res.status(202).json({
            status: "success",
            data: {
                solicitud: resultAfterChange,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            code: error.code,
            data: error.detail,
            status: error.severity,
        });
    }
});

router.put("/solicitudes", async (req, res) => {
    try {
        const { id, state } = req.query;

        const result = await updateStateOfSolicitud(id, state);
        console.info(result);
        res.status(202).json({
            status: "success",
            data: null,
        });
    } catch (error) {
        console.warn(error);
        res.status(404).json({
            code: error.code,
            data: error.detail,
            status: "error",
        });
    }
});

router.delete("/solicitudes", (req, res) => {});

module.exports = router;
