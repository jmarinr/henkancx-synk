import React from 'react';
import { CheckSquare, AlertTriangle } from 'lucide-react';

const TestsForm = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      {/* PRUEBAS DE ARRANQUE */}
      <div className="card">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <CheckSquare className="w-5 h-5" />
          Pruebas de Arranque
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Arranque Manual (Si/No)</label>
            <select
              name="arranqueManual"
              value={data.arranqueManual || ''}
              onChange={onChange}
              className="input-field"
            >
              <option value="">Seleccionar</option>
              <option value="Ok">Ok</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Arranque Automático</label>
            <select
              name="arranqueAutomatico"
              value={data.arranqueAutomatico || ''}
              onChange={onChange}
              className="input-field"
            >
              <option value="">Seleccionar</option>
              <option value="Ok">Ok</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
      </div>

      {/* VERIFICACIÓN DE ALARMAS */}
      <div className="card">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Verificación de Alarmas con el C.N.O.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Fallo de Red Comercial</label>
            <select
              name="falloRedComercial"
              value={data.falloRedComercial || ''}
              onChange={onChange}
              className="input-field"
            >
              <option value="">Seleccionar</option>
              <option value="Ok">Ok</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Generador Operando</label>
            <select
              name="generadorOperando"
              value={data.generadorOperando || ''}
              onChange={onChange}
              className="input-field"
            >
              <option value="">Seleccionar</option>
              <option value="Ok">Ok</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Fallo de Generador</label>
            <select
              name="falloGenerador"
              value={data.falloGenerador || ''}
              onChange={onChange}
              className="input-field"
            >
              <option value="">Seleccionar</option>
              <option value="No">No</option>
              <option value="Sí">Sí</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bajo Nivel de Combustible</label>
            <select
              name="bajoNivelCombustible"
              value={data.bajoNivelCombustible || ''}
              onChange={onChange}
              className="input-field"
            >
              <option value="">Seleccionar</option>
              <option value="No">No</option>
              <option value="Sí">Sí</option>
            </select>
          </div>
        </div>
      </div>

      {/* MEDICIÓN DE RUIDO */}
      <div className="card">
        <h2 className="text-lg font-bold mb-4">Medición de Ruido dB(A)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nivel Aceptado</label>
            <input
              type="text"
              name="nivelRuidoAceptado"
              value={data.nivelRuidoAceptado || '60-45 dB(A)'}
              onChange={onChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Medición</label>
            <input
              type="text"
              name="medicionRuido"
              value={data.medicionRuido || '60-45 dB(A)'}
              onChange={onChange}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* MEDICIÓN DE EMANACIÓN DE GAS */}
      <div className="card">
        <h2 className="text-lg font-bold mb-4">Medición de Emanación de Gas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-3">
            <div className="grid grid-cols-3 gap-4 mb-2">
              <div className="text-sm font-medium text-center">Tipo</div>
              <div className="text-sm font-medium text-center">Nivel Aceptado</div>
              <div className="text-sm font-medium text-center">Medición</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center">
              <span className="text-sm font-medium">CO%</span>
            </div>
            <input
              type="text"
              name="coNivelAceptado"
              value={data.coNivelAceptado || '0.50%'}
              onChange={onChange}
              className="input-field"
            />
            <input
              type="number"
              name="coMedicion"
              value={data.coMedicion || ''}
              onChange={onChange}
              className="input-field"
              placeholder="0"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center">
              <span className="text-sm font-medium">HCM ppm</span>
            </div>
            <input
              type="text"
              name="hcmNivelAceptado"
              value={data.hcmNivelAceptado || '125'}
              onChange={onChange}
              className="input-field"
            />
            <input
              type="number"
              name="hcmMedicion"
              value={data.hcmMedicion || ''}
              onChange={onChange}
              className="input-field"
              placeholder="0"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center">
              <span className="text-sm font-medium">Alícuota S/2 SMN</span>
            </div>
            <input
              type="text"
              name="alicuotaNivelAceptado"
              value={data.alicuotaNivelAceptado || '100%'}
              onChange={onChange}
              className="input-field"
            />
            <input
              type="number"
              name="alicuotaMedicion"
              value={data.alicuotaMedicion || ''}
              onChange={onChange}
              className="input-field"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* SERIE DE INSUMOS CAMBIADOS */}
      <div className="card">
        <h2 className="text-lg font-bold mb-4">Serie de Insumos Cambiados</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center font-medium text-sm">Filtro Aceite</div>
          <div className="text-center font-medium text-sm">Filtro Aire</div>
          <div className="text-center font-medium text-sm">Filtro Diesel</div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Viejo</label>
            <input
              type="text"
              name="filtroAceiteViejo"
              value={data.filtroAceiteViejo || ''}
              onChange={onChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Viejo</label>
            <input
              type="text"
              name="filtroAireViejo"
              value={data.filtroAireViejo || ''}
              onChange={onChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Viejo</label>
            <input
              type="text"
              name="filtroDieselViejo"
              value={data.filtroDieselViejo || ''}
              onChange={onChange}
              className="input-field"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Nuevo</label>
            <input
              type="text"
              name="filtroAceiteNuevo"
              value={data.filtroAceiteNuevo || ''}
              onChange={onChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Nuevo</label>
            <input
              type="text"
              name="filtroAireNuevo"
              value={data.filtroAireNuevo || ''}
              onChange={onChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Nuevo</label>
            <input
              type="text"
              name="filtroDieselNuevo"
              value={data.filtroDieselNuevo || ''}
              onChange={onChange}
              className="input-field"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestsForm;
