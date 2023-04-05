const express = require('express');
const fs = require('fs');
const request = require('request');
const { google } = require('googleapis');
const key = require('../private/key.json');
const cors = require("cors");

const app = express();
app.use(cors());

app.get('/api/index', (req, res) => {
    res.send({
        message: 'Hello World!'
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
