import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { logActivity } from '@/lib/activity-logger';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_ADMIN_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function jsonResponse(data, status = 200) {
  return NextResponse.json(data, { status, headers: CORS_HEADERS });
}

function getUserFromRequest(request) {
  const token = request.cookies.get("jwt")?.value;
  if (!token) return null;
  if (token === "demo-jwt-token") {
    return { role: "super_admin" };
  }
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    return decoded;
  } catch (e) {
    return null;
  }
}

/**
 * Calculate SEO completeness score (0-100)
 */
function calculateSeoScore(seo) {
  if (!seo) return 0;
  let score = 0;
  const checks = [
    { field: 'metaTitle', weight: 15 },
    { field: 'metaDescription', weight: 15 },
    { field: 'metaKeywords', weight: 5, isArray: true },
    { field: 'canonicalUrl', weight: 10 },
    { field: 'openGraph.title', weight: 10 },
    { field: 'openGraph.description', weight: 10 },
    { field: 'openGraph.image', weight: 5 },
    { field: 'twitterCard.title', weight: 5 },
    { field: 'twitterCard.description', weight: 5 },
    { field: 'schema.type', weight: 10 },
    { field: 'robots', weight: 5 },
    { field: 'sitemap.include', weight: 5 },
  ];

  for (const check of checks) {
    const parts = check.field.split('.');
    let value = seo;
    for (const part of parts) {
      value = value?.[part];
    }

    if (check.isArray) {
      if (Array.isArray(value) && value.length > 0) score += check.weight;
    } else if (value !== undefined && value !== null && value !== '') {
      score += check.weight;
    }
  }

  return Math.min(100, score);
}

// GET /api/cms/seo → Get SEO data for a page (by routeId or path)
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const routeId = url.searchParams.get('routeId');
    const path = url.searchParams.get('path');
    const websiteId = url.searchParams.get('websiteId') || 'default';
    const listAll = url.searchParams.get('all') === 'true';

    const db = await getDb();
    const collection = db.collection('cms_seo');

    if (listAll) {
      const seoEntries = await collection
        .find({ websiteId })
        .sort({ path: 1 })
        .toArray();

      const routes = await db.collection('cms_routes')
        .find({ websiteId, status: 'active' })
        .sort({ path: 1 })
        .toArray();

      const merged = routes
        .filter(route => route.path !== '/products/[category]' && route.path !== '/blogs' && !route.path.startsWith('/blogs/') && route.path !== '/technologies/react')
        .map(route => {
          const seo = seoEntries.find(s => s.routeId?.toString() === route._id.toString() || s.path === route.path);
          return {
            _id: route._id.toString(),
            path: route.path,
            type: route.type,
            status: route.status,
            hasSeo: !!seo,
            seoScore: calculateSeoScore(seo),
            metaTitle: seo?.metaTitle || '',
            metaDescription: seo?.metaDescription || '',
            seoId: seo?._id?.toString() || null,
            updatedAt: seo?.updatedAt || null,
          };
        });

      return jsonResponse({ total: merged.length, pages: merged });
    }

    const safeObjId = (id) => {
      if (!id || typeof id !== 'string') return null;
      if (/^[0-9a-fA-F]{24}$/.test(id)) {
        try { return new ObjectId(id); } catch (e) { return null; }
      }
      return null;
    };

    let filter = { websiteId };
    const routeObjId = safeObjId(routeId);
    if (routeObjId) {
      filter.$or = [{ routeId: routeId }, { routeId: routeObjId }, { path: routeId }];
    } else if (routeId) {
      filter.$or = [{ routeId: routeId }, { path: routeId }];
    } else if (path) {
      filter.path = path;
    } else {
      return jsonResponse({ error: 'routeId or path is required' }, 400);
    }

    const seo = await collection.findOne(filter);

    if (!seo) {
      return jsonResponse({
        seo: {
          metaTitle: '',
          metaDescription: '',
          metaKeywords: [],
          canonicalUrl: '',
          robots: { index: true, follow: true, noArchive: false, noSnippet: false },
          openGraph: { title: '', description: '', image: '', type: 'website', locale: 'en_US' },
          twitterCard: { cardType: 'summary_large_image', title: '', description: '', image: '' },
          schema: { type: 'WebPage', customSchema: '' },
          sitemap: { include: true, priority: 0.5, changeFrequency: 'weekly' },
        },
        isNew: true,
      });
    }

    return jsonResponse({
      seo: { ...seo, _id: seo._id.toString() },
      seoScore: calculateSeoScore(seo),
      isNew: false,
    });
  } catch (err) {
    console.error('GET /api/cms/seo error:', err);
    return jsonResponse({ error: 'Failed to fetch SEO data' }, 500);
  }
}

// POST /api/cms/seo → Create or update SEO data for a page
export async function POST(request) {
  try {
    const user = getUserFromRequest(request);
    if (!user || !['super_admin', 'admin', 'seo', 'client'].includes(user.role)) {
      return jsonResponse({ error: 'Access denied. You do not have permissions to manage SEO.' }, 403);
    }
    const body = await request.json();
    const {
      routeId, path, websiteId = 'default',
      metaTitle, metaDescription, metaKeywords,
      canonicalUrl, robots, openGraph, twitterCard,
      schema, sitemap
    } = body;

    if (!routeId && !path) {
      return jsonResponse({ error: 'routeId or path is required' }, 400);
    }

    const db = await getDb();
    const collection = db.collection('cms_seo');
    const now = new Date().toISOString();

    const seoData = {
      routeId: routeId || null,
      path: path || null,
      websiteId,
      metaTitle: metaTitle || '',
      metaDescription: metaDescription || '',
      metaKeywords: Array.isArray(metaKeywords) ? metaKeywords : (metaKeywords || '').split(',').map(k => k.trim()).filter(Boolean),
      canonicalUrl: canonicalUrl || '',
      robots: {
        index: robots?.index !== false,
        follow: robots?.follow !== false,
        noArchive: robots?.noArchive || false,
        noSnippet: robots?.noSnippet || false,
      },
      openGraph: {
        title: openGraph?.title || '',
        description: openGraph?.description || '',
        image: openGraph?.image || '',
        type: openGraph?.type || 'website',
        locale: openGraph?.locale || 'en_US',
      },
      twitterCard: {
        cardType: twitterCard?.cardType || 'summary_large_image',
        title: twitterCard?.title || '',
        description: twitterCard?.description || '',
        image: twitterCard?.image || '',
      },
      schema: {
        type: schema?.type || 'WebPage',
        customSchema: schema?.customSchema || '',
      },
      sitemap: {
        include: sitemap?.include !== false,
        priority: Number(sitemap?.priority) || 0.5,
        changeFrequency: sitemap?.changeFrequency || 'weekly',
      },
      updatedAt: now,
    };

    const filter = { websiteId };
    const routeObjId = safeObjId(routeId);
    if (routeObjId) {
      filter.$or = [{ routeId: routeId }, { routeId: routeObjId }, { path: routeId }];
    } else if (routeId) {
      filter.$or = [{ routeId: routeId }, { path: routeId }];
    } else filter.path = path;

    const result = await collection.replaceOne(
      filter,
      { ...seoData, createdAt: now },
      { upsert: true }
    );

    const score = calculateSeoScore(seoData);

    await logActivity(request, 'update_seo', path || `Route ID: ${routeId}`, { score });

    try {
      if (path) {
        revalidatePath(path);
      }
      revalidatePath('/', 'layout');
    } catch (revalErr) {
      console.error('Revalidation error:', revalErr);
    }

    return jsonResponse({
      ok: true,
      seoScore: score,
      upsertedId: result.upsertedId?.toString() || null,
    });
  } catch (err) {
    console.error('POST /api/cms/seo error:', err);
    return jsonResponse({ error: 'Failed to save SEO data' }, 500);
  }
}

// DELETE /api/cms/seo → Delete SEO data for a page
export async function DELETE(request) {
  try {
    const user = getUserFromRequest(request);
    if (!user || !['super_admin', 'admin', 'seo', 'client'].includes(user.role)) {
      return jsonResponse({ error: 'Access denied. You do not have permissions to manage SEO.' }, 403);
    }
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const pathParam = url.searchParams.get('path');
    const routeIdParam = url.searchParams.get('routeId');

    const target = id || pathParam || routeIdParam;
    if (!target) return jsonResponse({ error: 'id, routeId or path is required' }, 400);

    const db = await getDb();
    const collection = db.collection('cms_seo');

    let filter = {};
    if (ObjectId.isValid(target)) {
      filter = { $or: [{ _id: new ObjectId(target) }, { routeId: target }, { path: target }] };
    } else {
      filter = { $or: [{ path: target }, { routeId: target }] };
    }

    const existing = await collection.findOne(filter);
    const targetPath = existing?.path || (target.startsWith('/') ? target : null);

    await collection.deleteMany(filter);

    await logActivity(request, 'delete_seo', targetPath || target, { target });

    try {
      if (targetPath) {
        revalidatePath(targetPath);
      }
      revalidatePath('/', 'layout');
    } catch (revalErr) {
      console.error('Revalidation error:', revalErr);
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    console.error('DELETE /api/cms/seo error:', err);
    return jsonResponse({ error: 'Failed to delete SEO data' }, 500);
  }
}
