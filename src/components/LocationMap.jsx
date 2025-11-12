import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

const LocationMap = ({ location }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!location || !window.google) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: location.latitude, lng: location.longitude },
      zoom: 16,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
    });

    new window.google.maps.Marker({
      position: { lat: location.latitude, lng: location.longitude },
      map: map,
      title: 'Ubicación Actual',
      animation: window.google.maps.Animation.DROP,
    });
  }, [location]);

  if (!location) {
    return (
      <div className="card">
        <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-gray-500">Obteniendo ubicación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5" />
        Ubicación de la Inspección
      </h2>
      <div ref={mapRef} className="w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600"></div>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 text-center">
        GPS: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
      </p>
    </div>
  );
};

export default LocationMap;
