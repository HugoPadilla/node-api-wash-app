const express = require("express");
const { getClients } = require("../database/queryClient");
const router = express.Router();

router.get("/clients", (req, res) => {
  const result = getClients();
  if (result.rows) {
    res.send(result.rows);
  } else {
    res.send("Erros en la consulta");
  }
});

router.get("/lavador/:id", (req, res) => {
  
});

router.post("/lavador", (req, res) => {
  const { email, password } = req.query;
  res.send("Optener lavador: " + email);
});

module.exports = router;
