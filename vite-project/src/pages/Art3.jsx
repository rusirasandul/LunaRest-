import lap4 from "../assets/lap4.png"; 

const Art3 = () => {
    return (
        <section className="w-full py-16 text-white bg-heroBg">
            <div className="container px-8 mx-auto">
                <div className="grid items-center gap-8 md:grid-cols-2">
                    {/* Left Text Content */}
                    <div className="max-w-2xl">
                        <h2 className="text-xl font-semibold text-h2">
                        Sleep Meditations 
                        </h2>
                        <h3 className="mt-2 text-4xl font-bold text-white">
                        for Deeper Relaxation
                        </h3>
                        <p className="mt-4 leading-relaxed text-h1">
                        LunaRest’s 320+ sleep meditations can help you achieve a deeper state of relaxation
                        for a better night's sleep. Our guided meditations cover a range of topics, including 
                        mindfulness, gratitude, and body relaxation, all designed to quiet your mind and promote 
                        relaxation.
                        </p>
                        <p className="mt-4 leading-relaxed text-h1">
                            Download LunaRest today and start enjoying a better night's sleep.
                        </p>
                    </div>

                    {/* Right Images Container */}
                    <div className="relative flex justify-center left-20">
                        {/* Main larger image */}
                        <div className="w-1/2 max-w-md">
                            <img 
                                src={lap4} 
                                alt="Sleep Tracking Dashboard" 
                                className="w-full rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Art3;
