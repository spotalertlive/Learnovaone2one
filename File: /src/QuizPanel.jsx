import React, { useState, useEffect } from 'react'

export default function QuizPanel() {
  const [subject, setSubject] = useState('')
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(true)

  // Load user subject and generate quiz
  useEffect(() => {
    const selections = JSON.parse(localStorage.getItem('learnovaSelections'))
    const subj = selections?.subject || 'Math'
    setSubject(subj)
    generateQuiz(subj)
  }, [])

  // ✅ Dynamic question generator — no placeholders
  const generateQuiz = (subj) => {
    setLoading(true)

    const templates = {
      Math: [
        { q: 'Solve: 12 + ? = 19', formula: (a) => a + 7 },
        { q: 'Find half of ?', formula: (a) => a / 2 },
        { q: 'What is ? × 3?', formula: (a) => a * 3 },
      ],
      Science: [
        { q: 'What happens when ice melts?', a: 'It becomes water.' },
        { q: 'Which sense organ helps us to see?', a: 'Eyes.' },
        { q: 'The earth revolves around the ?', a: 'Sun.' },
      ],
      English: [
        { q: 'Form a plural: "child"', a: 'children' },
        { q: 'Identify the verb: "She runs fast."', a: 'runs' },
        { q: 'Choose correct spelling: accomodate / accommodate', a: 'accommodate' },
      ],
      'Islamic Studies': [
        { q: 'How many times a day should Muslims pray?', a: '5' },
        { q: 'In which month do Muslims fast?', a: 'Ramadan' },
        { q: 'What is the first pillar of Islam?', a: 'Shahada' },
      ],
      'African History': [
        { q: 'Who was the first president of Kenya?', a: 'Jomo Kenyatta' },
        { q: 'Which ocean borders East Africa?', a: 'Indian Ocean' },
        { q: 'Where are the Great Pyramids located?', a: 'Egypt' },
      ]
    }

    const chosenSet = templates[subj] || templates.Math

    // Randomize numeric templates for Math only
    const generated = chosenSet.map((item) => {
      if (item.formula) {
        const random = Math.floor(Math.random() * 10) + 1
        const answer = item.formula(random)
        return { q: item.q.replace('?', random), a: String(answer) }
      }
      return item
    })

    setQuestions(generated)
    setLoading(false)
  }

  const handleAnswer = (userAnswer) => {
    const currentQ = questions[current]
    const correct = currentQ.a.trim().toLowerCase()
    const user = userAnswer.trim().toLowerCase()
    let msg = ''

    if (user === correct) {
      setScore((prev) => prev + 1)
      msg = '✅ Correct! Great job — keep going!'
    } else {
      msg = `❌ The correct answer was "${currentQ.a}". Don’t worry, we’ll review this later.`
    }

    setFeedback(msg)

    const next = current + 1
    if (next < questions.length) {
      setTimeout(() => {
        setCurrent(next)
        setFeedback('')
      }, 1500)
    } else {
      setFinished(true)
      storeResult()
    }
  }

  const storeResult = () => {
    const result = {
      subject,
      score,
      total: questions.length,
      date: new Date().toISOString(),
    }
    localStorage.setItem('learnovaQuizResult', JSON.stringify(result))
  }

  const restartQuiz = () => {
    setScore(0)
    setCurrent(0)
    setFinished(false)
    setFeedback('')
    generateQuiz(subject)
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🧠 Diagnostic Quiz — {subject}</h2>

      {loading ? (
        <p>Generating your personalized quiz...</p>
      ) : !finished ? (
        <>
          <h3 style={styles.question}>
            {current + 1}. {questions[current].q}
          </h3>
          <QuizInput onSubmit={handleAnswer} />
          {feedback && <p style={styles.feedback}>{feedback}</p>}
          <p style={styles.progress}>
            Question {current + 1} / {questions.length}
          </p>
        </>
      ) : (
        <div style={styles.results}>
          <h3>
            Your Score: {score} / {questions.length}
          </h3>
          <p>
            {score === questions.length
              ? '🌟 Excellent work! You’re ready to move to advanced level.'
              : score >= questions.length / 2
              ? '👍 Good job! Shira will reinforce your weaker areas.'
              : '💪 Keep practicing — your tutor will tailor lessons for improvement.'}
          </p>
          <button style={styles.resetBtn} onClick={restartQuiz}>
            🔁 Retake Diagnostic
          </button>
        </div>
      )}
    </div>
  )
}

// Child component for text input
function QuizInput({ onSubmit }) {
  const [input, setInput] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    onSubmit(input)
    setInput('')
  }

  return (
    <form onSubmit={handleSubmit} style={styles.inputForm}>
      <input
        type="text"
        placeholder="Type your answer..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.submitBtn}>
        Submit
      </button>
    </form>
  )
}

const styles = {
  container: {
    maxWidth: '520px',
    margin: '40px auto',
    background: '#fff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 18px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.6rem',
    color: '#003366',
    marginBottom: '20px',
  },
  question: {
    fontSize: '1.2rem',
    marginBottom: '20px',
  },
  inputForm: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1rem',
    flex: 1,
  },
  submitBtn: {
    background: '#0074E4',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 16px',
    cursor: 'pointer',
  },
  progress: {
    color: '#666',
    marginTop: '20px',
  },
  feedback: {
    marginTop: '10px',
    color: '#003366',
    fontWeight: 500,
  },
  results: {
    marginTop: '20px',
  },
  resetBtn: {
    background: '#003366',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px',
  },
}
