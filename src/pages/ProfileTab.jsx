import { BADGES, IC } from '../data/parishData'

function Icon({ d, size = 18, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
      stroke={color} strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

export default function ProfileTab() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--color-bg)" }}>
      <div style={{ flexShrink: 0, padding: "60px 20px 0", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 66, height: 66, borderRadius: 999, background: "var(--color-accent-2-300)", display: "flex", alignItems: "center", justifyContent: "center", font: `700 23px var(--font-body)`, color: "var(--color-accent-2-900)" }}>CM</div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 24 }}>Camille M.</h3>
          <div style={{ font: `400 12.5px var(--font-body)`, color: "var(--color-neutral-700)", marginTop: 3 }}>Membre depuis octobre</div>
        </div>
        <div style={{ width: 38, height: 38, borderRadius: 999, border: "1px solid var(--color-divider)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon d={IC.sliders} size={18} color="var(--color-neutral-800)" />
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "18px 20px 14px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ background: "var(--color-accent-800)", borderRadius: 26, padding: 17, color: "var(--color-bg)" }}>
          <div style={{ font: `600 10.5px var(--font-body)`, letterSpacing: ".09em", textTransform: "uppercase", color: "var(--color-accent-300)" }}>Mon engagement</div>
          <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
            {[["14", "maraudes"], ["38 h", "données"], ["62", "prières"]].map(([val, label]) => (
              <div key={label}>
                <div style={{ font: `400 30px/1 var(--font-heading)` }}>{val}</div>
                <div style={{ font: `400 11.5px var(--font-body)`, opacity: .75, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ font: `600 11px var(--font-body)`, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-600)", marginBottom: 10 }}>Mes badges</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {BADGES.map(b => (
              <div key={b.name} style={{ background: b.on ? "var(--color-neutral-100)" : "transparent", border: `1px solid ${b.on ? "var(--color-divider)" : "var(--color-neutral-400)"}`, borderRadius: 22, padding: "12px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, textAlign: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: 999, background: b.tint, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon d={IC[b.icon]} color={b.ink} size={19} />
                </div>
                <div style={{ font: `700 11.5px/1.25 var(--font-body)`, color: b.on ? "var(--color-text)" : "var(--color-neutral-600)" }}>{b.name}</div>
                <div style={{ font: `400 10px/1.2 var(--font-body)`, color: "var(--color-neutral-600)" }}>{b.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ font: `600 11px var(--font-body)`, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-600)", marginBottom: 10 }}>Mes paroisses</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "var(--color-neutral-100)", borderRadius: 24, padding: 14, display: "flex", alignItems: "center", gap: 12, boxShadow: "var(--shadow-sm)" }}>
              <div style={{ width: 42, height: 42, flexShrink: 0, borderRadius: 999, background: "var(--color-accent-200)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon d={IC.church} color="var(--color-accent-800)" size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ font: `700 14px var(--font-body)` }}>Saint-Nizier · Lyon 2<sup>e</sup></div>
                <div style={{ font: `400 12px var(--font-body)`, color: "var(--color-neutral-700)" }}>Paroisse principale · 412 membres</div>
              </div>
              <span style={{ borderRadius: 999, padding: "5px 10px", font: `600 10.5px var(--font-body)`, background: "var(--color-accent)", color: "var(--color-bg)" }}>active</span>
            </div>

            <div style={{ background: "var(--color-neutral-100)", borderRadius: 24, padding: 14, display: "flex", alignItems: "center", gap: 12, boxShadow: "var(--shadow-sm)" }}>
              <div style={{ width: 42, height: 42, flexShrink: 0, borderRadius: 999, background: "var(--color-neutral-200)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon d={IC.church} color="var(--color-neutral-700)" size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ font: `700 14px var(--font-body)` }}>Saint-Bonaventure</div>
                <div style={{ font: `400 12px var(--font-body)`, color: "var(--color-neutral-700)" }}>Suivie · maraudes du mardi</div>
              </div>
            </div>

            <div style={{ border: "1.5px dashed var(--color-neutral-400)", borderRadius: 24, padding: 13, display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 999, background: "var(--color-neutral-200)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon d={IC.plus} color="var(--color-neutral-700)" size={17} />
              </div>
              <div style={{ font: `700 13px var(--font-body)` }}>Ajouter une paroisse</div>
            </div>
          </div>
        </div>

        <div>
          <div style={{ font: `600 11px var(--font-body)`, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-600)", marginBottom: 10 }}>Mes prochaines fois</div>
          <div style={{ background: "var(--color-neutral-100)", borderRadius: 24, padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 46, flexShrink: 0, textAlign: "center" }}>
              <div style={{ font: `400 21px/1 var(--font-heading)`, color: "var(--color-accent-700)" }}>12</div>
              <div style={{ font: `600 10.5px var(--font-body)`, color: "var(--color-neutral-600)", marginTop: 2 }}>AVR</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ font: `700 14px var(--font-body)` }}>Maraude du vendredi soir</div>
              <div style={{ font: `400 12px var(--font-body)`, color: "var(--color-neutral-700)" }}>20h00 · avec Thomas et Marie</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
