import React, { useState, useRef, useEffect } from 'react';
import { Camera as CameraIcon, Upload, X, Image } from 'lucide-react';

const Camera = ({ photos, onAddPhoto, onRemovePhoto }) => {
  const [isMobile, setIsMobile] = useState(false);
  const cameraInputRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setIsMobile(/Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      onAddPhoto(event.target.result);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <CameraIcon className="w-5 h-5" />
        Evidencia Fotográfica
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {isMobile && (
          <button
            onClick={() => cameraInputRef.current?.click()}
            className="btn btn-primary flex items-center justify-center gap-2"
          >
            <CameraIcon className="w-5 h-5" />
            Tomar Foto
          </button>
        )}
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="btn btn-secondary flex items-center justify-center gap-2"
        >
          <Upload className="w-5 h-5" />
          {isMobile ? 'Galería' : 'Subir Imagen'}
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
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <Image className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-500 dark:text-gray-400">No hay fotos capturadas</p>
        </div>
      )}
    </div>
  );
};

export default Camera;
