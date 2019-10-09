const express = require('express');
// const path = require('path');
// const fs = require('fs');
const swaggerUI = require('swagger-ui-express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongoose = require('./Config/database');
const swaggerConfig = require('../swagger.json');

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect();

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerConfig));
app.use(routes);

module.exports = app;
