import { Mail, Lock, User } from 'lucide-react';

const SignUpPage = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center">
            {/* Full screen background image */}
            <img
                src="/bg2.jpg"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Centered signup form */}
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-8 md:p-12
                     bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl mx-4">
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">CREATE ACCOUNT</h2>
                    <p className="text-gray-600 mt-2 sm:mt-3 text-base sm:text-lg">Please complete your details</p>
                </div>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                placeholder="Enter your first name"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                placeholder="Enter your last name"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                className="block w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Create Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                className="block w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                placeholder="Create a password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#172960] text-white py-3 px-4 text-base rounded-lg
                     hover:bg-blue-700 transition duration-200 mt-6"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;