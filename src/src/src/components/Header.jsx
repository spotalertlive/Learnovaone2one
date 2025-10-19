import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Learnova Logo" className="logo" />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/curriculum">Curriculum</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  )
}
