import lap3 from "../assets/lap_3.png"; 

const Art2 = () => {
    return (
        <section className="w-full py-16 text-white bg-herobg2">
            <div className="container px-8 mx-auto">
                <div className="grid items-center gap-8 md:grid-cols-2">
                    {/* Left Text Content */}
                    <div className="max-w-2xl">
                        <h2 className="text-xl font-semibold text-white">
                            Relax and Sleep Soundly with
                        </h2>
                        <h3 className="mt-2 text-4xl font-bold text-h2">
                            LunaRest’s Sleep Sounds
                        </h3>
                        <p className="mt-4 leading-relaxed text-h1">
                            LunaRest’s 100+ soothing sleep sounds are designed to promote relaxation and 
                            improve your sleep quality. From gentle rain to ocean waves and white noise, 
                            our soundscapes are carefully crafted to mask disruptive noises and create 
                            a peaceful sleep environment.
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
                                src={lap3} 
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

export default Art2;
