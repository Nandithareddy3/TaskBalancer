const express = require("express");
const router = express.Router();
const choreController = require("../controllers/choreController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, choreController.createChore);
router.get("/:groupId", authMiddleware, choreController.getChoresByGroup);
router.put("/:id", authMiddleware, choreController.updateChore);
router.put("/:id", authMiddleware, choreController.updateChore);

module.exports = router;
