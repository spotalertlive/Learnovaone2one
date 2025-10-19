import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [student, setStudent] = useState({ name: 'Student', level: 'Grade 8' });
  const [progress, setProgress] = useState({
    Math: 72,
    Science: 65,
    English: 88,
    Islamic: 93,
    History: 70,
  });
  const [rewards, setRewards] = useState([]);
  const [weekGoal, setWeekGoal] = useState('Complete 3 quizzes and 2 lessons');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const calculateAverage = () => {
    const values = Object.values(progress);
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  };

  const addReward = (text) => {
    setRewards([...rewards, text]);
  };

  useEffect(() => {
    if (calculateAverage() >= 85) addReward('🏅 Excellent Progress!');
    if (calculateAverage() >= 95) addReward('🌟 Top Achiever!');
  }, [progress]);

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '4rem' }}>Loading your dashboard...</p>;
  }

  return (
    <div style={styles.container}>
      <h2>📊 Welcome, {student.name}!</h2>
      <p>Level: <strong>{student.level}</strong></p>
      <p>Weekly Goal: {weekGoal}</p>

      <div style={styles.progressSection}>
        <h3>Subject Progress</h3>
        {Object.entries(progress).map(([subject, value]) => (
          <div key={subject} style={styles.progressItem}>
            <span>{subject}</span>
            <div style={styles.progressBarWrapper}>
              <div style={{ ...styles.progressBar, width: `${value}%` }}></div>
            </div>
            <span>{value}%</span>
          </div>
        ))}
        <p style={styles.averageText}>Overall Average: <strong>{calculateAverage()}%</strong></p>
      </div>

      <div style={styles.actions}>
        <Link to="/tutor" style={styles.button}>💬 Talk to Shira / Shaima</Link>
        <Link to="/quiz" style={styles.button}>🧠 Start Diagnostic Quiz</Link>
        <Link to="/curriculum" style={styles.button}>📚 View Curriculum</Link>
      </div>

      {rewards.length > 0 && (
        <div style={styles.rewardsSection}>
          <h3>🎖️ Rewards & Achievements</h3>
          <ul>
            {rewards.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={styles.footer}>
        <p>Track your growth. Learn your way. 🌍</p>
        <small>Powered by Shira AI</small>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 750,
    margin: '2rem auto',
    background: '#fff',
    borderRadius: '14px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
    padding: '2rem',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
  },
  progressSection: {
    textAlign: 'left',
    marginTop: '1.5rem',
  },
  progressItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0.5rem 0',
  },
  progressBarWrapper: {
    flex: 1,
    height: '10px',
    background: '#eee',
    borderRadius: '6px',
    margin: '0 0.5rem',
  },
  progressBar: {
    height: '10px',
    background: '#0074E4',
    borderRadius: '6px',
    transition: 'width 0.5s ease',
  },
  averageText: {
    textAlign: 'center',
    marginTop: '1rem',
    fontWeight: '600',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
    marginTop: '2rem',
  },
  button: {
    background: '#003366',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: '0.3s ease',
  },
  rewardsSection: {
    marginTop: '2rem',
    background: '#f9fbff',
    borderRadius: '10px',
    padding: '1rem',
  },
  footer: {
    marginTop: '2rem',
    fontSize: '0.9rem',
    color: '#777',
  },
};
