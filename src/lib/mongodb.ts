import { MongoClient } from "mongodb";
import "dotenv/config";
import * as dns from "node:dns";

if (process.env.NODE_ENV !== "production") {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
  dns.promises.setServers(["8.8.8.8", "8.8.4.4"]);
}

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};

function getMongoClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI.");
  if (!globalForMongo.mongoClient) {
    globalForMongo.mongoClient = new MongoClient(uri);
  }
  return globalForMongo.mongoClient;
}

export async function getDatabase() {
  const dbName = process.env.MONGODB_DB;
  if (!dbName) throw new Error("Missing MONGODB_DB.");
  const mongoClient = getMongoClient();
  await mongoClient.connect();
  return mongoClient.db(dbName);
}
