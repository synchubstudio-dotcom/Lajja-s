import { MongoClient, MongoClientOptions } from "mongodb";
import "dotenv/config";
import * as dns from "node:dns";

// Optimize DNS lookup on local dev if needed without blocking
if (process.env.NODE_ENV !== "production") {
  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    dns.promises.setServers(["8.8.8.8", "8.8.4.4"]);
  } catch {
    // Ignore fallback errors
  }
}

const mongoOptions: MongoClientOptions = {
  maxPoolSize: 10,
  minPoolSize: 1,
  maxIdleTimeMS: 60000,
  serverSelectionTimeoutMS: 5000, // 5s timeout prevents 30s hangs
  connectTimeoutMS: 5000,
  socketTimeoutMS: 20000,
};

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
  mongoClientPromise?: Promise<MongoClient>;
};

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI.");

  if (!globalForMongo.mongoClientPromise) {
    if (!globalForMongo.mongoClient) {
      globalForMongo.mongoClient = new MongoClient(uri, mongoOptions);
    }
    globalForMongo.mongoClientPromise = globalForMongo.mongoClient.connect();
  }
  return globalForMongo.mongoClientPromise;
}

export async function getDatabase() {
  const dbName = process.env.MONGODB_DB;
  if (!dbName) throw new Error("Missing MONGODB_DB.");
  const client = await getClientPromise();
  return client.db(dbName);
}
