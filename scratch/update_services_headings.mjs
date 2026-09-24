import { getDb } from '../lib/mongodb.js';

async function updateDb() {
  const db = await getDb();
  const collection = db.collection('cms_page_content');

  // 1. Web Development
  const webDoc = await collection.findOne({ path: '/services/web-development' });
  if (webDoc && webDoc.sections) {
    const sec = webDoc.sections.find(s => s.sectionId === 'webdevbanner');
    if (sec && sec.fields) {
      if (sec.fields.attr_badge_1) {
        sec.fields.attr_badge_1.value = 'PREMIER WEB ENGINEERING • GLOBAL';
        sec.fields.attr_badge_1.originalValue = 'PREMIER WEB ENGINEERING • GLOBAL';
        sec.fields.attr_badge_1.label = 'Badge: "PREMIER WEB ENGINEERING • GLOBAL"';
      }
      if (sec.fields.attr_titleLine2_3) {
        sec.fields.attr_titleLine2_3.value = 'Company Built for Scale:';
        sec.fields.attr_titleLine2_3.originalValue = 'Company Built for Scale:';
        sec.fields.attr_titleLine2_3.label = 'Subheading: "Company Built for Scale:"';
      }
      if (sec.fields.attr_imageAlt_5) {
        sec.fields.attr_imageAlt_5.value = 'Web Development Company';
        sec.fields.attr_imageAlt_5.originalValue = 'Web Development Company';
      }
      await collection.updateOne(
        { _id: webDoc._id },
        { $set: { sections: webDoc.sections, updatedAt: new Date().toISOString() } }
      );
      console.log('Updated /services/web-development in DB');
    }
  }

  // 2. App Development
  const appDoc = await collection.findOne({ path: '/services/app-development' });
  if (appDoc && appDoc.sections) {
    const sec = appDoc.sections.find(s => s.sectionId === 'appdevbanner');
    if (sec && sec.fields) {
      if (sec.fields.attr_titleLine2_3) {
        sec.fields.attr_titleLine2_3.value = 'Company Built for Scale';
        sec.fields.attr_titleLine2_3.originalValue = 'Company Built for Scale';
        sec.fields.attr_titleLine2_3.label = 'Subheading: "Company Built for Scale"';
      }
      await collection.updateOne(
        { _id: appDoc._id },
        { $set: { sections: appDoc.sections, updatedAt: new Date().toISOString() } }
      );
      console.log('Updated /services/app-development in DB');
    }
  }

  // 3. Software Development
  const softDoc = await collection.findOne({ path: '/services/software-development' });
  if (softDoc && softDoc.sections) {
    const sec = softDoc.sections.find(s => s.sectionId === 'softwaredevbanner');
    if (sec && sec.fields) {
      if (sec.fields.attr_titleLine2_3) {
        sec.fields.attr_titleLine2_3.value = 'Engineered for Scale That';
        sec.fields.attr_titleLine2_3.originalValue = 'Engineered for Scale That';
        sec.fields.attr_titleLine2_3.label = 'Subheading: "Engineered for Scale That"';
      }
      await collection.updateOne(
        { _id: softDoc._id },
        { $set: { sections: softDoc.sections, updatedAt: new Date().toISOString() } }
      );
      console.log('Updated /services/software-development in DB');
    }
  }

  // 4. Graphic Design
  const graphDoc = await collection.findOne({ path: '/services/graphic-design' });
  if (graphDoc && graphDoc.sections) {
    const sec = graphDoc.sections.find(s => s.sectionId === 'graphicbanner');
    if (sec && sec.fields) {
      if (sec.fields.attr_titleLine2_3) {
        sec.fields.attr_titleLine2_3.value = '& Visual Identity That Transform';
        sec.fields.attr_titleLine2_3.originalValue = '& Visual Identity That Transform';
        sec.fields.attr_titleLine2_3.label = 'Subheading: "& Visual Identity That Transform"';
      }
      await collection.updateOne(
        { _id: graphDoc._id },
        { $set: { sections: graphDoc.sections, updatedAt: new Date().toISOString() } }
      );
      console.log('Updated /services/graphic-design in DB');
    }
  }
}

updateDb().then(() => {
  console.log('ALL DB UPDATES COMPLETED SUCCESSFULLY');
  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
