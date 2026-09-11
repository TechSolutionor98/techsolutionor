import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import cloudinary from '@/lib/cloudinary';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

function getMimeType(filename) {
  const ext = (filename || '').split('.').pop().toLowerCase();
  switch (ext) {
    case 'pdf':
      return 'application/pdf';
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'doc':
      return 'application/msword';
    default:
      return 'application/octet-stream';
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return new NextResponse('Application ID required', { status: 400 });
    }

    const db = await getDb();
    let query = {};
    if (ObjectId.isValid(id)) {
      query = { _id: new ObjectId(id) };
    } else {
      query = { id };
    }

    const application = await db.collection('applications').findOne(query);
    if (!application || (!application.cv && (!Array.isArray(application.cvFiles) || application.cvFiles.length === 0))) {
      return new NextResponse('CV not found for this applicant.', { status: 404 });
    }

    // Support multiple uploaded CV files via index parameter (?index=0, 1, 2...)
    const url = new URL(request.url);
    const indexParam = url.searchParams.get('index') || url.searchParams.get('file');
    const isDownload = url.searchParams.get('download') === '1' || url.searchParams.get('download') === 'true';

    let targetFile = null;
    if (Array.isArray(application.cvFiles) && application.cvFiles.length > 0) {
      if (indexParam !== null && !isNaN(parseInt(indexParam, 10))) {
        const idx = parseInt(indexParam, 10);
        targetFile = application.cvFiles[idx] || application.cvFiles[0];
      } else {
        targetFile = application.cvFiles[0];
      }
    }

    const cvPath = (targetFile?.cvUrl || targetFile?.cv || application.cv || '').trim();
    const candidateName = (application.name || 'Applicant').replace(/[^a-zA-Z0-9_-]/g, '_');
    const originalFileName = targetFile?.fileName || targetFile?.cvFileName || application.cvFileName || path.basename(cvPath) || 'resume.pdf';
    const ext = originalFileName.split('.').pop().toLowerCase();
    const mimeType = getMimeType(originalFileName);
    const downloadFileName = `${candidateName}_${originalFileName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;

    const getDisposition = () => {
      if (isDownload) return `attachment; filename="${downloadFileName}"`;
      return ext === 'pdf' ? `inline; filename="${downloadFileName}"` : `attachment; filename="${downloadFileName}"`;
    };

    // 1. Check if the file is stored locally in public/
    const localCvPath = targetFile?.localCvPath || application.localCvPath || (cvPath.startsWith('/uploads/') || cvPath.startsWith('uploads/') ? cvPath : null);
    if (localCvPath) {
      const cleanRel = localCvPath.startsWith('/') ? localCvPath.slice(1) : localCvPath;
      const fullDiskPath = path.join(process.cwd(), 'public', cleanRel);
      if (fs.existsSync(fullDiskPath)) {
        const fileBuffer = await fs.promises.readFile(fullDiskPath);
        const disposition = getDisposition();
        return new NextResponse(fileBuffer, {
          status: 200,
          headers: {
            'Content-Type': mimeType,
            'Content-Disposition': disposition,
            'Content-Length': fileBuffer.length.toString(),
            'Cache-Control': 'public, max-age=86400',
          },
        });
      }
    }

    // 2. If it's a Cloudinary URL
    if (cvPath.includes('cloudinary.com')) {
      const isRaw = cvPath.includes('/raw/');
      const matches = cvPath.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.([a-zA-Z0-9]+))?$/);

      let buffer = null;
      let finalMime = mimeType;

      if (matches) {
        const publicId = matches[1];
        const format = matches[2] || (isRaw ? '' : (ext || 'pdf'));

        try {
          const signedUrl = cloudinary.utils.private_download_url(publicId, format, {
            resource_type: isRaw ? 'raw' : 'image',
            type: 'upload',
          });

          const cloudRes = await fetch(signedUrl);
          if (cloudRes.ok) {
            buffer = Buffer.from(await cloudRes.arrayBuffer());
            const cloudType = cloudRes.headers.get('content-type');
            if (cloudType && cloudType !== 'application/octet-stream') {
              finalMime = cloudType;
            }
          }
        } catch (signErr) {
          console.warn('Signed Cloudinary fetch failed, trying direct:', signErr.message);
        }
      }

      // Fallback: direct fetch
      if (!buffer) {
        try {
          const directRes = await fetch(cvPath);
          if (directRes.ok) {
            buffer = Buffer.from(await directRes.arrayBuffer());
          }
        } catch (directErr) {
          console.warn('Direct fetch failed:', directErr.message);
        }
      }

      if (buffer && buffer.length > 0) {
        // Cache locally for instantaneous subsequent previews
        try {
          const localCacheDir = path.join(process.cwd(), 'public', 'uploads', 'resumes');
          if (!fs.existsSync(localCacheDir)) {
            fs.mkdirSync(localCacheDir, { recursive: true });
          }
          const cachedName = `cached-${id}-${downloadFileName}`;
          const cachedDiskPath = path.join(localCacheDir, cachedName);
          await fs.promises.writeFile(cachedDiskPath, buffer);
          await db.collection('applications').updateOne(
            { _id: application._id },
            { $set: { localCvPath: `/uploads/resumes/${cachedName}` } }
          );
        } catch (cacheErr) {
          console.warn('Failed to cache resume file locally:', cacheErr);
        }

        const disposition = getDisposition();
        return new NextResponse(buffer, {
          status: 200,
          headers: {
            'Content-Type': finalMime,
            'Content-Disposition': disposition,
            'Content-Length': buffer.length.toString(),
            'Cache-Control': 'public, max-age=86400',
          },
        });
      }
    }

    // 3. Fallback for external URLs
    if (cvPath.startsWith('http://') || cvPath.startsWith('https://')) {
      const res = await fetch(cvPath);
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        const disposition = getDisposition();
        return new NextResponse(buffer, {
          status: 200,
          headers: {
            'Content-Type': mimeType,
            'Content-Disposition': disposition,
            'Content-Length': buffer.length.toString(),
          },
        });
      }
    }

    return new NextResponse('Unable to retrieve applicant CV file.', { status: 502 });
  } catch (error) {
    console.error('Error serving applicant CV:', error);
    return new NextResponse('Internal server error loading CV.', { status: 500 });
  }
}
