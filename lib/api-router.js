import { NextResponse } from 'next/server';

/**
 * Common CORS headers for cross-origin preflight responses
 */
const CORS_PREFLIGHT_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * Dynamically resolves and lazily imports only the specific API route module requested.
 * Prevents loading all 38 handlers and heavy serverless dependencies into memory on every request.
 */
async function resolveRouteModule(slug, path) {
  // 1. Applications
  if (path === 'applications') {
    const mod = await import('./api-routes/applications.js');
    return { mod };
  }
  if (slug[0] === 'applications' && slug.length === 2) {
    const mod = await import('./api-routes/applications-id.js');
    return { mod, params: { id: slug[1] } };
  }
  if (slug[0] === 'applications' && slug.length === 3 && slug[2] === 'cv') {
    const mod = await import('./api-routes/applications-cv.js');
    return { mod, params: { id: slug[1] } };
  }
  if (slug[0] === 'applications' && slug.length === 3 && slug[2] === 'status') {
    const mod = await import('./api-routes/applications-status.js');
    return { mod, params: { id: slug[1] } };
  }

  // 2. OTP
  if (path === 'send-otp') {
    const mod = await import('./api-routes/send-otp.js');
    return { mod };
  }
  if (path === 'verify-otp') {
    const mod = await import('./api-routes/verify-otp.js');
    return { mod };
  }

  // 3. Contact, Quotes & Hire Submissions
  if (path === 'hire-submissions' || path === 'hire-us') {
    const mod = await import('./api-routes/hire-submissions.js');
    return { mod };
  }
  if ((slug[0] === 'hire-submissions' || slug[0] === 'hire-us') && slug.length === 2) {
    const mod = await import('./api-routes/hire-submissions-id.js');
    return { mod, params: { id: slug[1] } };
  }
  if ((slug[0] === 'hire-submissions' || slug[0] === 'hire-us') && slug.length === 3 && slug[2] === 'status') {
    const mod = await import('./api-routes/hire-submissions-status.js');
    return { mod, params: { id: slug[1] } };
  }
  if (path === 'contact-submissions') {
    const mod = await import('./api-routes/contact-submissions.js');
    return { mod };
  }
  if (path === 'quote-submissions') {
    const mod = await import('./api-routes/quote-submissions.js');
    return { mod };
  }

  // 4. Auth
  if (path === 'auth/login') {
    const mod = await import('./api-routes/auth-login.js');
    return { mod };
  }
  if (path === 'auth/logout') {
    const mod = await import('./api-routes/auth-logout.js');
    return { mod };
  }

  // 5. Blogs
  if (path === 'blogs') {
    const mod = await import('./api-routes/blogs.js');
    return { mod };
  }
  if (path === 'blogs/comments') {
    const mod = await import('./api-routes/blogs-comments.js');
    return { mod };
  }

  // 6. CMS
  if (path === 'cms/activity') {
    const mod = await import('./api-routes/cms-activity.js');
    return { mod };
  }
  if (path === 'cms/content') {
    const mod = await import('./api-routes/cms-content.js');
    return { mod };
  }
  if (path === 'cms/dashboard') {
    const mod = await import('./api-routes/cms-dashboard.js');
    return { mod };
  }
  if (path === 'cms/media') {
    const mod = await import('./api-routes/cms-media.js');
    return { mod };
  }
  if (path === 'cms/redirect-check') {
    const mod = await import('./api-routes/cms-redirect-check.js');
    return { mod };
  }
  if (path === 'cms/redirects') {
    const mod = await import('./api-routes/cms-redirects.js');
    return { mod };
  }
  if (path === 'cms/routes') {
    const mod = await import('./api-routes/cms-routes.js');
    return { mod };
  }
  if (path === 'cms/scan-routes') {
    const mod = await import('./api-routes/cms-scan-routes.js');
    return { mod };
  }
  if (path === 'cms/seo') {
    const mod = await import('./api-routes/cms-seo.js');
    return { mod };
  }
  if (path === 'cms/users') {
    const mod = await import('./api-routes/cms-users.js');
    return { mod };
  }

  // 7. Settings
  if (path === 'settings') {
    const mod = await import('./api-routes/settings.js');
    return { mod };
  }
  if (path === 'settings/public') {
    const mod = await import('./api-routes/settings-public.js');
    return { mod };
  }

  // 8. Reviews
  if (path === 'reviews') {
    const mod = await import('./api-routes/reviews.js');
    return { mod };
  }
  if (path === 'shopify-reviews') {
    const mod = await import('./api-routes/shopify-reviews.js');
    return { mod };
  }

  // 9. Appointments, Logo, Captcha, Admin Notifications
  if (path === 'appointments') {
    const mod = await import('./api-routes/appointments.js');
    return { mod };
  }
  if (path === 'logo') {
    const mod = await import('./api-routes/logo.js');
    return { mod };
  }
  if (path === 'verify-captcha') {
    const mod = await import('./api-routes/verify-captcha.js');
    return { mod };
  }
  if (path === 'admin/notifications') {
    const mod = await import('./api-routes/admin-notifications.js');
    return { mod };
  }

  // 10. Emails & Inbound Email Management
  if (path === 'emails') {
    const mod = await import('./api-routes/emails.js');
    return { mod };
  }
  if (path === 'emails/templates') {
    const mod = await import('./api-routes/emails-templates.js');
    return { mod };
  }
  if (path === 'emails/inbound') {
    const mod = await import('./api-routes/emails-inbound.js');
    return { mod };
  }
  if (path === 'emails/sync') {
    const mod = await import('./api-routes/emails-sync.js');
    return { mod };
  }
  if (slug[0] === 'emails' && slug.length === 2) {
    const mod = await import('./api-routes/emails-id.js');
    return { mod, params: { id: slug[1] } };
  }

  return null;
}

export async function dispatchApiRoute(method, request, paramsPromise) {
  // Return preflight OPTIONS immediately without loading any route module
  if (method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: CORS_PREFLIGHT_HEADERS,
    });
  }

  const resolvedParams = await paramsPromise;
  const slug = resolvedParams?.slug || [];
  const path = slug.join('/');

  // Lazily load only the matched module
  const route = await resolveRouteModule(slug, path);

  if (!route) {
    return NextResponse.json(
      { error: `API route not found: /api/${path} [${method}]` },
      { status: 404 }
    );
  }

  const handler = route.mod[method];
  if (!handler) {
    return NextResponse.json(
      { error: `Method ${method} not allowed for /api/${path}` },
      { status: 405 }
    );
  }

  if (route.params) {
    return handler(request, { params: Promise.resolve(route.params) });
  }

  return handler(request);
}
