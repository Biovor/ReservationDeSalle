var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);


app.use("/reservation", bodyParser);

var server = app.listen(3400, function () {
    console.log("app running on port.", server.address().port);
});
