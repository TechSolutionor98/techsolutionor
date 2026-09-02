import type { Metadata } from "next";
import "./globals.css";
import UserLayoutWrapper from "@/components/UserLayoutWrapper";
import { getDb } from "@/lib/mongodb";

export const metadata: Metadata = {
  title: "Tech Solutioner | Technical Services & Engineering",
  description: "Professional Technical Services and Engineering Solutions.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

async function getWebsiteSettings() {
  try {
    const db = await getDb();
    const settings = await db.collection('settings').findOne({ _id: 'website_settings' });
    return settings || {};
  } catch (err) {
    console.error("Error loading SSR website settings:", err);
    return {};
  }
}

function extractInnerScript(htmlString: string | null | undefined): string {
  if (!htmlString || typeof htmlString !== 'string') return '';
  return htmlString
    .replace(/<script[^>]*>/gi, '')
    .replace(/<\/script>/gi, '')
    .trim();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings: any = await getWebsiteSettings();

  const gaId = settings.googleAnalyticsId?.trim();
  const gtmId = settings.googleTagManagerId?.trim();
  const fbPixelId = settings.facebookPixelId?.trim();
  const customHead = extractInnerScript(settings.customHeadScript);
  const customBody = extractInnerScript(settings.customBodyScript);

  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@500;600;700;800;900&family=Outfit:wght@700;800;900&family=Plus+Jakarta+Sans:wght@700;800;900&family=Roboto:wght@500;700&display=swap" rel="stylesheet" />

        {/* 1. Google Analytics (GA4) */}
        {gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
        {!gaId && settings.googleAnalyticsHeadCode && (
          <script dangerouslySetInnerHTML={{ __html: extractInnerScript(settings.googleAnalyticsHeadCode) }} />
        )}

        {/* 2. Google Tag Manager (GTM) */}
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
        )}
        {!gtmId && settings.googleTagManagerHeadCode && (
          <script dangerouslySetInnerHTML={{ __html: extractInnerScript(settings.googleTagManagerHeadCode) }} />
        )}

        {/* 3. Facebook Pixel */}
        {fbPixelId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${fbPixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
        {!fbPixelId && settings.facebookPixelHeadCode && (
          <script dangerouslySetInnerHTML={{ __html: extractInnerScript(settings.facebookPixelHeadCode) }} />
        )}

        {/* 4. Custom Head Scripts (Microsoft Clarity, Tawk.to, Chat Widgets, etc.) */}
        {customHead && (
          <script dangerouslySetInnerHTML={{ __html: customHead }} />
        )}

        {/* 5. Third-Party Apps (Head) */}
        {Array.isArray(settings.thirdPartyApps) &&
          settings.thirdPartyApps.map((app: any, idx: number) => {
            if (!app.active || !app.codeSnippet || app.target === 'body') return null;
            const code = extractInnerScript(app.codeSnippet);
            return code ? <script key={`app-head-${idx}`} dangerouslySetInnerHTML={{ __html: code }} /> : null;
          })}
      </head>
      <body className="min-h-full flex flex-col bg-[#FFFFFF] text-slate-700 font-sans" suppressHydrationWarning>
        {/* GTM Body Noscript */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {!gtmId && settings.googleTagManagerBodyCode && (
          <div dangerouslySetInnerHTML={{ __html: settings.googleTagManagerBodyCode }} />
        )}

        {/* FB Pixel Body Noscript */}
        {fbPixelId && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        )}
        {!fbPixelId && settings.facebookPixelBodyCode && (
          <div dangerouslySetInnerHTML={{ __html: settings.facebookPixelBodyCode }} />
        )}

        {/* Custom Body Scripts */}
        {customBody && (
          <script dangerouslySetInnerHTML={{ __html: customBody }} />
        )}

        {/* Third-Party Apps (Body) */}
        {Array.isArray(settings.thirdPartyApps) &&
          settings.thirdPartyApps.map((app: any, idx: number) => {
            if (!app.active || !app.codeSnippet || app.target !== 'body') return null;
            const code = extractInnerScript(app.codeSnippet);
            return code ? <script key={`app-body-${idx}`} dangerouslySetInnerHTML={{ __html: code }} /> : null;
          })}

        <UserLayoutWrapper>{children}</UserLayoutWrapper>
      </body>
    </html>
  );
}
