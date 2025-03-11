
import { useEffect, useState } from 'react';

const LoadingPage = () => {
    const [loadingProgress, setLoadingProgress] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
        setLoadingProgress(prev => {
            if (prev >= 100) {
            clearInterval(interval);
            return 100;
            }
            return prev + 5;
        });
        }, 150);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-b from-slate-900 to-indigo-950">
        <div className="w-full max-w-md px-8 py-12">
            {/* Logo/Brand */}
            <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
                LunaRest
                </span>
            </h1>
            <p className="mt-2 text-indigo-200">Your sleep companion</p>
            </div>
            
            {/* Loading Animation */}
            <div className="relative mb-4">
            <div className="flex h-2 overflow-hidden text-xs border rounded-full bg-indigo-950/50 border-indigo-500/20">
                <div 
                style={{ width: `${loadingProgress}%` }}
                className="flex flex-col justify-center text-center text-white transition-all duration-300 shadow-none whitespace-nowrap bg-gradient-to-r from-indigo-600 to-purple-600"
                ></div>
            </div>
            <p className="mt-2 text-center text-indigo-300">{loadingProgress}%</p>
            </div>
            
            {/* Loading text with pulse animation */}
            <div className="text-center">
            <div className="inline-flex items-center space-x-2">
                <span className="text-indigo-200">Loading</span>
                <span className="flex space-x-1">
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                <span className="w-2 h-2 delay-75 bg-indigo-400 rounded-full animate-pulse"></span>
                <span className="w-2 h-2 delay-150 bg-indigo-400 rounded-full animate-pulse"></span>
                </span>
            </div>
            
            <p className="mt-6 text-sm text-indigo-200">
                Preparing LunaRest for you...
            </p>
            </div>
            
            {/* Animated wave at bottom */}
            <div className="absolute inset-x-0 bottom-0 w-full overflow-hidden">
            <svg className="w-full" viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
                <path 
                fill="rgba(129, 140, 248, 0.2)" 
                d="M0,32L48,37.3C96,43,192,53,288,48C384,43,480,21,576,32C672,43,768,85,864,85.3C960,85,1056,43,1152,21.3C1248,0,1344,0,1392,0L1440,0L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
                className="animate-pulse"
                ></path>
            </svg>
            </div>
        </div>
        </div>
    );
};

export default LoadingPage;