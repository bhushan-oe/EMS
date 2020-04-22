const express = require("express");
const router = express.Router();
const leavesApplicationController = require("../app/api/controllers/leaves_application");

router.get("/", leavesApplicationController.getAll);
router.get("/:id", leavesApplicationController.getLeaveInfo);
router.post("/add", leavesApplicationController.create);
router.put("/:id", leavesApplicationController.update);
router.delete("/:id", leavesApplicationController.delete);
module.exports = router;
