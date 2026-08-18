const SCOPE_OPTIONS = [
  {
    id: "groupe",
    label: "Mon groupe",
    count: "~9 personnes de votre groupe",
    desc: "Visible uniquement par les membres de votre groupe"
  },
  {
    id: "paroisse",
    label: "Ma paroisse",
    count: "~180 paroissiens",
    desc: "Visible par tous les paroissiens de Saint-Nizier"
  },
  {
    id: "reseau",
    label: "Le réseau",
    count: "~450 personnes du réseau",
    desc: "Visible par toutes les paroisses du réseau"
  }
];

const SCOPE_BADGE_LABEL = { groupe: "groupe", paroisse: "paroisse", reseau: "réseau" };
const SCOPE_BADGE_STYLE = {
  groupe:    { bg: "var(--color-accent-2-100)", fg: "var(--color-accent-2-700)" },
  paroisse:  { bg: "var(--color-accent-100)",   fg: "var(--color-accent-700)"   },
  reseau:    { bg: "var(--color-neutral-200)",  fg: "var(--color-neutral-700)"  },
};

export function ScopeBadge({ visibilite }) {
  const s = SCOPE_BADGE_STYLE[visibilite] || SCOPE_BADGE_STYLE.paroisse;
  return (
    <span style={{ borderRadius: 999, padding: "2px 8px", font: `600 10px var(--font-body)`, letterSpacing: ".05em", textTransform: "uppercase", background: s.bg, color: s.fg }}>
      {SCOPE_BADGE_LABEL[visibilite] || visibilite}
    </span>
  );
}

export default function ScopeSelector({ value, onChange }) {
  return (
    <div>
      <div style={{ font: `600 11px var(--font-body)`, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-600)", marginBottom: 8 }}>
        Portée
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {SCOPE_OPTIONS.map(opt => {
          const on = value === opt.id;
          return (
            <button key={opt.id} onClick={() => onChange(opt.id)}
              style={{ textAlign: "left", border: `1.5px solid ${on ? "var(--color-accent)" : "var(--color-divider)"}`, borderRadius: 16, padding: "10px 14px", background: on ? "var(--color-accent-100)" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 16, height: 16, borderRadius: 999, border: `1.5px solid ${on ? "var(--color-accent)" : "var(--color-neutral-400)"}`, background: on ? "var(--color-accent)" : "transparent", flexShrink: 0, boxShadow: on ? "inset 0 0 0 3px var(--color-bg)" : "none" }} />
              <div style={{ flex: 1 }}>
                <div style={{ font: `700 13.5px var(--font-body)`, color: on ? "var(--color-accent-800)" : "var(--color-text)" }}>{opt.label}</div>
                <div style={{ font: `400 11.5px var(--font-body)`, color: "var(--color-neutral-600)", marginTop: 1 }}>{opt.count}</div>
              </div>
            </button>
          );
        })}
      </div>
      <p style={{ marginTop: 8, font: `400 11.5px/1.4 var(--font-body)`, color: "var(--color-neutral-600)" }}>
        {SCOPE_OPTIONS.find(o => o.id === value)?.desc}
      </p>
    </div>
  );
}
