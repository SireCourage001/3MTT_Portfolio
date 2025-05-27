require('dotenv').config();
// This file handles the connection to MongoDB and exports the connection functions
// so that they can be used in other parts of the application.
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db(); // defaults to the DB name in URI
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

function getDb() {
  return db;
}

module.exports = {
  connectToDatabase,
  getDb,
};
