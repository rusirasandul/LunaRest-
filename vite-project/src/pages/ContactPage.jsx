import { useNavigate } from "react-router-dom";
import contact from "../assets/Contact.png";

const ContactPage = () => {
    const navigate = useNavigate(); // Initialize navigate

    return (
        <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden text-white border border-purple-600 md:p-6 bg-herobg2">
            {/* Decorative Gradient Circles */}
            <div className="absolute top-0 left-0 z-0 -translate-y-1/2 rounded-full w-96 h-96 bg-gradient-to-r from-purple-700/30 to-indigo-600/10 blur-xl -translate-x-1/3"></div>
            
            <div className="absolute bottom-0 right-0 z-0 rounded-full w-96 h-96 bg-gradient-to-l from-purple-700/30 to-indigo-600/10 blur-xl translate-y-1/3 translate-x-1/4"></div>
            
            {/* Main Content Section */}
            <section className="container relative z-10 max-w-6xl py-8 mx-auto">
                <div className="flex flex-col gap-8 md:flex-row md:items-center">
                    {/* Left Column - About */}
                    <div className="w-full md:w-1/2 md:pr-8">
                        <h1 className="relative mb-4 text-2xl font-bold text-white md:text-3xl">
                            Welcome to LunaRest !
                            <span className="absolute bottom-0 left-0 w-16 h-1 mt-1 bg-h2"></span>
                        </h1>
                        <p className="mb-6 text-sm leading-relaxed text-gray-300 md:text-base">
                            At LunaRest, we are dedicated to transforming sleep health through innovation, 
                            technology, and personalized support. Our mission is to help university students 
                            understand, improve, and optimize their sleep patterns, ultimately enhancing 
                            overall well-being and quality of life.
                        </p>
                        
                        <div className="flex justify-center mb-6 transition-transform duration-300 hover:scale-105">
                            <div className="w-48 h-48 md:w-64 md:h-64 drop-shadow-lg">
                                <img 
                                    src={contact}
                                    alt="Team collaboration" 
                                    className="object-contain w-full h-full"
                                />
                            </div>
                        </div>
                        
                        <div className="flex justify-center">
                            <button 
                                className="px-6 py-3 text-white transition duration-300 transform rounded-full shadow-lg bg-h2 hover:bg-purple-700 hover:shadow-xl hover:-translate-y-1"
                                onClick={() => navigate("/about")} // Navigate to About page
                            >
                                Learn more about us
                            </button>
                        </div>
                    </div>
                    
                    {/* Right Column - Contact Form */}
                    <div className="w-full mt-12 md:mt-0 md:w-1/2 md:pl-4">
                        <h2 className="relative inline-block mb-8 text-2xl font-bold text-center md:text-3xl text-h2 md:text-right md:float-right">
                            Contact Us
                            <span className="absolute bottom-0 right-0 w-16 h-1 mt-1 bg-h2"></span>
                        </h2>
                        
                        <div className="clear-both"></div>
                        
                        <form className="p-6 space-y-6 rounded-lg shadow-lg bg-indigo-900/30 backdrop-blur-sm">
                            <div>
                                <label className="block mb-2 font-medium">Full Name</label>
                                <input 
                                    type="text" 
                                    className="w-full p-3 text-black transition-all rounded-lg focus:outline-none focus:ring-2 focus:ring-h2"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            
                            <div>
                                <label className="block mb-2 font-medium">Email</label>
                                <input 
                                    type="email" 
                                    className="w-full p-3 text-black transition-all rounded-lg focus:outline-none focus:ring-2 focus:ring-h2"
                                    placeholder="Enter your email address"
                                />
                            </div>
                            
                            <div>
                                <label className="block mb-2 font-medium">Message</label>
                                <textarea 
                                    rows="4" 
                                    className="w-full p-3 text-black transition-all rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-h2"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>
                            
                            <div className="flex justify-end">
                                <button 
                                    type="submit" 
                                    className="flex items-center px-6 py-3 text-white transition duration-300 transform rounded-lg shadow-md bg-h2 hover:bg-purple-700 hover:shadow-lg hover:-translate-y-1"
                                >
                                    <span>Send</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
