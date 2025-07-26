import React from "react";

const ChoreCard = ({ chore }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md p-4 mb-4 border-l-4 border-purple-500">
            <h3 className="text-lg font-bold text-gray-800">{chore.title}</h3>
            <p className="text-sm text-gray-600">{chore.description}</p>
            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                <span>Assigned to: {chore.assignedTo?.name || "Unassigned"}</span>
                <span>Difficulty: {chore.difficulty}</span>
                <span>Status: {chore.status}</span>
            </div>
        </div>
    );
};

export default ChoreCard;
