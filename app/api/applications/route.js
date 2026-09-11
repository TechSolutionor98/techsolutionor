import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { logActivity } from '@/lib/activity-logger';
import { uploadImage } from '@/lib/cloudinary';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

async function saveFileLocally(buffer, originalName) {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'resumes');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const ext = path.extname(originalName || 'resume.pdf') || '.pdf';
  const base = path.basename(originalName || 'resume', ext).replace(/[^a-zA-Z0-9_-]/g, '_');
  const cleanName = `${Date.now()}-${base}${ext}`;
  const filePath = path.join(uploadDir, cleanName);
  await fs.promises.writeFile(filePath, buffer);
  return `/uploads/resumes/${cleanName}`;
}

async function uploadResumeBuffer(buffer, originalName) {
  // Always save locally first so we have a guaranteed local copy
  const localUrl = await saveFileLocally(buffer, originalName);

  try {
    const ext = (originalName || '').split('.').pop()?.toLowerCase() || 'pdf';
    const isRaw = ext === 'doc' || ext === 'docx';
    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'techsolutionor/resumes',
          resource_type: isRaw ? 'raw' : 'auto',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      ).end(buffer);
    });
    if (res && (res.secure_url || res.url)) {
      return { cvUrl: res.secure_url || res.url, localCvPath: localUrl };
    }
  } catch (cloudErr) {
    console.warn('Cloudinary upload note:', cloudErr?.message || cloudErr);
  }
  return { cvUrl: localUrl, localCvPath: localUrl };
}

export async function GET() {
  try {
    const db = await getDb();
    const data = await db.collection('applications').find({}).sort({ createdAt: -1, _id: -1 }).toArray();
    const formatted = data.map(item => ({
      ...item,
      id: item._id.toString(),
      status: item.status || 'Pending',
    }));
    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let name = '';
    let email = '';
    let phone = '';
    let position = '';
    let experience = '';
    let education = '';
    let coverLetter = '';
    let portfolio = '';
    let cvUrl = '';
    let cvFileName = '';
    let localCvPath = '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      name = (formData.get('name') || '').toString().trim();
      email = (formData.get('email') || '').toString().trim().toLowerCase();
      phone = (formData.get('phone') || '').toString().trim();
      position = (formData.get('position') || '').toString().trim();
      experience = (formData.get('experience') || '').toString().trim();
      education = (formData.get('education') || '').toString().trim();
      coverLetter = (formData.get('coverLetter') || formData.get('message') || '').toString().trim();
      portfolio = (formData.get('portfolio') || formData.get('linkedin') || '').toString().trim();
      cvUrl = (formData.get('cvUrl') || formData.get('cv') || '').toString().trim();

      const file = formData.get('resume') || formData.get('file') || formData.get('cvFile');
      if (file && typeof file === 'object' && file.size > 0) {
        cvFileName = file.name || 'resume.pdf';
        const fileExt = path.extname(cvFileName).toLowerCase();
        const allowedExtensions = ['.pdf', '.doc', '.docx'];
        if (!allowedExtensions.includes(fileExt)) {
          return NextResponse.json({ error: 'Invalid file format. Allowed formats: PDF (.pdf), DOC (.doc), and DOCX (.docx).' }, { status: 400 });
        }
        if (file.size > 10 * 1024 * 1024) {
          return NextResponse.json({ error: 'File size exceeds the 10MB limit. Please upload a smaller file.' }, { status: 400 });
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadResult = await uploadResumeBuffer(buffer, cvFileName);
        cvUrl = uploadResult.cvUrl;
        localCvPath = uploadResult.localCvPath;
      }
    } else {
      const body = await request.json();
      name = (body.name || '').toString().trim();
      email = (body.email || '').toString().trim().toLowerCase();
      phone = (body.phone || '').toString().trim();
      position = (body.position || '').toString().trim();
      experience = (body.experience || '').toString().trim();
      education = (body.education || '').toString().trim();
      coverLetter = (body.coverLetter || body.message || '').toString().trim();
      portfolio = (body.portfolio || body.linkedin || '').toString().trim();
      cvUrl = (body.cv || body.cvUrl || '').toString().trim();
      cvFileName = (body.cvFileName || '').toString().trim();
      localCvPath = (body.localCvPath || '').toString().trim();
    }

    // Comprehensive Field Validation
    if (!name || name.length < 2) {
      return NextResponse.json({ error: 'Please enter your full name (at least 2 characters).' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address (e.g. name@example.com).' }, { status: 400 });
    }

    const digits = phone.replace(/\D/g, '');
    if (!phone || digits.length < 7 || digits.length > 15) {
      return NextResponse.json({ error: 'Please enter a valid phone number (between 7 and 15 digits).' }, { status: 400 });
    }

    if (!position) {
      return NextResponse.json({ error: 'Please select the position you are applying for.' }, { status: 400 });
    }

    if (!experience) {
      return NextResponse.json({ error: 'Please select your years of relevant experience.' }, { status: 400 });
    }

    if (!coverLetter || coverLetter.length < 20) {
      return NextResponse.json({ error: 'Please provide a cover letter or application message (at least 20 characters).' }, { status: 400 });
    }

    if (!cvUrl) {
      return NextResponse.json({ error: 'Please upload your Resume / CV (.pdf, .doc, or .docx).' }, { status: 400 });
    }

    if (portfolio) {
      const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/i;
      if (!urlPattern.test(portfolio)) {
        return NextResponse.json({ error: 'Please enter a valid website or profile URL (e.g., https://linkedin.com/in/username).' }, { status: 400 });
      }
    }

    // Ensure relative local CV URLs have leading slash
    if (cvUrl && !cvUrl.startsWith('http://') && !cvUrl.startsWith('https://') && !cvUrl.startsWith('/')) {
      cvUrl = `/${cvUrl}`;
    }

    const db = await getDb();
    const now = new Date().toISOString();
    const doc = {
      name,
      email,
      phone,
      position,
      experience,
      education,
      coverLetter,
      message: coverLetter, // backward compatibility
      portfolio,
      cv: cvUrl,
      localCvPath: localCvPath || (cvUrl && cvUrl.startsWith('/uploads/') ? cvUrl : ''),
      cvFileName: cvFileName || (cvUrl ? path.basename(cvUrl) : ''),
      status: 'Pending',
      createdAt: now,
      updatedAt: now,
    };

    const res = await db.collection('applications').insertOne(doc);
    const entry = { id: res.insertedId.toString(), _id: res.insertedId.toString(), ...doc };

    await logActivity(request, 'career_application_submitted', name, { email, position, id: entry.id });

    return NextResponse.json({ ok: true, entry, message: 'Application submitted successfully!' }, { status: 201 });
  } catch (err) {
    console.error('Failed to save application:', err);
    return NextResponse.json({ error: 'Failed to process application. Please try again.' }, { status: 500 });
  }
}
