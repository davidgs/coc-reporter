const { WebClient } = require("@slack/web-api");
const { Hmac } = require("crypto");
const fs = require("fs");
const http = require("http");
const port = 4756;
const defaultChannelID = "#testdictator";
const express = require("express");
const app = express();


const PORT = process.env.PORT || 6543;
console.log("server started on port:", PORT);
app.listen(PORT);

app.post("/api", function (req, res) {
  if (req.method === "POST") {
    const headers = req.headers;
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const v = JSON.parse(body);
      const code = v.challenge;
      if (code) {
        res.send({
          code,
        });
        res.end();
      }
    });
    //   // } else {
    //   verifyHeaders(body, headers)
    //     ? handleMessage(body)
    //     : console.log("Not verified!\n");
    //   res.end();
    //   // }
    // });
  }
});

// const httpsServer = https.createServer(
//   {
//     key: fs.readFileSync("./combined"),
//     cert: fs.readFileSync("./combined"),
//   },
//   app
// );

const httpServer = http.createServer(app);
