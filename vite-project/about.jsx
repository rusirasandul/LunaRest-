import { useState } from 'react';

const AboutAndFAQ = () => {
  // Features data
  const features = [
    {
      title: "Sleep Quality Prediction",
      description: "Our advanced algorithm analyzes your sleep patterns and predicts sleep quality, helping you understand factors affecting your rest."
    },
    {
      title: "Personalized Recommendations",
      description: "Receive customized advice based on your unique sleep data, academic schedule, and lifestyle factors."
    },
    {
      title: "Sleep Journey Tracking",
      description: "Monitor your sleep history over time to identify patterns and track improvements in your sleep quality."
    },
    {
      title: "Goal Setting & Progress",
      description: "Set realistic sleep improvement goals and track your progress with intuitive visualizations and metrics."
    },
    {
      title: "Analytics Dashboard",
      description: "Access detailed insights about your sleep patterns through our comprehensive data analytics dashboard."
    },
    {
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

  // State to track which FAQ is open
  const [openFAQ, setOpenFAQ] = useState({});

  // Toggle FAQ item
  const toggleFAQ = (category, index) => {
    setOpenFAQ(prev => ({
      ...prev,
      [`${category}-${index}`]: !prev[`${category}-${index}`]
    }));
  };

  return (
    <div className="bg-gray-50">
      {/* About Section */}
      <section id="about" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-20 after:h-1 after:bg-cyan-400">
                About Lunarest
              </h2>
              <p className="text-gray-700 mb-4">
                Lunarest is a comprehensive sleep management platform created by students, for students. We understand the unique challenges university life presents to maintaining healthy sleep habits, and we are here to help.
              </p>
              <p className="text-gray-700">
                Our team developed Lunarest to address the sleep quality issues that many students face during their academic journey. Through data-driven insights and personalized recommendations, we aim to help you improve your sleep habits, boost your academic performance, and enhance your overall wellbeing.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/placeholder-image.jpg" 
                alt="Students using Lunarest app" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-20 after:h-1 after:bg-cyan-400">
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg border border-gray-100"
              >
                <h3 className="text-xl font-semibold mb-3 text-indigo-600">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-gray-800 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-20 after:h-1 after:bg-cyan-400">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto">
            {Object.entries(faqData).map(([category, items], categoryIndex) => (
              <div key={categoryIndex} className="mb-10">
                <h3 className="text-xl font-semibold mb-4 text-indigo-600">{category}</h3>
                
                <div className="space-y-4">
                  {items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex} 
                      className="border-b border-gray-200 pb-4"
                    >
                      <button
                        className="flex justify-between items-center w-full text-left font-medium focus:outline-none"
                        onClick={() => toggleFAQ(category, itemIndex)}
                      >
                        <span className="text-gray-800">{item.question}</span>
                        <span className="ml-6 flex-shrink-0 text-indigo-500">
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
                      {openFAQ[`${category}-${itemIndex}`] && (
                        <div className="mt-2 text-gray-600 pl-2">
                          <p>{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutAndFAQ;