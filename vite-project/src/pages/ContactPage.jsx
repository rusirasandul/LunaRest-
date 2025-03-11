import { useNavigate } from "react-router-dom";
import contact from "../assets/Contact.png";
import { useState } from "react";
import { Mail, MapPin, Send, User, MessageSquare } from 'lucide-react';

const ContactPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted:", formData);
        // Reset form
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen overflow-x-hidden text-white bg-gradient-to-b from-slate-900 to-indigo-950">
            {/* Hero Section with Animated Waves */}
            <div className="relative overflow-hidden top-20">
                {/* Animated wave background */}
                <div className="absolute inset-0 z-0">
                    <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                        <path 
                            fill="rgba(129, 140, 248, 0.2)" 
                            d="M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,165.3C672,171,768,213,864,213.3C960,213,1056,171,1152,149.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            className="animate-pulse"
                        ></path>
                    </svg>
                    <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                        <path 
                            fill="rgba(139, 92, 246, 0.15)" 
                            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,144C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            className="animate-pulse animation-delay-1000"
                        ></path>
                    </svg>
                </div>

                {/* Content */}
                <div className="container relative z-10 px-4 py-12 mx-auto">
                    {/* Main content container */}
                    <div className="mx-auto max-w-7xl">
                        {/* Page header */}
                        <div className="mb-16 text-center">
                            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
                                    Get in Touch
                                </span>
                            </h1>
                            <p className="max-w-2xl mx-auto text-lg text-indigo-200">
                                Have questions about how LunaRest can improve your sleep quality? We're here to help.
                            </p>
                        </div>

                        {/* Two column layout */}
                        <div className="flex flex-col items-stretch gap-12 lg:flex-row">
                            {/* Left column - About */}
                            <div className="flex flex-col w-full lg:w-5/12">
                                {/* Company info card */}
                                <div className="h-full p-8 border shadow-xl bg-white/5 backdrop-blur-sm rounded-xl border-indigo-500/20">
                                    <div className="flex flex-col h-full">
                                        <div className="mb-8">
                                            <h2 className="mb-2 text-2xl font-bold text-indigo-300">About LunaRest</h2>
                                            <p className="text-gray-300">
                                                At LunaRest, we are dedicated to transforming sleep health through innovation, 
                                                technology, and personalized support. Our mission is to help university students 
                                                understand, improve, and optimize their sleep patterns.
                                            </p>
                                        </div>

                                        {/* Company image with glow effect */}
                                        <div className="relative mx-auto my-8 group">
                                            <div className="absolute inset-0 transition-all duration-500 bg-indigo-500/30 rounded-xl blur-xl group-hover:bg-indigo-500/40"></div>
                                            <div className="relative p-4 border bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-sm rounded-xl border-indigo-500/20">
                                                <img 
                                                    src={contact}
                                                    alt="LunaRest Team" 
                                                    className="object-contain mx-auto transition-all duration-300 rounded-lg max-h-48 group-hover:scale-105"
                                                />
                                            </div>
                                        </div>

                                        {/* Contact info with icons */}
                                        <div className="mt-auto space-y-4">
                                            <h3 className="mb-4 text-xl font-semibold text-indigo-300">Reach Us Directly</h3>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-full bg-indigo-500/20">
                                                    <Mail size={18} className="text-indigo-300" />
                                                </div>
                                                <span className="text-gray-300">lunaRest2024@gmail.com</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-full bg-indigo-500/20">
                                                    <MapPin size={18} className="text-indigo-300" />
                                                </div>
                                                <span className="text-gray-300">Colombo, Western Province</span>
                                            </div>

                                            <div className="pt-6">
                                                <button 
                                                    onClick={() => navigate("/about")}
                                                    className="w-full py-3 font-medium text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1"
                                                >
                                                    Learn more about us
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right column - Contact Form */}
                            <div className="w-full lg:w-7/12">
                                <div className="overflow-hidden border shadow-xl bg-white/5 backdrop-blur-sm rounded-xl border-indigo-500/20">
                                    {/* Form header gradient */}
                                    <div className="h-1.5 bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600"></div>
                                    
                                    <div className="p-8">
                                        <h2 className="mb-6 text-2xl font-bold text-indigo-300">Send Us a Message</h2>
                                        
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {/* Name field */}
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-indigo-200">Full Name</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <User size={18} className="text-indigo-400" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className="w-full py-3 pl-10 text-white transition-all border rounded-lg bg-indigo-950/50 border-indigo-500/30 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        placeholder="Your name"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            

                                            {/* Email field */}
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-indigo-200">Email Address</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <Mail size={18} className="text-indigo-400" />
                                                    </div>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className="w-full py-3 pl-10 text-white transition-all border rounded-lg bg-indigo-950/50 border-indigo-500/30 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        placeholder="you@example.com"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            

                                            {/* Message field */}
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-indigo-200">Message</label>
                                                <div className="relative">
                                                    <div className="absolute pointer-events-none top-3 left-3">
                                                        <MessageSquare size={18} className="text-indigo-400" />
                                                    </div>
                                                    <textarea
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        rows="5"
                                                        className="w-full py-3 pl-10 text-white transition-all border rounded-lg bg-indigo-950/50 border-indigo-500/30 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        placeholder="Tell us how we can help improve your sleep..."
                                                        required
                                                    ></textarea>
                                                </div>
                                            </div>
                                            

                                            {/* Submit button */}
                                            <div className="pt-4">
                                                <button
                                                    type="submit"
                                                    className="flex items-center justify-center w-full gap-2 py-3 font-medium text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-indigo-500/30 hover:-translate-y-1"
                                                >
                                                    <span>Send Message</span>
                                                    <Send size={18} />
                                                </button>
                                            </div>
                                        </form>
                                        
                                        {/* Additional info */}
                                        <div className="pt-6 mt-8 border-t border-indigo-500/20">
                                            <p className="mb-4 text-sm text-indigo-200">
                                                Your sleep matters to us. Our team typically responds within 24 hours on business days.
                                            </p>
                                            <p className="text-sm text-indigo-200">
                                                Need immediate assistance? Call our sleep specialists at <span className="font-medium text-white">+1 (888) LUNA-REST</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
