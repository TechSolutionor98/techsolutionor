import { parsePageContent } from '../lib/cms-parser.js';
import { MongoClient, ObjectId } from 'mongodb';
import path from 'path';

async function testAdminApi() {
  const uri = 'mongodb+srv://admin:admin@osumfix.nmt1vqm.mongodb.net/?appName=Osumfix';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('osumfix');
    
    const route = await db.collection('cms_routes').findOne({ path: '/services/interior-designing' });
    const content = await db.collection('cms_page_content').findOne({ path: '/services/interior-designing' });
    
    const serviceSlug = 'interior-designing';
    const absoluteFilePath = path.join(process.cwd(), route.filePath);
    let parsedSections = parsePageContent(absoluteFilePath, serviceSlug);
    
    console.log('Parsed sections count:', parsedSections.length);
    
    // Simulate merge logic from GET /api/cms/content
    const isMatchingSection = (parsed, dbSec) => {
      const parsedId = parsed.sectionId.toLowerCase();
      const dbId = (dbSec.sectionId || '').toLowerCase();
      const parsedName = parsed.sectionName.toLowerCase();
      const dbName = (dbSec.sectionName || '').toLowerCase();
      
      return parsedId === dbId || 
             dbId.startsWith(parsedId + '_') || 
             parsedName === dbName || 
             dbName.includes(parsedName) || 
             parsedName.includes(dbName);
    };

    const mergedSections = [];
    if (content && Array.isArray(content.sections)) {
      for (const parsedSec of parsedSections) {
        const existingSec = content.sections.find(s => isMatchingSection(parsedSec, s));

        if (!existingSec) {
          mergedSections.push(parsedSec);
        } else {
          const mergedSec = {
            ...parsedSec,
            sectionId: existingSec.sectionId || parsedSec.sectionId,
            sectionName: existingSec.sectionName || parsedSec.sectionName,
          };
          
          mergedSec.fields = { ...parsedSec.fields };
          for (const [key, parsedField] of Object.entries(parsedSec.fields || {})) {
            let dbField = null;
            if (existingSec.fields) {
              const matchedDbEntry = Object.entries(existingSec.fields).find(([_, f]) => f && f.originalValue === parsedField.originalValue);
              if (matchedDbEntry) {
                dbField = matchedDbEntry[1];
              } else {
                const keyDbField = existingSec.fields[key];
                if (keyDbField && (!keyDbField.originalValue || keyDbField.originalValue === parsedField.originalValue)) {
                  dbField = keyDbField;
                }
              }
            }

            if (!dbField) {
              mergedSec.fields[key] = { ...parsedField };
            } else {
              mergedSec.fields[key] = {
                ...parsedField,
                value: dbField.value,
              };
            }
          }
          mergedSections.push(mergedSec);
        }
      }
    }

    console.log('\n--- MERGED SECTIONS FOR ADMIN UI ---');
    for (const sec of mergedSections) {
      console.log(`\nSection: ${sec.sectionId} - "${sec.sectionName}"`);
      for (const [k, f] of Object.entries(sec.fields || {})) {
        if (f.type === 'image') {
          console.log(`   [IMAGE] Key: ${k}, Label: "${f.label}", Value: "${f.value}", Original: "${f.originalValue}"`);
        }
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

testAdminApi();
