import React, { useState, useRef } from 'react';
import { FileText, Mic, MicOff, Sparkles, AlertTriangle, Wrench, CheckCircle } from 'lucide-react';

const ObservationsIA = ({ observaciones, setObservaciones, iaResult, setIaResult, allFormData }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const timerRef = useRef(null);
  const recognitionRef = useRef(null);

  const analyzeObservations = (text, formData) => {
    const analysis = {
      reemplazos: [],
      alarmas: [],
      revisiones: [],
      estado: 'normal'
    };

    const textLower = text.toLowerCase();

    // Detectar problemas de voltaje
    if (formData.voltajeL1N && (parseInt(formData.voltajeL1N) < 89 || parseInt(formData.voltajeL1N) > 131)) {
      analysis.alarmas.push('Voltaje L1-N fuera de rango (110V ±21V)');
      analysis.estado = 'critico';
    }

    // Detectar temperatura alta
    if (formData.temperatura && parseInt(formData.temperatura) > 95) {
      analysis.alarmas.push('Temperatura elevada (>95°C) - Revisar sistema de enfriamiento');
      analysis.estado = 'critico';
    }

    // Detectar presión de aceite baja
    if (formData.presionAceite && parseInt(formData.presionAceite) < 40) {
      analysis.alarmas.push('Presión de aceite baja (<40 PSI) - Revisar nivel y bomba');
      analysis.estado = 'critico';
    }

    // Detectar problemas de batería
    if (formData.voltageBatSinCargador && parseFloat(formData.voltageBatSinCargador) < 12.4) {
      analysis.reemplazos.push('Batería débil - Considerar reemplazo');
      analysis.estado = analysis.estado === 'critico' ? 'critico' : 'atencion';
    }

    // Análisis de texto de observaciones
    const keywords = {
      reemplazos: ['reemplazar', 'cambiar', 'desgastado', 'roto', 'dañado', 'deteriorado', 'viejo', 'oxidado'],
      alarmas: ['falla', 'fallo', 'no funciona', 'error', 'alarma', 'apagado', 'problema', 'crítico'],
      revisiones: ['revisar', 'verificar', 'inspeccionar', 'ruido', 'vibración', 'fuga', 'goteo', 'suelto']
    };

    keywords.reemplazos.forEach(word => {
      if (textLower.includes(word)) {
        const start = textLower.indexOf(word);
        const snippet = text.substring(Math.max(0, start - 10), Math.min(text.length, start + 60));
        analysis.reemplazos.push(`Detectado: "${snippet.trim()}"`);
        analysis.estado = analysis.estado === 'critico' ? 'critico' : 'atencion';
      }
    });

    keywords.alarmas.forEach(word => {
      if (textLower.includes(word)) {
        const start = textLower.indexOf(word);
        const snippet = text.substring(Math.max(0, start - 10), Math.min(text.length, start + 60));
        analysis.alarmas.push(`Problema: "${snippet.trim()}"`);
        analysis.estado = 'critico';
      }
    });

    keywords.revisiones.forEach(word => {
      if (textLower.includes(word)) {
        const start = textLower.indexOf(word);
        const snippet = text.substring(Math.max(0, start - 10), Math.min(text.length, start + 60));
        analysis.revisiones.push(`"${snippet.trim()}"`);
      }
    });

    // Detectar filtros por hodómetro
    if (formData.hodometro) {
      const horas = parseInt(formData.hodometro);
      if (horas % 250 < 50 && horas % 250 > 0) {
        analysis.revisiones.push('Próximo cambio de filtro de aceite (cada 250 hrs)');
      }
      if (horas % 500 < 100 && horas % 500 > 0) {
        analysis.revisiones.push('Próximo cambio de filtro de aire y combustible (cada 500 hrs)');
      }
    }

    return analysis;
  };

  const handleAnalyze = () => {
    if (!observaciones.trim()) {
      alert('Escribe o graba observaciones primero');
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      const analysis = analyzeObservations(observaciones, allFormData || {});
      setIaResult(analysis);
      setIsAnalyzing(false);
    }, 1000);
  };

  const startVoiceRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'es-ES';
    recognition.continuous = true;
    recognition.interimResults = true;

    let finalTranscript = observaciones;

    recognition.onstart = () => {
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 30) {
            stopVoiceRecording();
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }
      setObservaciones(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Error reconocimiento:', event.error);
      stopVoiceRecording();
    };

    recognition.onend = () => {
      if (isRecording) {
        stopVoiceRecording();
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
    setRecordingTime(0);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'critico': return 'text-red-600 dark:text-red-400';
      case 'atencion': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-green-600 dark:text-green-400';
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'critico': return <AlertTriangle className="w-5 h-5" />;
      case 'atencion': return <Wrench className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Observaciones del Servicio <span className="text-red-600">*</span>
      </h2>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Describe las condiciones generales del equipo. Puedes escribir o grabar hasta 30 segundos de audio. 
        La IA analizará automáticamente para detectar problemas, reemplazos necesarios y revisiones pendientes.
      </p>

      <div className="mb-4">
        <textarea
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          placeholder="Ej: El generador presenta vibración excesiva en el motor. Se observa fuga leve de aceite en el sello. Los cables están en buen estado. Batería con voltaje bajo, requiere reemplazo..."
          className="input-field min-h-32"
          rows={6}
        />
      </div>

      <div className="flex gap-3 mb-4">
        <button
          type="button"
          onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
          className={`flex-1 btn flex items-center justify-center gap-2 ${
            isRecording
              ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
              : 'btn-secondary'
          }`}
        >
          {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          {isRecording ? `Grabando... ${recordingTime}s / 30s` : 'Grabar Audio (30s max)'}
        </button>

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={!observaciones.trim() || isAnalyzing}
          className="flex-1 btn bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Sparkles className={`w-5 h-5 ${isAnalyzing ? 'animate-spin' : ''}`} />
          {isAnalyzing ? 'Analizando...' : 'Analizar con IA'}
        </button>
      </div>

      {iaResult && (
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border-2 border-purple-200 dark:border-purple-700">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-lg">Análisis Inteligente</h3>
          </div>

          <div className={`flex items-center gap-2 mb-4 font-semibold ${getEstadoColor(iaResult.estado)}`}>
            {getEstadoIcon(iaResult.estado)}
            <span>
              Estado: {iaResult.estado === 'critico' ? 'Crítico' : iaResult.estado === 'atencion' ? 'Requiere Atención' : 'Normal'}
            </span>
          </div>

          {iaResult.alarmas?.length > 0 && (
            <div className="mb-3">
              <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Alarmas y Problemas Críticos:
              </h4>
              <ul className="list-disc list-inside space-y-1">
                {iaResult.alarmas.map((item, idx) => (
                  <li key={idx} className="text-sm text-red-600 dark:text-red-400">{item}</li>
                ))}
              </ul>
            </div>
          )}

          {iaResult.reemplazos?.length > 0 && (
            <div className="mb-3">
              <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2 flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Reemplazos Necesarios:
              </h4>
              <ul className="list-disc list-inside space-y-1">
                {iaResult.reemplazos.map((item, idx) => (
                  <li key={idx} className="text-sm text-yellow-600 dark:text-yellow-400">{item}</li>
                ))}
              </ul>
            </div>
          )}

          {iaResult.revisiones?.length > 0 && (
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Revisiones Recomendadas:
              </h4>
              <ul className="list-disc list-inside space-y-1">
                {iaResult.revisiones.map((item, idx) => (
                  <li key={idx} className="text-sm text-blue-600 dark:text-blue-400">{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {!observaciones.trim() && (
        <p className="mt-2 text-sm text-red-600">
          * Las observaciones son obligatorias para finalizar la inspección
        </p>
      )}
    </div>
  );
};

export default ObservationsIA;
