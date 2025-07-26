import styles from './Card.module.css';
import { FaUsers, FaTasks } from 'react-icons/fa';

export default function Card({ group }) {
    return (
        <div className={styles.card}>
            <h3>{group.name}</h3>

            <div className={styles.members}>
                {group.members.map(member => (
                    <span key={member._id} className={styles.member}>
                        {member.email}
                    </span>
                ))}
            </div>

            <div className={styles.actions}>
                <a href={`/groups/${group._id}/chores`} className={styles.btn}>
                    <FaTasks /> View Chores
                </a>
                <button className={styles.btnSecondary}>
                    <FaUsers /> Manage
                </button>
            </div>
        </div>
    );
}
