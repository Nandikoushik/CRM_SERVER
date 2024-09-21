const express = require("express");
const router = express.Router();

const userController = require("./controller");

//user authentication
router.post("/login", userController.authenticate);

module.exports = router;
