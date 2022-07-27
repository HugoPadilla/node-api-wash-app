const { Pool } = require("pg");
const pool = new Pool(config);

const getLavadores = async () => {
  try {
    const res = await pool.query("select * from lavadores");
    console.log(res);
    pool.end();
    return res;
  } catch (error) {
    console.log(error);
  }
};

const insertLavador = async (name, last_name, email, password) => {
  try {
    const text =
      "INSERT INTO lavadores(nombre, apellidos, email, password) VALUES ($1, $2, $3, $4)";
    const values = [name, last_name, email, password];

    const res = await pool.query(text, values);
    console.log(res);
    pool.end();
  } catch (e) {
    console.log();
  }
};

const deleteLavador = async (id) => {
  try {
    const text = "DELETE FROM lavadores WHERE id = $1";
    const value = [id];
    const res = await pool.query(text, value);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

const updateLavador = async (
  name,
  last_name,
  email,
  password,
  idClientToUpdate
) => {
  try {
    const text =
      "UPDATE lavadores SET nombre = $1, apellidos = $2, email = $3, password = $4 WHERE id = $5";
    const values = [name, last_name, email, password, idClientToUpdate];

    const res = pool.query(text, values);
  } catch (e) {
    console.log(e);
  }
};

module.export { getLavadores, insertLavador, updateLavador, deleteLavador };
