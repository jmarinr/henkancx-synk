import React, { useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { PenTool, Trash2 } from 'lucide-react';

const SignaturePad = ({ firma, setFirma, nombreCliente, setNombreCliente }) => {
  const sigCanvas = useRef(null);

  useEffect(() => {
    // Cargar firma existente si hay
    if (firma && sigCanvas.current) {
      sigCanvas.current.fromDataURL(firma);
    }
  }, []);

  const handleClear = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setFirma(null);
    }
  };

  const handleEnd = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const dataUrl = sigCanvas.current.toDataURL('image/png');
      setFirma(dataUrl);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <PenTool className="w-5 h-5" />
        Firma del Cliente <span className="text-red-600">*</span>
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Nombre del Cliente <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          value={nombreCliente}
          onChange={(e) => setNombreCliente(e.target.value)}
          placeholder="Nombre completo del cliente"
          className="input-field"
          required
        />
      </div>

      <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white">
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{
            className: 'w-full h-48 touch-none cursor-crosshair',
          }}
          backgroundColor="white"
          penColor="black"
          onEnd={handleEnd}
          minWidth={1}
          maxWidth={3}
          throttle={16}
          velocityFilterWeight={0.7}
        />
      </div>

      <div className="flex items-center justify-between mt-3">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {firma ? '✓ Firma guardada automáticamente' : 'Firme en el espacio de arriba'}
        </p>
        <button
          type="button"
          onClick={handleClear}
          className="btn btn-secondary flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Limpiar
        </button>
      </div>

      {!firma && (
        <p className="mt-2 text-sm text-red-600">
          * La firma es obligatoria para finalizar la inspección
        </p>
      )}
    </div>
  );
};

export default SignaturePad;
