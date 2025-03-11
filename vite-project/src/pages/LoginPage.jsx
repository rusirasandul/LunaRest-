import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import log1 from "../assets/log1.jpg";

const LoginPage = () => {
    const navigate = useNavigate();

    // Function to handle navigation to signup page
    const handleSignupRedirect = () => {
        navigate('/signup');
    };

    return (
        <div className="relative min-h-screen flex items-center">
            {/* Full screen background image */}
            <img
                src={log1}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Content container */}
            <div className="relative w-full flex flex-col lg:flex-row justify-center items-center px-4 sm:px-8 lg:px-20">
                {/* Left side text - shown on all screens */}
                <div className="w-full lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left lg:pl-32">
                    <div className="flex flex-col items-center lg:items-start gap-2">
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Welcome</span>
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white
                            ml-8 sm:ml-16 lg:ml-32 my-2">to</span>
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-400
                            ml-16 sm:ml-24 lg:ml-32">LunaRest!</span>
                    </div>
                </div>

                {/* Right side login form */}
                <div className="w-full sm:w-[450px] lg:w-[600px] p-6 sm:p-8 lg:p-12
                        bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl">
                    <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">USER LOGIN</h2>
                        <p className="text-gray-500 mt-2 sm:mt-3 text-base sm:text-1lg">Please enter your details</p>
                    </div>

                    <form className="space-y-6 sm:space-y-8 flex flex-col items-center">
                        <div className="space-y-2 sm:space-y-3 w-full sm:w-3/4">
                            <label className="block text-sm sm:text-base font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    className="block w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3
                            text-base sm:text-lg border border-gray-300 rounded-lg
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 sm:space-y-3 w-full sm:w-3/4">
                            <label className="block text-sm sm:text-base font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    className="block w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3
                            text-base sm:text-lg border border-gray-300 rounded-lg
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full sm:w-3/4 bg-[#172960] text-white
                        py-2.5 sm:py-3 px-4 text-base sm:text-lg rounded-lg
                        hover:bg-blue-700 transition duration-200"
                        >
                            Log In
                        </button>

                        <div className="text-center w-full sm:w-3/4">
                            <p className="text-gray-600 text-base sm:text-lg">Do not have an account?</p>

                            <button
                                type="button"
                                onClick={handleSignupRedirect}
                                className="mt-3 sm:mt-4 w-full flex items-center justify-center
                        gap-2 sm:gap-3 border border-gray-300 rounded-lg
                        py-2.5 sm:py-3 px-4 hover:bg-gray-50
                        transition duration-200 bg-white text-base sm:text-lg"
                            >
                                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                                Sign up with Email
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;