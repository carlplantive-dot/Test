import { Outlet, Link, useLocation } from 'react-router-dom'
import { Heart, Home, Calendar, HelpCircle, AlertTriangle, BookOpen, Flame, Users, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { to: '/', label: 'Accueil', icon: Home },
  { to: '/actions', label: 'Actions', icon: Calendar },
  { to: '/quiz', label: 'Quiz', icon: HelpCircle },
  { to: '/signaler', label: 'Signaler', icon: AlertTriangle },
  { to: '/prieres', label: 'Prieres', icon: BookOpen },
  { to: '/urgences', label: 'Urgences', icon: Flame },
  { to: '/paroisse', label: 'Paroisse', icon: Users },
]

export default function Layout() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-sm border-b border-warmth-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 no-underline">
              <div className="w-9 h-9 bg-gradient-to-br from-warmth-500 to-earth-500 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-bold text-warmth-800">Fraternite</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => {
                const isActive = location.pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-3 py-2 rounded-lg text-sm font-medium no-underline transition-colors ${
                      isActive
                        ? 'bg-warmth-100 text-warmth-700'
                        : 'text-warmth-600 hover:bg-warmth-50 hover:text-warmth-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-warmth-50 cursor-pointer border-none bg-transparent"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6 text-warmth-700" /> : <Menu className="w-6 h-6 text-warmth-700" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden border-t border-warmth-100 bg-white">
            <nav className="px-4 py-2 space-y-1">
              {navLinks.map(link => {
                const Icon = link.icon
                const isActive = location.pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium no-underline transition-colors ${
                      isActive
                        ? 'bg-warmth-100 text-warmth-700'
                        : 'text-warmth-600 hover:bg-warmth-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-warmth-900 text-warmth-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-warmth-400 fill-warmth-400" />
            <span className="text-lg font-bold text-white">Fraternite</span>
          </div>
          <p className="text-sm text-warmth-400">
            Votre paroisse, reseau d'entraide et de fraternite.
          </p>
        </div>
      </footer>
    </div>
  )
}
