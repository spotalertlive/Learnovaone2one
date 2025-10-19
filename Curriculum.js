import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Curriculum() {
  const navigate = useNavigate()
  const [country, setCountry] = useState('')
  const [subject, setSubject] = useState('')
  const [level, setLevel] = useState('')
  const [error, setError] = useState('')

  const handleStart = () => {
    if (!country || !subject || !level) {
      setError('Please select country, subject, and grade level.')
      return
    }
    localStorage.setItem('learnovaSelections', JSON.stringify({ country, subject, level }))
    navigate('/tutor')
  }

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>🎓 Choose Your Curriculum</h2>
      <p style={styles.subtext}>
        Pick your location, subject, and grade level. Shira & Shaima will customize your learning path.
      </p>

      <div style={styles.form}>
        <label style={styles.label}>🌍 Country:</label>
        <select value={country} onChange={(e) => setCountry(e.target.value)} style={styles.select}>
          <option value="">-- Select --</option>
          <option value="Kenya">Kenya</option>
          <option value="Canada">Canada</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>

        <label style={styles.label}>📚 Subject:</label>
        <select value={subject} onChange={(e) => setSubject(e.target.value)} style={styles.select}>
          <option value="">-- Select --</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
          <option value="Islamic Studies">Islamic Studies</option>
          <option value="African History">African History</option>
        </select>

        <label style={styles.label}>🎓 Grade Level:</label>
        <select value={level} onChange={(e) => setLevel(e.target.value)} style={styles.select}>
          <option value="">-- Select --</option>
          <option value="KG">Kindergarten</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={`Grade ${i + 1}`}>
              Grade {i + 1}
            </option>
          ))}
        </select>

        {error && <p style={styles.error}>{error}</p>}

        <button onClick={handleStart} style={styles.startBtn}>
          🚀 Start Learning
        </button>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    textAlign: 'center',
    margin: '40px auto',
    padding: '30px',
    background: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    maxWidth: '480px'
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '10px',
    color: '#003366'
  },
  subtext: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  label: {
    fontWeight: 600,
    textAlign: 'left',
    marginLeft: '10%'
  },
  select: {
    width: '80%',
    margin: 'auto',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  error: {
    color: 'red',
    marginTop: '10px'
  },
  startBtn: {
    background: '#0074E4',
    color: '#fff',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    marginTop: '10px',
    cursor: 'pointer',
    fontSize: '1rem'
  }
}
