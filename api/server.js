const express = require('express');
const fs = require('fs');
const request = require('request');
const { google } = require('googleapis');
const key = require('../private/key.json');
const cors = require("cors");

const app = express();
app.use(cors());

app.get('/api/index', (req, res) => {
    const jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        ['https://www.googleapis.com/auth/indexing'],
        null
    );

    const batch = fs
        .readFileSync('urls.txt')
        .toString()
        .split('\n');

    jwtClient.authorize(function (err, tokens) {
        if (err) {
            console.log(err);
            return;
        }

        const items = batch.map(line => {
            return {
                'Content-Type': 'application/http',
                'Content-ID': '',
                body:
                    'POST /v3/urlNotifications:publish HTTP/1.1\n' +
                    'Content-Type: application/json\n\n' +
                    JSON.stringify({
                        url: line,
                        type: 'URL_UPDATED'
                    })
            };
        });

        const options = {
            url: 'https://indexing.googleapis.com/batch',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/mixed'
            },
            auth: { bearer: tokens.access_token },
            multipart: items
        };
        request(options, (err, resp, body) => {
            res.send(JSON.stringify(body));
        });
    });

});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
