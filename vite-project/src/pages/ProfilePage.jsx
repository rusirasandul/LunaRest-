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

    // Check login status on component mount
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                // Call the API to verify authentication
                const response = await fetch('/api/auth/check', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                    }
                });
                
                if (response.ok) {
                    setIsLoggedIn(true);
                    fetchUserData();
                } else {
                    // If the token is invalid or expired
                    setIsLoggedIn(false);
                    localStorage.removeItem('userToken');
                    navigate('/login');
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setIsLoggedIn(false);
            }
        };
        
        checkLoginStatus();
    }, [navigate]);

    const fetchUserData = async () => {
        try {
            const response = await fetch('/api/user/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                }
            });
            
            if (response.ok) {
                const userData = await response.json();
                setUsername(userData.username);
                setEmail(userData.email);
                setProfileImage(userData.profileImage || '/api/placeholder/150/150');
            } else {
                console.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

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

    const handleSaveChanges = async () => {
        try {
            // Create FormData object for file upload
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            
            // If there's a new profile image, append it
            if (previewImage) {
                // Convert base64 to file object
                const response = await fetch(previewImage);
                const blob = await response.blob();
                formData.append('profileImage', blob, 'profile-image.jpg');
            }
            
            const response = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                },
                body: formData
            });
            
            if (response.ok) {
                const updatedUserData = await response.json();
                setUsername(updatedUserData.username);
                setEmail(updatedUserData.email);
                setProfileImage(updatedUserData.profileImage);
                
                // Exit edit mode
                setIsEditing(false);
                setPreviewImage(null);
            } else {
                console.error('Failed to update profile');
                // You might want to show an error message to the user
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleLogin = () => {
        // Navigate to login page
        navigate('/login');
    };

    const handleLogout = async () => {
        try {
            // Call logout endpoint
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                }
            });
            
            // Clear local storage
            localStorage.removeItem('userToken');
            
            // Update state
            setIsLoggedIn(false);
            setUsername('');
            setEmail('');
            setProfileImage('/api/placeholder/150/150');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // If not logged in, show limited profile page with login option
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen px-4 pt-16 sm:pt-24 bg-gradient-to-b from-heroBg to-gray-900 sm:px-6 lg:px-8 text-nav">
                <div className="w-full max-w-md p-4 mx-auto rounded-lg shadow-md sm:p-8 bg-white/10 backdrop-blur-sm">
                    <div className="text-center">
                        <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Profile</h2>
                        <p className="mt-2 text-xs text-gray-300 sm:text-sm">
                            Please sign in to view and edit your profile
                        </p>
                        <div className="mt-6 sm:mt-8">
                            <button
                                onClick={handleLogin}
                                className="flex justify-center w-full px-3 py-2 text-xs font-medium border border-transparent rounded-md shadow-md sm:px-4 sm:py-2 sm:text-sm text-heroBg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
        <div className="min-h-screen px-4 pt-16 sm:pt-24 bg-gradient-to-b from-heroBg to-gray-900 sm:px-6 lg:px-8 text-nav">
            <div className="w-full max-w-sm p-4 mx-auto rounded-lg shadow-lg sm:max-w-md md:max-w-lg sm:p-8 bg-white/10 backdrop-blur-sm">
                {/* Header with Logout Button */}
                <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-extrabold sm:text-2xl font-heading">My Profile</h2>
                    <button
                        onClick={handleLogout}
                        className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium border border-transparent rounded-md shadow-md text-heroBg bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Logout
                    </button>
                </div>

                {/* Profile Image and Info */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative w-24 h-24 mb-4 sm:w-32 sm:h-32">
                        <img
                            src={previewImage || profileImage}
                            alt="Profile"
                            className="object-cover w-24 h-24 border-4 rounded-full sm:w-32 sm:h-32 border-indigo-500/30"
                        />
                        {isEditing && (
                            <div className="absolute bottom-0 right-0">
                                <label htmlFor="profileImageInput" className="p-1.5 sm:p-2 text-white rounded-full shadow-md cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="currentColor">
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

                    <h3 className="text-lg sm:text-xl font-medium text-center drop-shadow-[0_0_8px_rgba(139,233,253,0.3)]">{username}</h3>
                    <p className="text-xs text-center text-gray-300 sm:text-sm">{email}</p>
                </div>

                {/* Edit Form or Account Info */}
                {isEditing ? (
                    <div className="space-y-3 sm:space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-xs font-medium sm:text-sm">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full px-2 py-1.5 sm:px-3 sm:py-2 mt-1 text-sm border border-gray-600 rounded-md shadow-sm bg-white/10 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-nav"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-xs font-medium sm:text-sm">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-2 py-1.5 sm:px-3 sm:py-2 mt-1 text-sm border border-gray-600 rounded-md shadow-sm bg-white/10 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-nav"
                            />
                        </div>
                        <div className="flex flex-col mt-4 space-y-2 sm:flex-row sm:justify-end sm:mt-6 sm:space-y-0 sm:space-x-3">
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setPreviewImage(null);
                                }}
                                className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium border border-gray-600 rounded-md shadow-sm bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveChanges}
                                className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium border border-transparent rounded-md shadow-sm text-heroBg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="pt-3 mt-3 border-t border-gray-700 sm:pt-4 sm:mt-4">
                        <h4 className="mb-3 text-base font-medium sm:mb-4 sm:text-lg">Account Information</h4>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                            <div>
                                <p className="text-xs text-gray-400 sm:text-sm">Username</p>
                                <p className="text-sm font-medium sm:text-base">{username}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 sm:text-sm">Email</p>
                                <p className="text-sm font-medium break-all sm:text-base">{email}</p>
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-6">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium border border-transparent rounded-md shadow-sm text-heroBg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                )}

                {/* Dashboard Link */}
                <div className="pt-3 mt-4 border-t border-gray-700 sm:pt-4 sm:mt-6">
                    <h4 className="mb-2 text-base font-medium sm:text-lg">Sleep Quality Dashboard</h4>
                    <p className="mb-3 text-xs text-gray-300 sm:mb-4 sm:text-sm">
                        View your sleep data and insights to improve your sleep quality.
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium border border-transparent rounded-md shadow-sm text-heroBg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;