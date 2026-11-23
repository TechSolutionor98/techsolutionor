// lib/admin-permissions.js
// Centralized configuration and helpers for role & page-based admin access control

export const ADMIN_PAGE_SECTIONS = [
  {
    id: "main",
    label: "Main",
    pages: [
      { id: "/admin", label: "Dashboard", desc: "Overview analytics & quick actions" }
    ]
  },
  {
    id: "inquiries",
    label: "Leads & Inquiries",
    pages: [
      { id: "/admin/emails", label: "Email Inbox", desc: "HR & email communication" },
      { id: "/admin/hire-us", label: "Hire Us Submissions", desc: "Client resource requirements & talent intake" },
      { id: "/admin/contact-submissions", label: "Contact Messages", desc: "Inquiries from contact forms" },
      { id: "/admin/applications", label: "Job Applications", desc: "Career applicant resumes" },
      { id: "/admin/reviews", label: "Customer Reviews", desc: "Ratings and testimonials" }
    ]
  },
  {
    id: "content_seo",
    label: "SEO & Content",
    pages: [
      { id: "/admin/pages", label: "Pages & Sections", desc: "Manage pages and section content" },
      { id: "/admin/seo", label: "SEO Manager", desc: "Meta tags, schema, and SEO scores" },
      { id: "/admin/media", label: "Media Library", desc: "Manage images and asset files" },
      { id: "/admin/redirects", label: "URL Redirects", desc: "Manage 301/302 link forwarding" },
      { id: "/admin/logos", label: "Website Logo", desc: "Update header and footer logo" }
    ]
  },
  {
    id: "blogs",
    label: "Blog Management",
    pages: [
      { id: "/admin/blogs", label: "All Articles", desc: "View and edit blog posts" },
      { id: "/admin/blogs/add", label: "Create Article", desc: "Write and publish new article" },
      { id: "/admin/blogs/comments", label: "Comments", desc: "Moderate user comments" },
      { id: "/admin/blogs/users", label: "Authors & Writers", desc: "Manage blog contributors" }
    ]
  },
  {
    id: "system",
    label: "System & Settings",
    pages: [
      { id: "/admin/settings", label: "Business Settings", desc: "Company information and socials" },
      { id: "/admin/users", label: "Admin Accounts", desc: "Manage user roles and page access" },
      { id: "/admin/activity", label: "Activity Logs", desc: "System audit trail and history" }
    ]
  }
];

export const ALL_ADMIN_PAGE_PATHS = ADMIN_PAGE_SECTIONS.flatMap(s => s.pages.map(p => p.id));

export const ROLE_DEFAULT_PAGES = {
  super_admin: ["*"],
  admin: ALL_ADMIN_PAGE_PATHS.filter(p => p !== "/admin/users"),
  client: [
    "/admin",
    "/admin/emails",
    "/admin/hire-us",
    "/admin/contact-submissions",
    "/admin/applications",
    "/admin/reviews",
    "/admin/settings",
    "/admin/pages",
    "/admin/seo",
    "/admin/redirects",
    "/admin/media",
    "/admin/logos",
    "/admin/blogs",
    "/admin/blogs/add",
  ],
  seo: [
    "/admin",
    "/admin/seo",
    "/admin/redirects"
  ],
  blog: [
    "/admin",
    "/admin/blogs",
    "/admin/blogs/add",
    "/admin/blogs/comments",
    "/admin/blogs/users"
  ],
  editor: [
    "/admin",
    "/admin/pages",
    "/admin/redirects",
    "/admin/media",
    "/admin/logos"
  ],
  viewer: [
    "/admin",
    "/admin/pages",
    "/admin/seo"
  ]
};

export const ROLES = [
  { value: 'super_admin', label: 'Super Admin', color: 'bg-red-100 text-red-700', desc: 'Full access to everything' },
  { value: 'admin', label: 'Admin', color: 'bg-orange-100 text-orange-700', desc: 'All content & management' },
  { value: 'client', label: 'Client', color: 'bg-blue-100 text-blue-700', desc: 'Own website management' },
  { value: 'seo', label: 'SEO Specialist', color: 'bg-purple-100 text-purple-700', desc: 'SEO Manager & URL Redirects' },
  { value: 'blog', label: 'Blog Manager', color: 'bg-teal-100 text-teal-700', desc: 'Blogs section only' },
  { value: 'editor', label: 'Content Editor', color: 'bg-green-100 text-green-700', desc: 'Pages, Redirects & Media' },
  { value: 'viewer', label: 'Viewer', color: 'bg-gray-100 text-gray-700', desc: 'Pages & SEO view only' },
];

/**
 * Checks if a given route path is allowed for a user.
 * @param {string} path - e.g. "/admin/seo"
 * @param {object} user - user object with role and optional allowedPages array
 * @returns {boolean}
 */
export function isRouteAllowed(path, user) {
  if (!user) return false;
  const role = user.role || 'viewer';
  if (role === 'super_admin') return true;

  // Use explicit allowedPages if defined
  const allowedPages = Array.isArray(user.allowedPages) && user.allowedPages.length > 0
    ? user.allowedPages
    : (ROLE_DEFAULT_PAGES[role] || []);

  if (allowedPages.includes('*')) return true;

  const cleanPath = path ? path.replace(/\/$/, '') : '';

  if (cleanPath === '/admin' || cleanPath === '') {
    return allowedPages.includes('/admin');
  }

  return allowedPages.some(allowedPath => {
    if (allowedPath === '/admin') return false;
    const cleanAllowed = allowedPath.replace(/\/$/, '');
    return cleanPath === cleanAllowed || cleanPath.startsWith(cleanAllowed + '/');
  });
}
