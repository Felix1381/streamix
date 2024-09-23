// models/User.ts
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
const dbname= "streamix"
// Définit l'interface pour le modèle utilisateur.
interface IUser {
  _id?: ObjectId;
  username: string;
  email: string;
  role: string;
  password: string;
  dateJoined: Date;
  favourites: string[];
}

export class User implements IUser {
    static findById(client: MongoClient, userId: any) {
        throw new Error('Method not implemented.');
    }
  _id?: ObjectId;
  username: string;
  email: string;
  role: string;
  password: string;
  dateJoined: Date;
  favourites: string[];

  constructor(username: string, email: string, password: string, role:string) {
    this.username = username;
    this.email = email;
    this.role = role;
    this.password = password;
    this.dateJoined = new Date();
    this.favourites = [];
  }

  async save(client: MongoClient) {
    // Hash le mot de passe avant d'enregistrer.
    this.password = await bcrypt.hash(this.password, 10);
    const db = client.db(dbname); 
    const result = await db.collection('users').insertOne(this);
    this._id = result.insertedId; // Assigne l'identifiant généré à l'utilisateur.
  }

  static async findByEmail(client: MongoClient, email: string): Promise<any> {
        const db = client.db(dbname); 
    return await db.collection('users').findOne({ email });
  }

  static async findall(client: MongoClient): Promise<any> {
    const db = client.db(dbname); 
    return await db.collection('users').find({}).toArray();
  }

  // Modification de la méthode `update` pour supporter les mises à jour partielles
static async update(client: MongoClient, id: string, fields: Partial<IUser>): Promise<any> {
  const db = client.db(dbname);

  // Création d'un objet de mise à jour dynamique en ne prenant que les champs renseignés
  const updateFields: any = {};

  if (fields.username) updateFields.username = fields.username;
  if (fields.email) updateFields.email = fields.email;
  if (fields.password) {
      // Si le mot de passe est fourni, le hacher avant la mise à jour
      updateFields.password = await bcrypt.hash(fields.password, 10);
  }
  if (fields.role) updateFields.role = fields.role;

  // Utilisation de $set pour n'actualiser que les champs précisés
  return await db.collection('users').updateOne(
      { _id: new ObjectId(id) }, 
      { $set: updateFields }
  );
}



  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  // static async addFavourite(client: MongoClient,userId: string, favouriteId: string): Promise<void> {
  //   const db = client.db(dbname); 
  //   if (!this.favourites.includes(favouriteId)) {
  //     this.favourites.push(favouriteId);
  //     await db.collection('users').updateOne({ id: userId }, { $set: { favourites: this.favourites } });
  //   }
  // }

  // async removeFavourite(client: MongoClient, favouriteId: string): Promise<void> {
  //   const db = client.db(dbname); 
  //   this.favourites = this.favourites.filter(favourite => favourite !== favouriteId);
  //   await db.collection('users').updateOne({ _id: this._id }, { $set: { favourites: this.favourites } });
  // }

  static async addFavoriteMovie(client:MongoClient, userId: string, movieId: string): Promise<void> {
    const db = client.db('streamix');
  
    // Vérifie si le film existe déjà dans la liste des favoris
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) {
      throw new Error('Utilisateur non trouvé.');
    }
  
    // Assure que favoriteMovies est un tableau, sinon l'initialiser
    const favoriteMovies = user.favoriteMovies || [];
    
    // Vérification si le film est déjà dans la liste des favoris
    const alreadyFavorited = Array.isArray(favoriteMovies) && favoriteMovies.includes(movieId);
    if (!alreadyFavorited) {
      await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $addToSet: { favoriteMovies: movieId } } // Utilise $addToSet pour éviter les doublons
      );
    } else {
      throw new Error('Le film est déjà dans la liste des favoris.');
    }
  }
}