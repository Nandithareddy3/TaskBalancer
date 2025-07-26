import React, { useState } from 'react';
import axios from 'axios';

const ChoreCard = ({ chore, members, onUpdate }) => {
    const [comment, setComment] = useState(chore.comment || '');
    const [localStatus, setLocalStatus] = useState(chore.status);
    const [assignedTo, setAssignedTo] = useState(chore.assignedTo || '');
    const [saving, setSaving] = useState(false);
    const userId = localStorage.getItem('userId');
    const isLead = localStorage.getItem('isLead') === 'true';

    const handleUpdate = async (updates) => {
        try {
            setSaving(true);
            const token = localStorage.getItem('token');
            const res = await axios.put(
                `/api/chores/${chore._id}`,
                updates,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            onUpdate(res.data);
            setSaving(false);
        } catch (err) {
            console.error('Failed to update chore', err);
            setSaving(false);
        }
    };

    const handleStatusChange = (newStatus) => {
        setLocalStatus(newStatus);
        handleUpdate({ status: newStatus });
    };

    const handleAssign = (e) => {
        const newAssignee = e.target.value;
        setAssignedTo(newAssignee);
        handleUpdate({ assignedTo: newAssignee });
    };

    const handleCommentSave = () => {
        handleUpdate({ comment });
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{chore.title}</h3>
                <span className={`text-sm px-2 py-1 rounded-full ${chore.difficulty === 'Hard' ? 'bg-red-600 text-white' :
                        chore.difficulty === 'Medium' ? 'bg-yellow-500 text-white' :
                            'bg-green-500 text-white'
                    }`}>
                    {chore.difficulty}
                </span>
            </div>

            <p className="text-sm mb-2">
                Status: <strong>{localStatus}</strong>
            </p>

            <p className="text-sm mb-4">
                Assigned To: {assignedTo ? members.find((m) => m._id === assignedTo)?.name || 'Unknown' : 'Not assigned'}
            </p>

            {isLead && (
                <div className="mb-4">
                    <label className="text-sm font-medium block mb-1">Assign to:</label>
                    <select
                        value={assignedTo}
                        onChange={handleAssign}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
                    >
                        <option value="">-- Select Member --</option>
                        {members.map((member) => (
                            <option key={member._id} value={member._id}>
                                {member.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {!isLead && assignedTo === userId && (
                <div className="mb-4">
                    <button
                        onClick={() => handleStatusChange('In Progress')}
                        disabled={localStatus === 'In Progress'}
                        className="px-4 py-1 bg-blue-600 text-white rounded mr-2 disabled:opacity-50"
                    >
                        In Progress
                    </button>
                    <button
                        onClick={() => handleStatusChange('Completed')}
                        disabled={localStatus === 'Completed'}
                        className="px-4 py-1 bg-green-600 text-white rounded disabled:opacity-50"
                    >
                        Complete
                    </button>
                </div>
            )}

            {isLead && (
                <div className="mt-4">
                    <label className="text-sm font-medium block mb-1">Private Comment:</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={2}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
                    />
                    <button
                        onClick={handleCommentSave}
                        className="mt-2 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 rounded text-white"
                    >
                        Save Comment
                    </button>
                </div>
            )}

            {saving && <p className="text-xs text-gray-500 mt-2">Saving...</p>}
        </div>
    );
};

export default ChoreCard;
