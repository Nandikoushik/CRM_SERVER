"use strict";
require("dotenv").config();
const express = require("express");
const errHandeler = require("./helper/errHandeler");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const passport = require("passport");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
require("./helper/passport")(passport);// Passport config
const cors = require('cors');
//const path = require('path');

//specify port for node server to listen
const PORT = 9000;

//load common routes
const router = require("./routes");


//load db file
const { initDb } = require("./loader/db");

const app = express();

app.use(helmet());
app.use(helmet.xssFilter());

//Set expressMiddleWare in variable
const expressMiddleWare = [express.json({ limit: "1mb" }), express.urlencoded({ extended: true }), express.raw({ type: 'application/json' })];

app.use(express.static("public"));
app.use(cookieParser());

// Passport middleware
app.use(passport.initialize());

app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

app.use(cors({
  origin: '*', methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(mongoSanitize({ replaceWith: "_" }));

//Routes
app.get('/', (req, res) => res.send('@@@@@_Api Server Is Running Successfull_@@@@@'))//define the routes

/*app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', (req, res)=>{res.sendFile(path.join(__dirname, '../client/build', 'index.html'))});*/

app.use("/", expressMiddleWare[0], expressMiddleWare[1], router);//define the Allroutes
app.use(errHandeler);

//Server Listininging....
initDb(() => {
  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Server running on port: " + PORT);
  });
});
