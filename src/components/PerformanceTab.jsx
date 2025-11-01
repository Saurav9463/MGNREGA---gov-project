import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { PerformanceBar } from './PerformanceBar';

const ChangeIndicator = ({ change }) => {
  if (change > 5) return <TrendingUp className="w-4 h-4 text-green-600" />;
  if (change < -5) return <TrendingDown className="w-4 h-4 text-red-600" />;
  return <Minus className="w-4 h-4 text-gray-600" />;
};

export const PerformanceTab = ({ districtData, translations }) => {
  const comparisons = [
    { 
      label: translations.households, 
      current: districtData.current.households, 
      avg: districtData.stateAvg.households 
    },
    { 
      label: translations.jobCards, 
      current: districtData.current.jobCards, 
      avg: districtData.stateAvg.jobCards 
    },
    { 
      label: translations.workDays, 
      current: districtData.current.workDays, 
      avg: districtData.stateAvg.workDays 
    }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          {translations.detailedPerformance}
        </h3>
        <PerformanceBar 
          label={translations.overallPerformance} 
          score={districtData.performance.overall} 
        />
        <PerformanceBar 
          label={translations.wagePayment} 
          score={districtData.performance.wagePayment} 
        />
        <PerformanceBar 
          label={translations.workCompletion} 
          score={districtData.performance.workCompletion} 
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {translations.comparisonStateAvg}
        </h3>
        <div className="space-y-4">
          {comparisons.map((item, idx) => {
            const diff = ((item.current - item.avg) / item.avg) * 100;
            return (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                <div className="flex items-center gap-2">
                  <ChangeIndicator change={diff} />
                  <span className={`text-sm font-bold ${diff > 0 ? 'text-green-600' : diff < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                    {diff > 0 ? '+' : ''}{diff.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};