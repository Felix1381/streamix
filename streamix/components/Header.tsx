import Image from 'next/image'
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'


function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  // if(window.localStorage.getItem('userId')){
  //   //console.log("Utilisateur connecté")
  // }
  // else{

  // }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='mb-20 bg-black'>
    <header className="flex justify-between items-center p-4 bg-gradient-to-b from-black to-transparent fixed top-0  w-full z-10">
    <img src="/streamix.png" alt="logo" className="h-8" />
    <nav>
      <ul className="flex space-x-4">
        <li>
          <a href="/homepage" className="hover:text-gray-400">
            Accueil
          </a>
        </li>
        <li>
          <a href="/favoris" className="hover:text-gray-400">
            Mes favoris
          </a>
        </li>
        <li>
          <a href="/profil" className="hover:text-gray-400 connexion-nav">
          Profil
          </a>
        </li>
      </ul>
    </nav>
  </header>
  </div>
  )
}

export default Header