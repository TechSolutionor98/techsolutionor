import React from 'react';
import KeyFeatures from '@/components/KeyFeatures/KeyFeatures';

const keyFeatures = [
    {
        title: 'RESTful API Development',
        desc: "Laravel streamlines the development of RESTful APIs with built-in routing, request validation, authentication, and response handling, making API creation secure, scalable, and efficient.",
    },
    {
        title: 'Task Scheduling',
        desc: "Laravel's built-in task scheduler enables developers to automate routine operations such as email notifications, database cleanups, and background jobs without relying on external cron tools.",
    },
    {
        title: 'Testing and Debugging',
        desc: 'Laravel offers seamless PHPUnit integration and built-in testing tools, making it easy to write, manage, and execute tests to ensure application stability and reliability.',
    },
    {
        title: 'Scalability',
        desc: 'Laravel supports scalable application architecture with features like queue management, caching systems, and optimized database handling, ensuring smooth performance as your application grows.',
    },
];

const LaravelCards = () => {
    return <KeyFeatures title="NO RISK." subtitle="ONLY RESULTS." features={keyFeatures} />;
};

export default LaravelCards;
