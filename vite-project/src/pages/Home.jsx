import { useNavigate } from 'react-router-dom';
import heroImg from "../assets/heroImg"

const Home = () => {
    const navigate = useNavigate();

    return (
        <section 
            id='home' 
            className='relative flex items-center w-full min-h-screen bg-center bg-no-repeat bg-cover pt-28'
            style={{
                backgroundImage: url({heroImg})
            }}
        >
            <div className='container relative flex flex-col h-full p-8 mx-auto'>
                {/* Main Content */}
                <div className='flex flex-col max-w-2xl gap-4 text-nav'>
                    <h1 className='text-5xl font-bold md:text-6xl'>
                        Wake up Easy With
                        <span className='block mt-2 text-transparent font-heading bg-gradient-to-r from-h2 to-nav bg-clip-text '>
                            LunaRest
                        </span>
                    </h1>
                    <div className='mt-4'>
                        <h2 className='text-3xl font-semibold md:text-4xl text-white/90'>
                            We Help
                        </h2>
                        <h2 className='text-3xl font-semibold md:text-4xl text-white/90'>
                            You Sleep Better!
                        </h2>
                    </div>
                </div>
                
                {/* Login Button */}
                <button 
                    onClick={() => navigate('/login')}
                    className='absolute px-8 py-3 text-xl font-bold text-white transition-colors bg-purple-900 rounded-lg right-8 bottom-8 hover:bg-purple-800'
                >
                    LOGIN
                </button>
            </div>
        </section>
    )
}

export default Home