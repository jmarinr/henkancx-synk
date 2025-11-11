import React, { useState, useEffect } from 'react';
import BasicInfo from '../../components/BasicInfo.jsx';
import PhotoField from '../../components/PhotoField.jsx';

export default function GroundMeasurement() {
  const [step, setStep] = useState(0);
  const [basic, setBasic] = useState({});
  const [data, setData] = useState(() => {
    try { return JSON.parse(localStorage.getItem('groundData') || '{}'); }
    catch { return {}; }
  });
  const [photos, setPhotos] = useState(() => {
    try { return JSON.parse(localStorage.getItem('groundPhotos') || '{}'); }
    catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem('groundData', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('groundPhotos', JSON.stringify(photos));
  }, [photos]);

  const steps = [
    { key: 'basic', title: 'Datos básicos' },
    { key: 'inspection', title: 'Medición' },
    { key: 'photos', title: 'Fotos' },
  ];

  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const PrevNext = () => (
    <div className="flex items-center justify-between mt-4">
      <button
        type="button"
        onClick={() => setStep((s) => Math.max(0, s - 1))}
        className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50"
        disabled={step === 0}
      >
        ← Anterior
      </button>
      <div className="flex items-center gap-2">
        <a href="/" className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50">
          Guardar y volver al menú
        </a>
        <button
          type="button"
          onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
          className="px-4 py-2 rounded-xl bg-black text-white hover:shadow"
          disabled={step === steps.length - 1}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Medición de sistema de tierras</h1>
        <div className="text-sm text-gray-600">Paso {step + 1} de {steps.length}</div>
      </div>

      <ol className="flex items-center gap-2">
        {steps.map((s, i) => (
          <li key={s.key}>
            <button
              type="button"
              onClick={() => setStep(i)}
              className={`px-3 py-1.5 rounded-full text-sm border ${
                i === step ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'
              }`}
            >
              {i + 1}. {s.title}
            </button>
          </li>
        ))}
      </ol>

      {/* Paso 1 */}
      {step === 0 && <BasicInfo onChange={setBasic} />}

      {/* Paso 2 */}
      {step === 1 && (
        <div className="rounded-2xl border p-4 bg-white space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium">Resistencia de puesta a tierra (Ω)</label>
              <input
                type="number"
                step="0.01"
                className="w-full border rounded-xl px-3 py-2"
                value={data.earthingOhms || ''}
                onChange={(e) => update('earthingOhms', e.target.value)}
                placeholder="Ej: 2.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Método de medición</label>
              <select
                className="w-full border rounded-xl px-3 py-2"
                value={data.method || ''}
                onChange={(e) => update('method', e.target.value)}
              >
                <option value="">Selecciona…</option>
                <option value="caida-de-potencial">Caída de potencial</option>
                <option value="pinza">Pinza amperimétrica</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Observaciones</label>
            <textarea
              className="w-full border rounded-xl px-3 py-2"
              rows={4}
              value={data.observations || ''}
              onChange={(e) => update('observations', e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Paso 3 */}
      {step === 2 && (
        <div className="rounded-2xl border p-4 bg-white space-y-3">
          <PhotoField label="Foto de instrumentación" onChange={(v) => setPhotos((p) => ({ ...p, instrument: v }))} />
          <PhotoField label="Foto de puntos de prueba" onChange={(v) => setPhotos((p) => ({ ...p, points: v }))} />
          <PhotoField label="Foto de resultado (display)" onChange={(v) => setPhotos((p) => ({ ...p, result: v }))} />
        </div>
      )}

      <PrevNext />
    </div>
  );
}
