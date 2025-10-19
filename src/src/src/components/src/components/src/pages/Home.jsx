import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="home">
      <h1>Welcome to Learnova One2One</h1>
      <p>Your AI tutor, Shira & Shaima, are ready to help you master every subject.</p>
      <Link to="/signup" className="cta">Get Started</Link>
    </section>
  )
}
