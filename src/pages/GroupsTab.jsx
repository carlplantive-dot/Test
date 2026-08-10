import { useState, useEffect } from 'react'
import { GROUPS, MSGS, IC } from '../data/parishData'

function Icon({ d, size = 18, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
      stroke={color} strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

function ChatView({ grpId, onBack }) {
  const [sent, setSent] = useState(false)
  const grp = GROUPS.find(g => g.id === grpId) || GROUPS[0]
  const raw = MSGS[grp.id] || []

  const messages = raw.map((m, i) => {
    const prev = raw[i - 1]
    const first = !prev || prev.who !== m.who
    return { ...m, first }
  })

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--color-surface)" }}>
      <div style={{ flexShrink: 0, padding: "56px 16px 12px", display: "flex", alignItems: "center", gap: 11, background: "var(--color-bg)", borderBottom: "1px solid var(--color-divider)" }}>
        <button onClick={onBack} style={{ width: 38, height: 38, border: 0, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon d={IC.back} color="var(--color-neutral-800)" size={19} />
        </button>
        <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 999, background: grp.tint, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon d={IC[grp.icon]} color={grp.ink} size={19} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ font: `700 15px var(--font-body)` }}>{grp.name}</div>
          <div style={{ font: `400 11.5px var(--font-body)`, color: "var(--color-neutral-600)" }}>{grp.members}</div>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: 999, border: "1px solid var(--color-divider)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon d={IC.dots} size={17} color="var(--color-neutral-700)" />
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "16px 16px 10px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ alignSelf: "center", background: "var(--color-neutral-200)", borderRadius: 999, padding: "5px 12px", font: `600 11px var(--font-body)`, color: "var(--color-neutral-700)" }}>Aujourd'hui</div>

        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-end", alignSelf: m.mine ? "flex-end" : "flex-start", maxWidth: "82%" }}>
            {!m.mine && m.first && (
              <div style={{ width: 30, height: 30, flexShrink: 0, borderRadius: 999, background: "var(--color-accent-2-300)", display: "flex", alignItems: "center", justifyContent: "center", font: `700 11px var(--font-body)`, color: "var(--color-accent-2-900)" }}>{m.initials}</div>
            )}
            {!m.mine && !m.first && <div style={{ width: 30 }} />}
            <div style={{ background: m.mine ? "var(--color-accent)" : "var(--color-neutral-100)", color: m.mine ? "var(--color-bg)" : "var(--color-text)", borderRadius: 18, borderBottomLeftRadius: m.mine ? 18 : 6, borderBottomRightRadius: m.mine ? 6 : 18, padding: "10px 13px" }}>
              {!m.mine && m.first && <div style={{ font: `700 11.5px var(--font-body)`, color: grp.ink, marginBottom: 3 }}>{m.who}</div>}
              <div style={{ font: `400 13.5px/1.45 var(--font-body)` }}>{m.text}</div>
            </div>
          </div>
        ))}

        {sent && (
          <div style={{ alignSelf: "flex-end", background: "var(--color-accent)", color: "var(--color-bg)", borderRadius: 18, borderBottomRightRadius: 6, padding: "10px 13px", maxWidth: "82%", font: `400 13.5px/1.45 var(--font-body)` }}>
            Je m'en occupe, je passe à la boulangerie avant 19h 🙂
          </div>
        )}
      </div>

      <div style={{ flexShrink: 0, padding: "10px 14px 30px", display: "flex", alignItems: "center", gap: 9, background: "var(--color-bg)", borderTop: "1px solid var(--color-divider)" }}>
        <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 999, background: "var(--color-neutral-200)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon d={IC.plus} color="var(--color-neutral-700)" size={19} />
        </div>
        <div style={{ flex: 1, background: "var(--color-neutral-100)", border: "1px solid var(--color-divider)", borderRadius: 999, padding: "12px 16px", font: `400 13.5px var(--font-body)`, color: "var(--color-neutral-600)" }}>
          {sent ? "Écrire au groupe…" : "Je m'en occupe, je passe à la boulangerie…"}
        </div>
        <button onClick={() => setSent(true)}
          style={{ width: 44, height: 44, flexShrink: 0, border: 0, cursor: "pointer", borderRadius: 999, background: "var(--color-accent)", color: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon d={IC.send} size={19} />
        </button>
      </div>
    </div>
  )
}

export default function GroupsTab({ onNavigate, navState }) {
  const [grpId, setGrpId] = useState(null)

  useEffect(() => {
    if (navState?.grpId) setGrpId(navState.grpId)
  }, [navState])

  if (grpId !== null) {
    return <ChatView grpId={grpId} onBack={() => setGrpId(null)} />
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--color-bg)" }}>
      <div style={{ flexShrink: 0, padding: "58px 20px 6px" }}>
        <h2 style={{ fontSize: 32 }}>Mes groupes</h2>
        <p style={{ marginTop: 6, font: `400 13px/1.45 var(--font-body)`, color: "var(--color-neutral-700)" }}>Cinq groupes, cinq manières de servir. On y prépare, on y demande de l'aide, on y raconte.</p>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "14px 20px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
        {GROUPS.map(g => (
          <div key={g.id} onClick={() => setGrpId(g.id)}
            style={{ cursor: "pointer", display: "flex", gap: 12, alignItems: "center", background: "var(--color-neutral-100)", borderRadius: 24, padding: 13, boxShadow: "var(--shadow-sm)" }}>
            <div style={{ width: 48, height: 48, flexShrink: 0, borderRadius: 999, background: g.tint, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" width={21} height={21} fill="none" stroke={g.ink} strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                <path d={IC[g.icon]} />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
                <div style={{ font: `700 14.5px var(--font-body)` }}>{g.name}</div>
                <div style={{ font: `400 11px var(--font-body)`, color: "var(--color-neutral-600)", flexShrink: 0 }}>{g.time}</div>
              </div>
              <div style={{ font: `400 12.5px/1.4 var(--font-body)`, color: "var(--color-neutral-700)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{g.last}</div>
              <div style={{ font: `400 11px var(--font-body)`, color: "var(--color-neutral-600)", marginTop: 3 }}>{g.members}</div>
            </div>
            {g.unread > 0 && (
              <span style={{ flexShrink: 0, minWidth: 22, height: 22, borderRadius: 999, background: "var(--color-accent)", color: "var(--color-bg)", font: `700 11px/22px var(--font-body)`, textAlign: "center", padding: "0 6px" }}>{g.unread}</span>
            )}
          </div>
        ))}

        <div style={{ marginTop: 4, border: "1.5px dashed var(--color-neutral-400)", borderRadius: 24, padding: 15, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 999, background: "var(--color-neutral-200)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" width={19} height={19} fill="none" stroke="var(--color-neutral-700)" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
              <path d={IC.search} />
            </svg>
          </div>
          <div>
            <div style={{ font: `700 13.5px var(--font-body)` }}>Rejoindre un autre groupe</div>
            <div style={{ font: `400 12px var(--font-body)`, color: "var(--color-neutral-600)" }}>Hiver solidaire, chorale, catéchèse…</div>
          </div>
        </div>
      </div>
    </div>
  )
}
