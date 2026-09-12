import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { logActivity } from '@/lib/activity-logger';
import cloudinary, { uploadImage } from '@/lib/cloudinary';
import { sendApplicationSubmissionConfirmation } from '@/lib/application-mailer';
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
    let cvFiles = [];
    let portfolioLinks = [];

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

      // Collect portfolio links (supports JSON array or multiple fields)
      const rawPortfolioLinks = formData.get('portfolioLinks');
      if (rawPortfolioLinks) {
        try {
          const parsed = JSON.parse(rawPortfolioLinks);
          if (Array.isArray(parsed)) portfolioLinks = parsed;
        } catch (_) {}
      }
      if (portfolioLinks.length === 0) {
        const allPortfolioInputs = [
          ...formData.getAll('portfolio'),
          ...formData.getAll('portfolios'),
          ...formData.getAll('portfolioLinks'),
        ];
        for (const item of allPortfolioInputs) {
          if (typeof item === 'string' && item.trim()) {
            try {
              const parsed = JSON.parse(item);
              if (Array.isArray(parsed)) {
                portfolioLinks.push(...parsed.filter(Boolean));
                continue;
              }
            } catch (_) {}
            portfolioLinks.push(...item.split(',').map(s => s.trim()).filter(Boolean));
          }
        }
      }
      portfolioLinks = [...new Set(portfolioLinks.map(l => (l || '').trim()).filter(Boolean))];
      if (portfolioLinks.length > 0) {
        portfolio = portfolioLinks.join(', ');
      }

      // Collect multiple uploaded CV files
      const rawFiles = [
        ...formData.getAll('resumes'),
        ...formData.getAll('resume'),
        ...formData.getAll('files'),
        ...formData.getAll('file'),
        ...formData.getAll('cvFile'),
      ].filter(f => f && typeof f === 'object' && f.size > 0);

      const uniqueFiles = [];
      const seenFileKeys = new Set();
      for (const file of rawFiles) {
        const key = `${file.name}-${file.size}`;
        if (!seenFileKeys.has(key)) {
          seenFileKeys.add(key);
          uniqueFiles.push(file);
        }
      }

      for (const file of uniqueFiles) {
        const curFileName = file.name || 'resume.pdf';
        const fileExt = path.extname(curFileName).toLowerCase();
        const allowedExtensions = ['.pdf', '.doc', '.docx'];
        if (!allowedExtensions.includes(fileExt)) {
          return NextResponse.json({ error: `Invalid file format for "${curFileName}". Allowed formats: PDF (.pdf), DOC (.doc), and DOCX (.docx).` }, { status: 400 });
        }
        if (file.size > 10 * 1024 * 1024) {
          return NextResponse.json({ error: `File "${curFileName}" exceeds the 10MB limit. Please upload a smaller file.` }, { status: 400 });
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadResult = await uploadResumeBuffer(buffer, curFileName);
        cvFiles.push({
          cvUrl: uploadResult.cvUrl,
          cv: uploadResult.cvUrl,
          localCvPath: uploadResult.localCvPath,
          cvFileName: curFileName,
          fileName: curFileName,
          fileSize: file.size,
        });
      }

      if (cvFiles.length > 0) {
        cvUrl = cvFiles[0].cvUrl;
        cvFileName = cvFiles[0].cvFileName;
        localCvPath = cvFiles[0].localCvPath;
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

      if (Array.isArray(body.portfolioLinks)) {
        portfolioLinks = body.portfolioLinks.map(l => (l || '').trim()).filter(Boolean);
        portfolio = portfolioLinks.join(', ');
      } else if (portfolio) {
        portfolioLinks = portfolio.split(',').map(l => l.trim()).filter(Boolean);
      }

      if (Array.isArray(body.cvFiles)) {
        cvFiles = body.cvFiles;
      }
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

    if (!cvUrl && cvFiles.length === 0) {
      return NextResponse.json({ error: 'Please upload at least one Resume / CV (.pdf, .doc, or .docx).' }, { status: 400 });
    }

    // Validate each portfolio link if provided
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/i;
    for (const link of portfolioLinks) {
      if (!urlPattern.test(link)) {
        return NextResponse.json({ error: `Please enter a valid website or profile URL for "${link}" (e.g., https://linkedin.com/in/username).` }, { status: 400 });
      }
    }

    // Ensure relative local CV URLs have leading slash
    if (cvUrl && !cvUrl.startsWith('http://') && !cvUrl.startsWith('https://') && !cvUrl.startsWith('/')) {
      cvUrl = `/${cvUrl}`;
    }

    const db = await getDb();

    // Security Check: Applicant must have successfully verified their email via OTP
    const otpRecord = await db.collection('otps').findOne({ 
      email, 
      verified: true 
    });

    if (!otpRecord) {
      return NextResponse.json({ 
        error: 'Email verification required. Please verify your email with the 6-digit code before submitting your application.' 
      }, { status: 403 });
    }

    if (new Date() > new Date(otpRecord.expiresAt)) {
      await db.collection('otps').deleteMany({ email });
      return NextResponse.json({ 
        error: 'Your verification session has expired. Please request a new verification code and try again.' 
      }, { status: 403 });
    }

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
      portfolioLinks: portfolioLinks.length > 0 ? portfolioLinks : (portfolio ? [portfolio] : []),
      cv: cvUrl,
      localCvPath: localCvPath || (cvUrl && cvUrl.startsWith('/uploads/') ? cvUrl : ''),
      cvFileName: cvFileName || (cvUrl ? path.basename(cvUrl) : ''),
      cvFiles: cvFiles.length > 0 ? cvFiles : (cvUrl ? [{ cvUrl, cv: cvUrl, cvFileName, fileName: cvFileName, localCvPath }] : []),
      status: 'Pending',
      createdAt: now,
      updatedAt: now,
    };

    const res = await db.collection('applications').insertOne(doc);
    const entry = { id: res.insertedId.toString(), _id: res.insertedId.toString(), ...doc };

    // Clean up / consume the verified OTP so it cannot be reused
    await db.collection('otps').deleteMany({ email });

    await logActivity(request, 'career_application_submitted', name, { email, position, id: entry.id });

    // Send confirmation email to applicant
    try {
      await sendApplicationSubmissionConfirmation({ application: entry });
    } catch (mailErr) {
      console.error('Failed to dispatch submission confirmation email:', mailErr);
    }

    return NextResponse.json({ ok: true, entry, message: 'Application submitted successfully!' }, { status: 201 });
  } catch (err) {
    console.error('Failed to save application:', err);
    return NextResponse.json({ error: 'Failed to process application. Please try again.' }, { status: 500 });
  }
}
