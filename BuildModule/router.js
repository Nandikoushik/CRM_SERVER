const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/", controller.insert);
router.get("/", controller.getlist);
router.delete("/", controller.delete);
router.put("/", controller.update);

module.exports = router;
