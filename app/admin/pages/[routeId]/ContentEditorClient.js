"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FiArrowLeft, FiSave, FiEye, FiFileText, FiChevronUp, FiChevronDown,
  FiTrash2, FiPlus, FiCheckCircle, FiAlertCircle, FiImage, FiLayers, FiSearch, FiRefreshCw, FiX, FiLink
} from 'react-icons/fi';

function stripCodeMarkup(text) {
  if (!text || typeof text !== 'string') return text || '';
  if (text.startsWith('/') || text.startsWith('http://') || text.startsWith('https://') || text.startsWith('data:image')) {
    return text;
  }
  return text
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/\{"([\s\S]*?)"\}/g, '$1')
    .replace(/\{'([\s\S]*?)'\}/g, '$1')
    .replace(/\{[\s\S]*?\}/g, '')
    .replace(/<span[^>]*>/gi, '')
    .replace(/<\/span>/gi, '')
    .replace(/<div[^>]*>/gi, '')
    .replace(/<\/div>/gi, '')
    .replace(/<h[1-6][^>]*>/gi, '')
    .replace(/<\/h[1-6]>/gi, '')
    .replace(/<p[^>]*>/gi, '')
    .replace(/<\/p>/gi, '')
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lsquo;/g, "'")
    .replace(/&rsquo;/g, "'");
}

function sanitizeSections(sections = []) {
  return (sections || []).map(sec => {
    const fields = {};
    for (const [k, f] of Object.entries(sec.fields || {})) {
      fields[k] = {
        ...f,
        value: f.type === 'image' || f.type === 'url' || f.type === 'json' ? f.value : stripCodeMarkup(f.value),
        originalValue: f.type === 'image' || f.type === 'url' || f.type === 'json' ? f.originalValue : stripCodeMarkup(f.originalValue),
      };
    }
    return { ...sec, fields };
  });
}

export default function ContentEditorClient({ initialContent, routeId, routePath, apiBase }) {
  const [content, setContent] = useState(() => {
    if (!initialContent) return { sections: [], status: 'draft', version: 1 };
    return {
      ...initialContent,
      sections: sanitizeSections(initialContent.sections),
    };
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [expandedSections, setExpandedSections] = useState(new Set([0]));
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);

  // Add Section & Add Field States
  const [addingFieldToSection, setAddingFieldToSection] = useState(null);
  const [newFieldType, setNewFieldType] = useState('text');
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newSectionTemplate, setNewSectionTemplate] = useState('custom');
  const [newSectionName, setNewSectionName] = useState('');

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

  const handleAddSection = (templateKey, customName) => {
    if (!canEditContent) return;
    const key = templateKey || newSectionTemplate;
    const name = (customName || newSectionName).trim() || 'New Section';

    let templateFields = {};
    if (key === 'hero') {
      templateFields = {
        badge: { type: 'text', value: 'WELCOME TO OUR AGENCY', label: 'Eyebrow Badge' },
        heading: { type: 'text', tag: 'h1', value: 'Transforming Digital Visions into Scalable Realities', label: 'Main Headline' },
        description: { type: 'richtext', value: 'Delivering world-class software engineering and enterprise digital growth.', label: 'Description' },
        ctaText: { type: 'text', value: 'Get Started', label: 'CTA Button Text' },
        heroImage: { type: 'image', value: '', label: 'Hero Image / Graphic', alt: '', title: '' }
      };
    } else if (key === 'about') {
      templateFields = {
        badge: { type: 'text', value: 'ABOUT US', label: 'Badge' },
        heading: { type: 'text', tag: 'h2', value: 'Who We Are & What We Do', label: 'Heading' },
        description: { type: 'richtext', value: 'Experienced engineering team dedicated to client success.', label: 'Description' },
        image: { type: 'image', value: '', label: 'About Image', alt: '', title: '' }
      };
    } else if (key === 'services') {
      templateFields = {
        badge: { type: 'text', value: 'OUR SERVICES', label: 'Badge' },
        heading: { type: 'text', tag: 'h2', value: 'End-to-End Digital Solutions', label: 'Heading' },
        description: { type: 'richtext', value: 'Comprehensive engineering services customized to your needs.', label: 'Description' }
      };
    } else if (key === 'faq') {
      templateFields = {
        heading: { type: 'text', tag: 'h2', value: 'Frequently Asked Questions', label: 'Heading' },
        q1: { type: 'text', value: 'How do we start working together?', label: 'Question 1' },
        a1: { type: 'richtext', value: 'Contact our team for a free discovery consultation.', label: 'Answer 1' },
        q2: { type: 'text', value: 'What technologies do you support?', label: 'Question 2' },
        a2: { type: 'richtext', value: 'We specialize in React, Next.js, Node.js, Python, Mobile, and Cloud Architectures.', label: 'Answer 2' }
      };
    } else {
      templateFields = {
        heading: { type: 'text', tag: 'h2', value: name, label: 'Section Title' },
        description: { type: 'richtext', value: 'Section content goes here...', label: 'Content Paragraph' },
        image: { type: 'image', value: '', label: 'Section Image / Media', alt: '', title: '' }
      };
    }

    const uniqueId = `sec_${Date.now()}`;
    const newSection = {
      sectionId: uniqueId,
      sectionName: name,
      order: content.sections.length + 1,
      fields: templateFields
    };

    const newSections = [...content.sections, newSection];
    setContent({ ...content, sections: newSections });
    setExpandedSections(prev => new Set([...prev, newSections.length - 1]));
    setShowTemplateModal(false);
    setNewSectionName('');
    setMessage(`Section "${name}" added! Click Publish when ready.`);
    setMessageType('success');
    setTimeout(() => setMessage(''), 4000);
  };

  const handleAddField = (sectionIndex) => {
    if (!canEditContent) return;
    const label = newFieldLabel.trim() || (newFieldType === 'image' ? 'Image / Logo' : 'Text Content');
    const fieldKey = `fld_${newFieldType}_${Date.now()}`;

    let newFieldObj = {
      type: newFieldType === 'paragraph' ? 'richtext' : (newFieldType === 'image' ? 'image' : 'text'),
      value: '',
      label,
    };
    if (newFieldType === 'heading') {
      newFieldObj.tag = 'h2';
    }
    if (newFieldType === 'image') {
      newFieldObj.alt = '';
      newFieldObj.title = '';
    }

    const newSections = [...content.sections];
    const sec = { ...newSections[sectionIndex] };
    sec.fields = { ...(sec.fields || {}), [fieldKey]: newFieldObj };
    newSections[sectionIndex] = sec;
    setContent({ ...content, sections: newSections });
    setAddingFieldToSection(null);
    setNewFieldLabel('');
    setMessage(`Field "${label}" added to section!`);
    setMessageType('success');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDeleteField = (sectionIndex, fieldKey) => {
    if (!canEditContent) return;
    if (confirm('Delete this field?')) {
      const newSections = [...content.sections];
      const sec = { ...newSections[sectionIndex] };
      const fields = { ...sec.fields };
      delete fields[fieldKey];
      sec.fields = fields;
      newSections[sectionIndex] = sec;
      setContent({ ...content, sections: newSections });
    }
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
        sections: sanitizeSections(content.sections),
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
            {canEditContent && (
              <button
                type="button"
                onClick={() => handleDeleteField(sectionIndex, fieldKey)}
                className="text-gray-400 hover:text-red-600 p-1 rounded transition cursor-pointer"
                title="Delete Field"
              >
                <FiTrash2 size={13} />
              </button>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <input
              disabled={!canEditContent}
              type="url"
              value={field.value || ''}
              onChange={(e) => updateField(sectionIndex, fieldKey, 'value', e.target.value)}
              placeholder="Image URL (e.g., https://res.cloudinary.com/...)"
              className={`flex-1 rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 shadow-2xs
                         focus:border-[#20507C] focus:ring-2 focus:ring-[#34953C] focus:outline-none transition text-sm ${!canEditContent ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
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
                         focus:border-[#20507C] focus:ring-2 focus:ring-[#34953C] focus:outline-none transition ${!canEditContent ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
            />
            <input
              disabled={!canEditContent}
              type="text"
              value={field.title || ''}
              onChange={(e) => updateField(sectionIndex, fieldKey, 'title', e.target.value)}
              placeholder="Title attribute"
              className={`rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 placeholder-gray-400 text-sm
                         focus:border-[#20507C] focus:ring-2 focus:ring-[#34953C] focus:outline-none transition ${!canEditContent ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
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
          <div className="flex items-center gap-2">
            {isRich && canEditContent && (
              <button
                type="button"
                onClick={() => handleOpenLinkModal(sectionIndex, fieldKey, field.value || '')}
                className="text-xs font-semibold text-[#20507C] hover:text-[#34953C] flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 transition cursor-pointer"
              >
                <FiLink size={12} /> Add Link
              </button>
            )}
            {canEditContent && (
              <button
                type="button"
                onClick={() => handleDeleteField(sectionIndex, fieldKey)}
                className="text-gray-400 hover:text-red-600 p-1 rounded transition cursor-pointer"
                title="Delete Field"
              >
                <FiTrash2 size={13} />
              </button>
            )}
          </div>
        </div>

        {isRich ? (
          <div>
            <textarea
              id={`input-${sectionIndex}-${fieldKey}`}
              disabled={!canEditContent}
              value={stripCodeMarkup(field.value || '')}
              onChange={(e) => updateField(sectionIndex, fieldKey, 'value', e.target.value)}
              placeholder={`Enter ${label.toLowerCase()}...`}
              rows={4}
              className={`w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 shadow-2xs
                         focus:border-[#20507C] focus:ring-2 focus:ring-[#34953C] focus:outline-none transition text-sm
                         ${!canEditContent ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            />
          </div>
        ) : (
          <div>
            <textarea
              id={`input-${sectionIndex}-${fieldKey}`}
              disabled={!canEditContent}
              value={stripCodeMarkup(field.value || '')}
              onChange={(e) => updateField(sectionIndex, fieldKey, 'value', e.target.value)}
              placeholder={`Enter ${label.toLowerCase()}...`}
              rows={2}
              className={`w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 shadow-2xs
                         focus:border-[#20507C] focus:ring-2 focus:ring-[#34953C] focus:outline-none transition text-sm ${!canEditContent ? 'bg-gray-50 cursor-not-allowed' : ''}`}
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
        <div className="flex items-center gap-2 flex-wrap">
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
                type="button"
                onClick={() => setShowTemplateModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm bg-emerald-50 text-[#34953C] hover:bg-emerald-100 border border-emerald-300 rounded-md font-bold transition cursor-pointer"
              >
                <FiPlus size={14} /> Add Section
              </button>
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
                    : 'bg-[#34953C] hover:bg-[#34953C]'}`}
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
          {canEditContent && (
            <button
              type="button"
              onClick={() => setShowTemplateModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#34953C] text-white rounded-md text-sm font-bold hover:bg-[#2e8234] transition cursor-pointer"
            >
              <FiPlus size={16} /> Add First Section
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {content.sections.map((section, index) => (
            <div key={`${section.sectionId || 'section'}-${index}`} className="bg-white rounded-lg shadow-2xs overflow-hidden border border-gray-200">
              {/* Section Header */}
              <div
                className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 cursor-pointer"
                onClick={() => toggleSection(index)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono bg-[#34953C] text-white px-2 py-0.5 rounded">{index + 1}</span>
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

                  {/* Add Field To Section */}
                  {canEditContent && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      {addingFieldToSection === index ? (
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                          <p className="text-xs font-bold text-gray-700">Add Field to &quot;{section.sectionName}&quot;</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs font-semibold text-gray-600 mb-1">Field Type</label>
                              <select
                                value={newFieldType}
                                onChange={(e) => setNewFieldType(e.target.value)}
                                className="w-full text-xs rounded border border-gray-300 p-1.5 bg-white text-gray-800"
                              >
                                <option value="text">Single-line Text</option>
                                <option value="heading">Heading (H2)</option>
                                <option value="paragraph">Paragraph / Rich Text</option>
                                <option value="image">Image / Logo</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-gray-600 mb-1">Field Label</label>
                              <input
                                type="text"
                                value={newFieldLabel}
                                onChange={(e) => setNewFieldLabel(e.target.value)}
                                placeholder="e.g. Subtitle, Card Title, Partner Logo..."
                                className="w-full text-xs rounded border border-gray-300 p-1.5 bg-white text-gray-800"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => { setAddingFieldToSection(null); setNewFieldLabel(''); }}
                              className="px-2.5 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100 text-gray-600 cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAddField(index)}
                              className="px-3 py-1 text-xs bg-[#34953C] text-white rounded font-bold hover:bg-[#2e8234] cursor-pointer"
                            >
                              Add Field
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => { setAddingFieldToSection(index); setNewFieldLabel(''); }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#20507C] hover:text-[#34953C] py-1.5 px-3 rounded border border-gray-200 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                        >
                          <FiPlus size={12} /> Add Field to Section
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Add Section Action Button */}
          {canEditContent && (
            <button
              type="button"
              onClick={() => setShowTemplateModal(true)}
              className="w-full py-3.5 border-2 border-dashed border-gray-300 hover:border-[#34953C] rounded-lg text-sm font-bold text-gray-600 hover:text-[#34953C] flex items-center justify-center gap-2 bg-white transition shadow-2xs cursor-pointer"
            >
              <FiPlus size={16} /> Add New Content Section
            </button>
          )}
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
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#34953C] hover:bg-[#34953C]'}`}
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
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#20507C] focus:ring-2 focus:ring-[#34953C] focus:outline-none transition text-sm"
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

      {/* Add Section Template Modal */}
      {showTemplateModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50"
          onClick={() => setShowTemplateModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full mx-4 border border-gray-100 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTemplateModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition cursor-pointer"
            >
              <FiX size={18} />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 rounded-lg bg-emerald-50 text-[#34953C]">
                <FiPlus size={20} />
              </span>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Add Content Section</h3>
                <p className="text-xs text-gray-500">Choose a section template or create a custom section.</p>
              </div>
            </div>

            {/* Template options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              <div
                onClick={() => handleAddSection('hero')}
                className="p-4 rounded-lg border border-gray-200 hover:border-[#34953C] hover:bg-emerald-50/40 cursor-pointer transition flex flex-col group"
              >
                <span className="text-sm font-bold text-gray-800 group-hover:text-[#34953C] flex items-center justify-between">
                  Hero Banner <span className="text-xs text-emerald-600">Preset →</span>
                </span>
                <p className="text-xs text-gray-500 mt-1">Heading, subtitle, paragraph, CTA buttons, and hero image/media.</p>
              </div>

              <div
                onClick={() => handleAddSection('about')}
                className="p-4 rounded-lg border border-gray-200 hover:border-[#34953C] hover:bg-emerald-50/40 cursor-pointer transition flex flex-col group"
              >
                <span className="text-sm font-bold text-gray-800 group-hover:text-[#34953C] flex items-center justify-between">
                  About & Story <span className="text-xs text-emerald-600">Preset →</span>
                </span>
                <p className="text-xs text-gray-500 mt-1">Section heading, story description, quote, and spotlight image.</p>
              </div>

              <div
                onClick={() => handleAddSection('services')}
                className="p-4 rounded-lg border border-gray-200 hover:border-[#34953C] hover:bg-emerald-50/40 cursor-pointer transition flex flex-col group"
              >
                <span className="text-sm font-bold text-gray-800 group-hover:text-[#34953C] flex items-center justify-between">
                  Features & Services <span className="text-xs text-emerald-600">Preset →</span>
                </span>
                <p className="text-xs text-gray-500 mt-1">Section heading, sub-headings, service features and description.</p>
              </div>

              <div
                onClick={() => handleAddSection('faq')}
                className="p-4 rounded-lg border border-gray-200 hover:border-[#34953C] hover:bg-emerald-50/40 cursor-pointer transition flex flex-col group"
              >
                <span className="text-sm font-bold text-gray-800 group-hover:text-[#34953C] flex items-center justify-between">
                  FAQ Section <span className="text-xs text-emerald-600">Preset →</span>
                </span>
                <p className="text-xs text-gray-500 mt-1">FAQ heading with question and answer pairs.</p>
              </div>
            </div>

            {/* Custom section input */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Or Create Custom Section</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  placeholder="e.g. Partner Logos, Case Studies, Testimonials..."
                  className="flex-1 text-sm rounded-lg border border-gray-300 px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#34953C]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newSectionName.trim()) {
                      handleAddSection('custom', newSectionName.trim());
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newSectionName.trim()) {
                      handleAddSection('custom', newSectionName.trim());
                    }
                  }}
                  disabled={!newSectionName.trim()}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition ${
                    newSectionName.trim()
                      ? 'bg-[#34953C] text-white hover:bg-[#2e8234] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Create
                </button>
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <button
                type="button"
                onClick={() => setShowTemplateModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
