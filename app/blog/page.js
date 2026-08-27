import React from 'react';
import BlogHero from '../_components/Blog/BlogHero';
import BlogList from '../_components/Blog/BlogList';
import WebDevImg from '../../components/Images/webdevbannerpic.png';
import SeoImg from '../../components/Images/Seobgbanner.png';
import AppImg from '../../components/Images/appdev.png';
import EcommerceImg from '../../components/Images/Ecommerceframework.png';
import SoftwareImg from '../../components/Images/softwaredevbanner.webp';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/blog', {
    title: 'Tech Blog & Insights | Tech Solutionor',
    description: 'Read latest articles, technical guides, web development news, and SEO strategies from Tech Solutionor.',
  });
}

const BlogPage = () => {
    const posts = [
        {
            title: "Things You Must Know Before Hiring a Web Development Agency",
            slug: "hiring-web-development-agency",
            category: "Web Development",
            image: WebDevImg,
            excerpt: "Choosing the right web development partner is crucial for your business's online success. In this guide, we break down the essential factors you need to consider before signing any contracts.",
            date: "March 5, 2026"
        },
        {
            title: "How SEO Can Transform Your Business in 2026",
            slug: "seo-transformation-2026",
            category: "SEO",
            image: SeoImg,
            excerpt: "As search engine algorithms continue to evolve, staying ahead of the curve is more important than ever. Learn the latest SEO strategies that drive organic growth and ROI.",
            date: "March 3, 2026"
        },
        {
            title: "Top 5 Mobile App Development Trends to Watch",
            slug: "mobile-app-trends-2026",
            category: "App Development",
            image: AppImg,
            excerpt: "From AI integration to 5G capabilities, mobile app development is rapidly changing. Discover the trends that will define the mobile experience in 2026.",
            date: "March 1, 2026"
        },
        {
            title: "E-commerce Strategies for Global Success",
            slug: "ecommerce-global-strategies",
            category: "E-commerce",
            image: EcommerceImg,
            excerpt: "Ready to scale your online store beyond borders? We explore the logistical, technical, and marketing challenges of global e-commerce and how to overcome them.",
            date: "February 25, 2026"
        },
        {
            title: "The Future of Custom Software Solutions",
            slug: "future-custom-software",
            category: "Software Development",
            image: SoftwareImg,
            excerpt: "Why off-the-shelf software might be holding your business back. Learn how custom software development provides a competitive edge in a digital-first world.",
            date: "February 20, 2026"
        }
    ];

    const categories = [
        { name: "Web Development", slug: "web-development", count: 12 },
        { name: "App Development", slug: "app-development", count: 8 },
        { name: "SEO & Marketing", slug: "seo-marketing", count: 15 },
        { name: "E-commerce", slug: "e-commerce", count: 6 },
        { name: "Software Development", slug: "software-development", count: 4 },
    ];

    const recentPosts = posts.slice(0, 3);

    return (
        <main className="min-h-screen">
            <BlogHero />
            <BlogList
                posts={posts}
                categories={categories}
                recentPosts={recentPosts}
            />
        </main>
    );
};

export default BlogPage;
