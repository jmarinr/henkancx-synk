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
  const tech = localStorage.getItem('technicianName') || 'Técnico';

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Header inline por si el global no se ve por caché */}
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="text-sm text-black">
          <span className="font-semibold">HenkanCX Synk</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-700">Bienvenido, {tech}</span>
        </div>
        <button
          onClick={handleLogout}
          classNa
