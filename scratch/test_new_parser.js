import fs from 'fs';
import path from 'path';

function resolveImportPath(importPath, currentFilePath) {
  if (importPath.startsWith('@/')) {
    const rel = importPath.slice(2);
    const rootPath = path.join(process.cwd(), rel);
    if (fs.existsSync(rootPath) || findFile(rootPath)) {
      return rootPath;
    }
    const srcPath = path.join(process.cwd(), 'src', rel);
    if (fs.existsSync(srcPath) || findFile(srcPath)) {
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
  if (/\.(png|jpe?g|webp|gif|svg|avif|ico|pdf|mp4|mp3|woff2?|ttf|eot)$/i.test(resolvedPath)) {
    return null;
  }
  if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile()) {
    return resolvedPath;
  }
  for (const ext of extensions) {
    if (fs.existsSync(resolvedPath + ext)) {
      return resolvedPath + ext;
    }
    if (fs.existsSync(path.join(resolvedPath, 'index' + ext))) {
      return path.join(resolvedPath, 'index' + ext);
    }
  }
  return null;
}

function cleanText(text) {
  if (!text || typeof text !== 'string') return '';
  let t = text.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  t = t.replace(/<Link(\s+[^>]*)>/gi, '<a$1>');
  t = t.replace(/<\/Link>/gi, '</a>');
  t = t.replace(/<a(\s+[^>]*)>/gi, '');
  t = t.replace(/<\/a>/gi, '');
  t = t.replace(/\{"([\s\S]*?)"\}/g, '$1');
  t = t.replace(/\{'([\s\S]*?)'\}/g, '$1');
  t = t.replace(/\{[^}]*\|\|\s*"([^"]+)"\s*\}/g, '$1');
  t = t.replace(/\{[^}]*\|\|\s*'([^']+)'\s*\}/g, '$1');
  t = t.replace(/<[^>]+>/g, ' ');
  t = t.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&lsquo;/g, "'").replace(/&rsquo;/g, "'");
  t = t.replace(/\{[\s\S]*?\}/g, '');
  t = t.replace(/\s+/g, ' ').trim();
  return t;
}

function isCodeOrStyleString(val) {
  if (!val || typeof val !== 'string') return true;
  const trimmed = val.trim();
  if (!trimmed || trimmed.length < 2) return true;

  const techKeywords = [
    'string', 'object', 'boolean', 'number', 'undefined', 'function', 'symbol', 'bigint',
    'use client', 'use server', 'scroll', 'click', 'submit', 'change', 'keydown', 'keyup',
    'resize', 'passive', 'true', 'false', 'null', 'width', 'height', 'px', 'vh', 'vw', 'rem', 'em',
    'auto', 'cover', 'contain', 'fit', 'fill', 'center', 'pointer', 'relative', 'absolute', 'hidden',
    'flex', 'grid', 'swiper', 'swiper/react', 'swiper/modules', 'swiper/css',
    '@tsparticles/react', 'tsparticles', 'lucide-react', 'framer-motion',
    'react-dom', 'next/image', 'next/link', 'next/navigation', 'react-icons',
    'poppins', 'montserrat', 'inter', 'sans-serif', 'serif', 'mono', 'cursor-pointer', 'object-contain'
  ];

  const lower = trimmed.toLowerCase();
  if (techKeywords.includes(lower)) return true;
  if (/^(&[a-z0-9#]+;|&#[0-9]+;|&#x[0-9a-f]+;)$/i.test(trimmed)) return true;
  if (/^(&apos;|&quot;|&amp;|&nbsp;|&#39;|&#x27;)$/i.test(trimmed)) return true;
  if (/^[\(\)\[\]\{\}<>=\+\*\/\^~`!@#\$%\^&;:,.'"\u2018\u2019\u201C\u201D\s\-]+$/.test(trimmed)) return true;
  if (/<\/?[a-z0-9]+>/i.test(trimmed) || trimmed.includes('</') || trimmed.includes('/>') || trimmed.includes('>{') || trimmed.includes('}<')) return true;

  if (trimmed.startsWith('/') && !trimmed.startsWith('/images/') && !trimmed.startsWith('/uploads/') && !trimmed.startsWith('/assets/') && !trimmed.includes(' ') && /^\/[a-zA-Z0-9\-_/]+$/.test(trimmed)) {
    return true;
  }
  if (trimmed.startsWith('@/') || trimmed.startsWith('./') || trimmed.startsWith('../') || (trimmed.startsWith('/') && trimmed.includes('.'))) {
    if (!/\.(png|jpe?g|webp|gif|svg|avif|ico)$/i.test(trimmed)) return true;
  }
  if (/\.(js|jsx|ts|tsx|css|scss|less|mjs|json|html)$/i.test(trimmed)) return true;
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(trimmed)) return true;
  if (/\d/.test(trimmed) && /^[0-9\.\s,%pxrememvwvh\-]+$/i.test(trimmed)) return true;

  if (trimmed.includes(' ')) {
    const tokens = trimmed.split(/[\s,]+/);
    const styleClassRegex = /^(bg|text|px|py|p|pt|pb|pl|pr|m|mt|mb|ml|mr|mx|my|w|h|border|rounded|shadow|gap|col|row|translate|scale|opacity|duration|ease|font|tracking|leading|items|justify|overflow|pointer|select|flex|grid|min-h|max-h|min-w|max-w|aspect|z|from|via|to|delay|origin|cursor|fill|stroke|space|animate|object|group-hover|hover|focus|active|top|bottom|left|right|inset|self|transition|decoration|line-clamp|divide|ring|backdrop|filter|mix-blend|shrink|grow|order)-[a-z0-9]/i;
    const styleWordRegex = /^(flex|grid|block|inline|hidden|absolute|relative|static|fixed|sticky|group|pointer|select|truncate|transition|duration|ease|delay|cursor|overflow|aspect|antialiased|font-sans|container|mx-auto|w-full|h-full|max-w-none)$/i;

    let styleCount = 0;
    for (const t of tokens) {
      const cleanToken = t.trim();
      if (!cleanToken) continue;
      if (styleClassRegex.test(cleanToken) || styleWordRegex.test(cleanToken)) styleCount++;
    }
    if (tokens.length > 1 && styleCount / tokens.length > 0.4) return true;
  }
  return false;
}

function shouldSkipDesignProperty(key, val) {
  const k = key.toLowerCase();
  const v = (val || '').toString().trim();
  if (/^(width|height|color|bgcolor|bg|background|padding|margin|top|left|right|bottom|zindex|opacity|fontsize|fontfamily|lineheight|letterspacing|border|radius|shadow|gap|rotate|scale|transform|transition|duration|delay|flex|grid|align|justify|display|overflow|position|country|dialcountry|dialcode|callingcode|minDigits|maxDigits|sample|iso|href|to|as|rel|target|key|id|className|style)$/i.test(k) ||
      /(color|accent|class|style|theme|gradient|filter|border|shadow|hover)$/i.test(k)) {
    return true;
  }
  if (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(v) || /^rgba?\(/i.test(v) || /^hsla?\(/i.test(v) || /^(transparent|inherit|initial)$/i.test(v)) {
    return true;
  }
  if (v.startsWith('url(') || /^(text|bg|border|font|from|via|to|p|px|py|m|mx|my)-[#\[a-z0-9]/i.test(v) || v.includes('group-hover:') || v.includes('hover:')) {
    return true;
  }
  if (/^\d+(\.\d+)?(px|rem|em|%|vh|vw|pt|deg|s|ms)$/i.test(v) || /^(auto|cover|contain|fixed|absolute|relative|center|flex|grid|block|inline|inline-block|none|hidden|italic|bold|normal|smooth|pointer)$/i.test(v)) {
    return true;
  }
  const isContentStatKey = /(?:count|number|percent|suffix|price|year|rating|pageNumber)/i.test(k);
  if (!isContentStatKey && isCodeOrStyleString(v)) {
    return true;
  }
  return false;
}

function classifyFieldLabel(key, val, tag = '') {
  const clean = val.substring(0, 35) + (val.length > 35 ? '...' : '');
  const lowerKey = key.toLowerCase();
  if (tag.startsWith('h') || lowerKey.includes('heading') || lowerKey.includes('headline') || lowerKey.includes('sectiontitle')) {
    return `Heading: "${clean}"`;
  }
  if (tag === 'p' || lowerKey.includes('paragraph') || lowerKey.includes('description') || lowerKey.includes('desc') || lowerKey.includes('summary')) {
    return `Paragraph: "${clean}"`;
  }
  if (lowerKey.includes('badge') || lowerKey.includes('eyebrow')) {
    return `Badge: "${clean}"`;
  }
  if (lowerKey.includes('subheading') || lowerKey.includes('subtitle') || lowerKey.includes('titleaccent') || lowerKey.includes('titlehighlight') || lowerKey.includes('titleline') || lowerKey.includes('titlerest')) {
    return `Subheading: "${clean}"`;
  }
  if (tag === 'button' || lowerKey.includes('button') || lowerKey.includes('btn') || lowerKey.includes('cta') || lowerKey.includes('quote')) {
    return `Button Text: "${clean}"`;
  }
  if (lowerKey.includes('imagealt') || lowerKey.includes('alt')) {
    return `Image Alt: "${clean}"`;
  }
  if (lowerKey.includes('title') || lowerKey.includes('label') || lowerKey.includes('name')) {
    return `Title: "${clean}"`;
  }
  if (tag === 'li' || lowerKey.includes('list') || lowerKey.includes('benefit') || lowerKey.includes('point') || lowerKey.includes('bullet') || lowerKey.includes('tag')) {
    return `List Item: "${clean}"`;
  }
  return `Text: "${clean}"`;
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
    'getintouch': 'Get In Touch Section',
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
    'seoauditfinalform': 'SEO Audit Final Form Section',
    'commonwhychoose': 'Why Choose Section',
    'commonkeyfeatures': 'Key Features Section',
    'commonstruggling': 'Challenges & Solutions Section',
    'commonservices': 'Services Offerings Section',
    'technologiesbook': 'Technologies Book Section',
    'commonhireus': 'Hire Us Section',
    'reactframeworks': 'React Framework Section',
    'framework': 'Framework Section',
    'dotnetasp': 'DotNet Framework Section',
  };
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (map[key]) return map[key];
  const formatted = name.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim();
  return formatted.endsWith('Section') ? formatted : `${formatted} Section`;
}

function extractObjectSlice(content, slug) {
  const regex = new RegExp(`['"]${slug}['"]\\s*:\\s*\\{`, 'g');
  const match = regex.exec(content);
  if (!match) return null;
  const startIdx = match.index;
  let braceCount = 0;
  let inString = false;
  let stringChar = '';
  let endIdx = -1;

  for (let i = startIdx + match[0].length - 1; i < content.length; i++) {
    const ch = content[i];
    const prev = content[i - 1];
    if (inString) {
      if (ch === stringChar && prev !== '\\') inString = false;
    } else {
      if (ch === '"' || ch === "'" || ch === '`') {
        inString = true;
        stringChar = ch;
      } else if (ch === '{') {
        braceCount++;
      } else if (ch === '}') {
        braceCount--;
        if (braceCount === 0) {
          endIdx = i + 1;
          break;
        }
      }
    }
  }
  return endIdx !== -1 ? content.slice(startIdx, endIdx) : null;
}

export function parsePageContent(pageFilePath, slug = null) {
  const sections = [];
  const visited = new Set();

  if (!slug) {
    const normalized = pageFilePath.replace(/\\/g, '/');
    const serviceMatch = normalized.match(/\/services\/([a-z0-9\-]+)(?:\/page|\.js)/);
    if (serviceMatch) slug = serviceMatch[1];
    else if (normalized.includes('/hire-us/')) slug = 'hire-us';
  }

  function parseFile(filePath, componentName) {
    if (visited.has(filePath)) return;
    visited.add(filePath);

    if (!fs.existsSync(filePath) || /\.(png|jpe?g|webp|gif|svg|avif|ico|pdf|mp4|mp3|woff2?|ttf|eot)$/i.test(filePath)) {
      return;
    }

    // Skip raw data files from becoming sections
    if (filePath.replace(/\\/g, '/').includes('/app/_data/')) {
      return;
    }

    // Skip non-UI helper modules
    const isHelperModule = /[\/\\](lib|_context|context|hooks|utils|helpers|api)[\/\\]/i.test(filePath) || /QuoteContext|api-helper|mongodb|cms-fetch/i.test(filePath);
    if (isHelperModule) return;

    // Skip internal presentation wrappers that should be absorbed by parent
    const lowerComp = componentName.toLowerCase();
    if (['commontechhero', 'commonservicehero', 'keyfeatures', 'faq', 'whychoose', 'hireus'].includes(lowerComp)) {
      return;
    }

    let rawContent = fs.readFileSync(filePath, 'utf-8');
    let content = rawContent.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1');
    const sectionFields = {};

    // Check if this is a common service component that requires service-scoped slice
    if (lowerComp === 'commonwhychoose' || lowerComp === 'commonkeyfeatures' || lowerComp === 'commonstruggling' || lowerComp === 'commonservices' || lowerComp === 'technologiesbook') {
      const targetSlug = slug || 'web-development';
      let dataFilePath = '';
      if (lowerComp === 'commonwhychoose') dataFilePath = path.join(process.cwd(), 'app/_data/servicesWhyChooseData.js');
      else if (lowerComp === 'commonkeyfeatures') dataFilePath = path.join(process.cwd(), 'app/_data/servicesKeyFeaturesData.js');
      else if (lowerComp === 'commonstruggling') dataFilePath = path.join(process.cwd(), 'app/_data/servicesStrugglingData.js');
      else if (lowerComp === 'commonservices') dataFilePath = path.join(process.cwd(), 'app/_data/servicesOfferingsData.js');
      else if (lowerComp === 'technologiesbook') dataFilePath = path.join(process.cwd(), 'app/_data/servicesTechnologiesData.js');

      if (fs.existsSync(dataFilePath)) {
        const rawData = fs.readFileSync(dataFilePath, 'utf8');
        const slice = extractObjectSlice(rawData, targetSlug);
        if (slice) {
          // Append slice to content so all its properties get parsed seamlessly into this component!
          content = content + '\n\n' + slice;
          rawContent = rawContent + '\n\n' + slice;
        }
      }
    }

    // 1. Check for t('...') strings
    const tRegex = /\bt\(\s*(['"`])((?:[^\\]|\\.)*?)\1\s*\)/g;
    let match;
    let tIdx = 1;
    while ((match = tRegex.exec(content)) !== null) {
      const val = match[2].trim();
      if (val && val.length > 1) {
        if (isCodeOrStyleString(val)) continue;
        if (Object.values(sectionFields).some(f => f.originalValue === val)) continue;
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

    // 1b. Check for getCmsVal(..., '...', ...) strings
    const getCmsValRegex = /\bgetCmsVal\s*\(\s*[^,]+,\s*(['"`])((?:[^\\]|\\.)*?)\1/g;
    let getCmsValIdx = 1;
    while ((match = getCmsValRegex.exec(content)) !== null) {
      const val = match[2].trim();
      if (val && val.length > 1) {
        if (isCodeOrStyleString(val)) continue;
        if (Object.values(sectionFields).some(f => f.originalValue === val)) continue;
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

    // 2. Check JSX Tags
    let cleanContentForTags = content.replace(/<svg[\s\S]*?<\/svg>/gi, '');
    cleanContentForTags = cleanContentForTags.replace(/<br\s*\/?>/gi, ' ');
    cleanContentForTags = cleanContentForTags.replace(/<[a-zA-Z0-9_:-]+[^<]*?\/>/gi, ' ');

    const jsxTagRegex = /<(h[1-6]|p|span|li|button|a|blockquote)\b((?:[^<>]|\{[^}]*\})*?)(?<!\/)>([\s\S]*?)<\/\1>/gi;
    let textIdx = 1;
    while ((match = jsxTagRegex.exec(cleanContentForTags)) !== null) {
      const fullMatch = match[0];
      const tag = match[1].toLowerCase();
      const innerContent = match[3];

      if (/aria-hidden=['"]true['"]/i.test(fullMatch)) continue;
      if (/<(div|section|article|form|ul|ol|table|h[1-6]|p)\b/i.test(innerContent)) continue;
      if (/\{(?!\s*["'])[\s\S]*?\}/.test(innerContent) && !/^\{"[\s\S]*?"\}$|^\{'[\s\S]*?'\}$/.test(innerContent.trim())) continue;

      const text = cleanText(innerContent);
      if (text && text.length > 1) {
        if (isCodeOrStyleString(text)) continue;
        if (Object.values(sectionFields).some(f => f.originalValue === text)) continue;

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

    // 2b. Check Innermost DIV Tags (badges)
    const divTagRegex = /<div\b((?:[^<>]|\{[^}]*\})*?)(?<!\/)>(((?!<div\b)[\s\S])*?)<\/div>/gi;
    let divIdx = 1;
    while ((match = divTagRegex.exec(cleanContentForTags)) !== null) {
      const innerContent = match[2];
      if (/<(div|section|article|form|ul|ol|table|h[1-6]|p|span|li|button|a)\b/i.test(innerContent)) continue;
      if (/\{(?!\s*["'])[\s\S]*?\}/.test(innerContent) && !/^\{"[\s\S]*?"\}$|^\{'[\s\S]*?'\}$/.test(innerContent.trim())) continue;

      const text = cleanText(innerContent);
      if (text && text.length > 1) {
        if (isCodeOrStyleString(text)) continue;
        if (Object.values(sectionFields).some(f => f.originalValue === text)) continue;

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

    // 3. Check JS Object Content Properties
    let jsIdx = 1;
    const jsPropRegex = /\b([a-zA-Z0-9_]*(?:title|heading|paragraph|subheading|subtitle|description|desc|content|caption|placeholder|address|phone|email|label|name|text|button|btn|percent|line|value|val|suffix|count|number|question|answer|faq|badge|watermark|pageNumber|ctaText|summary)[a-zA-Z0-9_]*)\s*:\s*(?:(['"`])([\s\S]*?)\2|([0-9]+(?:\.[0-9]+)?))/gi;
    while ((match = jsPropRegex.exec(content)) !== null) {
      const key = match[1];
      const val = (match[3] || match[4] || '').trim();
      if (val && val.length > 0) {
        if (shouldSkipDesignProperty(key, val)) continue;
        if (Object.values(sectionFields).some(f => f.originalValue === val)) continue;

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
    const listPropRegex = /\b([a-zA-Z0-9_]*(?:list|items|points|features|bullets|tags|benefits))\s*:\s*\[([\s\S]*?)\]/gi;
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
          if (Object.values(sectionFields).some(f => f.originalValue === val)) continue;

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

    // 3c. Check Variable Declarations & Default Constants (e.g. const defaultHeading = "...")
    const varAssignRegex = /\b(?:const|let|var)\s+([a-zA-Z0-9_]*(?:heading|title|paragraph|description|desc|subtitle|subheading|badge|eyebrow|button|btn|cta|quote|text|line\d*|p\d*)[a-zA-Z0-9_]*)\s*=\s*(['"`])([\s\S]*?)\2/gi;
    let varIdx = 1;
    while ((match = varAssignRegex.exec(content)) !== null) {
      const varKey = match[1];
      const val = match[3].trim();
      if (val && val.length > 1) {
        if (shouldSkipDesignProperty(varKey, val)) continue;
        if (Object.values(sectionFields).some(f => f.originalValue === val)) continue;

        const fieldKey = `var_${varKey}_${varIdx++}`;
        const isLong = val.length > 80;
        sectionFields[fieldKey] = {
          type: isLong ? 'richtext' : 'text',
          value: val,
          originalValue: val,
          propKey: varKey,
          label: classifyFieldLabel(varKey, val)
        };
      }
    }

    // 3d. Check JSX String Attributes / Props (e.g. badge="...", titleLine1="...", highlightText="...", etc.)
    const jsxPropRegex = /\b([a-zA-Z0-9_]*(?:badge|eyebrow|title|heading|subheading|subtitle|desc|description|leadText|highlightText|titleRest|titlePrefix|titleHighlight|titleLine\d*|titleAccent|ctaText|buttonText|btnText|imageAlt|alt|tagText|caption|line\d*|placeholder|label|text)[a-zA-Z0-9_]*)\s*=\s*(['"`])([\s\S]*?)\2/gi;
    let attrIdx = 1;
    while ((match = jsxPropRegex.exec(content)) !== null) {
      const attrName = match[1];
      const val = match[3].trim();
      if (val && val.length > 0) {
        if (shouldSkipDesignProperty(attrName, val)) continue;
        if (Object.values(sectionFields).some(f => f.originalValue === val)) continue;

        const fieldKey = `attr_${attrName}_${attrIdx++}`;
        const isLong = val.length > 80;
        sectionFields[fieldKey] = {
          type: isLong ? 'richtext' : 'text',
          value: val,
          originalValue: val,
          propKey: attrName,
          label: classifyFieldLabel(attrName, val)
        };
      }
    }

    // 4. Image Imports (import ImageName from '...')
    const imgImportRegex = /import\s+(\w+)\s+from\s+['"]([^'"]+\.(?:png|jpe?g|webp|gif|svg|avif))['"]/gi;
    while ((match = imgImportRegex.exec(content)) !== null) {
      const varName = match[1];
      const impPath = match[2];
      const fieldKey = `image_${varName.toLowerCase()}`;
      if (sectionFields[fieldKey]) continue;

      const isDecorativeVar = /^(rectbg\d*|techbg\d*|techcard\d*|cardbg\d*|bg\d*|background\d*|eclipse\d*|comma\d*|frame\d*|pattern\d*|overlay\d*|curve\d*|shape\d*|divider\d*)$/i.test(varName);
      if (isDecorativeVar) continue;

      const contentAfterImport = content.slice(match.index + match[0].length);
      const isUsedInContent = new RegExp(`\\b${varName}\\b`).test(contentAfterImport);
      if (!isUsedInContent) continue;

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

    // 6. JS Object Image Props
    let jsImgIdx = 1;
    const jsImgPropRegex = /\b([a-zA-Z0-9_]*(?:image|img|logo|src|thumbnail|banner|icon|iconUrl|rightImageUrl|backgroundImageUrl|imageUrl)[a-zA-Z0-9_]*)\s*:\s*['"]([^'"]*)['"]/gi;
    while ((match = jsImgPropRegex.exec(content)) !== null) {
      const key = match[1];
      const val = match[2].trim();
      if (!val || val.startsWith('url(') || val.includes(';') || val.includes('{') || isCodeOrStyleString(val)) continue;
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

    // Recurse imports
    const importRegex = /import\s+(?:(\w+)|\{\s*([\w\s,]+)\s*\})\s+from\s+['"]([^'"]+)['"]/g;
    const imports = [];
    let matchImp;
    while ((matchImp = importRegex.exec(content)) !== null) {
      const defaultName = matchImp[1];
      const namedNames = matchImp[2];
      const impPath = matchImp[3];

      if (/\.(png|jpe?g|webp|gif|svg|avif|ico|css|scss|less|json)$/i.test(impPath)) continue;

      if (impPath.startsWith('.') || impPath.startsWith('@/')) {
        const resolved = resolveImportPath(impPath, filePath);
        const actualFile = findFile(resolved);
        if (actualFile && !actualFile.includes('node_modules') && !actualFile.includes('.next')) {
          if (defaultName) imports.push({ name: defaultName, file: actualFile });
          if (namedNames) {
            namedNames.split(',').forEach(n => {
              const cleanName = n.trim();
              if (cleanName && !/^(metadata|generateMetadata|revalidate|getCmsData|generateCmsMetadata|getApiBase)$/i.test(cleanName)) {
                imports.push({ name: cleanName, file: actualFile });
              }
            });
          }
        }
      }
    }

    // Check if component is a wrapper page
    const hasSubComponents = imports.some(imp => {
      const lowerName = imp.name.toLowerCase();
      return lowerName !== 'navbar' && lowerName !== 'footer' && lowerName !== 'sideicons' && lowerName !== 'scrolltotopbutton' && lowerName !== 'getquoteform';
    });
    const isWrapperPage = (
      componentName === 'Page Content' ||
      componentName === 'page' ||
      componentName === 'HomeClientPage' ||
      componentName === 'HomePage' ||
      componentName === 'ServiceHireUsPage' ||
      componentName === 'ReactPage'
    ) && hasSubComponents;

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
          const propRegex = new RegExp(`\\b${field.propKey}\\s*[:=]\\s*(['"\`])${escapedVal}\\1`, 'g');
          let pm;
          while ((pm = propRegex.exec(rawContent)) !== null) {
            if (pm.index >= startSearchPos) {
              idx = pm.index;
              break;
            }
          }
        }
        if (idx === -1) idx = rawContent.indexOf(searchVal, startSearchPos);
        if (idx === -1) idx = rawContent.indexOf(searchVal, lastImportIdx);
        if (idx === -1) idx = rawContent.indexOf(searchVal);
        if (idx !== -1) lastIndices[searchVal] = idx;
        sortedFieldsArr.push({ key, field: { ...field, index: idx === -1 ? Infinity : idx } });
      });
      sortedFieldsArr.sort((a, b) => a.field.index - b.field.index);

      const relativePath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
      const sortedFields = {};
      sortedFieldsArr.forEach(({ key, field }) => {
        const { index, ...rest } = field;
        sortedFields[key] = rest;
      });

      const targetSectionId = componentName.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const readableName = formatSectionName(componentName);

      // Deduplicate: If this sectionId already exists on this page, merge fields!
      const existingSection = sections.find(s => s.sectionId === targetSectionId);
      if (existingSection) {
        existingSection.fields = { ...existingSection.fields, ...sortedFields };
      } else {
        sections.push({
          sectionId: targetSectionId,
          sectionName: readableName,
          filePath: relativePath,
          order: sections.length + 1,
          fields: sortedFields,
        });
      }
    }

    for (const imp of imports) {
      const lowerName = imp.name.toLowerCase();
      const normImpFile = imp.file.replace(/\\/g, '/');
      if (
        lowerName === 'navbar' ||
        lowerName === 'footer' ||
        lowerName === 'sideicons' ||
        lowerName === 'scrolltotopbutton' ||
        lowerName === 'getquoteform' ||
        normImpFile.includes('components/Advantages/Advantages') ||
        normImpFile.includes('components/KeyFeatures/KeyFeatures') ||
        normImpFile.includes('components/WhyChoose/WhyChoose') ||
        normImpFile.includes('components/Faq/Faq') ||
        normImpFile.includes('CommonTechHero') ||
        normImpFile.includes('CommonServiceHero') ||
        normImpFile.includes('/app/_data/')
      ) {
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

// Run test on sample routes
const samplePaths = [
  'app/technologies/react/page.js',
  'app/technologies/laravel/page.js',
  'app/technologies/php/page.js',
  'app/technologies/swift/page.js',
  'app/services/web-development/page.js',
  'app/services/app-development/page.js',
  'app/our-portfolio/page.js',
  'app/claim-your-free-seo-audit/page.js',
  'app/pos-development/page.js',
];

console.log('--- TESTING NEW PARSER ON SAMPLE PAGES ---');
for (const p of samplePaths) {
  const abs = path.join(process.cwd(), p);
  const secs = parsePageContent(abs);
  console.log(`\nPAGE: ${p} -> Total Sections: ${secs.length}`);
  for (const s of secs) {
    const keys = Object.keys(s.fields);
    const imgs = keys.filter(k => s.fields[k].type === 'image');
    const texts = keys.length - imgs.length;
    console.log(`  • [${s.sectionId}] "${s.sectionName}": ${keys.length} fields (imgs: ${imgs.length}, texts: ${texts})`);
  }
}
