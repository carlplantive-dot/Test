import { useState } from 'react'
import { actions } from '../data/parishData'
import { Heart, Utensils, Moon, Shirt, Church, Users, Home, BookOpen, MapPin, Clock, UserPlus, Filter, CheckCircle } from 'lucide-react'

const iconMap = {
  heart: Heart,
  utensils: Utensils,
  moon: Moon,
  shirt: Shirt,
  church: Church,
  users: Users,
  home: Home,
  book: BookOpen,
}

const typeLabels = {
  maraude: { label: "Maraude", color: "bg-heart-100 text-heart-700" },
  repas: { label: "Repas fraternel", color: "bg-warmth-100 text-warmth-700" },
  evenement: { label: "Evenement", color: "bg-earth-100 text-earth-700" },
  service: { label: "Service", color: "bg-spirit-100 text-spirit-700" },
  messe: { label: "Messe speciale", color: "bg-warmth-100 text-warmth-800" },
  formation: { label: "Formation", color: "bg-spirit-100 text-spirit-700" },
  hebergement: { label: "Hebergement", color: "bg-heart-100 text-heart-800" },
}

const filterOptions = [
  { value: "all", label: "Tout voir" },
  { value: "maraude", label: "Maraudes" },
  { value: "repas", label: "Repas" },
  { value: "evenement", label: "Evenements" },
  { value: "formation", label: "Formations" },
  { value: "service", label: "Services" },
  { value: "hebergement", label: "Hebergement" },
  { value: "messe", label: "Messes" },
]

export default function Actions() {
  const [filter, setFilter] = useState("all")
  const [signedUp, setSignedUp] = useState({})

  const filteredActions = filter === "all" ? actions : actions.filter(a => a.type === filter)

  const handleSignUp = (id) => {
    setSignedUp(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-warmth-900 mb-2">Actions de la paroisse</h1>
        <p className="text-warmth-700 text-lg">
          Decouvrez toutes les actions de charite et inscrivez-vous en un clic.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-warmth-500 flex-shrink-0" />
        {filterOptions.map(option => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer border-none ${
              filter === option.value
                ? 'bg-warmth-500 text-white shadow-md'
                : 'bg-white text-warmth-700 hover:bg-warmth-100 border border-warmth-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Actions grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActions.map(action => {
          const Icon = iconMap[action.icon] || Heart
          const typeInfo = typeLabels[action.type] || typeLabels.service
          const spotsLeft = action.spotsNeeded - action.spotsFilled
          const isSignedUp = signedUp[action.id]

          return (
            <div key={action.id} className="bg-white rounded-2xl shadow-md border border-warmth-100 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Card header */}
              <div className="bg-gradient-to-r from-warmth-500 to-earth-500 p-4 flex items-start gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${typeInfo.color} mb-1`}>
                    {typeInfo.label}
                  </span>
                  <h3 className="text-white font-bold text-sm leading-tight m-0">{action.title}</h3>
                </div>
              </div>

              {/* Card body */}
              <div className="p-4">
                <p className="text-warmth-700 text-sm leading-relaxed mb-4">{action.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-warmth-600">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>{action.date} - {action.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-warmth-600">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{action.location}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-warmth-600">{action.spotsFilled}/{action.spotsNeeded} inscrits</span>
                    <span className={`font-medium ${spotsLeft <= 2 ? 'text-heart-500' : 'text-warmth-500'}`}>
                      {spotsLeft} place{spotsLeft > 1 ? 's' : ''} restante{spotsLeft > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="w-full bg-warmth-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-warmth-400 to-warmth-500 h-2 rounded-full transition-all"
                      style={{ width: `${(action.spotsFilled / action.spotsNeeded) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {action.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-warmth-50 text-warmth-600 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Sign up button */}
                <button
                  onClick={() => handleSignUp(action.id)}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer border-none flex items-center justify-center gap-2 ${
                    isSignedUp
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-warmth-500 text-white hover:bg-warmth-600 shadow-md hover:shadow-lg'
                  }`}
                >
                  {isSignedUp ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Inscrit ! Merci
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      Je m'inscris
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {filteredActions.length === 0 && (
        <div className="text-center py-16">
          <p className="text-warmth-500 text-lg">Aucune action trouvee pour ce filtre.</p>
        </div>
      )}
    </div>
  )
}
