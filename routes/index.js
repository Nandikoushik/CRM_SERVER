// Main router entry points
const express = require("express");
const router = express.Router();
const userRouter = require("../users/router");
const moduleRouter = require("../ModuleBuilder/router");
const buildmodule = require('../BuildModule/router');
const mailRouter = require('../Email/router');

router.use("/users", userRouter);
router.use("/buildmodule", buildmodule);
router.use("/moduleBuilder", moduleRouter);
router.use("/mail", mailRouter);
module.exports = router;
