// Training Modules Data Structure
export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  uploadedBy: string;
  uploadedDate: string;
  store: string;
  quizId?: string;
  isDefault: boolean;
  status: 'active' | 'archived';
  completionRate?: number;
  totalStaff?: number;
  completedStaff?: number;
}

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  totalQuestions: number;
  passingScore: number;
  questions: QuizQuestion[];
  createdDate: string;
  createdBy: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

// Default Training Modules for all stores
export const DEFAULT_MODULES: TrainingModule[] = [
  {
    id: 'module-001',
    title: 'Basic Conditions of Employment',
    description: 'Essential information about employment rights, responsibilities, and workplace policies. Covers contract terms, working hours, leave entitlements, and disciplinary procedures.',
    category: 'HR & Compliance',
    fileUrl: '/modules/basic-conditions-employment.pdf',
    uploadedBy: 'System Admin',
    uploadedDate: '2024-01-15',
    store: 'All Stores',
    isDefault: true,
    status: 'active',
    completionRate: 92,
    totalStaff: 150,
    completedStaff: 138
  },
  {
    id: 'module-002',
    title: 'Storage Handling Procedures',
    description: 'Comprehensive guide to proper food storage, temperature control, and inventory management. Includes best practices for dry storage, refrigeration, and freezer management.',
    category: 'Food Safety',
    fileUrl: '/modules/storage-handling-procedures.pdf',
    uploadedBy: 'System Admin',
    uploadedDate: '2024-01-15',
    store: 'All Stores',
    quizId: 'quiz-002',
    isDefault: true,
    status: 'active',
    completionRate: 87,
    totalStaff: 150,
    completedStaff: 131
  },
  {
    id: 'module-003',
    title: 'Temperature Check Procedures',
    description: 'Critical procedures for monitoring and recording food temperatures. Covers thermometer usage, temperature logs, and corrective actions for temperature deviations.',
    category: 'Food Safety',
    fileUrl: '/modules/temperature-check-procedures.pdf',
    uploadedBy: 'System Admin',
    uploadedDate: '2024-01-15',
    store: 'All Stores',
    quizId: 'quiz-003',
    isDefault: true,
    status: 'active',
    completionRate: 89,
    totalStaff: 150,
    completedStaff: 134
  },
  {
    id: 'module-004',
    title: 'Food Safety Manual',
    description: 'Complete food safety guidelines covering hygiene, contamination prevention, allergen management, and HACCP principles. Essential for all food handling staff.',
    category: 'Food Safety',
    fileUrl: '/modules/food-safety-manual.pdf',
    uploadedBy: 'System Admin',
    uploadedDate: '2024-01-15',
    store: 'All Stores',
    quizId: 'quiz-004',
    isDefault: true,
    status: 'active',
    completionRate: 94,
    totalStaff: 150,
    completedStaff: 141
  },
  {
    id: 'module-005',
    title: 'Customer Service & Five Steps of Service',
    description: 'Professional customer service standards and the five-step service methodology. Covers greeting, ordering, serving, clearing, and closing interactions with guests.',
    category: 'Service Excellence',
    fileUrl: '/modules/customer-service-five-steps.pdf',
    uploadedBy: 'System Admin',
    uploadedDate: '2024-01-15',
    store: 'All Stores',
    isDefault: true,
    status: 'active',
    completionRate: 88,
    totalStaff: 150,
    completedStaff: 132
  },
  {
    id: 'module-006',
    title: 'Emergency Procedures',
    description: 'Critical emergency response procedures including evacuation routes, emergency contacts, first aid basics, and incident reporting. Required for all staff.',
    category: 'Safety & Security',
    fileUrl: '/modules/emergency-procedures.pdf',
    uploadedBy: 'System Admin',
    uploadedDate: '2024-01-15',
    store: 'All Stores',
    isDefault: true,
    status: 'active',
    completionRate: 91,
    totalStaff: 150,
    completedStaff: 137
  }
];

// Sample quiz for Storage Handling Procedures
export const SAMPLE_QUIZ: Quiz = {
  id: 'quiz-002',
  moduleId: 'module-002',
  title: 'Storage Handling Procedures Quiz',
  totalQuestions: 25,
  passingScore: 80,
  createdDate: '2024-01-15',
  createdBy: 'System Admin',
  questions: [
    {
      id: 'q1',
      question: 'What is the ideal temperature range for refrigerated food storage?',
      options: ['0-4°C', '5-10°C', '10-15°C', '15-20°C'],
      correctAnswer: '0-4°C',
      explanation: 'Refrigerated foods should be stored at 0-4°C (32-39°F) to prevent bacterial growth.'
    },
    {
      id: 'q2',
      question: 'How should raw meat be stored in relation to other foods?',
      options: ['On the top shelf', 'On the bottom shelf', 'Next to vegetables', 'In the door compartment'],
      correctAnswer: 'On the bottom shelf',
      explanation: 'Raw meat should always be stored on the bottom shelf to prevent cross-contamination.'
    },
    {
      id: 'q3',
      question: 'What is the maximum storage time for opened canned goods?',
      options: ['1 day', '3 days', '5 days', '1 week'],
      correctAnswer: '3 days',
      explanation: 'Opened canned goods should be transferred to containers and used within 3 days.'
    },
    {
      id: 'q4',
      question: 'How should dry goods be stored?',
      options: ['In original packaging', 'In airtight containers', 'In the refrigerator', 'In direct sunlight'],
      correctAnswer: 'In airtight containers',
      explanation: 'Dry goods should be stored in airtight containers in a cool, dry place away from pests.'
    },
    {
      id: 'q5',
      question: 'What is the correct storage position for frozen foods?',
      options: ['-5°C or above', '-10°C or below', '-18°C or below', '-25°C or below'],
      correctAnswer: '-18°C or below',
      explanation: 'Frozen foods should be stored at -18°C (-0.4°F) or below to maintain quality and safety.'
    }
  ]
};

