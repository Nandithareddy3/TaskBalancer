import React, { useState } from 'react';
import ChoreCard from './ChoreCard';
import axios from 'axios';

const ChoreList = ({ chores, members, onChoreCreated, onChoreUpdated }) => {
    const [title, setTitle] = useState('');
    const [difficulty, setDifficulty] = useState('Easy');
    const [error, setError] = useState('');

    const handleCreateChore = async () => {
        if (!title) return setError('Chore title is required');

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                '/api/chores',
                { title, difficulty },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            onChoreCreated(res.data);
            setTitle('');
            setDifficulty('Easy');
            setError('');
        } catch (err) {
            setError('Failed to create chore');
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-2">Chores</h2>

            <div className="flex flex-col md:flex-row md:items-end gap-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Chore Title"
                    className="p-2 rounded bg-gray-800 border border-gray-700 text-white w-full md:w-1/2"
                />

                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
                >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>

                <button
                    onClick={handleCreateChore}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white"
                >
                    Add Chore
                </button>
            </div>

            {error && <p className="text-red-400">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {chores.map((chore) => (
                    <ChoreCard
                        key={chore._id}
                        chore={chore}
                        members={members}
                        onUpdate={onChoreUpdated}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChoreList;
