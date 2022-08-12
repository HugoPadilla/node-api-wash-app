const { pool } = require("../pgSetting");

/**
 * Consultas las solicitudes que tiene registrado por un lavador.
 * 
 * @param {} id_lavador 
 * @returns 
 */
const getSolicitudesDelLavador = async (id_lavador) => {
    const value = [id_lavador];
    const queryString = "SELECT * FROM solicitudes WHERE id_lavador = $1";
    return await pool.query(queryString, value);
};

/**
 * Consultas las solicitudes registradas por un cliente.
 * 
 * @param {*} idCliente 
 * @returns 
 */
const getSolicitudesDelCliente = async (idCliente) => {
    const valor = [idCliente];
    const queryString = "SELECT * FROM solicitudes WHERE id_cliente = $1";

    return await pool.query(queryString, valor);
};

/**
 * 
 * @param {*} idCliente 
 * @param {*} fecha_solicitud 
 * @param {*} fecha_lavado 
 * @param {*} type_auto 
 * @param {*} placa 
 * @param {*} estado 
 * @returns 
 */
const insertSolicitudByClient = async (
    idCliente,
    fecha_solicitud,
    fecha_lavado,
    type_auto,
    placa,
    estado
) => {
    const values = [idCliente, null, fecha_solicitud, fecha_lavado, type_auto, placa, estado];
    const queryString =
        "INSERT INTO solicitudes(id_cliente, id_lavador, fecha_solicitud, fecha_lavado, type_auto, placa, estado) VALUES((SELECT id FROM clientes WHERE id = $1), $2, $3, $4, $5, $6, $7) RETURNING *";

    return await pool.query(queryString, values);
};

/**
 * Actualiza el estaso de una solicitud espefica en la base de datos.
 * 
 * @param {*} id Identificacion de la solicitud registrada en la base de datos
 * @param {*} state Nuevo estado para la solicitud identificada
 * @returns Promesa del resultado de la query
 */
const updateStateOfSolicitud = async (id, state) => {
    const values = [state, id];
    const queryString = "UPDATE solicitudes SET estado = $1 WHERE id = $2";

    return await pool.query(queryString, values);
};

const updateIdLavadorOfSolicitude = async (id, id_lavador) => {
    const values = [id_lavador, id];
    const queryString = "UPDATE solicitudes SET id_lavador = $1 WHERE id = $2 RETURNING *";

    return await pool.query(queryString, values);
}

module.exports = {
    getSolicitudesDelLavador,
    getSolicitudesDelCliente,
    insertSolicitudByClient,
    updateStateOfSolicitud,
    updateIdLavadorOfSolicitude
};
