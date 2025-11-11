import React, { useState, useEffect } from 'react';

/**
 * TechnicianLogin
 * - Identificación de técnico con PIN (configurable via VITE_TECH_PIN).
 * - Guarda: isAuthenticated, technicianId, technicianName en localStorage.
 */
export default function TechnicianLogin({ onSuccess }) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const VALID_PIN = import.meta.env.VITE_TECH_PIN || '246810';

  useEffect(() => {
    const ok = localStorage.getItem('isAuthenticated') === 'true';
    if (ok && onSuccess) onSuccess();
  }, [onSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const pin = String(code).trim();
      if (!pin || pin.length < 4) throw new Error('Código inválido');
      if (pin !== VALID_PIN) throw new Error('Código incorrecto');

      localStorage.setItem('isAuthenticated', 'true');
      if (name) localStorage.setItem('technicianName', name);
      localStorage.setItem('technicianId', pin);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'No se pudo validar el código');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-1 text-center">Ingreso de Técnico</h1>
        <p className="text-sm text-gray-600 text-center mb-6">Identifícate para continuar</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre del técnico (opcional)</label>
            <input
              type="text"
              placeholder="Ej: Juan Pérez"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Código / PIN</label>
            <input
              type="password"
              inputMode="numeric"
              placeholder="••••••"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring tracking-widest"
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl py-2 font-semibold shadow hover:shadow-md disabled:opacity-50 bg-black text-white"
          >
            {loading ? 'Validando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
