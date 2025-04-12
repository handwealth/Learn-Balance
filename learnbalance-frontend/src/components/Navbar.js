import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <div className="text-xl font-bold text-white">📚 LearnBalance</div>

      <div className="space-x-4 text-white font-medium flex items-center">
        {token && user ? (
          <>
            <span className="text-white ">Hi, {user.name.split(' ')[0]}</span>
            <Link to="/dashboard" className="hover:text-yellow-300 transition duration-200">Dashboard</Link>
            <Link to="/log" className="hover:text-yellow-300 transition duration-200">Add Log</Link>
            <button
              onClick={handleLogout}
              className="hover:text-yellow-300 transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-yellow-300 transition duration-200">Login</Link>
            <Link to="/register" className="hover:text-yellow-300 transition duration-200">Register</Link>
            <Link to="/dashboard" className="hover:text-yellow-300 transition duration-200">Dashboard</Link>
            <Link to="/log" className="hover:text-yellow-300 transition duration-200">Add Log</Link>
          </>
        )}
      </div>
    </nav>
  );
}
