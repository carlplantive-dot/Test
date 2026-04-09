import { useState } from 'react'
import { Link } from 'react-router-dom'
import { quizQuestions, quizResults } from '../data/parishData'
import { Heart, Users, Utensils, Flame, Home, ArrowRight, ArrowLeft, RotateCcw, Zap, Ear, ClipboardList, Palette, Clock, Sunset, CalendarDays, Infinity, UserPlus, User, Shuffle, Baby, Globe, Cross, Compass, Search, HandHeart } from 'lucide-react'

const iconMap = {
  zap: Zap,
  ear: Ear,
  clipboard: ClipboardList,
  palette: Palette,
  clock: Clock,
  sunset: Sunset,
  calendar: CalendarDays,
  infinity: Infinity,
  users: Users,
  'user-plus': UserPlus,
  user: User,
  shuffle: Shuffle,
  heart: Heart,
  home: Home,
  baby: Baby,
  globe: Globe,
  cross: Cross,
  compass: Compass,
  'hand-heart': HandHeart,
  search: Search,
}

const resultIconMap = {
  heart: Heart,
  users: Users,
  utensils: Utensils,
  flame: Flame,
  home: Home,
}

function getResult(answers) {
  const scores = { maraude: 0, parrainage: 0, repas: 0, priere: 0, accueil: 0 }

  // Question 1: personality type
  if (answers[0] === 'action') { scores.maraude += 3; scores.accueil += 1 }
  if (answers[0] === 'ecoute') { scores.parrainage += 3; scores.priere += 2 }
  if (answers[0] === 'orga') { scores.accueil += 3; scores.repas += 1 }
  if (answers[0] === 'creatif') { scores.repas += 3; scores.maraude += 1 }

  // Question 2: time
  if (answers[1] === '1h') { scores.priere += 3; scores.repas += 1 }
  if (answers[1] === 'soiree') { scores.maraude += 3; scores.repas += 2 }
  if (answers[1] === 'weekend') { scores.accueil += 2; scores.repas += 2 }
  if (answers[1] === 'long') { scores.parrainage += 3; scores.accueil += 2 }

  // Question 3: social pref
  if (answers[2] === 'equipe') { scores.maraude += 2; scores.repas += 2 }
  if (answers[2] === 'duo') { scores.parrainage += 3 }
  if (answers[2] === 'solo') { scores.priere += 3 }
  if (answers[2] === 'flexible') { scores.accueil += 2; scores.maraude += 1 }

  // Question 4: sensitivity
  if (answers[3] === 'solitude') { scores.parrainage += 2; scores.priere += 2 }
  if (answers[3] === 'rue') { scores.maraude += 3; scores.accueil += 1 }
  if (answers[3] === 'familles') { scores.repas += 2; scores.accueil += 2 }
  if (answers[3] === 'refugies') { scores.accueil += 2; scores.parrainage += 2 }

  // Question 5: faith
  if (answers[4] === 'pratiquant') { scores.priere += 2; scores.parrainage += 1 }
  if (answers[4] === 'chemin') { scores.maraude += 2; scores.repas += 1 }
  if (answers[4] === 'non-croyant') { scores.maraude += 2; scores.repas += 2 }
  if (answers[4] === 'sens') { scores.maraude += 1; scores.parrainage += 1; scores.repas += 1 }

  const topResult = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
  return quizResults[topResult]
}

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
    }
  }

  const restart = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
  }

  if (showResult) {
    const result = getResult(answers)
    const ResultIcon = resultIconMap[result.icon] || Heart

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="bg-white rounded-2xl shadow-xl border border-warmth-100 overflow-hidden">
          {/* Result header */}
          <div className="bg-gradient-to-r from-warmth-500 via-warmth-600 to-earth-500 p-8 text-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-warm">
              <ResultIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">{result.title}</h2>
            <p className="text-white/90 text-lg">{result.subtitle}</p>
          </div>

          {/* Result body */}
          <div className="p-6 sm:p-8">
            <p className="text-warmth-800 text-lg leading-relaxed mb-6">{result.description}</p>

            <div className="bg-warmth-50 rounded-xl p-4 mb-6">
              <h3 className="font-bold text-warmth-900 mb-3">Actions recommandees pour toi :</h3>
              <ul className="space-y-2">
                {result.actions.map((action, i) => (
                  <li key={i} className="flex items-center gap-2 text-warmth-700">
                    <ArrowRight className="w-4 h-4 text-warmth-500 flex-shrink-0" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/actions"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-warmth-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-warmth-600 transition-all shadow-md no-underline"
              >
                Voir les actions
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={restart}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-warmth-100 text-warmth-700 px-6 py-3 rounded-xl font-semibold hover:bg-warmth-200 transition-all cursor-pointer border-none"
              >
                <RotateCcw className="w-4 h-4" />
                Refaire le quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion) / quizQuestions.length) * 100

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-warmth-900 mb-2">Trouve ta mission</h1>
        <p className="text-warmth-700">Decouvre quelle mission de charite te correspond</p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-warmth-600 mb-2">
          <span>Question {currentQuestion + 1}/{quizQuestions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-warmth-100 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-warmth-400 to-warmth-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow-lg border border-warmth-100 p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-warmth-900 mb-6 text-center">{question.question}</h2>

        <div className="space-y-3">
          {question.options.map((option, i) => {
            const OptionIcon = iconMap[option.icon] || Heart
            return (
              <button
                key={i}
                onClick={() => handleAnswer(option.value)}
                className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-warmth-200 hover:border-warmth-400 hover:bg-warmth-50 transition-all text-left cursor-pointer bg-white group"
              >
                <div className="w-10 h-10 bg-warmth-100 rounded-lg flex items-center justify-center group-hover:bg-warmth-200 transition-colors flex-shrink-0">
                  <OptionIcon className="w-5 h-5 text-warmth-600" />
                </div>
                <span className="text-warmth-800 font-medium">{option.text}</span>
              </button>
            )
          })}
        </div>

        {currentQuestion > 0 && (
          <button
            onClick={handleBack}
            className="flex items-center gap-1 mt-6 text-warmth-500 hover:text-warmth-700 transition-colors cursor-pointer bg-transparent border-none font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Question precedente
          </button>
        )}
      </div>
    </div>
  )
}
