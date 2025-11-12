import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const InspectionComplete = () => {
  return (
    <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-500">
      <div className="flex flex-col items-center justify-center py-8">
        <div className="relative">
          <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
          <CheckCircle2 className="w-24 h-24 text-green-500 relative z-10" strokeWidth={2} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-6">
          Inspección Completada
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          La orden ha sido finalizada exitosamente
        </p>
      </div>
    </div>
  );
};

export default InspectionComplete;
