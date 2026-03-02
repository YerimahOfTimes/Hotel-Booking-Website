import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI) // ensure URI includes DB name
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  mongoose.connection.on("connected", () =>
    console.log("Database Connected Successfully")
  );
  mongoose.connection.on("error", (err) => console.log("DB connection error:", err));
  return cached.conn;
}

export default connectDB;