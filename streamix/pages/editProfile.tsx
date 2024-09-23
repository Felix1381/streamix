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
      if (user.role !== '') fieldsToUpdate.role = user.role;

      await axios.patch(`/api/users/${id}`, fieldsToUpdate);
      router.push('/profile');
    } catch (error) {
      console.error('Error updating user:', error);
      setError('' + error);
      setIsLoading(false)
    }
  };

  return (
    <>
    <Header></Header>
      <section style={{ minHeight: "100vh" }} className="bg-white dark:bg-gray-900 mx-auto max-h-screen-xl">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
          <Link href="/adminDashboard/account" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert" replace>
            <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">Acount</span> <span className="text-sm font-medium">Account list</span>
            <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </Link>
          <form className="max-w-sm mx-auto" onSubmit={handleUpdate} >
            <span className="text-red-600" > {erreur} </span>
            <div className="mb-5">
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
              <input placeholder="Username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })} type="text" id="usemane" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input name="email" value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })} type="text" id="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
              <input placeholder="***************"
                onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
            </div>
            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your role</label>
            <div className="flex items-start mb-5">
              <select value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })} name="role" id="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="" disabled>Selectionnez</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button disabled={isLoading} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading ? 'Loading ...' : 'Enregister'}</button>
          </form>
        </div>
      </section></>
  );
}
