import React, { useState, useEffect } from 'react';
import BasicInfo from '../../components/BasicInfo.jsx';
import PhotoField from '../../components/PhotoField.jsx';

export default function EquipmentInventory() {
  const [step, setStep] = useState(0);
  const [basic, setBasic] = useState({});
  const [data, setData] = useState(() => {
    try { return JSON.parse(localStorage.getItem('inventoryData') || '{}'); }
    catch { return {}; }
  });
  const [photos, setPhotos] = useState(() => {
    try { return JSON.parse(localStorage.getItem('inventoryPhotos') || '{}'); }
    catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem('inventoryData', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('inventoryPhotos', JSON.stringify(photos));
  }, [photos]);

  const steps = [
    { key: 'basic', title: 'Datos básicos' },
    { key: 'inventory', title: 'Inventario' },
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

  // Estructura simple de inventario (puedes expandir columnas luego)
  const Row = ({ idx }) => (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
      <input
        className="border rounded-xl px-3 py-2"
        placeholder="Equipo"
        value={data[`row${idx}_name`] || ''}
        onChange={(e)=>update(`row${idx}_name`, e.target.value)}
      />
      <input
        className="border rounded-xl px-3 py-2"
        placeholder="Marca"
        value={data[`row${idx}_brand`] || ''}
        onChange={(e)=>update(`row${idx}_brand`, e.target.value)}
      />
      <input
        className="border rounded-xl px-3 py-2"
        placeholder="Modelo"
        value={data[`row${idx}_model`] || ''}
        onChange={(e)=>update(`row${idx}_model`, e.target.value)}
      />
      <input
        className="border rounded-xl px-3 py-2"
        placeholder="Serie"
        value={data[`row${idx}_serial`] || ''}
        onChange={(e)=>update(`row${idx}_serial`, e.target.value)}
      />
      <input
        type="number"
        min="0"
        className="border rounded-xl px-3 py-2"
        placeholder="Cantidad"
        value={data[`row${idx}_qty`] || ''}
        onChange={(e)=>update(`row${idx}_qty`, e.target.value)}
      />
    </div>
  );

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Inventario de equipos</h1>
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

      {/* Paso 2: tabla simple con 10 filas */}
      {step === 1 && (
        <div className="rounded-2xl border p-4 bg-white space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 font-semibold text-sm text-gray-700">
            <div>Equipo</div><div>Marca</div><div>Modelo</div><div>Serie</div><div>Cantidad</div>
          </div>
          <div className="space-y-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <Row key={i} idx={i+1} />
            ))}
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
          <PhotoField label="Foto inventario - vista general" onChange={(v)=>setPhotos((p)=>({ ...p, general:v }))} />
          <PhotoField label="Foto equipo 1 (placa/serie)" onChange={(v)=>setPhotos((p)=>({ ...p, eq1:v }))} />
          <PhotoField label="Foto equipo 2 (placa/serie)" onChange={(v)=>setPhotos((p)=>({ ...p, eq2:v }))} />
        </div>
      )}

      <PrevNext />
    </div>
  );
}
