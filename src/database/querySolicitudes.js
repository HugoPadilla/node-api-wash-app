const { pool } = require("./pgSetting");

/**
 * Realiza un funcion que consulte a la base de datos.
 * Esta consulta debe traer todo los registros de la tabla "solicitudes"
 * que tiene como columna (estado, fechaLavado, fechaSolicitud, id, idCliente, idLavador)
 */

const getSolicitudes = async () => {
    const resultadoP = await pool.query("SELECT * FROM solicitudes");
    return resultadoP;
};

const insertNuevaSolicitud = async (
    estado,
    fechaLavado,
    fechaSolicitud,
    id,
    idCliente,
    idLavador
) => {
    // INSERT INTO nobreTablar (estado, fechaLavado) VALUES ($1, $2);
    // VALUES [estado, fechaLavado]

    const queryString =
        "INSERT INTO solicitudes" +
        "(estado, fechaLavado, fechaSolicitud, id, idCliente, idLavador))" +
        "VALUES ($1, $2, $3, $4, $5, $6";
    const valores = [
        estado,
        fechaLavado,
        fechaSolicitud,
        id,
        idCliente,
        idLavador,
    ];

    const resultado = await pool.query(queryString, valores);
    return resultado;
};
/*(estado, fechaLavado, fechaSolicitud, id, idCliente, idLavador)
 */
const updateSolicitud = (
    estado,
    fechaLavado, 
    fechaSolicitud, 
    id 
    ) => {

    // UPDATE tabla SET nombre = $1  where id = $2


    const queryString = "UPDATE solicitudes SET estado = $1, fechaLavado = $2," +
    "fechaSolicitud =$3, WHERE id = $4";
    const valorSolicitud = [estado, fechaLavado, fechaSolicitud, id];
    const actualizar = pool.query(queryString, valorSolicitud);
    return actualizar 
};


const updatedIdLavador = (idSolicitud, idLavador) => {
    const queryString = "UPDATE solicitudes SET idLavador = $1 WHERE id = $2"
    const valores = "";
    
}

const deleteSolicitud = async (idSolicitud) => {
    const queryString = "DELETED FROM solicitudes WHERE id = $1";
    const valores = [idSolicitud];
    const eliminados = pool.query(queryString, valores);
    return eliminados;
};
