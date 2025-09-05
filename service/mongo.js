import mongoose from "mongoose";

let isConnected = false; // global flag

export async function dbConnect() {
  if (isConnected) {

    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;

    return conn.connection;
  } catch (err) {
    console.error(" MongoDB connection error:", err.message);
    throw err;
  }
}
