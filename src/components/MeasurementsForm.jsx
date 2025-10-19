import React from 'react';
import { Activity, Zap, Battery } from 'lucide-react';

const MeasurementsForm = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      {/* VOLTAJE MOTOR GENERADOR */}
      <div className="card">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Medición de Voltaje Motor Generador
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">L1-N (110 +/- 21V AC)</label>
            <input
              type="number"
              name="voltajeL1N"
              value={data.voltajeL1N || ''}
              onChange={onChange}
              className="input-field"
              placeholder="112"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">L2-N (110 +/- 21V AC)</label>
            <input
              type="number"
              name="voltajeL2N"
              value={data.voltajeL2N || ''}
              onChange={onChange}
              className="input-field"
              placeholder="112"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">L1-L2 (220 +/- 42V AC)</label>
            <input
              type="number"
              name="voltajeL1L2"
              value={data.voltajeL1L2 || ''}
              onChange={onChange}
              className="input-field"
              placeholder="224"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Neutral a Tierra o Masa</label>
            <input
              type="number"
              name="voltajeNeutralTierra"
              value={data.voltajeNeutralTierra || ''}
              onChange={onChange}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* VOLTAJE RED COMERCIAL */}
      <div className="card">
        <h2 className="text-lg font-bold mb-4">Medición de Voltaje Red Comercial</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">L1-N (110 +/- 21V AC)</label>
            <input
              type="number"
              name="voltajeRedL1N"
              value={data.voltajeRedL1N || ''}
              onChange={onChange}
              className="input-field"
              placeholder="126"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">L2-N (110 +/- 21V AC)</label>
            <input
              type="number"
              name="voltajeRedL2N"
              value={data.voltajeRedL2N || ''}
              onChange={onChange}
              className="input-field"
              placeholder="126"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">L1-L2 (220 +/- 42V AC)</label>
            <input
              type="number"
              name="voltajeRedL1L2"
              value={data.voltajeRedL1L2 || ''}
              onChange={onChange}
              className="input-field"
              placeholder="252"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Neutral a Tierra o Masa</label>
            <input
              type="number"
              name="voltajeRedNeutralTierra"
              value={data.voltajeRedNeutralTierra || ''}
              onChange={onChange}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* CORRIENTE */}
      <div className="card">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Medición de Corriente Generador
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">L1 (Amp)</label>
            <input
              type="number"
              name="corrienteL1"
              value={data.corrienteL1 || ''}
              onChange={onChange}
              className="input-field"
              placeholder="37"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">L2 (Amp)</label>
            <input
              type="number"
              name="corrienteL2"
              value={data.corrienteL2 || ''}
              onChange={onChange}
              className="input-field"
              placeholder="37"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Neutral (Amp)</label>
            <input
              type="number"
              name="corrienteNeutral"
              value={data.corrienteNeutral || ''}
              onChange={onChange}
              className="input-field"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* BATERÍA */}
      <div className="card">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Battery className="w-5 h-5" />
          Batería MG
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Fecha de Batería</label>
            <input
              type="date"
              name="fechaBateria"
              value={data.fechaBateria || ''}
              onChange={onChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Estado Físico Batería</label>
            <select
              name="estadoBateria"
              value={data.estadoBateria || 'Bien'}
              onChange={onChange}
              className="input-field"
            >
              <option value="Bien">Bien</option>
              <option value="Regular">Regular</option>
              <option value="Mal">Mal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Marca, Modelo y # de Serie</label>
            <input
              type="text"
              name="bateriaMarca"
              value={data.bateriaMarca || ''}
              onChange={onChange}
              className="input-field"
              placeholder="Deka"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Estado Bornes</label>
            <select
              name="estadoBornes"
              value={data.estadoBornes || 'Bien'}
              onChange={onChange}
              className="input-field"
            >
              <option value="Bien">Bien</option>
              <option value="Regular">Regular</option>
              <option value="Mal">Mal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Estado de Cables y Terminales</label>
            <select
              name="estadoCables"
              value={data.estadoCables || 'Bien'}
              onChange={onChange}
              className="input-field"
            >
              <option value="Bien">Bien</option>
              <option value="Regular">Regular</option>
              <option value="Mal">Mal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Estado del Electrolito</label>
            <input
              type="text"
              name="estadoElectrolito"
              value={data.estadoElectrolito || ''}
              onChange={onChange}
              className="input-field"
              placeholder="No aplica"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Voltage Bat. Con Cargador</label>
            <input
              type="number"
              step="0.1"
              name="voltageBatCargador"
              value={data.voltageBatCargador || ''}
              onChange={onChange}
              className="input-field"
              placeholder="14"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Voltage Bat. Sin Cargador</label>
            <input
              type="number"
              step="0.1"
              name="voltageBatSinCargador"
              value={data.voltageBatSinCargador || ''}
              onChange={onChange}
              className="input-field"
              placeholder="13.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Voltage Alternador</label>
            <input
              type="number"
              name="voltageAlternador"
              value={data.voltageAlternador || ''}
              onChange={onChange}
              className="input-field"
              placeholder="14"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Caída de Voltaje en Arranque</label>
            <input
              type="number"
              name="caidaVoltaje"
              value={data.caidaVoltaje || ''}
              onChange={onChange}
              className="input-field"
              placeholder="11"
            />
          </div>
        </div>
      </div>

      {/* LECTURAS GENERALES */}
      <div className="card">
        <h2 className="text-lg font-bold mb-4">Lecturas Generales del Generador</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Presión de Aceite (PSI)</label>
            <input
              type="number"
              name="presionAceite"
              value={data.presionAceite || ''}
              onChange={onChange}
              className="input-field"
              placeholder="74"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Frecuencia (Hz)</label>
            <input
              type="number"
              name="frecuencia"
              value={data.frecuencia || ''}
              onChange={onChange}
              className="input-field"
              placeholder="60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amperaje</label>
            <input
              type="text"
              name="amperaje"
              value={data.amperaje || ''}
              onChange={onChange}
              className="input-field"
              placeholder="Amperios"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Voltaje</label>
            <input
              type="text"
              name="voltajeGeneral"
              value={data.voltajeGeneral || ''}
              onChange={onChange}
              className="input-field"
              placeholder="Voltios AC"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Temperatura (°C / °F)</label>
            <input
              type="number"
              name="temperatura"
              value={data.temperatura || ''}
              onChange={onChange}
              className="input-field"
              placeholder="38"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nivel de Combustible</label>
            <input
              type="text"
              name="nivelCombustibleLectura"
              value={data.nivelCombustibleLectura || ''}
              onChange={onChange}
              className="input-field"
              placeholder="Galones, Litros o %"
            />
          </div>
        </div>
      </div>

      {/* NIVEL DE ACEITE */}
      <div className="card">
        <h2 className="text-lg font-bold mb-4">Medición de Nivel de Aceite</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Nivel de Aceite</label>
          <input
            type="text"
            name="nivelAceite"
            value={data.nivelAceite || ''}
            onChange={onChange}
            className="input-field"
            placeholder="Nivel actual"
          />
        </div>
      </div>
    </div>
  );
};

export default MeasurementsForm;
