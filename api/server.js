const express = require('express');
const fs = require('fs');
const request = require('request');
const { google } = require('googleapis');
const key = require('./service_account.json');

const app = express();

app.get('/', (req, res) => {
    fs.appendFile('urls.txt', '\nhttps://www.example.com/', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

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

    console.log(batch);

    jwtClient.authorize(function (err, tokens) {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        const items = batch.map((line) => {
            return {
                'Content-Type': 'application/http',
                'Content-ID': '',
                body:
                    'POST /v3/urlNotifications:publish HTTP/1.1\n' +
                    'Content-Type: application/json\n\n' +
                    JSON.stringify({
                        url: line,
                        type: 'URL_UPDATED',
                    }),
            };
        });

        const options = {
            url: 'https://indexing.googleapis.com/batch',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/mixed',
            },
            auth: { bearer: tokens.access_token },
            multipart: items,
        };
        request(options, (err, resp, body) => {
            console.log(body);
            if (err) {
                return res.status(500).send(err);
            }
            return res.send(body);
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
