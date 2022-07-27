const { pool } = require("./pgSetting");


const getClients = async () => {
    try {
        const res = await pool.query("select * from clientes");
        console.log(res);
        pool.end();
        return res;
    } catch (error) {
        console.log(error);
    }
};

const insertClient = async (name, last_name, email, password) => {
    try {
        const text =
            "INSERT INTO clientes(nombre, apellidos, email, password) VALUES ($1, $2, $3, $4)";
        const values = [name, last_name, email, password];

        const res = await pool.query(text, values);
        console.log(res);
        pool.end();
    } catch (e) {
        console.log();
    }
};

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

module.export = { getClients, insertClient, updateClient, deleteClient };
