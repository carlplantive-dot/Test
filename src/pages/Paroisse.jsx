import { Users, MapPin, Clock, Mail, Phone, Heart, Calendar, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const teams = [
  { name: "Equipe maraudes", members: 24, leader: "Pere Thomas", schedule: "Vendredis soir" },
  { name: "Repas fraternels", members: 18, leader: "Claire Dupont", schedule: "Dimanches midi" },
  { name: "Vestiaire solidaire", members: 8, leader: "Marie-Anne Leroy", schedule: "Mercredis apres-midi" },
  { name: "Accueil de jour", members: 12, leader: "Sophie Martin", schedule: "Lun-Ven matin" },
  { name: "Hebergement de nuit", members: 10, leader: "Lucas Bernard", schedule: "Tous les soirs" },
]

export default function Paroisse() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-warmth-100 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-warmth-600" />
          </div>
          <h1 className="text-3xl font-bold text-warmth-900 m-0">Ma paroisse</h1>
        </div>
        <p className="text-warmth-700 text-lg">
          Paroisse Saint-Joseph - Reseau de charite et de fraternite.
        </p>
      </div>

      {/* Parish info card */}
      <div className="bg-gradient-to-r from-warmth-500 to-earth-500 rounded-2xl p-6 sm:p-8 text-white mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Paroisse Saint-Joseph</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold m-0">Adresse</p>
              <p className="text-white/80 text-sm m-0">12 rue de la Paroisse, 75001 Paris</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold m-0">Horaires</p>
              <p className="text-white/80 text-sm m-0">Lun-Sam 8h-19h, Dim 8h-13h</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold m-0">Telephone</p>
              <p className="text-white/80 text-sm m-0">01 23 45 67 89</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold m-0">Email</p>
              <p className="text-white/80 text-sm m-0">contact@saint-joseph.fr</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 text-center shadow-md border border-warmth-100">
          <p className="text-3xl font-bold text-warmth-600 m-0">72</p>
          <p className="text-sm text-warmth-600 m-0 mt-1">Benevoles actifs</p>
        </div>
        <div className="bg-white rounded-xl p-5 text-center shadow-md border border-warmth-100">
          <p className="text-3xl font-bold text-warmth-600 m-0">5</p>
          <p className="text-sm text-warmth-600 m-0 mt-1">Equipes</p>
        </div>
        <div className="bg-white rounded-xl p-5 text-center shadow-md border border-warmth-100">
          <p className="text-3xl font-bold text-warmth-600 m-0">9</p>
          <p className="text-sm text-warmth-600 m-0 mt-1">Actions ce mois</p>
        </div>
      </div>

      {/* Teams */}
      <h2 className="text-2xl font-bold text-warmth-900 mb-4">Les equipes</h2>
      <div className="space-y-3 mb-8">
        {teams.map((team, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-md border border-warmth-100 flex items-center justify-between hover:shadow-lg transition-shadow">
            <div>
              <h3 className="font-bold text-warmth-900 m-0">{team.name}</h3>
              <div className="flex items-center gap-4 mt-1 text-sm text-warmth-600">
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {team.members} membres</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {team.schedule}</span>
              </div>
              <p className="text-xs text-warmth-500 mt-1 m-0">Responsable : {team.leader}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-warmth-400" />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-warmth-50 border border-warmth-200 rounded-2xl p-6 text-center">
        <Heart className="w-8 h-8 text-warmth-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-warmth-900 mb-2">Envie de rejoindre une equipe ?</h3>
        <p className="text-warmth-700 text-sm mb-4">Faites le quiz pour decouvrir la mission qui vous correspond.</p>
        <Link
          to="/quiz"
          className="inline-flex items-center gap-2 bg-warmth-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-warmth-600 transition-all no-underline"
        >
          Trouver ma mission <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
