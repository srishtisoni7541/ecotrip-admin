import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

const AdminLoginPage = () => {
    const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);

      if (res.data.success) {
        const user = res.data.data;
        if (user.role !== "admin") {
          setMessage("Access denied: Not an admin account.");
        } else {
          setMessage("Login successful as admin!");
         
          // Optionally store token or navigate
          localStorage.setItem("token", user.token);
           navigate('/admin');
        }
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Login failed!";
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full  flex flex-col gap-50 items-center justify-center bg-gray-100 px-4">
        <Nav/>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Admin Login
        </h2>

        {message && (
          <div className="mb-4 text-center text-sm text-red-600">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md text-sm mt-1"
              placeholder="Admin Email"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md text-sm mt-1"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
