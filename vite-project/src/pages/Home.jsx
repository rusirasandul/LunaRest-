import { useNavigate } from 'react-router-dom';
import heroImg from "../assets/heroImg.png";
import Art1 from './Art1';
import Art2 from './Art2';
import Art3 from './Art3';
import { FaBrain, FaChartLine, FaBook, FaBullseye, FaChartBar, FaLeaf } from 'react-icons/fa';
//import SplashScreen from './SplashScreen'

const Home = () => {
    const navigate = useNavigate();

    // Sleep statistics for the "Problem" section
    const sleepStats = [
        { stat: '45%', description: 'of college students suffer from sleep deprivation' },
        { stat: '70%', description: 'report that sleep issues affect their academic performance' },
        { stat: '20%', description: 'of students fall asleep in class at least once a week' }
    ];

    // Features list with icons
    const features = [
        { icon: <FaBrain className="w-8 h-8 text-purple-400" />, title: 'Sleep Quality Prediction', description: 'AI-powered analysis of your sleep patterns' },
        { icon: <FaChartLine className="w-8 h-8 text-purple-400" />, title: 'Personalized Recommendations', description: 'Custom advice based on your sleep data' },
        { icon: <FaBook className="w-8 h-8 text-purple-400" />, title: 'Sleep Journal & History', description: 'Track your sleep journey over time' },
        { icon: <FaBullseye className="w-8 h-8 text-purple-400" />, title: 'Goal Setting & Progress', description: 'Set sleep goals and monitor improvements' },
        { icon: <FaChartBar className="w-8 h-8 text-purple-400" />, title: 'Data Analytics Dashboard', description: 'Visualize your sleep metrics' },
        { icon: <FaLeaf className="w-8 h-8 text-purple-400" />, title: 'Lifestyle Management', description: 'Connect sleep with daily habits' }
    ];

    // How it works steps
    const howItWorks = [
        { number: '01', title: 'Enter Sleep Data', description: 'Log your sleep or connect wearable devices' },
        { number: '02', title: 'Get Predictions', description: 'Receive AI-powered sleep quality insights' },
        { number: '03', title: 'Get Recommendations', description: 'Follow personalized sleep improvement tips' },
        { number: '04', title: 'Track Progress', description: 'Monitor your sleep improvements over time' }
    ];

    // Competitive advantages
    const advantages = [
        { title: 'AI-Powered Analysis', description: 'Unlike basic sleep trackers, we use advanced AI to predict sleep quality' },
        { title: 'Student-Focused Design', description: 'Specifically designed for university students lifestyles and needs' },
        { title: 'Expert-Backed Recommendations', description: 'Sleep advice based on scientific research and sleep experts' }
    ];

    return (
        <>
        {/*<SplashScreen/>*/}
            {/* Hero Section */}
            <section 
                id='home' 
                className='relative flex items-center w-full min-h-screen bg-center bg-no-repeat bg-cover pt-28'
                style={{
                    backgroundImage: `url(${heroImg})`
                }}
            >
                <div className='container relative flex flex-col h-full p-8 mx-auto'>
                    {/* Main Content */}
                    <div className='flex flex-col max-w-2xl gap-4 text-nav'>
                        <h1 className='text-5xl font-bold md:text-6xl'>
                            Improve Your Sleep, Enhance Your Life
                            <span className='block mt-2 text-transparent font-heading bg-gradient-to-r from-h2 to-nav bg-clip-text '>
                                Smart Sleep Tracking for Students
                            </span>
                        </h1>
                        <div className='mt-4'>
                            <h2 className='text-3xl font-semibold md:text-4xl text-white/90'>
                                We Help
                            </h2>
                            <h2 className='text-3xl font-semibold md:text-4xl text-white/90'>
                                You Sleep Better!
                            </h2>
                        </div>
                        <p className='mt-4 text-lg text-white/80 max-w-xl'>
                            LunaRest uses AI to analyze your sleep patterns, provide personalized recommendations, 
                            and help you achieve better sleep quality for improved academic performance.
                        </p>
                        <div className='mt-8 flex gap-4'>
                            <button 
                                onClick={() => navigate('/login')}
                                className='px-8 py-3 text-xl font-bold text-white transition-colors bg-purple-900 rounded-lg hover:bg-purple-800'
                            >
                                GET STARTED
                            </button>
                            <button 
                                onClick={() => document.getElementById('problem').scrollIntoView({ behavior: 'smooth' })}
                                className='px-8 py-3 text-xl font-bold text-purple-900 transition-colors bg-white/90 rounded-lg hover:bg-white'
                            >
                                LEARN MORE
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section id="problem" className="w-full py-20 text-white bg-heroBg">
                <div className="container px-8 mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">The Sleep Crisis Among Students</h2>
                        <p className="max-w-2xl mx-auto text-lg text-gray-300">
                            University students face unique challenges that impact their sleep quality and overall wellbeing.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {sleepStats.map((item, index) => (
                            <div key={index} className="bg-purple-900/30 p-8 rounded-lg text-center transform hover:scale-105 transition-transform">
                                <h3 className="text-5xl font-bold text-purple-400 mb-4">{item.stat}</h3>
                                <p className="text-lg">{item.description}</p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-12 text-center">
                        <p className="text-xl max-w-3xl mx-auto">
                            Poor sleep affects memory, concentration, and academic performance. 
                            LunaRest is designed to help students understand and improve their sleep patterns.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="w-full py-20 text-white bg-herobg2">
                <div className="container px-8 mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
                        <p className="max-w-2xl mx-auto text-lg text-gray-300">
                            LunaRest offers a comprehensive suite of tools to help you understand and improve your sleep.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-purple-900/20 p-6 rounded-lg hover:bg-purple-900/30 transition-colors">
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2 text-purple-400">{feature.title}</h3>
                                <p className="text-gray-300">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="w-full py-20 text-white bg-heroBg">
                <div className="container px-8 mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">How LunaRest Works</h2>
                        <p className="max-w-2xl mx-auto text-lg text-gray-300">
                            Our simple process helps you improve your sleep quality in just a few steps.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {howItWorks.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="bg-purple-900/20 p-6 rounded-lg h-full">
                                    <div className="text-5xl font-bold text-purple-400/30 mb-4">{step.number}</div>
                                    <h3 className="text-xl font-bold mb-2 text-purple-400">{step.title}</h3>
                                    <p className="text-gray-300">{step.description}</p>
                                </div>
                                {index < howItWorks.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-purple-400">
                                        →
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section id="why-us" className="w-full py-20 text-white bg-herobg2">
                <div className="container px-8 mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Why Choose LunaRest?</h2>
                        <p className="max-w-2xl mx-auto text-lg text-gray-300">
                            What sets us apart from other sleep tracking applications.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {advantages.map((advantage, index) => (
                            <div key={index} className="bg-purple-900/20 p-6 rounded-lg hover:bg-purple-900/30 transition-colors">
                                <h3 className="text-xl font-bold mb-4 text-purple-400">{advantage.title}</h3>
                                <p className="text-gray-300">{advantage.description}</p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-16 text-center">
                        <button 
                            onClick={() => navigate('/login')}
                            className="px-8 py-4 text-xl font-bold text-white transition-colors bg-purple-900 rounded-lg hover:bg-purple-800"
                        >
                            Start Improving Your Sleep Today!
                        </button>
                    </div>
                </div>
            </section>

            
            {/* Music Player Section (Original Art3) */}
            <Art3/>
        </>
    );
}

export default Home;