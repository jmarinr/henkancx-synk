import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomeMenu from './pages/HomeMenu.jsx';
import PreventiveMaintenance from './pages/forms/PreventiveMaintenance.jsx';
import GroundMeasurement from './pages/forms/GroundMeasurement.jsx';
import TowerInfrastructure from './pages/forms/TowerInfrastructure.jsx';
import EquipmentInventory from './pages/forms/EquipmentInventory.jsx';
import SiteGeneralPM from './pages/forms/SiteGeneralPM.jsx';
import Finalize from './pages/Finalize.jsx';
import TechnicianLogin from './components/auth/TechnicianLogin.jsx';

import './index.css';

// Ruta protegida por login de técnico (PIN)
const Protected = ({ children }) => {
  const ok = localStorage.getItem('isAuthenticated') === 'true';
  return ok ? children : <TechnicianLogin onSuccess={() => location.reload()} />;
};

const router = createBrowserRouter([
  { path: '/', element: <Protected><HomeMenu /></Protected> },
  { path: '/forms/preventive-maintenance', element: <Protected><PreventiveMaintenance /></Protected> },
  { path: '/forms/ground-measure', element: <Protected><GroundMeasurement /></Protected> },
  { path: '/forms/tower-infra', element: <Protected><TowerInfrastructure /></Protected> },
  { path: '/forms/equipment-inventory', element: <Protected><EquipmentInventory /></Protected> },
  { path: '/forms/site-general-pm', element: <Protected><SiteGeneralPM /></Protected> },
  { path: '/finalize', element: <Protected><Finalize /></Protected> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
