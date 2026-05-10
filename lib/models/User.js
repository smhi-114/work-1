// User Model
// MongoDB schema for user data

import { getDb } from "@/lib/db.js";

const COLLECTION_NAME = "users";

export async function createUser(userData) {
  const db = await getDb();
  const result = await db.collection(COLLECTION_NAME).insertOne({
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return result.insertedId;
}

export async function findUserByPhone(phone) {
  const db = await getDb();
  return db.collection(COLLECTION_NAME).findOne({ phone });
}

export async function findUserByEmail(email) {
  const db = await getDb();
  return db.collection(COLLECTION_NAME).findOne({ email });
}

export async function findUserById(userId) {
  const db = await getDb();
  return db.collection(COLLECTION_NAME).findOne({ _id: userId });
}

export async function updateUser(userId, updateData) {
  const db = await getDb();
  const result = await db.collection(COLLECTION_NAME).updateOne(
    { _id: userId },
    {
      $set: {
        ...updateData,
        updatedAt: new Date(),
      },
    }
  );
  return result.modifiedCount > 0;
}

export async function deleteUser(userId) {
  const db = await getDb();
  const result = await db
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: userId });
  return result.deletedCount > 0;
}

export async function getAllUsers() {
  const db = await getDb();
  return db.collection(COLLECTION_NAME).find({}).toArray();
}
