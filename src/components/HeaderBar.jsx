import React from 'react';

export default function HeaderBar() {
  const tech = localStorage.getItem('technicianName') || 'Técnico';

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-sm text-black flex items-center gap-2">
          <span className="font-bold text-lg">HenkanCX Synk</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-700">Bienvenido, {tech}</span>
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
