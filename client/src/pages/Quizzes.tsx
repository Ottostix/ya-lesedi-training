import { useState } from 'react';
import { Plus, BookOpen, Users, CheckCircle, Edit2, Trash2 } from 'lucide-react';

interface Quiz {
  id: number;
  title: string;
  questions: number;
  participants: number;
  completion: number;
  difficulty: string;
  status: string;
}

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    { id: 1, title: 'Food Safety Basics', questions: 20, participants: 145, completion: 87, difficulty: 'Beginner', status: 'Active' },
    { id: 2, title: 'Customer Service Excellence', questions: 25, participants: 132, completion: 92, difficulty: 'Intermediate', status: 'Active' },
    { id: 3, title: 'Wine Pairing Fundamentals', questions: 30, participants: 98, completion: 78, difficulty: 'Advanced', status: 'Active' },
    { id: 4, title: 'Kitchen Operations', questions: 22, participants: 156, completion: 85, difficulty: 'Intermediate', status: 'Active' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newQuiz, setNewQuiz] = useState({ title: '', questions: 0, difficulty: 'Beginner' });

  const handleAddQuiz = () => {
    if (newQuiz.title && newQuiz.questions > 0) {
      setQuizzes([...quizzes, {
        id: quizzes.length + 1,
        ...newQuiz,
        participants: 0,
        completion: 0,
        status: 'Active'
      }]);
      setNewQuiz({ title: '', questions: 0, difficulty: 'Beginner' });
      setShowForm(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Training Quizzes</h1>
          <p className="text-slate-600">Create and manage staff training quizzes</p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-8 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Quiz
        </button>

        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-amber-600">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Create New Quiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Quiz Title"
                value={newQuiz.title}
                onChange={(e) => setNewQuiz({...newQuiz, title: e.target.value})}
                className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
              />
              <input
                type="number"
                placeholder="Number of Questions"
                value={newQuiz.questions}
                onChange={(e) => setNewQuiz({...newQuiz, questions: parseInt(e.target.value)})}
                className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
              />
              <select
                value={newQuiz.difficulty}
                onChange={(e) => setNewQuiz({...newQuiz, difficulty: e.target.value})}
                className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleAddQuiz}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all"
              >
                Create
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-slate-300 hover:bg-slate-400 text-slate-900 font-bold rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold">{quiz.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-purple-100">
                  <BookOpen className="w-4 h-4" />
                  <p className="text-sm">{quiz.questions} Questions</p>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{quiz.participants} Participants</span>
                    </div>
                    <span className="font-bold text-slate-900">{quiz.completion}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: `${quiz.completion}%`}}></div>
                  </div>
                </div>
                <div className="flex gap-2 pt-4 border-t border-slate-200">
                  <button className="flex-1 p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-all flex items-center justify-center gap-2">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="flex-1 p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all flex items-center justify-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
