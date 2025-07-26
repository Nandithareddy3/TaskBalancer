import React, { useState } from 'react';
import styles from './ChoreForm.module.css';
import { useAuth } from "../../context/AuthContext";
import axios from 'axios';

const ChoreForm = ({ onChoreCreated }) => {
    const { user, selectedGroup } = useAuth(); // ✅ correct usage

    const [form, setForm] = useState({
        name: '',
        assignedTo: '',
        difficulty: 'Easy',
    });

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedGroup) return;

        try {
            const res = await axios.post('http://localhost:5000/api/chores/create', {
                name: form.name,
                assignedTo: form.assignedTo,
                difficulty: form.difficulty,
                groupId: selectedGroup._id,
            });

            if (onChoreCreated) onChoreCreated(res.data.chore);

            setForm({ name: '', assignedTo: '', difficulty: 'Easy' });
        } catch (err) {
            alert('Error creating chore');
            console.error(err);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h3>Add Chore</h3>

            <input
                type="text"
                name="name"
                placeholder="Chore name"
                value={form.name}
                onChange={handleChange}
                required
            />

            <select name="assignedTo" value={form.assignedTo} onChange={handleChange} required>
                <option value="">Assign to</option>
                {selectedGroup?.members.map(member => (
                    <option key={member._id} value={member._id}>
                        {member.email}
                    </option>
                ))}
            </select>

            <select name="difficulty" value={form.difficulty} onChange={handleChange}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>

            <button type="submit">Create Chore</button>
        </form>
    );
};

export default ChoreForm;
