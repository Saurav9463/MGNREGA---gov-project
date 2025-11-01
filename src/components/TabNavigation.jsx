import React from 'react';
import { BarChart3, TrendingUp, Info } from 'lucide-react';

export const TabNavigation = ({ activeTab, setActiveTab, translations }) => (
  <div className="bg-white border-b sticky top-[72px] z-10">
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex gap-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-3 px-4 font-medium flex items-center justify-center gap-2 border-b-2 transition-colors ${
            activeTab === 'overview' 
              ? 'border-orange-500 text-orange-600' 
              : 'border-transparent text-gray-600'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          {translations.overview}
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`flex-1 py-3 px-4 font-medium flex items-center justify-center gap-2 border-b-2 transition-colors ${
            activeTab === 'performance' 
              ? 'border-orange-500 text-orange-600' 
              : 'border-transparent text-gray-600'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          {translations.performance}
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`flex-1 py-3 px-4 font-medium flex items-center justify-center gap-2 border-b-2 transition-colors ${
            activeTab === 'about' 
              ? 'border-orange-500 text-orange-600' 
              : 'border-transparent text-gray-600'
          }`}
        >
          <Info className="w-5 h-5" />
          {translations.about}
        </button>
      </div>
    </div>
  </div>
);
