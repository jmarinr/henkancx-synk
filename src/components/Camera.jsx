import React, { useState, useRef, useEffect } from 'react';
import { Camera as CameraIcon, Upload, X, Image, Scan, Loader } from 'lucide-react';
import Tesseract from 'tesseract.js';
import OCRConfirmModal from './OCRConfirmModal';

const Camera = ({ photos, onAddPhoto, onRemovePhoto, onOCRData }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrModalOpen, setOcrModalOpen] = useState(false);
  const [pendingOCRData, setPendingOCRData] = useState({});
  const cameraInputRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setIsMobile(/Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  const extractDataFromText = (text) => {
    const data = {};
    const textLower = text.toLowerCase();
    
    // Extraer hodómetro - buscar patrones como "1324 hr", "1324hrs", "1324 horas"
    const hodoMatch = text.match(/(\d{3,5})\s*(?:hr|hrs|hours|horas)/i);
    if (hodoMatch) data.hodometro = hodoMatch[1];
    
    // Extraer números de serie - buscar "S/N:", "Serie:", "Serial:"
    const serieMatches = text.matchAll(/(?:serie|serial|s\/n|sn)\s*:?\s*([A-Z0-9-]+)/gi);
    let serieCount = 0;
    for (const match of serieMatches) {
      if (serieCount === 0) data.nSeriePlanta = match[1];
      if (serieCount === 1) data.nSerieMotor = match[1];
      serieCount++;
    }
    
    // Extraer modelo - buscar "Model:", "Modelo:"
    const modeloMatch = text.match(/(?:model|modelo)\s*:?\s*([A-Z0-9-]+)/i);
    if (modeloMatch) data.modeloPlanta = modeloMatch[1];
    
    // Extraer marcas conocidas
    const marcasGenerador = ['himoinsa', 'cummins', 'caterpillar', 'perkins', 'kohler', 'generac'];
    const marcasMotor = ['yanmar', 'perkins', 'cummins', 'deutz', 'kubota'];
    
    marcasGenerador.forEach(marca => {
      if (textLower.includes(marca)) {
        data.marcaPlanta = marca.charAt(0).toUpperCase() + marca.slice(1);
      }
    });
    
    marcasMotor.forEach(marca => {
      if (textLower.includes(marca)) {
        data.marcaMotor = marca.charAt(0).toUpperCase() + marca.slice(1);
      }
    });
    
    // Extraer capacidad KW
    const kwMatch = text.match(/(\d+)\s*kw/i);
    if (kwMatch) data.capacidadKW = kwMatch[1];
    
    // Extraer voltajes - buscar patrones como "220V", "110 V"
    const voltMatches = text.matchAll(/(\d{2,3})\s*v(?:olts?)?/gi);
    const voltages = Array.from(voltMatches).map(m => m[1]);
    if (voltages.length > 0) {
      // Asignar el voltaje más alto a L1-L2
      const maxVolt = Math.max(...voltages.map(v => parseInt(v)));
      if (maxVolt > 150) data.voltajeL1L2 = maxVolt.toString();
      if (maxVolt <= 150) data.voltajeL1N = maxVolt.toString();
    }
    
    // Extraer temperatura - buscar "38°C", "100 F"
    const tempMatch = text.match(/(\d+)\s*[°º]\s*[cf]/i);
    if (tempMatch) data.temperatura = tempMatch[1];
    
    // Extraer presión - buscar "74 PSI"
    const psiMatch = text.match(/(\d+)\s*psi/i);
    if (psiMatch) data.presionAceite = psiMatch[1];
    
    // Extraer frecuencia - buscar "60 Hz", "60Hz"
    const hzMatch = text.match(/(\d+)\s*hz/i);
    if (hzMatch) data.frecuencia = hzMatch[1];

    // Extraer amperaje - buscar "67 Amp", "67A"
    const ampMatch = text.match(/(\d+)\s*a(?:mp)?(?:s|eres)?/i);
    if (ampMatch) data.capacidadAmp = ampMatch[1];

    return data;
  };

  const processImageWithOCR = async (imageData) => {
    setIsProcessing(true);
    try {
      const { data: { text } } = await Tesseract.recognize(imageData, 'eng+spa', {
        logger: m => {
          if (m.status === 'recognizing text') {
            console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
          }
        }
      });
      
      console.log('Texto OCR completo:', text);
      const extractedData = extractDataFromText(text);
      
      // Solo mostrar modal DESPUÉS de terminar el procesamiento
      setIsProcessing(false);
      
      // Pequeño delay para evitar parpadeo
      setTimeout(() => {
        setPendingOCRData(extractedData);
        setOcrModalOpen(true);
      }, 100);
      
    } catch (error) {
      console.error('Error OCR:', error);
      setIsProcessing(false);
      alert('❌ Error al procesar la imagen. Intenta de nuevo.');
    }
  };

  const handleConfirmOCR = (data) => {
    onOCRData(data);
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
    <>
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

        <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl border-2 border-blue-300 dark:border-blue-700">
          <div className="flex items-start gap-3">
            <Scan className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-bold text-blue-900 dark:text-blue-100 text-base mb-1">
                ✨ Extracción Automática de Datos con IA
              </p>
              <p className="text-blue-800 dark:text-blue-200">
                Al cargar cada foto, el sistema OCR intentará extraer automáticamente datos como: hodómetro, números de serie, modelos, marcas, voltajes, temperatura, presión, frecuencia y más.
              </p>
              <p className="text-blue-700 dark:text-blue-300 mt-2 font-semibold">
                📸 Tip: Captura fotos claras de placas de identificación y tableros de control para mejores resultados.
              </p>
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

      <OCRConfirmModal
        isOpen={ocrModalOpen}
        onClose={() => setOcrModalOpen(false)}
        extractedData={pendingOCRData}
        onConfirm={handleConfirmOCR}
      />
    </>
  );
};

export default Camera;
