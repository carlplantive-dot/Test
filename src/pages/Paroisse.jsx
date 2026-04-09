import { useState } from 'react'
import { defaultParish } from '../data/parishData'
import { Church, MapPin, Mail, Users, Heart, BookOpen, Shield, Settings, Save, CheckCircle } from 'lucide-react'

const initiatives = [
  {
    icon: Users,
    title: "Parrainage paroissial",
    description: "Duo de jeunes accompagnant une personne de la rue durant une annee. Rencontres hebdomadaires, activites, aide dans les demarches.",
    status: "actif",
  },
  {
    icon: Heart,
    title: "Hiver solidaire",
    description: "Accueil de sans-abris dans les locaux paroissiaux la nuit. Les benevoles deviennent le coeur priant et aimant de la paroisse.",
    status: "saisonnier",
  },
  {
    icon: Church,
    title: "Dimanche des peripheries",
    description: "Une fois par trimestre, la messe est entierement animee pour les plus pauvres. Offrandes en nature, envoi en maraude.",
    status: "actif",
  },
  {
    icon: BookOpen,
    title: "Parcours Charite",
    description: "Formation incluant interviews, premier pas vers les maraudes, videos, mise en relation avec des lieux de charite.",
    status: "inscription ouverte",
  },
  {
    icon: Shield,
    title: "Coordinateurs de la charite",
    description: "Groupe de maraudeurs coordinateurs qui communiquent les besoins des sans-abris du quartier a toute la paroisse.",
    status: "actif",
  },
]

export default function Paroisse() {
  const [parish, setParish] = useState(defaultParish)
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Parish header */}
      <div className="bg-gradient-to-r from-warmth-600 via-warmth-500 to-earth-500 rounded-2xl p-8 sm:p-12 text-white mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Church className="w-6 h-6 text-white" />
                </div>
                {editing ? (
                  <input
                    type="text"
                    value={parish.name}
                    onChange={e => setParish({ ...parish, name: e.target.value })}
                    className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white text-2xl font-bold placeholder:text-white/50 outline-none"
                  />
                ) : (
                  <h1 className="text-2xl sm:text-3xl font-bold text-white m-0">{parish.name}</h1>
                )}
              </div>

              <div className="flex items-center gap-4 text-white/80 text-sm mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {editing ? (
                    <input
                      type="text"
                      value={parish.address}
                      onChange={e => setParish({ ...parish, address: e.target.value })}
                      className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white text-sm outline-none"
                    />
                  ) : parish.address}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {editing ? (
                    <input
                      type="text"
                      value={parish.contact}
                      onChange={e => setParish({ ...parish, contact: e.target.value })}
                      className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white text-sm outline-none"
                    />
                  ) : parish.contact}
                </span>
              </div>

              {editing ? (
                <textarea
                  value={parish.description}
                  onChange={e => setParish({ ...parish, description: e.target.value })}
                  rows={2}
                  className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder:text-white/50 outline-none resize-none"
                />
              ) : (
                <p className="text-white/90 max-w-2xl leading-relaxed">{parish.description}</p>
              )}
            </div>

            <button
              onClick={() => editing ? handleSave() : setEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-lg text-white hover:bg-white/25 transition-all cursor-pointer border border-white/20 text-sm font-medium"
            >
              {editing ? <Save className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
              {editing ? 'Sauvegarder' : 'Configurer'}
            </button>
          </div>

          {saved && (
            <div className="mt-4 flex items-center gap-2 text-green-200">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Modifications sauvegardees !</span>
            </div>
          )}
        </div>
      </div>

      {/* Initiatives */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-warmth-900 mb-2">Initiatives de la paroisse</h2>
        <p className="text-warmth-700 mb-6">Les programmes et initiatives de charite mis en place</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {initiatives.map((init, i) => {
            const InitIcon = init.icon
            return (
              <div key={i} className="bg-white rounded-xl shadow-md border border-warmth-100 p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-warmth-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <InitIcon className="w-5 h-5 text-warmth-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-warmth-900 text-sm m-0">{init.title}</h3>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      init.status === 'actif' ? 'bg-green-100 text-green-700' :
                      init.status === 'saisonnier' ? 'bg-spirit-100 text-spirit-700' :
                      'bg-earth-100 text-earth-700'
                    }`}>
                      {init.status}
                    </span>
                  </div>
                </div>
                <p className="text-warmth-700 text-sm leading-relaxed m-0">{init.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Kit paroisse */}
      <div className="bg-gradient-to-r from-warmth-100 to-earth-100 rounded-2xl p-8 border border-warmth-200">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-warmth-900 mb-3">Kit "Une paroisse pour les plus pauvres"</h2>
          <p className="text-warmth-800 mb-4 leading-relaxed">
            Un guide complet pour mettre en place un ecosysteme de charite et de service
            dans votre paroisse. Destine aux equipes paroissiales et aux cures.
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Organigramme et departements de la charite",
              "Guide de creation d'une equipe maraude",
              "Kit communication pour la paroisse",
              "Formation des coordinateurs de charite",
              "Modeles d'evenements (Nuit de la Compassion, etc.)",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-warmth-700 text-sm">
                <CheckCircle className="w-4 h-4 text-warmth-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <button className="bg-warmth-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-warmth-600 transition-all cursor-pointer border-none shadow-md flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Telecharger le kit
          </button>
        </div>
      </div>
    </div>
  )
}
