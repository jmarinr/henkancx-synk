import React from 'react';
import { Link } from 'react-router-dom';

const items = [
  { path: '/forms/preventive-maintenance', title: 'Mantenimiento preventivo (Generador/Baterías)' },
  { path: '/forms/ground-measure', title: 'Medición de sistema de tierras' },
  { path: '/forms/tower-infra', title: 'Infraestructura de torre' },
  { path: '/forms/equipment-inventory', title: 'Inventario de equipos' },
  { path: '/forms/site-general-pm', title: 'Mantenimiento general del sitio' },
];

export default function HomeMenu() {
  const technician = localStorage.getItem('technicianName') || 'Técnico';
  
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inspección en sitio</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-xl shadow"
        >
          Cerrar sesión
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4">Bienvenido, {technician}</p>

      <div className="grid grid-cols-1 gap-3">
        {items.map((it) => (
          <Link
            key={it.path}
            to={it.path}
            className="rounded-2xl p-4 border shadow hover:shadow-md bg-white"
          >
            <div className="text-lg font-semibold">{it.title}</div>
            <div className="text-xs text-gray-500 mt-1">Abrir formulario</div>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/finalize"
          className="inline-block rounded-2xl px-4 py-2 bg-black text-white font-semibold shadow hover:shadow-lg"
        >
          Culminar inspección y descargar PDF
        </Link>
      </div>
    </div>
  );
}
