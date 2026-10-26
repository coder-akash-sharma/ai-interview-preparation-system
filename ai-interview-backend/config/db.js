const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let memoryServer;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/ai_interview";

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully ✅");
    return mongoose.connection;
  } catch (error) {
    console.warn("MongoDB local connection failed, trying in-memory database... ⚠️");
    console.warn(error.message);

    try {
      memoryServer = await MongoMemoryServer.create({
        binary: {
          version: "7.0.14",
        },
      });

      const mongoUri = memoryServer.getUri("ai_interview");

      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 20000,
        connectTimeoutMS: 20000,
      });

      console.log("MongoDB in-memory started successfully ✅");
      return mongoose.connection;
    } catch (memoryError) {
      console.error("MongoDB connection failed ❌");
      console.error(memoryError.message);
      process.exit(1);
    }
  }
};

module.exports = connectDB;