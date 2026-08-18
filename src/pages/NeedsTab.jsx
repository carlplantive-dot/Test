import { useState } from 'react'
import { NEEDS, NEWS, IC } from '../data/parishData'
import ScopeSelector, { ScopeBadge } from '../components/ScopeSelector'

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

const CATS = ["Matériel", "Bénévolat", "Accompagnement", "Présence"]

function NewNeedSheet({ onClose, onSubmit }) {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [cat, setCat] = useState("Matériel")
  const [urgent, setUrgent] = useState(false)
  const [scope, setScope] = useState("paroisse")

  function handleSubmit() {
    if (!title.trim()) return
    onSubmit({ title, desc, cat, urgent, visibilite: scope })
    onClose()
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "rgba(32,30,29,.5)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: "var(--color-bg)", borderRadius: "28px 28px 0 0", padding: "24px 20px 40px", display: "flex", flexDirection: "column", gap: 16, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ fontSize: 22 }}>Signaler un besoin</h3>
          <button onClick={onClose} style={{ border: 0, background: "transparent", cursor: "pointer", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 999, background: "var(--color-neutral-200)" }}>
            <Icon d={IC.close} size={16} color="var(--color-neutral-700)" />
          </button>
        </div>

        <div>
          <label style={{ font: `600 11px var(--font-body)`, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-600)", display: "block", marginBottom: 8 }}>Catégorie</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {CATS.map(c => {
              const on = cat === c
              const [bg, fg] = TAG_COL[c]
              return (
                <button key={c} onClick={() => setCat(c)}
                  style={{ border: `1.5px solid ${on ? fg : "var(--color-divider)"}`, borderRadius: 999, padding: "7px 14px", font: `600 12px var(--font-body)`, background: on ? bg : "transparent", color: on ? fg : "var(--color-neutral-700)", cursor: "pointer" }}>
                  {c}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label style={{ font: `600 11px var(--font-body)`, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-600)", display: "block", marginBottom: 6 }}>Titre</label>
          <input value={title} onChange={e => setTitle(e.target.value)}
            placeholder="Ex : Jean cherche des chaussures taille 43"
            style={{ width: "100%", border: "1px solid var(--color-divider)", borderRadius: 14, padding: "11px 14px", font: `400 14px var(--font-body)`, background: "var(--color-neutral-100)", color: "var(--color-text)", outline: "none", boxSizing: "border-box" }} />
        </div>

        <div>
          <label style={{ font: `600 11px var(--font-body)`, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-600)", display: "block", marginBottom: 6 }}>Description (optionnel)</label>
          <textarea value={desc} onChange={e => setDesc(e.target.value)}
            placeholder="Détails utiles, sans nommer la personne"
            rows={3}
            style={{ width: "100%", border: "1px solid var(--color-divider)", borderRadius: 14, padding: "11px 14px", font: `400 14px var(--font-body)`, background: "var(--color-neutral-100)", color: "var(--color-text)", outline: "none", resize: "none", boxSizing: "border-box" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={() => setUrgent(p => !p)}
            style={{ width: 22, height: 22, borderRadius: 6, border: `1.5px solid ${urgent ? "var(--color-accent-700)" : "var(--color-neutral-400)"}`, background: urgent ? "var(--color-accent-700)" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {urgent && <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>}
          </button>
          <span style={{ font: `600 13.5px var(--font-body)` }}>Marquer comme urgent</span>
        </div>

        <ScopeSelector value={scope} onChange={setScope} />

        <button onClick={handleSubmit}
          style={{ border: 0, cursor: "pointer", borderRadius: 999, padding: "15px", font: `400 15px var(--font-heading)`, background: title.trim() ? "var(--color-accent)" : "var(--color-neutral-300)", color: title.trim() ? "var(--color-bg)" : "var(--color-neutral-600)" }}>
          Signaler ce besoin
        </button>
      </div>
    </div>
  )
}

export default function NeedsTab() {
  const [activeTab, setActiveTab] = useState("Besoins signalés")
  const [taken, setTaken] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [extraNeeds, setExtraNeeds] = useState([])

  function toggleTaken(id) {
    setTaken(p => ({ ...p, [id]: !p[id] }))
  }

  function handleNewNeed(need) {
    setExtraNeeds(p => [{ ...need, id: Date.now(), by: "Vous", date: "À l'instant", urgent: need.urgent }, ...p])
  }

  const allNeeds = [...extraNeeds, ...NEEDS]

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--color-bg)" }}>
      <div style={{ flexShrink: 0, padding: "58px 20px 4px" }}>
        <h2 style={{ fontSize: 32 }}>Besoins & annonces</h2>
      </div>

      <div style={{ flexShrink: 0, display: "flex", gap: 8, padding: "12px 20px 4px" }}>
        {["Besoins signalés", "Annonces"].map(t => {
          const on = activeTab === t
          return (
            <button key={t} onClick={() => setActiveTab(t)}
              style={{ border: `1px solid ${on ? "var(--color-accent)" : "var(--color-divider)"}`, cursor: "pointer", borderRadius: 999, padding: "9px 15px", font: `600 12.5px var(--font-body)`, background: on ? "var(--color-accent)" : "transparent", color: on ? "var(--color-bg)" : "var(--color-neutral-700)" }}>
              {t}
            </button>
          )
        })}
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "12px 20px 80px", display: "flex", flexDirection: "column", gap: 12 }}>
        {activeTab === "Besoins signalés" && allNeeds.map(n => {
          const on = !!taken[n.id]
          const [tagBg, tagFg] = TAG_COL[n.cat] || ["var(--color-neutral-200)", "var(--color-neutral-800)"]
          return (
            <div key={n.id} style={{ background: "var(--color-neutral-100)", borderRadius: 26, padding: 15, boxShadow: "var(--shadow-sm)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                <span style={{ borderRadius: 999, padding: "4px 10px", font: `600 10.5px var(--font-body)`, letterSpacing: ".05em", textTransform: "uppercase", background: tagBg, color: tagFg }}>{n.cat}</span>
                <span style={{ font: `400 11.5px var(--font-body)`, color: "var(--color-neutral-600)" }}>{n.date}</span>
                {n.urgent && <span style={{ marginLeft: "auto", font: `700 10.5px var(--font-body)`, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>urgent</span>}
                <ScopeBadge visibilite={n.visibilite || "paroisse"} />
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
                    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke={a.ink} strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"><path d={IC[a.icon]} /></svg>
                  </div>
                  <div style={{ flex: 1 }}>
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

      {activeTab === "Besoins signalés" && (
        <div style={{ position: "absolute", right: 20, bottom: 90, zIndex: 10 }}>
          <button onClick={() => setShowForm(true)}
            style={{ width: 58, height: 58, border: 0, cursor: "pointer", borderRadius: 999, background: "var(--color-accent)", color: "var(--color-bg)", boxShadow: "var(--shadow-lg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" width={26} height={26} fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"><path d={IC.plus} /></svg>
          </button>
        </div>
      )}

      {showForm && <NewNeedSheet onClose={() => setShowForm(false)} onSubmit={handleNewNeed} />}
    </div>
  )
}
