// pages/register.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const response = await fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      setSuccess('Utilisateur créé avec succès. Vous pouvez maintenant vous connecter');
      setTimeout(() => router.push('/login'), 2000);
    } else {
      const data = await response.json();
      setError(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent bg-[url('/bg-films.webp')] bg-fixed bg-center bg-cover bg-no-repeat">
      <div className="w-full max-w-md p-6 bg-gray-100 rounded-2xl shadow-2xl">
        <div className="flex justify-center items-center">
        <img src="/streamix.png" alt="" className='m-5 w-64 h-auto'/>
        </div>
     
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          {success && <p className="text-green-600 mb-4">{success}</p>}
          <button type="submit" className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;