import mongoose, { Mongoose } from "mongoose";
import { cache } from "react";

const mongoDBUri = process.env.MONGODB_URI;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;
  if (!mongoDBUri) throw new Error("Missing MONGODB_URI");

  cached.promise =
    cached.promise ||
    mongoose.connect(mongoDBUri, {
      dbName: "imaginify",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
