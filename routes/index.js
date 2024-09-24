// Main router entry points
const express = require("express");
const router = express.Router();
const userRouter = require("../users/router");
const moduleRouter = require("../ModuleBuilder/router");

router.use("/users", userRouter);
router.use("/moduleBuilder", moduleRouter);
module.exports = router;
