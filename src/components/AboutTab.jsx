import React from 'react';
import { CheckCircle } from 'lucide-react';

export const AboutTab = ({ translations }) => (
  <div className="space-y-4">
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{translations.whatIsMGNREGA}</h3>
      <p className="text-gray-700 mb-6 leading-relaxed">{translations.mgnregaDesc}</p>
      
      <h4 className="text-lg font-bold text-gray-900 mb-3">{translations.keyBenefits}</h4>
      <div className="space-y-3">
        {[
          translations.benefit1, 
          translations.benefit2, 
          translations.benefit3, 
          translations.benefit4
        ].map((benefit, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-gray-700">{benefit}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
      <h4 className="text-lg font-bold text-gray-900 mb-2">
        {translations.contact}
      </h4>
      <p className="text-gray-700">
        {translations.contactDesc}
      </p>
      <p className="text-gray-700 mt-2">
        <strong>{translations.helpline}:</strong> 1800-111-555
      </p>
    </div>
  </div>
);
