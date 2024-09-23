import { MongoClient, ObjectId, Document } from "mongodb";

// Interface représentant la structure du film
export interface IMovie {
  _id?: ObjectId;
  title: string;
  description: string;
  releaseDate: Date;
  genre: string[];
  director: string;
  ratings: number;
  idFilm: number;
  image: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  comments: { [userId: string]: string[] };
  date: Date;
}

export class Movie implements IMovie {
  _id?: ObjectId;
  title: string;
  description: string;
  releaseDate: Date;
  genre: string[];
  director: string;
  ratings: number;
  idFilm: number;
  image: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  comments: { [userId: string]: string[] };
  date: Date;

  constructor(
    title: string,
    description: string,
    releaseDate: Date,
    genre: string[] = [],
    director: string,
    ratings: number,
    idFilm: number,
    image: string,
    backdrop_path: string,
    vote_average: number,
    vote_count: number,
    date: Date,
    comments: { [userId: string]: string[] } = {}
  ) {
    this.title = title;
    this.description = description;
    this.releaseDate = releaseDate;
    this.genre = genre;
    this.director = director;
    this.ratings = ratings;
    this.idFilm = idFilm;
    this.image = image;
    this.date = date;
    this.backdrop_path = backdrop_path;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
    this.comments = comments;
  }

  async save(client: MongoClient) {
    const db = client.db("streamix");
    const result = await db.collection("movies").insertOne(this);
    this._id = result.insertedId;
  }

  static async findAll(client: MongoClient): Promise<IMovie[]> {
    const db = client.db("streamix");
    const documents = await db.collection("movies").find({}).toArray();
    return documents.map((doc) => doc as IMovie);
  }

  static async findById(
    client: MongoClient,
    id: string
  ): Promise<IMovie | null> {
    const db = client.db("streamix");
    const doc = await db
      .collection("movies")
      .findOne({ _id: new ObjectId(id) });
    return doc ? (doc as IMovie) : null;
  }

  static async updateById(
    client: MongoClient,
    id: string,
    updateData: Partial<IMovie>
  ): Promise<void> {
    const db = client.db("streamix");
    await db
      .collection("movies")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  }

  static async deleteById(client: MongoClient, id: string): Promise<void> {
    const db = client.db("streamix");
    await db.collection("movies").deleteOne({ _id: new ObjectId(id) });
  }

  // async calculateAverageRating(client: MongoClient) {
  //   if (this.vote_count > 0) {
  //     const sum = this.vote_count;
  //     this.vote_average = sum / this.vote_count;
  //   } else {
  //     // this.vote_average = 0; // Restituer 0 si aucun vote
  //   }
  // };
  static async addVote(client: MongoClient, movieId: string, newVote: number): Promise<void> {
    if (newVote < 1 || newVote > 5) { // Validation simple pour les notes
      throw new Error("La note doit être comprise entre 1 et 5.");
    }

    const db = client.db('streamix');
    
    // Trouvez le film par ID
    const movieDoc = await db.collection('movies').findOne({ _id: new ObjectId(movieId) }) as IMovie | null;

    if (!movieDoc) {
      throw new Error(`Film avec id ${movieId} non trouvé`);
    }

    // Mettre à jour le vote_count et vote_average
    //console.log('Nombre avant incrémentation : ', movieDoc.vote_count);
    movieDoc.vote_count = Number(movieDoc.vote_count);
    (movieDoc.vote_count) += 1; // Incrémente le compteur de votes
    //console.log('Nombre après incrémentation : ', movieDoc.vote_count);
    movieDoc.vote_average = ((Number(movieDoc.vote_average) * (movieDoc.vote_count - 1)) + newVote) / movieDoc.vote_count;

    // Mettre à jour le document en base de données
    await db.collection('movies').updateOne(
      { _id: new ObjectId(movieId) },
      {
        $set: { vote_average: movieDoc.vote_average, vote_count: movieDoc.vote_count }
      }
    );
  }

  static async addComment(client: MongoClient, movieId: string, commentText: string, userId: string) {
    if (!commentText || !userId) {
      throw new Error("commentText and userId must be provided.");
    }
  
    const db = client.db('streamix');
    
    // Cherchez le film par ID et assurez-vous qu'il a le bon type
    const movieDoc = await db.collection('movies').findOne({ _id: new ObjectId(movieId) }) as IMovie | null;
    
    if (movieDoc) {
      const updateData: Partial<IMovie> = { comments: { ...movieDoc.comments } }; // Créer une copie de l'objet comments
      
      // Ajouter le commentaire à l'utilisateur approprié
      if (!updateData.comments) {
        updateData.comments = {};
      }
      
      if (!updateData.comments[userId]) {
        updateData.comments[userId] = [];
      }
      
      updateData.comments[userId].push(commentText); // Ajouter le nouveau commentaire
  
      // Mettre à jour dans la base de données
      await db.collection('movies').updateOne({ _id: new ObjectId(movieId) }, {
        $set: { comments: updateData.comments },
      });
    } else {
      throw new Error(`Movie with id ${movieId} not found`);
    }
  }
}
