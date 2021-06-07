"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var middleware_1 = require("./src/middleware");
var environment_1 = require("./environment");
var app = express();
var port = process.env.PORT || 3000;
var logLevel = process.env.LOG_LEVEL || 'dev';
// mongosse instance connections
mongoose.Promise = global.Promise;
mongoose.connect(environment_1.databaseName, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
// handle error connections
db.on('error', console.error.bind(console, 'connection error:'));
// connection is successfully
db.once('open', function () {
    console.log('Connection Successful');
});
// parser middleware needed to process req.body
app.use(morgan(logLevel));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// handle 404s
app.use(middleware_1.error404);
// handle 500s
app.use(middleware_1.error500);
// listen on server port
app.listen(port, function () {
    console.log("Running on port: " + port + "...");
});
