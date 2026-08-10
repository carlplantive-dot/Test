import { useState } from 'react'
import { NEEDS, NEWS, IC } from '../data/parishData'

function Icon({ d, size = 18, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
      stroke={color} strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

const TAG_COL = {
  "Matériel":        ["var(--color-accent-200)",   "var(--color-accent-800)"],
  "Accompagnement":  ["var(--color-accent-2-200)", "var(--color-accent-2-800)"],
  "Présence":        ["var(--color-neutral-200)",  "var(--color-neutral-800)"],
  "Bénévolat":       ["var(--color-accent-100)",   "var(--color-accent-700)"],
}

export default function NeedsTab() {
  const [activeTab, setActiveTab] = useState("Besoins signalés")
  const [taken, setTaken] = useState({})

  function toggleTaken(id) {
    setTaken(p => ({ ...p, [id]: !p[id] }))
  }

  const tabs = ["Besoins signalés", "Annonces"]

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--color-bg)" }}>
      <div style={{ flexShrink: 0, padding: "58px 20px 4px" }}>
        <h2 style={{ fontSize: 32 }}>Besoins & annonces</h2>
      </div>

      <div style={{ flexShrink: 0, display: "flex", gap: 8, padding: "12px 20px 4px" }}>
        {tabs.map(t => {
          const on = activeTab === t
          return (
            <button key={t} onClick={() => setActiveTab(t)}
              style={{ border: `1px solid ${on ? "var(--color-accent)" : "var(--color-divider)"}`, cursor: "pointer", borderRadius: 999, padding: "9px 15px", font: `600 12.5px var(--font-body)`, background: on ? "var(--color-accent)" : "transparent", color: on ? "var(--color-bg)" : "var(--color-neutral-700)" }}>
              {t}
            </button>
          )
        })}
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "12px 20px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
        {activeTab === "Besoins signalés" && NEEDS.map(n => {
          const on = !!taken[n.id]
          const [tagBg, tagFg] = TAG_COL[n.cat] || ["var(--color-neutral-200)", "var(--color-neutral-800)"]
          return (
            <div key={n.id} style={{ background: "var(--color-neutral-100)", borderRadius: 26, padding: 15, boxShadow: "var(--shadow-sm)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ borderRadius: 999, padding: "4px 10px", font: `600 10.5px var(--font-body)`, letterSpacing: ".05em", textTransform: "uppercase", background: tagBg, color: tagFg }}>{n.cat}</span>
                <span style={{ font: `400 11.5px var(--font-body)`, color: "var(--color-neutral-600)" }}>{n.date}</span>
                {n.urgent && <span style={{ marginLeft: "auto", font: `700 10.5px var(--font-body)`, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>urgent</span>}
              </div>
              <div style={{ font: `700 15.5px/1.3 var(--font-body)` }}>{n.title}</div>
              <p style={{ margin: "6px 0 12px", font: `400 13px/1.5 var(--font-body)`, color: "var(--color-neutral-700)" }}>{n.desc}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={() => toggleTaken(n.id)}
                  style={{ border: 0, cursor: "pointer", borderRadius: 999, padding: "11px 17px", font: `400 13.5px var(--font-heading)`, background: on ? "var(--color-accent-2-600)" : "var(--color-accent)", color: "var(--color-bg)" }}>
                  {on ? "Tu t'en occupes · merci" : "Je m'en occupe"}
                </button>
                <span style={{ font: `400 12px var(--font-body)`, color: "var(--color-neutral-600)" }}>{n.by}</span>
              </div>
            </div>
          )
        })}

        {activeTab === "Annonces" && (
          <>
            <div style={{ background: "var(--color-accent-800)", borderRadius: 26, padding: 17, color: "var(--color-bg)" }}>
              <div style={{ font: `600 10.5px var(--font-body)`, letterSpacing: ".09em", textTransform: "uppercase", color: "var(--color-accent-300)" }}>Annonce du curé · dimanche</div>
              <div style={{ font: `400 21px/1.15 var(--font-heading)`, margin: "9px 0 8px" }}>Dimanche des périphéries, le 28 avril</div>
              <p style={{ margin: "0 0 12px", font: `400 13px/1.5 var(--font-body)`, color: "rgba(245,234,216,.8)" }}>Messe animée pour et avec les plus pauvres, offrandes en nature, envoi en maraude à la sortie. On cherche 15 personnes pour l'accueil.</p>
              <button style={{ border: 0, cursor: "pointer", borderRadius: 999, padding: "11px 17px", font: `400 13.5px var(--font-heading)`, background: "var(--color-accent)", color: "var(--color-bg)" }}>Je donne un coup de main</button>
            </div>

            {NEWS.map((a, i) => (
              <div key={i} style={{ background: "var(--color-neutral-100)", borderRadius: 26, padding: 15, boxShadow: "var(--shadow-sm)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 7 }}>
                  <div style={{ width: 34, height: 34, flexShrink: 0, borderRadius: 999, background: a.tint, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon d={IC[a.icon]} color={a.ink} size={16} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ font: `700 13.5px var(--font-body)` }}>{a.t}</div>
                    <div style={{ font: `400 11.5px var(--font-body)`, color: "var(--color-neutral-600)" }}>{a.by} · {a.date}</div>
                  </div>
                </div>
                <p style={{ font: `400 13px/1.5 var(--font-body)`, color: "var(--color-neutral-700)" }}>{a.d}</p>
              </div>
            ))}
          </>
        )}
      </div>

      <div style={{ flexShrink: 0, position: "relative", height: 0 }}>
        <button style={{ position: "absolute", right: 20, bottom: 12, width: 58, height: 58, border: 0, cursor: "pointer", borderRadius: 999, background: "var(--color-accent)", color: "var(--color-bg)", boxShadow: "var(--shadow-lg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon d={IC.plus} size={26} />
        </button>
      </div>
    </div>
  )
}
