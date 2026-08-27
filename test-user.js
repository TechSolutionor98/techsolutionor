
const { MongoClient } = require('mongodb');

async function test() {
  const uri = process.env.MONGODB_URI;
  const dbName = 'voltariaadmin';
  console.log("URI:", uri ? "Set" : "Not Set");
  console.log("DB:", dbName);
  
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  
  const user = await db.collection("cms_users").findOne({ email: "mw951390@gmail.com" });
  console.log("User found:", user ? "Yes" : "No");
  
  if (user) {
    const crypto = require('crypto');
    function hashPassword(password) {
      return crypto.createHash("sha256").update(password + "cms_salt_2024").digest("hex");
    }
    const calculatedHash = hashPassword("mw951390");
    console.log("Password matches:", user.passwordHash === calculatedHash);
    console.log("Calculated hash:", calculatedHash);
    console.log("User hash:", user.passwordHash);
    console.log("Status:", user.status);
  }
  
  await client.close();
}
test().catch(console.error);
