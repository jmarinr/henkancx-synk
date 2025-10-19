import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useSpeechToText } from '../hooks/useSpeechToText';

const VoiceInput = ({ 
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  className = 'input-field',
  label,
  disabled = false
}) => {
  const { startListening, isListening } = useSpeechToText();

  const handleVoice = () => {
    startListening((transcript) => {
      onChange({
        target: {
          name: name,
          value: type === 'number' ? transcript.replace(/\D/g, '') : transcript
        }
      });
    });
  };

  return (
    <div>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <div className="flex gap-2">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
          disabled={disabled}
        />
        <button
          type="button"
          onClick={handleVoice}
          disabled={isListening || disabled}
          className={`btn p-2 flex-shrink-0 ${
            isListening 
              ? 'bg-red-600 text-white animate-pulse' 
              : 'btn-secondary'
          }`}
          title="Usar voz"
        >
          {isListening ? (
            <MicOff className="w-5 h-5" />
          ) : (
            <Mic className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default VoiceInput;
