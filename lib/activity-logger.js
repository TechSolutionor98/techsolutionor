import { getDb } from './mongodb';
import { ObjectId } from 'mongodb';

export async function logActivity(request, action, target = '', details = {}, customUser = null) {
  try {
    let userId = null;
    let userName = 'System';
    
    if (customUser) {
      userId = customUser.userId || null;
      userName = customUser.userName || 'System';
    } else if (request) {
      const token = request.cookies.get("jwt")?.value;
      if (token) {
        if (token === "demo-jwt-token") {
          userId = 'super_admin';
          userName = 'Super Admin';
        } else {
          try {
            const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
            if (decoded) {
              userId = decoded.userId || null;
              if (decoded.name) {
                userName = decoded.name;
              } else if (userId && ObjectId.isValid(userId)) {
                // Fallback database query if name is not embedded in the token
                const db = await getDb();
                const user = await db.collection('cms_users').findOne({ _id: new ObjectId(userId) });
                if (user) {
                  userName = user.name || user.email || 'User';
                }
              }
            }
          } catch (e) {
            console.error("Error decoding token for logging:", e);
          }
        }
      }
    }

    const db = await getDb();
    const doc = {
      websiteId: 'default',
      userId,
      userName,
      action,
      target,
      details: details || {},
      createdAt: new Date().toISOString(),
    };

    await db.collection('cms_activity_logs').insertOne(doc);
    return true;
  } catch (err) {
    console.error("Failed to log activity:", err);
    return false;
  }
}
