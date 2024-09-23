Streamix
Description
Streamix est un site web de présentation et de critique de films. Il permet aux utilisateurs de parcourir les films, d'ajouter des films à leur liste de favoris, de laisser des commentaires et de noter des films. Les administrateurs peuvent ajouter, modifier et supprimer des films, ainsi que gérer les utilisateurs et leurs permissions.

L'application est construite avec Next.js, utilisant TypeScript, TailwindCSS pour le design, MongoDB pour la gestion des données, et l'API de The Movie Database (TMDb) pour récupérer les informations des films.

Fonctionnalités

Utilisateur (Frontend) :
Parcourir les films populaires, les nouveautés et les films mieux notés.
Rechercher des films par genre, date ou réalisateur.
Ajouter des films à la liste de favoris.
Noter les films et laisser des commentaires.
Modifier ses informations personnelles.

Administrateur (Backend) :
Ajouter, modifier, supprimer des films.
Gérer les utilisateurs (promouvoir un utilisateur en administrateur, etc.).
Consulter les statistiques de notes et de commentaires des films.
Ajouter de nouveaux films en utilisant l'API de TMDb.

Technologies Utilisées:
Next.js : Framework React pour la création de sites web server-side rendering (SSR) et statiques.
TypeScript : Langage fortement typé pour plus de sécurité et maintenabilité.
TailwindCSS : Framework CSS utilitaire pour un design rapide et réactif.
MongoDB : Base de données NoSQL utilisée pour stocker les informations des utilisateurs, des films, des commentaires et des notes.
TMDb API : API utilisée pour récupérer dynamiquement les informations sur les films.

Prérequis
Avant de démarrer, assure-toi d'avoir ces outils installés :
Node.js (version 14 ou supérieure)
MongoDB (ou une base de données MongoDB dans le cloud, comme MongoDB Atlas)
Une clé API pour The Movie Database (TMDb)

Installation
Clone ce dépôt sur ta machine locale :
git clone git@github.com:EpitechCodingAcademyPromo2024/C-COD-270-COT-2-4-c2cod270p0-felix.tete.git
cd streamix
Installe les dépendances :
npm install
Configure les variables d'environnement dans un fichier .env.local :
# .env.local
MONGODB_URI="mongodb+srv://Admin:Tetefelix0*@lix.aejbx.mongodb.net/streamix"
TMDB_API_KEY=ton_api_key_tmdb
Démarre l'application en mode développement :
npm run dev
L'application sera accessible à l'adresse http://localhost:3000.
Utilisation
Une fois l'application démarrée :

Accède à la page d'accueil pour parcourir les films.
Les utilisateurs peuvent créer un compte, se connecter, et interagir avec les films (noter, commenter, ajouter aux favoris).
Les administrateurs peuvent accéder à un dashboard pour gérer les utilisateurs et les films.
Démarrage rapide
Commandes
Démarrer le serveur en mode développement : npm run dev
Construire le projet pour la production : npm run build
Démarrer l'application en production : npm run start
<!-- Structure du projet
streamix/
├── components/       # Composants React
├── lib/              # Logique pour MongoDB et TMDb
├── pages/            # Pages de l'application Next.js
│   ├── index.tsx     # Page d'accueil
│   └── _app.tsx      # Fichier principal pour le layout
├── public/           # Fichiers statiques (images, icônes, etc.)
├── styles/           # Fichiers CSS (incluant Tailwind)
├── .env.local        # Variables d'environnement
├── tailwind.config.js# Configuration de TailwindCSS
├── tsconfig.json     # Configuration TypeScript
└── README.md         # Documentation -->
Déploiement
Pour déployer l'application sur un service comme Vercel (recommandé pour Next.js) :

Crée un compte sur Vercel.
Connecte ton dépôt GitHub et sélectionne ton projet.
Configure les variables d'environnement (MONGODB_URI, TMDB_API_KEY) sur Vercel.
Déploie le projet.

<<<<<<< HEAD
Your app should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

You will either see a message stating "You are connected to MongoDB" or "You are NOT connected to MongoDB". Ensure that you have provided the correct `MONGODB_URI` environment variable.

When you are successfully connected, you can refer to the [MongoDB Node.js Driver docs](https://mongodb.github.io/node-mongodb-native/3.4/tutorials/collections/) for further instructions on how to query your database.

## Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

#### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.

#### Deploy from Our Template

Alternatively, you can deploy using our template by clicking on the Deploy button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?project-name=with-mongodb&repository-name=with-mongodb&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-mongodb&integration-ids=oac_jnzmjqM10gllKmSrG0SGrHOH)
=======
Contribuer
Les contributions sont les bienvenues ! Pour proposer une nouvelle fonctionnalité ou corriger un bug, ouvre une issue ou soumets une pull request.
>>>>>>> 5c2affce2aaef1faca3cf4c00f808954b2ef9ad1
