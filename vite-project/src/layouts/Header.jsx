import { useEffect, useState } from "react";
import { TiThMenuOutline } from "react-icons/ti";
import { motion } from "framer-motion"

const Navbar = () => {
    const [isOpen,setIsOpen] =useState(false);
    const[activeSection,setActiveSection] =useState('home')
    const handleToggle = ()=>{
        setIsOpen(!isOpen)
    }
    const handleCLoseMenu =() =>{
        setIsOpen(false)
    }
    const handleScroll =()=>{
        const sections =['home','prediction','journal','setting','setting'];
        const scrollPosition =window.scrollY +100;

        sections.forEach(section => {
            const element= document.getElementById(section)
            if(element){
                const offSetTop =element.offsetTop
                const height = element.offsetTop
                if(scrollPosition >= offSetTop && scrollPosition <offSetTop +height){
                    setActiveSection (section)
                }
            }
        })
    }

    useEffect(() => {
        window.addEventListener('scroll',handleScroll)
        return ()=> window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleScrollTo=(targetId)=>{
        const targetElement=document.getElementById(targetId)
        if(targetElement) {
            window.scrollTo({
                top:targetElement.offsetTop,
                behavior:'smooth'
            })
        }
    }
    const navlinks=(
        <ul className='flex flex-col p-4 space-y-2 font-medium md:flex-row lg:space-x-8 sm:space-x-4 md:space-y-0 md:p-0'>
            <li>
                <motion.a 
                whileHover={{scale:1.1}}
                whileTap={{scale:0.9}}
                onClick={(e) => {
                    e.preventDefault();
                    handleCLoseMenu();
                    handleScrollTo('home')
                }}
                href="#home" 
                
                className={`text-nav ${activeSection=== 'home' ? 'isActive' : ''}`}>
                    Home
                </motion.a>
            </li>
            <li>
                <motion.a href="#prediction" 
                whileHover={{scale:1.1}}
                whileTap={{scale:0.9}}
                onClick={(e) => {
                    e.preventDefault();
                    handleCLoseMenu();
                    handleScrollTo('prediction')
                }}
                className={`text-nav ${activeSection=== 'prediction' ? 'isActive' : ''}`}>
                    Prediction
                </motion.a>
            </li>
            <li>
                <motion.a href="#journal" 
                whileHover={{scale:1.1}}
                whileTap={{scale:0.9}}
                onClick={(e) => {
                    e.preventDefault();
                    handleCLoseMenu();
                    handleScrollTo('journal')
                }}
                className={`text-nav ${activeSection=== 'journal' ? 'isActive' : ''}`}>
                    Journal
                </motion.a>
            </li>
            <li>
                <motion.a href="#settings"
                whileHover={{scale:1.1}}
                whileTap={{scale:0.9}}
                onClick={(e) => {
                    e.preventDefault();
                    handleCLoseMenu();
                    handleScrollTo('settings')
                }}
                className={`text-nav ${activeSection=== 'setting' ? 'isActive' : ''}`}>
                    Settings
                </motion.a>
            </li>
            
        </ul>
    )

    return (
        <header className="fixed top-0 left-0 right-0 z-10 px-4 py-6 bg-heroBg text-nav font-heading">
            <div className='container flex items-center justify-between h-full mx-auto'>
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
                <div className='justify-center flex-grow hidden md:flex'>
                    <nav>
                        {navlinks}
                    </nav>
                </div>

                {/* buttons */}
                <div className='hidden md:block'>
                    <a href="contact" className='px-4 py-2 rounded text-heroBg bg-nav hover:bg-h1/90'> Contact Us</a>
                </div>
                {/*menu icons*/}
                <div className='block md:hidden'>
                    <button 
                    onClick={handleToggle}
                    className={`text-nav focus:outline-none ${isOpen ? "border border-nav" :""}`}>
                    <TiThMenuOutline  className='size-6'/>
                    </button>
                </div>
            </div>

            {/* mobile nav items*/}
            {
                isOpen &&(
                    <nav className='absolute left-0 z-20 w-full top-full bg-heroBg md:hidden'>
                        <ul className='flex flex-col p-4 space-y-3'>
                            {navlinks.props.children}
                            <li className='py-2'>
                            <a href="#contact"
                            className='px-4 py-2 rounded text-heroBg bg-nav hover:bg-slate-500/90'
                            onClick={(e) => {e.preventDefault() ; handleCLoseMenu();}}> Contuct Us</a>
                            </li>
                        </ul>
                        
                    </nav>
                )
            }
        </header>
    );
};

export default Navbar;