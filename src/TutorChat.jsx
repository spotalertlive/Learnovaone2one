import React, { useState, useEffect, useRef } from 'react';

// --- Web Speech Setup ---
const synth = window.speechSynthesis;
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function TutorChat() {
  const [messages, setMessages] = useState([
    { from: 'system', text: '👋 Hi! I’m Shira — your 24/7 AI tutor. How can I help today?' }
  ]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  // --- Voice recognition setup ---
  useEffect(() => {
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = false;
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleSend(transcript);
      };
      recognitionRef.current.onend = () => setListening(false);
    }
  }, []);

  // --- Voice output function ---
  const speak = (text) => {
    if (!text) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.pitch = 1;
    utter.rate = 1;
    synth.speak(utter);
  };

  // --- Simulated AI response ---
  const getAIResponse = async (userInput) => {
    const responses = [
      "Let’s work that out together. First, tell me what you already understand about this topic.",
      "That's a good question! Remember, in algebra we isolate the variable. Want an example?",
      "Try breaking it into smaller steps — I can show you if you'd like.",
      "Good thinking! Let's go over how that works step by step."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // --- Send message handler ---
  const handleSend = async (text) => {
    if (!text.trim()) return;

    const newMsg = { from: 'user', text };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');

    // simulate AI thinking
    const reply = await getAIResponse(text);
    const botMsg = { from: 'tutor', text: reply };
    setMessages((prev) => [...prev, botMsg]);
    speak(reply);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return alert('Speech recognition not supported in this browser.');
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
              background:
                msg.from === 'user' ? '#0074E4' : '#F1F3F7',
              color: msg.from === 'user' ? '#fff' : '#222'
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
        <button onClick={() => handleSend(input)} style={styles.sendBtn}>Send</button>
        <button onClick={toggleListening} style={styles.micBtn}>
          {listening ? '🎙️ Stop' : '🎤 Speak'}
        </button>
      </div>
    </div>
  );
}

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
  },
  message: {
    maxWidth: '80%',
    padding: '10px 14px',
    borderRadius: '14px',
    fontSize: '0.95rem',
    lineHeight: '1.4',
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
  },
  micBtn: {
    background: '#003366',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 14px',
    cursor: 'pointer',
  },
};
