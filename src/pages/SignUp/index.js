import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../store/userSlice'
import { useNavigate } from 'react-router-dom';
import { toggleDarkMode } from '../../store/themeSlice';

const SignUp = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const navigate = useNavigate();
    const { darkMode } = useSelector((state) => state.theme);

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(signUp({ name }));
        navigate('/');
    }

    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'}`}>
          <div className={`rounded-lg p-6 w-full max-w-md shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h1 className="text-xl font-bold mb-4 flex items-center gap-2">
              Welcome to CodeLeap network!
              <button
                onClick={() => dispatch(toggleDarkMode())}
                className="text-xl"
                title="Toggle Dark Mode"
              >
              {darkMode ? '🌞' : '🌙'}
              </button>
            </h1>
            <p className="mb-4">Please enter your username</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className={`px-6 py-2 rounded font-semibold transition ${
                    name.trim()
                      ? 'bg-[#7494ec] text-white hover:bg-blue-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  ENTER
                </button>
              </div>
            </form>
          </div>
        </div>
      );
}

export default SignUp
