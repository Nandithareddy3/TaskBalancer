const Chore = require("../models/Chore");
const User = require("../models/User");
const Group = require("../models/Group");

const getWeight = (level) => {
    if (level === "easy") return 1;
    if (level === "medium") return 2;
    if (level === "hard") return 3;
    return 1;
};

const getGroupContributions = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id).populate("members");
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Only the team lead can view this
        if (group.teamLead.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Only team lead can access this." });
        }

        const contributions = [];

        for (const member of group.members) {
            const completedChores = await Chore.find({ assignedTo: member._id, completed: true });

            const totalCompleted = completedChores.length;
            const totalWeight = completedChores.reduce((sum, chore) => sum + getWeight(chore.difficulty), 0);

            contributions.push({
                userId: member._id,
                name: member.name,
                email: member.email,
                tasksCompleted: totalCompleted,
                contributionScore: totalWeight,
            });
        }

        res.json({ groupId: group._id, contributions });
    } catch (err) {
        console.error("Contribution tracking error:", err);
        res.status(500).json({ message: "Failed to fetch contributions" });
    }
};
