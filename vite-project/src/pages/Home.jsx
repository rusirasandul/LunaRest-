import { useNavigate } from 'react-router-dom';
import heroImg from "../assets/heroImg.png";
import Art1 from './Art1';
import Art2 from './Art2';
import Art3 from './Art3';
import { FaBrain, FaChartLine, FaBook, FaBullseye, FaChartBar, FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';
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

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const scaleUp = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { 
            scale: 1, 
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <>
        {/*<SplashScreen/>*/}
            {/* Hero Section */}
            <section 
                id='home' 
                className='relative flex items-center w-full min-h-screen bg-center bg-no-repeat bg-cover pt-28 overflow-hidden'
                style={{
                    backgroundImage: `url(${heroImg})`
                }}
            >
                <div className='absolute inset-0 bg-gradient-to-b from-purple-900/30 to-black/70'></div>
                <div className='container relative flex flex-col h-full p-8 mx-auto z-10'>
                    {/* Main Content */}
                    <motion.div 
                        className='flex flex-col max-w-2xl gap-4 text-nav'
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1 
                            className='text-5xl font-bold md:text-6xl'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            Improve Your Sleep, Enhance Your Life
                            <motion.span 
                                className='block mt-2 text-transparent font-heading bg-gradient-to-r from-h2 to-nav bg-clip-text'
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            >
                                Smart Sleep Tracking for Students
                            </motion.span>
                        </motion.h1>
                        <motion.div 
                            className='mt-4'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                        >
                            <h2 className='text-3xl font-semibold md:text-4xl text-white/90'>
                                We Help
                            </h2>
                            <h2 className='text-3xl font-semibold md:text-4xl text-white/90'>
                                You Sleep Better!
                            </h2>
                        </motion.div>
                        <motion.p 
                            className='mt-4 text-lg text-white/80 max-w-xl'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                        >
                            LunaRest uses AI to analyze your sleep patterns, provide personalized recommendations, 
                            and help you achieve better sleep quality for improved academic performance.
                        </motion.p>
                        <motion.div 
                            className='mt-8 flex gap-4'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                        >
                            <motion.button 
                                onClick={() => navigate('/login')}
                                className='px-8 py-3 text-xl font-bold text-white transition-all bg-purple-900 rounded-lg hover:bg-purple-800 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1'
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                GET STARTED
                            </motion.button>
                            <motion.button 
                                onClick={() => document.getElementById('problem').scrollIntoView({ behavior: 'smooth' })}
                                className='px-8 py-3 text-xl font-bold text-purple-900 transition-all bg-white/90 rounded-lg hover:bg-white hover:shadow-lg hover:shadow-white/30 hover:-translate-y-1'
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                LEARN MORE
                            </motion.button>
                        </motion.div>
                    </motion.div>
                    
                    {/* Floating elements for visual interest */}
                    <div className="absolute top-1/4 right-10 w-20 h-20 rounded-full bg-purple-500/20 blur-xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 left-10 w-32 h-32 rounded-full bg-blue-500/20 blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-pink-500/20 blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
                </div>
            </section>

            {/* Problem Section */}
            <section id="problem" className="w-full py-20 text-white bg-heroBg relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
                
                <motion.div 
                    className="container px-8 mx-auto relative z-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeIn}
                >
                    <motion.div 
                        className="text-center mb-16"
                        variants={fadeIn}
                    >
                        <h2 className="text-4xl font-bold mb-4 relative inline-block">
                            The Sleep Crisis Among Students
                            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></span>
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg text-gray-300 mt-6">
                            University students face unique challenges that impact their sleep quality and overall wellbeing.
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {sleepStats.map((item, index) => (
                            <motion.div 
                                key={index} 
                                className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 p-8 rounded-lg text-center backdrop-blur-sm border border-purple-500/10 shadow-xl hover:shadow-purple-500/5 transition-all"
                                variants={itemVariant}
                                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            >
                                <h3 className="text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-4">{item.stat}</h3>
                                <p className="text-lg">{item.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                    
                    <motion.div 
                        className="mt-12 text-center"
                        variants={fadeIn}
                    >
                        <p className="text-xl max-w-3xl mx-auto">
                            Poor sleep affects memory, concentration, and academic performance. 
                            <span className="text-purple-400 font-semibold"> LunaRest</span> is designed to help students understand and improve their sleep patterns.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section id="features" className="w-full py-20 text-white bg-herobg2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
                
                <motion.div 
                    className="container px-8 mx-auto relative z-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeIn}
                >
                    <motion.div 
                        className="text-center mb-16"
                        variants={fadeIn}
                    >
                        <h2 className="text-4xl font-bold mb-4 relative inline-block">
                            Powerful Features
                            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></span>
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg text-gray-300 mt-6">
                            LunaRest offers a comprehensive suite of tools to help you understand and improve your sleep.
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {features.map((feature, index) => (
                            <motion.div 
                                key={index} 
                                className="bg-gradient-to-br from-purple-900/30 to-purple-900/10 p-6 rounded-lg border border-purple-500/10 backdrop-blur-sm shadow-lg hover:shadow-purple-500/5 transition-all"
                                variants={itemVariant}
                                whileHover={{ 
                                    y: -5, 
                                    boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)",
                                    transition: { duration: 0.3 } 
                                }}
                            >
                                <motion.div 
                                    className="mb-4 bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center"
                                    whileHover={{ rotate: 5, scale: 1.1 }}
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3 className="text-xl font-bold mb-2 text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">{feature.title}</h3>
                                <p className="text-gray-300">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="w-full py-20 text-white bg-heroBg relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
                
                <motion.div 
                    className="container px-8 mx-auto relative z-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeIn}
                >
                    <motion.div 
                        className="text-center mb-16"
                        variants={fadeIn}
                    >
                        <h2 className="text-4xl font-bold mb-4 relative inline-block">
                            How LunaRest Works
                            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></span>
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg text-gray-300 mt-6">
                            Our simple process helps you improve your sleep quality in just a few steps.
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {howItWorks.map((step, index) => (
                            <motion.div 
                                key={index} 
                                className="relative"
                                variants={itemVariant}
                            >
                                <motion.div 
                                    className="bg-gradient-to-br from-purple-900/30 to-purple-900/10 p-6 rounded-lg border border-purple-500/10 backdrop-blur-sm shadow-lg h-full"
                                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                                >
                                    <div className="text-5xl font-bold text-purple-400/30 mb-4">{step.number}</div>
                                    <h3 className="text-xl font-bold mb-2 text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">{step.title}</h3>
                                    <p className="text-gray-300">{step.description}</p>
                                </motion.div>
                                {index < howItWorks.length - 1 && (
                                    <motion.div 
                                        className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-purple-400 text-2xl"
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                        viewport={{ once: true }}
                                    >
                                        →
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {/* Why Choose Us Section */}
            <section id="why-us" className="w-full py-20 text-white bg-herobg2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
                
                <motion.div 
                    className="container px-8 mx-auto relative z-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeIn}
                >
                    <motion.div 
                        className="text-center mb-16"
                        variants={fadeIn}
                    >
                        <h2 className="text-4xl font-bold mb-4 relative inline-block">
                            Why Choose LunaRest?
                            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></span>
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg text-gray-300 mt-6">
                            What sets us apart from other sleep tracking applications.
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {advantages.map((advantage, index) => (
                            <motion.div 
                                key={index} 
                                className="bg-gradient-to-br from-purple-900/30 to-purple-900/10 p-6 rounded-lg border border-purple-500/10 backdrop-blur-sm shadow-lg"
                                variants={itemVariant}
                                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                            >
                                <h3 className="text-xl font-bold mb-4 text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">{advantage.title}</h3>
                                <p className="text-gray-300">{advantage.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                    
                    <motion.div 
                        className="mt-16 text-center"
                        variants={scaleUp}
                    >
                        <motion.button 
                            onClick={() => navigate('/login')}
                            className="px-8 py-4 text-xl font-bold text-white transition-all bg-gradient-to-r from-purple-900 to-purple-700 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Start Improving Your Sleep Today!
                        </motion.button>
                    </motion.div>
                </motion.div>
                
                {/* Floating elements for visual interest */}
                <div className="absolute top-1/4 right-10 w-32 h-32 rounded-full bg-purple-500/10 blur-xl animate-pulse"></div>
                <div className="absolute bottom-1/4 left-10 w-24 h-24 rounded-full bg-blue-500/10 blur-xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
            </section>

            {/* Sleep Tracking Section (Original Art1) */}
            <Art1/>
            
            {/* Sleep Sounds Section (Original Art2) */}
            <Art2/>
            
            {/* Music Player Section (Original Art3) */}
            <Art3/>
        </>
    );
}

export default Home;