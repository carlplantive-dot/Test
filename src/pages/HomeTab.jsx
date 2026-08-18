import { useState } from 'react'
import { WEEK, GROUPS, PRAYER_INTENTIONS, IC } from '../data/parishData'
import ScopeSelector, { ScopeBadge } from '../components/ScopeSelector'
import DiscoverScreen from './DiscoverScreen'

function Icon({ d, size = 18, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
      stroke={color} strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

function EventCard({ e, signed, onSign, onOpen }) {
  const fill = e.fill + (signed ? 1 : 0)
  const left = e.need - fill
  const pct = Math.min(100, Math.round((fill / e.need) * 100))
  return (
    <div style={{ background: "var(--color-neutral-100)", borderRadius: 26, padding: 14, boxShadow: "var(--shadow-sm)" }}>
      <div onClick={onOpen} style={{ display: "flex", gap: 13, alignItems: "flex-start", cursor: "pointer" }}>
        <div style={{ width: 52, flexShrink: 0, textAlign: "center", background: e.c.tint, borderRadius: 18, padding: "8px 0" }}>
          <div style={{ font: `600 10px/1 var(--font-body)`, letterSpacing: ".06em", textTransform: "uppercase", color: e.c.ink }}>{e.dow}</div>
          <div style={{ font: `400 22px/1.05 var(--font-heading)`, color: e.c.ink, marginTop: 3 }}>{e.day}</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ font: `600 10px/1 var(--font-body)`, letterSpacing: ".08em", textTransform: "uppercase", color: e.c.ink }}>{e.type}</div>
          <div style={{ font: `700 15.5px/1.25 var(--font-body)`, margin: "5px 0 4px" }}>{e.t}</div>
          <div style={{ font: `400 12.5px/1.4 var(--font-body)`, color: "var(--color-neutral-700)" }}>{e.when} · {e.where}</div>
        </div>
      </div>
      <div style={{ margin: "12px 0 11px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", font: `600 11.5px var(--font-body)`, color: "var(--color-neutral-600)", marginBottom: 6 }}>
          <span>{fill}/{e.need} inscrits</span>
          <span style={{ color: left <= 2 ? "var(--color-accent-700)" : "var(--color-neutral-600)" }}>
            {left <= 0 ? "complet" : `${left} place${left > 1 ? "s" : ""} restante${left > 1 ? "s" : ""}`}
          </span>
        </div>
        <div style={{ height: 7, borderRadius: 999, background: "var(--color-neutral-300)", overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 999, background: e.c.ink, width: pct + "%", transition: "width .25s ease" }} />
        </div>
      </div>
      <button onClick={onSign}
        style={{ width: "100%", border: 0, cursor: "pointer", borderRadius: 999, padding: 13, font: `400 14px var(--font-heading)`, background: signed ? "var(--color-accent-2-200)" : "var(--color-accent)", color: signed ? "var(--color-accent-2-800)" : "var(--color-bg)" }}>
        {signed ? "Inscrit·e · voir le groupe" : "Je viens"}
      </button>
    </div>
  )
}

function EventDetail({ evId, signed, onSign, onBack, onOpenGroup }) {
  const e = WEEK.find(x => x.id === evId) || WEEK[0]
  const grp = GROUPS.find(g => g.id === e.group)
  const isOn = signed[e.id]
  const fill = e.fill + (isOn ? 1 : 0)
  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
      <div style={{ flexShrink: 0, position: "relative", height: 228, background: "var(--color-accent-800)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(32,30,29,.85), rgba(32,30,29,.15))" }} />
        <button onClick={onBack}
          style={{ position: "absolute", top: 56, left: 18, width: 38, height: 38, border: 0, cursor: "pointer", borderRadius: 999, background: "rgba(245,234,216,.24)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon d={IC.back} color="#f5ead8" />
        </button>
        <div style={{ position: "absolute", left: 20, right: 20, bottom: 16, color: "var(--color-bg)" }}>
          <span style={{ display: "inline-block", borderRadius: 999, padding: "5px 11px", font: `600 10.5px var(--font-body)`, letterSpacing: ".06em", textTransform: "uppercase", background: "var(--color-accent)" }}>{e.type}</span>
          <div style={{ font: `400 27px/1.1 var(--font-heading)`, marginTop: 9 }}>{e.t}</div>
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "16px 20px 10px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", gap: 10 }}>
          {[["Quand", e.when], ["Où", e.where]].map(([label, val]) => (
            <div key={label} style={{ flex: 1, background: "var(--color-neutral-100)", borderRadius: 20, padding: 12 }}>
              <div style={{ font: `600 10.5px var(--font-body)`, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-neutral-600)" }}>{label}</div>
              <div style={{ font: `700 13.5px var(--font-body)`, marginTop: 4 }}>{val}</div>
            </div>
          ))}
        </div>
        <p style={{ font: `400 14px/1.55 var(--font-body)`, color: "var(--color-neutral-800)" }}>{e.desc}</p>
        <div>
          <div style={{ font: `600 11px var(--font-body)`, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-600)", marginBottom: 9 }}>L'équipe · {fill} sur {e.need}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {["TL", "MB"].map((i, idx) => (
              <div key={i} style={{ width: 38, height: 38, borderRadius: 999, background: idx === 0 ? "var(--color-accent-300)" : "var(--color-accent-2-300)", display: "flex", alignItems: "center", justifyContent: "center", font: `700 13px var(--font-body)`, color: idx === 0 ? "var(--color-accent-900)" : "var(--color-accent-2-900)" }}>{i}</div>
            ))}
            <div style={{ width: 38, height: 38, borderRadius: 999, border: "1.5px dashed var(--color-neutral-400)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-neutral-500)" }}>
              <Icon d={IC.plus} size={16} color="var(--color-neutral-500)" />
            </div>
            <span style={{ font: `400 12.5px var(--font-body)`, color: "var(--color-neutral-700)", marginLeft: 4 }}>Thomas est référent</span>
          </div>
        </div>
        <div onClick={onOpenGroup} style={{ cursor: "pointer", background: "var(--color-accent-2-100)", borderRadius: 24, padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 999, background: "var(--color-accent-2-300)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon d={IC.chat} color="var(--color-accent-2-900)" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ font: `700 14px var(--font-body)`, color: "var(--color-accent-2-900)" }}>Groupe «&nbsp;{grp?.name}&nbsp;»</div>
            <div style={{ font: `400 12px var(--font-body)`, color: "var(--color-accent-2-800)" }}>Le groupe qui prépare et débriefe</div>
          </div>
          <Icon d={IC.chevronRight} color="var(--color-accent-2-700)" />
        </div>
      </div>
      <div style={{ flexShrink: 0, padding: "6px 20px 30px", display: "flex", gap: 10 }}>
        <button onClick={onSign}
          style={{ flex: 1, border: 0, cursor: "pointer", borderRadius: 999, padding: 16, font: `400 15.5px var(--font-heading)`, background: isOn ? "var(--color-accent-2-600)" : "var(--color-accent)", color: "var(--color-bg)" }}>
          {isOn ? "Inscrit·e · voir le groupe" : "Je rejoins l'équipe"}
        </button>
        <button style={{ flexShrink: 0, width: 56, border: "1px solid var(--color-divider)", background: "transparent", cursor: "pointer", borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon d={IC.share} color="var(--color-neutral-800)" size={20} />
        </button>
      </div>
    </div>
  )
}

function NewPrayerSheet({ onClose, onSubmit }) {
  const [text, setText] = useState("")
  const [scope, setScope] = useState("groupe")

  function handleSubmit() {
    if (!text.trim()) return
    onSubmit({ text, visibilite: scope })
    onClose()
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "rgba(32,30,29,.5)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: "var(--color-bg)", borderRadius: "28px 28px 0 0", padding: "24px 20px 40px", display: "flex", flexDirection: "column", gap: 16, maxHeight: "85vh", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ fontSize: 22 }}>Déposer une intention</h3>
          <button onClick={onClose} style={{ border: 0, background: "var(--color-neutral-200)", cursor: "pointer", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 999 }}>
            <Icon d={IC.close} size={16} color="var(--color-neutral-700)" />
          </button>
        </div>

        <div style={{ background: "var(--color-accent-2-100)", borderRadius: 14, padding: "10px 14px", font: `400 12.5px/1.5 var(--font-body)`, color: "var(--color-accent-2-800)" }}>
          Ne nommez pas la personne si vous diffusez au-delà de votre groupe — une description suffit.
        </div>

        <div>
          <label style={{ font: `600 11px var(--font-body)`, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-600)", display: "block", marginBottom: 6 }}>Intention</label>
          <textarea value={text} onChange={e => setText(e.target.value)}
            placeholder="Ex : pour une personne rencontrée vendredi qui cherche un hébergement…"
            rows={4}
            style={{ width: "100%", border: "1px solid var(--color-divider)", borderRadius: 14, padding: "11px 14px", font: `400 14px var(--font-body)`, background: "var(--color-neutral-100)", color: "var(--color-text)", outline: "none", resize: "none", boxSizing: "border-box" }} />
        </div>

        <ScopeSelector value={scope} onChange={setScope} />

        <button onClick={handleSubmit}
          style={{ border: 0, cursor: "pointer", borderRadius: 999, padding: 15, font: `400 15px var(--font-heading)`, background: text.trim() ? "var(--color-accent-2-600)" : "var(--color-neutral-300)", color: text.trim() ? "var(--color-bg)" : "var(--color-neutral-600)" }}>
          Déposer l'intention
        </button>
      </div>
    </div>
  )
}

export default function HomeTab({ onNavigate }) {
  const [signed, setSigned] = useState({})
  const [prayed, setPrayed] = useState({})
  const [flashOpen, setFlashOpen] = useState(true)
  const [flashHelp, setFlashHelp] = useState(false)
  const [view, setView] = useState("main")
  const [evId, setEvId] = useState(1)
  const [showPrayerForm, setShowPrayerForm] = useState(false)
  const [extraIntentions, setExtraIntentions] = useState([])

  function toggleSign(id) { setSigned(p => ({ ...p, [id]: !p[id] })) }
  function togglePray(id) { setPrayed(p => ({ ...p, [id]: !p[id] })) }

  function handleSign(e) {
    if (signed[e.id]) onNavigate("groups", { grpId: e.group })
    else toggleSign(e.id)
  }

  function handleNewPrayer(prayer) {
    setExtraIntentions(p => [{ ...prayer, id: Date.now(), by: "Vous", date: "À l'instant", prayCount: 0 }, ...p])
  }

  if (view === "discover") {
    return <DiscoverScreen onBack={() => setView("main")} />
  }

  if (view === "event") {
    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--color-bg)" }}>
        <EventDetail
          evId={evId}
          signed={signed}
          onSign={() => {
            const e = WEEK.find(x => x.id === evId)
            if (signed[evId]) onNavigate("groups", { grpId: e.group })
            else toggleSign(evId)
          }}
          onBack={() => setView("main")}
          onOpenGroup={() => {
            const e = WEEK.find(x => x.id === evId)
            onNavigate("groups", { grpId: e.group })
          }}
        />
      </div>
    )
  }

  const signedCount = Object.values(signed).filter(Boolean).length
  const allIntentions = [...extraIntentions, ...PRAYER_INTENTIONS]

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--color-bg)" }}>
      <div style={{ flexShrink: 0, padding: "60px 18px 8px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 42, height: 42, borderRadius: 999, background: "var(--color-accent-2-300)", display: "flex", alignItems: "center", justifyContent: "center", font: `700 15px var(--font-body)`, color: "var(--color-accent-2-800)" }}>CM</div>
        <div style={{ flex: 1 }}>
          <div style={{ font: `700 16px/1.2 var(--font-body)` }}>Bonjour Camille</div>
          <div style={{ font: `400 12px/1.3 var(--font-body)`, color: "var(--color-neutral-700)" }}>Paroisse Saint-Nizier · Lyon 2<sup>e</sup></div>
        </div>
        <div style={{ width: 42, height: 42, borderRadius: 999, background: "var(--color-neutral-100)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", boxShadow: "var(--shadow-sm)" }}>
          <Icon d={IC.bell} color="var(--color-neutral-800)" size={19} />
          <span style={{ position: "absolute", top: 8, right: 9, width: 8, height: 8, borderRadius: 999, background: "var(--color-accent)", border: "2px solid var(--color-neutral-100)" }} />
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "6px 18px 12px", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Flash Fraternité */}
        {flashOpen && (
          <div style={{ background: "var(--color-accent)", borderRadius: 26, padding: "15px 16px", color: "var(--color-bg)", boxShadow: "var(--shadow-md)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--color-bg)", animation: "pulseFlash 1.9s ease-out infinite" }} />
              <span style={{ font: `700 10.5px/1 var(--font-body)`, letterSpacing: ".1em", textTransform: "uppercase", opacity: .95 }}>Flash Fraternité · il y a 15 min</span>
              <button onClick={() => setFlashOpen(false)}
                style={{ marginLeft: "auto", border: 0, background: "transparent", cursor: "pointer", color: "var(--color-bg)", opacity: .75, padding: 2, display: "flex" }}>
                <Icon d={IC.close} size={16} />
              </button>
            </div>
            <div style={{ font: `400 18px/1.22 var(--font-heading)`, margin: "9px 0 11px" }}>Repas improvisé ce soir pour 10 personnes du foyer</div>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <button onClick={() => setFlashHelp(p => !p)}
                style={{ border: 0, cursor: "pointer", borderRadius: 999, padding: "10px 17px", font: `400 13.5px var(--font-heading)`, background: flashHelp ? "var(--color-accent-800)" : "var(--color-bg)", color: flashHelp ? "var(--color-bg)" : "var(--color-accent-800)" }}>
                {flashHelp ? "Tu réponds · voir le groupe" : "Je peux aider"}
              </button>
              <span style={{ font: `400 12px var(--font-body)`, opacity: .88 }}>{3 + (flashHelp ? 1 : 0)} paroissiens ont répondu</span>
            </div>
          </div>
        )}

        {/* Découvrir */}
        <button onClick={() => setView("discover")}
          style={{ border: 0, cursor: "pointer", textAlign: "left", borderRadius: 24, padding: "14px 16px", background: "var(--color-accent-800)", color: "var(--color-bg)", display: "flex", alignItems: "center", gap: 13, boxShadow: "var(--shadow-sm)" }}>
          <div style={{ width: 42, height: 42, flexShrink: 0, borderRadius: 999, background: "rgba(245,234,216,.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon d={IC.compass} color="var(--color-bg)" size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ font: `700 15px var(--font-body)` }}>Découvrir le chemin</div>
            <div style={{ font: `400 12.5px var(--font-body)`, opacity: .78, marginTop: 2 }}>5 chemins · quiz + exploration libre</div>
          </div>
          <Icon d={IC.chevronRight} color="rgba(245,234,216,.6)" size={17} />
        </button>

        {/* Cette semaine */}
        <div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
            <h3 style={{ fontSize: 24 }}>Cette semaine</h3>
            <span style={{ font: `600 12px var(--font-body)`, color: "var(--color-accent-700)" }}>{signedCount ? `${signedCount} inscription${signedCount > 1 ? "s" : ""}` : "4 propositions"}</span>
          </div>
          <p style={{ font: `400 12.5px/1.45 var(--font-body)`, color: "var(--color-neutral-700)" }}>8 → 14 avril · inscris-toi d'un geste, ton équipe te retrouve dans son groupe.</p>
        </div>

        {WEEK.map(e => (
          <EventCard key={e.id} e={e} signed={!!signed[e.id]}
            onSign={() => handleSign(e)}
            onOpen={() => { setEvId(e.id); setView("event") }}
          />
        ))}

        {/* Intentions de prière */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <div style={{ font: `600 11px var(--font-body)`, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-600)" }}>Intentions de prière</div>
          <button onClick={() => setShowPrayerForm(true)}
            style={{ border: 0, background: "transparent", cursor: "pointer", font: `600 12px var(--font-body)`, color: "var(--color-accent-700)", padding: 0 }}>
            + Déposer
          </button>
        </div>

        {allIntentions.map(intention => {
          const isPrayed = !!prayed[intention.id]
          return (
            <div key={intention.id} style={{ background: "var(--color-accent-2-100)", borderRadius: 26, padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ font: `400 11px var(--font-body)`, color: "var(--color-accent-2-700)" }}>{intention.by} · {intention.date}</span>
                <ScopeBadge visibilite={intention.visibilite} />
              </div>
              <p style={{ margin: "0 0 12px", font: `400 15px/1.4 var(--font-heading)`, color: "var(--color-accent-2-900)" }}>{intention.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <button onClick={() => togglePray(intention.id)}
                  style={{ border: 0, cursor: "pointer", borderRadius: 999, padding: "10px 16px", font: `400 13px var(--font-heading)`, background: isPrayed ? "var(--color-accent-2-600)" : "var(--color-accent-2-300)", color: isPrayed ? "var(--color-bg)" : "var(--color-accent-2-900)" }}>
                  {isPrayed ? "Je prie 🙏" : "Je prie"}
                </button>
                <span style={{ font: `400 12px var(--font-body)`, color: "var(--color-accent-2-800)" }}>{(intention.prayCount || 0) + (isPrayed ? 1 : 0)} paroissiens prient</span>
              </div>
            </div>
          )
        })}
      </div>

      {showPrayerForm && <NewPrayerSheet onClose={() => setShowPrayerForm(false)} onSubmit={handleNewPrayer} />}
    </div>
  )
}
