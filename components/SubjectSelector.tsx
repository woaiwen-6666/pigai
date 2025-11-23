import React from 'react';
import { Subject, EducationLevel } from '../types';

interface SubjectSelectorProps {
  selectedSubject: Subject;
  selectedLevel: EducationLevel;
  onSelectSubject: (s: Subject) => void;
  onSelectLevel: (l: EducationLevel) => void;
  onNext: () => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({
  selectedSubject,
  selectedLevel,
  onSelectSubject,
  onSelectLevel,
  onNext,
}) => {
  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">批改什么作业?</h2>
        <p className="text-gray-500 mb-6">选择科目和年级，AI老师将为你定制批改标准。</p>

        <div className="space-y-6">
          {/* Level Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">年级</label>
            <div className="grid grid-cols-4 gap-2">
              {Object.values(EducationLevel).map((level) => (
                <button
                  key={level}
                  onClick={() => onSelectLevel(level)}
                  className={`py-2 px-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedLevel === level
                      ? 'bg-primary text-white shadow-md transform scale-105'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-primary/50'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">科目</label>
            <div className="grid grid-cols-3 gap-3">
              {Object.values(Subject).map((subject) => (
                <button
                  key={subject}
                  onClick={() => onSelectSubject(subject)}
                  className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                    selectedSubject === subject
                      ? 'bg-gradient-to-br from-primary to-indigo-600 text-white shadow-lg shadow-indigo-200 transform scale-105'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span>{subject}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-0 right-0 px-6">
        <button
          onClick={onNext}
          className="w-full bg-gray-900 text-white font-semibold py-4 rounded-2xl shadow-xl hover:bg-gray-800 active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <span>下一步: 拍照上传</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SubjectSelector;