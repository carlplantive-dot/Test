import { useState } from 'react'
import { AlertTriangle, MapPin, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react'

export default function SignalerBesoin() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    type: '',
    description: '',
    location: '',
    urgency: 'normal',
    contact: '',
  })

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-warmth-900 mb-3">Merci pour votre signalement</h1>
        <p className="text-warmth-700 text-lg mb-6">
          L'equipe paroissiale a ete prevenue et prendra contact avec vous si necessaire.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ type: '', description: '', location: '', urgency: 'normal', contact: '' }) }}
          className="bg-warmth-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-warmth-600 transition-all cursor-pointer border-none"
        >
          Faire un autre signalement
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-heart-100 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-heart-500" />
          </div>
          <h1 className="text-3xl font-bold text-warmth-900 m-0">Signaler un besoin</h1>
        </div>
        <p className="text-warmth-700 text-lg">
          Vous connaissez une personne en difficulte ? Signalez-le a la communaute paroissiale.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border border-warmth-100 p-6 sm:p-8 space-y-6">
        {/* Type */}
        <div>
          <label className="block text-sm font-semibold text-warmth-800 mb-2">Type de besoin</label>
          <select
            value={form.type}
            onChange={e => handleChange('type', e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-warmth-200 bg-white text-warmth-800 focus:border-warmth-500 focus:outline-none transition-colors"
          >
            <option value="">Choisir...</option>
            <option value="alimentaire">Besoin alimentaire</option>
            <option value="hebergement">Hebergement</option>
            <option value="vetements">Vetements</option>
            <option value="ecoute">Ecoute / solitude</option>
            <option value="administratif">Aide administrative</option>
            <option value="medical">Besoin medical</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-warmth-800 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-1" />
            Description de la situation
          </label>
          <textarea
            value={form.description}
            onChange={e => handleChange('description', e.target.value)}
            required
            rows={4}
            placeholder="Decrivez la situation..."
            className="w-full px-4 py-3 rounded-xl border-2 border-warmth-200 bg-white text-warmth-800 focus:border-warmth-500 focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-warmth-800 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Lieu (optionnel)
          </label>
          <input
            type="text"
            value={form.location}
            onChange={e => handleChange('location', e.target.value)}
            placeholder="Adresse ou quartier"
            className="w-full px-4 py-3 rounded-xl border-2 border-warmth-200 bg-white text-warmth-800 focus:border-warmth-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Urgency */}
        <div>
          <label className="block text-sm font-semibold text-warmth-800 mb-2">Niveau d'urgence</label>
          <div className="flex gap-3">
            {[
              { value: 'normal', label: 'Normal', color: 'bg-earth-100 text-earth-700 border-earth-200' },
              { value: 'urgent', label: 'Urgent', color: 'bg-warmth-100 text-warmth-700 border-warmth-200' },
              { value: 'critique', label: 'Critique', color: 'bg-heart-100 text-heart-700 border-heart-200' },
            ].map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleChange('urgency', opt.value)}
                className={`flex-1 py-3 rounded-xl font-medium text-sm cursor-pointer border-2 transition-all ${
                  form.urgency === opt.value
                    ? opt.color + ' shadow-sm'
                    : 'bg-white text-warmth-500 border-warmth-100 hover:border-warmth-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <label className="block text-sm font-semibold text-warmth-800 mb-2">
            <Phone className="w-4 h-4 inline mr-1" />
            Votre contact (optionnel)
          </label>
          <input
            type="text"
            value={form.contact}
            onChange={e => handleChange('contact', e.target.value)}
            placeholder="Telephone ou email"
            className="w-full px-4 py-3 rounded-xl border-2 border-warmth-200 bg-white text-warmth-800 focus:border-warmth-500 focus:outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-warmth-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-warmth-600 transition-all cursor-pointer border-none flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <Send className="w-5 h-5" />
          Envoyer le signalement
        </button>
      </form>
    </div>
  )
}
