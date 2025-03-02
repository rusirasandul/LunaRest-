
import { Linkedin, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-6 text-white bg-footer">
        <div className="container px-6 mx-auto">
            <div className="flex flex-col items-center justify-between md:flex-row">
            {/* Logo and Tagline */}
            <div className="flex flex-col items-center mb-6 md:items-start md:mb-0">
                <div className="flex items-center gap-2">
                <img 
                    src="/logo.png" 
                    alt="LunaRest Logo" 
                    className="w-8 h-8"
                />
                <span className="text-2xl font-semibold">
                <span className="text-nav">LunaRest</span>
                    <span className="ml-1 text-sm text-teal-400 align-top">zZZ</span>
                </span>
                </div>
                <p className="mt-2 text-sm text-gray-300">
                Helping the world to sleep better, one person at a time.
                </p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col items-center mb-6 md:flex-row md:space-x-8 md:mb-0">
                <a href="/about" className="mb-2 text-sm hover:text-nav md:mb-0">About Us</a>
                <a href="/faq" className="mb-2 text-sm hover:text-nav md:mb-0">FAQ</a>
                <a href="/contact" className="mb-2 text-sm hover:text-nav md:mb-0">Contact Us</a>
                <a href="/privacy" className="text-sm hover:text-nav">Privacy Policy</a>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/luna-rest-821381340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="p-2 transition-colors bg-gray-800 rounded-full hover:bg-teal-400">
                <Linkedin size={20} />
                </a>
                <a href="https://www.facebook.com/lunarestLK" className="p-2 transition-colors bg-gray-800 rounded-full hover:bg-teal-400">
                <Facebook size={20} />
                </a>
                <a href="https://www.instagram.com/luna_.rest/" className="p-2 transition-colors bg-gray-800 rounded-full hover:bg-teal-400">
                <Instagram size={20} />
                </a>
            </div>
            </div>

            {/* Copyright */}
            <div className="mt-6 text-xs text-center text-gray-400">
            © {new Date().getFullYear()} Luna Rest. All Rights Reserved.
            </div>
        </div>
        </footer>
    );
};

export default Footer;