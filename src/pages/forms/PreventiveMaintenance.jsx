import React, { useState, useEffect } from 'react';
import Wizard from '../../components/wizard/Wizard';
import PhotoField from '../../components/PhotoField';
import BasicInfo from '../../components/BasicInfo';
import FormNav from '../../components/FormNav.jsx';


export default function PreventiveMaintenance() {
  const [step, setStep] = useState(0);
  const [basic, setBasic] = useState({});
  const [data, setData] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pmData') || '{}'); }
    catch { return {}; }
  });
  const [photos, setPhotos] = useState({});

  useEffect(() => {
    localStorage.setItem('pmData', JSON.stringify(data));
  }, [data]);

  const steps = [
    { key: 'basic', title: 'Datos básicos' },
    { key: 'inspection', title: 'Inspección' },
    { key: 'photos', title: 'Fotos' },
  ];

  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Mantenimiento preventivo (Generador/Baterías)</h1>
      <Wizard steps={steps} current={step} onGo={setStep} />

      {step === 0 && (
        <BasicInfo onChange={setBasic} />
      )}

      {step === 1 && (
        <div className="rounded-2xl border p-4 bg-white space-y-3">
          <div>
            <label className="block text-sm font-medium">Generador en buen estado</label>
            <select className="w-full border rounded-xl px-3 py-2" value={data.generatorOk || ''} onChange={(e)=>update('generatorOk', e.target.value)}>
              <option value="">Selecciona…</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Baterías en buen estado</label>
            <select className="w-full border rounded-xl px-3 py-2" value={data.batteriesOk || ''} onChange={(e)=>update('batteriesOk', e.target.value)}>
              <option value="">Selecciona…</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Observaciones</label>
            <textarea className="w-full border rounded-xl px-3 py-2" rows={4} value={data.observations || ''} onChange={(e)=>update('observations', e.target.value)} />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="rounded-2xl border p-4 bg-white space-y-3">
          <PhotoField label="Foto tablero completo generador" onChange={(v)=>setPhotos(p=>({ ...p, genPanel: v }))} />
          <PhotoField label="Foto controlador" onChange={(v)=>setPhotos(p=>({ ...p, controller: v }))} />
          <PhotoField label="Foto placa de datos generador" onChange={(v)=>setPhotos(p=>({ ...p, genPlate: v }))} />
          <PhotoField label="Foto placa de motor" onChange={(v)=>setPhotos(p=>({ ...p, motorPlate: v }))} />
          <PhotoField label="Foto observaciones" onChange={(v)=>setPhotos(p=>({ ...p, observations: v }))} />
        </div>
      )}
    </div>
  );
  <FormNav step={step} setStep={setStep} totalSteps={3} onSave={()=>{
  // persistencias mínimas si hiciera falta; ya guardas pmData por useEffect
}} />

}
