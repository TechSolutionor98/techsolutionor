import React from 'react';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/privacy-policy', {
    title: 'Privacy Policy | Tech Solutioner',
    description: 'Read the privacy policy for Tech Solutioner and learn how we collect, protect, and handle your data.',
  });
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-extrabold text-blue-400">Privacy Policy</h1>
        <p className="text-gray-300 leading-relaxed">
          Tech Solutioner is committed to protecting your privacy. This Privacy Policy outlines how your personal information is collected, used, and safeguarded when you visit our website.
        </p>
        <div className="border-t border-slate-800 pt-6 space-y-4 text-gray-400 text-sm">
          <h2 className="text-xl font-bold text-white">Information Collection & Use</h2>
          <p>
            We gather information to provide better services to our users. Standard logging, analytics data, and form submission entries are processed strictly for business operations and customer support.
          </p>
        </div>
      </div>
    </div>
  );
}
