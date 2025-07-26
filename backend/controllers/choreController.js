const Chore = require("../models/Chore");
const Group = require("../models/Group");
const User = require("../models/User");

// Difficulty weight
const getWeight = (level) => {
    if (level === "easy") return 1;
    if (level === "medium") return 2;
    if (level === "hard") return 3;
    return 1;
};

// Create chore and auto-assign
const createChore = async (req, res) => {
    try {
        const { title, description, difficulty, groupId } = req.body;

        const group = await Group.findById(groupId).populate("members");
        if (!group) return res.status(404).json({ message: "Group not found" });

        const workloadMap = {};
        for (const member of group.members) {
            const chores = await Chore.find({ assignedTo: member._id, completed: false });
            const totalWeight = chores.reduce((sum, chore) => sum + getWeight(chore.difficulty), 0);
            workloadMap[member._id] = totalWeight;
        }

        const leastLoadedMemberId = Object.entries(workloadMap).sort((a, b) => a[1] - b[1])[0][0];

        const chore = new Chore({
            title,
            description,
            difficulty,
            group: groupId,
            assignedTo: leastLoadedMemberId,
        });

        await chore.save();
        res.status(201).json(chore);
    } catch (err) {
        console.error("Create chore error:", err);
        res.status(500).json({ message: "Failed to create chore" });
    }
};

// Get all chores for a group
const getChoresByGroup = async (req, res) => {
    try {
        const { groupId } = req.params;

        const chores = await Chore.find({ group: groupId })
            .populate("assignedTo", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json(chores);
    } catch (err) {
        console.error("Get chores error:", err);
        res.status(500).json({ message: "Failed to get chores" });
    }
};

// Update chore (reassign, mark complete, edit)
const updateChore = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, difficulty, assignedTo, completed } = req.body;

        const chore = await Chore.findById(id);
        if (!chore) return res.status(404).json({ message: "Chore not found" });

        if (title) chore.title = title;
        if (description) chore.description = description;
        if (difficulty) chore.difficulty = difficulty;
        if (typeof completed === "boolean") chore.completed = completed;

        // Reassign if provided
        if (assignedTo) {
            const user = await User.findById(assignedTo);
            if (!user) return res.status(404).json({ message: "Assigned user not found" });
            chore.assignedTo = assignedTo;
        }

        await chore.save();
        res.status(200).json(chore);
    } catch (err) {
        console.error("Update chore error:", err);
        res.status(500).json({ message: "Failed to update chore" });
    }
};

module.exports = {
    createChore,
    getChoresByGroup,
    updateChore,
};
