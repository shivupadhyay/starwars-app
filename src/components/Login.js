import React, { useState } from "react";
import "./styles/login.css";
import { useAuth } from "../hooks/useAuth";
import Loginauth from "../api/auth";

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  // Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await Loginauth(form.username, form.password);
      login(token);
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div className="login">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          className="input"
          placeholder="Username"
          required
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          placeholder="Password"
          className="input"
          type="password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="button">Login</button>
      </form>
    </div>
  );
};

export default Login;
