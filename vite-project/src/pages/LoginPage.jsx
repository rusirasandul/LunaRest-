import { useState, useEffect } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../services/authService';
import log1 from "../assets/log1.jpg";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check if there's a message from registration
        if (location.state?.message) {
            setMessage(location.state.message);
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Basic validation
        if (!formData.email || !formData.password) {
            setError('Email and password are required');
            setLoading(false);
            return;
        }

        try {
            const result = await login(formData.email, formData.password);

            if (result.success) {
                // Login successful, redirect to dashboard or home
                navigate('/dashboard');
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle navigation to signup page
    const handleSignupRedirect = () => {
        navigate('/signup');
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center pt-10 md:pt-10 sm:pt-24 xs:pt-28 pb-8 px-4">
            {/* Full screen background image */}
            <img
                src={log1}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Content container */}
            <div className="relative w-full max-w-6xl flex flex-col lg:flex-row justify-center items-center gap-8 sm:mt-4">
                {/* Left side text */}
                <div className="w-full lg:w-1/2 mb-6 lg:mb-0 text-center lg:text-left lg:pl-12">
                    {/* Mobile view - single line */}
                    <div className="flex lg:hidden justify-center">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                            Welcome to <span className="text-purple-400 font-serif">LunaRest!</span>
                        </h1>
                    </div>

                    {/* Desktop view - staggered lines */}
                    <div className="hidden lg:flex flex-col items-start gap-2">
                        <span className="text-4xl lg:text-5xl font-bold text-white font-sans">Welcome</span>
                        <span className="text-4xl lg:text-5xl font-bold text-white font-sans ml-16 lg:ml-24 my-2">to</span>
                        <span className="text-4xl lg:text-5xl font-bold text-purple-400 font-serif ml-24 lg:ml-32">LunaRest!</span>
                    </div>
                </div>

                {/* Right side login form - increased height with same width */}
                <div className="w-full sm:w-[450px] lg:w-[510px] p-8 sm:p-10
                        bg-white/90 backdrop-blur-sm rounded-xl shadow-xl">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 font-sans">USER LOGIN</h2>
                        <p className="text-gray-500 mt-2 text-base font-sans">Please enter your details</p>
                    </div>

                    {message && (
                        <div className="mb-5 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm font-sans">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="mb-5 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm font-sans">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6 flex flex-col items-center" onSubmit={handleSubmit}>
                        <div className="space-y-2 w-full sm:w-4/5">
                            <label className="block text-sm font-medium text-gray-700 font-sans">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3
                                    text-base border border-gray-300 rounded-lg
                                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-sans"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 w-full sm:w-4/5">
                            <label className="block text-sm font-medium text-gray-700 font-sans">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3
                                    text-base border border-gray-300 rounded-lg
                                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-sans"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full sm:w-4/5 ${loading ? 'bg-gray-400' : 'bg-[#172960] hover:bg-blue-700'} 
                            text-white py-3 px-4 text-base rounded-lg transition duration-200 font-sans`}
                        >
                            {loading ? 'Logging in...' : 'Log In'}
                        </button>

                        <div className="text-center w-full sm:w-4/5 mt-2">
                            <p className="text-gray-600 text-base font-sans">Do not have an account?</p>

                            <button
                                type="button"
                                onClick={handleSignupRedirect}
                                className="mt-4 w-full flex items-center justify-center
                                gap-2 border border-gray-300 rounded-lg
                                py-3 px-4 hover:bg-gray-50
                                transition duration-200 bg-white text-base font-sans"
                            >
                                <Mail className="h-5 w-5 text-gray-600" />
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