import { useEffect, useState } from 'react';

const LunaRestSplash = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setFadeOut(true);
                        setTimeout(() => setLoading(false), 1000);
                    }, 500);
                    return 100;
                }
                return prev + 5;
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    if (!loading) return null;

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black transition-opacity duration-1000 z-50 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
            <div className="relative w-full h-full max-w-4xl max-h-screen overflow-hidden">
                {/* Background - dark blue almost black */}
                <div className="absolute inset-0 bg-gradient-to-b from-black to-blue-950"></div>

                {/* Small stars */}
                {[...Array(50)].map((_, i) => {
                    const size = Math.random() * 0.3 + 0.1;
                    const opacity = Math.random() * 0.5 + 0.3;
                    const delay = Math.random() * 5;
                    const duration = Math.random() * 3 + 2;

                    return (
                        <div
                            key={`star-${i}`}
                            className="absolute bg-white rounded-full"
                            style={{
                                width: `${size}rem`,
                                height: `${size}rem`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                opacity: opacity,
                                animation: `twinkle ${duration}s infinite ${delay}s`
                            }}
                        />
                    );
                })}

                {/* Shooting stars */}
                {[...Array(3)].map((_, i) => {
                    const delay = i * 2 + Math.random() * 2;
                    const duration = Math.random() * 2 + 2;
                    const top = Math.random() * 30 + 10;

                    return (
                        <div
                            key={`shooting-${i}`}
                            className="absolute h-0.5 bg-white rounded-full"
                            style={{
                                width: '5rem',
                                top: `${top}%`,
                                left: '-5rem',
                                opacity: 0,
                                transform: 'rotate(-15deg)',
                                boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.7)',
                                animation: `shootingStar ${duration}s ${delay}s infinite`
                            }}
                        />
                    );
                })}

                {/* Crescent Moon */}
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                    <div className="relative w-48 h-48">
                        {/* Moon outer glow */}
                        <div className="absolute w-48 h-48 bg-blue-200 rounded-full opacity-5 animate-pulse"
                             style={{filter: 'blur(20px)'}}></div>

                        {/* Crescent moon */}
                        <div className="absolute inset-0 bg-blue-100 rounded-full"
                             style={{
                                 boxShadow: 'inset -15px 0 20px -10px rgba(0, 0, 0, 0.5)',
                                 animation: 'float 6s ease-in-out infinite'
                             }}>
                            <div className="absolute inset-0 rounded-full bg-blue-950"
                                 style={{
                                     transform: 'translate(25%, 0)',
                                     boxShadow: '-5px 0 10px rgba(0, 0, 0, 0.3)'
                                 }}></div>
                        </div>

                        {/* Moon craters */}
                        <div className="absolute w-6 h-6 rounded-full bg-blue-50 opacity-20"
                             style={{left: '15%', top: '30%'}}></div>
                        <div className="absolute w-4 h-4 rounded-full bg-blue-50 opacity-20"
                             style={{left: '30%', top: '20%'}}></div>
                        <div className="absolute w-3 h-3 rounded-full bg-blue-50 opacity-20"
                             style={{left: '20%', top: '60%'}}></div>
                    </div>
                </div>

                {/* Owl silhouette flying away */}
                <div className="absolute w-12 h-10"
                     style={{
                         top: '35%',
                         right: '20%',
                         animation: 'flyAway 15s forwards',
                         opacity: 0.7
                     }}>
                    <svg viewBox="0 0 100 80" fill="currentColor" className="text-gray-800">
                        <path d="M50,10 C30,10 15,30 15,45 C15,60 30,70 50,70 C70,70 85,60 85,45 C85,30 70,10 50,10 Z M30,35 C27,35 25,32 25,29 C25,26 27,23 30,23 C33,23 35,26 35,29 C35,32 33,35 30,35 Z M70,35 C67,35 65,32 65,29 C65,26 67,23 70,23 C73,23 75,26 75,29 C75,32 73,35 70,35 Z M50,60 C40,60 35,55 35,55 L40,50 C40,50 43,53 50,53 C57,53 60,50 60,50 L65,55 C65,55 60,60 50,60 Z M10,45 L0,35 L10,25 Z M90,45 L100,35 L90,25 Z" />
                    </svg>
                </div>

                {/* Logo text */}
                <div className="absolute transform -translate-x-1/2 left-1/2 top-3/4">
                    <h1 className="text-5xl font-thin tracking-widest opacity-0 md:text-7xl text-blue-50 animate-fadeIn">
                        LUNAREST
                    </h1>
                    <div className="w-0 h-px mx-auto mt-2 bg-blue-200 opacity-60 animate-lineExpand"></div>
                </div>

                {/* Loading indicator */}
                <div className="absolute flex items-center space-x-1 transform -translate-x-1/2 bottom-10 left-1/2">
                    <div className="w-48 h-0.5 bg-blue-900 rounded overflow-hidden">
                        <div
                            className="h-full transition-all duration-300 ease-out bg-blue-200 opacity-70"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes shootingStar {
          0% { left: -5rem; opacity: 0; }
          10% { opacity: 1; }
          30% { opacity: 1; }
          70% { left: 120%; opacity: 0; }
          100% { left: 120%; opacity: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes flyAway {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          10% { opacity: 0.7; }
          100% { transform: translate(-200px, -100px) scale(0.1); opacity: 0; }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes lineExpand {
          0% { width: 0; }
          100% { width: 100%; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 2s ease-out 0.5s forwards;
        }
        
        .animate-lineExpand {
          animation: lineExpand 2s ease-out 1.5s forwards;
        }
      `}</style>
        </div>
    );
};

export default LunaRestSplash;