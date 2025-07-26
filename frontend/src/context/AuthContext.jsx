import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        if (token) {
            axios
                .get("http://localhost:5000/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => setUser(res.data))
                .catch(() => {
                    setUser(null);
                    setToken("");
                    localStorage.removeItem("token");
                });
        }
    }, [token]);

    const login = async (email, password) => {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
            email,
            password,
        });
        const token = res.data.token;
        setToken(token);
        localStorage.setItem("token", token);
    };

    const register = async (name, email, password) => {
        const res = await axios.post("http://localhost:5000/api/auth/register", {
            name,
            email,
            password,
        });
        const token = res.data.token;
        setToken(token);
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
