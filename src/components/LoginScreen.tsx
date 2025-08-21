import React, { useState } from 'react';
import { ArrowLeft, AlertCircle, Loader2, Shield, Sparkles } from 'lucide-react';

interface LoginScreenProps {
  onBack: () => void;
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onBack, onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/failure for demo
      const success = Math.random() > 0.3; // 70% success rate
      
      if (success) {
        onLoginSuccess();
      } else {
        throw new Error('Authentication failed. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-white bg-opacity-10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 -right-8 w-96 h-96 bg-yellow-200 bg-opacity-10 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-pink-200 bg-opacity-20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Back button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={onBack}
          className="bg-white bg-opacity-20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-opacity-30 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="text-center max-w-md mx-auto">
          {/* Avatar Section */}
          <div className="mb-8 relative">
            <div className="inline-block relative">
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full overflow-hidden shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="/ChatGPT Image Aug 21, 2025, 03_17_48 PM.png"
                  alt="Sally O - Your Booking Assistant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-spin-slow">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Welcome back message */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-dancing-script">
              Welcome Back!
            </h1>
            <p className="text-lg text-white opacity-90 font-inter">
              Sign in to start finding your perfect hotel
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-6">
            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-500 bg-opacity-20 border border-red-300 rounded-2xl p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-200 flex-shrink-0" />
                <p className="text-red-100 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full bg-white text-gray-700 px-6 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Signing you in...</span>
                </>
              ) : (
                <>
                  <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-yellow-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            {/* Security note */}
            <div className="mt-6 flex items-center justify-center gap-2 text-white text-sm opacity-70">
              <Shield className="w-4 h-4" />
              <span>Secure authentication powered by Google</span>
            </div>
          </div>

          {/* Terms */}
          <p className="text-white text-xs opacity-60 text-center max-w-sm mx-auto leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy. 
            Your data is protected and never shared with third parties.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;