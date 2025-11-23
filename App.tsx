import React, { useState } from 'react';
import Header from './components/Header';
import SubjectSelector from './components/SubjectSelector';
import ImageInput from './components/ImageInput';
import LoadingOverlay from './components/LoadingOverlay';
import ResultDisplay from './components/ResultDisplay';
import { gradeHomework } from './services/geminiService';
import { Subject, EducationLevel, AppState, GradingResult } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentStep: 'setup',
    selectedSubject: Subject.MATH, // Default
    selectedLevel: EducationLevel.PRIMARY, // Default
    image: null,
    result: null,
    error: null,
  });

  const updateState = (updates: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleSubjectSelect = (subject: Subject) => updateState({ selectedSubject: subject });
  const handleLevelSelect = (level: EducationLevel) => updateState({ selectedLevel: level });
  
  const handleStartCapture = () => updateState({ currentStep: 'input' });

  const handleImageSelected = (base64: string) => {
    updateState({ image: base64, error: null });
  };

  const handleClearImage = () => {
    updateState({ image: null, error: null });
  };

  const handleAnalyze = async () => {
    if (!state.image) return;

    updateState({ currentStep: 'processing', error: null });

    try {
      const result = await gradeHomework(
        state.image,
        state.selectedSubject,
        state.selectedLevel
      );
      updateState({ result, currentStep: 'result' });
    } catch (err: any) {
      updateState({ 
        currentStep: 'input', 
        error: err.message || "批改失败，请重试。" 
      });
      alert(err.message || "Something went wrong.");
    }
  };

  const handleReset = () => {
    setState({
      currentStep: 'setup',
      selectedSubject: state.selectedSubject, // Keep previous selection
      selectedLevel: state.selectedLevel,
      image: null,
      result: null,
      error: null,
    });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-gray-900 pb-safe">
      <Header />

      <main className="max-w-md mx-auto w-full bg-white min-h-[calc(100vh-64px)] shadow-2xl relative overflow-hidden md:rounded-3xl md:my-4 md:min-h-[800px]">
        {state.currentStep === 'setup' && (
          <SubjectSelector
            selectedSubject={state.selectedSubject}
            selectedLevel={state.selectedLevel}
            onSelectSubject={handleSubjectSelect}
            onSelectLevel={handleLevelSelect}
            onNext={handleStartCapture}
          />
        )}

        {state.currentStep === 'input' && (
          <ImageInput
            image={state.image}
            onImageSelected={handleImageSelected}
            onClear={handleClearImage}
            onAnalyze={handleAnalyze}
          />
        )}

        {state.currentStep === 'processing' && <LoadingOverlay />}

        {state.currentStep === 'result' && state.result && (
          <ResultDisplay 
            result={state.result} 
            onReset={handleReset} 
          />
        )}
      </main>
    </div>
  );
};

export default App;