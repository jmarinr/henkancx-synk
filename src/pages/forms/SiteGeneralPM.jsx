import React, { useState, useEffect } from 'react';
import BasicInfo from '../../components/BasicInfo.jsx';
import PhotoField from '../../components/PhotoField.jsx';

export default function SiteGeneralPM() {
  const [step, setStep] = useState(0);
  const [basic, setBasic] = useState({});
  const [data, setData] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sitepmData') || '{}'); }
    catch { return {}; }
  });
  const [photos, setPhotos] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sitepmPhotos') || '{}'); }
    catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem('sitepmData', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('sitepmPhotos', JSON.stringify(photos));
  }, [photos]);

  const steps = [
    { key: 'basic', title: 'Datos básicos' },
    { key: 'inspection', title: 'Mantenimiento general' },
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
        <h1 className="text-2xl font-bold">Mantenimiento general del sitio</h1>
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
              <label className="block text-sm font-medium">Estado de cercas / perímetro</label>
              <select
                className="w-full border rounded-xl px-3 py-2"
                value={data.fenceStatus || ''}
                onChange={(e) => update('fenceStatus', e.target.value)}
              >
                <option value="">Selecciona…</option>
                <option value="bueno">Bueno</option>
                <option value="regular">Regular</option>
                <option value="critico">Crítico</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Estado de caminos / accesos</label>
              <select
                className="w-full border rounded-xl px-3 py-2"
                value={data.roadStatus || ''}
                onChange={(e) => update('roadStatus', e.target.value)}
              >
                <option value="">Selecciona…</option>
                <option value="bueno">Bueno</option>
                <option value="regular">Regular</option>
                <option value="critico">Crítico</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium">Limpieza general</label>
              <select
                className="w-full border rounded-xl px-3 py-2"
                value={data.cleanliness || ''}
                onChange={(e) => update('cleanliness', e.target.value)}
              >
                <option value="">Selecciona…</option>
                <option value="buena">Buena</option>
                <option value="regular">Regular</option>
                <option value="deficiente">Deficiente</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Señalización / seguridad</label>
              <select
                className="w-full border rounded-xl px-3 py-2"
                value={data.signage || ''}
                onChange={(e) => update('signage', e.target.value)}
              >
                <option value="">Selecciona…</option>
                <option value="completa">Completa</option>
                <option value="parcial">Parcial</option>
                <option value="inexistente">Inexistente</option>
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
          <PhotoField label="Foto perímetro/cerca" onChange={(v)=>setPhotos((p)=>({ ...p, fence:v }))} />
          <PhotoField label="Foto acceso/camino" onChange={(v)=>setPhotos((p)=>({ ...p, road:v }))} />
          <PhotoField label="Foto señalización" onChange={(v)=>setPhotos((p)=>({ ...p, signage:v }))} />
          <PhotoField label="Foto limpieza" onChange={(v)=>setPhotos((p)=>({ ...p, clean:v }))} />
        </div>
      )}

      <PrevNext />
    </div>
  );
}
