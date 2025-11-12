import React from 'react';
import { FileText, Building, User, MapPin, Lock } from 'lucide-react';

const BasicInfoForm = ({ formData, location }) => {
  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Información de la Orden
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            <Lock className="w-3 h-3 text-gray-400" />
            OT ID
          </label>
          <input
            type="text"
            value={formData.otId}
            disabled
            className="input-field bg-gray-50 dark:bg-gray-700 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            <Lock className="w-3 h-3 text-gray-400" />
            Técnico
          </label>
          <input
            type="text"
            value={formData.tecnico}
            disabled
            className="input-field bg-gray-50 dark:bg-gray-700 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            <Lock className="w-3 h-3 text-gray-400" />
            Cliente
          </label>
          <input
            type="text"
            value={formData.cliente}
            disabled
            className="input-field bg-gray-50 dark:bg-gray-700 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            <Lock className="w-3 h-3 text-gray-400" />
            Sitio
          </label>
          <input
            type="text"
            value={formData.sitio}
            disabled
            className="input-field bg-gray-50 dark:bg-gray-700 cursor-not-allowed"
          />
        </div>
      </div>

      {location && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-gray-700 dark:text-gray-300">
            GPS: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
          </span>
        </div>
      )}
    </div>
  );
};

export default BasicInfoForm;
