import Navbar from "@/components/navabr";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
export default function Home() {
  const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [erreur, setError]= useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const validateEmail = () => {
      if (!email) {
        setError('Email invalide');
        return false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Format invalide');
        return false;
      } else {
        setError("");
        return true;
      }
    };
    const validatePassword = () => {
      if (!password  || password.length<8) {
        setError("Password est requis et doit etre supérieur à 8");
        return false;
      } else {
        setError("");
        return true;
      }
    };
    const validateRole = () => {
      if (!role  || role.length==0) {
        setError("Selecttionnez un role user et admin");
        return false;
      } else {
        setError("");
        return true;
      }
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setIsLoading(true)
      if (validateEmail() && validatePassword() && validateRole()) {
        
        const response = await fetch('/api/users/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password, role }),
        });
    
        if (response.ok) {
          setTimeout(() => router.push('/adminDashboard/account'), 100);
        } else {
          const data = await response.json();
          setError(data.message);
        }

        setIsLoading(false)
      }else{
        setIsLoading(false)
      }
    }
  return (
    <>
    <Navbar/>
    <section style={{minHeight:"100vh"}}  className="bg-white dark:bg-gray-900 mx-auto max-h-screen-xl" >
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
        <Link href="/adminDashboard/account" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert" replace>
          <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">Acount</span> <span className="text-sm font-medium">Account list</span>
          <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        </Link>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit} >
        <span className="text-red-600" > {erreur} </span>
          <div className="mb-5">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
            <input name="username" value={username} onChange={(e) => setUsername(e.target.value)} type="text" id="usemane" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="koffi" required />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input name="email" onBlur={validateEmail} value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input name="password" placeholder="**************" onBlur={validatePassword} value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          </div>
          <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your role</label>
          <div className="flex items-start mb-5">
            <select onBlur={validateRole} value={role} onChange={(e) => setRole(e.target.value)} name="role" id="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="" disabled>Selectionnez</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button disabled={isLoading} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isLoading ? 'Loading ...' : 'Enregister'}</button>
        </form>
      </div>
    </section></>
  )
}