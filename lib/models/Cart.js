// Cart Model
// MongoDB schema for user shopping cart

import { getDb } from "@/lib/db.js";

const COLLECTION_NAME = "carts";

export async function getCart(userId) {
  const db = await getDb();
  return db.collection(COLLECTION_NAME).findOne({ userId });
}

export async function createCart(userId) {
  const db = await getDb();
  const result = await db.collection(COLLECTION_NAME).insertOne({
    userId,
    items: [],
    updatedAt: new Date(),
  });
  return result.insertedId;
}

export async function addItemToCart(userId, item) {
  const db = await getDb();
  const cart = await getCart(userId);

  if (!cart) {
    // Create new cart if it doesn't exist
    await createCart(userId);
    const newCart = await getCart(userId);
    await db.collection(COLLECTION_NAME).updateOne(
      { _id: newCart },
      {
        $push: { items: item },
        $set: { updatedAt: new Date() },
      }
    );
    return;
  }

  // Check if item already exists in cart
  const existingItemIndex = cart.items.findIndex(
    (i) => i.productId === item.productId
  );

  if (existingItemIndex > -1) {
    // Update quantity if item exists
    await db.collection(COLLECTION_NAME).updateOne(
      { _id: cart._id, "items.productId": item.productId },
      {
        $set: {
          [`items.${existingItemIndex}.quantity`]:
            cart.items[existingItemIndex].quantity + item.quantity,
          updatedAt: new Date(),
        },
      }
    );
  } else {
    // Add new item
    await db.collection(COLLECTION_NAME).updateOne(
      { _id: cart._id },
      {
        $push: { items: item },
        $set: { updatedAt: new Date() },
      }
    );
  }
}

export async function updateItemQuantity(userId, productId, quantity) {
  const db = await getDb();
  const cart = await getCart(userId);

  if (!cart) return false;

  const existingItemIndex = cart.items.findIndex(
    (i) => i.productId === productId
  );

  if (existingItemIndex > -1) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      await db.collection(COLLECTION_NAME).updateOne(
        { _id: cart._id },
        {
          $pull: { items: { productId } },
          $set: { updatedAt: new Date() },
        }
      );
    } else {
      // Update quantity
      await db.collection(COLLECTION_NAME).updateOne(
        { _id: cart._id, "items.productId": productId },
        {
          $set: {
            [`items.${existingItemIndex}.quantity`]: quantity,
            updatedAt: new Date(),
          },
        }
      );
    }
    return true;
  }

  return false;
}

export async function removeItemFromCart(userId, productId) {
  const db = await getDb();
  const cart = await getCart(userId);

  if (!cart) return false;

  const result = await db.collection(COLLECTION_NAME).updateOne(
    { _id: cart._id },
    {
      $pull: { items: { productId } },
      $set: { updatedAt: new Date() },
    }
  );

  return result.modifiedCount > 0;
}

export async function clearCart(userId) {
  const db = await getDb();
  const cart = await getCart(userId);

  if (!cart) return false;

  const result = await db.collection(COLLECTION_NAME).updateOne(
    { _id: cart._id },
    {
      $set: { items: [], updatedAt: new Date() },
    }
  );

  return result.modifiedCount > 0;
}

export async function getCartItemCount(userId) {
  const db = await getDb();
  const cart = await getCart(userId);

  if (!cart || !cart.items || cart.items.length === 0) {
    return 0;
  }

  return cart.items.reduce((total, item) => total + item.quantity, 0);
}

export async function getCartTotal(userId) {
  const db = await getDb();
  const cart = await getCart(userId);

  if (!cart || !cart.items || cart.items.length === 0) {
    return 0;
  }

  return cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}
