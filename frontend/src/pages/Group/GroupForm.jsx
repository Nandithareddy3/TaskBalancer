import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const GroupForm = () => {
    const { user, token, updateGroup } = useContext(AuthContext);
    const navigate = useNavigate();

    const [newGroupName, setNewGroupName] = useState('');
    const [joinCode, setJoinCode] = useState('');
    const [groups, setGroups] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const res = await axios.get('/api/groups/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGroups(res.data);
        } catch (err) {
            setError('Could not fetch groups');
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newGroupName.trim()) return;

        try {
            const res = await axios.post(
                '/api/groups/create',
                { name: newGroupName },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            updateGroup(res.data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Group creation failed');
        }
    };

    const handleJoin = async (e) => {
        e.preventDefault();
        if (!joinCode.trim()) return;

        try {
            const res = await axios.post(
                '/api/groups/join',
                { code: joinCode },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            updateGroup(res.data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Joining group failed');
        }
    };

    const handleSelect = (group) => {
        updateGroup(group);
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 text-white">
            <div className="w-full max-w-3xl p-8 bg-gray-900 rounded-xl shadow-md space-y-8">
                <h2 className="text-2xl font-bold text-center">Manage Your Groups</h2>

                {error && <p className="text-red-400 text-center">{error}</p>}

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Create Group */}
                    <form onSubmit={handleCreate} className="bg-gray-800 p-4 rounded-lg space-y-4">
                        <h3 className="text-lg font-semibold">Create a New Group</h3>
                        <input
                            type="text"
                            placeholder="Group Name"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 rounded text-white outline-none"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold"
                        >
                            Create
                        </button>
                    </form>

                    {/* Join Group */}
                    <form onSubmit={handleJoin} className="bg-gray-800 p-4 rounded-lg space-y-4">
                        <h3 className="text-lg font-semibold">Join with Group Code</h3>
                        <input
                            type="text"
                            placeholder="Group Code"
                            value={joinCode}
                            onChange={(e) => setJoinCode(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 rounded text-white outline-none"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
                        >
                            Join
                        </button>
                    </form>
                </div>

                {/* User's Groups */}
                {groups.length > 0 && (
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Your Groups</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {groups.map((group) => (
                                <button
                                    key={group._id}
                                    onClick={() => handleSelect(group)}
                                    className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded text-left transition-all"
                                >
                                    <span className="font-medium">{group.name}</span>
                                    <div className="text-xs text-gray-400">Code: {group.code}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GroupForm;
