const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const express = require("express");
const fetch = require("cross-fetch");
const morgan = require("morgan");
const iconv = require("iconv-lite");
const utf8 = require("utf8");
const xml2js = require("xml2js");

const app = express();

app.use(compression());
app.use(cors());
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(express.json());

app.get("/health", (req, res) => {
  res.send("OK");
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.time("Request");
  console.log(`Método: ${req.method}; URL: ${req.url}; `);

  next();

  console.log("Finalizou");

  console.timeEnd("Request");
});

app.get("/actualday", (req, res) => {
  fetch("http://servicos.cptec.inpe.br/XML/cidade/3154/dia/0/ondas.xml")
    .then((res) => res.arrayBuffer())
    .then((arrayBuffer) =>
      iconv.decode(new Buffer(arrayBuffer), "iso-8859-1").toString()
    )
    .then((converted) => {
      console.log(converted);
      return converted;
    })
    .then((body) => {
      console.log(body);

      console.log("body:", body);
      const dataBody = body;

      xml2js.parseString(dataBody, (err, result) => {
        if (err) {
          throw err;
        }
        const dataJson = JSON.stringify(result, null, 4);
        console.error("dadosMarica", utf8.encode(dataJson));
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.header("Content-Type", "application/json; charset=utf-8");

        return res.json({
          data: result,
        });
      });
    })
    .catch((data) => console.log(data));
});

app.get("/sevendays", (req, res) => {
  fetch("http://servicos.cptec.inpe.br/XML/cidade/3154/todos/tempos/ondas.xml")
    .then((res) => res.arrayBuffer())
    .then((arrayBuffer) =>
      iconv.decode(new Buffer(arrayBuffer), "iso-8859-1").toString()
    )
    .then((converted) => {
      console.log(converted);
      return converted;
    })
    .then((body) => {
      console.log(body);

      console.log("body:", body);
      const dataBody = body;

      xml2js.parseString(dataBody, (err, result) => {
        if (err) {
          throw err;
        }
        const dataJson = JSON.stringify(result, null, 4);
        console.error("dadosMarica", utf8.encode(dataJson));
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.header("Content-Type", "application/json; charset=utf-8");

        return res.json({
          data: result,
        });
      });
    })
    .catch((data) => console.log(data));
});

const PORT = process.env.PORT || 3000;
const IP_BIND = process.env.IP || "0.0.0.0";

app.listen(PORT, IP_BIND, () => {
  console.log(`
  * Listening on http://${IP_BIND}:${PORT}/
  * Environment: ${process.env.NODE_ENV || "development"}
  Use Ctrl-C to stop
  `);
});
