import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Curriculum() {
  const [country, setCountry] = useState('Kenya');
  const [grade, setGrade] = useState('Grade 8');
  const [language, setLanguage] = useState('English');

  const subjectsByCountry = {
    Kenya: ['Math', 'English', 'Science', 'Social Studies', 'Kiswahili', 'Islamic Studies'],
    USA: ['Math', 'English Language Arts', 'Science', 'History', 'Geography', 'Civics'],
    UK: ['Maths', 'English Literature', 'Science', 'ICT', 'Geography', 'Religious Studies'],
    Canada: ['Math', 'English', 'Science', 'Social Studies', 'French', 'Civics']
  };

  const sampleLessons = {
    Math: 'Understanding fractions and percentages in daily life.',
    English: 'Reading comprehension and writing clear sentences.',
    Science: 'Exploring ecosystems and human body systems.',
    History: 'How early civilizations shaped today’s world.',
    Geography: 'Identifying continents, oceans, and climate zones.',
    Islamic: 'Importance of fasting, prayer, and good conduct.'
  };

  const handleLanguageChange = () => {
    if (language === 'English') setLanguage('Swahili');
    else if (language === 'Swahili') setLanguage('French');
    else setLanguage('English');
  };

  const translated = (text) => {
    const translations = {
      English: text,
      Swahili: {
        'Math': 'Hisabati',
        'Science': 'Sayansi',
        'English': 'Kiingereza',
        'History': 'Historia',
        'Geography': 'Jiografia',
        'Islamic Studies': 'Elimu ya Kiislamu',
        'Social Studies': 'Masomo ya Jamii'
      },
      French: {
        'Math': 'Mathématiques',
        'Science': 'Sciences',
        'English': 'Anglais',
        'History': 'Histoire',
        'Geography': 'Géographie',
        'Islamic Studies': 'Études Islamiques',
        'Social Studies': 'Sciences Sociales'
      }
    };
    return translations[language][text] || text;
  };

  return (
    <div style={styles.container}>
      <h2>🌍 Curriculum Overview</h2>

      <div style={styles.selectorGroup}>
        <div>
          <label>Country:</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)} style={styles.select}>
            {Object.keys(subjectsByCountry).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Grade:</label>
          <select value={grade} onChange={(e) => setGrade(e.target.value)} style={styles.select}>
            {['Grade 6', 'Grade 7', 'Grade 8', 'Form 1', 'Form 2'].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Language:</label>
          <button onClick={handleLanguageChange} style={styles.langBtn}>
            {language}
          </button>
        </div>
      </div>

      <div style={styles.subjectGrid}>
        {subjectsByCountry[country].map((subject) => (
          <div key={subject} style={styles.card}>
            <h4>{translated(subject)}</h4>
            <p style={styles.lessonText}>{sampleLessons[subject.split(' ')[0]] || 'Lesson content coming soon.'}</p>
            <Link
              to="/tutor"
              style={styles.button}
              state={{ subject, grade, country }}
            >
              🔊 Ask Shira / Shaima
            </Link>
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        <p>💡 Switch language to view subjects in {language === 'English' ? 'Swahili' : language === 'Swahili' ? 'French' : 'English'}.</p>
        <small>© {new Date().getFullYear()} Learnova One2One</small>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 900,
    margin: '2rem auto',
    background: '#fff',
    padding: '2rem',
    borderRadius: '14px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
  },
  selectorGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '2rem',
  },
  select: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    marginLeft: '8px',
  },
  langBtn: {
    background: '#003366',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 14px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  subjectGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1rem',
  },
  card: {
    background: '#f9fbff',
    borderRadius: '10px',
    padding: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    textAlign: 'left',
  },
  lessonText: {
    fontSize: '0.9rem',
    color: '#333',
    minHeight: '50px',
  },
  button: {
    display: 'inline-block',
    background: '#0074E4',
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    marginTop: '0.6rem',
    fontWeight: '500',
  },
  footer: {
    marginTop: '2rem',
    fontSize: '0.9rem',
    color: '#777',
  },
};
