import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, MicOff, Sparkles } from 'lucide-react';
import { useSpeechToText } from '../hooks/useSpeechToText';

const AICopilot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '¡Hola! Soy tu asistente de inspección. Puedo ayudarte con procedimientos, dudas técnicas o cualquier pregunta sobre el mantenimiento del generador. ¿En qué puedo ayudarte?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { startListening, isListening } = useSpeechToText();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const knowledgeBase = {
    'hodómetro': 'El hodómetro registra las horas de operación del generador. Es importante para determinar los intervalos de mantenimiento preventivo.',
    'voltaje': 'Verifica que el voltaje esté dentro del rango normal: L1-N y L2-N deben estar en 110V ±21V, y L1-L2 en 220V ±42V.',
    'presión aceite': 'La presión de aceite normal debe estar entre 40-80 PSI cuando el motor está en operación.',
    'temperatura': 'La temperatura de operación normal del motor está entre 80-95°C. Si supera los 100°C, verifica el sistema de enfriamiento.',
    'batería': 'Verifica el voltaje de la batería: Con cargador debe estar en 13.5-14.5V, y sin cargador en 12.4-12.8V.',
    'arranque': 'Para probar el arranque: 1) Verifica nivel de combustible, 2) Comprueba batería, 3) Prueba arranque manual, 4) Prueba arranque automático.',
    'filtros': 'Los filtros deben cambiarse según las horas de operación: Aceite cada 250hrs, Aire cada 500hrs, Combustible cada 500hrs.',
    'frecuencia': 'La frecuencia debe mantenerse en 60Hz ±0.5Hz para equipos en Panamá y Centroamérica.',
    'ats': 'El ATS (Automatic Transfer Switch) debe cambiar automáticamente entre red comercial y generador en 10-15 segundos.',
    'alarmas': 'Verifica todas las alarmas del C.N.O.: Fallo de red, Generador operando, Fallo de generador, Bajo combustible.',
  };

  const getAIResponse = (userMessage) => {
    const messageLower = userMessage.toLowerCase();
    
    // Buscar en knowledge base
    for (const [key, response] of Object.entries(knowledgeBase)) {
      if (messageLower.includes(key)) {
        return response;
      }
    }

    // Respuestas contextuales
    if (messageLower.includes('cómo') || messageLower.includes('como')) {
      if (messageLower.includes('medir')) {
        return 'Para medir correctamente: 1) Asegúrate de que el generador esté en operación estable, 2) Usa multímetro calibrado, 3) Anota todas las lecturas en el formulario, 4) Compara con valores normales.';
      }
      if (messageLower.includes('foto') || messageLower.includes('imagen')) {
        return 'Para mejores resultados con OCR: 1) Enfoca claramente el tablero o placa, 2) Asegura buena iluminación, 3) Captura el texto de forma horizontal, 4) Evita reflejos.';
      }
    }

    if (messageLower.includes('problema') || messageLower.includes('falla')) {
      return 'Si detectas un problema: 1) Documéntalo en Observaciones, 2) Toma fotos claras, 3) Anota los valores anormales, 4) Si es crítico, contacta al supervisor inmediatamente.';
    }

    if (messageLower.includes('completar') || messageLower.includes('terminar') || messageLower.includes('finalizar')) {
      return 'Para completar la inspección necesitas: 1) Al menos una foto, 2) Observaciones técnicas, 3) Firma del cliente. Luego presiona "Finalizar Inspección".';
    }

    // Respuesta por defecto
    return 'Puedo ayudarte con: mediciones de voltaje, presión de aceite, temperatura, batería, arranque, filtros, ATS, alarmas, y procedimientos generales. ¿Sobre qué necesitas información?';
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    // Simular delay de IA
    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      setIsLoading(false);
    }, 500);
  };

  const handleVoice = () => {
    startListening((transcript) => {
      setInput(transcript);
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Botón flotante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40 animate-bounce"
        >
          <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
          <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-96 h-[calc(100vh-2rem)] sm:h-[600px] bg-gray-900 rounded-2xl shadow-2xl flex flex-col z-50 border-2 border-purple-500">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 sm:p-4 rounded-t-2xl flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base">Copiloto IA</h3>
                <p className="text-xs text-purple-100 hidden sm:block">Asistente de Inspección</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-900">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2 sm:px-4 ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none'
                      : 'bg-gray-800 text-gray-100 rounded-bl-none'
                  }`}
                >
                  <p className="text-xs sm:text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-2xl rounded-bl-none px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-gray-700 bg-gray-900 flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Pregunta..."
                className="flex-1 px-3 py-2 sm:px-4 text-sm sm:text-base rounded-lg bg-gray-800 text-white border-2 border-gray-700 focus:border-purple-500 focus:outline-none placeholder-gray-400"
              />
              <button
                onClick={handleVoice}
                disabled={isListening}
                className={`p-2 rounded-lg flex-shrink-0 ${
                  isListening
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-2 border-gray-700'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Mic className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AICopilot;
