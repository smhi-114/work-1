// MongoDB Connection Utility
// Singleton pattern for database connection

import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL || "mongodb://localhost:27017";
const options = {
  maxPoolSize: 10,
  minPoolSize: 5,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable to preserve connection
  let globalWithMongo = global;
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production, create a new connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getClient() {
  if (!client) {
    client = new MongoClient(uri, options);
  }
  return client;
}

export async function getDb() {
  const client = await getClient();
  return client.db();
}

export default clientPromise;
