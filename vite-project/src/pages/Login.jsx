import { Mail, Lock } from 'lucide-react';
//import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    return (
        <div className="relative min-h-screen flex items-center">
            {/* Full screen background image */}
            <img
                src="/bg2.jpg"
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
                            <p className="text-gray-600 text-base sm:text-lg">or, register with</p>

                            <button
                                type="button"
                                className="mt-3 sm:mt-4 w-full flex items-center justify-center
                         gap-2 sm:gap-3 border border-gray-300 rounded-lg
                         py-2.5 sm:py-3 px-4 hover:bg-gray-50
                         transition duration-200 bg-white text-base sm:text-lg"
                            >
                                <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Sign up with Google
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;