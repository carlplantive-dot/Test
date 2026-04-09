import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Heart, Menu, X, Home, Calendar, HelpCircle, AlertTriangle, BookOpen, Flame, Church } from 'lucide-react'

const navItems = [
  { path: '/', label: 'Accueil', icon: Home },
  { path: '/actions', label: 'Actions', icon: Calendar },
  { path: '/quiz', label: 'Trouver ma mission', icon: HelpCircle },
  { path: '/signaler', label: 'Signaler un besoin', icon: AlertTriangle },
  { path: '/prieres', label: 'Prieres', icon: BookOpen },
  { path: '/urgences', label: 'Flash Fraternite', icon: Flame },
  { path: '/paroisse', label: 'Ma paroisse', icon: Church },
]

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-warmth-600 via-warmth-500 to-earth-500 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 no-underline text-white">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold leading-tight m-0">Fraternite</h1>
                <p className="text-[10px] text-white/80 leading-tight m-0 -mt-0.5">Votre paroisse, reseau d'entraide</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all no-underline ${
                    location.pathname === path
                      ? 'bg-white/25 text-white'
                      : 'text-white/80 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/15 transition-colors bg-transparent border-none text-white cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-white/20 pb-4 px-4">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all no-underline mt-1 ${
                  location.pathname === path
                    ? 'bg-white/25 text-white'
                    : 'text-white/80 hover:bg-white/15 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-warmth-800 text-warmth-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-warmth-400 text-warmth-400" />
              <span className="font-semibold text-white">Fraternite</span>
            </div>
            <p className="text-sm text-warmth-300 text-center m-0">
              Rendre la charite accessible. Faire des paroisses des reseaux d'entraide et de fraternite.
            </p>
            <p className="text-xs text-warmth-400 m-0">
              Avec amour, pour l'Eglise et les plus pauvres
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
