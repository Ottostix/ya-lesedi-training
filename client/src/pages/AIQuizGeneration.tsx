import React, { useState } from 'react';
import { Sparkles, ArrowLeft, Save, Eye } from 'lucide-react';
import AIQuizGenerator from '../components/AIQuizGenerator';

export default function AIQuizGeneration() {
  const [generatedQuiz, setGeneratedQuiz] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleQuizGenerated = (quiz: any) => {
    setGeneratedQuiz(quiz);
  };

  const handleSaveQuiz = async () => {
    if (!generatedQuiz) return;
    
    try {
      // Save quiz to database
      console.log('Saving quiz:', generatedQuiz);
      alert('Quiz saved successfully!');
    } catch (error) {
      console.error('Error saving quiz:', error);
      alert('Failed to save quiz');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-4">
            <ArrowLeft className="w-5 h-5" />
            Back to Quizzes
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">AI Quiz Generator</h1>
          </div>
          <p className="text-slate-400">Automatically generate quizzes from your training documents</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Generator Section */}
          <div className="lg:col-span-2">
            <AIQuizGenerator onQuizGenerated={handleQuizGenerated} />
          </div>

          {/* Generated Quiz Preview */}
          {generatedQuiz && (
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-700/50 rounded-lg p-6 h-fit sticky top-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Generated Quiz</h3>
                  <p className="text-sm text-slate-400">{generatedQuiz.title}</p>
                </div>

                <div className="space-y-3 p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Questions:</span>
                    <span className="font-bold text-white">{generatedQuiz.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Duration:</span>
                    <span className="font-bold text-white">{generatedQuiz.metadata.estimatedDuration} min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Difficulty:</span>
                    <span className="font-bold text-white capitalize">{generatedQuiz.metadata.difficulty}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Passing Score:</span>
                    <span className="font-bold text-white">{generatedQuiz.passingScore}%</span>
                  </div>
                </div>

                {generatedQuiz.validation && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-300">Quality Score</span>
                      <span className={`font-bold ${generatedQuiz.validation.score >= 80 ? 'text-green-400' : generatedQuiz.validation.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {generatedQuiz.validation.score}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          generatedQuiz.validation.score >= 80 ? 'bg-green-500' :
                          generatedQuiz.validation.score >= 60 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${generatedQuiz.validation.score}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2 pt-4 border-t border-slate-700/50">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 rounded-lg text-white transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    {showPreview ? 'Hide' : 'Preview'} Questions
                  </button>
                  <button
                    onClick={handleSaveQuiz}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-lg text-white font-medium transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Save Quiz
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Questions Preview */}
        {showPreview && generatedQuiz && (
          <div className="mt-8 bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-700/50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-6">Questions Preview</h3>
            <div className="space-y-6">
              {generatedQuiz.questions.map((question: any, index: number) => (
                <div key={question.id} className="p-4 bg-slate-700/30 rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <h4 className="font-bold text-white flex-1">
                      {index + 1}. {question.question}
                    </h4>
                    <span className="text-xs px-2 py-1 bg-purple-500/20 border border-purple-400/30 rounded text-purple-300 whitespace-nowrap ml-4">
                      {question.difficulty}
                    </span>
                  </div>

                  {question.questionType === 'multiple_choice' && (
                    <div className="space-y-2 ml-4">
                      {question.options.map((option: string, i: number) => (
                        <div
                          key={i}
                          className={`p-2 rounded text-sm ${
                            option === question.correctAnswer
                              ? 'bg-green-500/20 border border-green-400/30 text-green-300'
                              : 'bg-slate-600/30 border border-slate-600/50 text-slate-300'
                          }`}
                        >
                          {String.fromCharCode(65 + i)}) {option}
                        </div>
                      ))}
                    </div>
                  )}

                  {question.questionType === 'true_false' && (
                    <div className="space-y-2 ml-4">
                      {['True', 'False'].map((option) => (
                        <div
                          key={option}
                          className={`p-2 rounded text-sm ${
                            option === question.correctAnswer
                              ? 'bg-green-500/20 border border-green-400/30 text-green-300'
                              : 'bg-slate-600/30 border border-slate-600/50 text-slate-300'
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-xs font-medium text-blue-300 mb-1">Explanation:</p>
                    <p className="text-sm text-blue-200/80">{question.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

