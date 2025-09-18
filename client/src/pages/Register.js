import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Error registering");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Name"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email"
          required
        />
        <input
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="Password"
          type="password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
