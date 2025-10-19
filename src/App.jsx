import React, { useState, useEffect } from 'react';
import { FileDown, CheckCircle } from 'lucide-react';
import Header from './components/Header';
import BasicInfoForm from './components/BasicInfoForm';
import Camera from './components/Camera';
import ObservationsIA from './components/ObservationsIA';
import SignaturePad from './components/SignaturePad';
import { downloadPDF } from './utils/pdf';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    otId: '',
    sitio: '',
    cliente: '',
    tecnico: '',
  });
  const [location, setLocation] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [observaciones, setObservaciones] = useState('');
  const [iaResult, setIaResult] = useState(null);
  const [firma, setFirma] = useState(null);
  const [nombreCliente, setNombreCliente] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.error('GPS error:', error)
    );
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGeneratePDF = () => {
    if (!formData.otId || !formData.tecnico) {
      alert('OT ID y Técnico son requeridos');
      return;
    }

    const pdfData = {
      ...formData,
      ubicacion: location,
      observaciones,
      iaResult,
      photos,
      firma,
      nombreCliente,
    };

    const success = downloadPDF(pdfData);
    if (success) {
      alert('PDF generado exitosamente');
    } else {
      alert('Error al generar PDF');
    }
  };

  const isComplete = formData.otId && formData.tecnico && observaciones && firma;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-6">
          <BasicInfoForm
            formData={formData}
            onChange={handleChange}
            location={location}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Camera
              photos={photos}
              onAddPhoto={(photo) => setPhotos([...photos, photo])}
              onRemovePhoto={(index) => setPhotos(photos.filter((_, i) => i !== index))}
            />

            <ObservationsIA
              observaciones={observaciones}
              setObservaciones={setObservaciones}
              iaResult={iaResult}
              setIaResult={setIaResult}
            />
          </div>

          <SignaturePad
            firma={firma}
            setFirma={setFirma}
            nombreCliente={nombreCliente}
            setNombreCliente={setNombreCliente}
          />

          <div className="card">
            {isComplete && (
              <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2 text-green-800 dark:text-green-300">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Orden completa y lista para generar PDF</span>
              </div>
            )}

            <button
              onClick={handleGeneratePDF}
              className="btn btn-primary w-full flex items-center justify-center gap-2 text-lg py-4"
            >
              <FileDown className="w-6 h-6" />
              Generar PDF
            </button>
          </div>
        </div>
      </main>

      <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>HenkanCX Synk - MVP © 2025</p>
      </footer>
    </div>
  );
}

export default App;
