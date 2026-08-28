// End-to-end test for Contact Us and Get A Quote submissions
const { getDb } = require('../lib/mongodb');

async function testSubmissions() {
  const db = await getDb();
  console.log('Connected to DB');

  // Insert a test Get A Quote submission
  const quoteDoc = {
    name: 'Test Quote User',
    country: 'United Arab Emirates',
    phone: '+971501234567',
    email: 'quoteuser@example.com',
    serviceRequired: 'Web Development',
    budget: '$1,000 - $5,000',
    preferredDate: '2026-09-01',
    message: 'Need a custom Next.js web application for our enterprise.',
    source: 'Get A Quote Modal',
    createdAt: new Date().toISOString()
  };
  const res1 = await db.collection('contact_submissions').insertOne(quoteDoc);
  console.log('Inserted Quote submission ID:', res1.insertedId.toString());

  // Insert a test Contact Us submission
  const contactDoc = {
    name: 'Test Contact User',
    phone: '+971509876543',
    email: 'contactuser@example.com',
    serviceRequired: 'App Development',
    budget: '$5000+',
    preferredDate: '2026-09-15',
    message: 'Looking for mobile app development services.',
    source: 'Contact Us Form',
    createdAt: new Date().toISOString()
  };
  const res2 = await db.collection('contact_submissions').insertOne(contactDoc);
  console.log('Inserted Contact submission ID:', res2.insertedId.toString());

  // Fetch all submissions
  const all = await db.collection('contact_submissions').find({}).sort({ createdAt: -1 }).toArray();
  console.log('Total contact_submissions in DB:', all.length);
  console.log('Latest 2 records:');
  console.log(all.slice(0, 2).map(r => ({
    name: r.name,
    email: r.email,
    source: r.source,
    service: r.serviceRequired,
    budget: r.budget,
    date: r.preferredDate
  })));

  // Clean up test records
  await db.collection('contact_submissions').deleteOne({ _id: res1.insertedId });
  await db.collection('contact_submissions').deleteOne({ _id: res2.insertedId });
  console.log('Test records cleaned up successfully!');
}

testSubmissions().catch(console.error);
