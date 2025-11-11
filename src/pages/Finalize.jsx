import React, { useState } from 'react';
import { generateInspectionPDF } from '../utils/pdf';

export default function Finalize() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    try {
      setError('');
      setLoading(true);
      await generateInspectionPDF();
    } catch (e) {
      setError(e.message || 'No se pudo generar el PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Culminar inspección</h1>
      <p className="text-sm text-gray-600 mb-4">Verifica que todos los formularios estén completos.</p>
      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
      <button onClick={handleDownload} disabled={loading} className="rounded-2xl px-4 py-2 bg-black text-white font-semibold shadow disabled:opacity-50">
        {loading ? 'Generando PDF…' : 'Descargar PDF'}
      </button>
    </div>
  );
}
