import { MongoClient } from 'mongodb';

let cachedClient = global._mongoClient || null;
let cachedDb = global._mongoDb || null;
let cachedPromise = global._mongoClientPromise || null;

export async function getDb() {
  if (cachedDb) return cachedDb;

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'techsolutionor';

  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined in .env or environment');
  }

  if (!cachedPromise) {
    const client = new MongoClient(uri, {
      connectTimeoutMS: 4000,
      serverSelectionTimeoutMS: 4000,
      socketTimeoutMS: 10000,
      maxPoolSize: 10,
      minPoolSize: 1,
    });

    cachedPromise = client.connect().then((connectedClient) => {
      cachedClient = connectedClient;
      global._mongoClient = connectedClient;
      return connectedClient;
    }).catch((err) => {
      cachedPromise = null;
      global._mongoClientPromise = null;
      throw err;
    });

    global._mongoClientPromise = cachedPromise;
  }

  const client = await cachedPromise;
  const db = client.db(dbName);
  cachedDb = db;
  global._mongoDb = db;

  // Initialize essential B-Tree compound indexes in the background (runs once per process)
  if (!global._mongoIndexesEnsured) {
    global._mongoIndexesEnsured = true;
    Promise.all([
      db.collection('contact_submissions').createIndex({ isRead: 1, createdAt: -1 }).catch(() => {}),
      db.collection('hire_submissions').createIndex({ isRead: 1, createdAt: -1 }).catch(() => {}),
      db.collection('applications').createIndex({ isRead: 1, createdAt: -1 }).catch(() => {}),
      db.collection('reviews').createIndex({ approved: 1, createdAt: -1 }).catch(() => {}),
      db.collection('reviews').createIndex({ isRead: 1, createdAt: -1 }).catch(() => {}),
      db.collection('cms_blogs').createIndex({ slug: 1, published: 1 }).catch(() => {}),
      db.collection('cms_seo').createIndex({ path: 1 }).catch(() => {}),
      db.collection('cms_page_content').createIndex({ path: 1 }).catch(() => {}),
      db.collection('cms_blog_comments').createIndex({ isRead: 1, createdAt: -1 }).catch(() => {}),
      db.collection('email_threads').createIndex({ unreadByAdmin: 1, lastMessageAt: -1 }).catch(() => {}),
    ]).catch(() => {});
  }

  return db;
}

export async function closeConnection() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
    cachedPromise = null;
    global._mongoClient = null;
    global._mongoDb = null;
    global._mongoClientPromise = null;
  }
}
