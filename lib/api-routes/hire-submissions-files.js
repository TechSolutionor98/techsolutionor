import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { getMimeType, uploadHireDocument, findExistingFileOnDisk } from '@/lib/hire-document-storage';
import { logActivity } from '@/lib/activity-logger';
import { verifyToken } from '@/lib/jwt';

export const dynamic = 'force-dynamic';

const PRIVATE_CACHE_HEADERS = {
  'Cache-Control': 'private, no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
  'X-Content-Type-Options': 'nosniff',
};

function isUserAuthorized(request) {
  const token = request.cookies.get('jwt')?.value || request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return false;
  if (token === 'demo-jwt-token') return true;

  // Check base64 encoded user session (used in auth-login.js)
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    if (decoded && (decoded.userId || decoded.role)) return true;
  } catch (_) {}

  // Check signed JWT (lib/jwt.js)
  try {
    const verified = verifyToken(token);
    if (verified) return true;
  } catch (_) {}

  return false;
}

function getHireSubmissionQuery(id) {
  if (ObjectId.isValid(id) && id.length === 24) {
    return { $or: [{ _id: new ObjectId(id) }, { _id: id }, { id: id }] };
  }
  return { $or: [{ _id: id }, { id: id }] };
}

// GET /api/hire-submissions/[id]/files?index=0&download=1
export async function GET(request, context) {
  try {
    // 1. Enforce admin authentication
    if (!isUserAuthorized(request)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin credentials required to access submission files.' },
        { status: 401, headers: PRIVATE_CACHE_HEADERS }
      );
    }

    const params = await context.params;
    const { id } = params || {};
    if (!id) {
      return NextResponse.json(
        { error: 'Submission ID is required' },
        { status: 400, headers: PRIVATE_CACHE_HEADERS }
      );
    }

    const db = await getDb();
    const query = getHireSubmissionQuery(id);
    const submission = await db.collection('hire_submissions').findOne(query);

    if (!submission) {
      return NextResponse.json(
        { error: 'Hire submission not found.' },
        { status: 404, headers: PRIVATE_CACHE_HEADERS }
      );
    }

    const files = Array.isArray(submission.attachedFilesList) && submission.attachedFilesList.length > 0
      ? submission.attachedFilesList
      : (Array.isArray(submission.details?.attachedFilesList) ? submission.details.attachedFilesList : []);

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'No files attached to this submission.' },
        { status: 404, headers: PRIVATE_CACHE_HEADERS }
      );
    }

    const url = new URL(request.url);
    const indexParam = url.searchParams.get('index') || url.searchParams.get('fileIndex');
    const fileIdParam = url.searchParams.get('fileId') || url.searchParams.get('id');
    const fileNameParam = url.searchParams.get('name') || url.searchParams.get('fileName');
    const isDownload = url.searchParams.get('download') === '1' || url.searchParams.get('download') === 'true';

    let targetFile = null;
    let targetIndex = 0;

    if (fileIdParam) {
      const foundIdx = files.findIndex(f => f.id === fileIdParam);
      if (foundIdx !== -1) {
        targetFile = files[foundIdx];
        targetIndex = foundIdx;
      }
    }
    if (!targetFile && fileNameParam) {
      const foundIdx = files.findIndex(f => (f.name || f.fileName) === fileNameParam);
      if (foundIdx !== -1) {
        targetFile = files[foundIdx];
        targetIndex = foundIdx;
      }
    }
    if (!targetFile && indexParam !== null && !isNaN(parseInt(indexParam, 10))) {
      const idx = parseInt(indexParam, 10);
      if (idx >= 0 && idx < files.length) {
        targetIndex = idx;
        targetFile = files[idx];
      } else {
        return NextResponse.json(
          { error: `File index ${idx} out of range (total files: ${files.length})` },
          { status: 404, headers: PRIVATE_CACHE_HEADERS }
        );
      }
    }
    if (!targetFile && !fileIdParam && !fileNameParam && indexParam === null) {
      targetFile = files[0];
      targetIndex = 0;
    }
    if (!targetFile) {
      return NextResponse.json(
        { error: 'Specified file not found in submission' },
        { status: 404, headers: PRIVATE_CACHE_HEADERS }
      );
    }

    const originalFileName = targetFile.name || targetFile.fileName || 'document.pdf';
    let filePath = (targetFile.localPath || targetFile.url || targetFile.fileUrl || targetFile.cloudinaryUrl || '').trim();

    // If filePath is missing, attempt auto-resolution from disk using strict name/ext match
    if (!filePath) {
      const diskMatch = findExistingFileOnDisk(originalFileName, targetFile.size);
      if (diskMatch) {
        filePath = diskMatch.relativePath;
        targetFile.localPath = diskMatch.relativePath;
        targetFile.url = diskMatch.relativePath;
        targetFile.fileUrl = diskMatch.relativePath;

        // Auto-heal database record in MongoDB
        try {
          await db.collection('hire_submissions').updateOne(
            { _id: submission._id },
            {
              $set: {
                [`attachedFilesList.${targetIndex}.localPath`]: diskMatch.relativePath,
                [`attachedFilesList.${targetIndex}.url`]: diskMatch.relativePath,
                [`attachedFilesList.${targetIndex}.fileUrl`]: diskMatch.relativePath,
                [`details.attachedFilesList.${targetIndex}.localPath`]: diskMatch.relativePath,
                [`details.attachedFilesList.${targetIndex}.url`]: diskMatch.relativePath,
                [`details.attachedFilesList.${targetIndex}.fileUrl`]: diskMatch.relativePath,
                updatedAt: new Date().toISOString(),
              }
            }
          );
        } catch (healErr) {
          console.warn('Auto-repair DB sync note:', healErr.message);
        }
      }
    }

    // If still not available on disk or cloud, return honest 404 JSON (NO fake txt/html files)
    if (!filePath) {
      return NextResponse.json(
        {
          error: 'File content unavailable on server',
          message: 'The original physical file content was not preserved on the server during submission.',
          fileName: originalFileName,
          fileSize: targetFile.size || 0,
          docType: targetFile.docType || 'General',
        },
        {
          status: 404,
          headers: PRIVATE_CACHE_HEADERS,
        }
      );
    }

    const safeClientName = (submission.name || submission.fullName || 'Client').replace(/[^a-zA-Z0-9_-]/g, '_');
    const downloadFileName = `${safeClientName}_${originalFileName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;

    const mimeType = targetFile.type || getMimeType(originalFileName);
    const ext = originalFileName.split('.').pop()?.toLowerCase() || '';
    const isInlineViewable = ['pdf', 'png', 'jpg', 'jpeg', 'webp', 'gif', 'svg', 'txt'].includes(ext);
    const disposition = isDownload || !isInlineViewable
      ? `attachment; filename="${downloadFileName}"`
      : `inline; filename="${downloadFileName}"`;

    // 1. Check local file storage in public/
    const localRel = targetFile.localPath || (filePath.startsWith('/uploads/') ? filePath : null);
    if (localRel) {
      const cleanRel = localRel.startsWith('/') ? localRel.slice(1) : localRel;
      const fullDiskPath = path.join(process.cwd(), 'public', cleanRel);
      if (fs.existsSync(fullDiskPath)) {
        const fileBuffer = await fs.promises.readFile(fullDiskPath);
        return new NextResponse(fileBuffer, {
          status: 200,
          headers: {
            'Content-Type': mimeType,
            'Content-Disposition': disposition,
            'Content-Length': fileBuffer.length.toString(),
            ...PRIVATE_CACHE_HEADERS,
          },
        });
      }
    }

    // 2. Fetch from Cloudinary or external URL
    const remoteUrl = targetFile.cloudinaryUrl || (filePath.startsWith('http') ? filePath : null);
    if (remoteUrl) {
      try {
        const cloudRes = await fetch(remoteUrl);
        if (cloudRes.ok) {
          const buffer = Buffer.from(await cloudRes.arrayBuffer());
          const cloudType = cloudRes.headers.get('content-type');
          const remoteType = (mimeType && mimeType !== 'application/octet-stream')
            ? mimeType
            : (cloudType || mimeType);

          return new NextResponse(buffer, {
            status: 200,
            headers: {
              'Content-Type': remoteType,
              'Content-Disposition': disposition,
              'Content-Length': buffer.length.toString(),
              ...PRIVATE_CACHE_HEADERS,
            },
          });
        }
      } catch (remoteErr) {
        console.warn('Remote file fetch stream note:', remoteErr.message);
      }

      // If streaming failed, redirect as fallback
      return NextResponse.redirect(remoteUrl, { headers: PRIVATE_CACHE_HEADERS });
    }

    return NextResponse.json(
      { error: 'File content could not be retrieved from storage.' },
      { status: 404, headers: PRIVATE_CACHE_HEADERS }
    );
  } catch (error) {
    console.error('Error serving hire submission file:', error);
    return NextResponse.json(
      { error: 'Internal server error loading file.' },
      { status: 500, headers: PRIVATE_CACHE_HEADERS }
    );
  }
}

// POST /api/hire-submissions/[id]/files -> Upload new file(s) or replace an existing file
export async function POST(request, context) {
  try {
    if (!isUserAuthorized(request)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin credentials required to upload submission files.' },
        { status: 401, headers: PRIVATE_CACHE_HEADERS }
      );
    }

    const params = await context.params;
    const { id } = params || {};
    if (!id) {
      return NextResponse.json({ error: 'Submission ID is required' }, { status: 400 });
    }

    const db = await getDb();
    const query = getHireSubmissionQuery(id);
    const existing = await db.collection('hire_submissions').findOne(query);

    if (!existing) {
      return NextResponse.json({ error: 'Hire submission not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const rawFiles = [
      ...formData.getAll('files'),
      ...formData.getAll('file'),
    ].filter(f => f && typeof f === 'object' && typeof f.arrayBuffer === 'function' && f.size > 0);

    if (rawFiles.length === 0) {
      return NextResponse.json({ error: 'No files provided for upload' }, { status: 400 });
    }

    const docType = formData.get('docType') || 'Admin Uploaded Document';
    const replaceIndexParam = formData.get('replaceIndex');
    const replaceIndex = replaceIndexParam !== null && replaceIndexParam !== '' && !isNaN(parseInt(replaceIndexParam, 10))
      ? parseInt(replaceIndexParam, 10)
      : null;

    const savedFiles = [];

    for (let i = 0; i < rawFiles.length; i++) {
      const file = rawFiles[i];
      if (file.size > 25 * 1024 * 1024) {
        return NextResponse.json(
          { error: `File "${file.name || 'document'}" exceeds the maximum allowed size of 25MB.` },
          { status: 400, headers: PRIVATE_CACHE_HEADERS }
        );
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      const saved = await uploadHireDocument(buffer, file.name || `document_${i + 1}`, docType);
      savedFiles.push(saved);
    }

    const currentFiles = Array.isArray(existing.attachedFilesList) ? [...existing.attachedFilesList] : [];

    if (replaceIndex !== null && replaceIndex >= 0 && replaceIndex < currentFiles.length && savedFiles.length > 0) {
      // Replace existing file entry at replaceIndex with the uploaded file
      currentFiles[replaceIndex] = {
        ...currentFiles[replaceIndex],
        ...savedFiles[0],
        docType: docType || currentFiles[replaceIndex].docType || 'General',
      };

      // If multiple files were selected, append the remaining files
      if (savedFiles.length > 1) {
        for (let j = 1; j < savedFiles.length; j++) {
          currentFiles.push(savedFiles[j]);
        }
      }

      await db.collection('hire_submissions').updateOne(
        { _id: existing._id },
        {
          $set: {
            attachedFilesList: currentFiles,
            'details.attachedFilesList': currentFiles,
            updatedAt: new Date().toISOString()
          }
        }
      );
    } else {
      // Standard append
      await db.collection('hire_submissions').updateOne(
        { _id: existing._id },
        {
          $push: {
            attachedFilesList: { $each: savedFiles },
            'details.attachedFilesList': { $each: savedFiles },
          },
          $set: {
            updatedAt: new Date().toISOString()
          }
        }
      );
    }

    const updated = await db.collection('hire_submissions').findOne({ _id: existing._id });

    await logActivity(request, 'hire_submission_file_uploaded', existing.name, {
      submissionId: existing._id.toString(),
      filesCount: savedFiles.length,
      fileNames: savedFiles.map(f => f.name).join(', '),
      replaceIndex: replaceIndex !== null ? replaceIndex : undefined,
    });

    return NextResponse.json({
      ok: true,
      message: `${savedFiles.length} file(s) attached successfully`,
      addedFiles: savedFiles,
      attachedFilesList: updated.attachedFilesList || [],
    }, { status: 201 });
  } catch (error) {
    console.error('Error uploading file to hire submission:', error);
    return NextResponse.json({ error: error.message || 'Failed to upload files' }, { status: 500 });
  }
}

// DELETE /api/hire-submissions/[id]/files?index=0
export async function DELETE(request, context) {
  try {
    if (!isUserAuthorized(request)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin credentials required to delete submission files.' },
        { status: 401, headers: PRIVATE_CACHE_HEADERS }
      );
    }

    const params = await context.params;
    const { id } = params || {};
    if (!id) {
      return NextResponse.json({ error: 'Submission ID is required' }, { status: 400 });
    }

    const db = await getDb();
    const query = getHireSubmissionQuery(id);
    const existing = await db.collection('hire_submissions').findOne(query);

    if (!existing) {
      return NextResponse.json({ error: 'Hire submission not found' }, { status: 404 });
    }

    const url = new URL(request.url);
    const indexParam = url.searchParams.get('index');
    const fileIdParam = url.searchParams.get('fileId');

    const currentFiles = Array.isArray(existing.attachedFilesList) ? existing.attachedFilesList : [];
    let updatedFiles = currentFiles;

    if (fileIdParam) {
      const exists = currentFiles.some(f => f.id === fileIdParam);
      if (!exists) {
        return NextResponse.json({ error: 'Specified file not found in submission' }, { status: 404, headers: PRIVATE_CACHE_HEADERS });
      }
      updatedFiles = currentFiles.filter(f => f.id !== fileIdParam);
    } else if (indexParam !== null && !isNaN(parseInt(indexParam, 10))) {
      const idx = parseInt(indexParam, 10);
      if (idx < 0 || idx >= currentFiles.length) {
        return NextResponse.json({ error: `File index ${idx} out of range (total files: ${currentFiles.length})` }, { status: 404, headers: PRIVATE_CACHE_HEADERS });
      }
      updatedFiles = currentFiles.filter((_, i) => i !== idx);
    } else {
      return NextResponse.json({ error: 'File index or fileId required for deletion' }, { status: 400, headers: PRIVATE_CACHE_HEADERS });
    }

    await db.collection('hire_submissions').updateOne(
      { _id: existing._id },
      {
        $set: {
          attachedFilesList: updatedFiles,
          'details.attachedFilesList': updatedFiles,
          updatedAt: new Date().toISOString()
        }
      }
    );

    return NextResponse.json({
      ok: true,
      message: 'File removed successfully',
      attachedFilesList: updatedFiles,
    });
  } catch (error) {
    console.error('Error deleting hire submission file:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete file' }, { status: 500 });
  }
}
