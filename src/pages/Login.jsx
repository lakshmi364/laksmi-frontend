import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('https://lakshmi-backend-z6cz.onrender.com/login', new URLSearchParams({
        username,
        password
      }), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })

      if (res.request.responseURL.includes('/dashboard')) {
        navigate('/dashboard')
      } else {
        setError('Invalid credentials 💔')
      }
    } catch (err) {
      setError('Backend unreachable or error occurred 💥')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 text-center">
      <h1 className="text-4xl font-bold mb-6 text-rose-600">Lakshmi 💖</h1>
      <form onSubmit={handleLogin} className="bg-white shadow-lg p-8 rounded-lg w-80">
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-rose-500 text-white py-2 rounded hover:bg-rose-600 transition"
        >
          Login
        </button>
        {error && <p className="text-red-600 mt-3">{error}</p>}
      </form>
    </div>
  )
}

export default Logi
