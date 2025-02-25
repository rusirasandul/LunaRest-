
import lap1 from "../assets/lap1.png"; 
import lap2 from "../assets/lap2.png"; 

const art1 = () => {
    return (
        <section className="w-full py-16 text-white bg-heroBg">
            <div className="container px-8 mx-auto">
                <div className="grid items-center gap-8 md:grid-cols-2">
                    {/* Left Text Content */}
                    <div className="max-w-2xl">
                        <h2 className="text-xl font-semibold text-white">
                            Track Your Sleep Easily with
                        </h2>
                        <h3 className="mt-2 text-4xl font-bold text-purple-400">
                            Automatic Sleep Tracking
                        </h3>
                        <p className="mt-4 leading-relaxed text-gray-200">
                            LunaRest's sleep tracking feature allows you to effortlessly track your sleep each 
                            night without having to manually start tracking each night. Once enabled, our 
                            technology uses your device's motion data to monitor your sleep and provide you 
                            with detailed insights into your sleep quality.
                        </p>
                        <p className="mt-4 leading-relaxed text-gray-200">
                            With LunaRest automatic sleep tracking, you can easily identify patterns and trends 
                            in your sleep habits, such as how long you sleep and how often you wake up during 
                            the night. Our user-friendly interface provides you with easy-to-understand sleep 
                            data that can help you make adjustments to your sleep routine and improve your 
                            overall sleep quality.
                        </p>
                    </div>

                    {/* Right Images Container */}
                    <div className="relative flex justify-center">
                        {/* Main larger image */}
                        <div className="w-3/4 max-w-md">
                            <img 
                                src={lap1} 
                                alt="Sleep Tracking Dashboard" 
                                className="w-full rounded-lg shadow-lg"
                            />
                        </div>
                        {/* Smaller overlapping image */}
                        <div className="absolute w-48 -bottom-0 -right-8 -top-10 md:w-64">
                            <img 
                                src={lap2} 
                                alt="Sleep Statistics" 
                                className="w-3/4 rounded-lg shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default art1;