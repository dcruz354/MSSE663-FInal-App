import mongoose = require('mongoose');
import express = require('express');
import path = require('path');
import bodyParser = require('body-parser');
import cors = require('cors');
import morgan = require('morgan');


import { error404, error500 } from './src/middleware';
import { databaseName } from './environment';

const app = express();
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || 'dev';

// mongosse instance connections
mongoose.Promise = global.Promise;
mongoose.connect(databaseName, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

// handle error connections
db.on('error', console.error.bind(console, 'connection error:'));

// connection is successfully
db.once('open', () => {
    console.log('Connection Successful');
});

// parser middleware needed to process req.body
app.use(morgan(logLevel));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// handle 404s
app.use(error404);

// handle 500s
app.use(error500);

// listen on server port
app.listen(port, () => {
    console.log(`Running on port: ${port}...`);
})



