import fs from 'fs';
import { wrapWithTechSolutionorTemplate } from '../lib/email-branded-template.js';

const html = wrapWithTechSolutionorTemplate({
  contentHtml: `
    <p>Dear <strong>Valued Candidate</strong>,</p>
    <p>Thank you for reaching out to <strong>Tech Solutionor</strong> regarding career opportunities. We are pleased to confirm that your profile is currently under review with our technical team.</p>
    <div style="margin: 20px 0; padding: 16px 20px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px;">
      <p style="margin: 0; font-weight: 700; color: #166534; font-size: 14px;">Next Steps:</p>
      <p style="margin: 6px 0 0; color: #15803d; font-size: 13px;">Our recruitment specialist will contact you within 2-3 business days with an interview schedule.</p>
    </div>
    <p>We appreciate your interest in building innovative technology solutions with us.</p>
  `,
  subject: 'Application Under Review: Senior Full Stack Developer at Tech Solutionor',
  recipientName: 'Valued Candidate',
  includeSignature: true,
});

fs.writeFileSync('scratch/preview_email.html', html, 'utf8');
console.log('Saved scratch/preview_email.html successfully.');
