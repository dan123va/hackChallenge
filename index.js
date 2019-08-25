let express = require("express");
let morgan = require("morgan");
let bodyParser = require("body-parser");
let cors = require("cors");
let compression = require("compression");

let app = express();

app.use(compression());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Bien",
    payload: ""
  });
});

function mount(route, path) {
  let router = express.Router({ mergeParams: true });
  require(path)(router);
  app.use(route, router);
}

mount("/actions", "./routes/actions");

let port = process.env.PORT || 3000;
app.listen(port, function callback() {
  console.log(`Server listening on ${port}`);
});