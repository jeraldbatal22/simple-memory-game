import React from 'react';

// Settings Modal Component
const SettingsModal = ({ isOpen, onClose, settings, onSettingsChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#eae6ff] to-[#e6f8ff3b] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-sm mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-[#4A4A68]">Settings</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base text-[#4A4A68]">Sound Effects</span>
            <button
              onClick={() => onSettingsChange('soundEnabled', !settings.soundEnabled)}
              className={`w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors ${
                settings.soundEnabled ? 'bg-[#AEE3F9]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full transition-transform ${
                  settings.soundEnabled ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base text-[#4A4A68]">Dark Mode</span>
            <button
              onClick={() => onSettingsChange('darkMode', !settings.darkMode)}
              className={`w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-colors ${
                settings.darkMode ? 'bg-[#4A4A68]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full transition-transform ${
                  settings.darkMode ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal