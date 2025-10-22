// Quiz Service - Handles quiz generation and management
// This service integrates with OpenAI API to generate quizzes from documents

const QUIZ_CATEGORIES = [
  'Food Safety',
  'OHS (Occupational Health & Safety)',
  'Employee Labor Law',
  'Restaurant 5-Star Procedures',
  'Cleaning & Sanitation',
  'Emergency Procedures',
  'Temperature Control',
  'Storage Control',
  'Customer Service',
  'Basic Conditions of Employment'
]

const DEFAULT_QUIZZES = [
  {
    id: 'quiz-1',
    title: 'Basic Conditions of Employment',
    category: 'Employee Labor Law',
    questions: 25,
    passingScore: 80,
    description: 'Understand your employment rights and responsibilities'
  },
  {
    id: 'quiz-2',
    title: 'Storage Handling Procedures',
    category: 'Storage Control',
    questions: 25,
    passingScore: 80,
    description: 'Learn proper food storage and inventory management'
  },
  {
    id: 'quiz-3',
    title: 'Temperature Check Procedures',
    category: 'Temperature Control',
    questions: 25,
    passingScore: 80,
    description: 'Master temperature monitoring and food safety'
  },
  {
    id: 'quiz-4',
    title: 'Food Safety Manual',
    category: 'Food Safety',
    questions: 25,
    passingScore: 80,
    description: 'Comprehensive food safety and hygiene standards'
  },
  {
    id: 'quiz-5',
    title: 'Customer Service & Five Steps of Service',
    category: 'Customer Service',
    questions: 25,
    passingScore: 80,
    description: 'Excellence in customer service delivery'
  },
  {
    id: 'quiz-6',
    title: 'Emergency Procedures',
    category: 'Emergency Procedures',
    questions: 25,
    passingScore: 80,
    description: 'Safety protocols and emergency response'
  }
]

// Generate quiz questions from document text using OpenAI
export const generateQuizFromDocument = async (documentText, documentTitle) => {
  try {
    // In production, this would call the OpenAI API
    // For now, we'll create a mock implementation
    
    const mockQuestions = generateMockQuestions(documentText, documentTitle)
    
    return {
      success: true,
      questions: mockQuestions,
      totalQuestions: mockQuestions.length,
      estimatedTime: mockQuestions.length * 2 // 2 minutes per question
    }
  } catch (error) {
    console.error('Error generating quiz:', error)
    return {
      success: false,
      error: 'Failed to generate quiz from document'
    }
  }
}

// Generate mock questions for demonstration
const generateMockQuestions = (documentText, documentTitle) => {
  const questions = []
  const keywords = extractKeywords(documentText)
  
  // Generate 25 questions
  for (let i = 0; i < 25; i++) {
    const keyword = keywords[i % keywords.length] || 'topic'
    questions.push({
      id: `q-${i + 1}`,
      questionNumber: i + 1,
      question: `What is the correct procedure regarding ${keyword}?`,
      options: [
        `Option A: First approach to ${keyword}`,
        `Option B: Second approach to ${keyword}`,
        `Option C: Third approach to ${keyword}`,
        `Option D: Fourth approach to ${keyword}`
      ],
      correctAnswer: 'Option B', // Mock correct answer
      explanation: `The correct answer is Option B because it aligns with best practices for ${keyword} as outlined in the training material.`,
      difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)],
      category: identifyCategory(documentTitle)
    })
  }
  
  return questions
}

// Extract keywords from document text
const extractKeywords = (text) => {
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'is', 'are', 'was', 'were', 'be', 'been', 'being'])
  const words = text.toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 4 && !commonWords.has(word))
    .slice(0, 30)
  
  return [...new Set(words)]
}

// Identify quiz category from document title
const identifyCategory = (title) => {
  const lowerTitle = title.toLowerCase()
  
  for (const category of QUIZ_CATEGORIES) {
    if (lowerTitle.includes(category.toLowerCase())) {
      return category
    }
  }
  
  return 'General Knowledge'
}

// Get all default quizzes
export const getDefaultQuizzes = () => {
  return DEFAULT_QUIZZES
}

// Get quiz by ID
export const getQuizById = (quizId) => {
  return DEFAULT_QUIZZES.find(quiz => quiz.id === quizId)
}

// Calculate quiz score
export const calculateQuizScore = (answers, correctAnswers) => {
  let correctCount = 0
  
  answers.forEach((answer, index) => {
    if (answer === correctAnswers[index]) {
      correctCount++
    }
  })
  
  const percentage = Math.round((correctCount / correctAnswers.length) * 100)
  const passed = percentage >= 80
  
  return {
    score: percentage,
    correctCount,
    totalQuestions: correctAnswers.length,
    passed,
    grade: getGrade(percentage)
  }
}

// Get letter grade based on percentage
const getGrade = (percentage) => {
  if (percentage >= 90) return 'A'
  if (percentage >= 80) return 'B'
  if (percentage >= 70) return 'C'
  if (percentage >= 60) return 'D'
  return 'F'
}

// Generate certificate data
export const generateCertificateData = (staffMember, quiz, score) => {
  return {
    certificateId: `CERT-${Date.now()}`,
    staffName: staffMember.name,
    staffSurname: staffMember.surname,
    quizTitle: quiz.title,
    score: score.score,
    grade: score.grade,
    issueDate: new Date().toLocaleDateString(),
    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString(), // Valid for 1 year
    certificateUrl: `https://ya-lesedi-training.com/certificates/${Date.now()}.pdf`
  }
}

export default {
  generateQuizFromDocument,
  getDefaultQuizzes,
  getQuizById,
  calculateQuizScore,
  generateCertificateData,
  QUIZ_CATEGORIES
}

