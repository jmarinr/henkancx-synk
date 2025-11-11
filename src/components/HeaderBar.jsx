import React from 'react';

export default function HeaderBar() {
  const tech = localStorage.getItem('technicianName') || 'Técnico';

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          <span className="font-semibold">HenkanCX Synk</span>
          <span className="mx-2">•</span>
          <span>Bienvenido, {tech}</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-xl shadow"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
