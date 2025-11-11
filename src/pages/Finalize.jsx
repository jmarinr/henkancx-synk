import React, { useMemo } from 'react';
import { generateInspectionPDF } from '../utils/pdf.js';

export default function Finalize() {
  // Lee estados guardados para mostrar un mini resumen
  const basic = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('basicInfo') || '{}'); }
    catch { return {}; }
  }, []);
  const pm = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('pmData') || '{}'); }
    catch { return {}; }
  }, []);
  const ground = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('groundData') || '{}'); }
    catch { return {}; }
  }, []);
  const tower = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('towerData') || '{}'); }
    catch { return {}; }
  }, []);
  const inv = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('inventoryData') || '{}'); }
    catch { return {}; }
  }, []);
  const sitepm = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('sitepmData') || '{}'); }
    catch { return {}; }
  }, []);

  const handlePDF = async () => {
    try {
      await generateInspectionPDF();
    } catch (e) {
      alert('No se pudo generar el PDF. Revisa la consola.');
      console.error(e);
    }
  };

  const Item = ({ label, value }) => (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-sm font-medium">{value || '—'}</div>
    </div>
  );

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Culminar inspección</h1>
      <p className="text-sm text-gray-600 text-center">
        Verifica la información y genera el reporte en PDF.
      </p>

      {/* Resumen: Datos básicos */}
      <div className="rounded-2xl border p-4 bg-white space-y-2">
        <h2 className="font-semibold">Datos del sitio</h2>
        <Item label="Sitio" value={basic.siteName} />
        <Item label="ID del sitio" value={basic.siteId} />
        <Item label="Fecha programada" value={basic.scheduledDate} />
        <Item label="Ejecutada" value={basic.executedDateTime} />
        <Item label="Coordenadas" value={basic.coords} />
        <Item label="Ingeniero responsable" value={basic.engineer} />
        <Item label="# OT" value={basic.workOrder} />
        <Item label="Proveedor/Empresa" value={basic.provider} />
        <Item label="Vehículo" value={
          [basic.vehicleMake, basic.vehicleModel].filter(Boolean).join(' ') +
          (basic.vehiclePlate ? ` (${basic.vehiclePlate})` : '')
        } />
      </div>

      {/* Resumen muy breve por formulario */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border p-4 bg-white space-y-2">
          <h3 className="font-semibold">Mantenimiento preventivo</h3>
          <Item label="Generador OK" value={pm.generatorOk} />
          <Item label="Baterías OK" value={pm.batteriesOk} />
          <Item label="Aceite OK" value={pm.oilLevelOk} />
          <Item label="Refrigerante OK" value={pm.coolantLevelOk} />
        </div>

        <div className="rounded-2xl border p-4 bg-white space-y-2">
          <h3 className="font-semibold">Sistema de tierras</h3>
          <Item label="Ω puesta a tierra" value={ground.earthingOhms} />
          <Item label="Método" value={ground.method} />
        </div>

        <div className="rounded-2xl border p-4 bg-white space-y-2">
          <h3 className="font-semibold">Infraestructura de torre</h3>
          <Item label="Torre" value={tower.towerStatus} />
          <Item label="Accesos" value={tower.accessStatus} />
        </div>

        <div className="rounded-2xl border p-4 bg-white space-y-2">
          <h3 className="font-semibold">Inventario (muestra)</h3>
          <Item label="Observaciones" value={inv.observations} />
        </div>

        <div className="rounded-2xl border p-4 bg-white space-y-2 md:col-span-2">
          <h3 className="font-semibold">Mantenimiento general del sitio</h3>
          <Item label="Perímetro" value={sitepm.fenceStatus} />
          <Item label="Accesos" value={sitepm.roadStatus} />
          <Item label="Limpieza" value={sitepm.cleanliness} />
          <Item label="Señalización" value={sitepm.signage} />
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handlePDF}
          className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 bg-black text-white font-semibold shadow hover:shadow-lg"
        >
          Generar PDF
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center">
        Nota: El PDF actual incluye datos del sitio y un resumen. Podemos extenderlo con tablas detalladas, fotos y firmas.
      </p>
    </div>
  );
}
