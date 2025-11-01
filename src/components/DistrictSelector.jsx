import React from 'react';
import { MapPin, Info } from 'lucide-react';
import { UP_DISTRICTS } from '../constants/districts';

export const DistrictSelector = ({ 
  language, 
  setLanguage, 
  onDistrictSelect, 
  onDetectLocation, 
  translations 
}) => (
  <div className="min-h-screen bg-gradient-to-b from-orange-50 to-green-50 p-4">
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8 pt-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem" className="w-12 h-12" />
          <h1 className="text-3xl font-bold text-gray-900">{translations.title}</h1>
        </div>
        <p className="text-gray-600">{translations.subtitle}</p>
        
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setLanguage('hi')}
            className={`px-4 py-2 rounded-lg font-medium ${language === 'hi' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'}`}
          >
            हिंदी
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded-lg font-medium ${language === 'en' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'}`}
          >
            English
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
        <button
          onClick={onDetectLocation}
          className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-3 hover:bg-green-700 transition-colors mb-4"
        >
          <MapPin className="w-6 h-6" />
          {translations.detectLocation}
        </button>
        
        <div className="text-center text-gray-500 my-4">या / OR</div>
        
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {translations.selectDistrict}
        </label>
        <select
          onChange={(e) => {
            const district = UP_DISTRICTS.find(d => d.code === e.target.value);
            if (district) onDistrictSelect(district);
          }}
          className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-orange-500 focus:outline-none"
        >
          <option value="">-- {language === 'hi' ? 'चुनें' : 'Select'} --</option>
          {UP_DISTRICTS.map(district => (
            <option key={district.code} value={district.code}>
              {language === 'hi' ? district.nameHi : district.name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <Info className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <div className="text-sm text-blue-900">
            <p className="font-medium mb-1">{translations.whatIsMGNREGA}</p>
            <p>{translations.mgnregaDesc}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);