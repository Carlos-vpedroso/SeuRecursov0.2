const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/index');

require('dotenv').config();


app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.PORT, () => {
    const url = 'http://localhost:' + process.env.PORT;
    console.log('Servidor iniciado ' + url)
});