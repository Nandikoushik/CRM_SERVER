"use strict";
const winston = require("winston");
const { label, combine, timestamp, prettyPrint } = winston.format;

const logger = winston.createLogger({
  json: true,
  transports: []
});

//Export the logger
module.exports = logger;
