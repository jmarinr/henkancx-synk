import React, { useState } from 'react';
import { FileText, Sparkles, Loader } from 'lucide-react';

const ObservationsIA = ({ observaciones, setObservaciones, iaResult, setIaResult }) => {
  const [loading, setLoading] = useState(false);

  const processWithIA = async () => {
    if (!observaciones.trim()) {
      alert('Escribe observaciones primero');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://henkancx-synk-api.onrender.com/api/ia/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: observaciones }),
      });

      const data = await response.json();
      setIaResult(data.data);
    } catch (error) {
      console.error('Error IA:', error);
      // Análisis básico local
      const texto = observaciones.toLowerCase();
      const daños = [];
      if (texto.includes('corrosión')) daños.push('corrosión');
      if (texto.includes('desgaste')) daños.push('desgaste');
      if (texto.includes('fuga')) daños.push('fuga');
      
      setIaResult({
        estado: daños.length > 0 ? 'observaciones' : 'operativo',
        daños_detectados: daños,
        resumen: daños.length > 0 
          ? `Detectado: ${daños.join(', ')}`
          : 'Equipo en condiciones normales',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Observaciones del Servicio
      </h2>

      <textarea
        value={observaciones}
        onChange={(e) => setObservaciones(e.target.value)}
        placeholder="Describe el trabajo realizado, estado del equipo, observaciones..."
        rows={6}
        className="input-field resize-none mb-4"
      />

      <button
        onClick={processWithIA}
        disabled={loading || !observaciones.trim()}
        className="btn btn-primary w-full flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Analizando...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Analizar con IA
          </>
        )}
      </button>

      {iaResult && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm font-semibold mb-2">Análisis IA:</p>
          <p className="text-sm mb-2"><strong>Estado:</strong> {iaResult.estado}</p>
          {iaResult.daños_detectados?.length > 0 && (
            <p className="text-sm mb-2">
              <strong>Daños:</strong> {iaResult.daños_detectados.join(', ')}
            </p>
          )}
          <p className="text-sm"><strong>Resumen:</strong> {iaResult.resumen}</p>
        </div>
      )}
    </div>
  );
};

export default ObservationsIA;
