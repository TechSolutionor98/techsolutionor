import fs from 'fs';
import path from 'path';
import cloudinary from './cloudinary';

export const MIME_MAP = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  csv: 'text/csv',
  txt: 'text/plain',
  rtf: 'application/rtf',
  json: 'application/json',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  bmp: 'image/bmp',
  zip: 'application/zip',
  rar: 'application/x-rar-compressed',
  '7z': 'application/x-7z-compressed',
  tar: 'application/x-tar',
  gz: 'application/gzip',
  fig: 'application/octet-stream',
  sketch: 'application/octet-stream',
  xd: 'application/octet-stream',
  ai: 'application/postscript',
  psd: 'image/vnd.adobe.photoshop',
};

export function getMimeType(filename) {
  const ext = (filename || '').split('.').pop()?.toLowerCase();
  return MIME_MAP[ext] || 'application/octet-stream';
}

export function getFileCategory(filename) {
  const ext = (filename || '').split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'bmp'].includes(ext)) return 'Image';
  if (ext === 'pdf') return 'PDF Document';
  if (['doc', 'docx', 'rtf'].includes(ext)) return 'Word Document';
  if (['xls', 'xlsx', 'csv'].includes(ext)) return 'Spreadsheet';
  if (['ppt', 'pptx'].includes(ext)) return 'Presentation';
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return 'Archive';
  if (['fig', 'sketch', 'xd', 'ai', 'psd'].includes(ext)) return 'Design File';
  if (['txt', 'json'].includes(ext)) return 'Text File';
  return 'Document';
}

export function sanitizeFileName(originalName) {
  const ext = path.extname(originalName || 'file') || '';
  const base = path.basename(originalName || 'file', ext).replace(/[^a-zA-Z0-9_-]/g, '_');
  const safeBase = base.substring(0, 80) || 'document';
  return `${Date.now()}-${safeBase}${ext}`;
}

export async function saveFileLocally(buffer, originalName) {
  try {
    // In Vercel serverless environment, the filesystem is read-only.
    // Never attempt to write to public/ in serverless production.
    if (process.env.VERCEL) {
      return null;
    }
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'hire-documents');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const cleanName = sanitizeFileName(originalName);
    const filePath = path.join(uploadDir, cleanName);
    await fs.promises.writeFile(filePath, buffer);
    return `/uploads/hire-documents/${cleanName}`;
  } catch (err) {
    console.warn('Local disk write skipped:', err.message);
    return null;
  }
}

export async function uploadHireDocument(buffer, originalName, docType = 'General') {
  const ext = (originalName || '').split('.').pop()?.toLowerCase() || '';
  const isImage = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'bmp'].includes(ext);
  const resourceType = isImage ? 'image' : 'raw';

  let cloudinaryUrl = null;

  // 1. Primary storage: Cloudinary cloud object storage (recommended for production & Vercel serverless)
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (cloudName && apiKey && apiSecret) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'techsolutionor/hire-documents',
            resource_type: resourceType,
          },
          (error, res) => {
            if (error) return reject(error);
            resolve(res);
          }
        ).end(buffer);
      });

      if (result && (result.secure_url || result.url)) {
        cloudinaryUrl = result.secure_url || result.url;
      }
    }
  } catch (cloudErr) {
    console.warn('Cloudinary upload note:', cloudErr?.message || cloudErr);
  }

  // 2. Fallback storage: Local disk (used ONLY if Cloudinary is not configured or in local dev offline)
  let localPath = null;
  if (!cloudinaryUrl) {
    localPath = await saveFileLocally(buffer, originalName);
  }

  const primaryUrl = cloudinaryUrl || localPath;

  return {
    id: `doc_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    name: originalName,
    fileName: originalName,
    size: buffer.length,
    type: getMimeType(originalName),
    category: getFileCategory(originalName),
    docType: docType || 'General',
    url: primaryUrl,
    fileUrl: primaryUrl,
    localPath: localPath || null,
    cloudinaryUrl: cloudinaryUrl || null,
    uploadedAt: new Date().toISOString(),
  };
}

export function findExistingFileOnDisk(originalName, targetSize = null) {
  if (!originalName) return null;

  const targetExt = path.extname(originalName).toLowerCase();
  if (!targetExt) return null;

  // Extract core alphanumeric identifier from original filename
  const cleanOriginalBase = path.basename(originalName, targetExt)
    .toLowerCase()
    .replace(/^m_saleem_mughal_/, '')
    .replace(/\s*\(\d+\)$/, '')
    .replace(/[^a-z0-9]/g, '');

  if (cleanOriginalBase.length < 5) return null;

  const dirs = [
    path.join(process.cwd(), 'public', 'uploads', 'hire-documents'),
    path.join(process.cwd(), 'public', 'uploads', 'resumes'),
    path.join(process.cwd(), 'public', 'uploads'),
  ];

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    try {
      const files = fs.readdirSync(dir);
      for (const f of files) {
        const fullPath = path.join(dir, f);
        try {
          const stat = fs.statSync(fullPath);
          if (!stat.isFile()) continue;

          // Extension MUST match
          const fExt = path.extname(f).toLowerCase();
          if (fExt !== targetExt) continue;

          // Clean disk filename base (strip timestamp prefix and cache prefix)
          const cleanFBase = path.basename(f, fExt)
            .toLowerCase()
            .replace(/^[0-9]+-/, '')
            .replace(/^cached-[0-9a-f]+-/, '')
            .replace(/[^a-z0-9]/g, '');

          if (cleanFBase.length < 5) continue;

          // Require strict filename match - NEVER match on size alone
          const isNameMatch = cleanFBase === cleanOriginalBase ||
            cleanFBase.includes(cleanOriginalBase) ||
            cleanOriginalBase.includes(cleanFBase);

          if (!isNameMatch) continue;

          // If targetSize is provided, ensure it confirms the match
          if (targetSize && Math.abs(stat.size - Number(targetSize)) > 200) {
            continue;
          }

          const rel = path.relative(path.join(process.cwd(), 'public'), fullPath).replace(/\\/g, '/');
          return { fullPath, relativePath: `/${rel}`, size: stat.size };
        } catch (_) {}
      }
    } catch (_) {}
  }
  return null;
}

