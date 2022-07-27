const { Pool } = require("pg");

const postgresHerokuUrl =
    "postgres://ipvcqymmfynxrj:e4e33189e130f9c96dd809bbc47be9b44ae06f63b2cc9d7087f71faaf2d4bc77@ec2-44-208-88-195.compute-1.amazonaws.com:5432/ddtgc875h6g4sf";

const config = {
    connectionString: process.env.DATABASE_URL || postgresHerokuUrl,
    ssl: {
        rejectUnauthorized: false,
    },
};

const pool = new Pool(config);

module.exports = { pool };
