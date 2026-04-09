import { useState } from 'react'
import { urgentNeeds } from '../data/parishData'
import { Flame, AlertTriangle, Clock, Users, MessageCircle, HandHeart, Send, CheckCircle, Bell } from 'lucide-react'

export default function Urgences() {
  const [responses, setResponses] = useState({})
  const [newUrgent, setNewUrgent] = useState({ title: '', description: '' })
  const [showForm, setShowForm] = useState(false)

  const handleRespond = (id) => {
    setResponses(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-heart-400 to-heart-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse-warm">
          <Flame className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-warmth-900 mb-2">Flash Fraternite</h1>
        <p className="text-warmth-700 text-lg max-w-xl mx-auto">
          Besoins urgents, appels flash. Les heros du service en paroisse.
        </p>
      </div>

      {/* Warning banner */}
      <div className="bg-heart-50 border border-heart-200 rounded-xl p-4 mb-8 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-heart-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-heart-800 text-sm m-0">Groupe reactif</p>
          <p className="text-heart-700 text-sm m-0">
            Ce canal est reserve aux besoins urgents et aux appels a mobilisation rapide.
            Activez les notifications pour ne rien manquer.
          </p>
        </div>
      </div>

      {/* Notification opt-in */}
      <button className="w-full bg-warmth-100 border border-warmth-200 rounded-xl p-4 mb-8 flex items-center justify-center gap-2 text-warmth-700 font-medium hover:bg-warmth-200 transition-all cursor-pointer">
        <Bell className="w-5 h-5" />
        Activer les notifications Flash Fraternite
      </button>

      {/* Urgent needs */}
      <div className="space-y-4 mb-8">
        {urgentNeeds.map(need => {
          const hasResponded = responses[need.id]
          return (
            <div key={need.id} className={`bg-white rounded-xl shadow-md border-2 overflow-hidden transition-all ${
              need.resolved ? 'border-green-200 opacity-70' : 'border-heart-200 hover:shadow-lg'
            }`}>
              {/* Urgent badge */}
              <div className={`px-4 py-2 flex items-center gap-2 ${need.resolved ? 'bg-green-50' : 'bg-heart-50'}`}>
                <Flame className={`w-4 h-4 ${need.resolved ? 'text-green-500' : 'text-heart-500'}`} />
                <span className={`text-xs font-bold uppercase tracking-wide ${need.resolved ? 'text-green-600' : 'text-heart-600'}`}>
                  {need.resolved ? 'Resolu' : 'Urgent'}
                </span>
                <span className="text-xs text-warmth-500 ml-auto flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {need.time}
                </span>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-warmth-900 text-lg mb-2">{need.title}</h3>
                <p className="text-warmth-700 mb-4 leading-relaxed">{need.description}</p>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-sm text-warmth-500">
                    <Users className="w-4 h-4" />
                    <span>{need.responses + (hasResponded ? 1 : 0)} reponse{need.responses > 1 ? 's' : ''}</span>
                  </div>

                  {!need.resolved && (
                    <button
                      onClick={() => handleRespond(need.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer border-none ${
                        hasResponded
                          ? 'bg-green-100 text-green-700'
                          : 'bg-heart-500 text-white hover:bg-heart-600 shadow-md'
                      }`}
                    >
                      {hasResponded ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Je suis dispo !
                        </>
                      ) : (
                        <>
                          <HandHeart className="w-4 h-4" />
                          Je reponds present
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Post urgent need */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-white border-2 border-dashed border-heart-300 rounded-xl p-4 text-heart-600 hover:border-heart-400 hover:bg-heart-50 transition-all cursor-pointer flex items-center justify-center gap-2 font-medium"
        >
          <MessageCircle className="w-5 h-5" />
          Signaler un besoin urgent
        </button>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setShowForm(false)
            setNewUrgent({ title: '', description: '' })
          }}
          className="bg-white rounded-xl shadow-md border-2 border-heart-200 p-6"
        >
          <h3 className="font-bold text-heart-800 mb-4 flex items-center gap-2">
            <Flame className="w-5 h-5 text-heart-500" />
            Signaler un besoin urgent
          </h3>
          <input
            type="text"
            value={newUrgent.title}
            onChange={e => setNewUrgent({ ...newUrgent, title: e.target.value })}
            placeholder="Titre du besoin urgent"
            className="w-full px-4 py-3 rounded-xl border border-warmth-200 focus:border-heart-500 focus:ring-2 focus:ring-heart-200 outline-none transition-all text-warmth-800 placeholder:text-warmth-400 mb-3 box-border"
            required
          />
          <textarea
            value={newUrgent.description}
            onChange={e => setNewUrgent({ ...newUrgent, description: e.target.value })}
            placeholder="Decrivez la situation urgente..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-warmth-200 focus:border-heart-500 focus:ring-2 focus:ring-heart-200 outline-none transition-all text-warmth-800 placeholder:text-warmth-400 resize-none mb-4 box-border"
            required
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-heart-500 text-white py-3 rounded-xl font-semibold hover:bg-heart-600 transition-all cursor-pointer border-none flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Envoyer l'alerte
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
  )
}
