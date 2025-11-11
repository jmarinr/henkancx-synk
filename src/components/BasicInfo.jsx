import React, { useEffect, useState } from 'react';

export default function BasicInfo({ onChange }) {
  const [form, setForm] = useState(() => {
    try { return JSON.parse(localStorage.getItem('basicInfo') || '{}'); }
    catch { return {}; }
  });
  const [geoStatus, setGeoStatus] = useState('');

  // Autopopular coordenadas si el navegador lo permite
  useEffect(() => {
    if (!form.coords && 'geolocation' in navigator) {
      setGeoStatus('Obteniendo ubicación…');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const coords = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          update('coords', coords);
          setGeoStatus('Ubicación capturada');
        },
        (err) => {
          setGeoStatus(`Ubicación no disponible (${err.code})`);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (k, v) => {
    const next = { ...form, [k]: v };
    setForm(next);
    localStorage.setItem('basicInfo', JSON.stringify(next));
    onChange && onChange(next);
  };

  return (
    <div className="rounded-2xl border p-4 bg-white space-y-4">
      <h2 className="font-semibold text-lg">Información básica</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium">Nombre del Sitio</label>
          <input className="w-full border rounded-xl px-3 py-2" value={form.siteName || ''} onChange={(e)=>update('siteName', e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium">Número ID del Sitio</label>
          <input className="w-full border rounded-xl px-3 py-2" value={form.siteId || ''} onChange={(e)=>update('siteId', e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium">Fecha Programada</label>
          <input type="date" className="w-full border rounded-xl px-3 py-2" value={form.scheduledDate || ''} onChange={(e)=>update('scheduledDate', e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium">Fecha y Hora Ejecutada</label>
          <input type="datetime-local" className="w-full border rounded-xl px-3 py-2" value={form.executedDateTime || ''} onChange={(e)=>update('executedDateTime', e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium">Coordenadas tomadas en sitio</label>
          <input className="w-full border rounded-xl px-3 py-2" value={form.coords || ''} onChange={(e)=>update('coords', e.target.value)} placeholder="lat, lon" />
          {geoStatus && <p className="text-xs text-gray-500 mt-1">{geoStatus}</p>}
        </div>
        <div>
          <label className="text-sm font-medium">Ingeniero responsable</label>
          <input className="w-full border rounded-xl px-3 py-2" value={form.engineer || ''} onChange={(e)=>update('engineer', e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium"># Orden de Trabajo (OT)</label>
          <input className="w-full border rounded-xl px-3 py-2" value={form.workOrder || ''} onChange={(e)=>update('workOrder', e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium">Proveedor o Empresa</label>
          <input className="w-full border rounded-xl px-3 py-2" value={form.provider || ''} onChange={(e)=>update('provider', e.target.value)} />
        </div>
      </div>

      <h3 className="font-semibold">Datos del vehículo</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="text-sm font-medium">Marca</label>
          <input className="w-full border rounded-xl px-3 py-2" value={form.vehicleMake || ''} onChange={(e)=>update('vehicleMake', e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium">Modelo</label>
          <input className="w-full border rounded-xl px-3 py-2" value={form.vehicleModel || ''} onChange={(e)=>update('vehicleModel', e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium">Placa</label>
          <input className="w-full border rounded-xl px-3 py-2" value={form.vehiclePlate || ''} onChange={(e)=>update('vehiclePlate', e.target.value)} />
        </div>
      </div>
    </div>
  );
}
