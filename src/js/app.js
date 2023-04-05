const fs = require('fs');
var request = require('request');
var { google } = require('googleapis');
var key = require('../../private/key.json');

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
    .readFileSync('../../private/urls.txt')
    .toString()
    .split('\n');

console.log(batch);

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
        console.log(body);
    });
});
