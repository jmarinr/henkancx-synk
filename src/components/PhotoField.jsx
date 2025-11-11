import React, { useRef, useState } from 'react';

export default function PhotoField({ label = 'Título de la foto', onChange }) {
  const inputRef = useRef(null);
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleFile = (f) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
    setFile(f);
    onChange && onChange({ title, file: f });
  };

  return (
    <div className="border rounded-2xl p-3 space-y-2 bg-white">
      <label className="text-sm font-medium">{label}</label>
      <input
        type="text"
        placeholder="Ej: Foto placa de datos generador"
        className="w-full border rounded-xl px-3 py-2"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          onChange && onChange({ title: e.target.value, file });
        }}
      />
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files?.[0])}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="px-3 py-2 rounded-xl border bg-white hover:bg-gray-50"
        >
          Cargar foto
        </button>
        {preview && <img src={preview} alt="preview" className="h-16 rounded-lg border" />}
      </div>
    </div>
  );
}
