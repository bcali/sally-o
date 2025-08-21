import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Users, Heart, Baby, UserCheck, Briefcase, Palmtree, Gift, Bed, Link, Home, Coffee, Waves, Dumbbell, Sparkles, PawPrint, Shield, DollarSign, MapPin, Mountain, Camera, Compass, Wallet } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: (preferences: UserPreferences) => void;
  onBack: () => void;
}

interface UserPreferences {
  tripContext: string[];
  guestCount: number;
  connectingRooms: boolean;
  largerRooms: boolean;
  amenities: string[];
  bookingType: 'refundable' | 'non-refundable' | '';
  priorities: string[];
  locationExperience: string[];
  budgetRange: string;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>({
    tripContext: [],
    guestCount: 2,
    connectingRooms: false,
    largerRooms: false,
    amenities: [],
    bookingType: '',
    priorities: [],
    locationExperience: [],
    budgetRange: ''
  });

  const totalSteps = 6;

  const tripContextOptions = [
    { id: 'solo', label: 'Solo', icon: UserCheck },
    { id: 'couple', label: 'Couple', icon: Heart },
    { id: 'family', label: 'Family with kids', icon: Baby },
    { id: 'friends', label: 'Group of friends', icon: Users },
    { id: 'business', label: 'Business', icon: Briefcase },
    { id: 'leisure', label: 'Leisure', icon: Palmtree },
    { id: 'special', label: 'Special occasion', icon: Gift }
  ];

  const amenitiesOptions = [
    { id: 'breakfast', label: 'Breakfast', icon: Coffee },
    { id: 'pool', label: 'Pool', icon: Waves },
    { id: 'gym', label: 'Gym', icon: Dumbbell },
    { id: 'spa', label: 'Spa', icon: Sparkles },
    { id: 'kids-club', label: 'Kids Club', icon: Baby },
    { id: 'pet-friendly', label: 'Pet-friendly', icon: PawPrint }
  ];

  const priorityOptions = [
    { id: 'price', label: 'Price', icon: DollarSign },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'comfort', label: 'Comfort', icon: Home }
  ];

  const locationOptions = [
    { id: 'city-center', label: 'City center', icon: MapPin },
    { id: 'quiet', label: 'Quiet area', icon: Mountain },
    { id: 'attractions', label: 'Near attractions', icon: Camera },
    { id: 'local', label: 'Local experiences', icon: Compass }
  ];

  const budgetOptions = [
    { id: 'budget', label: 'Budget', icon: Wallet },
    { id: 'mid-range', label: 'Mid-range', icon: Wallet },
    { id: 'premium', label: 'Premium', icon: Wallet },
    { id: 'luxury', label: 'Luxury', icon: Wallet }
  ];

  const handleArrayToggle = (field: keyof UserPreferences, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value]
    }));
  };

  const handleSingleSelect = (field: keyof UserPreferences, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return preferences.tripContext.length > 0;
      case 1: return preferences.guestCount > 0;
      case 2: return true; // Amenities are optional
      case 3: return preferences.bookingType !== '' && preferences.priorities.length > 0;
      case 4: return preferences.locationExperience.length > 0;
      case 5: return preferences.budgetRange !== '';
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save to localStorage
      localStorage.setItem('userPreferences', JSON.stringify(preferences));
      onComplete(preferences);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const renderProgressBar = () => (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white text-sm opacity-70">Step {currentStep + 1} of {totalSteps}</span>
        <span className="text-white text-sm opacity-70">{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
      </div>
      <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-dancing-script">
              What's your trip about?
            </h2>
            <p className="text-white opacity-80 mb-8 text-lg">
              Tell us about your travel style
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {tripContextOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = preferences.tripContext.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => handleArrayToggle('tripContext', option.id)}
                    className={`p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                      isSelected 
                        ? 'bg-white text-purple-600 shadow-xl' 
                        : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                    }`}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2" />
                    <span className="text-sm font-medium">{option.label}</span>
                    {isSelected && <Check className="w-4 h-4 mx-auto mt-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-dancing-script">
              Room & Guest Details
            </h2>
            <p className="text-white opacity-80 mb-8 text-lg">
              Let's set up your perfect stay
            </p>
            <div className="max-w-md mx-auto space-y-6">
              {/* Guest Count */}
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6">
                <label className="block text-white font-medium mb-4">Number of Guests</label>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => handleSingleSelect('guestCount', Math.max(1, preferences.guestCount - 1))}
                    className="w-10 h-10 bg-white bg-opacity-30 rounded-full flex items-center justify-center text-white hover:bg-opacity-50 transition-all"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-white w-12 text-center">{preferences.guestCount}</span>
                  <button
                    onClick={() => handleSingleSelect('guestCount', preferences.guestCount + 1)}
                    className="w-10 h-10 bg-white bg-opacity-30 rounded-full flex items-center justify-center text-white hover:bg-opacity-50 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4">
                <button
                  onClick={() => handleSingleSelect('connectingRooms', !preferences.connectingRooms)}
                  className={`w-full p-4 rounded-2xl transition-all duration-300 flex items-center gap-3 ${
                    preferences.connectingRooms 
                      ? 'bg-white text-purple-600' 
                      : 'bg-white bg-opacity-20 text-white'
                  }`}
                >
                  <Link className="w-6 h-6" />
                  <span className="font-medium">Connecting rooms</span>
                  {preferences.connectingRooms && <Check className="w-5 h-5 ml-auto" />}
                </button>

                <button
                  onClick={() => handleSingleSelect('largerRooms', !preferences.largerRooms)}
                  className={`w-full p-4 rounded-2xl transition-all duration-300 flex items-center gap-3 ${
                    preferences.largerRooms 
                      ? 'bg-white text-purple-600' 
                      : 'bg-white bg-opacity-20 text-white'
                  }`}
                >
                  <Bed className="w-6 h-6" />
                  <span className="font-medium">Larger rooms/suites</span>
                  {preferences.largerRooms && <Check className="w-5 h-5 ml-auto" />}
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-dancing-script">
              What amenities matter?
            </h2>
            <p className="text-white opacity-80 mb-8 text-lg">
              Choose what makes your stay special
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {amenitiesOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = preferences.amenities.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => handleArrayToggle('amenities', option.id)}
                    className={`p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                      isSelected 
                        ? 'bg-white text-purple-600 shadow-xl' 
                        : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                    }`}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2" />
                    <span className="text-sm font-medium">{option.label}</span>
                    {isSelected && <Check className="w-4 h-4 mx-auto mt-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-dancing-script">
              Booking Preferences
            </h2>
            <p className="text-white opacity-80 mb-8 text-lg">
              How do you like to book?
            </p>
            <div className="max-w-md mx-auto space-y-6">
              {/* Booking Type */}
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6">
                <label className="block text-white font-medium mb-4">Booking Type</label>
                <div className="space-y-3">
                  <button
                    onClick={() => handleSingleSelect('bookingType', 'refundable')}
                    className={`w-full p-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                      preferences.bookingType === 'refundable' 
                        ? 'bg-white text-purple-600' 
                        : 'bg-white bg-opacity-20 text-white'
                    }`}
                  >
                    <Shield className="w-5 h-5" />
                    <span>Refundable (flexible)</span>
                    {preferences.bookingType === 'refundable' && <Check className="w-4 h-4 ml-auto" />}
                  </button>
                  <button
                    onClick={() => handleSingleSelect('bookingType', 'non-refundable')}
                    className={`w-full p-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                      preferences.bookingType === 'non-refundable' 
                        ? 'bg-white text-purple-600' 
                        : 'bg-white bg-opacity-20 text-white'
                    }`}
                  >
                    <DollarSign className="w-5 h-5" />
                    <span>Non-refundable (better price)</span>
                    {preferences.bookingType === 'non-refundable' && <Check className="w-4 h-4 ml-auto" />}
                  </button>
                </div>
              </div>

              {/* Priorities */}
              <div>
                <label className="block text-white font-medium mb-4">What matters most?</label>
                <div className="grid grid-cols-3 gap-3">
                  {priorityOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = preferences.priorities.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleArrayToggle('priorities', option.id)}
                        className={`p-3 rounded-xl transition-all duration-300 ${
                          isSelected 
                            ? 'bg-white text-purple-600' 
                            : 'bg-white bg-opacity-20 text-white'
                        }`}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-1" />
                        <span className="text-sm">{option.label}</span>
                        {isSelected && <Check className="w-3 h-3 mx-auto mt-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-dancing-script">
              Location & Experience
            </h2>
            <p className="text-white opacity-80 mb-8 text-lg">
              Where do you want to be?
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
              {locationOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = preferences.locationExperience.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => handleArrayToggle('locationExperience', option.id)}
                    className={`p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                      isSelected 
                        ? 'bg-white text-purple-600 shadow-xl' 
                        : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                    }`}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2" />
                    <span className="text-sm font-medium">{option.label}</span>
                    {isSelected && <Check className="w-4 h-4 mx-auto mt-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-dancing-script">
              What's your budget?
            </h2>
            <p className="text-white opacity-80 mb-8 text-lg">
              Choose your comfort level
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {budgetOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = preferences.budgetRange === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSingleSelect('budgetRange', option.id)}
                    className={`p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                      isSelected 
                        ? 'bg-white text-purple-600 shadow-xl' 
                        : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                    }`}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2" />
                    <span className="text-sm font-medium capitalize">{option.label}</span>
                    {isSelected && <Check className="w-4 h-4 mx-auto mt-2" />}
                  </button>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
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
          onClick={handleBack}
          className="bg-white bg-opacity-20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-opacity-30 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
        {/* Progress bar */}
        {renderProgressBar()}

        {/* Step content */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          {renderStepContent()}
        </div>

        {/* Next button */}
        <div className="mt-8">
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`px-8 py-4 rounded-full text-lg font-semibold shadow-xl transition-all duration-300 flex items-center gap-3 ${
              canProceed()
                ? 'bg-white text-purple-600 hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105'
                : 'bg-white bg-opacity-30 text-white opacity-50 cursor-not-allowed'
            }`}
          >
            <span>{currentStep === totalSteps - 1 ? 'Save My Preferences' : 'Next'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;