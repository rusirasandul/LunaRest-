import { useState } from "react";
import { TiThMenuOutline } from "react-icons/ti";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { UserCircle } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    
    // Determine active section based on current path
    const getActiveSection = () => {
        const path = location.pathname;
        if (path === "/") return "home";
        return path.substring(1); // Remove the leading slash
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleCloseMenu = () => {
        setIsOpen(false);
    };

    const navlinks = (
        <ul className="flex flex-col p-4 space-y-2 font-medium md:flex-row md:items-center lg:space-x-8 sm:space-x-4 md:space-y-0 md:p-0">
            <li>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link
                        to="/"
                        onClick={handleCloseMenu}
                        className={`text-nav relative px-2 py-1 transition-all duration-300 ${
                            getActiveSection() === "home" 
                                ? "text-blue-400 font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-400" 
                                : "hover:text-blue-300"
                        }`}
                    >
                        Home
                    </Link>
                </motion.div>
            </li>
            <li>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link
                        to="/prediction"
                        onClick={handleCloseMenu}
                        className={`text-nav relative px-2 py-1 transition-all duration-300 ${
                            getActiveSection() === "prediction" 
                                ? "text-blue-400 font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-400" 
                                : "hover:text-blue-300"
                        }`}
                    >
                        Prediction
                    </Link>
                </motion.div>
            </li>
            <li>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link
                        to="/journal"
                        onClick={handleCloseMenu}
                        className={`text-nav relative px-2 py-1 transition-all duration-300 ${
                            getActiveSection() === "journal" 
                                ? "text-blue-400 font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-400" 
                                : "hover:text-blue-300"
                        }`}
                    >
                        Journal
                    </Link>
                </motion.div>
            </li>
            <li>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link
                        to="/dashboard"
                        onClick={handleCloseMenu}
                        className={`text-nav relative px-2 py-1 transition-all duration-300 ${
                            getActiveSection() === "dashboard" 
                                ? "text-blue-400 font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-400" 
                                : "hover:text-blue-300"
                        }`}
                    >
                        Dashboard
                    </Link>
                </motion.div>
            </li>
            <li>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link
                        to="/goaltracker"
                        onClick={handleCloseMenu}
                        className={`text-nav relative px-2 py-1 transition-all duration-300 ${
                            getActiveSection() === "goaltracker" 
                                ? "text-blue-400 font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-400" 
                                : "hover:text-blue-300"
                        }`}
                    >
                        Goal Tracker
                    </Link>
                </motion.div>
            </li>
        </ul>
    );

    return (
        <header className="fixed top-0 left-0 right-0 z-10 px-4 py-3 shadow-lg bg-heroBg backdrop-blur-sm bg-opacity-90 text-nav font-heading">
            <div className="container flex items-center justify-between h-full mx-auto">
                {/* Logo with Text */}
                <div className="flex items-center space-x-2">
                    <img src="/logo.png" alt="logo" className="w-10 h-10" />
                    <div className="relative">
                        <span className="text-3xl font-bold tracking-wider text-nav drop-shadow-[0_0_10px_rgba(139,233,253,0.7)]">
                            LunaRest
                        </span>
                        <span className="absolute top-0 right-[-25px] text-sm text-nav animate-bounce drop-shadow-[0_0_8px_rgba(139,233,253,0.7)]">
                            zzz
                        </span>
                    </div>
                </div>

                {/* navItems */}
                <div className="justify-center flex-grow hidden md:flex">
                    <nav>{navlinks}</nav>
                </div>

                {/* buttons and profile */}
                <div className="items-center hidden space-x-4 md:flex">
                    <Link to="/contact" className="px-4 py-2 font-medium transition-all duration-300 rounded-md shadow-md text-heroBg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                        Contact Us
                    </Link>
                    <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }} 
                        whileTap={{ scale: 0.9 }}
                        className="relative"
                    >
                        <Link to="/profile" className="inline-flex items-center justify-center w-10 h-10 text-white transition-all duration-300 rounded-full shadow-md bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-lg">
                            <UserCircle className="w-6 h-6" />
                        </Link>
                        <span className="absolute flex items-center justify-center w-4 h-4 bg-green-500 rounded-full -top-1 -right-1">
                            <span className="w-2 h-2 bg-green-300 rounded-full animate-ping"></span>
                        </span>
                    </motion.div>
                </div>

                {/*menu icons*/}
                <div className="flex items-center space-x-3 md:hidden">
                    <Link to="/profile" className="inline-flex items-center justify-center text-white rounded-full h-9 w-9 bg-gradient-to-r from-indigo-500 to-purple-500">
                        <UserCircle className="w-5 h-5" />
                    </Link>
                    <button 
                        onClick={handleToggle} 
                        className={`p-1.5 rounded-md focus:outline-none transition-colors ${
                            isOpen ? "bg-blue-500 text-white" : "text-nav hover:bg-blue-100/20"
                        }`}
                    >
                        <TiThMenuOutline className="size-6" />
                    </button>
                </div>
            </div>

            {/* mobile nav items */}
            {isOpen && (
                <motion.nav 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-0 z-20 w-full border-t shadow-lg top-full bg-heroBg/95 backdrop-blur-sm border-gray-700/20 md:hidden"
                >
                    <ul className="flex flex-col p-4 space-y-3">
                        {navlinks.props.children}
                        <li className="py-2">
                            <Link 
                                to="/contact" 
                                className="inline-block w-full px-4 py-2 text-center rounded-md text-heroBg bg-gradient-to-r from-blue-500 to-indigo-600" 
                                onClick={handleCloseMenu}
                            >
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </motion.nav>
            )}
        </header>
    );
};

export default Navbar;