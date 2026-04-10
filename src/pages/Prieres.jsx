import { useState } from 'react'
import { BookOpen, Heart, Send, Plus } from 'lucide-react'

const initialPrayers = [
  {
    id: 1,
    text: "Pour Marie, rencontree vendredi dernier pres de la gare. Qu'elle trouve un toit et retrouve l'espoir.",
    author: "Sophie",
    date: "Il y a 2 jours",
    hearts: 12,
  },
  {
    id: 2,
    text: "Pour tous les benevoles qui sortent ce soir en maraude. Que leur presence soit lumiere dans la nuit.",
    author: "Pere Thomas",
    date: "Il y a 3 jours",
    hearts: 24,
  },
  {
    id: 3,
    text: "Pour Jean-Pierre qui a perdu son emploi et dort dans sa voiture. Seigneur, montre-lui un chemin.",
    author: "Lucas",
    date: "Il y a 5 jours",
    hearts: 18,
  },
  {
    id: 4,
    text: "Pour les familles accueillies au repas fraternel de dimanche. Que cette rencontre soit source de joie.",
    author: "Claire",
    date: "Il y a 1 semaine",
    hearts: 31,
  },
  {
    id: 5,
    text: "Pour Ahmed et ses enfants, arrives recemment. Qu'ils trouvent ici un accueil fraternel et une communaute bienveillante.",
    author: "Marie-Anne",
    date: "Il y a 1 semaine",
    hearts: 22,
  },
]

export default function Prieres() {
  const [prayers, setPrayers] = useState(initialPrayers)
  const [newPrayer, setNewPrayer] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [liked, setLiked] = useState({})

  const handleLike = (id) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }))
    setPrayers(prev => prev.map(p =>
      p.id === id ? { ...p, hearts: p.hearts + (liked[id] ? -1 : 1) } : p
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newPrayer.trim()) return
    setPrayers(prev => [{
      id: Date.now(),
      text: newPrayer,
      author: "Anonyme",
      date: "A l'instant",
      hearts: 0,
    }, ...prev])
    setNewPrayer('')
    setShowForm(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-spirit-100 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-spirit-500" />
          </div>
          <h1 className="text-3xl font-bold text-warmth-900 m-0">Prieres pour la rue</h1>
        </div>
        <p className="text-warmth-700 text-lg">
          Portez dans la priere les personnes rencontrees. Chaque priere compte.
        </p>
      </div>

      {/* Add prayer button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full mb-6 bg-white border-2 border-dashed border-warmth-300 rounded-2xl p-6 text-center hover:border-warmth-500 hover:bg-warmth-50 transition-all cursor-pointer flex items-center justify-center gap-2 text-warmth-600 font-medium"
        >
          <Plus className="w-5 h-5" />
          Ajouter une intention de priere
        </button>
      )}

      {/* Prayer form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border border-warmth-100 p-6 mb-6">
          <h3 className="font-bold text-warmth-900 mb-3">Nouvelle intention de priere</h3>
          <textarea
            value={newPrayer}
            onChange={e => setNewPrayer(e.target.value)}
            rows={3}
            placeholder="Pour qui souhaitez-vous prier ?"
            className="w-full px-4 py-3 rounded-xl border-2 border-warmth-200 bg-white text-warmth-800 focus:border-warmth-500 focus:outline-none transition-colors resize-none mb-3"
          />
          <div className="flex items-center gap-3 justify-end">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-5 py-2.5 rounded-xl font-medium text-warmth-600 hover:bg-warmth-100 transition-all cursor-pointer border-none bg-transparent"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-warmth-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-warmth-600 transition-all cursor-pointer border-none"
            >
              <Send className="w-4 h-4" /> Publier
            </button>
          </div>
        </form>
      )}

      {/* Prayer list */}
      <div className="space-y-4">
        {prayers.map(prayer => (
          <div key={prayer.id} className="bg-white rounded-2xl shadow-md border border-warmth-100 p-6">
            <p className="text-warmth-800 leading-relaxed mb-4 italic">"{prayer.text}"</p>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-warmth-700">{prayer.author}</span>
                <span className="text-sm text-warmth-400 ml-2">{prayer.date}</span>
              </div>
              <button
                onClick={() => handleLike(prayer.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer border-none transition-all ${
                  liked[prayer.id]
                    ? 'bg-heart-100 text-heart-500'
                    : 'bg-warmth-50 text-warmth-500 hover:bg-heart-50 hover:text-heart-400'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked[prayer.id] ? 'fill-heart-500' : ''}`} />
                {prayer.hearts}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
