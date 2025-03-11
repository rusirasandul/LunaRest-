import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileImage, setProfileImage] = useState('/api/placeholder/150/150');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    // Simulate checking login status on component mount
    useEffect(() => {
        // This would typically be a check to your auth system
        const checkLoginStatus = () => {
        const userToken = localStorage.getItem('userToken');
        if (userToken) {
            setIsLoggedIn(true);
            // Fetch user data from API or local storage
            fetchUserData();
        } else {
            setIsLoggedIn(false);
        }
        };

        const fetchUserData = () => {
        // This would be replaced with your API call
        // Simulating data fetch for demonstration
        const userData = {
            username: 'SleepyUser',
            email: 'user@lunarest.com',
            profileImage: '/api/placeholder/150/150'
        };
        
        setUsername(userData.username);
        setEmail(userData.email);
        setProfileImage(userData.profileImage);
        };

        checkLoginStatus();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = () => {
        // This would typically send data to your backend
        if (previewImage) {
        setProfileImage(previewImage);
        }
        
        // Save the updated user data (typically would be an API call)
        console.log('Saving user data:', { username, email, profileImage: previewImage || profileImage });
        
        // Exit edit mode
        setIsEditing(false);
        setPreviewImage(null);
    };

    const handleLogin = () => {
        // In a real app, this would redirect to login page
        navigate('/login');
    };

    const handleLogout = () => {
        // Clear auth token and user data
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
        setUsername('');
        setEmail('');
        setProfileImage('/api/placeholder/150/150');
    };

    // If not logged in, show limited profile page with login option
    if (!isLoggedIn) {
        return (
        <div className="min-h-screen px-4 pt-24 bg-gradient-to-b from-heroBg to-gray-900 sm:px-6 lg:px-8 text-nav">
            <div className="w-full max-w-md p-8 mx-auto rounded-lg shadow-md bg-white/10 backdrop-blur-sm">
            <div className="text-center">
                <h2 className="mt-2 text-3xl font-extrabold">Profile</h2>
                <p className="mt-2 text-sm text-gray-300">
                Please sign in to view and edit your profile
                </p>
                <div className="mt-8">
                <button
                    onClick={handleLogin}
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-md text-heroBg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Sign In
                </button>
                </div>
            </div>
            </div>
        </div>
        );
    }

    return (
        <div className="min-h-screen px-4 pt-24 bg-gradient-to-b from-heroBg to-gray-900 sm:px-6 lg:px-8 text-nav">
        <div className="w-full max-w-lg p-8 mx-auto rounded-lg shadow-lg bg-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold font-heading">My Profile</h2>
            <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-md text-heroBg bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
                Logout
            </button>
            </div>

            <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32 mb-4">
                <img
                src={previewImage || profileImage}
                alt="Profile"
                className="object-cover w-32 h-32 border-4 rounded-full border-indigo-500/30"
                />
                {isEditing && (
                <div className="absolute bottom-0 right-0">
                    <label htmlFor="profileImageInput" className="p-2 text-white rounded-full shadow-md cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    </label>
                    <input
                    id="profileImageInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    />
                </div>
                )}
            </div>

            <h3 className="text-xl font-medium drop-shadow-[0_0_8px_rgba(139,233,253,0.3)]">{username}</h3>
            <p className="text-gray-300">{email}</p>
            </div>

            {isEditing ? (
            <div className="space-y-4">
                <div>
                <label htmlFor="username" className="block text-sm font-medium">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full px-3 py-2 mt-1 border border-gray-600 rounded-md shadow-sm bg-white/10 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-nav"
                />
                </div>
                <div>
                <label htmlFor="email" className="block text-sm font-medium">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-2 mt-1 border border-gray-600 rounded-md shadow-sm bg-white/10 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-nav"
                />
                </div>
                <div className="flex justify-end mt-6 space-x-3">
                <button
                    onClick={() => {
                    setIsEditing(false);
                    setPreviewImage(null);
                    }}
                    className="px-4 py-2 text-sm font-medium border border-gray-600 rounded-md shadow-sm bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSaveChanges}
                    className="px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-sm text-heroBg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Save Changes
                </button>
                </div>
            </div>
            ) : (
            <div className="pt-4 mt-4 border-t border-gray-700">
                <h4 className="mb-4 text-lg font-medium">Account Information</h4>
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-gray-400">Username</p>
                    <p className="font-medium">{username}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium">{email}</p>
                </div>
                </div>
                <div className="mt-6">
                <button
                    onClick={() => setIsEditing(true)}
                    className="w-full px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-sm text-heroBg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Edit Profile
                </button>
                </div>
            </div>
            )}

            <div className="pt-4 mt-6 border-t border-gray-700">
            <h4 className="mb-2 text-lg font-medium">Sleep Quality Dashboard</h4>
            <p className="mb-4 text-sm text-gray-300">
                View your sleep data and insights to improve your sleep quality.
            </p>
            <button
                onClick={() => navigate('/dashboard')}
                className="w-full px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-sm text-heroBg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Go to Dashboard
            </button>
            </div>
        </div>
        </div>
    );
};

export default ProfilePage;