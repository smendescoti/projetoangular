const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/appclientes'));

app.get('/*', (req, res) => 
    res.sendFile('index.html', { root : 'dist/appclientes/' })
)

app.listen(process.env.PORT || 8080);