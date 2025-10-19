import React, { useState, useEffect } from 'react';
import { Play, Square, FileDown } from 'lucide-react';
import Header from './components/Header';
import InspectionTimer from './components/InspectionTimer';
import BasicInfoForm from './components/BasicInfoForm';
import LocationMap from './components/LocationMap';
import Camera from './components/Camera';
import EquipmentForm from './components/EquipmentForm';
import MeasurementsForm from './components/MeasurementsForm';
import TestsForm from './components/TestsForm';
import ObservationsIA from './components/ObservationsIA';
import SignaturePad from './components/SignaturePad';
import InspectionComplete from './components/InspectionComplete';
import AICopilot from './components/AICopilot';
import { downloadPDF } from './utils/pdf';

function App() {
  const [inspectionStarted, setInspectionStarted] = useState(false);
  const [inspectionStartTime, setInspectionStartTime] = useState(null);
  const [inspectionCompleted, setInspectionCompleted] = useState(false);
  
  const [basicData] = useState({
    otId: '17662',
    tecnico: 'Andrea Nava',
    cliente: 'Liberty Panamá',
    sitio: 'Ciudad de Panamá',
  });
  
  const [location, setLocation] = useState(null);
  const [photos, setPhotos] = useState([]);
  
  // Estados de formularios
  const [equipmentData, setEquipmentData] = useState({});
  const [measurementsData, setMeasurementsData] = useState({});
  const [testsData, setTestsData] = useState({});
  const [observaciones, setObservaciones] = useState('');
  const [iaResult, setIaResult] = useState(null);
  const [firma, setFirma] = useState(null);
  const [nombreCliente, setNombreCliente] = useState('');

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

  const handleStartInspection = () => {
    setInspectionStarted(true);
    setInspectionStartTime(Date.now());
  };

  const handleEquipmentChange = (e) => {
    setEquipmentData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleOCRData = (extractedData) => {
    // Actualizar equipmentData con datos extraídos del OCR
    setEquipmentData(prev => ({
      ...prev,
      ...extractedData
    }));

    // También actualizar measurementsData si hay datos relevantes
    setMeasurementsData(prev => ({
      ...prev,
      ...extractedData
    }));
  };

  const handleMeasurementsChange = (e) => {
    setMeasurementsData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleTestsChange = (e) => {
    setTestsData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCompleteInspection = () => {
    if (!observaciones.trim()) {
      alert('Las observaciones son requeridas');
      return;
    }
    if (!firma) {
      alert('La firma del cliente es requerida');
      return;
    }
    if (photos.length === 0) {
      alert('Debes capturar al menos una foto');
      return;
    }
    
    setInspectionCompleted(true);
  };

  const handleGeneratePDF = () => {
    const allData = {
      ...basicData,
      ...equipmentData,
      ...measurementsData,
      ...testsData,
      ubicacion: location,
      observaciones,
      iaResult,
      photos,
      firma,
      nombreCliente,
      horaInicio: inspectionStartTime,
      horaFin: Date.now(),
    };

    const success = downloadPDF(allData);
    if (success) {
      alert('PDF generado exitosamente');
    } else {
      alert('Error al generar PDF');
    }
  };

  const isReadyToComplete = observaciones.trim() && firma && photos.length > 0;

  if (!inspectionStarted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <BasicInfoForm formData={basicData} location={location} />
          
          <div className="mt-6 card">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold mb-4">¿Listo para iniciar?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Presiona el botón para comenzar la inspección
              </p>
              <button
                onClick={handleStartInspection}
                className="btn bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg flex items-center justify-center gap-2 mx-auto"
              >
                <Play className="w-6 h-6" />
                Iniciar Inspección
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (inspectionCompleted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <InspectionComplete />
          
          <div className="mt-6 card">
            <button
              onClick={handleGeneratePDF}
              className="btn btn-primary w-full flex items-center justify-center gap-2 text-lg py-4"
            >
              <FileDown className="w-6 h-6" />
              Descargar Informe PDF
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <InspectionTimer startTime={inspectionStartTime} />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-6">
          <LocationMap location={location} />

          <Camera
            photos={photos}
            onAddPhoto={(photo) => setPhotos([...photos, photo])}
            onRemovePhoto={(index) => setPhotos(photos.filter((_, i) => i !== index))}
            onOCRData={handleOCRData}
          />

          <EquipmentForm 
            data={equipmentData}
            onChange={handleEquipmentChange}
          />

          <MeasurementsForm
            data={measurementsData}
            onChange={handleMeasurementsChange}
          />

          <TestsForm
            data={testsData}
            onChange={handleTestsChange}
          />

          <ObservationsIA
            observaciones={observaciones}
            setObservaciones={setObservaciones}
            iaResult={iaResult}
            setIaResult={setIaResult}
          />

          <SignaturePad
            firma={firma}
            setFirma={setFirma}
            nombreCliente={nombreCliente}
            setNombreCliente={setNombreCliente}
          />

          <div className="card">
            <button
              onClick={handleCompleteInspection}
              disabled={!isReadyToComplete}
              className={`w-full flex items-center justify-center gap-2 text-lg py-4 ${
                isReadyToComplete 
                  ? 'btn bg-green-600 hover:bg-green-700 text-white'
                  : 'btn bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              <Square className="w-6 h-6" />
              Finalizar Inspección
            </button>
            
            {!isReadyToComplete && (
              <p className="mt-3 text-sm text-center text-gray-500 dark:text-gray-400">
                Completa: observaciones, fotos y firma del cliente
              </p>
            )}
          </div>
        </div>
      </main>

      <AICopilot />
    </div>
  );
}

export default App;
