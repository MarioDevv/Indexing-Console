const express = require("express");
const request = require("request");
const { google } = require("googleapis");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/index", (req, res) => {

  // Create an array of URLs
  const url = req.body.url.split(/(\s+)/).filter(function (e) {
    return e.trim().length > 0;
  });
  url.shift();

  // Get credentials
  const key = req.body.key;
  if (!key) {
    res.send(JSON.stringify("No credentials found. Please upload credentials."));
    return;
  }

  // Create batch
  const batch = url;

  // Create JWT client
  const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ["https://www.googleapis.com/auth/indexing"],
    null
  );


  // Authorize and send request
  jwtClient.authorize(function (err, tokens) {
    if (err) {
      res.send(JSON.stringify(err));
      return;
    }

    // Create batch request
    const items = batch.map((line) => {
      return {
        "Content-Type": "application/http",
        "Content-ID": "",
        body:
          "POST /v3/urlNotifications:publish HTTP/1.1\n" +
          "Content-Type: application/json\n\n" +
          JSON.stringify({
            url: line,
            type: "URL_UPDATED",
          }),
      };
    });

    // Send batch request
    const options = {
      url: "https://indexing.googleapis.com/batch",
      method: "POST",
      headers: {
        "Content-Type": "multipart/mixed",
      },
      auth: { bearer: tokens.access_token },
      multipart: items,
    };

    request(options, (err, resp, body) => {
      res.send(JSON.stringify(body));
    });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
