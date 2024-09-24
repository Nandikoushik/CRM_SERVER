const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/", controller.addSchema);
router.get("/", controller.getSchemalist);
// router.put("/", controller.putSchema);
// router.delete("/", controller.deleteSchema);

module.exports = router;
