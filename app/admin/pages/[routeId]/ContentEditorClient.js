"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FiArrowLeft, FiSave, FiEye, FiFileText, FiChevronUp, FiChevronDown,
  FiTrash2, FiPlus, FiCheckCircle, FiAlertCircle, FiImage, FiLayers, FiSearch, FiRefreshCw, FiX, FiLink
} from 'react-icons/fi';

export default function ContentEditorClient({ initialContent, routeId, routePath, apiBase }) {
  const [content, setContent] = useState(initialContent || { sections: [], status: 'draft', version: 1 });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [expandedSections, setExpandedSections] = useState(new Set([0]));
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);

  // Link Modal States
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkModalData, setLinkModalData] = useState(null);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkNewTab, setLinkNewTab] = useState(false);
  const [existingLinkDetected, setExistingLinkDetected] = useState(false);

  // Media Library Modal States
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [activeMediaTarget, setActiveMediaTarget] = useState(null);
  const [mediaList, setMediaList] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');

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
  const canEditContent = ['super_admin', 'admin', 'editor', 'client'].includes(role);

  const toggleSection = (index) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const updateSectionName = (index, name) => {
    if (!canEditContent) return;
    const newSections = [...content.sections];
    newSections[index] = { ...newSections[index], sectionName: name };
    setContent({ ...content, sections: newSections });
  };

  const updateField = (sectionIndex, fieldKey, prop, val) => {
    if (!canEditContent) return;
    const newSections = [...content.sections];
    const sec = { ...newSections[sectionIndex] };
    const fields = { ...sec.fields };
    const field = { ...fields[fieldKey] };

    field[prop] = val;
    fields[fieldKey] = field;
    sec.fields = fields;
    newSections[sectionIndex] = sec;
    setContent({ ...content, sections: newSections });
  };

  const moveSection = (index, direction) => {
    if (!canEditContent) return;
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= content.sections.length) return;
    const newSections = [...content.sections];
    const temp = newSections[index];
    newSections[index] = newSections[newIndex];
    newSections[newIndex] = temp;
    setContent({ ...content, sections: newSections });
  };

  const deleteSection = (index) => {
    if (!canEditContent) return;
    if (confirm('Are you sure you want to delete this section?')) {
      const newSections = content.sections.filter((_, i) => i !== index);
      setContent({ ...content, sections: newSections });
    }
  };

  const handleImageUpload = async (e, sectionIndex, fieldKey) => {
    if (!canEditContent) return;
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(`${sectionIndex}_${fieldKey}`);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('websiteId', 'default');
      formData.append('folder', 'content');

      const res = await fetch(`${apiBase}/api/cms/media`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Upload failed');
      }

      const data = await res.json();
      if (data.media && data.media.url) {
        updateField(sectionIndex, fieldKey, 'value', data.media.url);
        setMessage('Image uploaded to Cloudinary & preview updated!');
        setMessageType('success');
        setTimeout(() => setMessage(''), 4000);
      }
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploadingField(null);
    }
  };

  const handleOpenMediaModal = async (sectionIndex, fieldKey) => {
    setActiveMediaTarget({ sectionIndex, fieldKey });
    setShowMediaModal(true);
    setMediaLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/cms/media?websiteId=default&limit=100`);
      if (res.ok) {
        const data = await res.json();
        setMediaList(data.media || []);
      }
    } catch (err) {
      console.error('Failed to load media list:', err);
    } finally {
      setMediaLoading(false);
    }
  };

  const handleSelectMedia = (url) => {
    if (activeMediaTarget) {
      updateField(activeMediaTarget.sectionIndex, activeMediaTarget.fieldKey, 'value', url);
      setShowMediaModal(false);
      setActiveMediaTarget(null);
    }
  };

  const handleOpenLinkModal = (sectionIndex, fieldKey, fullText) => {
    const linkMatch = (fullText || '').match(/<a\s+[^>]*href=['"]([^'"]*)['"][^>]*>([\s\S]*?)<\/a>/i);
    const hasTargetBlank = (fullText || '').includes('target="_blank"') || (fullText || '').includes("target='_blank'");

    if (linkMatch) {
      setLinkUrl(linkMatch[1] || '');
      setLinkText((linkMatch[2] || '').replace(/<[^>]+>/g, '').trim());
      setLinkNewTab(hasTargetBlank);
      setExistingLinkDetected(true);
    } else {
      setLinkUrl('');
      setLinkText('');
      setLinkNewTab(false);
      setExistingLinkDetected(false);
    }

    setLinkModalData({ sectionIndex, fieldKey, fullText: fullText || '' });
    setShowLinkModal(true);
  };

  const handleSaveLink = () => {
    if (!canEditContent || !linkModalData) return;
    const { sectionIndex, fieldKey, fullText } = linkModalData;
    let textToWrap = linkText.trim();
    let urlToUse = linkUrl.trim();

    if (!textToWrap || !urlToUse) return;

    if (!urlToUse.startsWith('http://') && !urlToUse.startsWith('https://') && !urlToUse.startsWith('/') && !urlToUse.startsWith('#') && !urlToUse.startsWith('mailto:') && !urlToUse.startsWith('tel:')) {
      urlToUse = `/${urlToUse}`;
    }

    let cleanFullText = fullText;
    cleanFullText = cleanFullText.replace(/<a\s+[^>]*>([\s\S]*?)<\/a>/gi, '$1');

    const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapeRegExp(textToWrap), 'i');

    if (regex.test(cleanFullText)) {
      const targetAttr = linkNewTab ? ' target="_blank" rel="noopener noreferrer"' : '';
      const newAnchor = `<a href="${urlToUse}"${targetAttr}>${textToWrap}</a>`;
      const updatedFullText = cleanFullText.replace(regex, newAnchor);

      updateField(sectionIndex, fieldKey, 'value', updatedFullText);
      setShowLinkModal(false);
      setLinkModalData(null);
      setMessage(`Link updated successfully for "${textToWrap}"!`);
      setMessageType('success');
      setTimeout(() => setMessage(''), 4000);
    } else {
      alert(`The text "${textToWrap}" was not found in the paragraph.`);
    }
  };

  const handleRemoveLink = () => {
    if (!canEditContent || !linkModalData) return;
    const { sectionIndex, fieldKey, fullText } = linkModalData;

    let cleanFullText = fullText;
    cleanFullText = cleanFullText.replace(/<a\s+[^>]*>([\s\S]*?)<\/a>/gi, '$1');

    updateField(sectionIndex, fieldKey, 'value', cleanFullText);
    setShowLinkModal(false);
    setLinkModalData(null);
    setMessage('Link removed successfully!');
    setMessageType('success');
    setTimeout(() => setMessage(''), 4000);
  };

  const handleSave = async (targetStatus = 'published') => {
    if (!canEditContent) return;
    setLoading(true);
    setMessage('');
    try {
      const payload = {
        routeId,
        path: routePath,
        websiteId: 'default',
        sections: content.sections,
        status: targetStatus,
      };

      const res = await fetch(`${apiBase}/api/cms/content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save content');
      }

      const data = await res.json();
      setContent(prev => ({ ...prev, status: targetStatus, version: data.version }));
      setMessage(`Content ${targetStatus === 'published' ? 'published' : 'saved as draft'} successfully! (v${data.version})`);
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

  const renderField = (sectionIndex, fieldKey, field) => {
    const label = field.label || fieldKey;
    const isRich = field.type === 'richtext';

    if (field.type === 'image') {
      return (
        <div key={fieldKey} className="p-4 rounded-lg bg-blue-50/40 border-l-4 border-l-[#20507C] border border-blue-100 shadow-2xs space-y-3 mb-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#20507C] flex items-center gap-1.5">
              <FiImage size={14} /> {label}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <input
              disabled={!canEditContent}
              type="url"
              value={field.value || ''}
              onChange={(e) => updateField(sectionIndex, fieldKey, 'value', e.target.value)}
              placeholder="Image URL (e.g., https://res.cloudinary.com/...)"
              className={`flex-1 rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 shadow-2xs
                         focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704] focus:outline-none transition text-sm ${!canEditContent ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
            />
            {canEditContent && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenMediaModal(sectionIndex, fieldKey)}
                  className="px-3.5 py-2 text-sm font-semibold rounded-md border border-gray-300 bg-white text-gray-700 shadow-2xs cursor-pointer hover:bg-gray-50 flex items-center gap-1.5 whitespace-nowrap transition"
                >
                  <FiLayers /> Media Library
                </button>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, sectionIndex, fieldKey)}
                    className="hidden"
                    id={`file-upload-${sectionIndex}-${fieldKey}`}
                    disabled={uploadingField === `${sectionIndex}_${fieldKey}`}
                  />
                  <label
                    htmlFor={`file-upload-${sectionIndex}-${fieldKey}`}
                    className={`px-4 py-2 text-sm font-semibold rounded-md border border-gray-300 bg-white text-gray-700 shadow-2xs cursor-pointer hover:bg-gray-50 flex items-center gap-1.5 whitespace-nowrap transition
                      ${uploadingField === `${sectionIndex}_${fieldKey}` ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    <FiImage />
                    {uploadingField === `${sectionIndex}_${fieldKey}` ? 'Uploading...' : 'Upload Image'}
                  </label>
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              disabled={!canEditContent}
              type="text"
              value={field.alt || ''}
              onChange={(e) => updateField(sectionIndex, fieldKey, 'alt', e.target.value)}
              placeholder="Alt text"
              className={`rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 placeholder-gray-400 text-sm
                         focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704] focus:outline-none transition ${!canEditContent ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
            />
            <input
              disabled={!canEditContent}
              type="text"
              value={field.title || ''}
              onChange={(e) => updateField(sectionIndex, fieldKey, 'title', e.target.value)}
              placeholder="Title attribute"
              className={`rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 placeholder-gray-400 text-sm
                         focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704] focus:outline-none transition ${!canEditContent ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
            />
          </div>
          {field.value && (
            <div className="border border-blue-200/80 rounded-md p-3 bg-white flex items-center gap-4 shadow-2xs mt-2">
              <img
                src={field.value}
                alt={field.alt || 'Preview'}
                className="max-h-28 max-w-[200px] object-contain rounded border border-gray-200 bg-white p-1"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/file.svg';
                }}
              />
              <div className="text-xs text-gray-600 overflow-hidden space-y-1">
                <p className="font-bold text-[#20507C] text-xs">Current Image Preview</p>
                <p className="text-gray-500 font-mono text-[11px] truncate max-w-md">{field.value}</p>
                <a
                  href={field.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[#20507C] font-semibold hover:underline"
                >
                  Open Image in New Tab ↗
                </a>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={fieldKey} className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-semibold text-gray-700">{label}</label>
          {isRich && canEditContent && (
            <button
              type="button"
              onClick={() => handleOpenLinkModal(sectionIndex, fieldKey, field.value || '')}
              className="text-xs font-semibold text-[#20507C] hover:text-[#E46704] flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 transition cursor-pointer"
            >
              <FiLink size={12} /> Add Link
            </button>
          )}
        </div>

        {isRich ? (
          <div>
            <textarea
              id={`input-${sectionIndex}-${fieldKey}`}
              disabled={!canEditContent}
              value={field.value || ''}
              onChange={(e) => updateField(sectionIndex, fieldKey, 'value', e.target.value)}
              placeholder={`Enter ${label.toLowerCase()}...`}
              rows={4}
              className={`w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 shadow-2xs
                         focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704] focus:outline-none transition text-sm
                         ${!canEditContent ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            />
          </div>
        ) : (
          <div>
            <textarea
              id={`input-${sectionIndex}-${fieldKey}`}
              disabled={!canEditContent}
              value={field.value || ''}
              onChange={(e) => updateField(sectionIndex, fieldKey, 'value', e.target.value)}
              placeholder={`Enter ${label.toLowerCase()}...`}
              rows={2}
              className={`w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 shadow-2xs
                         focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704] focus:outline-none transition text-sm ${!canEditContent ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            />
            {field.tag && (
              <div className="mt-1.5 flex items-center gap-2">
                <label className="text-xs text-gray-500">HTML Tag:</label>
                <select
                  disabled={!canEditContent}
                  value={field.tag}
                  onChange={(e) => updateField(sectionIndex, fieldKey, 'tag', e.target.value)}
                  className={`text-xs border border-gray-200 rounded px-2 py-1 text-gray-600 ${!canEditContent ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                >
                  <option value="h1">H1</option>
                  <option value="h2">H2</option>
                  <option value="h3">H3</option>
                  <option value="h4">H4</option>
                  <option value="p">P</option>
                  <option value="span">Span</option>
                </select>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <Link
          href="/admin/pages"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#20507C] transition-colors"
        >
          <FiArrowLeft /> Back to Pages
        </Link>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${content.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
            {content.status} • v{content.version}
          </span>
          <a
            href={routePath}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
          >
            <FiEye size={14} /> Preview
          </a>
          {canEditContent && (
            <>
              <button
                onClick={() => handleSave('draft')}
                disabled={loading}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition text-gray-700 font-medium"
              >
                Save Draft
              </button>
              <button
                onClick={() => handleSave('published')}
                disabled={loading}
                className={`flex items-center gap-2 px-5 py-2 rounded-md text-white text-sm font-semibold transition
                  ${loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#E46704] hover:bg-[#E46704]'}`}
              >
                <FiSave size={14} />
                {loading ? 'Saving...' : 'Publish'}
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

      {/* Sections */}
      {content.sections.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow-2xs text-center">
          <FiFileText className="mx-auto text-4xl text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Content Sections</h3>
          <p className="text-sm text-gray-400 mb-4">
            {canEditContent ? 'Add sections to start building your page content.' : 'No content sections available.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {content.sections.map((section, index) => (
            <div key={`${section.sectionId || 'section'}-${index}`} className="bg-white rounded-lg shadow-2xs overflow-hidden">
              {/* Section Header */}
              <div
                className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 cursor-pointer"
                onClick={() => toggleSection(index)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono bg-[#E46704] text-white px-2 py-0.5 rounded">{index + 1}</span>
                  <input
                    disabled={!canEditContent}
                    type="text"
                    value={section.sectionName || 'Untitled Section'}
                    onChange={(e) => updateSectionName(index, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className={`text-sm font-semibold text-gray-800 bg-transparent border-none outline-none focus:bg-white focus:border focus:border-[#20507C] focus:rounded focus:px-2 transition-all ${!canEditContent ? 'cursor-default' : ''}`}
                  />
                </div>
                {canEditContent && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); moveSection(index, -1); }}
                      disabled={index === 0}
                      className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30 transition"
                      title="Move up"
                    >
                      <FiChevronUp size={16} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); moveSection(index, 1); }}
                      disabled={index === content.sections.length - 1}
                      className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30 transition"
                      title="Move down"
                    >
                      <FiChevronDown size={16} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteSection(index); }}
                      className="p-1.5 text-gray-400 hover:text-red-600 transition"
                      title="Delete section"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Section Body */}
              {expandedSections.has(index) && (
                <div className="p-5">
                  {section.fields && Object.entries(section.fields).map(([key, field]) =>
                    renderField(index, key, field)
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Bottom Save Bar */}
      <div className="bg-white p-4 rounded-lg shadow-2xs flex items-center justify-between">
        <Link
          href="/admin/pages"
          className="text-sm text-gray-600 hover:text-[#20507C] transition-colors"
        >
          ← Back to Pages
        </Link>
        {canEditContent && (
          <div className="flex gap-2">
            <button
              onClick={() => handleSave('draft')}
              disabled={loading}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition text-gray-700"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave('published')}
              disabled={loading}
              className={`flex items-center gap-2 px-5 py-2 rounded-md text-white text-sm font-semibold transition
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#E46704] hover:bg-[#E46704]'}`}
            >
              <FiSave size={14} />
              {loading ? 'Saving...' : 'Publish'}
            </button>
          </div>
        )}
      </div>

      {/* Media Library Modal */}
      {showMediaModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50"
          onClick={() => setShowMediaModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl w-full mx-4 border border-gray-100 flex flex-col max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowMediaModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition cursor-pointer"
            >
              <FiX size={18} />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 rounded-lg bg-blue-50 text-[#20507C]">
                <FiLayers size={18} />
              </span>
              <h3 className="text-lg font-bold text-gray-900">Select Image from Media Library</h3>
            </div>

            {/* Search bar */}
            <div className="relative mb-4">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={mediaSearch}
                onChange={(e) => setMediaSearch(e.target.value)}
                placeholder="Search images by name or alt text..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704] focus:outline-none transition text-sm"
              />
            </div>

            {/* Media list grid */}
            <div className="flex-1 overflow-y-auto min-h-[300px] border border-gray-100 rounded-lg p-3 bg-gray-55">
              {mediaLoading ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <FiRefreshCw className="animate-spin text-2xl mb-2" />
                  <p className="text-sm font-semibold">Loading media library...</p>
                </div>
              ) : (() => {
                const filteredMedia = mediaList.filter(item =>
                  !mediaSearch ||
                  (item.originalName && item.originalName.toLowerCase().includes(mediaSearch.toLowerCase())) ||
                  (item.alt && item.alt.toLowerCase().includes(mediaSearch.toLowerCase()))
                );

                if (filteredMedia.length === 0) {
                  return (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                      <FiImage className="text-4xl mb-2 text-gray-300" />
                      <p className="text-sm font-semibold">No images found in Media Library</p>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredMedia.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => handleSelectMedia(item.url)}
                        className="bg-white rounded-lg border border-gray-250 p-2 hover:border-[#20507C] hover:shadow-md cursor-pointer transition-all flex flex-col group"
                      >
                        <div className="aspect-square bg-gray-150 rounded overflow-hidden mb-2 relative">
                          <img
                            src={item.thumbnailUrl || item.url}
                            alt={item.alt || item.originalName}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350"
                          />
                        </div>
                        <p className="text-xs font-semibold text-gray-700 truncate" title={item.originalName}>
                          {item.originalName}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowMediaModal(false)}
                className="px-4.5 py-2 text-sm text-gray-600 hover:bg-gray-50 border border-gray-300 rounded-lg transition font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
