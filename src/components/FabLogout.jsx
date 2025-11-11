import React from 'react';

export default function FabLogout() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  return (
    <button
      onClick={handleLogout}
      title="Cerrar sesión"
      className="fixed bottom-4 right-4 z-[60] px-3 py-2 rounded-full bg-red-600 text-white shadow-lg"
    >
      Cerrar sesión
    </button>
  );
}
