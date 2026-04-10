import { Flame, Clock, MapPin, Phone, AlertTriangle, CheckCircle } from 'lucide-react'
import { useState } from 'react'

const urgentNeeds = [
  {
    id: 1,
    title: "Couvertures urgentes - Gare du Nord",
    description: "3 personnes dorment dehors sans couverture. Temperature prevue cette nuit : 2 degres.",
    location: "Gare du Nord, sortie est",
    time: "Il y a 30 min",
    priority: "critique",
    respondents: 1,
    needed: 2,
  },
  {
    id: 2,
    title: "Repas pour famille avec enfants",
    description: "Famille de 4 personnes (2 enfants) sans solution de repas pour ce soir. Orientee par le SAMU social.",
    location: "Local paroissial",
    time: "Il y a 1h",
    priority: "urgent",
    respondents: 0,
    needed: 1,
  },
  {
    id: 3,
    title: "Accompagnement hopital",
    description: "Pierre, habitue des maraudes, doit se rendre aux urgences mais ne peut pas y aller seul. Besoin d'un accompagnant.",
    location: "Place de la Republique",
    time: "Il y a 2h",
    priority: "urgent",
    respondents: 1,
    needed: 1,
  },
]

const priorityStyles = {
  critique: { badge: "bg-heart-500 text-white", border: "border-heart-200", pulse: true },
  urgent: { badge: "bg-warmth-500 text-white", border: "border-warmth-200", pulse: false },
}

export default function Urgences() {
  const [responded, setResponded] = useState({})

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-heart-100 rounded-xl flex items-center justify-center animate-pulse-warm">
            <Flame className="w-6 h-6 text-heart-500" />
          </div>
          <h1 className="text-3xl font-bold text-warmth-900 m-0">Flash Fraternite</h1>
        </div>
        <p className="text-warmth-700 text-lg">
          Besoins urgents en temps reel. Chaque minute compte.
        </p>
      </div>

      {/* Alert banner */}
      <div className="bg-heart-50 border border-heart-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-heart-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-heart-800 font-semibold text-sm m-0">Appels en cours</p>
          <p className="text-heart-700 text-sm m-0 mt-1">
            {urgentNeeds.length} besoin{urgentNeeds.length > 1 ? 's' : ''} urgent{urgentNeeds.length > 1 ? 's' : ''} en attente de reponse.
            Si vous pouvez aider, reagissez en un clic.
          </p>
        </div>
      </div>

      {/* Urgent needs list */}
      <div className="space-y-4">
        {urgentNeeds.map(need => {
          const style = priorityStyles[need.priority]
          const isResponded = responded[need.id]
          const isFulfilled = need.respondents + (isResponded ? 1 : 0) >= need.needed

          return (
            <div key={need.id} className={`bg-white rounded-2xl shadow-md border ${style.border} overflow-hidden`}>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${style.badge}`}>
                      {need.priority === 'critique' ? 'CRITIQUE' : 'URGENT'}
                    </span>
                    <span className="text-warmth-400 text-xs">{need.time}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-warmth-900 mb-2">{need.title}</h3>
                <p className="text-warmth-700 text-sm leading-relaxed mb-4">{need.description}</p>

                <div className="flex items-center gap-4 text-sm text-warmth-600 mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {need.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {need.time}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-warmth-500">
                    {need.respondents + (isResponded ? 1 : 0)}/{need.needed} repondant{need.needed > 1 ? 's' : ''}
                  </span>
                  <button
                    onClick={() => setResponded(prev => ({ ...prev, [need.id]: !prev[need.id] }))}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-sm cursor-pointer border-none transition-all flex items-center gap-2 ${
                      isResponded
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : isFulfilled
                          ? 'bg-warmth-100 text-warmth-400 cursor-default'
                          : 'bg-heart-500 text-white hover:bg-heart-600 shadow-md'
                    }`}
                  >
                    {isResponded ? (
                      <><CheckCircle className="w-4 h-4" /> J'y vais !</>
                    ) : isFulfilled ? (
                      'Couvert'
                    ) : (
                      <><Phone className="w-4 h-4" /> Je reponds</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
