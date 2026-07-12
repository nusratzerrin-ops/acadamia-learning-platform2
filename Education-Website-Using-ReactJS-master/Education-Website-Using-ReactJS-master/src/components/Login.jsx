import React, { useState } from "react";
import { loginUser } from "../api";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser({ email, password });
            localStorage.setItem("token", res.data.token);
            const base64 = res.data.token.split('.')[1];
            const decoded = JSON.parse(atob(base64));
            localStorage.setItem("user", JSON.stringify({
                id: decoded.id,
                role: decoded.role
            }));
            if (decoded.role === "admin") {
                window.location.href = "/admin";
            } else {
                window.location.href = "/";
            }
        } catch (err) {
            setMessage("Login failed! ❌ " + err.response.data.message);
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>

            {/* Simple Header — শুধু website name */}
            <div style={{
                background: "#1eb2a6",
                padding: "15px 40px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}>
                <Link to="/" style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "22px",
                    fontWeight: "700",
                    letterSpacing: "1px"
                }}>
                    🎓 Science E-Learning Platform
                </Link>
            </div>

            {/* Login Form */}
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "calc(100vh - 60px)"
            }}>
                <div style={{
                    background: "#fff",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow: "0 5px 25px rgba(0,0,0,0.1)",
                    width: "400px"
                }}>
                    <h2 style={{
                        textAlign: "center",
                        color: "#1eb2a6",
                        marginBottom: "8px",
                        fontSize: "26px"
                    }}>Welcome Back! 👋</h2>
                    <p style={{
                        textAlign: "center",
                        color: "#888",
                        marginBottom: "30px",
                        fontSize: "14px"
                    }}>Please login to your account</p>

                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: "20px" }}>
                            <label style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "600",
                                color: "#333",
                                fontSize: "14px"
                            }}>Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "12px 15px",
                                    border: "2px solid #e0e0e0",
                                    borderRadius: "8px",
                                    fontSize: "15px",
                                    outline: "none",
                                    boxSizing: "border-box",
                                    transition: "0.3s"
                                }}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: "25px" }}>
                            <label style={{
                                display: "block",
                                marginBottom: "8px",
                                fontWeight: "600",
                                color: "#333",
                                fontSize: "14px"
                            }}>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "12px 15px",
                                    border: "2px solid #e0e0e0",
                                    borderRadius: "8px",
                                    fontSize: "15px",
                                    outline: "none",
                                    boxSizing: "border-box"
                                }}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: "100%",
                                padding: "14px",
                                background: "#1eb2a6",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "16px",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "0.3s"
                            }}
                        >
                            Login
                        </button>
                    </form>

                    {message && (
                        <p style={{
                            textAlign: "center",
                            marginTop: "15px",
                            color: "red",
                            fontSize: "14px"
                        }}>{message}</p>
                    )}

                    <p style={{
                        textAlign: "center",
                        marginTop: "20px",
                        color: "#666",
                        fontSize: "14px"
                    }}>
                        Don't have an account?{" "}
                        <Link to="/register" style={{
                            color: "#1eb2a6",
                            fontWeight: "600",
                            textDecoration: "none"
                        }}>
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login