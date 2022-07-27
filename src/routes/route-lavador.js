const express = require("express");
const router = express.Router();

router.get("/lavadores", (req, res) => {
  
})

router.post("/lavador", (req, res) => {
  const { email, password } = req.query;
  res.send("Optener lavador: " + email);
});

router.get("/lavador/:id", (req, res) => {
    
});

module.exports = router;
