import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { PenTool, RotateCcw, Check } from 'lucide-react';

const SignaturePad = ({ firma, setFirma, nombreCliente, setNombreCliente }) => {
  const sigCanvas = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const clear = () => {
    sigCanvas.current?.clear();
    setIsEmpty(true);
    setFirma(null);
  };

  const save = () => {
    if (sigCanvas.current?.isEmpty()) {
      alert('Dibuja una firma primero');
      return;
    }
    const dataURL = sigCanvas.current.toDataURL('image/png');
    setFirma(dataURL);
    setIsEmpty(false);
    alert('Firma guardada');
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <PenTool className="w-5 h-5" />
        Firma del Cliente
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Nombre del Cliente</label>
        <input
          type="text"
          value={nombreCliente}
          onChange={(e) => setNombreCliente(e.target.value)}
          placeholder="Nombre completo"
          className="input-field"
        />
      </div>

      <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white mb-4">
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{
            className: 'w-full h-40 touch-none',
          }}
          backgroundColor="white"
          penColor="#000000"
          onEnd={() => setIsEmpty(false)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={clear} className="btn btn-secondary flex items-center justify-center gap-2">
          <RotateCcw className="w-5 h-5" />
          Limpiar
        </button>
        <button onClick={save} disabled={isEmpty} className="btn btn-primary flex items-center justify-center gap-2">
          <Check className="w-5 h-5" />
          Guardar
        </button>
      </div>

      {firma && (
        <p className="mt-3 text-sm text-green-600 dark:text-green-400 text-center">✓ Firma guardada</p>
      )}
    </div>
  );
};

export default SignaturePad;
