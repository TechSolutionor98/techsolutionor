import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import fs from 'fs';
import path from 'path';

const readdirSync = fs.readdirSync;
const existsSync = fs.existsSync;
import { logActivity } from '@/lib/activity-logger';
import { scanRoutes } from '@/lib/cms-service';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_ADMIN_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

/**
 * Recursively scan the root app/ directory for page.js/page.tsx/page.jsx files
 * and convert them to route paths.
 */
function scanAppDirectory(dir, basePath = '') {
  const routes = [];
  
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      
      const folderName = entry.name;
      
      // Skip special directories
      if (
        folderName.startsWith('_') ||   // _components, _lib, etc.
        folderName.startsWith('.') ||    // .git, etc.
        folderName === 'api' ||          // API routes
        folderName === 'admin' ||        // Admin panel itself
        folderName.toLowerCase() === 'home' || // Internal Home component folder (represented by root '/')
        folderName === 'node_modules'
      ) {
        continue;
      }
      
      const fullPath = path.join(dir, folderName);
      const routePath = `${basePath}/${folderName}`;
      
      if (routePath === '/technologies/react') {
        continue;
      }

      // Check if this directory has a page.js or page.tsx or page.jsx
      const hasPage = existsSync(path.join(fullPath, 'page.js')) ||
                      existsSync(path.join(fullPath, 'page.tsx')) ||
                      existsSync(path.join(fullPath, 'page.jsx'));
      
      const hasLayout = existsSync(path.join(fullPath, 'layout.js')) ||
                        existsSync(path.join(fullPath, 'layout.tsx')) ||
                        existsSync(path.join(fullPath, 'layout.jsx'));
      
      // Determine page file name
      let pageFileName = null;
      if (existsSync(path.join(fullPath, 'page.js'))) pageFileName = 'page.js';
      else if (existsSync(path.join(fullPath, 'page.tsx'))) pageFileName = 'page.tsx';
      else if (existsSync(path.join(fullPath, 'page.jsx'))) pageFileName = 'page.jsx';
      
      if (hasPage) {
        let type = 'static';
        let dynamicSegment = null;
        
        if (folderName.startsWith('[') && folderName.endsWith(']')) {
          type = 'dynamic';
          dynamicSegment = folderName;
        }
        if (folderName.startsWith('[...')) {
          type = 'catch-all';
          dynamicSegment = folderName;
        }
        
        const segments = routePath.split('/').filter(Boolean);
        const depth = segments.length;
        const parentPath = segments.length > 1
          ? '/' + segments.slice(0, -1).join('/')
          : '/';
        
        const relativeDir = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');
        
        routes.push({
          path: routePath,
          type,
          dynamicSegment,
          parentPath,
          depth,
          fileName: pageFileName,
          filePath: `${relativeDir}/${pageFileName}`,
          hasLayout,
          status: 'active',
        });
      }
      
      // Recurse into subdirectories
      const subRoutes = scanAppDirectory(fullPath, routePath);
      routes.push(...subRoutes);
    }
  } catch (err) {
    console.error('Error scanning directory:', dir, err);
  }
  
  return routes;
}

/**
 * Check root app/ page.js (the "/" route)
 */
function scanRootPage(appDir) {
  const hasRootPage = existsSync(path.join(appDir, 'page.js')) ||
                      existsSync(path.join(appDir, 'page.tsx')) ||
                      existsSync(path.join(appDir, 'page.jsx'));
  
  if (hasRootPage) {
    let pageFileName = 'page.js';
    if (existsSync(path.join(appDir, 'page.tsx'))) pageFileName = 'page.tsx';
    if (existsSync(path.join(appDir, 'page.jsx'))) pageFileName = 'page.jsx';
    
    const relativeDir = path.relative(process.cwd(), appDir).replace(/\\/g, '/');
    
    return {
      path: '/',
      type: 'static',
      dynamicSegment: null,
      parentPath: null,
      depth: 0,
      fileName: pageFileName,
      filePath: `${relativeDir}/${pageFileName}`,
      hasLayout: true,
      status: 'active',
    };
  }
  return null;
}

// POST /api/cms/scan-routes → Full route, component, section, and editable content synchronization
export async function POST(request) {
  try {
    let websiteId = 'default';
    try {
      const body = await request.json();
      if (body.websiteId) websiteId = body.websiteId;
    } catch {
      // Default
    }

    const scanResult = await scanRoutes();
    const routes = scanResult.routes || scanResult;
    const summary = scanResult.summary || {
      total: routes.length,
      created: 0,
      updated: routes.length,
      archived: 0,
    };

    logActivity(request, 'scan_routes', websiteId, summary).catch(err =>
      console.error('Activity log error:', err)
    );

    return NextResponse.json({
      ok: true,
      summary,
      routes: routes.map(r => ({
        path: r.path,
        type: r.type,
        depth: r.depth,
        filePath: r.filePath,
      })),
    }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error('Error scanning routes:', err);
    return NextResponse.json(
      { error: 'Failed to scan routes: ' + err.message },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

// GET /api/cms/scan-routes → Just scan and return routes without saving
export async function GET() {
  try {
    const appDir = path.join(process.cwd(), 'app');
    
    if (!existsSync(appDir)) {
      return NextResponse.json(
        { error: 'app directory not found' },
        { status: 400, headers: CORS_HEADERS }
      );
    }
    
    let routes = scanAppDirectory(appDir).filter(r => r.path !== '/technologies/react');
    const rootPage = scanRootPage(appDir);
    if (rootPage && !routes.find(r => r.path === '/')) {
      routes.unshift(rootPage);
    }
    
    return NextResponse.json({
      total: routes.length,
      routes,
    }, { headers: CORS_HEADERS });
    
  } catch (err) {
    console.error('Error scanning routes:', err);
    return NextResponse.json(
      { error: 'Failed to scan routes' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
