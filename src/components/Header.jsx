import React from 'react';
import { FileText } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b-2 border-black dark:border-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-white dark:text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black dark:text-white">
              HenkanCX Synk
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">Sistema de Inspección Inteligente</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
