import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({ to, subject, html, text }) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP credentials missing in environment variables. Email not sent.');
    return { success: false, reason: 'SMTP credentials missing' };
  }

  const info = await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME || 'Tech Solutionor'}" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });

  return { success: true, messageId: info.messageId };
}

export default transporter;
