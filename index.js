const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const { getPort } = require('./host');
const api = require('./back');

const PATH_TO_STATIC_DIR = 'front/build';
const app = express();

app
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(express.static(path.join(__dirname, PATH_TO_STATIC_DIR)))
    .use('/back/', api)
    .get('*', (req, res) => {
        res.sendFile(path.join(__dirname, PATH_TO_STATIC_DIR, 'index.html'));
    });

const port = getPort();
app.listen(port);

console.log(`Listening on ${port}`);
