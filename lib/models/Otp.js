// OTP Model
// MongoDB schema for OTP storage

import { getDb } from "../db.js";

const COLLECTION_NAME = "otps";

export async function createOtp(otpData) {
  const db = await getDb();
  const result = await db.collection(COLLECTION_NAME).insertOne({
    ...otpData,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes expiry
  });
  return result.insertedId;
}

export async function findOtpByPhone(phone) {
  const db = await getDb();
  return db.collection(COLLECTION_NAME).findOne({ phone });
}

export async function verifyOtp(phone, otp) {
  const db = await getDb();

  // Find OTP for this phone
  const otpDoc = await db.collection(COLLECTION_NAME).findOne({ phone });

  if (!otpDoc) {
    return null;
  }

  // Check if OTP matches
  if (otpDoc.otp !== otp) {
    return null;
  }

  // Check if OTP is expired
  if (new Date() > otpDoc.expiresAt) {
    // Delete expired OTP
    await db.collection(COLLECTION_NAME).deleteOne({ _id: otpDoc._id });
    return null;
  }

  // Delete used OTP
  await db.collection(COLLECTION_NAME).deleteOne({ _id: otpDoc._id });

  return otpDoc;
}

export async function deleteOtp(phone) {
  const db = await getDb();
  const result = await db.collection(COLLECTION_NAME).deleteOne({ phone });
  return result.deletedCount > 0;
}

export async function cleanupExpiredOtps() {
  const db = await getDb();
  const result = await db.collection(COLLECTION_NAME).deleteMany({
    expiresAt: { $lt: new Date() },
  });
  return result.deletedCount;
}
