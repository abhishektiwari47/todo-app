// mongoose.js
// mongoose.ts
import * as mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://Abhishek:Abhishek@todo.gvvy95u.mongodb.net/';

let isConnected: boolean = false;
let db: any;

const connectToDatabase = async () => {

  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    db = await mongoose.connect(MONGODB_URI, {
      dbName:'todo'
    });

    isConnected = true;
    console.log('Connected to MongoDB');
   
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

const getDbConnection = () => {
  if (!isConnected) {
    throw new Error('Database connection not established.');
  }
  return db;
};

export { connectToDatabase, getDbConnection,isConnected };
