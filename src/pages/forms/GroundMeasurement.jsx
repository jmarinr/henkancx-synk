import React, { useState } from 'react';
import Wizard from '../../components/wizard/Wizard';
import PhotoField from '../../components/PhotoField';
import BasicInfo from '../../components/BasicInfo';

export default function GroundMeasurement() {
  const [step, setStep] = useState(0);
  const [basic, setBasic] = useState({});
  const [data, setData] = useState({ field1: '', field2: '', observations: '' });
  const [photos, setPhotos] = useState({});

  const steps = [
    { key: 'basic', title: 'Datos básicos' },
    { key: 'inspection', title: 'Inspección' },
    { key: 'photos', title: 'Fotos' },
  ];

  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Medición de sistema de tierras</h1>
      <Wizard steps={steps} current={step} onGo={setStep} />

      {step === 0 && <BasicInfo onChange={setBasic} />}

      {step === 1 && (
        <div className="rounded-2xl border p-4 bg-white space-y-3">
          <div>
            <label className="block text-sm font-medium">Campo 1</label>
            <input className="w-full border rounded-xl px-3 py-2" value={data.field1} onChange={(e)=>update('field1', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Campo 2</label>
            <input className="w-full border rounded-xl px-3 py-2" value={data.field2} onChange={(e)=>update('field2', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Observaciones</label>
            <textarea className="w-full border rounded-xl px-3 py-2" rows={4} value={data.observations} onChange={(e)=>update('observations', e.target.value)} />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="rounded-2xl border p-4 bg-white space-y-3">
          <PhotoField label="Foto 1" onChange={(v)=>setPhotos(p=>({ ...p, p1: v }))} />
          <PhotoField label="Foto 2" onChange={(v)=>setPhotos(p=>({ ...p, p2: v }))} />
          <PhotoField label="Foto 3" onChange={(v)=>setPhotos(p=>({ ...p, p3: v }))} />
        </div>
      )}
    </div>
  );
}
