// pages/profile.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface UserProfile {
  _id: string;
  username: string;
  email: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Récupérez l'ID utilisateur depuis localStorage

    if (!userId) {
      router.push('/login'); // Redirige si l'utilisateur n'est pas connecté
    } else {
      // Simule la récupération des données utilisateur, remplacez avec votre API
      const fetchUserProfile = async () => {
        const response = await fetch(`/api/users/${userId}`); // Remplacez par votre point d'API
        if (response.ok) {
          const data = await response.json();
          
          setProfile(data);
          //console.log(profile);
        } else {
          router.push('/login'); // Redirige si l'utilisateur n'est pas valide
        }
      };
      fetchUserProfile();
    }
  }, [router]);
  const handleEdit = async (id: string) => {
    router.push(`/editProfile/${id}`);
};

  if (!profile) {return (<div className="flex items-center justify-center h-screen">
  <div className="relative">
      <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
      <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
      </div>
  </div>
</div>);} // Affiche un loader pendant le chargement des données

  return (
    <div>
      <h1>Profil de l'utilisateur</h1>
      <h2>Nom: {profile.username}</h2>
      <p>Email: {profile.email}</p>
      <p>ID Utilisateur: {profile._id}</p>
      <button
      className='p-2 bg-red-500 m-3 rounded-2xl shadow-xl'
        onClick={() => {
          localStorage.removeItem('userId'); // Supprimez l'ID de l'utilisateur de localStorage
          router.push('/'); // Redirige vers la page de connexion
        }}
      >
        Déconnexion
      </button>

      <button className='p-2 bg-green-500 m-3 rounded-2xl shadow-xl' onClick={() => handleEdit(profile._id)}>Modifier</button>
    </div>
  );
};

export default ProfilePage;