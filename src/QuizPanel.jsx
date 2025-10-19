import React, { useState } from 'react';

// --- Shira & Shaima voice setup ---
const synth = window.speechSynthesis;
const shiraVoice = { lang: 'en-US', pitch: 1, rate: 1, name: 'Shira' };
const shaimaVoice = { lang: 'en-GB', pitch: 1.2, rate: 0.95, name: 'Shaima' };

export default function QuizPanel() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [voice, setVoice] = useState('shira'); // or 'shaima'

  const questions = [
    {
      subject: 'Math',
      q: 'What is 5 × 7?',
      options: ['10', '25', '35', '45'],
      answer: '35'
    },
    {
      subject: 'Science',
      q: 'What planet is known as the Red Planet?',
      options: ['Mars', 'Earth', 'Venus', 'Jupiter'],
      answer: 'Mars'
    },
    {
      subject: 'English',
      q: 'Choose the correct form: "She ___ to school every day."',
      options: ['go', 'goes', 'gone', 'going'],
      answer: 'goes'
    },
    {
      subject: 'Islamic Studies',
      q: 'Which month is the month of fasting in Islam?',
      options: ['Shawwal', 'Ramadan', 'Muharram', 'Dhul-Hijjah'],
      answer: 'Ramadan'
    },
    {
      subject: 'African History',
      q: 'Who was the first president of independent Kenya?',
      options: ['Nelson Mandela', 'Kwame Nkrumah', 'Jomo Kenyatta', 'Haile Selassie'],
      answer: 'Jomo Kenyatta'
    }
  ];

  // --- Speak tutor response ---
  const speak = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    const v = voice === 'shira' ? shiraVoice : shaimaVoice;
    utter.lang = v.lang;
    utter.pitch = v.pitch;
    utter.rate = v.rate;
    synth.speak(utter);
  };

  const handleSelect = (option) => {
    setSelected(option);
  };

  const handleNext = () => {
    const currentQ = questions[current];
    let correct = optionCheck(currentQ.answer);

    if (correct) {
      setScore(score + 1);
      speak(`Correct! Great job on that ${currentQ.subject} question.`);
    } else {
      speak(`Not quite. The correct answer was ${currentQ.answer}. Keep trying!`);
    }

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected('');
    } else {
      setShowResults(true);
      speak(`You’ve completed the quiz! Your final score is ${score + (correct ? 1 : 0)} out of ${questions.length}.`);
    }
  };

  const optionCheck = (answer) => selected === answer;

  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setSelected('');
    setShowResults(false);
    speak("Let’s take the quiz again and see how much you’ve improved!");
  };

  const toggleVoice = () => {
    const nextVoice = voice === 'shira' ? 'shaima' : 'shira';
    setVoice(nextVoice);
    speak(`You are now talking with ${nextVoice === 'shira' ? 'Shira' : 'Shaima'}.`);
  };

  if (showResults) {
    return (
      <div style={styles.container}>
        <h2>🎉 Quiz Completed!</h2>
        <p>Your Score: <strong>{score}</strong> / {questions.length}</p>
        <p>
          {score <= 2
            ? "Let’s review the basics together."
            : score < 4
            ? "You’re doing great! A few topics to improve."
            : "Excellent! You’re ready for advanced lessons."}
        </p>
        <button onClick={restartQuiz} style={styles.button}>Restart</button>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div style={styles.container}>
      <h3>🧠 {q.subject} Question {current + 1} / {questions.length}</h3>
      <p>{q.q}</p>

      <div style={styles.options}>
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(opt)}
            style={{
              ...styles.option,
              background: selected === opt ? '#0074E4' : '#F1F3F7',
              color: selected === opt ? '#fff' : '#222'
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      <div style={styles.controls}>
        <button onClick={toggleVoice} style={styles.voiceBtn}>
          🎙 Switch to {voice === 'shira' ? 'Shaima' : 'Shira'}
        </button>
        <button
          onClick={handleNext}
          disabled={!selected}
          style={styles.nextBtn}
        >
          {current + 1 < questions.length ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: '2rem auto',
    background: '#fff',
    padding: '2rem',
    borderRadius: '14px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif'
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    marginTop: '1rem'
  },
  option: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500'
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1.5rem'
  },
  nextBtn: {
    background: '#0074E4',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  voiceBtn: {
    background: '#003366',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  button: {
    background: '#0074E4',
    color: '#fff',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem'
  }
};
