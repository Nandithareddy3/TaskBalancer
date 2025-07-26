import React from 'react';
import { FaTasks, FaCheckCircle, FaBalanceScale } from 'react-icons/fa';

function PrivateStats({ userStats }) {
    if (!userStats) return null;

    return (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-2xl shadow-xl mt-6">
            <h2 className="text-lg font-semibold mb-4">Team Member Contributions (Private)</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userStats.map((user) => (
                    <div key={user._id} className="bg-gray-700 rounded-xl p-4">
                        <h3 className="text-md font-medium mb-2">{user.name}</h3>
                        <div className="flex items-center gap-2 text-sm mb-1">
                            <FaTasks className="text-yellow-300" />
                            <span>Total Assigned: {user.totalChores}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm mb-1">
                            <FaCheckCircle className="text-green-400" />
                            <span>Completed: {user.completedChores}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <FaBalanceScale className="text-blue-300" />
                            <span>Difficulty Score: {user.totalDifficulty}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PrivateStats;
