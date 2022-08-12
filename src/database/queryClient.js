const { pool } = require("./pgSetting");

/**
 * Realiza un consulta a la base de datos y devuente la lista de clientes
 *
 * @returns Lista de clientes
 */
async function getClientes() {
    try {
        const res = await pool.query("select * from clientes");
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
}

const getClientById = async (idClient) => {
    try {
        const values = [idClient];

        const result = await pool.query(
            "SELECT id, nombre, apellidos FROM clientes WHERE  id =  $1",
            values
        );
        return result;
    } catch (error) {
        console.log("Erro en la consulta " + error);
    }
};

const getClientesPorCredenciales = async (email, password) => {
    const values = [email, password];

    return await pool.query(
        "SELECT id, nombre, apellidos, email, roll FROM clientes WHERE email = $1 AND password = $2",
        values
    );
};

/**
 * Inserta un nuevo cliente en la base de datos
 *
 * @param {Nombre del cliente} name
 * @param {Apellido del cliente} last_name
 * @param {Email del sesion del cliente} email
 * @param {Contraseña de inicio de sesion} password
 */
const insertClient = async (name, last_name, email, password, roll) => {
    const values = [name, last_name, email, password, roll];
    const text =
        "INSERT INTO clientes(nombre, apellidos, email, password, roll) VALUES ($1, $2, $3, $4, $5)";

    return await pool.query(text, values);
};

/**
 * Elimina un cliente en la base de datos
 * @param {Tiene el id} id
 */
const deleteClient = async (id) => {
    try {
        const text = "DELETE FROM clientes WHERE id = $1";
        const value = [id];
        const res = await pool.query(text, value);
        console.log(res);
    } catch (e) {
        console.log(e);
    }
};

/**
 * Actualiza Cliente
 * @param {Nombre del cliente} name
 * @param {Apellido del cliente} last_name
 * @param {Email del cliente} email
 * @param {Contraseña del cliente} password
 * @param {Id Cliente} idClientToUpdate
 */
const updateClient = async (
    name,
    last_name,
    email,
    password,
    idClientToUpdate
) => {
    try {
        const text =
            "UPDATE clientes SET nombre = $1, apellidos = $2, email = $3, password = $4 WHERE id = $5";
        const values = [name, last_name, email, password, idClientToUpdate];

        const res = pool.query(text, values);
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    getClientes,
    getClientById,
    getClientesPorCredenciales,
    insertClient,
    updateClient,
    deleteClient,
};
