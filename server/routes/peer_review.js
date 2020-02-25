const express = require("express");
const router = express.Router();
const peerReviewController = require("../app/api/controllers/peer_review");

router.get("/", peerReviewController.getAll);
router.post("/add", peerReviewController.create);
router.put("/:id", peerReviewController.update);
router.delete("/:id", peerReviewController.delete);
module.exports = router;