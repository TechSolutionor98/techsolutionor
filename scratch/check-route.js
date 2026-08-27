const { MongoClient } = require('mongodb');

async function testMerge() {
  const uri = 'mongodb+srv://admin:admin@osumfix.nmt1vqm.mongodb.net/?appName=Osumfix';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('osumfix');
    
    // Check if cms_routes has /services/interior-designing
    let route = await db.collection('cms_routes').findOne({ path: '/services/interior-designing' });
    console.log('Route in DB:', route ? { id: route._id, path: route.path, filePath: route.filePath } : 'Not found');
    
    if (!route) {
      console.log('Creating route in DB...');
      const insertResult = await db.collection('cms_routes').insertOne({
        path: '/services/interior-designing',
        type: 'static',
        dynamicSegment: null,
        parentPath: '/services',
        depth: 2,
        fileName: 'page.tsx',
        filePath: 'app/services/[slug]/page.tsx',
        hasLayout: false,
        status: 'active',
        customName: 'Interior Designing',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        websiteId: 'default'
      });
      route = { _id: insertResult.insertedId, path: '/services/interior-designing', filePath: 'app/services/[slug]/page.tsx' };
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

testMerge();
