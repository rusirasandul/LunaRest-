import { useEffect, useState } from "react";
import { TiThMenuOutline } from "react-icons/ti";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleCloseMenu = () => {
        setIsOpen(false);
    };

    const navlinks = (
        <ul className="flex flex-col p-4 space-y-2 font-medium md:flex-row lg:space-x-8 sm:space-x-4 md:space-y-0 md:p-0">
            <li>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link
                        to="/"
                        onClick={handleCloseMenu}
                        className={`text-nav ${activeSection === "home" ? "isActive" : ""}`}
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
                        className={`text-nav ${activeSection === "prediction" ? "isActive" : ""}`}
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
                        className={`text-nav ${activeSection === "journal" ? "isActive" : ""}`}
                    >
                        Journal
                    </Link>
                </motion.div>
            </li>
            <li>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link
                        to="/setting"
                        onClick={handleCloseMenu}
                        className={`text-nav ${activeSection === "setting" ? "isActive" : ""}`}
                    >
                        Settings
                    </Link>
                </motion.div>
            </li>
            <li>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link
                        to="/GoalTracker"
                        onClick={handleCloseMenu}
                        className={`text-nav ${activeSection === "GoalTracker" ? "isActive" : ""}`}
                    >
                        Goal Tracker
                    </Link>
                </motion.div>
            </li>
        </ul>
    );

    return (
        <header className="fixed top-0 left-0 right-0 z-10 px-4 py-6 bg-heroBg text-nav font-heading">
            <div className="container flex items-center justify-between h-full mx-auto">
                {/* Logo with Text */}
                <div className="flex items-center space-x-2">
                    <img src="/logo.png" alt="logo" className="w-10 h-10" />
                    <span className="text-3xl font-bold tracking-wider text-nav drop-shadow-[0_0_10px_rgba(139,233,253,0.7)]">
                        LunaRest
                        <span className="absolute top-0 right-[-25px] text-sm text-nav animate-bounce drop-shadow-[0_0_8px_rgba(139,233,253,0.7)]">
                            zzz
                        </span>
                    </span>
                </div>

                {/* navItems */}
                <div className="justify-center flex-grow hidden md:flex">
                    <nav>{navlinks}</nav>
                </div>

                {/* buttons */}
                <div className="hidden md:block">
                    <Link to="/contact" className="px-4 py-2 rounded text-heroBg bg-nav hover:bg-h1/90">
                        Contact Us
                    </Link>
                </div>

                {/*menu icons*/}
                <div className="block md:hidden">
                    <button onClick={handleToggle} className={`text-nav focus:outline-none ${isOpen ? "border border-nav" : ""}`}>
                        <TiThMenuOutline className="size-6" />
                    </button>
                </div>
            </div>

            {/* mobile nav items */}
            {isOpen && (
                <nav className="absolute left-0 z-20 w-full top-full bg-heroBg md:hidden">
                    <ul className="flex flex-col p-4 space-y-3">
                        {navlinks.props.children}
                        <li className="py-2">
                            <Link to="/contact" className="px-4 py-2 rounded text-heroBg bg-nav hover:bg-slate-500/90" onClick={handleCloseMenu}>
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Navbar;
