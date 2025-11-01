import React from 'react';

export const PerformanceBar = ({ label, score, target = 80 }) => {
  const percentage = Math.min((score / target) * 100, 100);
  const color = score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500';
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-900">{score}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`h-3 rounded-full ${color} transition-all duration-500`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};