import { MongoClient } from "mongodb";
import "dotenv/config";
import * as dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.promises.setServers(["8.8.8.8", "8.8.4.4"]);

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Missing MONGODB_URI.");

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};

export const mongoClient =
  globalForMongo.mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = mongoClient;
}

export async function getDatabase() {
  const dbName = process.env.MONGODB_DB;
  if (!dbName) throw new Error("Missing MONGODB_DB.");
  await mongoClient.connect();
  return mongoClient.db(dbName);
}
