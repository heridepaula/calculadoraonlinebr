import { MongoClient, type Db } from "mongodb";

// Reaproveita a conexão entre invocações "warm" em ambiente serverless.
const globalForMongo = globalThis as unknown as { _mongoClient?: Promise<MongoClient> };

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI não configurada");
  globalForMongo._mongoClient ??= new MongoClient(uri, {
    maxPoolSize: 5,
    serverSelectionTimeoutMS: 8000,
  }).connect();
  try {
    const client = await globalForMongo._mongoClient;
    return client.db(process.env.MONGODB_DB ?? "calculadoraonlinebr");
  } catch (err) {
    globalForMongo._mongoClient = undefined; // permite nova tentativa
    throw err;
  }
}
