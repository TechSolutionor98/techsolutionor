'use client';

import { useEffect, useRef } from 'react';

export default function AnalyticsInjector() {
  const injectedRef = useRef(false);

  useEffect(() => {
    if (injectedRef.current) return;
    injectedRef.current = true;

    async function loadAndInjectSettings() {
      try {
        const res = await fetch('/api/settings/public');
        if (!res.ok) return;
        const settings = await res.json();
        if (!settings) return;

        const headContainer = document.head;
        const bodyContainer = document.body;

        function appendScript(scriptContent, id, isSrc = false, target = 'head') {
          if (!scriptContent || document.getElementById(id)) return;

          const container = target === 'body' ? bodyContainer : headContainer;
          if (!container) return;

          if (isSrc) {
            const script = document.createElement('script');
            script.id = id;
            script.src = scriptContent;
            script.async = true;
            container.appendChild(script);
          } else {
            // Extract raw HTML / script content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = scriptContent;
            
            const scripts = tempDiv.querySelectorAll('script');
            if (scripts.length > 0) {
              scripts.forEach((s, idx) => {
                const newScript = document.createElement('script');
                newScript.id = `${id}_${idx}`;
                if (s.src) {
                  newScript.src = s.src;
                  newScript.async = true;
                } else {
                  newScript.textContent = s.textContent;
                }
                container.appendChild(newScript);
              });
            } else {
              const inlineScript = document.createElement('script');
              inlineScript.id = id;
              inlineScript.textContent = scriptContent;
              container.appendChild(inlineScript);
            }
          }
        }

        // 1. Google Analytics (GA4)
        if (settings.googleAnalyticsId && settings.googleAnalyticsId.trim()) {
          const gaId = settings.googleAnalyticsId.trim();
          appendScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`, 'ga4-src-script', true, 'head');
          appendScript(`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `, 'ga4-init-script', false, 'head');
        } else if (settings.googleAnalyticsHeadCode) {
          appendScript(settings.googleAnalyticsHeadCode, 'ga4-head-custom-code', false, 'head');
        }

        if (settings.googleAnalyticsBodyCode) {
          appendScript(settings.googleAnalyticsBodyCode, 'ga4-body-custom-code', false, 'body');
        }

        // 2. Google Tag Manager (GTM)
        if (settings.googleTagManagerId && settings.googleTagManagerId.trim()) {
          const gtmId = settings.googleTagManagerId.trim();
          appendScript(`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `, 'gtm-head-script', false, 'head');
        } else if (settings.googleTagManagerHeadCode) {
          appendScript(settings.googleTagManagerHeadCode, 'gtm-head-custom-code', false, 'head');
        }

        if (settings.googleTagManagerBodyCode) {
          appendScript(settings.googleTagManagerBodyCode, 'gtm-body-custom-code', false, 'body');
        }

        // 3. Facebook Pixel
        if (settings.facebookPixelId && settings.facebookPixelId.trim()) {
          const fbId = settings.facebookPixelId.trim();
          appendScript(`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${fbId}');
            fbq('track', 'PageView');
          `, 'fb-pixel-head-script', false, 'head');
        } else if (settings.facebookPixelHeadCode) {
          appendScript(settings.facebookPixelHeadCode, 'fb-pixel-head-custom-code', false, 'head');
        }

        if (settings.facebookPixelBodyCode) {
          appendScript(settings.facebookPixelBodyCode, 'fb-pixel-body-custom-code', false, 'body');
        }

        // 4. Custom Head Scripts (Microsoft Clarity, Tawk.to, Chat Widgets, etc.)
        if (settings.customHeadScript && settings.customHeadScript.trim()) {
          appendScript(settings.customHeadScript, 'custom-head-script', false, 'head');
        }

        // 5. Custom Body Scripts
        if (settings.customBodyScript && settings.customBodyScript.trim()) {
          appendScript(settings.customBodyScript, 'custom-body-script', false, 'body');
        }

        // 6. Third-Party Apps
        if (Array.isArray(settings.thirdPartyApps) && settings.thirdPartyApps.length > 0) {
          settings.thirdPartyApps.forEach((app, idx) => {
            if (app.active && app.codeSnippet) {
              appendScript(app.codeSnippet, `third-party-app-${idx}`, false, app.target === 'body' ? 'body' : 'head');
            }
          });
        }

      } catch (err) {
        console.error('Error loading dynamic analytics settings:', err);
      }
    }

    loadAndInjectSettings();
  }, []);

  return null;
}
