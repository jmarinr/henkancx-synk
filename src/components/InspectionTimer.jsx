import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

const InspectionTimer = ({ startTime }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700 py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="font-medium">Inicio: {formatDate(startTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-600" />
            <span className="text-lg font-bold text-green-600 font-mono">
              {formatTime(elapsedTime)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionTimer;
