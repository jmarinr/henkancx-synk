import React from 'react';

export default function Wizard({ steps = [], current = 0, onGo }) {
  return (
    <div className="w-full">
      <ol className="flex items-center justify-between mb-4">
        {steps.map((s, i) => (
          <li key={s.key} className="flex-1">
            <button
              onClick={() => onGo && onGo(i)}
              className={`w-full px-3 py-2 rounded-2xl text-sm font-medium border
              ${i === current ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'}`}
            >
              {i + 1}. {s.title}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
