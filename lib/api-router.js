import { NextResponse } from 'next/server';

// Import all route modules
import * as applicationsRoute from './api-routes/applications.js';
import * as applicationsIdRoute from './api-routes/applications-id.js';
import * as applicationsCvRoute from './api-routes/applications-cv.js';
import * as applicationsStatusRoute from './api-routes/applications-status.js';
import * as sendOtpRoute from './api-routes/send-otp.js';
import * as verifyOtpRoute from './api-routes/verify-otp.js';
import * as contactSubmissionsRoute from './api-routes/contact-submissions.js';
import * as quoteSubmissionsRoute from './api-routes/quote-submissions.js';
import * as authLoginRoute from './api-routes/auth-login.js';
import * as authLogoutRoute from './api-routes/auth-logout.js';
import * as appointmentsRoute from './api-routes/appointments.js';
import * as blogsRoute from './api-routes/blogs.js';
import * as blogsCommentsRoute from './api-routes/blogs-comments.js';
import * as cmsActivityRoute from './api-routes/cms-activity.js';
import * as cmsContentRoute from './api-routes/cms-content.js';
import * as cmsDashboardRoute from './api-routes/cms-dashboard.js';
import * as cmsMediaRoute from './api-routes/cms-media.js';
import * as cmsRedirectCheckRoute from './api-routes/cms-redirect-check.js';
import * as cmsRedirectsRoute from './api-routes/cms-redirects.js';
import * as cmsRoutesRoute from './api-routes/cms-routes.js';
import * as cmsScanRoutesRoute from './api-routes/cms-scan-routes.js';
import * as cmsSeoRoute from './api-routes/cms-seo.js';
import * as cmsUsersRoute from './api-routes/cms-users.js';
import * as logoRoute from './api-routes/logo.js';
import * as reviewsRoute from './api-routes/reviews.js';
import * as settingsRoute from './api-routes/settings.js';
import * as settingsPublicRoute from './api-routes/settings-public.js';
import * as shopifyReviewsRoute from './api-routes/shopify-reviews.js';
import * as verifyCaptchaRoute from './api-routes/verify-captcha.js';
import * as adminNotificationsRoute from './api-routes/admin-notifications.js';
import * as emailsRoute from './api-routes/emails.js';
import * as emailsIdRoute from './api-routes/emails-id.js';
import * as emailsTemplatesRoute from './api-routes/emails-templates.js';
import * as emailsInboundRoute from './api-routes/emails-inbound.js';
import * as emailsSyncRoute from './api-routes/emails-sync.js';

export async function dispatchApiRoute(method, request, paramsPromise) {
  const resolvedParams = await paramsPromise;
  const slug = resolvedParams?.slug || [];
  const path = slug.join('/');

  // 1. Applications
  if (path === 'applications') {
    const handler = applicationsRoute[method];
    if (handler) return handler(request);
  } else if (slug[0] === 'applications' && slug.length === 2) {
    const handler = applicationsIdRoute[method];
    if (handler) return handler(request, { params: Promise.resolve({ id: slug[1] }) });
  } else if (slug[0] === 'applications' && slug.length === 3 && slug[2] === 'cv') {
    const handler = applicationsCvRoute[method];
    if (handler) return handler(request, { params: Promise.resolve({ id: slug[1] }) });
  } else if (slug[0] === 'applications' && slug.length === 3 && slug[2] === 'status') {
    const handler = applicationsStatusRoute[method];
    if (handler) return handler(request, { params: Promise.resolve({ id: slug[1] }) });
  }

  // 2. OTP
  else if (path === 'send-otp') {
    const handler = sendOtpRoute[method];
    if (handler) return handler(request);
  } else if (path === 'verify-otp') {
    const handler = verifyOtpRoute[method];
    if (handler) return handler(request);
  }

  // 3. Contact & Quotes
  else if (path === 'contact-submissions') {
    const handler = contactSubmissionsRoute[method];
    if (handler) return handler(request);
  } else if (path === 'quote-submissions') {
    const handler = quoteSubmissionsRoute[method];
    if (handler) return handler(request);
  }

  // 4. Auth
  else if (path === 'auth/login') {
    const handler = authLoginRoute[method];
    if (handler) return handler(request);
  } else if (path === 'auth/logout') {
    const handler = authLogoutRoute[method];
    if (handler) return handler(request);
  }

  // 5. Blogs
  else if (path === 'blogs') {
    const handler = blogsRoute[method];
    if (handler) return handler(request);
  } else if (path === 'blogs/comments') {
    const handler = blogsCommentsRoute[method];
    if (handler) return handler(request);
  }

  // 6. CMS
  else if (path === 'cms/activity') {
    const handler = cmsActivityRoute[method];
    if (handler) return handler(request);
  } else if (path === 'cms/content') {
    const handler = cmsContentRoute[method];
    if (handler) return handler(request);
  } else if (path === 'cms/dashboard') {
    const handler = cmsDashboardRoute[method];
    if (handler) return handler(request);
  } else if (path === 'cms/media') {
    const handler = cmsMediaRoute[method];
    if (handler) return handler(request);
  } else if (path === 'cms/redirect-check') {
    const handler = cmsRedirectCheckRoute[method];
    if (handler) return handler(request);
  } else if (path === 'cms/redirects') {
    const handler = cmsRedirectsRoute[method];
    if (handler) return handler(request);
  } else if (path === 'cms/routes') {
    const handler = cmsRoutesRoute[method];
    if (handler) return handler(request);
  } else if (path === 'cms/scan-routes') {
    const handler = cmsScanRoutesRoute[method];
    if (handler) return handler(request);
  } else if (path === 'cms/seo') {
    const handler = cmsSeoRoute[method];
    if (handler) return handler(request);
  } else if (path === 'cms/users') {
    const handler = cmsUsersRoute[method];
    if (handler) return handler(request);
  }

  // 7. Settings
  else if (path === 'settings') {
    const handler = settingsRoute[method];
    if (handler) return handler(request);
  } else if (path === 'settings/public') {
    const handler = settingsPublicRoute[method];
    if (handler) return handler(request);
  }

  // 8. Reviews
  else if (path === 'reviews') {
    const handler = reviewsRoute[method];
    if (handler) return handler(request);
  } else if (path === 'shopify-reviews') {
    const handler = shopifyReviewsRoute[method];
    if (handler) return handler(request);
  }

  // 9. Appointments, Logo, Captcha
  else if (path === 'appointments') {
    const handler = appointmentsRoute[method];
    if (handler) return handler(request);
  } else if (path === 'logo') {
    const handler = logoRoute[method];
    if (handler) return handler(request);
  } else if (path === 'verify-captcha') {
    const handler = verifyCaptchaRoute[method];
    if (handler) return handler(request);
  } else if (path === 'admin/notifications') {
    const handler = adminNotificationsRoute[method];
    if (handler) return handler(request);
  }

  // 10. Emails & Inbound Email Management
  else if (path === 'emails') {
    const handler = emailsRoute[method];
    if (handler) return handler(request);
  } else if (path === 'emails/templates') {
    const handler = emailsTemplatesRoute[method];
    if (handler) return handler(request);
  } else if (path === 'emails/inbound') {
    const handler = emailsInboundRoute[method];
    if (handler) return handler(request);
  } else if (path === 'emails/sync') {
    const handler = emailsSyncRoute[method];
    if (handler) return handler(request);
  } else if (slug[0] === 'emails' && slug.length === 2) {
    const handler = emailsIdRoute[method];
    if (handler) return handler(request, { params: Promise.resolve({ id: slug[1] }) });
  }

  // Options / CORS preflight support
  if (method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  return NextResponse.json({ error: `API route not found: /api/${path} [${method}]` }, { status: 404 });
}
