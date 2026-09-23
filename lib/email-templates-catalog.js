/**
 * Tech Solutionor Master Pre-Built Email Templates Catalog
 * 
 * Defined once in code and reused whenever the admin replies.
 * Includes dynamic token replacement for {{candidateName}}, {{position}},
 * {{companyName}}, {{senderName}}, {{interviewDate}}, {{interviewLink}}.
 */

export const PREBUILT_EMAIL_TEMPLATES = [
  {
    id: 'app_received',
    label: 'Application Received (Career)',
    category: 'career',
    recommendedStatus: 'open',
    subject: 'Application Received: {{position}} at {{companyName}}',
    bodyText: `Dear {{candidateName}},

Thank you for your interest in joining {{companyName}} and for submitting your application for the {{position}} role.

We have successfully received your credentials and application details. Our recruitment team is currently reviewing your profile to determine if your background aligns with our immediate technical requirements and team criteria.

We evaluate applications carefully and will reach out to you with an update once the initial screening phase is concluded.

Thank you again for considering a career with {{companyName}}.

Best regards,
{{senderName}}
{{companyName}}`,
    bodyHtml: `<p>Dear <strong>{{candidateName}}</strong>,</p>
<p>Thank you for your interest in joining <strong>{{companyName}}</strong> and for submitting your application for the <strong>{{position}}</strong> role.</p>
<p>We have successfully received your credentials and application details. Our recruitment team is currently reviewing your profile to determine if your background aligns with our immediate technical requirements and team criteria.</p>
<p>We evaluate applications carefully and will reach out to you with an update once the initial screening phase is concluded.</p>
<p>Thank you again for considering a career with {{companyName}}.</p>
<p>Best regards,<br/><strong>{{senderName}}</strong><br/>{{companyName}}</p>`,
  },
  {
    id: 'app_under_review',
    label: 'Application Under Review (Career)',
    category: 'career',
    recommendedStatus: 'under_review',
    subject: 'Application Status: {{position}} is Under Review with {{companyName}}',
    bodyText: `Dear {{candidateName}},

We are writing to inform you that your application for the {{position}} position at {{companyName}} is currently undergoing detailed review by our technical team and department leads.

We appreciate the depth of experience outlined in your application. Our team reviews all qualified candidates thoroughly and aims to provide formal feedback within 3 to 5 business days.

Thank you for your patience and ongoing enthusiasm for {{companyName}}.

Warm regards,
{{senderName}}
{{companyName}}`,
    bodyHtml: `<p>Dear <strong>{{candidateName}}</strong>,</p>
<p>We are writing to inform you that your application for the <strong>{{position}}</strong> position at <strong>{{companyName}}</strong> is currently undergoing detailed review by our technical team and department leads.</p>
<p>We appreciate the depth of experience outlined in your application. Our team reviews all qualified candidates thoroughly and aims to provide formal feedback within 3 to 5 business days.</p>
<p>Thank you for your patience and ongoing enthusiasm for {{companyName}}.</p>
<p>Warm regards,<br/><strong>{{senderName}}</strong><br/>{{companyName}}</p>`,
  },
  {
    id: 'interview_invitation',
    label: 'Interview Invitation (Career)',
    category: 'career',
    recommendedStatus: 'interview_scheduled',
    subject: 'Interview Invitation: {{position}} at {{companyName}}',
    bodyText: `Dear {{candidateName}},

Thank you for applying for the {{position}} position at {{companyName}}. Following a thorough review of your background and achievements, we are delighted to invite you for an introductory technical interview.

Interview Details:
- Format: Online Video Call
- Meeting Link: {{interviewLink}}
- Proposed Schedule: {{interviewDate}}
- Duration: Approximately 30–45 minutes

During this session, we will discuss your technical background, previous projects, and answer any questions you have about the team and role at {{companyName}}.

Please reply directly to this email to confirm if this proposed schedule works for you, or let us know alternative days/times when you are available.

We look forward to speaking with you!

Best regards,
{{senderName}}
{{companyName}}`,
    bodyHtml: `<p>Dear <strong>{{candidateName}}</strong>,</p>
<p>Thank you for applying for the <strong>{{position}}</strong> position at <strong>{{companyName}}</strong>. Following a thorough review of your background and achievements, we are delighted to invite you for an introductory technical interview.</p>
<div style="margin: 20px 0; padding: 16px 20px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px;">
  <p style="margin: 0 0 6px; font-weight: 700; color: #166534; font-size: 14px;">Interview Details:</p>
  <ul style="margin: 0; padding-left: 20px; color: #15803d; font-size: 13px; line-height: 1.6;">
    <li><strong>Format:</strong> Online Video Call</li>
    <li><strong>Meeting Link:</strong> <a href="{{interviewLink}}" style="color: #15803d; font-weight: 600;">{{interviewLink}}</a></li>
    <li><strong>Proposed Schedule:</strong> {{interviewDate}}</li>
    <li><strong>Duration:</strong> Approximately 30–45 minutes</li>
  </ul>
</div>
<p>During this session, we will discuss your technical background, previous projects, and answer any questions you have about the team and role at {{companyName}}.</p>
<p>Please reply directly to this email to confirm if this proposed schedule works for you, or let us know alternative days/times when you are available.</p>
<p>We look forward to speaking with you!</p>
<p>Best regards,<br/><strong>{{senderName}}</strong><br/>{{companyName}}</p>`,
  },
  {
    id: 'more_info_cv',
    label: 'Request for More Information / CV (Career)',
    category: 'career',
    recommendedStatus: 'under_review',
    subject: 'Request for Information: Application for {{position}} at {{companyName}}',
    bodyText: `Dear {{candidateName}},

Thank you for your interest in the {{position}} position with {{companyName}}.

To assist our hiring team in evaluating your profile comprehensively, could you please reply to this email with the following details:

1. An updated copy of your CV / Resume (PDF format preferred)
2. Links to your GitHub profile, online portfolio, or live projects
3. Your current employment status, notice period, and earliest available start date
4. Your expected compensation range

You can attach any requested documents and reply directly to this email at your earliest convenience.

Thank you, and we look forward to reviewing your additional details.

Best regards,
{{senderName}}
{{companyName}}`,
    bodyHtml: `<p>Dear <strong>{{candidateName}}</strong>,</p>
<p>Thank you for your interest in the <strong>{{position}}</strong> position with <strong>{{companyName}}</strong>.</p>
<p>To assist our hiring team in evaluating your profile comprehensively, could you please reply to this email with the following details:</p>
<div style="margin: 18px 0; padding: 14px 20px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
  <ol style="margin: 0; padding-left: 18px; color: #334155; font-size: 13px; line-height: 1.7;">
    <li>An updated copy of your CV / Resume (PDF format preferred)</li>
    <li>Links to your GitHub profile, online portfolio, or live projects</li>
    <li>Your current employment status, notice period, and earliest available start date</li>
    <li>Your expected compensation range</li>
  </ol>
</div>
<p>You can attach any requested documents and reply directly to this email at your earliest convenience.</p>
<p>Thank you, and we look forward to reviewing your additional details.</p>
<p>Best regards,<br/><strong>{{senderName}}</strong><br/>{{companyName}}</p>`,
  },
  {
    id: 'app_approved',
    label: 'Application Approved (Career)',
    category: 'career',
    recommendedStatus: 'approved',
    subject: 'Congratulations! Application Approved for {{position}} at {{companyName}}',
    bodyText: `Dear {{candidateName}},

Congratulations! We are delighted to inform you that your application for the {{position}} role at {{companyName}} has been officially Approved.

Our team was thoroughly impressed by your technical capabilities, problem-solving mindset, and the professional experience you demonstrated throughout the evaluation process.

Our talent acquisition team will be in touch shortly with the formal documentation, offer details, and onboarding schedule.

We are excited about the prospect of having you on our team and building great technology together!

Warmest regards,
{{senderName}}
{{companyName}}`,
    bodyHtml: `<p>Dear <strong>{{candidateName}}</strong>,</p>
<p>Congratulations! We are delighted to inform you that your application for the <strong>{{position}}</strong> role at <strong>{{companyName}}</strong> has been officially <strong>Approved</strong>.</p>
<p>Our team was thoroughly impressed by your technical capabilities, problem-solving mindset, and the professional experience you demonstrated throughout the evaluation process.</p>
<div style="margin: 20px 0; padding: 16px 20px; background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px;">
  <p style="margin: 0; font-weight: 700; color: #065f46; font-size: 14px;">Next Steps:</p>
  <p style="margin: 6px 0 0; color: #047857; font-size: 13px;">Our talent acquisition team will be in touch shortly with the formal documentation, offer details, and onboarding schedule.</p>
</div>
<p>We are excited about the prospect of having you on our team and building great technology together!</p>
<p>Warmest regards,<br/><strong>{{senderName}}</strong><br/>{{companyName}}</p>`,
  },
  {
    id: 'app_rejected',
    label: 'Application Rejected / Talent Pool (Career)',
    category: 'career',
    recommendedStatus: 'rejected',
    subject: 'Update Regarding Your Application for {{position}} at {{companyName}}',
    bodyText: `Dear {{candidateName}},

Thank you very much for your interest in {{companyName}} and for taking the time to apply and interview for the {{position}} position.

After careful consideration of all applications received, we have decided to move forward with another candidate whose background more closely matches the specialized technical requirements of this specific role at this time.

This was a difficult decision given the high caliber of your qualifications. We were genuinely impressed by your skills and achievements, and with your permission, we would like to keep your resume in our talent pool for upcoming openings that better align with your profile.

We wish you every success in your ongoing job search and future professional endeavors.

Sincerely,
{{senderName}}
{{companyName}}`,
    bodyHtml: `<p>Dear <strong>{{candidateName}}</strong>,</p>
<p>Thank you very much for your interest in <strong>{{companyName}}</strong> and for taking the time to apply and interview for the <strong>{{position}}</strong> position.</p>
<p>After careful consideration of all applications received, we have decided to move forward with another candidate whose background more closely matches the specialized technical requirements of this specific role at this time.</p>
<p>This was a difficult decision given the high caliber of your qualifications. We were genuinely impressed by your skills and achievements, and with your permission, we would like to keep your resume in our talent pool for upcoming openings that better align with your profile.</p>
<p>We wish you every success in your ongoing job search and future professional endeavors.</p>
<p>Sincerely,<br/><strong>{{senderName}}</strong><br/>{{companyName}}</p>`,
  },
  {
    id: 'general_reply',
    label: 'General Contact / Inquiry Reply (General)',
    category: 'general',
    recommendedStatus: 'open',
    subject: 'Re: Your Inquiry with {{companyName}}',
    bodyText: `Dear {{candidateName}},

Thank you for reaching out to {{companyName}}.

We have received your message regarding our software engineering, web development, and digital technology solutions. Our team has reviewed your inquiry and is ready to assist you.

Could you please share any specific project specifications, timelines, or goals you have in mind? Alternatively, if you would prefer to schedule a brief discovery call to discuss your needs in real time, please let us know your preferred availability.

We look forward to collaborating with you.

Best regards,
Client Relations Team
{{companyName}}`,
    bodyHtml: `<p>Dear <strong>{{candidateName}}</strong>,</p>
<p>Thank you for reaching out to <strong>{{companyName}}</strong>.</p>
<p>We have received your message regarding our software engineering, web development, and digital technology solutions. Our team has reviewed your inquiry and is ready to assist you.</p>
<p>Could you please share any specific project specifications, timelines, or goals you have in mind? Alternatively, if you would prefer to schedule a brief discovery call to discuss your needs in real time, please let us know your preferred availability.</p>
<p>We look forward to collaborating with you.</p>
<p>Best regards,<br/><strong>Client Relations Team</strong><br/>{{companyName}}</p>`,
  },
];

/**
 * Replace placeholders in template text with actual conversation context
 */
export function populateTemplate(template, context = {}) {
  if (!template) return { subject: '', bodyText: '', bodyHtml: '', recommendedStatus: 'open' };

  const candidateName = (context.candidateName || context.senderName || 'Valued Contact').trim();
  const rawPosition = (context.position || context.subject || 'Open Position').trim();
  const position = rawPosition
    .replace(/^(re|fwd|fw):\s*/i, '')
    .replace(/^Application for\s+/i, '')
    .replace(/\s*-\s*CV Attached/i, '')
    .replace(/\s*Job$/i, '')
    .trim() || 'Software Engineer';

  const companyName = context.companyName || 'Tech Solutionor';
  const senderName = context.senderName || 'Talent Acquisition Team';
  const interviewDate = context.interviewDate || 'Upcoming business day (or your preferred time)';
  const interviewLink = context.interviewLink || 'https://meet.google.com/techsolutionor';

  const replaceTokens = (str = '') =>
    str
      .replace(/{{candidateName}}/g, candidateName)
      .replace(/{{position}}/g, position)
      .replace(/{{companyName}}/g, companyName)
      .replace(/{{senderName}}/g, senderName)
      .replace(/{{interviewDate}}/g, interviewDate)
      .replace(/{{interviewLink}}/g, interviewLink);

  return {
    id: template.id,
    label: template.label,
    category: template.category,
    recommendedStatus: template.recommendedStatus || 'open',
    subject: replaceTokens(template.subject),
    bodyText: replaceTokens(template.bodyText),
    bodyHtml: replaceTokens(template.bodyHtml),
  };
}
