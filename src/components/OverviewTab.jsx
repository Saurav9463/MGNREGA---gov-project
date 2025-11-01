import React from 'react';
import { Users, Briefcase, Clock, IndianRupee, CheckCircle } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { formatNumber } from '../utils/formatters';
import { getChange, getPerformanceClass } from '../utils/calculations';

export const OverviewTab = ({ districtData, translations, language }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MetricCard
        icon={Users}
        label={translations.households}
        value={formatNumber(districtData.current.households, translations)}
        change={getChange(districtData.current.households, districtData.previous.households)}
        comparison={translations.vsLastMonth}
      />
      <MetricCard
        icon={Briefcase}
        label={translations.jobCards}
        value={formatNumber(districtData.current.jobCards, translations)}
        change={getChange(districtData.current.jobCards, districtData.previous.jobCards)}
        comparison={translations.vsLastMonth}
      />
      <MetricCard
        icon={Clock}
        label={translations.workDays}
        value={formatNumber(districtData.current.workDays, translations)}
        change={getChange(districtData.current.workDays, districtData.previous.workDays)}
        comparison={translations.vsLastMonth}
      />
      <MetricCard
        icon={IndianRupee}
        label={translations.wages}
        value={`₹${formatNumber(districtData.current.wagesPaid * 10000000, translations)}`}
        change={getChange(districtData.current.wagesPaid, districtData.previous.wagesPaid)}
        comparison={translations.vsLastMonth}
      />
    </div>

    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <CheckCircle className="w-6 h-6 text-green-600" />
        {translations.districtPerformance}
      </h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className={`p-4 rounded-lg ${getPerformanceClass(districtData.performance.overall)}`}>
          <p className="text-3xl font-bold text-gray-900">{districtData.performance.overall}%</p>
          <p className="text-sm text-gray-600 mt-1">{translations.overall}</p>
        </div>
        <div className={`p-4 rounded-lg ${getPerformanceClass(districtData.performance.wagePayment)}`}>
          <p className="text-3xl font-bold text-gray-900">{districtData.performance.wagePayment}%</p>
          <p className="text-sm text-gray-600 mt-1">{language === 'hi' ? 'मजदूरी' : 'Wages'}</p>
        </div>
        <div className={`p-4 rounded-lg ${getPerformanceClass(districtData.performance.workCompletion)}`}>
          <p className="text-3xl font-bold text-gray-900">{districtData.performance.workCompletion}%</p>
          <p className="text-sm text-gray-600 mt-1">{language === 'hi' ? 'काम पूरा' : 'Work Done'}</p>
        </div>
      </div>
    </div>
  </div>
);