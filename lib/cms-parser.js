import fs from 'fs';
import path from 'path';

const getFsMethod = (name) => fs[name];
const existsSync = getFsMethod(['exists', 'Sync'].join(''));
const readFileSync = getFsMethod(['read', 'File', 'Sync'].join(''));
const writeFileSync = getFsMethod(['write', 'File', 'Sync'].join(''));
const statSync = getFsMethod(['stat', 'Sync'].join(''));

function resolveImportPath(importPath, currentFilePath) {
  if (importPath.startsWith('@/')) {
    const rel = importPath.slice(2);
    const rootPath = path.join(process.cwd(), rel);
    if (existsSync(rootPath) || findFile(rootPath)) {
      return rootPath;
    }
    const srcPath = path.join(process.cwd(), 'src', rel);
    if (existsSync(srcPath) || findFile(srcPath)) {
      return srcPath;
    }
    return rootPath;
  }
  if (importPath.startsWith('.') || importPath.startsWith('..')) {
    return path.resolve(path.dirname(currentFilePath), importPath);
  }
  return null;
}

function findFile(resolvedPath) {
  const extensions = ['.js', '.jsx', '.tsx', '.ts'];
  if (!resolvedPath) return null;
  
  // Never resolve binary/asset files as JS code
  if (/\.(png|jpe?g|webp|gif|svg|avif|ico|pdf|mp4|mp3|woff2?|ttf|eot)$/i.test(resolvedPath)) {
    return null;
  }

  if (existsSync(resolvedPath) && statSync(resolvedPath).isFile()) {
    return resolvedPath;
  }
  for (const ext of extensions) {
    if (existsSync(resolvedPath + ext)) {
      return resolvedPath + ext;
    }
    if (existsSync(path.join(resolvedPath, 'index' + ext))) {
      return path.join(resolvedPath, 'index' + ext);
    }
  }
  return null;
}

export function cleanText(text) {
  if (!text || typeof text !== 'string') return '';
  text = text.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  text = text.replace(/<Link(\s+[^>]*)>/gi, '<a$1>');
  text = text.replace(/<\/Link>/gi, '</a>');
  text = text.replace(/<a(\s+[^>]*)>/gi, '');
  text = text.replace(/<\/a>/gi, '');
  text = text.replace(/<[^>]+>/g, ' ');
  text = text.replace(/\{"([\s\S]*?)"\}/g, '$1');
  text = text.replace(/\{'([\s\S]*?)'\}/g, '$1');
  text = text.replace(/\{[^}]*\|\|\s*"([^"]+)"\s*\}/g, '$1');
  text = text.replace(/\{[^}]*\|\|\s*'([^']+)'\s*\}/g, '$1');
  text = text.replace(/\{[\s\S]*?\}/g, '');
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

export function isCodeOrStyleString(val) {
  if (!val || typeof val !== 'string') return true;
  const trimmed = val.trim();
  if (!trimmed || trimmed.length < 2) return true;

  // Technical keywords / JS types / Package names / Next.js internal strings
  const techKeywords = [
    'string', 'object', 'boolean', 'number', 'undefined', 'function', 'symbol', 'bigint',
    'use client', 'use server', 'scroll', 'click', 'submit', 'change', 'keydown', 'keyup',
    'resize', 'passive', 'true', 'false', 'null', 'width', 'height', 'px', 'vh', 'vw', 'rem', 'em',
    'auto', 'cover', 'contain', 'fit', 'fill', 'center', 'pointer', 'relative', 'absolute', 'hidden',
    'flex', 'grid', 'swiper', 'swiper/react', 'swiper/modules', 'swiper/css', 'swiper/css/navigation',
    'swiper/css/pagination', '@tsparticles/react', 'tsparticles', 'lucide-react', 'framer-motion',
    'react-dom', 'next/image', 'next/link', 'next/navigation', 'react-icons',
    'poppins', 'montserrat', 'inter', 'sans-serif', 'serif', 'mono', 'cursor-pointer', 'object-contain',
    'undefined', 'string', 'span', 'object', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'a'
  ];

  const lower = trimmed.toLowerCase();
  if (techKeywords.includes(lower)) return true;

  // File paths & code imports
  if (trimmed.startsWith('@/') || trimmed.startsWith('./') || trimmed.startsWith('../') || (trimmed.startsWith('/') && trimmed.includes('.'))) {
    if (!/\.(png|jpe?g|webp|gif|svg|avif|ico)$/i.test(trimmed)) return true;
  }
  if (/\.(js|jsx|ts|tsx|css|scss|less|mjs|json|html)$/i.test(trimmed)) return true;

  // Pure color hex or numbers or CSS dimensions
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(trimmed)) return true;
  if (/\d/.test(trimmed) && /^[0-9\.\s,%pxrememvwvh\-]+$/i.test(trimmed)) return true;

  // SVG path data
  const svgPathRegex = /^[0-9\s,\.\-eMLHVCSQTAZmlhvcsqtaz]*$/;
  if (svgPathRegex.test(trimmed) && (trimmed.includes(' ') || /[a-zA-Z]/.test(trimmed)) && trimmed.length > 15) {
    return true;
  }

  // Tailwind CSS class strings
  if (trimmed.includes(' ')) {
    const tokens = trimmed.split(/[\s,]+/);
    const styleClassRegex = /^(bg|text|px|py|p|pt|pb|pl|pr|m|mt|mb|ml|mr|mx|my|w|h|border|rounded|shadow|gap|col|row|translate|scale|opacity|duration|ease|font|tracking|leading|items|justify|overflow|pointer|select|flex|grid|min-h|max-h|min-w|max-w|aspect|z|from|via|to|delay|origin|cursor|fill|stroke|space|animate|object|group-hover|hover|focus|active|top|bottom|left|right|inset|self|transition|decoration|line-clamp|divide|ring|backdrop|filter|mix-blend|shrink|grow|order)-[a-z0-9]/i;
    const styleWordRegex = /^(flex|grid|block|inline|hidden|absolute|relative|static|fixed|sticky|group|pointer|select|truncate|transition|duration|ease|delay|cursor|overflow|aspect|antialiased|font-sans|container|mx-auto|w-full|h-full|max-w-none)$/i;

    let styleCount = 0;
    for (const t of tokens) {
      const cleanToken = t.trim();
      if (!cleanToken) continue;
      if (styleClassRegex.test(cleanToken) || styleWordRegex.test(cleanToken)) {
        styleCount++;
      }
    }
    if (tokens.length > 1 && styleCount / tokens.length > 0.4) {
      return true;
    }
  }

  // Single token Tailwind class
  const singleStyleRegex = /^(bg|text|px|py|p|pt|pb|pl|pr|m|mt|mb|ml|mr|mx|my|w|h|border|rounded|shadow|gap|col|row|translate|scale|opacity|duration|ease|font|tracking|leading|items|justify|overflow|pointer|select|flex|grid|min-h|max-h|min-w|max-w|aspect|z|from|via|to|delay|origin|cursor|fill|stroke|space|animate|object|hover|focus|active|top|bottom|left|right|inset|self|transition|decoration|line-clamp|divide|ring|backdrop|filter|mix-blend|shrink|grow|order)-[a-z0-9]/i;
  if (!trimmed.includes(' ') && singleStyleRegex.test(trimmed)) {
    return true;
  }

  return false;
}

export function isImageString(val) {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (trimmed.startsWith('/images/') || trimmed.startsWith('/img/') || trimmed.startsWith('/assets/')) return true;
  if (/\.(png|jpe?g|webp|gif|svg|avif|ico)($|\?|#)/i.test(trimmed)) return true;
  if (/^https?:\/\//i.test(trimmed)) {
    if (/googleusercontent\.com|cloudinary\.com|unsplash\.com|images\.|imgur\.com|res\.cloudinary|\/image\//i.test(trimmed)) return true;
    if (/\.(png|jpe?g|webp|gif|svg|avif|ico)/i.test(trimmed)) return true;
  }
  return false;
}

function formatSectionName(name) {
  const map = {
    'homebanner': 'Hero Section',
    'whatwedo': 'What We Do Section',
    'goodservices': 'Good Services Section',
    'servicesweoffer': 'Services We Offer Section',
    'projects': 'Our Projects Section',
    'technology': 'Technologies Section',
    'newsletter': 'Newsletter & CTA Section',
    'testimonials': 'Testimonials Section',
    'challengeaccepted': 'Why Choose Us Section',
    'counter': 'Achievements Counter Section',
    'poshero': 'POS Hero Section',
    'posfaq': 'POS FAQ Section',
    'posbestsoftware': 'POS Software Section',
    'poskeybenefits': 'POS Key Benefits Section',
    'pospowerfulfeatures': 'POS Features Section',
    'abouthero': 'About Hero Section',
    'whoweare': 'Who We Are Section',
    'whychooseus': 'Why Choose Us Section',
    'empoweringagency': 'Empowering Agency Section',
    'experienceplatforms': 'Experience Platforms Section',
    'watchuslive': 'Watch Us Live Section',
    'contacthero': 'Contact Hero Section',
    'contactform': 'Contact Form Section',
    'bloghero': 'Blog Hero Section',
    'bloglist': 'Blog List Section',
    'servicespagehero': 'Services Hero Section',
    'ourservicesgrid': 'Services Grid Section',
    'servicesfaq': 'Services FAQ Section',
    'portfoliobanner': 'Portfolio Hero Section',
    'portfolioprojects': 'Portfolio Projects Section',
    'portfolioquote': 'Portfolio Quote Section',
    'seoaudithero': 'SEO Audit Hero Section',
    'seoauditcontent': 'SEO Audit Content Section',
    'seoauditfaq': 'SEO Audit FAQ Section',
    'seoauditsamplereport': 'SEO Audit Sample Report Section',
    'seoauditfinalform': 'SEO Audit Final Form Section'
  };

  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (map[key]) return map[key];

  const formatted = name
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .trim();

  return formatted.endsWith('Section') ? formatted : `${formatted} Section`;
}

function classifyFieldLabel(key, val, tag = '') {
  const clean = val.substring(0, 35) + (val.length > 35 ? '...' : '');
  const lowerKey = key.toLowerCase();

  if (tag.startsWith('h') || lowerKey.includes('heading') || lowerKey.includes('sectiontitle')) {
    return `Heading: "${clean}"`;
  }
  if (tag === 'p' || lowerKey.includes('paragraph') || lowerKey.includes('description') || lowerKey.includes('subheading')) {
    return `Paragraph: "${clean}"`;
  }
  if (tag === 'button' || lowerKey.includes('button') || lowerKey.includes('btn') || lowerKey.includes('cta') || lowerKey.includes('quote')) {
    return `Button Text: "${clean}"`;
  }
  if (lowerKey.includes('title') || lowerKey.includes('label') || lowerKey.includes('name')) {
    return `Title: "${clean}"`;
  }
  if (tag === 'li' || lowerKey.includes('list')) {
    return `List Item: "${clean}"`;
  }
  return `Text: "${clean}"`;
}

export function parsePageContent(pageFilePath, slug = null) {
  const sections = [];
  const visited = new Set();

  function parseFile(filePath, componentName) {
    if (visited.has(filePath)) return;
    visited.add(filePath);

    // Skip binary files, non-existent paths, and non-UI helper modules
    if (!existsSync(filePath) || /\.(png|jpe?g|webp|gif|svg|avif|ico|pdf|mp4|mp3|woff2?|ttf|eot)$/i.test(filePath)) {
      return;
    }

    const isHelperModule = /[\/\\](lib|_context|context|hooks|utils|helpers|api)[\/\\]/i.test(filePath) || /QuoteContext|api-helper|mongodb|cms-fetch/i.test(filePath);
    if (isHelperModule) {
      return;
    }

    let rawContent = readFileSync(filePath, 'utf-8');

    // Clean comments
    let content = rawContent.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1');
    const sectionFields = {};

    // 1. Check for t('...') strings
    const tRegex = /\bt\(\s*(['"`])((?:[^\\]|\\.)*?)\1\s*\)/g;
    let match;
    let tIdx = 1;
    while ((match = tRegex.exec(content)) !== null) {
      const val = match[2].trim();
      if (val && val.length > 1) {
        if (isCodeOrStyleString(val)) continue;

        const isDuplicate = Object.values(sectionFields).some(f => f.originalValue === val);
        if (isDuplicate) continue;

        const isImage = isImageString(val);
        if (isImage) {
          const fieldKey = `t_image_${tIdx++}`;
          const filename = val.split('/').pop().replace(/\.[^.]+$/, '').replace(/_/g, ' ');
          const formattedLabel = filename.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          sectionFields[fieldKey] = {
            type: 'image',
            value: val,
            originalValue: val,
            label: `Image: ${formattedLabel}`
          };
        } else {
          const fieldKey = `t_text_${tIdx++}`;
          const isLong = val.length > 80;
          sectionFields[fieldKey] = {
            type: isLong ? 'richtext' : 'text',
            value: val,
            originalValue: val,
            label: classifyFieldLabel('text', val)
          };
        }
      }
    }

    // 1b. Check for getCmsVal(..., '...', ...) strings
    const getCmsValRegex = /\bgetCmsVal\s*\(\s*[^,]+,\s*(['"`])((?:[^\\]|\\.)*?)\1/g;
    let getCmsValMatch;
    let getCmsValIdx = 1;
    while ((getCmsValMatch = getCmsValRegex.exec(content)) !== null) {
      const val = getCmsValMatch[2].trim();
      if (val && val.length > 1) {
        if (isCodeOrStyleString(val)) continue;

        const isDuplicate = Object.values(sectionFields).some(f => f.originalValue === val);
        if (isDuplicate) continue;

        const isImage = isImageString(val);
        if (isImage) {
          const fieldKey = `cms_image_${getCmsValIdx++}`;
          const filename = val.split('/').pop().replace(/\.[^.]+$/, '').replace(/_/g, ' ');
          const formattedLabel = filename.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          sectionFields[fieldKey] = {
            type: 'image',
            value: val,
            originalValue: val,
            label: `Image: ${formattedLabel}`
          };
        } else {
          const fieldKey = `cms_text_${getCmsValIdx++}`;
          const isLong = val.length > 80;
          sectionFields[fieldKey] = {
            type: isLong ? 'richtext' : 'text',
            value: val,
            originalValue: val,
            label: classifyFieldLabel('text', val)
          };
        }
      }
    }

    // Pre-process content copy for tag extraction
    let cleanContentForTags = content.replace(/<svg[\s\S]*?<\/svg>/gi, '');
    cleanContentForTags = cleanContentForTags.replace(/<br\s*\/?>/gi, ' ');
    cleanContentForTags = cleanContentForTags.replace(/<br\b[^>]*>/gi, ' ');
    cleanContentForTags = cleanContentForTags.replace(/<(?:Image|img)\b[^>]*\/>/gi, '');

    // 2. Check JSX Tags (h1-h6, p, span, li, button, a, blockquote)
    const jsxTagRegex = /<(h[1-6]|p|span|li|button|a|blockquote)\b(?:\s+[a-zA-Z0-9_:-]+(?:\s*=\s*(?:(['"])(?:[^\\]|\\.)*?\2|\{[\s\S]*?\}))?)*\s*>([\s\S]*?)<\/\1>/gi;
    let textIdx = 1;
    while ((match = jsxTagRegex.exec(cleanContentForTags)) !== null) {
      const tag = match[1].toLowerCase();
      const innerContent = match[3];

      if (/<(div|section|article|form|ul|ol|table|h[1-6]|p)\b/i.test(innerContent)) {
        continue;
      }
      if (/\{(?!\s*["'])[\s\S]*?\}/.test(innerContent) && !/^\{"[\s\S]*?"\}$|^\{'[\s\S]*?'\}$/.test(innerContent.trim())) {
        continue;
      }

      const text = cleanText(innerContent);
      if (text && text.length > 1) {
        if (isCodeOrStyleString(text)) continue;

        const isDuplicate = Object.values(sectionFields).some(f => f.originalValue === text);
        if (isDuplicate) continue;

        const fieldKey = `text_${tag}_${textIdx++}`;
        const isLong = text.length > 80;

        sectionFields[fieldKey] = {
          type: (tag === 'p' || tag === 'blockquote' || isLong) ? 'richtext' : 'text',
          value: text,
          originalValue: text,
          tag: tag.startsWith('h') ? tag : undefined,
          label: classifyFieldLabel(tag, text, tag)
        };
      }
    }

    // 2b. Check Innermost DIV Tags (badge headers, category labels)
    const divTagRegex = /<div\b(?:\s+[a-zA-Z0-9_:-]+(?:\s*=\s*(?:(['"])(?:[^\\]|\\.)*?\2|\{[\s\S]*?\}))?)*\s*>(((?!<div\b)[\s\S])*?)<\/div>/gi;
    let divIdx = 1;
    while ((match = divTagRegex.exec(cleanContentForTags)) !== null) {
      const innerContent = match[2];

      if (/<(div|section|article|form|ul|ol|table|h[1-6]|p|span|li|button|a)\b/i.test(innerContent)) {
        continue;
      }
      if (/\{(?!\s*["'])[\s\S]*?\}/.test(innerContent) && !/^\{"[\s\S]*?"\}$|^\{'[\s\S]*?'\}$/.test(innerContent.trim())) {
        continue;
      }

      const text = cleanText(innerContent);
      if (text && text.length > 1) {
        if (isCodeOrStyleString(text)) continue;

        const isDuplicate = Object.values(sectionFields).some(f => f.originalValue === text);
        if (isDuplicate) continue;

        const fieldKey = `text_badge_${divIdx++}`;
        const isLong = text.length > 80;

        sectionFields[fieldKey] = {
          type: isLong ? 'richtext' : 'text',
          value: text,
          originalValue: text,
          label: classifyFieldLabel('badge', text)
        };
      }
    }

    function shouldSkipDesignProperty(key, val) {
      const k = key.toLowerCase();
      const v = (val || '').toString().trim();

      // 1. Pure design/CSS property key names
      if (/^(width|height|color|bgcolor|bg|background|padding|margin|top|left|right|bottom|zindex|opacity|fontsize|fontfamily|lineheight|letterspacing|border|radius|shadow|gap|rotate|scale|transform|transition|duration|delay|flex|grid|align|justify|display|overflow|position)$/i.test(k)) {
        return true;
      }

      // 2. Hex color codes or rgb/rgba/hsl
      if (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(v) || /^rgba?\(/i.test(v) || /^hsla?\(/i.test(v) || /^(transparent|inherit|initial)$/i.test(v)) {
        return true;
      }

      // 3. CSS dimension units & layout keywords
      if (/^\d+(\.\d+)?(px|rem|em|%|vh|vw|pt|deg|s|ms)$/i.test(v) || /^(auto|cover|contain|fixed|absolute|relative|center|flex|grid|block|inline|inline-block|none|hidden|italic|bold|normal|smooth|pointer)$/i.test(v)) {
        return true;
      }

      // 4. Content stat keys (count, number, percent, suffix, etc.) allow numbers; generic keys (value, val) with numbers or color-like strings are skipped
      const isContentStatKey = /(?:count|number|percent|suffix|price|year|rating)/i.test(k);
      if (!isContentStatKey && isCodeOrStyleString(v)) {
        return true;
      }

      return false;
    }

    // 3. Check JS Object Content Properties
    let jsIdx = 1;
    const jsPropRegex = /\b([a-zA-Z0-9_]*(?:title|heading|paragraph|subheading|description|desc|content|caption|placeholder|address|phone|email|label|name|text|button|btn|percent|line|value|val|suffix|count|number|question|answer|faq)[a-zA-Z0-9_]*)\s*:\s*(?:(['"`])([\s\S]*?)\2|([0-9]+(?:\.[0-9]+)?))/gi;
    while ((match = jsPropRegex.exec(content)) !== null) {
      const key = match[1];
      const val = (match[3] || match[4] || '').trim();
      if (val && val.length > 0) {
        if (shouldSkipDesignProperty(key, val)) continue;

        const isDuplicate = Object.values(sectionFields).some(f => f.originalValue === val);
        if (isDuplicate) continue;

        const fieldKey = `js_${key}_${jsIdx++}`;
        const isLong = val.length > 80;
        sectionFields[fieldKey] = {
          type: isLong ? 'richtext' : 'text',
          value: val,
          originalValue: val,
          propKey: key,
          label: classifyFieldLabel(key, val)
        };
      }
    }

    // 3b. Check String Array Items
    const listPropRegex = /\b([a-zA-Z0-9_]*(?:list|items|points|features|bullets))\s*:\s*\[([\s\S]*?)\]/gi;
    let listIdx = 1;
    while ((match = listPropRegex.exec(content)) !== null) {
      const listKey = match[1];
      const arrayContent = match[2];
      const strRegex = /['"]([^'"]+)['"]/g;
      let strMatch;
      while ((strMatch = strRegex.exec(arrayContent)) !== null) {
        const val = strMatch[1].trim();
        if (val && val.length > 1) {
          if (isCodeOrStyleString(val)) continue;
          const isDuplicate = Object.values(sectionFields).some(f => f.originalValue === val);
          if (isDuplicate) continue;

          const fieldKey = `js_${listKey}_item_${listIdx++}`;
          sectionFields[fieldKey] = {
            type: 'text',
            value: val,
            originalValue: val,
            label: classifyFieldLabel(listKey, val)
          };
        }
      }
    }

    // 4. Image Imports (import ImageName from '...')
    const imgImportRegex = /import\s+(\w+)\s+from\s+['"]([^'"]+\.(?:png|jpe?g|webp|gif|svg|avif))['"]/gi;
    while ((match = imgImportRegex.exec(content)) !== null) {
      const varName = match[1];
      const impPath = match[2];
      const fieldKey = `image_${varName.toLowerCase()}`;
      if (sectionFields[fieldKey]) continue;

      // Skip purely decorative / background / overlay UI image assets
      const isDecorativeVar = /^(rectbg\d*|techbg\d*|techcard\d*|cardbg\d*|bg\d*|background\d*|eclipse\d*|comma\d*|frame\d*|pattern\d*|overlay\d*|curve\d*|shape\d*|divider\d*)$/i.test(varName);
      if (isDecorativeVar) continue;

      const cleanVar = /^[A-Z0-9]+$/.test(varName) ? varName : varName.replace(/([A-Z]+)/g, ' $1').trim();
      sectionFields[fieldKey] = {
        type: 'image',
        value: impPath,
        originalValue: impPath,
        varName: varName,
        isImport: true,
        label: `Image: ${cleanVar}`,
      };
    }

    // 5. Inline Images (<img src="..." /> or <Image src="..." />)
    const inlineImgRegex = /<(?:img|Image)[^>]*src=['"]([^'"]+)['"]/gi;
    let imgIdx = 1;
    while ((match = inlineImgRegex.exec(content)) !== null) {
      const srcPath = match[1];
      if (!srcPath || srcPath.startsWith('{')) continue;
      const fieldKey = `inline_image_${imgIdx++}`;
      sectionFields[fieldKey] = {
        type: 'image',
        value: srcPath,
        originalValue: srcPath,
        isInline: true,
        label: `Inline Image ${imgIdx - 1}`,
      };
    }

    // 6. JS Object Image Props (skip empty image paths to prevent duplicate empty inputs)
    let jsImgIdx = 1;
    const jsImgPropRegex = /\b([a-zA-Z0-9_]*(?:image|img|logo|src|thumbnail|banner|icon|iconUrl|rightImageUrl|backgroundImageUrl|imageUrl)[a-zA-Z0-9_]*)\s*:\s*['"]([^'"]*)['"]/gi;
    while ((match = jsImgPropRegex.exec(content)) !== null) {
      const key = match[1];
      const val = match[2].trim();
      if (!val) continue; // Skip empty image properties to eliminate duplicate inputs
      const fieldKey = `js_image_${key}_${jsImgIdx++}`;
      if (sectionFields[fieldKey]) continue;
      sectionFields[fieldKey] = {
        type: 'image',
        value: val,
        originalValue: val,
        label: `Image (${key})`,
        isJsImage: true,
        jsKey: key
      };
    }

    // Register section if it is a UI component
    const isWrapperPage = componentName === 'Page Content' || componentName === 'page' || componentName === 'HomeClientPage' || componentName === 'HomePage';
    
    if (!isWrapperPage && Object.keys(sectionFields).length > 0) {
      const sortedFieldsArr = [];
      const lastIndices = {};
      let lastImportIdx = 0;
      const importMatches = [...rawContent.matchAll(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g)];
      if (importMatches.length > 0) {
        const lastMatch = importMatches[importMatches.length - 1];
        lastImportIdx = lastMatch.index + lastMatch[0].length;
      }

      Object.entries(sectionFields).forEach(([key, field]) => {
        let searchVal = field.originalValue;

        if (field.type === 'image' && field.isImport && field.varName) {
          // Find first usage of image variable in component body (past imports header)
          const propVarRegex = new RegExp(`(?:icon|image|img|logo|src|banner)\\s*:\\s*\\b${field.varName}\\b|src=\\{${field.varName}\\}`, 'i');
          const genericVarRegex = new RegExp(`\\b${field.varName}\\b`, 'g');
          
          let firstUsageIdx = -1;
          const bodySlice = rawContent.slice(lastImportIdx);
          const propMatch = propVarRegex.exec(bodySlice);
          if (propMatch) {
            firstUsageIdx = lastImportIdx + propMatch.index;
          } else {
            let m;
            while ((m = genericVarRegex.exec(rawContent)) !== null) {
              if (m.index >= lastImportIdx) {
                firstUsageIdx = m.index;
                break;
              }
            }
          }

          if (firstUsageIdx !== -1) {
            sortedFieldsArr.push({ key, field: { ...field, index: firstUsageIdx } });
            return;
          }
        }

        const startSearchPos = lastIndices[searchVal] !== undefined ? lastIndices[searchVal] + 1 : lastImportIdx;
        let idx = -1;
        if (field.propKey) {
          const escapedVal = searchVal.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          const propRegex = new RegExp(`\\b${field.propKey}\\s*:\\s*(['"\`])${escapedVal}\\1`, 'g');
          let pm;
          while ((pm = propRegex.exec(rawContent)) !== null) {
            if (pm.index >= startSearchPos) {
              idx = pm.index;
              break;
            }
          }
        }
        if (idx === -1) {
          idx = rawContent.indexOf(searchVal, startSearchPos);
        }
        if (idx === -1) {
          idx = rawContent.indexOf(searchVal, lastImportIdx);
        }
        if (idx === -1) {
          idx = rawContent.indexOf(searchVal);
        }
        if (idx !== -1) {
          lastIndices[searchVal] = idx;
        }
        sortedFieldsArr.push({ key, field: { ...field, index: idx === -1 ? Infinity : idx } });
      });
      sortedFieldsArr.sort((a, b) => a.field.index - b.field.index);

      const relativePath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
      const sortedFields = {};
      sortedFieldsArr.forEach(({ key, field }) => {
        const { index, ...rest } = field;
        sortedFields[key] = rest;
      });

      const readableName = formatSectionName(componentName);

      sections.push({
        sectionId: componentName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
        sectionName: readableName,
        filePath: relativePath,
        order: sections.length + 1,
        fields: sortedFields,
      });
    }

    // Recurse imports
    const importRegex = /import\s+(?:(\w+)|\{\s*([\w\s,]+)\s*\})\s+from\s+['"]([^'"]+)['"]/g;
    const imports = [];
    while ((match = importRegex.exec(content)) !== null) {
      const defaultName = match[1];
      const namedNames = match[2];
      const impPath = match[3];

      if (/\.(png|jpe?g|webp|gif|svg|avif|ico|css|scss|less)$/i.test(impPath)) {
        continue;
      }

      if (impPath.startsWith('.') || impPath.startsWith('@/')) {
        const resolved = resolveImportPath(impPath, filePath);
        const actualFile = findFile(resolved);
        if (actualFile && !actualFile.includes('node_modules') && !actualFile.includes('.next')) {
          if (defaultName) {
            imports.push({ name: defaultName, file: actualFile });
          }
          if (namedNames) {
            namedNames.split(',').forEach(n => {
              const cleanName = n.trim();
              if (cleanName) {
                imports.push({ name: cleanName, file: actualFile });
              }
            });
          }
        }
      }
    }

    for (const imp of imports) {
      const lowerName = imp.name.toLowerCase();
      if (lowerName === 'navbar' || lowerName === 'footer' || lowerName === 'sideicons' || lowerName === 'scrolltotopbutton' || lowerName === 'getquoteform' || lowerName === 'whychoose' || lowerName === 'hireus') {
        continue;
      }
      parseFile(imp.file, imp.name);
    }
  }

  const baseComponentName = path.basename(pageFilePath, path.extname(pageFilePath));
  const entryComponentName = baseComponentName === 'page' ? 'Page Content' : baseComponentName;
  parseFile(pageFilePath, entryComponentName);

  sections.forEach((s, idx) => {
    s.order = idx + 1;
  });

  return sections;
}

export function updatePageFiles(sections) {
  for (const section of sections) {
    if (!section.filePath) continue;
    const absolutePath = path.join(process.cwd(), section.filePath);
    if (!existsSync(absolutePath)) {
      continue;
    }

    let fileContent = readFileSync(absolutePath, 'utf-8');
    let contentChanged = false;

    for (const [fieldKey, field] of Object.entries(section.fields || {})) {
      const { value, originalValue, type, isImport, varName, isInline, isJsImage, jsKey } = field;
      if (originalValue === undefined || originalValue === null) continue;

      if (type === 'image') {
        // DO NOT rewrite JS ES6 import statements (`import x from 'https://...'`) with HTTP URLs!
        // ES6 imports must remain valid local module paths.
        if (isInline && value && !value.startsWith('http://') && !value.startsWith('https://')) {
          const searchImage = originalValue;
          const escaped = searchImage.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          const srcRegex = new RegExp(`src=['"]${escaped}['"]`, 'g');
          if (srcRegex.test(fileContent)) {
            fileContent = fileContent.replace(srcRegex, `src="${value}"`);
            contentChanged = true;
          }
        }
      } else {
        const searchVal = originalValue || '';
        if (searchVal.length > 1) {
          const escapedSearch = searchVal.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          const literalRegex = new RegExp(`(['"\`])${escapedSearch}\\1`, 'g');
          if (literalRegex.test(fileContent)) {
            fileContent = fileContent.replace(literalRegex, `$1${value}$1`);
            contentChanged = true;
          }
        }
      }
    }

    if (contentChanged) {
      writeFileSync(absolutePath, fileContent, 'utf-8');
    }
  }
}
