// pages/login.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('userRole', data.userRole); // Stocke l'ID d'utilisateur dans localStorage
      localStorage.setItem('userId', data.userId); // Stocke l'ID d'utilisateur dans localStorage
      //console.log(localStorage.getItem('userId'));
      router.push('/homepage'); // Redirection vers le tableau de bord
    } else {
      const data = await response.json();
      setError(data.message);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
    <video
        className="absolute top-0 left-0 w-auto min-w-full min-h-full max-w-none"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/bg-video.mp4" type="video/mp4" />
        Votre navigateur ne prend pas en charge la vidéo.
    </video>
    
    <div className="relative z-10 flex items-center justify-center h-full bg-black bg-opacity-50" >
      <div className="w-full max-w-md p-6 bg-transparent rounded-2xl shadow-4xl">
        <div className="flex justify-center items-center">
          <img src="/streamix.png" alt="" className='m-5 w-64 h-auto'/>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <button type="submit" className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;