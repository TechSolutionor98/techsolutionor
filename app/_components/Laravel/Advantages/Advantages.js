import React from 'react';
import Advantages from '@/components/Advantages/Advantages';

const advantagesData = [
  {
    title: 'Clean and Readable Syntax',
    desc: "Laravel's expressive and clean syntax improves developer productivity, making code easier to write, understand, and maintain.",
  },
  {
    title: 'Extensive Ecosystem',
    desc: 'Laravel provides a rich ecosystem of tools such as Laravel Forge, Vapor, Horizon, and Nova, enabling faster development, deployment, and monitoring.',
  },
  {
    title: 'Strong Community Support',
    desc: 'Laravel has a large and active global community, offering extensive documentation, tutorials, packages, and ongoing updates, ensuring long-term support and innovation.',
  },
];

function LaravelAdvantages() {
  return (
    <Advantages
      title="Advantages"
      subtitle="Why modern engineering teams and enterprises choose Laravel to power their digital applications."
      items={advantagesData}
    />
  );
}

export default LaravelAdvantages;
