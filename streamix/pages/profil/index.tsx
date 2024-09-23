// pages/profile.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";

interface UserProfile {
  _id: string;
  username: string;
  email: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Récupérez l'ID utilisateur depuis localStorage

    if (!userId) {
      router.push("/login"); // Redirige si l'utilisateur n'est pas connecté
    } else {
      // Simule la récupération des données utilisateur, remplacez avec votre API
      const fetchUserProfile = async () => {
        const response = await fetch(`/api/users/${userId}`); // Remplacez par votre point d'API
        if (response.ok) {
          const data = await response.json();

          setProfile(data);
          //console.log(profile);
        } else {
          router.push("/login"); // Redirige si l'utilisateur n'est pas valide
        }
      };
      fetchUserProfile();
    }
  }, [router]);
  const handleEdit = async (id: string) => {
    router.push(`/profil/${id}`);
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
        </div>
      </div>
    );
  } // Affiche un loader pendant le chargement des données

  return (
    <div>
      <Header></Header>
      <div className="bg-black overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-white">
            Profil Utilisateur
          </h3>
          <p className="mt-1 max-w-2xl text-lg text-white">
            Quelques informations à propos de vous
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Votre Identifiant Utilisateur
              </dt>
              <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                {profile._id}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Nom d'utilisateur
              </dt>
              <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                {profile.username}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Adresse Email
              </dt>
              <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                {profile.email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Numéro de téléphone
              </dt>
              <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                Non renseigné
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Addresse</dt>
              <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                Non renseigné
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <button
        className="p-2 bg-red-500 m-3 rounded-2xl shadow-xl"
        onClick={() => {
          localStorage.removeItem("userId"); // Supprimez l'ID de l'utilisateur de localStorage
          router.push("/"); // Redirige vers la page de connexion
        }}
      >
        Déconnexion
      </button>

      <button
        className="p-2 bg-green-500 m-3 rounded-2xl shadow-xl"
        onClick={() => handleEdit(profile._id)}
      >
        Modifier
      </button>
    </div>
  );
};

export default ProfilePage;
