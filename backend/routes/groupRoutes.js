const express = require("express");
const router = express.Router();
const {
    createGroup,
    joinGroup,
    getGroupDetails,
} = require("../controllers/groupController");
const requireAuth = require("../middleware/authMiddleware");

// 🔒 Protect all routes with authentication
router.use(requireAuth);

// POST /api/groups/create → Create a new group
router.post("/create", createGroup);

// POST /api/groups/join → Join an existing group
router.post("/join", joinGroup);

// GET /api/groups/me → Get current user's group details
router.get("/me", getGroupDetails);
const { getGroupContributions } = require("../controllers/groupController");

router.get("/:id/contributions", authMiddleware, getGroupContributions);


module.exports = router;
