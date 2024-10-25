const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/", controller.addSchema);
router.get("/", controller.getSchemalist);
router.put("/", controller.updateSchema);
router.delete("/", controller.deleteSchema);
// router.put("/", controller.putSchema);

module.exports = router;
