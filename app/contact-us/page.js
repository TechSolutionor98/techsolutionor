import React from 'react';
import ContactHero from '../_components/Contact/ContactHero';
import ContactForm from '../_components/Contact/ContactForm';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/contact-us', {
    title: 'Contact Us | Tech Solutionor',
    description: 'Get in touch with Tech Solutionor for your web, mobile, and enterprise software engineering requirements.',
  });
}

const ContactUsPage = () => {
    return (
        <div className="overflow-x-hidden">
            <ContactHero />
            <ContactForm />
        </div>
    );
};

export default ContactUsPage;
