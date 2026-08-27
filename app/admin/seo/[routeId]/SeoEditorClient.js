"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiSave, FiEye, FiSearch, FiCheckCircle, FiAlertCircle, FiTrash2 } from 'react-icons/fi';

const InputField = ({ label, value, onChange, type = 'text', placeholder = '', helpText = '', maxLength, disabled }) => (
  <div className="flex flex-col mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
    {type === 'textarea' ? (
      <textarea
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={3}
        className={`rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 shadow-sm resize-none
                   focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704] focus:outline-none transition text-sm ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}`}
      />
    ) : (
      <input
        disabled={disabled}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 shadow-sm
                   focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704] focus:outline-none transition text-sm ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}`}
      />
    )}
    {helpText && <p className="text-xs text-gray-400 mt-1">{helpText}</p>}
    {maxLength && (
      <p className={`text-xs mt-1 ${(value || '').length > maxLength * 0.9 ? 'text-red-500' : 'text-gray-400'}`}>
        {(value || '').length}/{maxLength} characters
      </p>
    )}
  </div>
);

export default function SeoEditorClient({ initialSeo, routeId, routePath, apiBase, isNew }) {
  const [seo, setSeo] = useState(initialSeo || {
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [],
    canonicalUrl: '',
    robots: { index: true, follow: true, noArchive: false, noSnippet: false },
    openGraph: { title: '', description: '', image: '', type: 'website', locale: 'en_US' },
    twitterCard: { cardType: 'summary_large_image', title: '', description: '', image: '' },
    schema: { type: 'WebPage', customSchema: '' },
    sitemap: { include: true, priority: 0.5, changeFrequency: 'weekly' },
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [activeTab, setActiveTab] = useState('meta');
  const [keywordsInput, setKeywordsInput] = useState(
    Array.isArray(seo.metaKeywords) ? seo.metaKeywords.join(', ') : ''
  );
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          setCurrentUser(JSON.parse(userStr));
        } catch (e) {
          console.error("Failed to parse user session:", e);
        }
      } else {
        const token = localStorage.getItem("jwt");
        if (token) {
          setCurrentUser({ name: "Super Admin", role: "super_admin" });
        }
      }
    }
  }, []);

  const role = currentUser?.role || 'super_admin';
  const canEditSeo = ['super_admin', 'admin', 'seo', 'client'].includes(role);

  const handleChange = (section, field, value) => {
    if (!canEditSeo) return;
    if (section) {
      setSeo(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    } else {
      setSeo(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = async () => {
    if (!canEditSeo) return;
    setLoading(true);
    setMessage('');
    try {
      const payload = {
        ...seo,
        routeId,
        path: routePath,
        websiteId: 'default',
        metaKeywords: keywordsInput.split(',').map(k => k.trim()).filter(Boolean),
      };

      const res = await fetch(`${apiBase}/api/cms/seo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }

      const data = await res.json();
      setMessage(`SEO saved successfully! Score: ${data.seoScore}%`);
      setMessageType('success');
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setMessage('Failed to save: ' + err.message);
      setMessageType('error');
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!canEditSeo) return;
    if (!window.confirm("Are you sure you want to remove all SEO data for this page? The page will revert to base metadata.")) return;
    
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${apiBase}/api/cms/seo?id=${seo._id || routeId}&path=${encodeURIComponent(routePath)}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete SEO');
      }

      setSeo({
        metaTitle: '',
        metaDescription: '',
        metaKeywords: [],
        canonicalUrl: '',
        robots: { index: true, follow: true, noArchive: false, noSnippet: false },
        openGraph: { title: '', description: '', image: '', type: 'website', locale: 'en_US' },
        twitterCard: { cardType: 'summary_large_image', title: '', description: '', image: '' },
        schema: { type: 'WebPage', customSchema: '' },
        sitemap: { include: true, priority: 0.5, changeFrequency: 'weekly' },
      });
      setKeywordsInput('');
      setMessage('SEO data for this page has been completely removed. Frontend metadata updated.');
      setMessageType('success');
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setMessage('Failed to remove SEO: ' + err.message);
      setMessageType('error');
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'meta', label: 'Meta Tags' },
    { id: 'og', label: 'Open Graph' },
    { id: 'twitter', label: 'Twitter Card' },
    { id: 'schema', label: 'Schema / JSON-LD' },
    { id: 'robots', label: 'Robots & Sitemap' },
    { id: 'preview', label: 'Preview' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/seo"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#20507C] transition-colors"
        >
          <FiArrowLeft /> Back to SEO Overview
        </Link>
        <div className="flex items-center gap-3">
          <a
            href={routePath}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
          >
            <FiEye size={14} /> View Page
          </a>
          {canEditSeo && (
            <>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex items-center gap-1.5 px-4 py-2 rounded-md text-red-600 border border-red-300 hover:bg-red-50 text-sm font-semibold transition"
              >
                <FiTrash2 size={14} />
                Remove / Clear SEO
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className={`flex items-center gap-2 px-5 py-2 rounded-md text-white text-sm font-semibold transition
                  ${loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#E46704] hover:bg-[#E46704] focus:outline-none focus:ring-2 focus:ring-[#E46704]'}`}
              >
                <FiSave size={14} />
                {loading ? 'Saving...' : 'Save SEO'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`rounded-md px-4 py-3 text-sm font-medium flex items-center gap-2
            ${messageType === 'success'
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-red-100 text-red-700 border border-red-300'}`}
        >
          {messageType === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
          {message}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
                ${activeTab === tab.id
                  ? 'border-[#20507C] text-[#20507C]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Meta Tags Tab */}
          {activeTab === 'meta' && (
            <div className="max-w-2xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Meta Tags</h3>
              <InputField
                label="Meta Title"
                value={seo.metaTitle}
                onChange={(v) => handleChange(null, 'metaTitle', v)}
                placeholder="Page title for search engines"
                helpText="Recommended: 50-60 characters"
                maxLength={70}
                disabled={!canEditSeo}
              />
              <InputField
                label="Meta Description"
                value={seo.metaDescription}
                onChange={(v) => handleChange(null, 'metaDescription', v)}
                type="textarea"
                placeholder="Brief description of this page for search engines"
                helpText="Recommended: 120-160 characters"
                maxLength={170}
                disabled={!canEditSeo}
              />
              <InputField
                label="Meta Keywords"
                value={keywordsInput}
                onChange={(v) => setKeywordsInput(v)}
                placeholder="keyword1, keyword2, keyword3"
                helpText="Comma-separated keywords"
                disabled={!canEditSeo}
              />
              <InputField
                label="Canonical URL"
                value={seo.canonicalUrl}
                onChange={(v) => handleChange(null, 'canonicalUrl', v)}
                type="url"
                placeholder="https://www.osumfix.com/services/ac-work"
                helpText="The preferred URL for this page (prevents duplicate content)"
                disabled={!canEditSeo}
              />
            </div>
          )}

          {/* Open Graph Tab */}
          {activeTab === 'og' && (
            <div className="max-w-2xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Open Graph Tags</h3>
              <p className="text-sm text-gray-500 mb-4">Controls how your page appears when shared on Facebook, LinkedIn, and other platforms.</p>
              <InputField
                label="OG Title"
                value={seo.openGraph?.title || ''}
                onChange={(v) => handleChange('openGraph', 'title', v)}
                placeholder="Title for social sharing"
                helpText="Leave empty to use meta title"
                disabled={!canEditSeo}
              />
              <InputField
                label="OG Description"
                value={seo.openGraph?.description || ''}
                onChange={(v) => handleChange('openGraph', 'description', v)}
                type="textarea"
                placeholder="Description for social sharing"
                disabled={!canEditSeo}
              />
              <InputField
                label="OG Image URL"
                value={seo.openGraph?.image || ''}
                onChange={(v) => handleChange('openGraph', 'image', v)}
                type="url"
                placeholder="https://example.com/image.jpg"
                helpText="Recommended: 1200x630 pixels"
                disabled={!canEditSeo}
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">OG Type</label>
                  <select
                    disabled={!canEditSeo}
                    value={seo.openGraph?.type || 'website'}
                    onChange={(e) => handleChange('openGraph', 'type', e.target.value)}
                    className={`rounded-md border border-gray-300 px-4 py-2 text-gray-750 text-sm focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704] focus:outline-none ${!canEditSeo ? 'bg-gray-50 cursor-not-allowed text-gray-500' : ''}`}
                  >
                    <option value="website">Website</option>
                    <option value="article">Article</option>
                    <option value="product">Product</option>
                    <option value="profile">Profile</option>
                  </select>
                </div>
                <InputField
                  label="OG Locale"
                  value={seo.openGraph?.locale || 'en_US'}
                  onChange={(v) => handleChange('openGraph', 'locale', v)}
                  placeholder="en_US"
                  disabled={!canEditSeo}
                />
              </div>
            </div>
          )}

          {/* Twitter Card Tab */}
          {activeTab === 'twitter' && (
            <div className="max-w-2xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Twitter Card Tags</h3>
              <p className="text-sm text-gray-500 mb-4">Controls how your page appears when shared on Twitter/X.</p>
              <div className="flex flex-col mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Card Type</label>
                <select
                  disabled={!canEditSeo}
                  value={seo.twitterCard?.cardType || 'summary_large_image'}
                  onChange={(e) => handleChange('twitterCard', 'cardType', e.target.value)}
                  className={`rounded-md border border-gray-300 px-4 py-2 text-gray-750 text-sm focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704] focus:outline-none ${!canEditSeo ? 'bg-gray-50 cursor-not-allowed text-gray-500' : ''}`}
                >
                  <option value="summary">Summary</option>
                  <option value="summary_large_image">Summary Large Image</option>
                  <option value="app">App</option>
                  <option value="player">Player</option>
                </select>
              </div>
              <InputField
                label="Twitter Title"
                value={seo.twitterCard?.title || ''}
                onChange={(v) => handleChange('twitterCard', 'title', v)}
                placeholder="Title for Twitter/X"
                helpText="Leave empty to use meta title"
                disabled={!canEditSeo}
              />
              <InputField
                label="Twitter Description"
                value={seo.twitterCard?.description || ''}
                onChange={(v) => handleChange('twitterCard', 'description', v)}
                type="textarea"
                placeholder="Description for Twitter/X"
                disabled={!canEditSeo}
              />
              <InputField
                label="Twitter Image URL"
                value={seo.twitterCard?.image || ''}
                onChange={(v) => handleChange('twitterCard', 'image', v)}
                type="url"
                placeholder="https://example.com/twitter-image.jpg"
                disabled={!canEditSeo}
              />
            </div>
          )}

          {/* Schema / JSON-LD Tab */}
          {activeTab === 'schema' && (
            <div className="max-w-2xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Schema Markup (JSON-LD)</h3>
              <p className="text-sm text-gray-500 mb-4">Structured data helps search engines understand your page content.</p>
              <div className="flex flex-col mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Schema Type</label>
                <select
                  disabled={!canEditSeo}
                  value={seo.schema?.type || 'WebPage'}
                  onChange={(e) => handleChange('schema', 'type', e.target.value)}
                  className={`rounded-md border border-gray-300 px-4 py-2 text-gray-750 text-sm focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704] focus:outline-none ${!canEditSeo ? 'bg-gray-50 cursor-not-allowed text-gray-500' : ''}`}
                >
                  <option value="WebPage">WebPage</option>
                  <option value="Article">Article</option>
                  <option value="Product">Product</option>
                  <option value="Organization">Organization</option>
                  <option value="LocalBusiness">LocalBusiness</option>
                  <option value="FAQPage">FAQPage</option>
                  <option value="Service">Service</option>
                  <option value="BreadcrumbList">BreadcrumbList</option>
                </select>
              </div>
              <div className="flex flex-col mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Custom JSON-LD</label>
                <textarea
                  disabled={!canEditSeo}
                  value={seo.schema?.customSchema || ''}
                  onChange={(e) => handleChange('schema', 'customSchema', e.target.value)}
                  placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "WebPage",\n  "name": "Page Title"\n}'}
                  rows={10}
                  className={`rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 shadow-sm resize-y focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704] focus:outline-none transition text-sm font-mono ${!canEditSeo ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                />
                <p className="text-xs text-gray-400 mt-1">Enter valid JSON-LD schema markup. Leave empty to auto-generate based on schema type.</p>
              </div>
            </div>
          )}

          {/* Robots & Sitemap Tab */}
          {activeTab === 'robots' && (
            <div className="max-w-2xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Robots Meta & Sitemap</h3>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Robots Meta Tags</h4>
                <div className="space-y-3">
                  {[
                    { field: 'index', label: 'Index', desc: 'Allow search engines to index this page' },
                    { field: 'follow', label: 'Follow', desc: 'Allow search engines to follow links on this page' },
                    { field: 'noArchive', label: 'No Archive', desc: 'Prevent cached copies in search results', invert: true },
                    { field: 'noSnippet', label: 'No Snippet', desc: 'Prevent text snippets in search results', invert: true },
                  ].map(item => (
                    <label key={item.field} className={`flex items-start gap-3 p-3 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer transition ${!canEditSeo ? 'opacity-70 cursor-default hover:bg-white' : ''}`}>
                      <input
                        disabled={!canEditSeo}
                        type="checkbox"
                        checked={item.invert ? (seo.robots?.[item.field] || false) : (seo.robots?.[item.field] !== false)}
                        onChange={(e) => handleChange('robots', item.field, e.target.checked)}
                        className={`mt-0.5 h-4 w-4 rounded border-gray-300 text-[#20507C] focus:ring-[#E46704] ${!canEditSeo ? 'cursor-not-allowed' : ''}`}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Sitemap Settings</h4>
                <div className="space-y-4">
                  <label className={`flex items-start gap-3 p-3 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer transition ${!canEditSeo ? 'opacity-70 cursor-default hover:bg-white' : ''}`}>
                    <input
                      disabled={!canEditSeo}
                      type="checkbox"
                      checked={seo.sitemap?.include !== false}
                      onChange={(e) => handleChange('sitemap', 'include', e.target.checked)}
                      className={`mt-0.5 h-4 w-4 rounded border-gray-300 text-[#20507C] focus:ring-[#E46704] ${!canEditSeo ? 'cursor-not-allowed' : ''}`}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Include in Sitemap</p>
                      <p className="text-xs text-gray-500">Include this page in the XML sitemap</p>
                    </div>
                  </label>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Priority</label>
                      <select
                        disabled={!canEditSeo}
                        value={seo.sitemap?.priority || 0.5}
                        onChange={(e) => handleChange('sitemap', 'priority', parseFloat(e.target.value))}
                        className={`rounded-md border border-gray-300 px-4 py-2 text-gray-750 text-sm focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704] focus:outline-none ${!canEditSeo ? 'bg-gray-50 cursor-not-allowed text-gray-500' : ''}`}
                      >
                        <option value={1.0}>1.0 (Highest)</option>
                        <option value={0.9}>0.9</option>
                        <option value={0.8}>0.8</option>
                        <option value={0.7}>0.7</option>
                        <option value={0.6}>0.6</option>
                        <option value={0.5}>0.5 (Default)</option>
                        <option value={0.4}>0.4</option>
                        <option value={0.3}>0.3</option>
                        <option value={0.2}>0.2</option>
                        <option value={0.1}>0.1 (Lowest)</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Change Frequency</label>
                      <select
                        disabled={!canEditSeo}
                        value={seo.sitemap?.changeFrequency || 'weekly'}
                        onChange={(e) => handleChange('sitemap', 'changeFrequency', e.target.value)}
                        className={`rounded-md border border-gray-300 px-4 py-2 text-gray-750 text-sm focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704] focus:outline-none ${!canEditSeo ? 'bg-gray-50 cursor-not-allowed text-gray-500' : ''}`}
                      >
                        <option value="always">Always</option>
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                        <option value="never">Never</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="max-w-2xl space-y-6">
              {/* Google Preview */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  <FiSearch className="inline mr-2" />
                  Google Search Preview
                </h3>
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                  <p className="text-sm text-green-700 mb-1 truncate">
                    {seo.canonicalUrl || `https://www.osumfix.com${routePath}`}
                  </p>
                  <h3 className="text-xl text-blue-800 hover:underline cursor-pointer mb-1 line-clamp-1">
                    {seo.metaTitle || 'Page Title - OsumFix'}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {seo.metaDescription || 'Add a meta description to see how it will appear in search results.'}
                  </p>
                </div>
              </div>

              {/* Social Preview */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Social Media Preview</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden max-w-md">
                  {(seo.openGraph?.image || seo.twitterCard?.image) && (
                    <div className="bg-gray-100 h-48 flex items-center justify-center">
                      <img
                        src={seo.openGraph?.image || seo.twitterCard?.image}
                        alt="OG Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <p className="text-xs text-gray-500 uppercase">osumfix.ae</p>
                    <h4 className="text-sm font-semibold text-gray-900 mt-1 line-clamp-2">
                      {seo.openGraph?.title || seo.metaTitle || 'Page Title'}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {seo.openGraph?.description || seo.metaDescription || 'Page description will appear here.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Robots Preview */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Generated Meta Tags</h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto font-mono">
{`<title>${seo.metaTitle || 'Page Title'}</title>
<meta name="description" content="${seo.metaDescription || ''}" />
<meta name="keywords" content="${keywordsInput}" />
${seo.canonicalUrl ? `<link rel="canonical" href="${seo.canonicalUrl}" />` : ''}
<meta name="robots" content="${seo.robots?.index !== false ? 'index' : 'noindex'}, ${seo.robots?.follow !== false ? 'follow' : 'nofollow'}${seo.robots?.noArchive ? ', noarchive' : ''}${seo.robots?.noSnippet ? ', nosnippet' : ''}" />

<!-- Open Graph -->
<meta property="og:title" content="${seo.openGraph?.title || seo.metaTitle || ''}" />
<meta property="og:description" content="${seo.openGraph?.description || seo.metaDescription || ''}" />
<meta property="og:type" content="${seo.openGraph?.type || 'website'}" />
${seo.openGraph?.image ? `<meta property="og:image" content="${seo.openGraph.image}" />` : ''}

<!-- Twitter Card -->
<meta name="twitter:card" content="${seo.twitterCard?.cardType || 'summary_large_image'}" />
<meta name="twitter:title" content="${seo.twitterCard?.title || seo.metaTitle || ''}" />
<meta name="twitter:description" content="${seo.twitterCard?.description || seo.metaDescription || ''}" />`}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Save Bar */}
      <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
        <Link
          href="/admin/seo"
          className="text-sm text-gray-600 hover:text-[#20507C] transition-colors"
        >
          ← Back to SEO Overview
        </Link>
        {canEditSeo && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-md text-red-600 border border-red-300 hover:bg-red-50 text-sm font-semibold transition"
            >
              <FiTrash2 size={14} />
              Remove / Clear SEO
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-white text-sm font-semibold transition
                ${loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#E46704] hover:bg-[#E46704] focus:outline-none focus:ring-2 focus:ring-[#E46704]'}`}
            >
              <FiSave size={14} />
              {loading ? 'Saving...' : 'Save SEO Settings'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
