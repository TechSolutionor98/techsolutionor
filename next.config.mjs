/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: [
    'imapflow',
    'mailparser',
    'mongodb',
    'cloudinary',
    'nodemailer',
  ],
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'swiper',
      '@tsparticles/react',
      'tsparticles',
    ],
  },
  outputFileTracingExcludes: {
    '*': [
      'public/**',
      'src/Components/Images/**',
      'content/**',
      'scripts/**',
      'scratch/**',
      'node_modules/@img/sharp-win32-x64/**',
      'node_modules/@img/sharp-libvips-win32-x64/**',
    ],
    '**': [
      'public/**',
      'src/Components/Images/**',
      'content/**',
      'scripts/**',
      'scratch/**',
      'node_modules/@img/sharp-win32-x64/**',
      'node_modules/@img/sharp-libvips-win32-x64/**',
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/contact',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/projects',
        destination: '/our-portfolio',
        permanent: true,
      },
      {
        source: '/technologies/google-ads',
        destination: '/services/google-ads',
        permanent: true,
      },
      {
        source: '/technologies/meta',
        destination: '/services/meta',
        permanent: true,
      },
      {
        source: '/services/hire-us',
        destination: '/hire-us',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
