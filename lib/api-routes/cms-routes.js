import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_ADMIN_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function jsonResponse(data, status = 200) {
  return NextResponse.json(data, { status, headers: CORS_HEADERS });
}

/**
 * Build a tree structure from flat routes array
 */
function buildRouteTree(routes) {
  const routeMap = {};
  const tree = [];

  for (const route of routes) {
    routeMap[route.path] = { ...route, _id: route._id.toString(), children: [] };
  }

  for (const route of routes) {
    const node = routeMap[route.path];
    if (route.parentPath && route.parentPath !== '/' && routeMap[route.parentPath]) {
      routeMap[route.parentPath].children.push(node);
    } else {
      tree.push(node);
    }
  }

  return tree;
}

// GET /api/cms/routes → List all routes
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const websiteId = url.searchParams.get('websiteId') || 'default';
    const status = url.searchParams.get('status');
    const treeView = url.searchParams.get('tree') === 'true';
    const search = url.searchParams.get('search') || '';

    const db = await getDb();
    const collection = db.collection('cms_routes');

    const filter = { websiteId };
    if (status) filter.status = status;
    if (search) {
      filter.path = { $regex: search, $options: 'i' };
    }

    let routes = await collection
      .find(filter)
      .sort({ path: 1 })
      .toArray();

    if (routes.length === 0 && !search && !status) {
      try {
        const { scanRoutes } = await import('@/lib/cms-service');
        await scanRoutes();
        routes = await collection.find(filter).sort({ path: 1 }).toArray();
      } catch (scanErr) {
        console.error('Auto scan on routes fetch error:', scanErr);
      }
    }

    const seenPaths = new Set();
    const filteredRoutes = [];
    for (const r of routes) {
      const p = r.path;
      if (
        p === '/[slug]' ||
        p === '/blog/[slug]' ||
        p === '/technologies/[slug]' ||
        p === '/technologies/reactjs' ||
        r.type === 'blog' ||
        (p.startsWith('/blog/') && p !== '/blog') ||
        r.status === 'archived'
      ) {
        continue;
      }
      if (!seenPaths.has(r.path)) {
        seenPaths.add(r.path);
        const segments = (r.path || '').split('/').filter(Boolean);
        const depth = r.depth !== undefined ? r.depth : segments.length;
        const parentPath = r.parentPath !== undefined ? r.parentPath : (segments.length > 1 ? '/' + segments.slice(0, -1).join('/') : (segments.length === 1 ? '/' : null));
        filteredRoutes.push({
          ...r,
          _id: r._id.toString(),
          parentPath,
          depth,
        });
      }
    }

    if (treeView) {
      const tree = buildRouteTree(filteredRoutes);
      return jsonResponse({ total: filteredRoutes.length, routes: tree });
    }

    return jsonResponse({ total: filteredRoutes.length, routes: filteredRoutes });
  } catch (err) {
    console.error('GET /api/cms/routes error:', err);
    return jsonResponse({ error: 'Failed to fetch routes' }, 500);
  }
}

// PATCH /api/cms/routes → Update route status or metadata
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, status, customName } = body;

    if (!id) return jsonResponse({ error: 'id is required' }, 400);

    const db = await getDb();
    const collection = db.collection('cms_routes');

    const updateFields = { updatedAt: new Date().toISOString() };
    if (status) updateFields.status = status;
    if (customName !== undefined) updateFields.customName = customName;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return jsonResponse({ error: 'Route not found' }, 404);
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    console.error('PATCH /api/cms/routes error:', err);
    return jsonResponse({ error: 'Failed to update route' }, 500);
  }
}

// DELETE /api/cms/routes → Archive a route (soft delete)
export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) return jsonResponse({ error: 'id is required' }, 400);

    const db = await getDb();
    const collection = db.collection('cms_routes');

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: 'archived', updatedAt: new Date().toISOString() } }
    );

    if (result.matchedCount === 0) {
      return jsonResponse({ error: 'Route not found' }, 404);
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    console.error('DELETE /api/cms/routes error:', err);
    return jsonResponse({ error: 'Failed to archive route' }, 500);
  }
}
