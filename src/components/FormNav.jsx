import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FormNav({ step, setStep, totalSteps = 3, onSave }) {
  const nav = useNavigate();

  const back = () => setStep(Math.max(0, step - 1));
  const next = () => setStep(Math.min(totalSteps - 1, step + 1));
  const saveAndExit = () => {
    if (onSave) onSave();
    nav('/');
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <button
        type="button"
        onClick={back}
        className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50"
        disabled={step === 0}
      >
        ← Anterior
      </button>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={saveAndExit}
          className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50"
        >
          Guardar y volver al menú
        </button>
        <button
          type="button"
          onClick={next}
          className="px-4 py-2 rounded-xl bg-black text-white hover:shadow"
          disabled={step === totalSteps - 1}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
