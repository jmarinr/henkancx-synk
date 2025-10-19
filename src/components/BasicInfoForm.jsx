import React from 'react';
import { FileText, MapPin, Clock } from 'lucide-react';

const BasicInfoForm = ({ formData, onChange, location }) => {
  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Información Básica
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">OT ID *</label>
          <input
            type="text"
            name="otId"
            value={formData.otId}
            onChange={onChange}
            placeholder="OT-2025-001"
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Técnico *</label>
          <input
            type="text"
            name="tecnico"
            value={formData.tecnico}
            onChange={onChange}
            placeholder="Nombre del técnico"
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sitio</label>
          <input
            type="text"
            name="sitio"
            value={formData.sitio}
            onChange={onChange}
            placeholder="Nombre del sitio"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cliente</label>
          <input
            type="text"
            name="cliente"
            value={formData.cliente}
            onChange={onChange}
            placeholder="Nombre del cliente"
            className="input-field"
          />
        </div>
      </div>

      {location && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4" />
          <span>GPS: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</span>
        </div>
      )}
    </div>
  );
};

export default BasicInfoForm;
