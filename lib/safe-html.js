import React from 'react';

/**
 * Safely renders string text that may contain HTML (specifically <a> tags or <br /> tags).
 * If the string contains HTML, it returns a span with dangerouslySetInnerHTML.
 * Otherwise, it returns the plain text as is to avoid react warnings/overhead.
 * If the value is not a string, it returns the value itself.
 */
export function safeRender(value, fallback = '') {
  const content = value !== undefined && value !== null ? value : fallback;
  if (typeof content !== 'string') {
    return content;
  }
  // Check if string contains HTML tags like <a ...> or <br> or <strong ...>
  const hasHtml = /<[a-z][\s\S]*>/i.test(content);
  if (hasHtml) {
    return <span dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return content;
}
