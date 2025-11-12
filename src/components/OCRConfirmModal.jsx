import React from 'react';
import { CheckCircle, X, AlertCircle } from 'lucide-react';

const OCRConfirmModal = ({ isOpen, onClose, extractedData, onConfirm }) => {
  if (!isOpen) return null;

  const dataEntries = Object.entries(extractedData);
  const hasData = dataEntries.length > 0;

  const fieldLabels = {
    hodometro: 'Hodómetro',
    nSeriePlanta: 'N° Serie Planta',
    nSerieMotor: 'N° Serie Motor',
    modeloPlanta: 'Modelo Planta',
    modeloMotor: 'Modelo Motor',
    marcaPlanta: 'Marca Planta',
    marcaMotor: 'Marca Motor',
    capacidadKW: 'Capacidad (KW)',
    voltajeGeneral: 'Voltaje',
    temperatura: 'Temperatura',
    presionAceite: 'Presión Aceite (PSI)',
    frecuencia: 'Frecuencia (Hz)',
    voltajeL1N: 'Voltaje L1-N',
    voltajeL2N: 'Voltaje L2-N',
    voltajeL1L2: 'Voltaje L1-L2',
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {hasData ? (
                <CheckCircle className="w-8 h-8" />
              ) : (
                <AlertCircle className="w-8 h-8" />
              )}
              <div>
                <h2 className="text-2xl font-bold">Análisis OCR Completado</h2>
                <p className="text-blue-100 text-sm mt-1">
                  {hasData ? `${dataEntries.length} campos detectados` : 'No se detectaron datos'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {hasData ? (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Se detectaron los siguientes datos en la imagen. Revísalos y confirma para llenar automáticamente el formulario:
              </p>
              
              <div className="space-y-3">
                {dataEntries.map(([key, value]) => (
                  <div 
                    key={key}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {fieldLabels[key] || key}
                    </span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No se pudo extraer información legible de esta imagen.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Intenta con una foto más clara del tablero de control o placas del equipo.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 btn btn-secondary py-3"
            >
              Cancelar
            </button>
            {hasData && (
              <button
                onClick={() => {
                  onConfirm(extractedData);
                  onClose();
                }}
                className="flex-1 btn bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                Confirmar y Llenar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OCRConfirmModal;
