// Order Model
// MongoDB schema for user orders

import { getDb } from "@/lib/db.js";

const COLLECTION_NAME = "orders";

export async function createOrder(userId, items, totalAmount) {
  const db = await getDb();
  const result = await db.collection(COLLECTION_NAME).insertOne({
    userId,
    items,
    totalAmount,
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return result.insertedId;
}

export async function getUserOrders(userId) {
  const db = await getDb();
  return db
    .collection(COLLECTION_NAME)
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function getOrderById(orderId) {
  const db = await getDb();
  return db.collection(COLLECTION_NAME).findOne({ _id: orderId });
}

export async function updateOrderStatus(orderId, status) {
  const db = await getDb();
  const result = await db.collection(COLLECTION_NAME).updateOne(
    { _id: orderId },
    {
      $set: {
        status,
        updatedAt: new Date(),
      },
    }
  );
  return result.modifiedCount > 0;
}

export async function cancelOrder(orderId) {
  return updateOrderStatus(orderId, "cancelled");
}

export async function getUserOrderCount(userId) {
  const db = await getDb();
  return db.collection(COLLECTION_NAME).countDocuments({ userId });
}

export async function getAllOrders() {
  const db = await getDb();
  return db
    .collection(COLLECTION_NAME)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
}
