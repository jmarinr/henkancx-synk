import React from 'react';
import { Cpu, Mic, Eye } from 'lucide-react';

const EquipmentForm = ({ data, onChange, onVoiceInput, onOCR }) => {
  const handleVoice = (field) => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Tu navegador no soporta reconocimiento de voz');
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onChange({ target: { name: field, value: transcript } });
    };

    recognition.start();
  };

  return (
    <div className="space-y-6">
      {/* DATOS DEL GENERADOR */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5" />
          Datos del Generador
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Hodómetro</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="hodometro"
                value={data.hodometro || ''}
                onChange={onChange}
                className="input-field"
                placeholder="1324"
              />
              <button
                type="button"
                onClick={() => handleVoice('hodometro')}
                className="btn btn-secondary p-2"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Marca Planta</label>
            <input
              type="text"
              name="marcaPlanta"
              value={data.marcaPlanta || ''}
              onChange={onChange}
              className="input-field"
              placeholder="Himoinsa"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Modelo Planta</label>
            <input
              type="text"
              name="modeloPlanta"
              value={data.modeloPlanta || ''}
              onChange={onChange}
              className="input-field"
              placeholder="HYW20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Marca Motor</label>
            <input
              type="text"
              name="marcaMotor"
              value={data.marcaMotor || ''}
              onChange={onChange}
              className="input-field"
              placeholder="Yanmar"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Modelo Motor</label>
            <input
              type="text"
              name="modeloMotor"
              value={data.modeloMotor || ''}
              onChange={onChange}
              className="input-field"
              placeholder="4TNV88"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">N° Serie Planta</label>
            <input
              type="text"
              name="nSeriePlanta"
              value={data.nSeriePlanta || ''}
              onChange={onChange}
              className="input-field"
              placeholder="6205"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">N° Serie Motor</label>
            <input
              type="text"
              name="nSerieMotor"
              value={data.nSerieMotor || ''}
              onChange={onChange}
              className="input-field"
              placeholder="1234"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Capacidad (KW)</label>
            <input
              type="number"
              name="capacidadKW"
              value={data.capacidadKW || ''}
              onChange={onChange}
              className="input-field"
              placeholder="17"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Capacidad (HP)</label>
            <input
              type="number"
              name="capacidadHP"
              value={data.capacidadHP || ''}
              onChange={onChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Capacidad (Amp)</label>
            <input
              type="number"
              name="capacidadAmp"
              value={data.capacidadAmp || ''}
              onChange={onChange}
              className="input-field"
              placeholder="67"
            />
          </div>
        </div>
      </div>

      {/* DATOS ATS */}
      <div className="card">
        <h2 className="text-lg font-bold mb-4">Datos ATS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Marca</label>
            <input
              type="text"
              name="atsMarca"
              value={data.atsMarca || ''}
              onChange={onChange}
              className="input-field"
              placeholder="ASCO"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Modelo</label>
            <input
              type="text"
              name="atsModelo"
              value={data.atsModelo || ''}
              onChange={onChange}
              className="input-field"
              placeholder="300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">N° de Serie</label>
            <input
              type="text"
              name="atsNumSerie"
              value={data.atsNumSerie || ''}
              onChange={onChange}
              className="input-field"
              placeholder="80002"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Capacidad</label>
            <input
              type="number"
              name="atsCapacidad"
              value={data.atsCapacidad || ''}
              onChange={onChange}
              className="input-field"
              placeholder="200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">¿Tiene Reloj de Ejercicio?</label>
            <select
              name="atsReloj"
              value={data.atsReloj || 'No'}
              onChange={onChange}
              className="input-field"
            >
              <option value="No">No</option>
              <option value="Sí">Sí</option>
            </select>
          </div>
        </div>
      </div>

      {/* COMBUSTIBLE */}
      <div className="card">
        <h2 className="text-lg font-bold mb-4">Combustible</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Capacidad Tanque 1</label>
            <input
              type="number"
              name="capacidadTanque1"
              value={data.capacidadTanque1 || ''}
              onChange={onChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Capacidad Tanque 2</label>
            <input
              type="number"
              name="capacidadTanque2"
              value={data.capacidadTanque2 || ''}
              onChange={onChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nivel de Combustible</label>
            <select
              name="nivelCombustible"
              value={data.nivelCombustible || ''}
              onChange={onChange}
              className="input-field"
            >
              <option value="">Seleccionar</option>
              <option value="1/4">1/4</option>
              <option value="2/4">2/4</option>
              <option value="3/4">3/4</option>
              <option value="4/4">Lleno</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Estado del Tanque</label>
            <select
              name="estadoTanque"
              value={data.estadoTanque || 'Bien'}
              onChange={onChange}
              className="input-field"
            >
              <option value="Bien">Bien</option>
              <option value="Regular">Regular</option>
              <option value="Mal">Mal</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Estado de Tuberías y Válvulas</label>
            <select
              name="estadoTuberias"
              value={data.estadoTuberias || 'Bien'}
              onChange={onChange}
              className="input-field"
            >
              <option value="Bien">Bien</option>
              <option value="Regular">Regular</option>
              <option value="Mal">Mal</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentForm;
