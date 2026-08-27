const { MongoClient } = require('mongodb');

async function main() {
  const client = new MongoClient('mongodb+srv://admin:admin@cluster0.ac1fznk.mongodb.net');
  try {
    await client.connect();
    const db = client.db('voltariadb');
    
    const targetContent = await db.collection('cms_page_content').findOne({ path: { $regex: 'fans' } });
    if (targetContent && targetContent.sections) {
      const headerSec = targetContent.sections.find(s => s.sectionId === 'category_header');
      console.log('Category Header Section in DB:', JSON.stringify(headerSec, null, 2));
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();
