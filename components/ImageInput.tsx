import React, { useRef, useState } from 'react';
import { compressImage } from '../utils/imageUtils';

interface ImageInputProps {
  image: string | null;
  onImageSelected: (base64: string) => void;
  onClear: () => void;
  onAnalyze: () => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ image, onImageSelected, onClear, onAnalyze }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsCompressing(true);
      try {
        const compressed = await compressImage(e.target.files[0]);
        onImageSelected(compressed);
      } catch (err) {
        console.error("Compression failed", err);
        alert("图片处理失败，请重试");
      } finally {
        setIsCompressing(false);
      }
    }
  };

  if (image) {
    return (
      <div className="flex flex-col h-[calc(100vh-80px)] p-6">
        <div className="flex-1 relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gray-900">
           {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="Homework Preview" className="w-full h-full object-contain" />
          <button 
            onClick={onClear}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors"
          >
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <p className="text-center text-sm text-gray-500">确认图片清晰可见</p>
          <button
            onClick={onAnalyze}
            className="w-full bg-gradient-to-r from-secondary to-green-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-green-200 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            开始智能批改
          </button>
          <button
            onClick={onClear}
            className="w-full bg-white text-gray-600 font-semibold py-3 rounded-xl border border-gray-200 active:bg-gray-50"
          >
            重拍
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] p-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">拍摄作业</h2>
        <p className="text-gray-500 mt-2">请确保光线充足，字迹清晰</p>
      </div>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="w-full space-y-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isCompressing}
          className="w-full bg-primary text-white font-bold py-5 rounded-2xl shadow-xl shadow-indigo-200 active:scale-95 transition-all flex items-center justify-center gap-3 relative overflow-hidden"
        >
          {isCompressing ? (
             <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
              <span>拍照 / 上传图片</span>
            </>
          )}
        </button>
        
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1 bg-white p-2 rounded-lg border border-gray-100 justify-center">
             <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
             竖屏拍摄
          </div>
          <div className="flex items-center gap-1 bg-white p-2 rounded-lg border border-gray-100 justify-center">
             <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
             避免阴影
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageInput;