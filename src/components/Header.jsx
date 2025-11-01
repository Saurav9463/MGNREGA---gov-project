import React from 'react';
import { Home, MapPin, AlertCircle } from 'lucide-react';

export const Header = ({ 
  selectedDistrict, 
  locationDetected, 
  language, 
  setLanguage, 
  onHomeClick, 
  error, 
  translations 
}) => (
  <div className="bg-white shadow-md sticky top-0 z-10">
    <div className="max-w-4xl mx-auto px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={onHomeClick}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Home className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {language === 'hi' ? selectedDistrict.nameHi : selectedDistrict.name}
            </h2>
            {locationDetected && (
              <p className="text-xs text-green-600 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {translations.locationDetected}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm font-medium"
          >
            {language === 'hi' ? 'English' : 'हिंदी'}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 flex items-center gap-2 text-sm text-yellow-800">
          <AlertCircle className="w-4 h-4" />
          {translations.offline}
        </div>
      )}
    </div>
  </div>
);