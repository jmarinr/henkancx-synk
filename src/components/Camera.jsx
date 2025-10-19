import React, { useState, useRef, useEffect } from 'react';
import { Camera as CameraIcon, Upload, X, Image, Scan, Loader } from 'lucide-react';
import Tesseract from 'tesseract.js';

const Camera = ({ photos, onAddPhoto, onRemovePhoto, onOCRData }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraInputRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setIsMobile(/Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  const extractDataFromText = (text) => {
    const data = {};
    
    // Extraer hodómetro
    const hodoMatch = text.match(/(\d{4})\s*(?:hr|hrs|hours|horas)/i);
    if (hodoMatch) data.hodometro = hodoMatch[1];
    
    // Extraer números de serie
    const serieMatch = text.match(/(?:serie|serial|s\/n|#)\s*:?\s*([A-Z0-9-]+)/i);
    if (serieMatch) data.nSeriePlanta = serieMatch[1];
    
    // Extraer modelo
    const modeloMatch = text.match(/(?:model|modelo)\s*:?\s*([A-Z0-9-]+)/i);
    if (modeloMatch) data.modeloPlanta = modeloMatch[1];
    
    // Extraer capacidad KW
    const kwMatch = text.match(/(\d+)\s*kw/i);
    if (kwMatch) data.capacidadKW = kwMatch[1];
    
    // Extraer voltaje
    const voltMatch = text.match(/(\d+)\s*v/i);
    if (voltMatch) data.voltajeGeneral = voltMatch[1];
    
    // Extraer temperatura
    const tempMatch = text.match(/(\d+)\s*[°c°f]/i);
    if (tempMatch) data.temperatura = tempMatch[1];
    
    // Extraer presión
    const psiMatch = text.match(/(\d+)\s*psi/i);
    if (psiMatch) data.presionAceite = psiMatch[1];
    
    // Extraer frecuencia
    const hzMatch = text.match(/(\d+)\s*hz/i);
    if (hzMatch) data.frecuencia = hzMatch[1];

    return data;
  };

  const processImageWithOCR = async (imageData) => {
    setIsProcessing(true);
    try {
      const { data: { text } } = await Tesseract.recognize(imageData, 'eng+spa', {
        logger: m => console.log(m)
      });
      
      console.log('Texto extraído:', text);
      const extractedData = extractDataFromText(text);
      
      if (Object.keys(extractedData).length > 0) {
        onOCRData(extractedData);
        alert(`✅ Se extrajeron ${Object.keys(extractedData).length} datos automáticamente!`);
      } else {
        alert('ℹ️ No se detectaron datos conocidos en la imagen');
      }
    } catch (error) {
      console.error('Error OCR:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageData = event.target.result;
      onAddPhoto(imageData);
      
      // Procesar con OCR automáticamente
      await processImageWithOCR(imageData);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <CameraIcon className="w-5 h-5" />
        Evidencia Fotográfica con OCR
      </h2>

      {isProcessing && (
        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center gap-3">
          <Loader className="w-5 h-5 text-blue-600 animate-spin" />
          <div>
            <p className="font-semibold text-blue-900 dark:text-blue-100">Extrayendo datos con IA...</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">Analizando texto en la imagen</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {isMobile && (
          <button
            onClick={() => cameraInputRef.current?.click()}
            disabled={isProcessing}
            className="btn btn-primary flex items-center justify-center gap-2"
          >
            <CameraIcon className="w-5 h-5" />
            Tomar Foto con OCR
          </button>
        )}
        
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="btn btn-secondary flex items-center justify-center gap-2"
        >
          <Upload className="w-5 h-5" />
          {isMobile ? 'Galería + OCR' : 'Subir + OCR'}
        </button>

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      <div className="mb-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
        <div className="flex items-start gap-2">
          <Scan className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-semibold text-green-900 dark:text-green-100">OCR Inteligente Activado</p>
            <p className="text-green-700 dark:text-green-300">Captura fotos del tablero de control o placas del generador. La IA extraerá automáticamente hodómetro, serie, modelo, voltajes, temperatura, etc.</p>
          </div>
        </div>
      </div>

      {photos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {photos.map((photo, index) => (
            <div key={index} className="relative group">
              <img
                src={photo}
                alt={`Foto ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600"
              />
              <button
                onClick={() => onRemovePhoto(index)}
                className="absolute top-2 right-2 p-1.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 rounded text-xs text-white">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <Image className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Captura fotos para análisis automático</p>
        </div>
      )}
    </div>
  );
};

export default Camera;
