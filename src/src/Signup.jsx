import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    plan: "Free",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://api.learnovaone2one.com/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("learnova_token", data.token);
        navigate("/pricing");
      } else {
        setError(data.message || "Signup failed. Try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🧑‍🎓 Create Your Learnova Account</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">Select Country</option>
          <option>Kenya</option>
          <option>Canada</option>
          <option>USA</option>
          <option>UK</option>
          <option>UAE</option>
          <option>India</option>
        </select>

        <label style={styles.label}>Choose Plan:</label>
        <select
          name="plan"
          value={form.plan}
          onChange={handleChange}
          style={styles.input}
        >
          <option>Free</option>
          <option>Premium ($50/mo)</option>
          <option>Plus ($100/mo)</option>
          <option>Family ($50 for 2 students)</option>
        </select>

        <button type="submit" style={styles.btn} disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>

      <p style={styles.text}>
        Already have an account?{" "}
        <Link to="/login" style={styles.link}>
          Login here
        </Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 420,
    margin: "60px auto",
    background: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
  },
  title: {
    fontSize: "1.5rem",
    color: "#003366",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "1rem",
  },
  label: {
    fontSize: "0.95rem",
    textAlign: "left",
    color: "#333",
  },
  btn: {
    background: "#0074E4",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
  },
  error: {
    color: "#e63946",
    fontSize: "0.9rem",
  },
  text: {
    marginTop: "1rem",
  },
  link: {
    color: "#0074E4",
    textDecoration: "none",
    fontWeight: 600,
  },
};
