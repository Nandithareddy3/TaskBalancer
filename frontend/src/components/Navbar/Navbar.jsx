import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.css';

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
            <Link to="/dashboard" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition">
                ChoreChooser
            </Link>

            <div className="flex items-center gap-6">
                {user && (
                    <>
                        <Link
                            to="/dashboard"
                            className="text-gray-700 hover:text-indigo-600 transition font-medium"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/group/select"
                            className="text-gray-700 hover:text-indigo-600 transition font-medium"
                        >
                            My Groups
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                        >
                            Logout
                        </button>
                    </>
                )}

                {!user && (
                    <>
                        <Link
                            to="/"
                            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
