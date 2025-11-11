import React, { useState } from "react";

export default function TechnicianLogin({ onSuccess }) {
  const [name, setName] = useState("");
  const [tid, setTid] = useState("");
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");

  const EXPECTED_PIN = import.meta.env.VITE_TECH_PIN || "246810";

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");

    if (pin !== EXPECTED_PIN) {
      setErr("PIN incorrecto");
      return;
    }

    try {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("technicianName", name || "Técnico");
      localStorage.setItem("technicianId", tid || "ID-DEFAULT");
    } catch {}

    if (onSuccess) onSuccess();
    else window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border shadow-xl rounded-2xl p-6 space-y-5">
        <h1 className="text-2xl font-bold text-center">Ingreso de Técnico</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nombre</label>
            <input
              type="text"
              className="w-full border rounded-xl px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Juan Pérez"
            />
          </div>
          <div>
            <label className="text-sm font-medium">ID Técnico</label>
            <input
              type="text"
              className="w-full border rounded-xl px-3 py-2"
              value={tid}
              onChange={(e) => setTid(e.target.value)}
              placeholder="Ej: T-001"
            />
          </div>
          <div>
            <label className="text-sm font-medium">PIN</label>
            <input
              type="password"
              className="w-full border rounded-xl px-3 py-2"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••••"
            />
            <p className="text-xs text-gray-500 mt-1">
              Usa el PIN <b>{EXPECTED_PIN}</b>
            </p>
          </div>

          {err && <div className="text-sm text-red-600">{err}</div>}

          <button
            type="submit"
            className="w-full bg-black text-white py-2.5 rounded-xl font-semibold hover:bg-gray-900"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
