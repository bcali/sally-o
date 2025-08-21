import React, { useState } from 'react';
import { LogIn, Sparkles, MapPin, Heart } from 'lucide-react';
import LoginScreen from './components/LoginScreen';

function App() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'login' | 'dashboard'>('welcome');

  const handleContinueWithGoogle = () => {
    setCurrentScreen('login');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };

  const handleLoginSuccess = () => {
    setCurrentScreen('dashboard');
  };

  if (currentScreen === 'login') {
    return <LoginScreen onBack={handleBackToWelcome} onLoginSuccess={handleLoginSuccess} />;
  }

  if (currentScreen === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4 font-dancing-script">Welcome to your dashboard!</h1>
          <p className="text-lg opacity-90">Hotel search functionality coming soon...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-white bg-opacity-10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 -right-8 w-96 h-96 bg-yellow-200 bg-opacity-10 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-pink-200 bg-opacity-20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Avatar Section */}
          <div className="mb-8 relative">
            <div className="inline-block relative">
              <div className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 rounded-full overflow-hidden shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="/ChatGPT Image Aug 21, 2025, 03_17_48 PM.png"
                  alt="Sally O - Your Booking Assistant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-spin-slow">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Brand Name */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-2 font-dancing-script leading-none">
              Sally O
            </h1>
            <p className="text-xl md:text-2xl text-white font-medium opacity-90 font-dancing-script">
              your booking assistant
            </p>
          </div>

          {/* Tagline */}
          <div className="mb-12">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl px-6 py-4 inline-block shadow-lg">
              <p className="text-lg md:text-xl text-white font-medium flex items-center gap-2 flex-wrap justify-center">
                <MapPin className="w-5 h-5 text-pink-200" />
                Find the perfect hotel and book right away
                <Heart className="w-5 h-5 text-pink-200 animate-pulse" />
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-8">
            <button
              onClick={handleContinueWithGoogle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded flex items-center justify-center">
                <LogIn className="w-4 h-4 text-white" />
              </div>
              <span>Continue with Google</span>
              <div className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}>
                →
              </div>
            </button>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-opacity-25 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Smart Search</h3>
              <p className="text-white text-sm opacity-80">Find hotels that match your exact preferences</p>
            </div>
            
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-opacity-25 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Instant Booking</h3>
              <p className="text-white text-sm opacity-80">Book directly on Booking.com with one click</p>
            </div>
            
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-opacity-25 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Best Deals</h3>
              <p className="text-white text-sm opacity-80">Always get the most competitive prices</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <p className="text-white text-sm opacity-60 text-center">
            Powered by Booking.com • Your travel dreams start here ✨
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;