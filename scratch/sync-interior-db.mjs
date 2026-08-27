import { parsePageContent } from '../lib/cms-parser.js';
import { MongoClient } from 'mongodb';
import path from 'path';

async function syncInteriorDb() {
  const uri = 'mongodb+srv://admin:admin@osumfix.nmt1vqm.mongodb.net/?appName=Osumfix';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('osumfix');
    
    const route = await db.collection('cms_routes').findOne({ path: '/services/interior-designing' });
    const serviceSlug = 'interior-designing';
    const absoluteFilePath = path.join(process.cwd(), route?.filePath || 'app/services/[slug]/page.tsx');
    const parsedSections = parsePageContent(absoluteFilePath, serviceSlug);
    
    const existingContent = await db.collection('cms_page_content').findOne({ path: '/services/interior-designing' });
    
    // Merge existing field values if any were customized
    const mergedSections = parsedSections.map((sec, idx) => {
      const existingSec = existingContent?.sections?.find(s => 
        s.sectionId === sec.sectionId || s.sectionName === sec.sectionName
      );
      
      const newFields = { ...sec.fields };
      if (existingSec?.fields) {
        for (const [k, f] of Object.entries(newFields)) {
          const matchedDbEntry = Object.values(existingSec.fields).find(ef => ef && ef.originalValue === f.originalValue);
          if (matchedDbEntry && matchedDbEntry.value && matchedDbEntry.value !== matchedDbEntry.originalValue) {
            newFields[k].value = matchedDbEntry.value;
          }
        }
      }
      
      return {
        ...sec,
        order: idx + 1,
        fields: newFields
      };
    });
    
    const now = new Date().toISOString();
    const updateDoc = {
      path: '/services/interior-designing',
      routeId: route?._id?.toString() || '6a4bb0f0da30e44830ab41eb',
      websiteId: 'default',
      sections: mergedSections,
      status: 'published',
      updatedAt: now,
    };
    
    if (existingContent) {
      await db.collection('cms_page_content').updateOne(
        { _id: existingContent._id },
        { $set: updateDoc }
      );
      console.log('Successfully updated cms_page_content in DB for /services/interior-designing');
    } else {
      updateDoc.createdAt = now;
      updateDoc.version = 1;
      await db.collection('cms_page_content').insertOne(updateDoc);
      console.log('Successfully inserted cms_page_content in DB for /services/interior-designing');
    }
    
    // Verify saved DB document
    const updated = await db.collection('cms_page_content').findOne({ path: '/services/interior-designing' });
    console.log('Verified sections in DB:');
    updated.sections.forEach(s => {
      const imageFields = Object.entries(s.fields || {}).filter(([_, f]) => f.type === 'image');
      console.log(`- ${s.sectionName} (${s.sectionId}) [images: ${imageFields.length}]`);
      imageFields.forEach(([k, f]) => console.log(`   * ${f.label} -> ${f.value}`));
    });
  } catch (err) {
    console.error('Sync error:', err);
  } finally {
    await client.close();
  }
}

syncInteriorDb();
