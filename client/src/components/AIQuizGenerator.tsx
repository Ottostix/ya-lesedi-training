import React, { useState } from 'react';
import { Sparkles, Upload, FileText, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { aiQuizGeneratorService, QuizGenerationRequest, GenerationProgress } from '../services/aiQuizGeneratorService';

interface AIQuizGeneratorProps {
  onQuizGenerated?: (quiz: any) => void;
  restaurantId?: string;
  manualId?: string;
}

export default function AIQuizGenerator({ onQuizGenerated, restaurantId, manualId }: AIQuizGeneratorProps) {
  const [documentText, setDocumentText] = useState('');
  const [documentTitle, setDocumentTitle] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(25);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'mixed'>('mixed');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<GenerationProgress | null>(null);
  const [generatedQuiz, setGeneratedQuiz] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>(['multiple_choice', 'true_false']);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setDocumentTitle(file.name.replace(/\.[^/.]+$/, ''));
    setError(null);

    try {
      const text = await file.text();
      setDocumentText(text);
    } catch (err) {
      setError('Failed to read file. Please ensure it is a valid text or PDF file.');
    }
  };

  const handleGenerateQuiz = async () => {
    if (!documentText.trim()) {
      setError('Please upload or paste document content');
      return;
    }

    if (!documentTitle.trim()) {
      setError('Please provide a document title');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedQuiz(null);

    try {
      const request: QuizGenerationRequest = {
        documentText,
        documentTitle,
        numberOfQuestions,
        difficulty,
        questionTypes: selectedQuestionTypes as any,
        language: 'English'
      };

      const response = await aiQuizGeneratorService.generateQuizFromDocument(
        request,
        (prog) => {
          setProgress(prog);
        }
      );

      if (response.success && response.quiz) {
        // Enhance quiz with metadata
        const enhancedQuiz = await aiQuizGeneratorService.enhanceQuiz(response.quiz);
        
        // Validate quiz quality
        const validation = await aiQuizGeneratorService.validateQuizQuality(enhancedQuiz);
        
        setGeneratedQuiz({
          ...enhancedQuiz,
          manualId: manualId || '',
          restaurantId: restaurantId || '',
          validation
        });

        onQuizGenerated?.(enhancedQuiz);
      } else {
        setError(response.error || 'Failed to generate quiz');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during quiz generation');
    } finally {
      setIsGenerating(false);
      setProgress(null);
    }
  };

  const toggleQuestionType = (type: string) => {
    setSelectedQuestionTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-700/50 rounded-lg p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-500/20 border border-purple-400/30 rounded-lg">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Quiz Generator</h2>
            <p className="text-slate-400 text-sm">Automatically generate quizzes from training documents using AI</p>
          </div>
        </div>

        {/* Document Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Document Title</label>
            <input
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              placeholder="e.g., Food Safety Manual"
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-400/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Upload Document or Paste Text</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="file"
                  accept=".txt,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-700/50 border-2 border-dashed border-slate-600/50 rounded-lg cursor-pointer hover:border-purple-400/50 transition-all"
                >
                  <Upload className="w-5 h-5 text-slate-400" />
                  <span className="text-sm text-slate-300">Upload File</span>
                </label>
              </div>
              <div className="text-center text-slate-400 text-sm py-3">OR</div>
            </div>

            <textarea
              value={documentText}
              onChange={(e) => setDocumentText(e.target.value)}
              placeholder="Paste your training document content here..."
              rows={8}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-400/50 resize-none"
            />
          </div>
        </div>

        {/* Basic Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Number of Questions</label>
            <input
              type="number"
              min="5"
              max="100"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(Math.max(5, Math.min(100, parseInt(e.target.value) || 25)))}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-purple-400/50"
            />
            <p className="text-xs text-slate-500 mt-1">Recommended: 20-30 questions</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Difficulty Level</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-purple-400/50"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="border-t border-slate-700/50 pt-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
          >
            <Settings className="w-4 h-4" />
            {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Question Types</label>
                <div className="space-y-2">
                  {[
                    { id: 'multiple_choice', label: 'Multiple Choice' },
                    { id: 'true_false', label: 'True/False' },
                    { id: 'short_answer', label: 'Short Answer' }
                  ].map(type => (
                    <label key={type.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedQuestionTypes.includes(type.id)}
                        onChange={() => toggleQuestionType(type.id)}
                        className="w-4 h-4 rounded border-slate-600/50 text-purple-500 focus:ring-purple-400"
                      />
                      <span className="text-sm text-slate-300">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-400">Error</p>
              <p className="text-sm text-red-300/80">{error}</p>
            </div>
          </div>
        )}

        {/* Progress */}
        {isGenerating && progress && (
          <div className="space-y-3 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-purple-300">{progress.currentStep}</p>
              <span className="text-sm text-purple-300">{progress.progress}%</span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${progress.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Generated Quiz Summary */}
        {generatedQuiz && (
          <div className="space-y-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-400">Quiz Generated Successfully!</p>
                <div className="mt-2 space-y-1 text-sm text-green-300/80">
                  <p>📝 Questions: {generatedQuiz.totalQuestions}</p>
                  <p>⏱️ Estimated Time: {generatedQuiz.metadata.estimatedDuration} minutes</p>
                  <p>📊 Difficulty: {generatedQuiz.metadata.difficulty}</p>
                  <p>✓ Quality Score: {generatedQuiz.validation?.score || 0}/100</p>
                </div>
                {generatedQuiz.validation?.issues?.length > 0 && (
                  <div className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs text-yellow-300">
                    <p className="font-medium mb-1">Issues found:</p>
                    <ul className="space-y-0.5 list-disc list-inside">
                      {generatedQuiz.validation.issues.map((issue: string, i: number) => (
                        <li key={i}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerateQuiz}
          disabled={isGenerating || !documentText.trim() || !documentTitle.trim()}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating Quiz...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Quiz with AI
            </>
          )}
        </button>

        {/* Info */}
        <div className="p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg text-sm text-slate-400">
          <p className="font-medium text-slate-300 mb-2">💡 How it works:</p>
          <ol className="space-y-1 list-decimal list-inside">
            <li>Upload or paste your training document</li>
            <li>Configure quiz settings (number of questions, difficulty)</li>
            <li>Click "Generate Quiz with AI"</li>
            <li>AI analyzes content and generates relevant questions</li>
            <li>Review and customize the generated quiz</li>
            <li>Save and assign to staff</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

