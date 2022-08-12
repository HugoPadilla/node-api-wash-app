const { pool } = require("./pgSetting");

const getLavadores = async () => {
    return await pool.query("select * from lavadores");
};

const getLavadorPorCredenciales = async (email, password) => {
    const values = [email, password];

    return await pool.query(
        "SELECT id, nombre, apellidos, email, roll, status FROM lavadores WHERE email = $1 AND password = $2",
        values
    );
};

/**
 * Consulta los lavadores por su estado en orde acendente
 * @param {*} status 
 * @returns 
 */
const getLavadorForState = async (status) => {

    const values = [status];
    const queryString = "SELECT * FROM lavadores WHERE status = $1 ORDER BY last_status_change ASC";

    return await pool.query(queryString, values)
}


const insertLavador = async (name, last_name, email, password, roll) => {
    const values = [name, last_name, email, password, roll, false];
    const text =
        "INSERT INTO lavadores(nombre, apellidos, email, password, roll, status) VALUES ($1, $2, $3, $4, $5, $6)";

    return await pool.query(text, values);
};

const updateStateLavador = async (id_lavador, state) => {
    const values = [state, id_lavador];
    const text = "UPDATE lavadores SET last_status_change = (SELECT now()), status = $1 WHERE id = $2";

    return await pool.query(text, values);
};

module.exports = {
    getLavadores,
    getLavadorPorCredenciales,
    getLavadorForState,
    insertLavador,
    updateStateLavador,
};
