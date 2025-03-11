import { useState } from 'react';

const PrivacyPolicy = () => {
    const [activeSection, setActiveSection] = useState(null);

    const toggleSection = (sectionId) => {
        setActiveSection(activeSection === sectionId ? null : sectionId);
    };

    const sections = [
        {
            id: 'introduction',
            title: '1. Introduction',
            content: (
                <p>
                    Welcome to Luna Rest (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring
                    the security of your personal information. This Privacy Policy explains how we collect, use, disclose,
                    and safeguard your information when you use our sleep quality prediction website and related services
                    (collectively, the &quot;Service&quot;).
                    <br /><br />
                    By accessing or using Luna Rest, you agree to this Privacy Policy. If you do not agree with the terms
                    of this policy, please do not access or use our Service.
                </p>
            )
        },
        {
            id: 'information-we-collect',
            title: '2. Information We Collect',
            content: (
                <div>
                    <h4 className="font-medium text-lg mb-2">2.1 Information You Provide</h4>
                    <p className="mb-4">
                        We collect information that you voluntarily provide when using Luna Rest, including:
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li><span className="font-medium">Account Information</span>: Name, email address, password, and other details you provide when creating an account.</li>
                        <li><span className="font-medium">Profile Information</span>: Age, gender, university/college affiliation, and other demographic information.</li>
                        <li><span className="font-medium">Sleep-Related Data</span>: Information you input about your sleep patterns, including sleep hours, bedtime, wake time, and sleep quality ratings.</li>
                        <li><span className="font-medium">Lifestyle Information</span>: Data about factors that may affect sleep quality, such as:</li>
                        <ul className="list-disc pl-6 mt-1 mb-2 space-y-1">
                            <li>Caffeine intake</li>
                            <li>Physical activity levels</li>
                            <li>Study hours</li>
                            <li>Screen time</li>
                            <li>Stress levels</li>
                            <li>Mood indicators</li>
                        </ul>
                        <li><span className="font-medium">Journal Entries</span>: Content you write in the journal feature.</li>
                        <li><span className="font-medium">Goals</span>: Sleep-related goals you set and progress data.</li>
                    </ul>

                    <h4 className="font-medium text-lg mb-2">2.2 Information Collected Automatically</h4>
                    <p className="mb-2">
                        When you use Luna Rest, we may automatically collect certain information about your device and usage, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li><span className="font-medium">Device Information</span>: IP address, browser type, operating system, and device identifiers.</li>
                        <li><span className="font-medium">Usage Data</span>: How you interact with our Service, pages viewed, time spent on pages, navigation paths, and other usage patterns.</li>
                        <li><span className="font-medium">Cookies and Similar Technologies</span>: We use cookies and similar tracking technologies to collect information about your browsing activities and to remember your preferences.</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'how-we-use',
            title: '3. How We Use Your Information',
            content: (
                <div>
                    <p className="mb-2">We use the information we collect to:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Provide, maintain, and improve Luna Rest</li>
                        <li>Generate sleep quality predictions and personalized recommendations</li>
                        <li>Create and update your user dashboard with relevant sleep data</li>
                        <li>Store and display your journal entries and goals</li>
                        <li>Conduct research and analysis to improve our sleep prediction algorithms</li>
                        <li>Communicate with you about updates, features, or support</li>
                        <li>Ensure the security and integrity of our Service</li>
                        <li>Comply with legal obligations</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'how-we-share',
            title: '4. How We Share Your Information',
            content: (
                <div>
                    <p className="mb-4">We do not sell your personal information. We may share your information in the following circumstances:</p>

                    <h4 className="font-medium mb-1">4.1 With Your Consent</h4>
                    <p className="mb-3">We may share your information when you provide explicit consent to do so.</p>

                    <h4 className="font-medium mb-1">4.2 Service Providers</h4>
                    <p className="mb-3">We may share your information with third-party service providers who help us operate, maintain, and improve Luna Rest. These providers are contractually obligated to use your information only for the purposes of providing services to us.</p>

                    <h4 className="font-medium mb-1">4.3 Research Partners</h4>
                    <p className="mb-3">With your explicit consent, we may share anonymized or aggregated data with academic or research institutions to advance sleep science. This data will not contain personally identifiable information.</p>

                    <h4 className="font-medium mb-1">4.4 Legal Requirements</h4>
                    <p>We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</p>
                </div>
            )
        },
        {
            id: 'data-security',
            title: '5. Data Security',
            content: (
                <p>
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                </p>
            )
        },
        {
            id: 'data-retention',
            title: '6. Data Retention',
            content: (
                <p>
                    We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. You may request deletion of your account and associated data at any time.
                </p>
            )
        },
        {
            id: 'your-rights',
            title: '7. Your Rights and Choices',
            content: (
                <div>
                    <p className="mb-3">
                        Depending on your location, you may have certain rights regarding your personal information, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 mb-3">
                        <li><span className="font-medium">Access</span>: The right to request access to the personal information we have about you.</li>
                        <li><span className="font-medium">Correction</span>: The right to request correction of inaccurate personal information.</li>
                        <li><span className="font-medium">Deletion</span>: The right to request deletion of your personal information.</li>
                        <li><span className="font-medium">Restriction</span>: The right to request restriction of processing of your personal information.</li>
                        <li><span className="font-medium">Data Portability</span>: The right to receive a copy of your personal information in a structured, machine-readable format.</li>
                        <li><span className="font-medium">Withdrawal of Consent</span>: The right to withdraw any consent you have provided.</li>
                    </ul>
                    <p>
                        To exercise these rights, please contact us using the information provided in the &quot;Contact Us&quot; section.
                    </p>
                </div>
            )
        },
        {
            id: 'use-by-minors',
            title: '8. Use by Minors',
            content: (
                <p>
                    Luna Rest is intended for use by university students. Users under the age of 18 should not use our Service without parental consent. If we learn that we have collected personal information from a minor without verification of parental consent, we will delete that information.
                </p>
            )
        },
        {
            id: 'changes',
            title: '9. Changes to This Privacy Policy',
            content: (
                <p>
                    We may update this Privacy Policy from time to time. The updated version will be indicated by the &quot;Last Updated&quot; date at the top of this policy. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
                </p>
            )
        },
        {
            id: 'contact-us',
            title: '10. Contact Us',
            content: (
                <div>
                    <p className="mb-3">
                        If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
                    </p>
                    <p className="mb-1"><span className="font-medium">Email:</span> privacy@lunarest.com</p>
                    <p className="mb-1"><span className="font-medium">Address:</span> 123 Galle Road, Colombo 03, Sri Lanka</p>
                    <p><span className="font-medium">Phone:</span> +94 11 234 5678</p>
                </div>
            )
        },
        {
            id: 'california-rights',
            title: '11. Specific Rights for California Residents',
            content: (
                <p>
                    Under the California Consumer Privacy Act (CCPA), California residents have specific rights regarding their personal information. To learn more about these rights and how to exercise them, please contact us.
                </p>
            )
        },
        {
            id: 'eu-rights',
            title: '12. Specific Rights for EU Residents',
            content: (
                <p>
                    If you are a resident of the European Union, you may have additional rights under the General Data Protection Regulation (GDPR). To learn more about these rights and how to exercise them, please contact us.
                </p>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-blue-900 text-white py-8">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-3xl font-bold">Luna Rest Privacy Policy</h1>
                    <p className="mt-2 text-blue-200">Last Updated: March 7, 2025</p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="md:flex">
                        {/* Table of Contents - Only shown on md screens and up */}
                        <div className="hidden md:block w-64 bg-gray-50 p-6 border-r border-gray-200">
                            <h2 className="text-lg font-semibold mb-4">Contents</h2>
                            <nav>
                                <ul className="space-y-1">
                                    {sections.map((section) => (
                                        <li key={section.id}>
                                            <button
                                                onClick={() => {
                                                    const element = document.getElementById(section.id);
                                                    element.scrollIntoView({ behavior: 'smooth' });
                                                }}
                                                className="text-blue-800 hover:text-blue-600 text-left text-sm py-1 w-full"
                                            >
                                                {section.title}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 p-6 md:p-8">
                            <div className="space-y-6">
                                {sections.map((section) => (
                                    <div key={section.id} id={section.id} className="pb-6 border-b border-gray-200 last:border-b-0">
                                        {/* Mobile accordion header */}
                                        <div
                                            className="md:hidden flex justify-between items-center cursor-pointer"
                                            onClick={() => toggleSection(section.id)}
                                        >
                                            <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                                            <svg
                                                className={`w-5 h-5 transition-transform duration-200 ${activeSection === section.id ? 'transform rotate-180' : ''}`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>

                                        {/* Desktop heading (always visible) */}
                                        <h3 className="hidden md:block text-xl font-semibold text-gray-900 mb-4">{section.title}</h3>

                                        {/* Content - conditional on mobile, always visible on desktop */}
                                        <div className={`mt-2 text-gray-700 ${activeSection === section.id || window.innerWidth >= 768 ? 'block' : 'hidden md:block'}`}>
                                            {section.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center text-gray-600 text-sm">
                    <p>© 2025 Luna Rest. All rights reserved.</p>
                    <p className="mt-1">Based in Colombo, Sri Lanka</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;