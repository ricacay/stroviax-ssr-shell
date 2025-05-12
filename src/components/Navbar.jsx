import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">StroviaX</Link>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow">
          Connect Wallet
        </button>
      </div>
    </nav>
  )
}

export default Navbar