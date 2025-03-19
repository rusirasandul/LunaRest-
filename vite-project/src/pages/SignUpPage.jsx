import { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import log1 from "../assets/log1.jpg";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }

        // Password validation (at least 8 characters)
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            setLoading(false);
            return;
        }

        try {
            const result = await register(
                formData.firstName,
                formData.lastName,
                formData.email,
                formData.password
            );

            if (result.success) {
                // Registration successful, redirect to login
                navigate('/login', { state: { message: 'Registration successful! Please check your email to verify your account.' } });
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

            {/* Centered signup form */}
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-8 md:p-10
                     bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl mx-4 my-6 sm:my-8">
                <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 font-sans">CREATE ACCOUNT</h2>
                    <p className="text-gray-600 mt-2 sm:mt-3 text-base sm:text-lg font-sans">Please complete your details</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm font-sans">
                        {error}
                    </div>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 font-sans">
                            First Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg
                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-sans"
                                placeholder="Enter your first name"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 font-sans">
                            Last Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg
                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-sans"
                                placeholder="Enter your last name"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
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
                                className="block w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg
                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-sans"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 font-sans">
                            Create Password
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
                                className="block w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg
                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-sans"
                                placeholder="Create a password"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full ${loading ? 'bg-gray-400' : 'bg-[#172960] hover:bg-blue-700'} 
                            text-white py-3 px-4 text-base rounded-lg transition duration-200 font-sans`}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </div>

                    <div className="text-center pt-2">
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="text-blue-600 hover:text-blue-800 text-sm font-sans"
                        >
                            Already have an account? Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;