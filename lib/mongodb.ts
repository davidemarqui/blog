import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable")
}

type Cache = { client?: MongoClient };

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientCache: Cache | undefined
}

const cache: Cache = global._mongoClientCache || (global._mongoClientCache = {})

export async function getClient(): Promise<MongoClient> {
  if (!cache.client) {
    cache.client = new MongoClient(uri!)
    await cache.client.connect()
  }
  return cache.client
}

export async function getCollection<T = any>(dbName: string, collectionName: string) {
  const client = await getClient()
  return client.db(dbName).collection(collectionName)
}
