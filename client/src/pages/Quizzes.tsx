import { useState } from 'react';
import { Trash2, Edit2, Plus, Search, BookOpen, Users, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Quiz {
  id: string;
  title: string;
  category: string;
  questions: number;
  passingScore: number;
  timeLimit: number;
  assignedTo: number;
  completed: number;
  status: 'active' | 'inactive';
  createdDate: string;
}

export default function Quizzes({ onLogout, currentUser }: any) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'Food Safety Fundamentals',
      category: 'Safety',
      questions: 25,
      passingScore: 70,
      timeLimit: 30,
      assignedTo: 342,
      completed: 298,
      status: 'active',
      createdDate: '2024-01-15',
    },
    {
      id: '2',
      title: 'Customer Service Excellence',
      category: 'Service',
      questions: 20,
      passingScore: 75,
      timeLimit: 25,
      assignedTo: 342,
      completed: 267,
      status: 'active',
      createdDate: '2024-02-10',
    },
    {
      id: '3',
      title: 'Wine Pairing Basics',
      category: 'Knowledge',
      questions: 15,
      passingScore: 65,
      timeLimit: 20,
      assignedTo: 156,
      completed: 148,
      status: 'active',
      createdDate: '2024-03-05',
    },
    {
      id: '4',
      title: 'Emergency Procedures',
      category: 'Safety',
      questions: 30,
      passingScore: 80,
      timeLimit: 35,
      assignedTo: 342,
      completed: 312,
      status: 'active',
      createdDate: '2024-01-20',
    },
    {
      id: '5',
      title: 'POS System Training',
      category: 'Technical',
      questions: 18,
      passingScore: 70,
      timeLimit: 25,
      assignedTo: 200,
      completed: 187,
      status: 'active',
      createdDate: '2024-02-28',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Quiz, 'id' | 'assignedTo' | 'completed'>>({
    title: '',
    category: 'Safety',
    questions: 20,
    passingScore: 70,
    timeLimit: 30,
    status: 'active',
    createdDate: new Date().toISOString().split('T')[0],
  });

  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddQuiz = () => {
    if (!formData.title || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingId) {
      setQuizzes(quizzes.map(q => q.id === editingId ? { ...q, ...formData } : q));
      setEditingId(null);
    } else {
      const newQuiz: Quiz = {
        id: Date.now().toString(),
        ...formData,
        assignedTo: 0,
        completed: 0,
      };
      setQuizzes([...quizzes, newQuiz]);
    }

    setFormData({
      title: '',
      category: 'Safety',
      questions: 20,
      passingScore: 70,
      timeLimit: 30,
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0],
    });
    setShowForm(false);
  };

  const handleEditQuiz = (quiz: Quiz) => {
    setFormData({
      title: quiz.title,
      category: quiz.category,
      questions: quiz.questions,
      passingScore: quiz.passingScore,
      timeLimit: quiz.timeLimit,
      status: quiz.status,
      createdDate: quiz.createdDate,
    });
    setEditingId(quiz.id);
    setShowForm(true);
  };

  const handleDeleteQuiz = (id: string) => {
    if (confirm('Are you sure you want to delete this quiz?')) {
      setQuizzes(quizzes.filter(q => q.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar currentUser={currentUser} onLogout={onLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Quiz Management</h1>
            <p className="text-slate-600 mt-2">Create and manage training quizzes</p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setFormData({
                title: '',
                category: 'Safety',
                questions: 20,
                passingScore: 70,
                timeLimit: 30,
                status: 'active',
                createdDate: new Date().toISOString().split('T')[0],
              });
            }}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition"
          >
            <Plus size={20} /> Create Quiz
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
            />
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {editingId ? 'Edit Quiz' : 'Create New Quiz'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Quiz Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Food Safety Fundamentals"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                >
                  <option value="Safety">Safety</option>
                  <option value="Service">Service</option>
                  <option value="Knowledge">Knowledge</option>
                  <option value="Technical">Technical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Questions</label>
                <input
                  type="number"
                  value={formData.questions}
                  onChange={(e) => setFormData({ ...formData, questions: parseInt(e.target.value) || 0 })}
                  placeholder="20"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Passing Score (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.passingScore}
                  onChange={(e) => setFormData({ ...formData, passingScore: parseInt(e.target.value) || 70 })}
                  placeholder="70"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Time Limit (minutes)</label>
                <input
                  type="number"
                  value={formData.timeLimit}
                  onChange={(e) => setFormData({ ...formData, timeLimit: parseInt(e.target.value) || 30 })}
                  placeholder="30"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddQuiz}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition"
              >
                {editingId ? 'Update' : 'Create'} Quiz
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 px-6 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-4 text-white">
                <h3 className="text-lg font-bold">{quiz.title}</h3>
                <p className="text-amber-100 text-sm">{quiz.category}</p>
              </div>
              <div className="p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <BookOpen size={18} className="text-amber-600" />
                    <span>{quiz.questions} Questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock size={18} className="text-amber-600" />
                    <span>{quiz.timeLimit} Minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users size={18} className="text-amber-600" />
                    <span>{quiz.completed}/{quiz.assignedTo} Completed</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600">Completion Rate</span>
                    <span className="font-bold text-amber-600">{Math.round((quiz.completed / quiz.assignedTo) * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-amber-600 h-2 rounded-full"
                      style={{ width: `${(quiz.completed / quiz.assignedTo) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Passing Score: {quiz.passingScore}%</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditQuiz(quiz)}
                    className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteQuiz(quiz.id)}
                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredQuizzes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No quizzes found</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm font-medium">Total Quizzes</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{quizzes.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm font-medium">Total Questions</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{quizzes.reduce((sum, q) => sum + q.questions, 0)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm font-medium">Avg Completion</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {Math.round(quizzes.reduce((sum, q) => sum + (q.completed / q.assignedTo), 0) / quizzes.length * 100)}%
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
