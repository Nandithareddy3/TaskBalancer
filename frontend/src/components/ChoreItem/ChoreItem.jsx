import React from 'react';

function ChoreItem({ chore }) {
    const { title, difficulty, assignedTo, completed, comments } = chore;

    return (
        <li className="p-4 bg-gray-100 rounded-xl shadow flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
                <span
                    className={`text-sm font-medium px-2 py-1 rounded ${completed ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                        }`}
                >
                    {completed ? 'Completed' : 'Pending'}
                </span>
            </div>
            <div className="text-sm text-gray-600">
                Difficulty: <span className="font-medium">{difficulty}</span>
            </div>
            <div className="text-sm text-gray-600">
                Assigned to: <span className="font-medium">{assignedTo?.name || 'Unassigned'}</span>
            </div>
            {comments && comments.length > 0 && (
                <div className="text-sm mt-2">
                    <p className="font-medium text-gray-700">Internal Comments:</p>
                    <ul className="list-disc ml-5 text-gray-600">
                        {comments.map((c, i) => (
                            <li key={i}>{c}</li>
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );
}

export default ChoreItem;
