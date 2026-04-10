import { useState } from 'react'
import { Link } from 'react-router-dom'
import { quizQuestions, missions } from '../data/parishData'
import { HelpCircle, ArrowRight, ArrowLeft, CheckCircle, Heart, Utensils, Users, BookOpen, RotateCcw } from 'lucide-react'

const iconMap = {
  heart: Heart,
  utensils: Utensils,
  users: Users,
  book: BookOpen,
}

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      computeResult()
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const computeResult = () => {
    const values = Object.values(answers)
    if (values.includes('terrain') || values.includes('nuit')) {
      setResult(missions.find(m => m.id === 'maraudeur'))
    } else if (values.includes('cuisine')) {
      setResult(missions.find(m => m.id === 'cuisinier'))
    } else if (values.includes('ecoute')) {
      setResult(missions.find(m => m.id === 'accueillant'))
    } else {
      setResult(missions.find(m => m.id === 'organisateur'))
    }
  }

  const restart = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setResult(null)
  }

  if (result) {
    const Icon = iconMap[result.icon] || Heart
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-warmth-900 mb-2">Votre mission</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-warmth-100 p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-warmth-500 to-earth-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-warmth-900 mb-3">{result.title}</h2>
          <p className="text-warmth-700 leading-relaxed mb-6">{result.description}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/actions"
              className="inline-flex items-center gap-2 bg-warmth-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-warmth-600 transition-all no-underline"
            >
              Voir les actions <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={restart}
              className="inline-flex items-center gap-2 bg-warmth-100 text-warmth-700 px-6 py-3 rounded-xl font-semibold hover:bg-warmth-200 transition-all cursor-pointer border-none"
            >
              <RotateCcw className="w-4 h-4" /> Recommencer
            </button>
          </div>
        </div>
      </div>
    )
  }

  const question = quizQuestions[currentQuestion]
  const hasAnswer = answers[question.id]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center mb-8">
        <HelpCircle className="w-12 h-12 text-warmth-500 mx-auto mb-3" />
        <h1 className="text-3xl font-bold text-warmth-900 mb-2">Trouver ma mission</h1>
        <p className="text-warmth-600">Question {currentQuestion + 1} sur {quizQuestions.length}</p>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-warmth-100 rounded-full h-2 mb-8">
        <div
          className="bg-gradient-to-r from-warmth-400 to-warmth-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-warmth-100 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-warmth-900 mb-6">{question.question}</h2>
        <div className="space-y-3">
          {question.options.map(option => (
            <button
              key={option.value}
              onClick={() => handleAnswer(question.id, option.value)}
              className={`w-full text-left px-5 py-4 rounded-xl font-medium transition-all cursor-pointer border-2 ${
                answers[question.id] === option.value
                  ? 'border-warmth-500 bg-warmth-50 text-warmth-800'
                  : 'border-warmth-100 bg-white text-warmth-700 hover:border-warmth-300 hover:bg-warmth-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all cursor-pointer border-none bg-warmth-100 text-warmth-700 hover:bg-warmth-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" /> Precedent
          </button>
          <button
            onClick={handleNext}
            disabled={!hasAnswer}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all cursor-pointer border-none bg-warmth-500 text-white hover:bg-warmth-600 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Voir mon resultat' : 'Suivant'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
