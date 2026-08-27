import React from 'react';

/**
 * API Base URL Helper
 */
export function getApiBase() {
  if (typeof window !== 'undefined') {
    return '';
  }
  return process.env.NEXT_PUBLIC_API_URL || '';
}

export function getServerApiBase() {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  const port = process.env.PORT || '3000';
  return `http://localhost:${port}`;
}

function formatCmsValue(val) {
  if (typeof val === 'string') {
    const hasHtml = /<[a-z][\s\S]*>/i.test(val);
    if (hasHtml) {
      return React.createElement('span', { dangerouslySetInnerHTML: { __html: val } });
    }

    val = val.replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x27;/ig, "'")
      .replace(/&nbsp;/g, ' ');
  }
  return val;
}

function cleanString(str) {
  if (!str || typeof str !== 'string') return '';
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function extractFilename(src) {
  if (!src) return '';
  if (typeof src === 'object' && src !== null) {
    src = src.src || '';
  }
  const str = String(src);
  const clean = str.split('?')[0].split('#')[0];
  const name = clean.split('/').pop() || '';
  return name.toLowerCase().replace(/\.[^.]+$/, '').replace(/[-_\.\d]/g, '');
}

export function isTargetingImage(originalValue) {
  if (!originalValue) return false;
  if (typeof originalValue === 'object' && originalValue !== null) return true;
  const str = String(originalValue).trim();
  if (str.startsWith('/images/') || str.startsWith('/img/') || str.startsWith('/assets/')) return true;
  if (/\.(png|jpe?g|webp|gif|svg|avif|ico)($|\?|#)/i.test(str)) return true;
  if (/^https?:\/\//i.test(str)) {
    if (/cloudinary\.com|googleusercontent\.com|unsplash\.com|imgur\.com|\/image\//i.test(str)) return true;
    if (/\.(png|jpe?g|webp|gif|svg|avif|ico)/i.test(str)) return true;
  }
  return false;
}

function isImageMatch(field, originalValue) {
  if (!field) return false;
  const isImg = field.type === 'image' || field.isImport || field.isJsImage || field.isInline || (typeof field.value === 'string' && /^https?:\/\/res\.cloudinary\.com/i.test(field.value));
  if (!isImg) return false;

  const rawOrig = typeof originalValue === 'object' && originalValue !== null ? originalValue.src : originalValue;

  if (field.originalValue === originalValue || field.originalValue === rawOrig) {
    return true;
  }

  const fieldFile = extractFilename(field.originalValue || field.value);
  const origFile = extractFilename(originalValue);

  if (fieldFile && origFile && (fieldFile.includes(origFile) || origFile.includes(fieldFile))) {
    return true;
  }

  return false;
}

// Dynamic CMS → Static Image Fallback Helper
export function getCmsVal(content, originalValue, sectionIdentifier) {
  let val = originalValue;
  const isImageReq = isTargetingImage(originalValue);

  if (content) {
    // 1. Direct fields object check
    if (content.fields && typeof content.fields === 'object') {
      for (const field of Object.values(content.fields)) {
        if (!field) continue;
        if (isImageReq) {
          if (isImageMatch(field, originalValue)) {
            if (field.value && typeof field.value === 'string' && field.value.trim() !== '') {
              return field.value;
            }
            break;
          }
        } else {
          if (field.type !== 'image' && (field.originalValue === originalValue || cleanString(field.originalValue) === cleanString(originalValue))) {
            if (field.value !== undefined && field.value !== null && field.value !== '') {
              return formatCmsValue(field.value);
            }
          }
        }
      }
    }

    // 2. Sections array check
    if (Array.isArray(content.sections)) {
      if (sectionIdentifier) {
        const targetId = String(sectionIdentifier).trim().toLowerCase();
        const matchedSection = content.sections.find(s => {
          const sId = (s.sectionId || '').toLowerCase();
          const sName = (s.sectionName || '').toLowerCase();
          return sId === targetId || sName === targetId || sId.includes(targetId) || sName.includes(targetId);
        });

        if (matchedSection && matchedSection.fields) {
          if (isImageReq) {
            // Match image field in target section
            for (const field of Object.values(matchedSection.fields)) {
              if (!field) continue;
              if (isImageMatch(field, originalValue)) {
                if (field.value && typeof field.value === 'string' && field.value.trim() !== '') {
                  return field.value;
                }
              }
            }
          } else {
            // Match text field in target section ONLY
            for (const field of Object.values(matchedSection.fields)) {
              if (!field || field.type === 'image' || (typeof field.value === 'string' && /^https?:\/\/res\.cloudinary\.com/i.test(field.value))) continue;
              if (field.originalValue === originalValue || cleanString(field.originalValue) === cleanString(originalValue)) {
                if (field.value !== undefined && field.value !== null && field.value !== '') {
                  return formatCmsValue(field.value);
                }
              }
            }
          }
        }
      }

      // Global fallback search across all sections
      if (isImageReq) {
        for (const section of content.sections) {
          for (const field of Object.values(section.fields || {})) {
            if (!field) continue;
            if (isImageMatch(field, originalValue)) {
              if (field.value && typeof field.value === 'string' && field.value.trim() !== '') {
                return field.value;
              }
            }
          }
        }
      } else {
        for (const section of content.sections) {
          for (const field of Object.values(section.fields || {})) {
            if (!field || field.type === 'image') continue;
            if (field.originalValue === originalValue || cleanString(field.originalValue) === cleanString(originalValue)) {
              if (field.value !== undefined && field.value !== null && field.value !== '') {
                return formatCmsValue(field.value);
              }
            }
          }
        }
      }
    }
  }

  // Return static fallback value
  if (isImageReq && typeof val === 'object' && val !== null) {
    return val.src || val;
  }
  return formatCmsValue(val);
}
