import { useState } from 'react'
import { needs } from '../data/parishData'
import { AlertTriangle, Send, Package, UserPlus, Heart, Briefcase, CheckCircle, Clock, AlertCircle } from 'lucide-react'

const categories = [
  { value: "materiel", label: "Besoin materiel", icon: Package, description: "Vetements, nourriture, hygiene..." },
  { value: "presence", label: "Besoin de presence", icon: Heart, description: "Solitude, visite, ecoute..." },
  { value: "accompagnement", label: "Accompagnement", icon: UserPlus, description: "Demarches, sante, administratif..." },
  { value: "benevolat", label: "Besoin de benevoles", icon: Briefcase, description: "Main d'oeuvre pour une action..." },
]

const urgencyLevels = [
  { value: "normal", label: "Normal", color: "text-warmth-600", bg: "bg-warmth-100" },
  { value: "important", label: "Important", color: "text-earth-600", bg: "bg-earth-100" },
  { value: "urgent", label: "Urgent", color: "text-heart-600", bg: "bg-heart-100" },
]

export default function SignalerBesoin() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    urgency: 'normal',
    contact: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ title: '', description: '', category: '', urgency: 'normal', contact: '' })
    }, 3000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Form */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-warmth-900 mb-2">Signaler un besoin</h1>
            <p className="text-warmth-700 text-lg">
              Vous connaissez quelqu'un qui a besoin d'aide ou de presence ?
              Signalez-le a la communaute paroissiale.
            </p>
          </div>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-800 mb-2">Besoin signale !</h3>
              <p className="text-green-700">Merci pour votre attention aux autres. L'equipe paroissiale va etudier votre signalement.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-warmth-100 p-6 sm:p-8">
              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-warmth-900 mb-3">Type de besoin</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categories.map(cat => {
                    const CatIcon = cat.icon
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setForm({ ...form, category: cat.value })}
                        className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex items-start gap-3 ${
                          form.category === cat.value
                            ? 'border-warmth-500 bg-warmth-50'
                            : 'border-warmth-200 hover:border-warmth-300 bg-white'
                        }`}
                      >
                        <CatIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${form.category === cat.value ? 'text-warmth-500' : 'text-warmth-400'}`} />
                        <div>
                          <p className="font-medium text-warmth-900 text-sm m-0">{cat.label}</p>
                          <p className="text-warmth-600 text-xs m-0">{cat.description}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-warmth-900 mb-2">Titre du besoin</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Ex: Jean a besoin de chaussures taille 43"
                  className="w-full px-4 py-3 rounded-xl border border-warmth-200 focus:border-warmth-500 focus:ring-2 focus:ring-warmth-200 outline-none transition-all text-warmth-800 placeholder:text-warmth-400 box-border"
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-warmth-900 mb-2">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Decrivez la situation, le contexte, comment aider..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-warmth-200 focus:border-warmth-500 focus:ring-2 focus:ring-warmth-200 outline-none transition-all text-warmth-800 placeholder:text-warmth-400 resize-vertical box-border"
                  required
                />
              </div>

              {/* Urgency */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-warmth-900 mb-2">Niveau d'urgence</label>
                <div className="flex gap-3">
                  {urgencyLevels.map(level => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setForm({ ...form, urgency: level.value })}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all cursor-pointer border-2 ${
                        form.urgency === level.value
                          ? `${level.bg} ${level.color} border-current`
                          : 'border-warmth-200 text-warmth-600 bg-white hover:bg-warmth-50'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-warmth-900 mb-2">Votre contact (optionnel)</label>
                <input
                  type="text"
                  value={form.contact}
                  onChange={e => setForm({ ...form, contact: e.target.value })}
                  placeholder="Email ou telephone pour le suivi"
                  className="w-full px-4 py-3 rounded-xl border border-warmth-200 focus:border-warmth-500 focus:ring-2 focus:ring-warmth-200 outline-none transition-all text-warmth-800 placeholder:text-warmth-400 box-border"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-warmth-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-warmth-600 transition-all shadow-md hover:shadow-lg cursor-pointer border-none flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Signaler ce besoin
              </button>
            </form>
          )}
        </div>

        {/* Current needs */}
        <div>
          <h2 className="text-2xl font-bold text-warmth-900 mb-4">Besoins actuels</h2>
          <p className="text-warmth-700 mb-6">Les besoins signales par la communaute</p>

          <div className="space-y-4">
            {needs.map(need => (
              <div key={need.id} className="bg-white rounded-xl shadow-md border border-warmth-100 p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${
                    need.urgency === 'urgent' ? 'bg-heart-100' :
                    need.urgency === 'important' ? 'bg-earth-100' : 'bg-warmth-100'
                  }`}>
                    {need.urgency === 'urgent' ? (
                      <AlertCircle className="w-5 h-5 text-heart-500" />
                    ) : (
                      <AlertTriangle className={`w-5 h-5 ${need.urgency === 'important' ? 'text-earth-500' : 'text-warmth-500'}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-warmth-900 text-sm m-0">{need.title}</h3>
                      {need.urgency === 'urgent' && (
                        <span className="px-2 py-0.5 bg-heart-100 text-heart-600 rounded-full text-xs font-medium">Urgent</span>
                      )}
                    </div>
                    <p className="text-warmth-700 text-sm mb-2">{need.description}</p>
                    <div className="flex items-center gap-3 text-xs text-warmth-500">
                      <span className="flex items-center gap-1">
                        <UserPlus className="w-3 h-3" />
                        {need.postedBy}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {need.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
