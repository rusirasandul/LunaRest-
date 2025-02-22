import Logo from "../components/Logo"

const LandingPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center px-4"
      style={{
        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sleep%20Quality%20Prediction%20Questinnaire%20start%20Page-s3AH2YeB3nTSkgAuh8tmBR1Kje1knT.png')`,
      }}
    >
      <div className="absolute top-6 left-6 z-10">
        <Logo />
      </div>
      <div className="relative z-10 max-w-2xl w-full">
        <div className="backdrop-blur-md bg-white/70 p-8 md:p-12 rounded-[32px] shadow-2xl">
          <div className="text-center space-y-4">
            <h1 className="flex flex-col gap-2 text-4xl md:text-5xl font-bold text-[#1a237e]">
              <span>Welcome</span>
              <span>To Your</span>
              <span>AI</span>
              <span>Sleep Quality Prediction</span>
            </h1>

            <button
              className="mt-8 w-full py-4 px-8 bg-[#1a237e] hover:bg-[#283593] text-white rounded-lg 
                         text-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={() => console.log("Get Started clicked")}
            >
              Let's Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage

