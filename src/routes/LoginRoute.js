const express = require("express");
const router = express.Router();
const {
    insertClient,
    getClientesPorCredenciales,
} = require("../database/queryClient");
const {
    insertLavador,
    getLavadorPorCredenciales,
} = require("../database/queryLavador");

router.post("/login", async (req, res) => {
    try {
        const { user } = req.body;
        const { email, password } = user;

        let responseData = {
            status: "",
            data: null,
        };

        const result = await getClientesPorCredenciales(email, password);
        const resultLavador = await getLavadorPorCredenciales(email, password);
        
        if(result.rowCount != 0) {
            responseData = {
                status: "success",
                data: result.rows[0]
            }
            res.status(200).json(responseData)
        } else if(resultLavador.rowCount != 0) {
            responseData = {
                status: "success",
                data: resultLavador.rows[0]
            }
            res.status(200).json(responseData)
        } else {
            responseData = {
                status: "error",
                data: null
            }
            res.status(404).json(responseData)
        }
    
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: error.severity,
            message: error.detail,
        });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const { roll, user } = req.body;
        const { name, last_name, email, password } = user;

        let responseData = {
            status: "",
            data: null,
        };

        if (roll === "cliente") {
            const result = await insertClient(
                name,
                last_name,
                email,
                password,
                "cliente"
            );

            const clienteResult = await getClientesPorCredenciales(
                email,
                password
            );

            console.info(result);

            responseData = {
                status: "success",
                data: clienteResult.rows[0],
            };

            res.status(201).json(responseData);
        }

        if (roll === "lavador") {
            const result = await insertLavador(
                name,
                last_name,
                email,
                password,
                "lavador"
            );

            const lavadorResult = await getLavadorPorCredenciales(
                email,
                password
            );
            console.log(result);

            responseData = {
                status: "success",
                data: lavadorResult.rows[0],
            };

            res.status(201).json(responseData);
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({
            status: error.severity,
            message: error.detail,
        });
    }
});

module.exports = router;
