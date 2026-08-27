import { getDb } from './mongodb';

export async function getCmsSeo(path) {
  try {
    const db = await getDb();
    const seo = await db.collection('cms_seo').findOne({ path });
    return seo || null;
  } catch (err) {
    console.error(`getCmsSeo error for ${path}:`, err);
    return null;
  }
}

export async function getCmsContent(path) {
  try {
    const db = await getDb();
    const content = await db.collection('cms_page_content').findOne({
      path,
      status: 'published',
    });

    if (!content) return null;

    const sections = {};
    for (const section of content.sections || []) {
      const key = section.sectionId || section.sectionName?.toLowerCase().replace(/\s+/g, '_') || `section_${section.order}`;
      const fields = {};
      for (const [fieldKey, field] of Object.entries(section.fields || {})) {
        fields[fieldKey] = field.value !== undefined ? field.value : field;
      }
      sections[key] = {
        name: section.sectionName,
        fields,
        raw: section.fields,
      };
    }

    return {
      sections,
      status: content.status,
      version: content.version,
      updatedAt: content.updatedAt,
    };
  } catch (err) {
    console.error(`getCmsContent error for ${path}:`, err);
    return null;
  }
}

export async function getCmsData(path) {
  const [content, seo] = await Promise.all([
    getCmsContent(path),
    getCmsSeo(path),
  ]);

  return { content, seo };
}

export async function generateCmsMetadata(path, defaults = {}) {
  const seo = await getCmsSeo(path);

  if (!seo) return defaults;

  const metadata = {
    title: seo.metaTitle || defaults.title,
    description: seo.metaDescription || defaults.description,
  };

  if (seo.metaKeywords?.length) {
    metadata.keywords = seo.metaKeywords;
  }

  if (seo.canonicalUrl) {
    metadata.alternates = { canonical: seo.canonicalUrl };
  }

  if (seo.openGraph) {
    metadata.openGraph = {
      title: seo.openGraph.title || seo.metaTitle || defaults.title,
      description: seo.openGraph.description || seo.metaDescription || defaults.description,
      type: seo.openGraph.type || 'website',
    };
    if (seo.openGraph.image && seo.openGraph.image.trim()) {
      metadata.openGraph.images = [{ url: seo.openGraph.image }];
    }
  }

  return metadata;
}
