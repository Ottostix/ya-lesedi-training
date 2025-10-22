import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Textarea } from '@/components/ui/textarea'
import { Upload, Loader, CheckCircle, AlertCircle } from 'lucide-react'
import { generateQuizFromDocument } from '@/services/quizService'

const AIQuizGenerator = ({ onQuizGenerated = null }) => {
  const [documentText, setDocumentText] = useState('')
  const [documentTitle, setDocumentTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [generatedQuiz, setGeneratedQuiz] = useState(null)
  const [file, setFile] = useState(null)

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files?.[0]
    if (!uploadedFile) return

    setFile(uploadedFile)
    setDocumentTitle(uploadedFile.name.replace(/\.[^/.]+$/, ''))

    // Read file content
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result
      if (typeof content === 'string') {
        setDocumentText(content)
        setError('')
      }
    }
    reader.onerror = () => {
      setError('Failed to read file. Please try again.')
    }
    reader.readAsText(uploadedFile)
  }

  const handleGenerateQuiz = async () => {
    if (!documentText.trim()) {
      setError('Please upload a document or enter text to generate a quiz.')
      return
    }

    if (!documentTitle.trim()) {
      setError('Please provide a title for the quiz.')
      return
    }

    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const result = await generateQuizFromDocument(documentText, documentTitle)

      if (result.success) {
        setGeneratedQuiz(result)
        setSuccess(`Successfully generated ${result.totalQuestions} questions for your quiz!`)

        if (onQuizGenerated) {
          onQuizGenerated({
            title: documentTitle,
            questions: result.questions,
            totalQuestions: result.totalQuestions,
            estimatedTime: result.estimatedTime
          })
        }
      } else {
        setError(result.error || 'Failed to generate quiz. Please try again.')
      }
    } catch (err) {
      setError('An error occurred while generating the quiz. Please try again.')
      console.error('Quiz generation error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setDocumentText('')
    setDocumentTitle('')
    setFile(null)
    setGeneratedQuiz(null)
    setError('')
    setSuccess('')
  }

  return (
    <div className="space-y-6">
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5 text-amber-600" />
            <span>AI-Powered Quiz Generator</span>
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            Upload a training document and our AI will automatically generate 25 comprehensive quiz questions.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700 ml-2">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700 ml-2">
                {success}
              </AlertDescription>
            </Alert>
          )}

          {/* Document Upload Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quiz Title
              </label>
              <Input
                type="text"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                placeholder="e.g., Food Safety Manual, Customer Service Training"
                className="h-10 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Document (PDF, Word, or Text)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-amber-400 transition-colors">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: PDF, Word, Text (Max 10MB)
                  </p>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or Paste Document Text
              </label>
              <Textarea
                value={documentText}
                onChange={(e) => setDocumentText(e.target.value)}
                placeholder="Paste your training material here..."
                className="min-h-48 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleGenerateQuiz}
              disabled={isLoading || !documentText.trim()}
              className="luxury-button text-white font-semibold flex-1"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader className="h-4 w-4 animate-spin mr-2" />
                  Generating Quiz...
                </div>
              ) : (
                'Generate Quiz'
              )}
            </Button>

            {(documentText || file) && (
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Generated Quiz Preview */}
      {generatedQuiz && (
        <Card className="luxury-card border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="text-green-900">Quiz Generated Successfully!</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Questions</p>
                <p className="text-2xl font-bold text-amber-600">{generatedQuiz.totalQuestions}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600">Estimated Time</p>
                <p className="text-2xl font-bold text-amber-600">{generatedQuiz.estimatedTime} min</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600">Passing Score</p>
                <p className="text-2xl font-bold text-amber-600">80%</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Sample Questions:</h4>
              <div className="space-y-3">
                {generatedQuiz.questions.slice(0, 3).map((question, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-medium text-gray-900">
                      Q{question.questionNumber}: {question.question}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Difficulty: <span className="capitalize">{question.difficulty}</span>
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">
                ... and {generatedQuiz.totalQuestions - 3} more questions
              </p>
            </div>

            <Button className="w-full luxury-button text-white font-semibold">
              Review & Publish Quiz
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AIQuizGenerator

