import nodemailer from 'nodemailer';

function getTransporter() {
  const user = process.env.SMTP_USER || process.env.SMTP_EMAIL || 'Osumfix@gmail.com';
  let pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || 'ygre mdup eglu gnou';
  
  // Strip surrounding quotes if present in .env
  if (typeof pass === 'string') {
    pass = pass.replace(/^["']|["']$/g, '').trim();
  }

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';

  if (host.includes('gmail')) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }

  return nodemailer.createTransport({
    host,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  });
}

/**
 * 1. Send Application Submission Confirmation Email
 * Sent to the applicant immediately after successful OTP verification and application creation.
 */
export async function sendApplicationSubmissionConfirmation({ application }) {
  if (!application || !application.email) {
    return { success: false, reason: 'Applicant email missing' };
  }

  const applicantName = application.name || 'Candidate';
  const position = application.position || 'Open Position';
  const companyName = process.env.SMTP_FROM_NAME || 'Tech Solutionor';
  const senderEmail = process.env.SMTP_USER || process.env.SMTP_EMAIL || 'Osumfix@gmail.com';
  const phone = application.phone || 'Not provided';
  const experience = application.experience || 'Not specified';
  const submittedDate = application.createdAt
    ? new Date(application.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const subject = `Application Received: ${position} at ${companyName}`;

  const confirmationHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Application Received - Tech Solutionor</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color:#334155;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" style="max-width:620px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;" cellpadding="0" cellspacing="0">
                <!-- Header Banner -->
                <tr>
                  <td style="background: linear-gradient(135deg, #181a18 0%, #0d0f12 100%); padding: 36px 32px; text-align: center; border-bottom: 3px solid #36963D;">
                    <h1 style="color: #ffffff; font-size: 26px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">
                      Tech <span style="color: #36963D;">Solutionor</span>
                    </h1>
                    <p style="color: #94a3b8; font-size: 13px; font-weight: 500; margin: 6px 0 0 0; text-transform: uppercase; letter-spacing: 2px;">
                      Talent Acquisition & Careers
                    </p>
                  </td>
                </tr>

                <!-- Content Body -->
                <tr>
                  <td style="padding: 36px 32px;">
                    <!-- Status Badge -->
                    <div style="text-align: center; margin-bottom: 24px;">
                      <span style="display: inline-block; background-color: #ecfdf5; color: #047857; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; padding: 8px 18px; border-radius: 9999px; border: 1px solid #a7f3d0;">
                        ⏳ Status: Pending Review
                      </span>
                    </div>

                    <h2 style="color: #0f172a; font-size: 22px; font-weight: 700; margin: 0 0 16px 0; text-align: center;">
                      Application Successfully Received!
                    </h2>

                    <p style="font-size: 15px; line-height: 1.7; color: #475569; margin: 0 0 20px 0;">
                      Dear <strong>${applicantName}</strong>,
                    </p>

                    <p style="font-size: 15px; line-height: 1.7; color: #475569; margin: 0 0 24px 0;">
                      Thank you for submitting your job application to <strong>${companyName}</strong>. We are pleased to confirm that your application for the <strong style="color: #0f172a;">${position}</strong> position and uploaded CV/resume have been successfully registered with our recruitment team.
                    </p>

                    <!-- Application Details Summary Box -->
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 22px; margin: 0 0 26px 0;">
                      <h3 style="color: #0f172a; font-size: 14px; font-weight: 700; margin: 0 0 14px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                        Application Summary
                      </h3>
                      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; line-height: 1.8; color: #475569;">
                        <tr>
                          <td style="padding: 4px 0; width: 40%; color: #64748b; font-weight: 600;">Position:</td>
                          <td style="padding: 4px 0; color: #0f172a; font-weight: 700;">${position}</td>
                        </tr>
                        <tr>
                          <td style="padding: 4px 0; color: #64748b; font-weight: 600;">Candidate Name:</td>
                          <td style="padding: 4px 0; color: #0f172a;">${applicantName}</td>
                        </tr>
                        <tr>
                          <td style="padding: 4px 0; color: #64748b; font-weight: 600;">Registered Email:</td>
                          <td style="padding: 4px 0; color: #0f172a;">${application.email}</td>
                        </tr>
                        <tr>
                          <td style="padding: 4px 0; color: #64748b; font-weight: 600;">Phone Number:</td>
                          <td style="padding: 4px 0; color: #0f172a;">${phone}</td>
                        </tr>
                        <tr>
                          <td style="padding: 4px 0; color: #64748b; font-weight: 600;">Experience:</td>
                          <td style="padding: 4px 0; color: #0f172a;">${experience}</td>
                        </tr>
                        <tr>
                          <td style="padding: 4px 0; color: #64748b; font-weight: 600;">Submission Date:</td>
                          <td style="padding: 4px 0; color: #0f172a;">${submittedDate}</td>
                        </tr>
                        <tr>
                          <td style="padding: 4px 0; color: #64748b; font-weight: 600;">Initial Status:</td>
                          <td style="padding: 4px 0; color: #16a34a; font-weight: 700;">Pending Review</td>
                        </tr>
                      </table>
                    </div>

                    <!-- What to Expect Next Box -->
                    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #36963D; border-radius: 8px; padding: 20px; margin: 0 0 28px 0;">
                      <h4 style="color: #0f172a; font-size: 14px; font-weight: 700; margin: 0 0 10px 0;">
                        What Happens Next:
                      </h4>
                      <ol style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.7; color: #475569;">
                        <li style="margin-bottom: 6px;">Our Talent Acquisition and engineering leads will thoroughly evaluate your application, credentials, and portfolio.</li>
                        <li style="margin-bottom: 6px;">Whenever our team reviews or updates your application status (e.g. Approved for interview or under consideration), you will automatically receive an update email at <strong>${application.email}</strong>.</li>
                        <li>If there is a strong alignment with our technical criteria, our team will reach out directly to coordinate an introductory interview.</li>
                      </ol>
                    </div>

                    <div style="text-align: center; margin: 28px 0 10px 0;">
                      <a href="https://techsolutionor.com/career" style="display: inline-block; background-color: #36963D; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 13px 30px; border-radius: 50px; box-shadow: 0 4px 12px rgba(54, 150, 61, 0.25);">
                        View Careers Portal
                      </a>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 24px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
                    <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b; font-weight: 500;">
                      Tech Solutionor · Global Digital & IT Solutions
                    </p>
                    <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                      You are receiving this confirmation because an application was submitted with this email on Tech Solutionor. If you did not make this submission, please contact <a href="mailto:${senderEmail}" style="color: #36963D; text-decoration: none;">${senderEmail}</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: `"Tech Solutionor Careers" <${senderEmail}>`,
      to: application.email,
      subject,
      html: confirmationHtml,
      text: `Dear ${applicantName},\n\nThank you for applying for the ${position} position at ${companyName}! We have received your application and resume. Your application status is currently set to Pending Review. You will receive email notifications as your status is updated.\n\nBest regards,\nTech Solutionor Careers`,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send application confirmation email:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 2. Send Application Status Update Email
 * Sent whenever the Admin changes the status (Pending -> Approved, Pending -> Rejected, or future update).
 */
export async function sendApplicationStatusNotification({ application, status, note = '' }) {
  if (!application || !application.email) {
    return { success: false, reason: 'Applicant email missing' };
  }

  const applicantName = application.name || 'Candidate';
  const position = application.position || 'Open Position';
  const companyName = process.env.SMTP_FROM_NAME || 'Tech Solutionor';
  const senderEmail = process.env.SMTP_USER || process.env.SMTP_EMAIL || 'Osumfix@gmail.com';
  
  const isApproved = status === 'Approved';
  const isRejected = status === 'Rejected';

  const subject = isApproved
    ? `Application Approved: Welcome to the Next Step at ${companyName}! (${position})`
    : isRejected
    ? `Update Regarding Your Application for ${position} at ${companyName}`
    : `Application Status Update: Application Under Review for ${position} at ${companyName}`;

  const approvedHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Application Approved</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color:#334155;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" style="max-width:620px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;" cellpadding="0" cellspacing="0">
                <!-- Header Banner -->
                <tr>
                  <td style="background: linear-gradient(135deg, #181a18 0%, #0d0f12 100%); padding: 36px 32px; text-align: center; border-bottom: 3px solid #36963D;">
                    <h1 style="color: #ffffff; font-size: 26px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">
                      Tech <span style="color: #36963D;">Solutionor</span>
                    </h1>
                    <p style="color: #94a3b8; font-size: 13px; font-weight: 500; margin: 6px 0 0 0; text-transform: uppercase; letter-spacing: 2px;">
                      Talent Acquisition & Careers
                    </p>
                  </td>
                </tr>

                <!-- Content Body -->
                <tr>
                  <td style="padding: 36px 32px;">
                    <!-- Status Badge -->
                    <div style="text-align: center; margin-bottom: 24px;">
                      <span style="display: inline-block; background-color: #e6f9f0; color: #16a34a; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; padding: 8px 18px; border-radius: 9999px; border: 1px solid #bbf7d0;">
                        ✓ Application Approved
                      </span>
                    </div>

                    <h2 style="color: #0f172a; font-size: 22px; font-weight: 700; margin: 0 0 16px 0; text-align: center;">
                      Congratulations, ${applicantName}!
                    </h2>

                    <p style="font-size: 15px; line-height: 1.7; color: #475569; margin: 0 0 20px 0;">
                      We are thrilled to let you know that our recruitment team has reviewed your application and profile for the 
                      <strong style="color: #0f172a;">${position}</strong> position. Your background, skills, and experience stood out to our hiring team, and your application has been <strong style="color: #16a34a;">Approved</strong> for the next phase!
                    </p>

                    ${note ? `
                    <div style="background-color: #f8fafc; border-left: 4px solid #36963D; padding: 16px; border-radius: 6px; margin: 20px 0;">
                      <p style="margin: 0; font-size: 14px; color: #334155;">
                        <strong>Note from Hiring Manager:</strong><br/>
                        ${note}
                      </p>
                    </div>
                    ` : ''}

                    <!-- Next Steps Box -->
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 26px 0;">
                      <h3 style="color: #0f172a; font-size: 15px; font-weight: 700; margin: 0 0 14px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                        What to Expect Next:
                      </h3>
                      <ol style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.7; color: #475569;">
                        <li style="margin-bottom: 8px;">Our Talent Acquisition specialist will contact you via email or phone to schedule your initial technical & culture discussion.</li>
                        <li style="margin-bottom: 8px;">Please have your project portfolio, code repositories, or work samples ready for walkthrough.</li>
                        <li>Feel free to reply directly to this email if you have any immediate scheduling constraints or questions.</li>
                      </ol>
                    </div>

                    <div style="text-align: center; margin: 32px 0 16px 0;">
                      <a href="https://techsolutionor.com" style="display: inline-block; background-color: #36963D; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 14px 32px; border-radius: 50px; box-shadow: 0 4px 12px rgba(54, 150, 61, 0.3);">
                        Visit Our Website
                      </a>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 24px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
                    <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b; font-weight: 500;">
                      Tech Solutionor · Global Digital & IT Solutions
                    </p>
                    <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                      This is an automated notification regarding your job application. If you have any inquiries, contact our careers team at <a href="mailto:${senderEmail}" style="color: #36963D; text-decoration: none;">${senderEmail}</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const rejectedHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Application Status Update</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color:#334155;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" style="max-width:620px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;" cellpadding="0" cellspacing="0">
                <!-- Header Banner -->
                <tr>
                  <td style="background: linear-gradient(135deg, #181a18 0%, #0d0f12 100%); padding: 36px 32px; text-align: center; border-bottom: 3px solid #36963D;">
                    <h1 style="color: #ffffff; font-size: 26px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">
                      Tech <span style="color: #36963D;">Solutionor</span>
                    </h1>
                    <p style="color: #94a3b8; font-size: 13px; font-weight: 500; margin: 6px 0 0 0; text-transform: uppercase; letter-spacing: 2px;">
                      Talent Acquisition & Careers
                    </p>
                  </td>
                </tr>

                <!-- Content Body -->
                <tr>
                  <td style="padding: 36px 32px;">
                    <!-- Status Badge -->
                    <div style="text-align: center; margin-bottom: 24px;">
                      <span style="display: inline-block; background-color: #fef2f2; color: #dc2626; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; padding: 8px 18px; border-radius: 9999px; border: 1px solid #fecaca;">
                        Application Status Update
                      </span>
                    </div>

                    <h2 style="color: #0f172a; font-size: 20px; font-weight: 700; margin: 0 0 16px 0; text-align: center;">
                      Update on your application for ${position}
                    </h2>

                    <p style="font-size: 15px; line-height: 1.7; color: #475569; margin: 0 0 16px 0;">
                      Dear ${applicantName},
                    </p>

                    <p style="font-size: 15px; line-height: 1.7; color: #475569; margin: 0 0 16px 0;">
                      Thank you very much for your interest in joining <strong>${companyName}</strong> and for taking the time to share your background and application for the <strong style="color: #0f172a;">${position}</strong> role.
                    </p>

                    <p style="font-size: 15px; line-height: 1.7; color: #475569; margin: 0 0 16px 0;">
                      We received a high volume of impressive applications for this position. After careful review and deliberation by our engineering leadership team, we have decided to move forward with other candidates whose current skill profile more closely matches the specific demands of this opening.
                    </p>

                    ${note ? `
                    <div style="background-color: #f8fafc; border-left: 4px solid #94a3b8; padding: 16px; border-radius: 6px; margin: 20px 0;">
                      <p style="margin: 0; font-size: 14px; color: #334155;">
                        <strong>Feedback:</strong><br/>
                        ${note}
                      </p>
                    </div>
                    ` : ''}

                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0;">
                      <p style="font-size: 14px; line-height: 1.7; color: #475569; margin: 0;">
                        We were genuinely impressed with your talents and dedication. We would love to keep your profile on file in our talent pool for future opportunities as our engineering and design teams continue to expand.
                      </p>
                    </div>

                    <p style="font-size: 15px; line-height: 1.7; color: #475569; margin: 0 0 24px 0;">
                      We sincerely wish you the best of luck in your career search and future professional endeavors.
                    </p>

                    <p style="font-size: 14px; color: #334155; margin: 0; font-weight: 600;">
                      Warm regards,<br/>
                      <span style="color: #36963D;">The Tech Solutionor Talent Team</span>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 24px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
                    <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b; font-weight: 500;">
                      Tech Solutionor · Global Digital & IT Solutions
                    </p>
                    <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                      You are receiving this update regarding your application submitted on <a href="https://techsolutionor.com/career" style="color: #36963D; text-decoration: none;">techsolutionor.com/career</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const pendingHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Application Status Update</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color:#334155;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" style="max-width:620px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;" cellpadding="0" cellspacing="0">
                <!-- Header Banner -->
                <tr>
                  <td style="background: linear-gradient(135deg, #181a18 0%, #0d0f12 100%); padding: 36px 32px; text-align: center; border-bottom: 3px solid #36963D;">
                    <h1 style="color: #ffffff; font-size: 26px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">
                      Tech <span style="color: #36963D;">Solutionor</span>
                    </h1>
                    <p style="color: #94a3b8; font-size: 13px; font-weight: 500; margin: 6px 0 0 0; text-transform: uppercase; letter-spacing: 2px;">
                      Talent Acquisition & Careers
                    </p>
                  </td>
                </tr>

                <!-- Content Body -->
                <tr>
                  <td style="padding: 36px 32px;">
                    <!-- Status Badge -->
                    <div style="text-align: center; margin-bottom: 24px;">
                      <span style="display: inline-block; background-color: #fef9c3; color: #854d0e; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; padding: 8px 18px; border-radius: 9999px; border: 1px solid #fde047;">
                        ⏳ Status: Under Review (Pending)
                      </span>
                    </div>

                    <h2 style="color: #0f172a; font-size: 20px; font-weight: 700; margin: 0 0 16px 0; text-align: center;">
                      Update on your application for ${position}
                    </h2>

                    <p style="font-size: 15px; line-height: 1.7; color: #475569; margin: 0 0 16px 0;">
                      Dear ${applicantName},
                    </p>

                    <p style="font-size: 15px; line-height: 1.7; color: #475569; margin: 0 0 16px 0;">
                      We are writing to update you that your job application for the <strong style="color: #0f172a;">${position}</strong> position at <strong>${companyName}</strong> is currently active and under review by our talent acquisition team.
                    </p>

                    ${note ? `
                    <div style="background-color: #f8fafc; border-left: 4px solid #eab308; padding: 16px; border-radius: 6px; margin: 20px 0;">
                      <p style="margin: 0; font-size: 14px; color: #334155;">
                        <strong>Hiring Team Note:</strong><br/>
                        ${note}
                      </p>
                    </div>
                    ` : ''}

                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0;">
                      <p style="font-size: 14px; line-height: 1.7; color: #475569; margin: 0;">
                        Our recruitment coordinators are assessing all candidate files. You will automatically receive another email notification as soon as a final decision or interview schedule is confirmed.
                      </p>
                    </div>

                    <p style="font-size: 14px; color: #334155; margin: 0; font-weight: 600;">
                      Warm regards,<br/>
                      <span style="color: #36963D;">The Tech Solutionor Talent Team</span>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 24px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
                    <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b; font-weight: 500;">
                      Tech Solutionor · Global Digital & IT Solutions
                    </p>
                    <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                      You are receiving this update regarding your application submitted on <a href="https://techsolutionor.com/career" style="color: #36963D; text-decoration: none;">techsolutionor.com/career</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const html = isApproved ? approvedHtml : isRejected ? rejectedHtml : pendingHtml;
  const text = isApproved
    ? `Dear ${applicantName},\n\nCongratulations! Your application for the ${position} role at ${companyName} has been APPROVED for the next step. Our talent team will be in touch with you shortly.${note ? `\n\nNote from Hiring Manager: ${note}` : ''}\n\nBest regards,\n${companyName}`
    : isRejected
    ? `Dear ${applicantName},\n\nThank you for applying for the ${position} role at ${companyName}. At this time, we have decided to move forward with other candidates.${note ? `\n\nFeedback: ${note}` : ''}\n\nBest regards,\n${companyName}`
    : `Dear ${applicantName},\n\nYour application for the ${position} role at ${companyName} is currently under review by our talent acquisition team.${note ? `\n\nNote: ${note}` : ''}\n\nBest regards,\n${companyName}`;

  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: `"Tech Solutionor Careers" <${senderEmail}>`,
      to: application.email,
      subject,
      html,
      text,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send application status email notification:', error);
    return { success: false, error: error.message };
  }
}
