import React from 'react';

function ProgressBar({ completed, total }) {
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="bg-white p-4 rounded-2xl shadow-md mt-6">
            <h3 className="text-lg font-semibold mb-2 text-green-700">Group Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                    className="bg-green-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <p className="text-sm text-gray-700 mt-2">
                {completed} of {total} chores completed ({percentage}%)
            </p>
        </div>
    );
}

export default ProgressBar;
