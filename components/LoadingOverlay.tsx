import React from 'react';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-indigo-200 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
           <span className="text-2xl animate-pulse">✨</span>
        </div>
      </div>
      <h3 className="mt-8 text-xl font-bold text-gray-900">AI老师正在批改中...</h3>
      <p className="text-gray-500 mt-2 text-sm">正在识别题目 • 分析答案 • 生成解析</p>
      
      <div className="mt-8 w-64 bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div className="h-full bg-primary animate-progress origin-left"></div>
      </div>
      
      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingOverlay;