import fs from 'fs';
import { ImapFlow } from 'imapflow';
import nodemailer from 'nodemailer';

// Read .env file directly
const env = fs.readFileSync('.env', 'utf-8');
env.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const idx = trimmed.indexOf('=');
    if (idx !== -1) {
      const k = trimmed.slice(0, idx).trim();
      let v = trimmed.slice(idx + 1).trim();
      v = v.replace(/^["']|["']$/g, '');
      process.env[k] = v;
    }
  }
});

console.log('--- ENV VALUES LOADED ---');
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);
console.log('SMTP_SECURE:', process.env.SMTP_SECURE);
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS:', '***' + (process.env.SMTP_PASS || '').slice(-3));
console.log('IMAP_HOST:', process.env.IMAP_HOST);
console.log('IMAP_PORT:', process.env.IMAP_PORT);
console.log('IMAP_SECURE:', process.env.IMAP_SECURE);
console.log('IMAP_USER:', process.env.IMAP_USER);
console.log('HR_EMAIL:', process.env.HR_EMAIL);
console.log('INBOUND_EMAIL_SECRET:', process.env.INBOUND_EMAIL_SECRET);

async function testAll() {
  console.log('\n[1/2] Testing Hostinger SMTP connection...');
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 10000,
    });
    await transporter.verify();
    console.log('✓ Hostinger SMTP verified successfully! Ready to send emails.');
  } catch (err) {
    console.error('✗ SMTP verification failed:', err.message);
  }

  console.log('\n[2/2] Testing Hostinger IMAP connection...');
  try {
    const imapClient = new ImapFlow({
      host: process.env.IMAP_HOST,
      port: parseInt(process.env.IMAP_PORT, 10),
      secure: process.env.IMAP_SECURE === 'true',
      auth: {
        user: process.env.IMAP_USER,
        pass: process.env.IMAP_PASS,
      },
      logger: false,
      tls: { rejectUnauthorized: false },
      connectionTimeout: 10000,
    });
    await imapClient.connect();
    console.log('✓ Hostinger IMAP connected successfully!');
    const mailboxStatus = await imapClient.status('INBOX', { messages: true, unseen: true });
    console.log('✓ Mailbox status:', mailboxStatus);
    await imapClient.logout();
  } catch (err) {
    console.error('✗ IMAP connection failed:', err.message);
  }

  console.log('\n--- VERIFICATION COMPLETE ---');
}

testAll();
