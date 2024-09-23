import Link from "next/link";
import React, { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import Navbar from "@/components/navabr";
import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI || ''; // Assurez-vous que cette variable d'environnement est correctement définie
const client = new MongoClient(uri);
import axios from "axios";
interface User {
    _id: string;
    email: string;
    username:string;
    role: string;
}
export default function Home() {
    const [users, setUsers] = useState<User[]>([]);
    const [showAllData, setShowAllData] = useState(false);
    const [allData, setAllData] = useState([]);
    const router = useRouter();
  
    // Vérifier si l'utilisateur est connecté
    useEffect(() => {
        if(localStorage.getItem('userRole')){


      if (!localStorage.getItem('userId')) {
        router.push('/login');
      }
      else{
        const userRole = localStorage.getItem('userRole');
        if(userRole != 'admin'){
            router.push('/login');
        }
      }
    }
}, [router]);
  
    const fetchAllData = async () => {
        const response = await fetch('/api/users/create', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        //console.log(response);

        if (response.ok) {
            const data = await response.json();
            //console.log(data);

            setAllData(data);
            setShowAllData(true);
        } else {
            alert("Failed to fetch data!");
        }
    };
    const handleEdit = async (id: string) => {
        router.push(`/adminDashboard/account/${id}`);
    };
    const handleDelete = async (id: string) => {
        try {
          await axios.delete(`/api/users/${id}`);
          setUsers(users.filter(user => user._id !== id)); // Mise à jour de l'état local après suppression
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };

    useEffect(() => {
        async function fetchUsers() {
            const data = await axios.get('/api/users/create');
            setUsers(data.data.user);
            //console.log(data);

        }
        fetchUsers();
    }, []);
    return (
        <>
            <Navbar />
            <section style={{minHeight:"100vh"}} className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 mx-auto max-h-screen-xl ">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <a href="account/new" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
                        <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">Account</span> <span className="text-sm font-medium">New Account</span>
                        <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    </a>
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                    List of Account
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Username</th>
                                        <th scope="col" className="px-4 py-3">Email</th>
                                        <th scope="col" className="px-4 py-3">Role</th>
                                        <th scope="col" className="px-4 py-3">Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user._id} className="border-b dark:border-gray-700">
                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.username}</th>
                                            <td className="px-4 py-3">{user.email}</td>
                                            <td className="px-4 py-3">{user.role}</td>
                                            <td className="px-4 py-3">
                                                <button onClick={() => handleEdit(user._id)} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
                                                <button onClick={() => handleDelete(user._id)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                                                {/* <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">See</button> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </section></>
    )
}