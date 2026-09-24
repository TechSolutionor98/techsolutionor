/**
 * Tech Solutionor Master Email Template Engine
 * 
 * Generates responsive, bulletproof HTML email templates compatible with Gmail,
 * Outlook, Apple Mail, Yahoo Mail, and mobile clients.
 *
 * Structure:
 * - Top: Tech Solutionor Official Logo, brand accent (#41B349), and company tagline
 * - Center: Dynamic email message body (paragraphs, lists, callout blocks, HR signature)
 * - Bottom: Social media channels (LinkedIn, Instagram, Facebook, X/Twitter, YouTube, Website),
 *           contact details, and copyright/legal footer on #41B349 background
 */

export const TECH_SOLUTIONOR_BRAND = {
  name: 'Tech Solutionor',
  tagline: 'Global Digital Solutions & Technology Innovations',
  website: 'https://techsolutionor.com',
  hrEmail: 'hr@techsolutionor.com',
  contactEmail: 'contact@techsolutionor.com',
  // Official Tech Solutionor black and green logo hosted on global high-speed CDN
  logoUrl: 'https://cdn.jsdelivr.net/gh/TechSolutionor98/techsolutionor@main/src/Components/Images/blacklogo.png',
  primaryColor: '#41B349',
  primaryDark: '#34953C',
  footerBg: '#41B349',
  secondaryColor: '#0f172a',
  textColor: '#1e293b',
  lightBg: '#f8fafc',
  borderColor: '#e2e8f0',
  social: {
    linkedin: 'https://www.linkedin.com/company/techsolutionor/posts/?feedView=all',
    instagram: 'https://www.instagram.com/tech_solutionor/?hl=en',
    facebook: 'https://www.facebook.com/techsolutionor',
    twitter: 'https://x.com/techsolutionors',
    youtube: 'https://www.youtube.com/@techsolutionor',
    website: 'https://techsolutionor.com',
    calendar: 'https://techsolutionor.com',
  },
  // Bulletproof retina PNG icons for Gmail, Apple Mail, Outlook, mobile clients
  socialIcons: {
    linkedin: 'https://img.icons8.com/color/48/linkedin.png',
    instagram: 'https://img.icons8.com/color/48/instagram-new--v1.png',
    facebook: 'https://img.icons8.com/color/48/facebook-new.png',
    twitter: 'https://img.icons8.com/color/48/twitterx--v1.png',
    youtube: 'https://img.icons8.com/color/48/youtube-play.png',
    website: 'https://img.icons8.com/ios-filled/50/41B349/domain--v1.png',
  }
};

/**
 * Wraps raw email message HTML into the master Tech Solutionor branded email template.
 *
 * @param {Object} options
 * @param {string} options.contentHtml - The email body content (HTML or paragraphs)
 * @param {string} [options.subject] - The email subject line
 * @param {string} [options.recipientName] - Recipient candidate/client name
 * @param {string} [options.preheaderText] - Preview text displayed in email client inbox snippet
 * @param {boolean} [options.includeSignature=true] - Whether to append official HR signature block
 * @param {string} [options.logoUrl] - Custom logo URL override
 * @returns {string} Full HTML email document
 */
export function wrapWithTechSolutionorTemplate({
  contentHtml = '',
  subject = '',
  recipientName = '',
  preheaderText = '',
  includeSignature = true,
  logoUrl,
} = {}) {
  const currentYear = new Date().getFullYear();
  const preheader = preheaderText || (contentHtml.replace(/<[^>]*>/g, '').slice(0, 140) + '...');
  const activeLogoUrl = logoUrl || TECH_SOLUTIONOR_BRAND.logoUrl;


  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${escapeHtml(subject || 'Tech Solutionor Communication')}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; margin: auto !important; }
      .content-padding { padding: 24px 20px !important; }
      .header-padding { padding: 20px 20px !important; }
      .footer-padding { padding: 24px 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9;">
  <!-- Preheader text for inbox snippet -->
  <div style="display: none; font-size: 1px; color: #f1f5f9; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
    ${escapeHtml(preheader)}
  </div>

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container (600px) -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06); border: 1px solid #e2e8f0;">
          
          <!-- TOP: Emerald Accent Bar -->
          <tr>
            <td style="background: linear-gradient(90deg, #41B349 0%, #34953C 100%); height: 5px; line-height: 5px; font-size: 5px;">&nbsp;</td>
          </tr>

          <!-- TOP: Header with Official Logo -->
          <tr>
            <td align="center" class="header-padding" style="padding: 24px 36px 18px; background-color: #ffffff; border-bottom: 1px solid #f1f5f9;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="${TECH_SOLUTIONOR_BRAND.website}" target="_blank" style="text-decoration: none; display: inline-block;">
                      <img src="${activeLogoUrl}" onerror="this.onerror=null;this.src='/images/techsolutionor-logo.png';" alt="Tech Solutionor" width="140" style="display: block; width: 140px; max-width: 140px; height: auto; margin: 0 auto; border: 0; outline: none; text-decoration: none;" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 8px;">
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 700; color: #41B349; letter-spacing: 1.5px; text-transform: uppercase;">
                      Global Digital Solutions
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CENTER: Email Content / Message Body -->
          <tr>
            <td class="content-padding" style="padding: 36px; background-color: #ffffff;">
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.65; color: #1e293b;">
                ${contentHtml}
              </div>
            </td>
          </tr>

          <!-- BOTTOM: Tech Solutionor Social Media Links & Footer on #41B349 -->
          <tr>
            <td class="footer-padding" style="padding: 30px 32px 26px; background-color: #41B349; text-align: center; border-top: 2px solid #34953C;">
              <!-- Social Media Icon Buttons -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto 18px;">
                <tr>
                  <!-- LinkedIn -->
                  <td align="center" valign="middle" style="padding: 0 4px;">
                    <a href="${TECH_SOLUTIONOR_BRAND.social.linkedin}" target="_blank" title="LinkedIn - Tech Solutionor" style="text-decoration: none; display: inline-block;">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate;">
                        <tr>
                          <td align="center" valign="middle" width="36" height="36" style="width: 36px; height: 36px; background-color: #ffffff; border-radius: 50%; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.12); padding: 0;">
                            <img src="${TECH_SOLUTIONOR_BRAND.socialIcons.linkedin}" width="18" height="18" alt="LinkedIn" style="display: block; width: 18px; height: 18px; border: 0; outline: none; margin: 0 auto;" />
                          </td>
                        </tr>
                      </table>
                    </a>
                  </td>
                  <!-- Instagram -->
                  <td align="center" valign="middle" style="padding: 0 4px;">
                    <a href="${TECH_SOLUTIONOR_BRAND.social.instagram}" target="_blank" title="Instagram - Tech Solutionor" style="text-decoration: none; display: inline-block;">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate;">
                        <tr>
                          <td align="center" valign="middle" width="36" height="36" style="width: 36px; height: 36px; background-color: #ffffff; border-radius: 50%; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.12); padding: 0;">
                            <img src="${TECH_SOLUTIONOR_BRAND.socialIcons.instagram}" width="18" height="18" alt="Instagram" style="display: block; width: 18px; height: 18px; border: 0; outline: none; margin: 0 auto;" />
                          </td>
                        </tr>
                      </table>
                    </a>
                  </td>
                  <!-- Facebook -->
                  <td align="center" valign="middle" style="padding: 0 4px;">
                    <a href="${TECH_SOLUTIONOR_BRAND.social.facebook}" target="_blank" title="Facebook - Tech Solutionor" style="text-decoration: none; display: inline-block;">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate;">
                        <tr>
                          <td align="center" valign="middle" width="36" height="36" style="width: 36px; height: 36px; background-color: #ffffff; border-radius: 50%; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.12); padding: 0;">
                            <img src="${TECH_SOLUTIONOR_BRAND.socialIcons.facebook}" width="18" height="18" alt="Facebook" style="display: block; width: 18px; height: 18px; border: 0; outline: none; margin: 0 auto;" />
                          </td>
                        </tr>
                      </table>
                    </a>
                  </td>
                  <!-- Twitter / X -->
                  <td align="center" valign="middle" style="padding: 0 4px;">
                    <a href="${TECH_SOLUTIONOR_BRAND.social.twitter}" target="_blank" title="X (Twitter) - Tech Solutionor" style="text-decoration: none; display: inline-block;">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate;">
                        <tr>
                          <td align="center" valign="middle" width="36" height="36" style="width: 36px; height: 36px; background-color: #ffffff; border-radius: 50%; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.12); padding: 0;">
                            <img src="${TECH_SOLUTIONOR_BRAND.socialIcons.twitter}" width="18" height="18" alt="X (Twitter)" style="display: block; width: 18px; height: 18px; border: 0; outline: none; margin: 0 auto;" />
                          </td>
                        </tr>
                      </table>
                    </a>
                  </td>
                  <!-- YouTube -->
                  <td align="center" valign="middle" style="padding: 0 4px;">
                    <a href="${TECH_SOLUTIONOR_BRAND.social.youtube}" target="_blank" title="YouTube - Tech Solutionor" style="text-decoration: none; display: inline-block;">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate;">
                        <tr>
                          <td align="center" valign="middle" width="36" height="36" style="width: 36px; height: 36px; background-color: #ffffff; border-radius: 50%; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.12); padding: 0;">
                            <img src="${TECH_SOLUTIONOR_BRAND.socialIcons.youtube}" width="18" height="18" alt="YouTube" style="display: block; width: 18px; height: 18px; border: 0; outline: none; margin: 0 auto;" />
                          </td>
                        </tr>
                      </table>
                    </a>
                  </td>
                  <!-- Website -->
                  <td align="center" valign="middle" style="padding: 0 4px;">
                    <a href="${TECH_SOLUTIONOR_BRAND.website}" target="_blank" title="Tech Solutionor Website" style="text-decoration: none; display: inline-block;">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate;">
                        <tr>
                          <td align="center" valign="middle" width="36" height="36" style="width: 36px; height: 36px; background-color: #ffffff; border-radius: 50%; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.12); padding: 0;">
                            <img src="${TECH_SOLUTIONOR_BRAND.socialIcons.website}" width="18" height="18" alt="Website" style="display: block; width: 18px; height: 18px; border: 0; outline: none; margin: 0 auto;" />
                          </td>
                        </tr>
                      </table>
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Tagline -->
              <p style="margin: 0 0 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px;">
                Empowering Global Technology Solutions
              </p>

              <!-- Company & Legal Notice -->
              <p style="margin: 0 0 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; color: #ffffff; opacity: 0.95; line-height: 1.5;">
                This message was sent from <a href="mailto:hr@techsolutionor.com" style="color: #ffffff; font-weight: 700; text-decoration: underline;">hr@techsolutionor.com</a> regarding communication with Tech Solutionor.
              </p>
              <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; color: #ffffff; opacity: 0.85;">
                &copy; ${currentYear} Tech Solutionor. All rights reserved. &bull; <a href="https://techsolutionor.com/privacy-policy" style="color: #ffffff; text-decoration: underline;">Privacy Policy</a> &bull; <a href="https://techsolutionor.com/contact-us" style="color: #ffffff; text-decoration: underline;">Contact Us</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
