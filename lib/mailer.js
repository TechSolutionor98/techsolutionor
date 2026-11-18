import nodemailer from 'nodemailer';

export function getMailTransporter() {
  const user = (process.env.SMTP_USER || process.env.SMTP_EMAIL || '').trim();
  let pass = (process.env.SMTP_PASS || process.env.SMTP_PASSWORD || '').trim();
  if (typeof pass === 'string') {
    pass = pass.replace(/^["']|["']$/g, '').trim();
  }

  if (!user || !pass) return null;

  let host = (process.env.SMTP_HOST || '').trim();
  const lowerUser = user.toLowerCase();
  const isGmailUser = lowerUser.endsWith('@gmail.com') || lowerUser.endsWith('@googlemail.com');
  const isTechsolutionorUser = lowerUser.endsWith('@techsolutionor.com');

  if (!host) {
    if (isTechsolutionorUser || !isGmailUser) {
      host = 'smtp.hostinger.com';
    } else {
      host = 'smtp.gmail.com';
    }
  }

  if (host.includes('gmail') && isTechsolutionorUser) {
    console.warn('[SMTP Config] Detected @techsolutionor.com account configured with gmail SMTP host. Auto-correcting host to smtp.hostinger.com.');
    host = 'smtp.hostinger.com';
  }

  const isHostinger = host.includes('hostinger');
  const isGmail = host.includes('gmail');

  let port = parseInt(process.env.SMTP_PORT || '', 10);
  let secure = process.env.SMTP_SECURE === 'true';

  if (isNaN(port)) {
    if (isHostinger || isGmail) {
      port = 465;
      secure = true;
    } else {
      port = 587;
      secure = false;
    }
  } else if (port === 465) {
    secure = true;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

export async function sendEmail({ to, subject, html, text }) {
  const transporter = getMailTransporter();
  if (!transporter) {
    console.warn('SMTP credentials missing in environment variables. Email not sent.');
    return { success: false, reason: 'SMTP credentials missing' };
  }

  const info = await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME || 'Tech Solutionor'}" <${process.env.HR_EMAIL || process.env.SMTP_USER || 'hr@techsolutionor.com'}>`,
    to,
    subject,
    text,
    html,
  });

  return { success: true, messageId: info.messageId };
}

export default { sendEmail, getMailTransporter };
