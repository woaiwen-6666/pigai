export enum Subject {
  MATH = '数学',
  ENGLISH = '英语',
  CHINESE = '语文',
  PHYSICS = '物理',
  CHEMISTRY = '化学',
  OTHER = '综合'
}

export enum EducationLevel {
  PRIMARY = '小学',
  JUNIOR = '初中',
  SENIOR = '高中',
  UNIVERSITY = '大学'
}

export interface CorrectionItem {
  question_id: string;
  is_correct: boolean;
  user_answer: string;
  correct_answer: string;
  explanation: string;
}

export interface GradingResult {
  score: number;
  overall_comment: string;
  corrections: CorrectionItem[];
}

export interface AppState {
  currentStep: 'setup' | 'input' | 'processing' | 'result';
  selectedSubject: Subject;
  selectedLevel: EducationLevel;
  image: string | null; // Base64 string
  result: GradingResult | null;
  error: string | null;
}