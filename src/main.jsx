import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import HomeMenu from './pages/HomeMenu.jsx';
import PreventiveMaintenance from './pages/forms/PreventiveMaintenance.jsx';
import GroundMeasurement from './pages/forms/GroundMeasurement.jsx';
import TowerInfrastructure from './pages/forms/TowerInfrastructure.jsx';
import EquipmentInventory from './pages/forms/EquipmentInventory.jsx';
import SiteGeneralPM from './pages/forms/SiteGeneralPM.jsx';
import Finalize from './pages/Finalize.jsx';

import TechnicianLogin from './components/auth/TechnicianLogin.jsx';
import HeaderBar from './components/HeaderBar.jsx';

import './index.css';

// Layout global para pantallas autenticadas
function ProtectedLayout() {
  const ok = localStorage.getItem('isAuthenticated') === 'true';
  if (!ok) return <TechnicianLogin onSuccess={() => location.reload()} />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header visible en todas las páginas */}
      <HeaderBar />

      {/* Contenido dinámico */}
      <main className="flex-1 pt-4 px-2 sm:px-4">
        <Outlet />
      </main>

      {/* Footer opcional */}
      <footer className="py-3 text-center text-xs text-gray-400">
        HenkanCX Synk © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <HomeMenu /> },
      { path: 'forms/preventive-maintenance', element: <PreventiveMaintenance /> },
      { path: 'forms/ground-measure', element: <GroundMeasurement /> },
      { path: 'forms/tower-infra', element: <TowerInfrastructure /> },
      { path: 'forms/equipment-inventory', element: <EquipmentInventory /> },
      { path: 'forms/site-general-pm', element: <SiteGeneralPM /> },
      { path: 'finalize', element: <Finalize /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
