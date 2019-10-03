const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('./Config/database');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

mongoose.connect();

app.use(routes);

module.exports = app;
