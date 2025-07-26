import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ChoreList from '../../components/Dashboard/ChoreList';
import ContributionList from '../../components/Dashboard/ContributionList';

const Dashboard = () => {
    const { user, token, group } = useContext(AuthContext);
    const navigate = useNavigate();

    const [chores, setChores] = useState([]);
    const [contributions, setContributions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!group) {
            navigate('/group');
        } else {
            fetchChores();
        }
    }, [group]);

    const fetchChores = async () => {
        try {
            const res = await axios.get(`/api/chores/group/${group._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setChores(res.data);
        } catch (err) {
            setError('Failed to load chores');
        }
    };

    const handleChoreCreated = (newChore) => {
        setChores((prev) => [...prev, newChore]);
    };

    const handleChoreUpdated = (updatedChore) => {
        setChores((prev) =>
            prev.map((chore) => (chore._id === updatedChore._id ? updatedChore : chore))
        );
    };

    const groupMembers = group?.members || [];

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Group Dashboard</h1>

            {error && <p className="text-red-400 text-center mb-4">{error}</p>}

            <div className="grid md:grid-cols-3 gap-6">
                {/* Left: Contribution Tracker */}
                <div className="col-span-1 bg-gray-900 rounded-xl p-4">
                    <ContributionList chores={chores} members={groupMembers} />
                </div>

                {/* Right: Chore Management */}
                <div className="col-span-2 bg-gray-900 rounded-xl p-4">
                    <ChoreList
                        chores={chores}
                        members={groupMembers}
                        onChoreCreated={handleChoreCreated}
                        onChoreUpdated={handleChoreUpdated}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
