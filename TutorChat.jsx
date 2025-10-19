import React, { useState, useEffect, useRef } from 'react';

// --- Web Speech Setup ---
const synth = window.speechSynthesis;
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function TutorChat() {
  const [messages, setMessages] = useState([
    { from: 'system', text: '👋 Hi! I’m Shira — your 24/7 AI tutor. You can also ask for Shaima anytime.' }
  ]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  // --- Voice recognition setup ---
  useEffect(() => {
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleSend(transcript);
      };
      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  // --- Voice output function ---
  const speak = (text) => {
    if (!text) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.pitch = 1;
    utter.rate = 1;
    synth.cancel(); // clear any ongoing speech
    synth.speak(utter);
  };

  // --- Simulated AI response ---
  const getAIResponse = (userInput) => {
    const lower = userInput.toLowerCase();
    if (lower.includes('math')) return "Let's work that out together! What kind of math problem are you facing?";
    if (lower.includes('science')) return "Science is fascinating! Which branch — physics, chemistry, or biology?";
    if (lower.includes('homework')) return "Sure! Describe your homework question and we’ll solve it together.";
    if (lower.includes('shaima')) return "Switching to Shaima 👩‍🏫 — Hello there! I’m ready to help you study.";
    const responses = [
      "Let’s go over this step by step. What part do you find tricky?",
      "That’s a great question! Let's think it through logically.",
      "Try breaking it down — I can walk you through it.",
      "Good thinking! Let's explore that idea further."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // --- Send message handler ---
  const handleSend = async (text) => {
    if (!text.trim()) return;

    const newMsg = { from: 'user', text };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');

    const reply = getAIResponse(text);
    const botMsg = { from: 'tutor', text: reply };
    setTimeout(() => {
      setMessages((prev) => [...prev, botMsg]);
      speak(reply);
    }, 700);
  };

  const toggleListening = () => {
    if (!recognitionRef.current)
      return alert('⚠️ Voice input not supported in this browser.');
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.header}>🎓 Shira & Shaima — Your AI Tutors</div>

      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
              background: msg.from === 'user' ? '#0074E4' : '#F1F3F7',
              color: msg.from === 'user' ? '#fff' : '#222',
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={styles.controls}>
        <input
          type="text"
          value={input}
          placeholder="Type your question..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
          style={styles.input}
        />
        <button onClick={() => handleSend(input)} style={styles.sendBtn}>
          Send
        </button>
        <button onClick={toggleListening} style={styles.micBtn}>
          {listening ? '🎙️ Stop' : '🎤 Speak'}
        </button>
      </div>
    </div>
  );
}

// --- Inline styles for quick deployment ---
const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 600,
    height: '80vh',
    margin: 'auto',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 18px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    padding: '1rem',
  },
  header: {
    fontSize: '1.2rem',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '0.8rem',
    color: '#003366',
  },
  messages: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    padding: '0.6rem',
    overflowY: 'auto',
    scrollBehavior: 'smooth',
  },
  message: {
    maxWidth: '80%',
    padding: '10px 14px',
    borderRadius: '14px',
    fontSize: '0.95rem',
    lineHeight: '1.4',
    wordWrap: 'break-word',
  },
  controls: {
    display: 'flex',
    gap: '0.5rem',
    paddingTop: '0.8rem',
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    fontSize: '1rem',
  },
  sendBtn: {
    background: '#0074E4',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 14px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  micBtn: {
    background: '#003366',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 14px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};
