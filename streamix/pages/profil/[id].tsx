import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '@/components/Header';
import Link from 'next/link';

export default function EditUser() {
  const [erreur, setError] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter();
  const {id} =router.query;
  const [user, setUser] = useState({ email: '', username: '', password: '', role: '' });

  useEffect(() => {
    if (id) {
      axios.get(`/api/users/${id}`).then((res) => setUser(res.data));
    }
  }, [id]);

  const handleUpdate = async (e: any) => {
    e.preventDefault()

    setIsLoading(true)
    try {
      const fieldsToUpdate: any = {};

      if (user.username !== '') fieldsToUpdate.username = user.username;
      if (user.email !== '') fieldsToUpdate.email = user.email;
      if (user.password !== '') fieldsToUpdate.password = user.password;

      await axios.patch(`/api/users/${id}`, fieldsToUpdate);
      router.push('/profil');
    } catch (error) {
      console.error('Error updating user:', error);
      setError('' + error);
      setIsLoading(false)
    }
  };

  return (
    <>
    <Header></Header>
      <section style={{ minHeight: "100vh" }} className="bg-black dark:bg-gray-900 mx-auto max-h-screen-xl">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
          <form className="max-w-sm mx-auto" onSubmit={handleUpdate} >
            <span className="text-red-600" > {erreur} </span>
            <div className="mb-5">
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-white dark:text-white">Nom d'utilisateur</label>
              <input placeholder="Username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })} type="text" id="usemane" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-white">Votre Email</label>
              <input name="email" value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })} type="text" id="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-white">Mot de Passe</label>
              <input placeholder="***************"
                onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
            </div>

            <button disabled={isLoading} className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading ? 'Loading ...' : 'Enregister'}</button>
          </form>
        </div>
      </section></>
  );
}
