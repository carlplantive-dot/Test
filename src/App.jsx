import { useState } from 'react'
import HomeTab from './pages/HomeTab'
import GroupsTab from './pages/GroupsTab'
import NeedsTab from './pages/NeedsTab'
import ProfileTab from './pages/ProfileTab'

const IC = {
  home: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  chat: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z",
  need: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
  person: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
}

function Icon({ d, size = 22 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
      stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

const TABS = [
  { id: "home",    label: "Accueil", icon: IC.home },
  { id: "groups",  label: "Groupes", icon: IC.chat },
  { id: "needs",   label: "Besoins", icon: IC.need },
  { id: "profile", label: "Profil",  icon: IC.person },
]

export default function App() {
  const [tab, setTab] = useState("home")
  const [nav, setNav] = useState({})

  function goTo(tabId, extra = {}) {
    setTab(tabId)
    setNav(extra)
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--color-bg)", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
        {tab === "home"    && <HomeTab onNavigate={goTo} navState={nav} />}
        {tab === "groups"  && <GroupsTab onNavigate={goTo} navState={nav} />}
        {tab === "needs"   && <NeedsTab onNavigate={goTo} navState={nav} />}
        {tab === "profile" && <ProfileTab onNavigate={goTo} navState={nav} />}
      </div>

      <div style={{ flex: "none", display: "flex", alignItems: "flex-start", padding: "9px 12px 32px", background: "var(--color-surface)", borderTop: "1px solid var(--color-divider)" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => goTo(t.id)}
            style={{ flex: 1, border: 0, background: "transparent", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: tab === t.id ? "var(--color-accent-700)" : "var(--color-neutral-600)", font: `700 9.5px var(--font-body)` }}>
            <Icon d={t.icon} size={22} />
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}
