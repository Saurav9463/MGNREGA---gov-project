import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const ChangeIndicator = ({ change }) => {
  if (change > 5) return <TrendingUp className="w-4 h-4 text-green-600" />;
  if (change < -5) return <TrendingDown className="w-4 h-4 text-red-600" />;
  return <Minus className="w-4 h-4 text-gray-600" />;
};

export const MetricCard = ({ icon: Icon, label, value, change, comparison }) => (
  <div className="bg-white rounded-lg shadow-md p-4 border-2 border-gray-100">
    <div className="flex items-center gap-3 mb-2">
      <div className="bg-blue-100 p-2 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <p className="text-sm text-gray-600 font-medium">{label}</p>
    </div>
    <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
    {change !== undefined && (
      <div className="flex items-center gap-2 text-sm">
        <ChangeIndicator change={change} />
        <span className={`${change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'}`}>
          {change > 0 ? '+' : ''}{change.toFixed(1)}%
        </span>
        <span className="text-gray-500">{comparison}</span>
      </div>
    )}
  </div>
);