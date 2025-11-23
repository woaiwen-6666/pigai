import React from 'react';
import { GradingResult } from '../types';

interface ResultDisplayProps {
  result: GradingResult;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  const isPerfect = result.score === 100;
  const isPass = result.score >= 60;
  
  const scoreColor = isPerfect ? 'text-yellow-500' : isPass ? 'text-secondary' : 'text-danger';
  const scoreBg = isPerfect ? 'bg-yellow-50' : isPass ? 'bg-green-50' : 'bg-red-50';

  return (
    <div className="pb-24 animate-slide-up">
      {/* Score Card */}
      <div className="bg-white p-6 rounded-b-3xl shadow-sm border-b border-gray-100 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">本次得分</h2>
            <div className={`text-6xl font-black ${scoreColor} tracking-tighter`}>
              {result.score}
              <span className="text-2xl text-gray-400 font-medium ml-1">/100</span>
            </div>
          </div>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${scoreBg}`}>
            {isPerfect ? '🏆' : isPass ? '👍' : '💪'}
          </div>
        </div>
        
        <div className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
           <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">老师评语</h3>
           <p className="text-gray-700 font-medium leading-relaxed">{result.overall_comment}</p>
        </div>
      </div>

      {/* Corrections List */}
      <div className="px-4 space-y-4">
        <div className="flex items-center justify-between px-2">
            <h3 className="font-bold text-gray-900 text-lg">详细解析</h3>
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-md">
                {result.corrections.length} 题
            </span>
        </div>

        {result.corrections.map((item, index) => (
          <div 
            key={index} 
            className={`bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all ${
                !item.is_correct ? 'ring-2 ring-red-100' : ''
            }`}
          >
            <div className="p-4 flex gap-4">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                item.is_correct ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'
              }`}>
                {item.is_correct ? '✓' : '✕'}
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start">
                    <span className="font-bold text-gray-800">{item.question_id || `第 ${index + 1} 题`}</span>
                    {!item.is_correct && <span className="text-xs text-red-500 font-bold bg-red-50 px-2 py-1 rounded">需要订正</span>}
                </div>

                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                    <span className="text-gray-400">你的答案:</span>
                    <span className={`font-mono ${item.is_correct ? 'text-green-700' : 'text-red-600 line-through'}`}>
                        {item.user_answer || '(未填写)'}
                    </span>
                    
                    {!item.is_correct && (
                        <>
                            <span className="text-gray-400">正确答案:</span>
                            <span className="font-mono text-green-600 font-bold">{item.correct_answer}</span>
                        </>
                    )}
                </div>
                
                <div className="pt-3 border-t border-gray-50">
                    <p className="text-sm text-gray-600 leading-relaxed">
                        <span className="font-semibold text-gray-400 text-xs mr-2">解析</span>
                        {item.explanation}
                    </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-3 z-40 safe-area-bottom">
        <button 
          onClick={onReset}
          className="flex-1 bg-gray-900 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-gray-800 active:scale-95 transition-all"
        >
          批改下一页
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;