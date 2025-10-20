import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import PricingPlans from "./PricingPlans.jsx";
import TutorChat from "./TutorChat.jsx";
import Curriculum from "./Curriculum.jsx";
import QuizPanel from "./QuizPanel.jsx";
import Dashboard from "./Dashboard.jsx";

export default function App() {
  return (
    <Router>
      <div style={styles.app}>
        <Navbar />
        <main style={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pricing" element={<PricingPlans />} />
            <Route path="/tutor" element={<Protected><TutorChat /></Protected>} />
            <Route path="/curriculum" element={<Protected><Curriculum /></Protected>} />
            <Route path="/quiz" element={<Protected><QuizPanel /></Protected>} />
            <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

// ✅ Home Landing Page (optional starter)
function Home() {
  return (
    <div style={styles.home}>
      <h1>🎓 Welcome to Learnova One2One</h1>
      <p>Personalized AI learning powered by Shira & Shaima — your 24/7 tutors.</p>
      <p>Start free or explore our learning plans today.</p>
      <a href="/signup" style={styles.startBtn}>Get Started</a>
    </div>
  );
}

// ✅ Protected Route Wrapper
function Protected({ children }) {
  const token = localStorage.getItem("learnova_token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

const styles = {
  app: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    background: "#f9fbff",
    fontFamily: "Poppins, sans-serif",
  },
  content: {
    flex: 1,
    paddingBottom: "2rem",
  },
  home: {
    textAlign: "center",
    marginTop: "5rem",
    padding: "1rem",
  },
  startBtn: {
    display: "inline-block",
    marginTop: "1rem",
    background: "#0074E4",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 600,
  },
};
