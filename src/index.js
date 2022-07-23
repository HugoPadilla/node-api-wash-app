const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send('Server ok');
});

app.listen(PORT, () => {
    console.log("Route esta escuchand en el port: " + PORT);
});