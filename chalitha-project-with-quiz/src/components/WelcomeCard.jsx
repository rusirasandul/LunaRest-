function WelcomeCard({ setQuizStart }) {
  return (
    <div className="h-screen w-screen bg-[url(/background.jpg)] bg-cover bg-center">
      {/* Centered Content */}
      <div className="relative flex items-center justify-center min-h-screen p-4">
        {/* Glassmorphic Card */}
        <div className="bg-white/70 rounded-3xl p-5 w-[650px] min-h-[690px] flex flex-col items-center shadow-2xl border border-white/30 gap-[70px]">
          {/* Logo */}
          <div className="w-12 h-12 self-start">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col items-center justify-center space-y-5 text-5xl tracking-wide font-heading text-blue-950">
            <h1>Welcome</h1>
            <h2>To Your</h2>
            <h2>AI</h2>
            <h2>Sleep Quality Prediction</h2>
          </div>

          {/* Get Started Button */}
          <button
            className="bg-blue-950 text-white h-[50px] w-[70%] rounded-lg text-xl font-semibold hover:bg-blue-900 cursor-pointer transition-colors shadow-md shadow-gray-600"
            onClick={() => setQuizStart(true)}
          >
            Let's Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeCard;
