import { parsePageContent } from '../lib/cms-parser.js';
import { MongoClient } from 'mongodb';
import path from 'path';

async function syncGypsumDb() {
  const uri = 'mongodb+srv://admin:admin@osumfix.nmt1vqm.mongodb.net/?appName=Osumfix';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('osumfix');
    
    const serviceSlug = 'ceiling-gypsum';
    const route = await db.collection('cms_routes').findOne({ path: `/services/${serviceSlug}` });
    console.log('Route in DB:', route ? { id: route._id, path: route.path } : 'Not found');
    
    const absoluteFilePath = path.join(process.cwd(), route?.filePath || 'app/services/[slug]/page.tsx');
    const parsedSections = parsePageContent(absoluteFilePath, serviceSlug);
    console.log('Parsed sections count:', parsedSections.length);
    
    parsedSections.forEach((s, idx) => {
      const imageFields = Object.entries(s.fields || {}).filter(([_, f]) => f.type === 'image');
      console.log(`[${idx + 1}] ${s.sectionName} (${s.sectionId}) -> ${imageFields.length} images`);
      imageFields.forEach(([k, f]) => {
        console.log(`    - Key: ${k}, Label: "${f.label}", Value: "${f.value}", Original: "${f.originalValue}"`);
      });
    });

    const existingContent = await db.collection('cms_page_content').findOne({ path: `/services/${serviceSlug}` });
    
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
      path: `/services/${serviceSlug}`,
      routeId: route?._id?.toString() || '',
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
      console.log('Successfully updated cms_page_content in DB for /services/ceiling-gypsum');
    } else {
      updateDoc.createdAt = now;
      updateDoc.version = 1;
      await db.collection('cms_page_content').insertOne(updateDoc);
      console.log('Successfully inserted cms_page_content in DB for /services/ceiling-gypsum');
    }
  } catch (err) {
    console.error('Sync error:', err);
  } finally {
    await client.close();
  }
}

syncGypsumDb();
