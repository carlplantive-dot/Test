import { useState } from 'react'
import { prayerIntentions } from '../data/parishData'
import { BookOpen, Heart, Send, User, Clock, Plus } from 'lucide-react'

export default function Prieres() {
  const [prayers, setPrayers] = useState(
    prayerIntentions.reduce((acc, p) => ({ ...acc, [p.id]: { count: p.prayers, prayed: false } }), {})
  )
  const [newIntention, setNewIntention] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handlePray = (id) => {
    setPrayers(prev => ({
      ...prev,
      [id]: {
        count: prev[id].prayed ? prev[id].count - 1 : prev[id].count + 1,
        prayed: !prev[id].prayed,
      }
    }))
  }

  const handleSubmitIntention = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setNewIntention('')
    setTimeout(() => {
      setSubmitted(false)
      setShowForm(false)
    }, 2000)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gradient-to-br from-spirit-400 to-spirit-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-warmth-900 mb-2">Prier pour la rue</h1>
        <p className="text-warmth-700 text-lg max-w-xl mx-auto">
          Les maraudeurs partagent des intentions de priere anonymisees.
          Chaque priere relie l'action a la contemplation.
        </p>
      </div>

      {/* Add intention */}
      <div className="mb-8">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-white border-2 border-dashed border-warmth-300 rounded-xl p-4 text-warmth-600 hover:border-warmth-400 hover:bg-warmth-50 transition-all cursor-pointer flex items-center justify-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Partager une intention de priere
          </button>
        ) : submitted ? (
          <div className="bg-spirit-50 border border-spirit-200 rounded-xl p-6 text-center">
            <Heart className="w-10 h-10 text-spirit-500 mx-auto mb-2 fill-spirit-500" />
            <p className="font-semibold text-spirit-800">Intention partagee. Merci !</p>
          </div>
        ) : (
          <form onSubmit={handleSubmitIntention} className="bg-white rounded-xl shadow-md border border-warmth-100 p-6">
            <label className="block text-sm font-semibold text-warmth-900 mb-2">
              Votre intention de priere (anonymisee)
            </label>
            <textarea
              value={newIntention}
              onChange={e => setNewIntention(e.target.value)}
              placeholder='Ex: "Priez pour Ahmed qui dort sous le pont et qui a tres froid ce soir"'
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-warmth-200 focus:border-spirit-500 focus:ring-2 focus:ring-spirit-200 outline-none transition-all text-warmth-800 placeholder:text-warmth-400 resize-none mb-4 box-border"
              required
            />
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-spirit-500 text-white py-3 rounded-xl font-semibold hover:bg-spirit-600 transition-all cursor-pointer border-none flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Partager
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 rounded-xl bg-warmth-100 text-warmth-700 font-semibold hover:bg-warmth-200 transition-all cursor-pointer border-none"
              >
                Annuler
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Intentions list */}
      <div className="space-y-4">
        {prayerIntentions.map(intention => {
          const prayerState = prayers[intention.id]
          return (
            <div key={intention.id} className="bg-white rounded-xl shadow-md border border-warmth-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                {/* Left decoration */}
                <div className="hidden sm:block w-1 self-stretch bg-gradient-to-b from-spirit-300 to-warmth-300 rounded-full flex-shrink-0" />

                <div className="flex-1">
                  <p className="text-warmth-800 text-lg italic leading-relaxed mb-4">
                    "{intention.text}"
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3 text-sm text-warmth-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {intention.postedBy}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {intention.date}
                      </span>
                    </div>

                    <button
                      onClick={() => handlePray(intention.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer border-none ${
                        prayerState.prayed
                          ? 'bg-spirit-100 text-spirit-700 shadow-sm'
                          : 'bg-warmth-100 text-warmth-700 hover:bg-spirit-50 hover:text-spirit-600'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${prayerState.prayed ? 'fill-spirit-500 text-spirit-500' : ''}`} />
                      {prayerState.prayed ? 'Je prie' : 'Je prie pour lui/elle'}
                      <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                        prayerState.prayed ? 'bg-spirit-200 text-spirit-700' : 'bg-warmth-200 text-warmth-600'
                      }`}>
                        {prayerState.count}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom message */}
      <div className="mt-10 text-center bg-gradient-to-r from-spirit-50 to-warmth-50 rounded-xl p-6 border border-spirit-100">
        <p className="text-warmth-800 italic">
          "Ce que vous avez fait au plus petit d'entre les miens, c'est a moi que vous l'avez fait."
        </p>
        <p className="text-warmth-500 text-sm mt-2">- Matthieu 25, 40</p>
      </div>
    </div>
  )
}
