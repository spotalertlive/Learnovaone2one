import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("learnova_token");
    navigate("/login");
  };

  const loggedIn = !!localStorage.getItem("learnova_token");

  return (
    <nav style={styles.nav}>
      <div style={styles.logoBox} onClick={() => navigate("/")}>
        <img
          src="/logo.png"
          alt="Learnova Logo"
          style={styles.logo}
        />
        <h1 style={styles.brand}>Learnova</h1>
      </div>

      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/quiz" style={styles.link}>Quiz</Link>
        <Link to="/tutor" style={styles.link}>Tutor</Link>
        <Link to="/pricing" style={styles.link}>Plans</Link>
        {loggedIn ? (
          <button onClick={logout} style={styles.logoutBtn}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#003366",
    color: "#fff",
    padding: "0.8rem 1.5rem",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  logo: {
    height: "40px",
    marginRight: "10px",
  },
  brand: {
    fontSize: "1.2rem",
    color: "#fff",
    fontWeight: 600,
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "0.95rem",
  },
  logoutBtn: {
    background: "#e63946",
    border: "none",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
  },
};
