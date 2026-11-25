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
  {
    id: 'hire_intro',
    label: 'Initial Requirement Response & Discovery Call (Hire Us)',
    category: 'hire',
    recommendedStatus: 'In Review',
    subject: 'Re: Resource Requirements & Discovery Call - {{companyName}}',
    bodyText: `Dear {{candidateName}},

Thank you for submitting your talent and resource requirements to {{companyName}}.

We have successfully received your specifications for {{position}}. Our resource management team has conducted an initial evaluation of your criteria, including requested skill sets, experience levels, and work arrangement.

We would be delighted to schedule a brief 15–20 minute discovery call to understand your project roadmap and timelines in greater detail, and present qualified candidate profiles matching your stack.

Please let us know your preferred date and time for a discussion, or reply with any additional technical documentation.

Best regards,
Client Solutions & Resource Management Team
{{companyName}}`,
    bodyHtml: `<p>Dear <strong>{{candidateName}}</strong>,</p>
<p>Thank you for submitting your talent and resource requirements to <strong>{{companyName}}</strong>.</p>
<p>We have successfully received your specifications for <strong>{{position}}</strong>. Our resource management team has conducted an initial evaluation of your criteria, including requested skill sets, experience levels, and work arrangement.</p>
<p>We would be delighted to schedule a brief 15–20 minute discovery call to understand your project roadmap and timelines in greater detail, and present qualified candidate profiles matching your stack.</p>
<p>Please let us know your preferred date and time for a discussion, or reply with any additional technical documentation.</p>
<p>Best regards,<br/><strong>Client Solutions & Resource Management Team</strong><br/>{{companyName}}</p>`,
  },
  {
    id: 'hire_proposal',
    label: 'Resource Proposal & Rate Quote (Hire Us)',
    category: 'hire',
    recommendedStatus: 'Proposal Sent',
    subject: 'Resource Proposal & Engagement Plan - {{companyName}}',
    bodyText: `Dear {{candidateName}},

Following up on your talent requirement for {{position}}, we have compiled a customized resource engagement plan for your review.

Engagement Highlights:
- Dedicated Specialists: Hand-picked developers with proven track records in your stack
- Flexible Timezone Alignment: Overlapping working hours for real-time collaboration
- Transparent Reporting: Daily standups, weekly sprint tracking, and milestone reviews
- Seamless Integration: Rapid onboarding with pre-configured development environments

Please let us know if the proposed arrangement meets your expectations, or if you would like to adjust the team composition or schedule a walkthrough call.

Best regards,
Enterprise Solutions & Talent Team
{{companyName}}`,
    bodyHtml: `<p>Dear <strong>{{candidateName}}</strong>,</p>
<p>Following up on your talent requirement for <strong>{{position}}</strong>, we have compiled a customized resource engagement plan for your review.</p>
<div style="margin: 18px 0; padding: 16px 20px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
  <p style="margin: 0 0 8px; font-weight: 700; color: #1e293b; font-size: 14px;">Engagement Highlights:</p>
  <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 13px; line-height: 1.6;">
    <li><strong>Dedicated Specialists:</strong> Hand-picked developers with proven track records in your stack</li>
    <li><strong>Flexible Timezone Alignment:</strong> Overlapping working hours for real-time collaboration</li>
    <li><strong>Transparent Reporting:</strong> Daily standups, weekly sprint tracking, and milestone reviews</li>
    <li><strong>Seamless Integration:</strong> Rapid onboarding with pre-configured development environments</li>
  </ul>
</div>
<p>Please let us know if the proposed arrangement meets your expectations, or if you would like to adjust the team composition or schedule a walkthrough call.</p>
<p>Best regards,<br/><strong>Enterprise Solutions & Talent Team</strong><br/>{{companyName}}</p>`,
  },
  {
    id: 'hire_onboarding',
    label: 'Resource Onboarding & Kickoff (Hire Us)',
    category: 'hire',
    recommendedStatus: 'Converted',
    subject: 'Welcome to {{companyName}} - Resource Engagement Kickoff',
    bodyText: `Dear {{candidateName}},

We are thrilled to partner with you for your upcoming dedicated resource engagement!

Our administrative and engineering leads are finalizing the onboarding checklist, developer workstation setup, and communication channels (Slack, Jira, GitHub) to ensure a smooth project kickoff.

Your dedicated project coordinator will reach out shortly with access details and introductory schedule for your team members.

Thank you for choosing {{companyName}} as your technology partner.

Warmest regards,
Client Success Team
{{companyName}}`,
    bodyHtml: `<p>Dear <strong>{{candidateName}}</strong>,</p>
<p>We are thrilled to partner with you for your upcoming dedicated resource engagement!</p>
<p>Our administrative and engineering leads are finalizing the onboarding checklist, developer workstation setup, and communication channels (Slack, Jira, GitHub) to ensure a smooth project kickoff.</p>
<p>Your dedicated project coordinator will reach out shortly with access details and introductory schedule for your team members.</p>
<p>Thank you for choosing <strong>{{companyName}}</strong> as your technology partner.</p>
<p>Warmest regards,<br/><strong>Client Success Team</strong><br/>{{companyName}}</p>`,
  },
  {
    id: 'contact_discovery',
    label: 'Inquiry Response & Discovery Call (Contact)',
    category: 'contact',
    recommendedStatus: 'In Review',
    subject: 'Re: Your Inquiry with {{companyName}}',
    bodyText: `Dear {{candidateName}},

Thank you for contacting {{companyName}}. We have received your inquiry regarding our services and digital solutions.

Our technical solutions team has reviewed your message and would love to learn more about your goals and how we can best support your vision.

Could you let us know if you are available for a brief 15-minute consultation this week? Alternatively, feel free to reply directly to this email with any additional specifications or documentation.

We look forward to collaborating with you.

Best regards,
Client Relations Team
{{companyName}}`,
    bodyHtml: `<p>Dear <strong>{{candidateName}}</strong>,</p>
<p>Thank you for contacting <strong>{{companyName}}</strong>. We have received your inquiry regarding our services and digital solutions.</p>
<p>Our technical solutions team has reviewed your message and would love to learn more about your goals and how we can best support your vision.</p>
<p>Could you let us know if you are available for a brief 15-minute consultation this week? Alternatively, feel free to reply directly to this email with any additional specifications or documentation.</p>
<p>We look forward to collaborating with you.</p>
<p>Best regards,<br/><strong>Client Relations Team</strong><br/>{{companyName}}</p>`,
  },
  {
    id: 'contact_quote',
    label: 'Custom Project Scope & Quote Discussion (Contact)',
    category: 'contact',
    recommendedStatus: 'Proposal Sent',
    subject: 'Project Scope & Estimation Discussion - {{companyName}}',
    bodyText: `Dear {{candidateName}},

Thank you for your inquiry regarding {{position}}.

Our engineering architects and project consultants have evaluated your project scope and are preparing a comprehensive proposal, including technical architecture, milestone roadmap, and estimated budget.

To ensure our proposal aligns with your vision, please let us know if there are any specific design references, third-party APIs, or target launch deadlines we should factor in.

Thank you for reaching out to {{companyName}}.

Best regards,
Enterprise Solutions Team
{{companyName}}`,
    bodyHtml: `<p>Dear <strong>{{candidateName}}</strong>,</p>
<p>Thank you for your inquiry regarding <strong>{{position}}</strong>.</p>
<p>Our engineering architects and project consultants have evaluated your project scope and are preparing a comprehensive proposal, including technical architecture, milestone roadmap, and estimated budget.</p>
<p>To ensure our proposal aligns with your vision, please let us know if there are any specific design references, third-party APIs, or target launch deadlines we should factor in.</p>
<p>Thank you for reaching out to <strong>{{companyName}}</strong>.</p>
<p>Best regards,<br/><strong>Enterprise Solutions Team</strong><br/>{{companyName}}</p>`,
  },
  {
    id: 'contact_followup',
    label: 'Project Follow-up & Availability (Contact)',
    category: 'contact',
    recommendedStatus: 'Contacted',
    subject: 'Following Up Regarding Your Inquiry - {{companyName}}',
    bodyText: `Dear {{candidateName}},

I hope this email finds you well.

I am following up on our recent correspondence regarding your inquiry with {{companyName}}. We wanted to check if you had any questions or if you would like to proceed with the next steps.

Our team remains available to answer any questions or arrange a call at your convenience.

Best regards,
Client Relations Team
{{companyName}}`,
    bodyHtml: `<p>Dear <strong>{{candidateName}}</strong>,</p>
<p>I hope this email finds you well.</p>
<p>I am following up on our recent correspondence regarding your inquiry with <strong>{{companyName}}</strong>. We wanted to check if you had any questions or if you would like to proceed with the next steps.</p>
<p>Our team remains available to answer any questions or arrange a call at your convenience.</p>
<p>Best regards,<br/><strong>Client Relations Team</strong><br/>{{companyName}}</p>`,
  },
];

/**
 * Replace placeholders in template text with actual conversation context
 */
export function populateTemplate(template, context = {}) {
  if (!template) return { subject: '', bodyText: '', bodyHtml: '', recommendedStatus: 'open' };

  const candidateName = (context.candidateName || context.name || context.fullName || context.senderName || 'Valued Contact').trim();
  const rawPosition = (context.position || context.service || context.serviceRequired || context.subject || 'Requirements').trim();
  const position = rawPosition
    .replace(/^(re|fwd|fw):\s*/i, '')
    .replace(/^Application for\s+/i, '')
    .replace(/\s*-\s*CV Attached/i, '')
    .replace(/\s*Job$/i, '')
    .trim() || 'Software Solutions';

  const companyName = context.companyName || 'Tech Solutionor';
  const senderName = context.senderName || (template.category === 'career' ? 'Talent Acquisition Team' : 'Client Solutions Team');
  const interviewDate = context.interviewDate || 'Upcoming business day (or your preferred time)';
  const interviewLink = context.interviewLink || 'https://meet.google.com/techsolutionor';

  const replaceTokens = (str = '') =>
    str
      .replace(/{{candidateName}}/g, candidateName)
      .replace(/{{position}}/g, position)
      .replace(/{{service}}/g, position)
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
