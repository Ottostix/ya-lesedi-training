import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navbar from '@/components/Navbar';

const API_BASE_URL = 'https://ya-lesedi-backend.onrender.com/api';

export default function Quizzes({ onLogout, currentUser }: any) {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<any>({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [newQuiz, setNewQuiz] = useState({ title: '', description: '', store_id: '', total_questions: 10, passing_score: 70 });
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    loadQuizzes();
    loadStores();
  }, []);

  const loadQuizzes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/quizzes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setQuizzes(data.quizzes || []);
      }
    } catch (error) {
      console.error('Error loading quizzes:', error);
      setMessage({ type: 'error', text: 'Failed to load quizzes' });
    } finally {
      setIsLoading(false);
    }
  };

  const loadStores = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stores`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStores(data.stores || []);
      }
    } catch (error) {
      console.error('Error loading stores:', error);
    }
  };

  const handleCreateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newQuiz)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Quiz created successfully!' });
        setNewQuiz({ title: '', description: '', store_id: '', total_questions: 10, passing_score: 70 });
        setShowForm(false);
        loadQuizzes();
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to create quiz' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection error' });
    }
  };

  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.store_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar currentUser={currentUser} onLogout={onLogout} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Quiz Management</h1>
            <p className="text-slate-600 mt-1">Create and manage training quizzes</p>
          </div>
          {(currentUser?.role === 'master' || currentUser?.role === 'manager') && (
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-amber-600 hover:bg-amber-700"
            >
              {showForm ? 'Cancel' : 'Create Quiz'}
            </Button>
          )}
        </div>

        {message.text && (
          <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className="mb-4">
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {showForm && (currentUser?.role === 'master' || currentUser?.role === 'manager') && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create New Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateQuiz} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Quiz Title</label>
                  <Input
                    type="text"
                    placeholder="Quiz Title"
                    value={newQuiz.title}
                    onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    placeholder="Quiz Description"
                    value={newQuiz.description}
                    onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Select Store</label>
                    <select
                      value={newQuiz.store_id}
                      onChange={(e) => setNewQuiz({ ...newQuiz, store_id: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-md"
                      required
                    >
                      <option value="">Choose a store...</option>
                      {stores.map(store => (
                        <option key={store.id} value={store.id}>{store.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Total Questions</label>
                    <Input
                      type="number"
                      min="1"
                      value={newQuiz.total_questions}
                      onChange={(e) => setNewQuiz({ ...newQuiz, total_questions: parseInt(e.target.value) })}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Passing Score (%)</label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={newQuiz.passing_score}
                      onChange={(e) => setNewQuiz({ ...newQuiz, passing_score: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                  Create Quiz
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Quizzes List</CardTitle>
            <CardDescription>Total quizzes: {quizzes.length}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Search quizzes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-slate-200"
              />
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
              </div>
            ) : filteredQuizzes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredQuizzes.map((quiz: any) => (
                  <div key={quiz.id} className="p-4 border border-slate-200 rounded-lg hover:border-amber-300 hover:shadow-md transition">
                    <h3 className="font-semibold text-slate-900 text-lg">{quiz.title}</h3>
                    <p className="text-sm text-slate-600 mt-2">{quiz.description}</p>
                    <p className="text-sm text-slate-600 mt-2">Store: <span className="font-medium">{quiz.store_name}</span></p>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                      <span className="text-xs text-slate-500">{quiz.total_questions} questions</span>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">Pass: {quiz.passing_score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                No quizzes found
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

