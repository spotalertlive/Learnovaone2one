import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.links}>
        <Link to="/pricing" style={styles.link}>Pricing</Link>
        <Link to="/tutor" style={styles.link}>Tutor</Link>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/login" style={styles.link}>Login</Link>
      </div>
      <p style={styles.text}>© {new Date().getFullYear()} Learnova One2One. All Rights Reserved.</p>
      <p style={styles.sub}>Powered by Shira AI & Shaima</p>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#003366",
    color: "#fff",
    textAlign: "center",
    padding: "1.2rem",
    fontFamily: "Poppins, sans-serif",
    marginTop: "2rem",
  },
  links: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
    marginBottom: "0.5rem",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500",
  },
  text: {
    fontSize: "0.9rem",
    margin: 0,
  },
  sub: {
    fontSize: "0.8rem",
    opacity: 0.8,
    marginTop: "0.3rem",
  },
};
