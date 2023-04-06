const express = require("express");
const request = require("request");
const { google } = require("googleapis");
const key = require("../private/key.json");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/index", (req, res) => {
  const url = req.body.url.split(/(\s+)/).filter(function (e) {
    return e.trim().length > 0;
  });
  url.shift();

  const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ["https://www.googleapis.com/auth/indexing"],
    null
  );

  const batch = url;
  jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    }

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
