import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [result, setResult] = useState(null)
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('learnovaQuizResult')
    if (stored) {
      const parsed = JSON.parse(stored)
      setResult(parsed)
      buildSummary(parsed)
    }
    setLoading(false)
  }, [])

  const buildSummary = (r) => {
    if (!r) return
    let text = ''
    const accuracy = (r.score / r.total) * 100

    if (accuracy >= 90)
      text =
        '🌟 Excellent performance! You’ve mastered this subject. Shira recommends starting advanced challenges.'
    else if (accuracy >= 70)
      text =
        '👍 Great job! Keep practicing, especially on areas where you missed questions.'
    else if (accuracy >= 40)
      text =
        '💪 You’re improving! Focus on your weaker topics. Shaima will guide you step by step.'
    else text = '📘 Let’s rebuild the foundation — we’ll start from basics and move up together.'

    setSummary(text)
  }

  const clearData = () => {
    localStorage.removeItem('learnovaQuizResult')
    window.location.reload()
  }

  if (loading) return <p>Loading progress...</p>

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📊 Your Learning Dashboard</h2>

      {result ? (
        <>
          <div style={styles.card}>
            <p><strong>Subject:</strong> {result.subject}</p>
            <p><strong>Score:</strong> {result.score} / {result.total}</p>
            <p><strong>Date:</strong> {new Date(result.date).toLocaleString()}</p>
          </div>

          <div style={styles.summaryBox}>
            <h3>🧠 Summary</h3>
            <p>{summary}</p>
          </div>

          <div style={styles.actions}>
            <Link to="/quiz" style={styles.btn}>🧩 Retake Quiz</Link>
            <Link to="/tutor" style={styles.btnAlt}>💬 Talk to Shira</Link>
            <button onClick={clearData} style={styles.clearBtn}>Reset Data</button>
          </div>
        </>
      ) : (
        <div>
          <p>No quiz data found yet.</p>
          <Link to="/quiz" style={styles.btn}>Start Diagnostic Quiz</Link>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    background: '#fff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 18px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '1.6rem',
    color: '#003366',
    marginBottom: '20px',
  },
  card: {
    background: '#f9fbff',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    textAlign: 'left',
    lineHeight: 1.6,
  },
  summaryBox: {
    background: '#eef6ff',
    padding: '20px',
    borderRadius: '10px',
    marginTop: '10px',
    textAlign: 'left',
    lineHeight: 1.6,
  },
  actions: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  btn: {
    background: '#0074E4',
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    fontWeight: 600,
  },
  btnAlt: {
    background: '#003366',
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    fontWeight: 600,
  },
  clearBtn: {
    background: '#e63946',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    fontWeight: 600,
    cursor: 'pointer',
  },
}
