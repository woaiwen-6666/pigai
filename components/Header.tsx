import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-tr from-primary to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">
          A
        </div>
        <h1 className="text-lg font-bold text-gray-800 tracking-tight">AI作业批改神器</h1>
      </div>
      <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
        Gemini 2.5
      </div>
    </header>
  );
};

export default Header;