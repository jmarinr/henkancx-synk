import React from 'react';
import { Cpu, Sparkles } from 'lucide-react';
import VoiceInput from './VoiceInput';

const EquipmentForm = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      {/* DATOS DEL GENERADOR */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            Datos del Generador
          </h2>
          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">IA Activada</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <VoiceInput
            type="number"
            name="hodometro"
            value={data.hodometro || ''}
            onChange={onChange}
            placeholder="1324"
            label="Hodómetro (con voz 🎤)"
          />

          <VoiceInput
            type="text"
            name="marcaPlanta"
            value={data.marcaPlanta || ''}
            onChange={onChange}
            placeholder="Himoinsa"
            label="Marca Planta"
          />

          <VoiceInput
            type="text"
            name="modeloPlanta"
            value={data.modeloPlanta || ''}
            onChange={onChange}
            placeholder="HYW20"
            label="Modelo Planta"
          />

          <VoiceInput
            type="text"
            name="marcaMotor"
            value={data.marcaMotor || ''}
            onChange={onChange}
            placeholder="Yanmar"
            label="Marca Motor"
          />

          <VoiceInput
            type="text"
            name="modeloMotor"
            value={data.modeloMotor || ''}
            onChange={onChange}
            placeholder="4TNV88"
            label="Modelo Motor"
          />

          <VoiceInput
            type="text"
            name="nSeriePlanta"
            value={data.nSeriePlanta || ''}
            onChange={onChange}
            placeholder="6205"
            label="N° Serie Planta"
          />

          <VoiceInput
            type="text"
            name="nSerieMotor"
            value={data.nSerieMotor || ''}
            onChange={onChange}
            placeholder="1234"
            label="N° Serie Motor"
          />

          <VoiceInput
            type="number"
            name="capacidadKW"
            value={data.capacidadKW || ''}
            onChange={onChange}
            placeholder="17"
            label="Capacidad (KW)"
          />

          <VoiceInput
            type="number"
            name="capacidadHP"
            value={data.capacidadHP || ''}
            onChange={onChange}
            placeholder=""
            label="Capacidad (HP)"
          />

          <VoiceInput
            type="number"
            name="capacidadAmp"
            value={data.capacidadAmp || ''}
            onChange={onChange}
            placeholder="67"
            label="Capacidad (Amp)"
          />
        </div>
      </div>

      {/* DATOS ATS */}
      <div className="card">
        <h2 className="text-lg font-bold mb-4">Datos ATS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <VoiceInput
            type="text"
            name="atsMarca"
            value={data.atsMarca || ''}
            onChange={onChange}
            placeholder="ASCO"
            label="Marca"
          />

          <VoiceInput
            type="text"
            name="atsModelo"
            value={data.atsModelo || ''}
            onChange={onChange}
            placeholder="300"
            label="Modelo"
          />

          <VoiceInput
            type="text"
            name="atsNumSerie"
            value={data.atsNumSerie || ''}
            onChange={onChange}
            placeholder="80002"
            label="N° de Serie"
          />

          <VoiceInput
            type="number"
            name="atsCapacidad"
            value={data.atsCapacidad || ''}
            onChange={onChange}
            placeholder="200"
            label="Capacidad"
          />

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
          <VoiceInput
            type="number"
            name="capacidadTanque1"
            value={data.capacidadTanque1 || ''}
            onChange={onChange}
            placeholder=""
            label="Capacidad Tanque 1"
          />

          <VoiceInput
            type="number"
            name="capacidadTanque2"
            value={data.capacidadTanque2 || ''}
            onChange={onChange}
            placeholder=""
            label="Capacidad Tanque 2"
          />

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
