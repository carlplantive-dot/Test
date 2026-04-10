import { Link } from 'react-router-dom'
import { Heart, Calendar, HelpCircle, AlertTriangle, BookOpen, Flame, Users, ArrowRight, Star } from 'lucide-react'

const features = [
  {
    icon: Calendar,
    title: "Actions de la paroisse",
    description: "Maraudes, repas fraternels, hebergement... Decouvrez toutes les actions et inscrivez-vous en un clic.",
    link: "/actions",
    color: "bg-warmth-500",
  },
  {
    icon: HelpCircle,
    title: "Trouver ma mission",
    description: "Un quiz pour decouvrir quelle mission de charite vous correspond le mieux selon votre profil.",
    link: "/quiz",
    color: "bg-earth-500",
  },
  {
    icon: AlertTriangle,
    title: "Signaler un besoin",
    description: "Vous connaissez quelqu'un qui a besoin d'aide ? Signalez-le a la communaute paroissiale.",
    link: "/signaler",
    color: "bg-heart-500",
  },
  {
    icon: BookOpen,
    title: "Prieres pour la rue",
    description: "Portez dans la priere les personnes rencontrees en maraude. Chaque priere compte.",
    link: "/prieres",
    color: "bg-spirit-500",
  },
  {
    icon: Flame,
    title: "Flash Fraternite",
    description: "Besoins urgents, appels flash. Les heros du service en paroisse, hyper reactifs.",
    link: "/urgences",
    color: "bg-heart-600",
  },
  {
    icon: Users,
    title: "Ma paroisse",
    description: "Configurez votre paroisse, decouvrez les equipes et rejoignez la communaute.",
    link: "/paroisse",
    color: "bg-warmth-700",
  },
]

const testimonials = [
  {
    text: "Depuis que je fais les maraudes, ma foi a completement change. J'ai rencontre le Christ dans les yeux de ceux que je servais.",
    author: "Lucas, 24 ans",
    role: "Maraudeur depuis 2 ans",
  },
  {
    text: "Je ne suis pas croyant, mais l'accueil de cette paroisse m'a bouleverse. On m'a regarde comme une personne, pas comme un probleme.",
    author: "Karim, 38 ans",
    role: "Accueilli lors d'un repas fraternel",
  },
  {
    text: "Le parrainage a change ma vie. Avoir deux jeunes qui viennent me voir chaque semaine, ca m'a redonne de l'espoir.",
    author: "Pierre, 55 ans",
    role: "Parraine depuis 6 mois",
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-warmth-500 via-warmth-600 to-earth-600 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-earth-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Heart className="w-4 h-4 fill-white" />
                <span className="text-sm font-medium">Rendre la charite accessible</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
                Votre paroisse,{' '}
                <span className="text-earth-200">reseau d'entraide</span>{' '}
                et de fraternite
              </h1>
            </div>
            <p className="animate-fade-in-up-delay text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Faire le lien entre l'Eglise, les plus pauvres et le monde.
              Chaque paroisse peut devenir un lieu ou la charite s'organise,
              devient accessible et desirable.
            </p>
            <div className="animate-fade-in-up-delay-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/quiz"
                className="inline-flex items-center gap-2 bg-white text-warmth-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-warmth-50 transition-all shadow-lg hover:shadow-xl no-underline hover:-translate-y-0.5"
              >
                Trouver ma mission
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/actions"
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/25 transition-all border border-white/30 no-underline hover:-translate-y-0.5"
              >
                Voir les actions
              </Link>
            </div>
          </div>
        </div>
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full">
            <path d="M0,60 C360,100 720,20 1440,60 L1440,100 L0,100 Z" fill="#FFF8F0" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { number: "1/4", label: "de non-chretiens dans nos maraudes" },
            { number: "150+", label: "benevoles mobilises" },
            { number: "52", label: "maraudes par an" },
            { number: "1000+", label: "repas partages" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-md border border-warmth-100">
              <p className="text-2xl sm:text-3xl font-bold text-warmth-600 m-0">{stat.number}</p>
              <p className="text-xs sm:text-sm text-warmth-800/70 mt-1 m-0">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-gradient-to-r from-warmth-100 to-earth-100 rounded-2xl p-8 sm:p-12 border border-warmth-200">
          <div className="max-w-3xl mx-auto text-center">
            <Star className="w-8 h-8 text-warmth-500 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-warmth-900 mb-4">Notre vision</h2>
            <p className="text-warmth-800 text-lg leading-relaxed mb-4">
              A la lumiere des premieres communautes chretiennes, nous croyons que chaque paroisse
              peut devenir un <strong>reseau d'entraide locale</strong> ou la charite n'est plus un concept
              abstrait mais une <strong>experience vecue</strong>.
            </p>
            <p className="text-warmth-700 leading-relaxed">
              Un lieu ou les jeunes trouvent leur place, ou ceux qui cherchent du sens
              decouvrent un raccourci vers le coeur de Jesus, ou les plus pauvres
              retrouvent dignite et fraternite.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-warmth-900 mb-3">Comment s'engager ?</h2>
          <p className="text-warmth-700 text-lg">Chacun a sa place. Decouvrez comment contribuer.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Link
              key={i}
              to={feature.link}
              className="group bg-white rounded-2xl p-6 shadow-md border border-warmth-100 hover:shadow-xl transition-all hover:-translate-y-1 no-underline"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-warmth-900 mb-2">{feature.title}</h3>
              <p className="text-warmth-700 text-sm leading-relaxed m-0">{feature.description}</p>
              <div className="flex items-center gap-1 mt-4 text-warmth-500 font-medium text-sm">
                Decouvrir <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-warmth-50 to-warmth-100 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-warmth-900 mb-3">Ils temoignent</h2>
            <p className="text-warmth-700 text-lg">La charite transforme des deux cotes</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md border border-warmth-100">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-earth-400 fill-earth-400" />
                  ))}
                </div>
                <p className="text-warmth-800 italic mb-4 leading-relaxed">"{t.text}"</p>
                <div className="border-t border-warmth-100 pt-3">
                  <p className="font-semibold text-warmth-900 text-sm m-0">{t.author}</p>
                  <p className="text-warmth-600 text-xs m-0">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-gradient-to-r from-warmth-600 to-earth-600 rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Pret a te lancer ?</h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Chaque geste compte. Chaque priere compte.
              Trouve ta place dans cette aventure de charite.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/quiz"
                className="inline-flex items-center gap-2 bg-white text-warmth-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-warmth-50 transition-all shadow-lg no-underline"
              >
                <HelpCircle className="w-5 h-5" />
                Faire le quiz
              </Link>
              <Link
                to="/signaler"
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/25 transition-all border border-white/30 no-underline"
              >
                <AlertTriangle className="w-5 h-5" />
                Signaler un besoin
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
