const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config/config');
const api = require('./routes/api');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/api', api);
app.get('*', (req, res) => {
    res.status(500).json({
        status: 500,
        message: "internal server error"
    })
});
app.listen(config.server_port, () => {
    console.log("server running at ", config.server_port);
});