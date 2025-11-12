import { useState, useCallback } from 'react';

export const useSpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  const startListening = useCallback((onResult, lang = 'es-ES') => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.');
      alert('⚠️ Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge en un dispositivo móvil.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Error de reconocimiento:', event.error);
      if (event.error === 'no-speech') {
        setError('No se detectó voz. Intenta de nuevo.');
      } else if (event.error === 'not-allowed') {
        setError('Permiso de micrófono denegado.');
        alert('❌ Necesitas dar permiso al micrófono en tu navegador.');
      } else {
        setError(`Error: ${event.error}`);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (err) {
      console.error('Error iniciando reconocimiento:', err);
      setIsListening(false);
    }
  }, []);

  return { startListening, isListening, error };
};
