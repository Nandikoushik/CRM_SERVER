const express = require("express");
const router = express.Router();

const userController = require("./controller");

router.post("/registration", userController.addUser);

router.post("/login", userController.authenticate);

router.get("/checkUsers", userController.checkUsers);

module.exports = router;
