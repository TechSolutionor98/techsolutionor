import React from 'react';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export const revalidate = 0;

export async function generateMetadata() {
  return generateCmsMetadata('/technologies/go', {
    title: 'Golang Development Services | Tech Solutioner',
    description: 'Scalable cloud-native Go microservices and backend API development services.',
  });
}

export default function GoTechPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-6 text-center">
        <h1 className="text-4xl font-extrabold text-blue-400">Golang Microservices & API Engineering</h1>
        <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
          Leverage Go for concurrent, cloud-native backend infrastructure and high-throughput microservices.
        </p>
      </div>
    </div>
  );
}
