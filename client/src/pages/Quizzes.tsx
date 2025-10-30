import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Plus, Edit2, Trash2, Search, Play } from 'lucide-react';

interface Quiz {
  id: number;
  title: string;
  description: string;
  module: string;
  questions: number;
  difficulty: string;
  createdDate: string;
  passRate: number;
}

export default function Quizzes() {
  const [, setLocation] = useLocation();
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: 1,
      title: 'Food Safety Basics',
      description: 'Essential food safety and hygiene practices',
      module: 'Food Safety',
      questions: 25,
      difficulty: 'Beginner',
      createdDate: '2024-01-10',
      passRate: 92,
    },
    {
      id: 2,
      title: 'Customer Service Excellence',
      description: 'Best practices for customer interactions',
      module: 'Customer Service',
      questions: 20,
      difficulty: 'Intermediate',
      createdDate: '2024-02-15',
      passRate: 88,
    },
    {
      id: 3,
      title: 'Advanced Cooking Techniques',
      description: 'Professional cooking methods and standards',
      module: 'Cooking',
      questions: 30,
      difficulty: 'Advanced',
      createdDate: '2024-03-05',
      passRate: 75,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    module: '',
    difficulty: 'Beginner',
  });

  const filteredQuizzes = quizzes.filter(q =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddQuiz = () => {
    if (formData.title && formData.description) {
      if (editingId) {
        setQuizzes(quizzes.map(q => q.id === editingId ? {
          ...q,
          ...formData,
          questions: q.questions,
          passRate: q.passRate,
        } : q));
        setEditingId(null);
      } else {
        setQuizzes([...quizzes, {
          id: quizzes.length + 1,
          ...formData,
          questions: 25,
          createdDate: new Date().toISOString().split('T')[0],
          passRate: 0,
        }]);
      }
      setFormData({ title: '', description: '', module: '', difficulty: 'Beginner' });
      setShowForm(false);
    }
  };

  const handleEdit = (q: Quiz) => {
    setFormData({
      title: q.title,
      description: q.description,
      module: q.module,
      difficulty: q.difficulty,
    });
    setEditingId(q.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setQuizzes(quizzes.filter(q => q.id !== id));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f1419 0%, #1a1f2e 50%, #16213e 100%)',
      padding: '2rem',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
            }}>
              Quiz Management
            </h1>
            <p style={{ color: '#b8bcc4', marginTop: '0.5rem' }}>
              Create and manage training quizzes
            </p>
          </div>
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({ title: '', description: '', module: '', difficulty: 'Beginner' });
              setShowForm(!showForm);
            }}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #d4af37 0%, #aa8c2c 100%)',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
            }}
          >
            <Plus size={20} /> Create Quiz
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div style={{
            background: 'rgba(26, 31, 46, 0.8)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)',
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontFamily: "'Playfair Display', serif",
              color: '#d4af37',
              marginBottom: '1.5rem',
            }}>
              {editingId ? 'Edit Quiz' : 'Create New Quiz'}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem',
            }}>
              <input
                type="text"
                placeholder="Quiz Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(36, 45, 61, 0.5)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontFamily: "'Inter', sans-serif",
                }}
              />
              <input
                type="text"
                placeholder="Module"
                value={formData.module}
                onChange={(e) => setFormData({ ...formData, module: e.target.value })}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(36, 45, 61, 0.5)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontFamily: "'Inter', sans-serif",
                }}
              />
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(36, 45, 61, 0.5)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <textarea
              placeholder="Quiz Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(36, 45, 61, 0.5)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '6px',
                color: '#ffffff',
                fontFamily: "'Inter', sans-serif",
                minHeight: '100px',
                marginBottom: '1rem',
              }}
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={handleAddQuiz}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #d4af37 0%, #aa8c2c 100%)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {editingId ? 'Update' : 'Create'} Quiz
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ title: '', description: '', module: '', difficulty: 'Beginner' });
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(212, 175, 55, 0.1)',
                  color: '#d4af37',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '6px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Search */}
        <div style={{ marginBottom: '2rem', position: 'relative' }}>
          <Search style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#d4af37',
          }} />
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.5rem',
              background: 'rgba(36, 45, 61, 0.5)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '8px',
              color: '#ffffff',
              fontFamily: "'Inter', sans-serif",
            }}
          />
        </div>

        {/* Quizzes Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}>
          {filteredQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              style={{
                background: 'rgba(26, 31, 46, 0.6)',
                border: '1px solid rgba(212, 175, 55, 0.1)',
                borderRadius: '12px',
                padding: '1.5rem',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(26, 31, 46, 0.8)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(26, 31, 46, 0.6)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.1)';
              }}
            >
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontFamily: "'Playfair Display', serif",
                  color: '#d4af37',
                  margin: '0 0 0.5rem 0',
                }}>
                  {quiz.title}
                </h3>
                <p style={{
                  color: '#b8bcc4',
                  margin: '0.5rem 0',
                  fontSize: '0.9rem',
                }}>
                  {quiz.description}
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
              }}>
                <div>
                  <span style={{ color: '#b8bcc4', fontSize: '0.8rem' }}>Module</span>
                  <p style={{ color: '#ffffff', margin: '0.25rem 0 0 0', fontWeight: 600 }}>
                    {quiz.module}
                  </p>
                </div>
                <div>
                  <span style={{ color: '#b8bcc4', fontSize: '0.8rem' }}>Difficulty</span>
                  <p style={{
                    color: quiz.difficulty === 'Beginner' ? '#4caf50' : quiz.difficulty === 'Intermediate' ? '#ff9800' : '#f44336',
                    margin: '0.25rem 0 0 0',
                    fontWeight: 600,
                  }}>
                    {quiz.difficulty}
                  </p>
                </div>
                <div>
                  <span style={{ color: '#b8bcc4', fontSize: '0.8rem' }}>Questions</span>
                  <p style={{ color: '#ffffff', margin: '0.25rem 0 0 0', fontWeight: 600 }}>
                    {quiz.questions}
                  </p>
                </div>
                <div>
                  <span style={{ color: '#b8bcc4', fontSize: '0.8rem' }}>Pass Rate</span>
                  <p style={{ color: '#d4af37', margin: '0.25rem 0 0 0', fontWeight: 600 }}>
                    {quiz.passRate}%
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'space-between',
              }}>
                <button
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    background: 'linear-gradient(135deg, #d4af37 0%, #aa8c2c 100%)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                  }}
                >
                  <Play size={16} /> Take Quiz
                </button>
                <button
                  onClick={() => handleEdit(quiz)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(52, 152, 219, 0.2)',
                    color: '#3498db',
                    border: '1px solid rgba(52, 152, 219, 0.3)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(quiz.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(244, 67, 54, 0.2)',
                    color: '#f44336',
                    border: '1px solid rgba(244, 67, 54, 0.3)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredQuizzes.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: '#b8bcc4',
            padding: '3rem',
          }}>
            No quizzes found. Create your first quiz to get started!
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => setLocation('/dashboard')}
          style={{
            marginTop: '2rem',
            padding: '0.75rem 1.5rem',
            background: 'rgba(212, 175, 55, 0.1)',
            color: '#d4af37',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

