import { useState, useEffect } from 'react';

const AboutAndFAQ = () => {
    // Features data
    const features = [
        {
            icon: "✨",
            title: "Sleep Quality Prediction",
            description: "Our advanced algorithm analyzes your sleep patterns and predicts sleep quality, helping you understand factors affecting your rest."
        },
        {
            icon: "🎯",
            title: "Personalized Recommendations",
            description: "Receive customized advice based on your unique sleep data, academic schedule, and lifestyle factors."
        },
        {
            icon: "📊",
            title: "Sleep Journey Tracking",
            description: "Monitor your sleep history over time to identify patterns and track improvements in your sleep quality."
        },
        {
            icon: "🏆",
            title: "Goal Setting & Progress",
            description: "Set realistic sleep improvement goals and track your progress with intuitive visualizations and metrics."
        },
        {
            icon: "📱",
            title: "Analytics Dashboard",
            description: "Access detailed insights about your sleep patterns through our comprehensive data analytics dashboard."
        },
        {
            icon: "🔄",
            title: "Lifestyle Management",
            description: "Integrate other aspects of university life such as study schedules, exercise, and nutrition for holistic wellbeing."
        }
    ];

    // FAQ data
    const faqData = {
        "Getting Started": [
            {
                question: "Who is Lunarest designed for?",
                answer: "Lunarest is specifically designed for university students who struggle with sleep quality issues. Whether you're pulling all-nighters for exams, dealing with noisy dormitories, or managing stress-induced insomnia, our platform can help you improve your sleep habits."
            },
            {
                question: "How do I get started with Lunarest?",
                answer: "Getting started is simple! Create an account, complete the initial sleep assessment questionnaire, and connect any compatible sleep tracking devices if you have them. Begin logging your sleep for at least 7 days to receive your first set of personalized recommendations."
            },
            {
                question: "Is Lunarest free for students?",
                answer: "Yes! Lunarest is currently free for all university students. Simply sign up with your university email address to access all features."
            }
        ],
        "Features & Functionality": [
            {
                question: "How does the sleep prediction feature work?",
                answer: "Our algorithm analyzes various factors including your historical sleep data, daily activities, caffeine intake, screen time, and environmental factors to predict your sleep quality. The more data you provide, the more accurate our predictions become."
            },
            {
                question: "What kind of recommendations does Lunarest provide?",
                answer: "Recommendations are tailored to your specific sleep challenges and may include: optimal bedtime windows based on your class schedule, environment adjustments for your dorm/apartment, study schedule optimizations, relaxation techniques, nutrition and exercise suggestions, and screen time management."
            },
            {
                question: "How does goal setting work?",
                answer: "You can set specific sleep-related goals such as 'increase average sleep duration by 30 minutes' or 'reduce wake-ups during the night.' Our system will track your progress and provide guidance to help you achieve these goals through our intuitive dashboard."
            }
        ],
        "Data & Privacy": [
            {
                question: "Is my sleep and health data secure?",
                answer: "Absolutely. We take data privacy very seriously. All your personal information and sleep data are encrypted and securely stored. We never share your individual data with third parties."
            },
            {
                question: "Who has access to my sleep data?",
                answer: "Only you have access to your detailed sleep data. Our system uses anonymized data for research purposes, but this never includes personally identifiable information."
            },
            {
                question: "Can I export my data?",
                answer: "Yes! You can export your sleep data and analytics in various formats (CSV, PDF, etc.) for personal use or to share with healthcare providers if needed."
            }
        ],
        "Technical Support": [
            {
                question: "What should I do if I'm having technical issues?",
                answer: "For technical support, email our team at support@lunarest.com or use the chat function within the app. We typically respond within 24 hours during weekdays."
            },
            {
                question: "How often should I log my sleep data?",
                answer: "For best results, we recommend logging your sleep daily. Consistent tracking provides the most accurate analysis and personalized recommendations."
            },
            {
                question: "What if I forget to log my sleep?",
                answer: "No problem! You can retroactively add sleep data for missed days. If you use a connected device, data will sync automatically even if you don't open the app daily."
            }
        ]
    };

    // State for animations
    const [isVisible, setIsVisible] = useState({
        about: false,
        features: false,
        faq: false
    });

    // State to track which FAQ is open
    const [openFAQ, setOpenFAQ] = useState({});

    // Toggle FAQ item
    const toggleFAQ = (category, index) => {
        setOpenFAQ(prev => ({
            ...prev,
            [`${category}-${index}`]: !prev[`${category}-${index}`]
        }));
    };

    // Handle scroll animations
    useEffect(() => {
        const handleScroll = () => {
            const aboutSection = document.getElementById('about');
            const featuresSection = document.getElementById('features');
            const faqSection = document.getElementById('faq');

            if (aboutSection && window.scrollY > aboutSection.offsetTop - window.innerHeight * 0.75) {
                setIsVisible(prev => ({ ...prev, about: true }));
            }

            if (featuresSection && window.scrollY > featuresSection.offsetTop - window.innerHeight * 0.75) {
                setIsVisible(prev => ({ ...prev, features: true }));
            }

            if (faqSection && window.scrollY > faqSection.offsetTop - window.innerHeight * 0.75) {
                setIsVisible(prev => ({ ...prev, faq: true }));
            }
        };

        // Set initial visibility
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-[#F0EEFF] overflow-hidden font-roboto">

            {/* Google Fonts Import for Roboto */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
    
                    * {
                        font-family: 'Roboto', sans-serif;
                    }
            `}</style>

            {/* Animated Background Elements */}
            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#9F1CFD] opacity-5 blur-3xl animate-float-slow"></div>
                <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-[#B34BFE] opacity-5 blur-3xl animate-float-medium"></div>
                <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-[#080030] opacity-5 blur-3xl animate-float-fast"></div>
                <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-[#9F1CFD] opacity-5 blur-3xl animate-float-medium"></div>

                {/* Subtle Pattern Overlay */}
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239F1CFD' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>

                {/* Night Sky Elements (stars, moon) */}
                <div className="hidden lg:block absolute top-20 left-20 w-1 h-1 bg-white rounded-full opacity-70 animate-twinkle-1"></div>
                <div className="hidden lg:block absolute top-40 left-40 w-2 h-2 bg-white rounded-full opacity-60 animate-twinkle-2"></div>
                <div className="hidden lg:block absolute top-60 right-80 w-1 h-1 bg-white rounded-full opacity-80 animate-twinkle-3"></div>
                <div className="hidden lg:block absolute top-24 right-24 w-2 h-2 bg-white rounded-full opacity-50 animate-twinkle-1"></div>
                <div className="hidden lg:block absolute top-12 right-60 w-1 h-1 bg-white rounded-full opacity-70 animate-twinkle-2"></div>
            </div>

            {/* Hero Banner */}
            <section className="relative h-64 md:h-96 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#080030] to-[#9F1CFD] opacity-90"></div>
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#B34BFE] blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#9F1CFD] blur-3xl transform translate-x-1/4 translate-y-1/4"></div>
                </div>
                {/* Animated Stars in Hero */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-80 animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full opacity-70 animate-pulse"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full opacity-90 animate-pulse"></div>
                    <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full opacity-80 animate-pulse"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white rounded-full opacity-70 animate-pulse"></div>
                </div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-down">
                        Welcome to Lunarest
                    </h1>
                    <p className="text-xl text-white max-w-2xl mx-auto animate-fade-in-up">
                        Your personal sleep companion for university life
                    </p>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-4 bg-gradient-to-b from-[#f1f8fbc5] to-[#aaa7d0] relative">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#9F1CFD] opacity-5 blur-3xl"></div>
                <div className="container mx-auto">
                    <div className={`flex flex-col md:flex-row items-center justify-between gap-12 transition-all duration-1000 ${isVisible.about ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold mb-6 text-[#080030] relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-20 after:h-1 after:bg-[#9F1CFD]">
                                About Lunarest
                            </h2>
                            <p className="text-[#494833] mb-6 text-lg">
                                Lunarest is a comprehensive sleep management platform created by students, for students. We understand the unique challenges university life presents to maintaining healthy sleep habits, and we are here to help.
                            </p>
                            <p className="text-[#494833] mb-8 text-lg">
                                Our team developed Lunarest to address the sleep quality issues that many students face during their academic journey. Through data-driven insights and personalized recommendations, we aim to help you improve your sleep habits, boost your academic performance, and enhance your overall wellbeing.
                            </p>
                        </div>
                        <div className="md:w-1/2 relative group">
                            <div className="absolute -z-10 w-full h-full rounded-2xl -right-5 -bottom-5 bg-[#B34BFE] opacity-30 transition-all duration-500 group-hover:-right-3 group-hover:-bottom-3"></div>
                            <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
                                <img
                                    src="/placeholder-image.jpg"
                                    alt="Students using Lunarest app"
                                    className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 bg-[#080030] relative">
                {/* Animated Night Sky Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-80 animate-twinkle-1"></div>
                    <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full opacity-70 animate-twinkle-2"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full opacity-90 animate-twinkle-3"></div>
                    <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full opacity-80 animate-twinkle-1"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white rounded-full opacity-70 animate-twinkle-2"></div>

                    {/* Moon */}
                    <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-gray-200 opacity-80 shadow-inner"></div>
                </div>

                <div className="container mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { number: "85%", label: "of users report better sleep" },
                            { number: "32 min", label: "average sleep improvement" },
                            { number: "10,000+", label: "active student users" },
                            { number: "4.8/5", label: "average user rating" }
                        ].map((stat, index) => (
                            <div key={index} className="text-center p-6 rounded-lg bg-[#080030] border border-[#9F1CFD] relative overflow-hidden group backdrop-blur-sm bg-opacity-80">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#9F1CFD] to-[#B34BFE] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</h3>
                                <p className="text-[#AFA99E]">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4 bg-gradient-to-b from-[#3f539b94] to-[#eae9f7] relative">
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#080030] to-transparent opacity-10"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#9F1CFD] opacity-5 blur-3xl"></div>
                <div className="container mx-auto">
                    <h2 className={`text-3xl font-bold mb-12 text-[#080030] text-center relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-[#9F1CFD] transition-all duration-1000 ${isVisible.features ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
                        Our Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-xl shadow-lg p-8 border border-[#AFA99E] hover:border-[#9F1CFD] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 relative overflow-hidden transition-all duration-700 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#9F1CFD] to-transparent opacity-10 rounded-bl-full"></div>
                                <div className="text-3xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-4 text-[#9F1CFD]">{feature.title}</h3>
                                <p className="text-[#7A7676]">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-20 px-4 bg-gradient-to-b from-[#ebecf3] to-[#08084e] relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-10 w-6 h-6 rounded-full bg-[#9F1CFD] opacity-10"></div>
                <div className="absolute top-20 left-20 w-4 h-4 rounded-full bg-[#B34BFE] opacity-10"></div>
                <div className="absolute bottom-40 right-40 w-8 h-8 rounded-full bg-[#9F1CFD] opacity-10"></div>
                <div className="absolute bottom-20 left-10 w-5 h-5 rounded-full bg-[#B34BFE] opacity-10"></div>

                <div className="container mx-auto">
                    <h2 className={`text-3xl font-bold mb-12 text-[#080030] text-center relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-[#9F1CFD] transition-all duration-1000 ${isVisible.faq ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
                        Frequently Asked Questions
                    </h2>

                    <div className={`max-w-3xl mx-auto transition-all duration-1000 ${isVisible.faq ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
                        {Object.entries(faqData).map(([category, items], categoryIndex) => (
                            <div key={categoryIndex} className="mb-12 bg-white backdrop-blur-sm bg-opacity-90 rounded-2xl shadow-md p-6 border-l-4 border-[#9F1CFD]">
                                <h3 className="text-xl font-semibold mb-6 text-[#9F1CFD] pb-2 border-b border-[#AFA99E]">{category}</h3>

                                <div className="space-y-4">
                                    {items.map((item, itemIndex) => (
                                        <div
                                            key={itemIndex}
                                            className="mb-4 transition-all duration-300"
                                        >
                                            <button
                                                className="flex justify-between items-center w-full text-left font-medium py-3 px-4 rounded-lg focus:outline-none hover:bg-[#F8F7FF] transition-colors duration-300"
                                                onClick={() => toggleFAQ(category, itemIndex)}
                                            >
                                                <span className="text-[#080030]">{item.question}</span>
                                                <span className="ml-6 flex-shrink-0 text-[#9F1CFD] transition-transform duration-300 transform">
                          {openFAQ[`${category}-${itemIndex}`] ? (
                              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                          ) : (
                              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                          )}
                        </span>
                                            </button>
                                            <div
                                                className={`overflow-hidden transition-all duration-500 ease-in-out ${openFAQ[`${category}-${itemIndex}`] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                            >
                                                <div className="pl-4 pr-2 py-4 border-l-2 border-[#9F1CFD] mt-2 ml-2 bg-[#F8F7FF] rounded-r-lg">
                                                    <p className="text-[#7A7676]">{item.answer}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact CTA */}
                    <div className={`mt-16 text-center transition-all duration-1000 ${isVisible.faq ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
                        <div className="bg-gradient-to-r from-[#9F1CFD] to-[#B34BFE] p-10 rounded-2xl shadow-xl max-w-3xl mx-auto relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full">
                                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
                                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[#080030] opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>
                            </div>
                            {/* Star Pattern in CTA */}
                            <div className="absolute inset-0 overflow-hidden opacity-20">
                                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full"></div>
                                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full"></div>
                                <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full"></div>
                                <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full"></div>
                                <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white rounded-full"></div>
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">Still have questions?</h3>
                                <p className="text-white mb-8 text-lg max-w-xl mx-auto">Our team is here to help you get the most out of Lunarest. Feel free to reach out with any questions!</p>
                                <button className="bg-white text-[#9F1CFD] hover:bg-[#080030] hover:text-white transition-colors duration-300 px-8 py-3 rounded-full font-medium shadow-md transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CSS Animations */}
            <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out 0.3s;
          animation-fill-mode: both;
        }
        
        @keyframes float-slow {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-10px, 10px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes float-medium {
          0% { transform: translate(0, 0); }
          50% { transform: translate(15px, -15px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes float-fast {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-20px, -10px); }
          100% { transform: translate(0, 0); }
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 15s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 10s ease-in-out infinite;
        }
        
        @keyframes twinkle-1 {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.3; }
        }
        
        @keyframes twinkle-2 {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        @keyframes twinkle-3 {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.2; }
        }
        
        .animate-twinkle-1 {
          animation: twinkle-1 4s ease-in-out infinite;
        }
        
        .animate-twinkle-2 {
          animation: twinkle-2 5s ease-in-out infinite;
        }
        
        .animate-twinkle-3 {
          animation: twinkle-3 6s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default AboutAndFAQ;