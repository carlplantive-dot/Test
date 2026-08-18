import { useState } from 'react'
import { DISCOVER_STEPS, DISCOVER_INTERCESSION, QUIZ_QUESTIONS, QUIZ_RESULTS, IC } from '../data/parishData'

function Icon({ d, size = 18, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
      stroke={color} strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

function StepDetail({ stepId, onBack }) {
  const step = stepId === "intercession"
    ? DISCOVER_INTERCESSION
    : DISCOVER_STEPS.find(s => s.id === stepId)

  if (!step) return null

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--color-bg)" }}>
      <div style={{ flexShrink: 0, position: "relative", height: 200, background: step.tint, overflow: "hidden" }}>
        <button onClick={onBack}
          style={{ position: "absolute", top: 56, left: 18, width: 38, height: 38, border: 0, cursor: "pointer", borderRadius: 999, background: "rgba(32,30,29,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon d={IC.back} color={step.ink} />
        </button>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 20px 20px" }}>
          <div style={{ width: 44, height: 44, borderRadius: 999, background: "rgba(255,255,255,.35)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
            <Icon d={IC[step.icon]} color={step.ink} size={22} />
          </div>
          {step.label && <div style={{ font: `600 10px var(--font-body)`, letterSpacing: ".09em", textTransform: "uppercase", color: step.ink, opacity: .75, marginBottom: 4 }}>{step.label}</div>}
          <div style={{ font: `400 26px/1.1 var(--font-heading)`, color: step.ink }}>{step.name}</div>
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "18px 20px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
        <p style={{ margin: 0, font: `400 14px/1.6 var(--font-body)`, color: "var(--color-neutral-800)" }}>{step.desc}</p>

        {step.equipeRole && (
          <div style={{ background: "var(--color-neutral-100)", borderRadius: 20, padding: "13px 15px" }}>
            <div style={{ font: `600 10.5px var(--font-body)`, letterSpacing: ".07em", textTransform: "uppercase", color: "var(--color-neutral-600)", marginBottom: 6 }}>Rôle de l'équipe paroissiale</div>
            <p style={{ margin: 0, font: `400 13px/1.5 var(--font-body)`, color: "var(--color-neutral-800)" }}>{step.equipeRole}</p>
          </div>
        )}

        {step.protection && (
          <div style={{ background: "var(--color-accent-100)", borderRadius: 20, padding: "13px 15px", borderLeft: "3px solid var(--color-accent-400)" }}>
            <div style={{ font: `600 10.5px var(--font-body)`, letterSpacing: ".07em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 6 }}>Fil conducteur · protection</div>
            <p style={{ margin: 0, font: `400 13px/1.5 var(--font-body)`, color: "var(--color-accent-900)" }}>{step.protection}</p>
          </div>
        )}

        {step.maxSize && (
          <div style={{ background: "var(--color-neutral-100)", borderRadius: 20, padding: "13px 15px" }}>
            <div style={{ font: `600 10.5px var(--font-body)`, letterSpacing: ".07em", textTransform: "uppercase", color: "var(--color-neutral-600)", marginBottom: 4 }}>Taille du groupe</div>
            <div style={{ font: `700 15px var(--font-body)` }}>Max {step.maxSize} membres</div>
          </div>
        )}

        <button style={{ border: 0, cursor: "pointer", borderRadius: 999, padding: 15, font: `400 15px var(--font-heading)`, background: "var(--color-accent)", color: "var(--color-bg)" }}>
          Me lancer dans ce chemin
        </button>
      </div>
    </div>
  )
}

function PathView({ onBack, onStepOpen }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--color-bg)" }}>
      <div style={{ flexShrink: 0, padding: "56px 20px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--color-divider)" }}>
        <button onClick={onBack} style={{ width: 38, height: 38, border: 0, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon d={IC.back} color="var(--color-neutral-800)" size={19} />
        </button>
        <div>
          <h3 style={{ fontSize: 20, margin: 0 }}>Le chemin de la fraternité</h3>
          <p style={{ margin: 0, font: `400 12px var(--font-body)`, color: "var(--color-neutral-600)" }}>Chacun entre et s'arrête où il veut</p>
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "18px 20px 32px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {DISCOVER_STEPS.map((step, i) => (
            <div key={step.id}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 48 }}>
                  <button onClick={() => onStepOpen(step.id)}
                    style={{ width: 48, height: 48, border: 0, cursor: "pointer", borderRadius: 999, background: step.tint, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-sm)" }}>
                    <Icon d={IC[step.icon]} color={step.ink} size={21} />
                  </button>
                  {i < DISCOVER_STEPS.length - 1 && (
                    <div style={{ width: 2, flexGrow: 1, minHeight: 28, background: "var(--color-divider)", margin: "4px 0" }} />
                  )}
                </div>
                <div style={{ paddingTop: 10, paddingBottom: i < DISCOVER_STEPS.length - 1 ? 8 : 0, flex: 1 }}>
                  <button onClick={() => onStepOpen(step.id)}
                    style={{ border: 0, background: "none", cursor: "pointer", textAlign: "left", padding: 0, width: "100%" }}>
                    <div style={{ font: `700 15px var(--font-body)` }}>{step.name}</div>
                    <div style={{ font: `400 12.5px/1.4 var(--font-body)`, color: "var(--color-neutral-600)", marginTop: 2 }}>{step.tagline}</div>
                  </button>

                  {step.branch === "intercession" && (
                    <div style={{ marginTop: 10, marginBottom: 4, display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ width: 24, borderTop: "2px dashed var(--color-neutral-400)" }} />
                      <button onClick={() => onStepOpen("intercession")}
                        style={{ border: `1.5px dashed var(--color-neutral-400)`, background: DISCOVER_INTERCESSION.tint, cursor: "pointer", borderRadius: 20, padding: "8px 13px", display: "flex", alignItems: "center", gap: 9 }}>
                        <div style={{ width: 28, height: 28, flexShrink: 0, borderRadius: 999, background: "var(--color-neutral-300)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon d={IC[DISCOVER_INTERCESSION.icon]} color={DISCOVER_INTERCESSION.ink} size={14} />
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ font: `700 12.5px var(--font-body)`, color: DISCOVER_INTERCESSION.ink }}>{DISCOVER_INTERCESSION.name}</div>
                          <div style={{ font: `400 11px var(--font-body)`, color: "var(--color-neutral-600)" }}>{DISCOVER_INTERCESSION.tagline}</div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function QuizView({ onBack, onResult }) {
  const [qi, setQi] = useState(0)
  const [scores, setScores] = useState({})

  function pick(optScores) {
    const next = { ...scores }
    for (const [k, v] of Object.entries(optScores)) next[k] = (next[k] || 0) + v
    const newScores = next

    if (qi + 1 >= QUIZ_QUESTIONS.length) {
      const best = Object.entries(newScores).reduce((a, b) => a[1] > b[1] ? a : b, ["maraude", 0])
      onResult(QUIZ_RESULTS[best[0]] || QUIZ_RESULTS.maraude)
    } else {
      setScores(newScores)
      setQi(qi + 1)
    }
  }

  const q = QUIZ_QUESTIONS[qi]

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--color-bg)" }}>
      <div style={{ flexShrink: 0, padding: "56px 20px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--color-divider)" }}>
        <button onClick={onBack} style={{ width: 38, height: 38, border: 0, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon d={IC.back} color="var(--color-neutral-800)" size={19} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ font: `600 11px var(--font-body)`, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-600)" }}>Question {qi + 1} / {QUIZ_QUESTIONS.length}</div>
          <div style={{ height: 5, borderRadius: 999, background: "var(--color-neutral-300)", marginTop: 6, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 999, background: "var(--color-accent)", width: `${Math.round(((qi + 1) / QUIZ_QUESTIONS.length) * 100)}%`, transition: "width .3s ease" }} />
          </div>
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "24px 20px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
        <p style={{ margin: 0, font: `400 22px/1.2 var(--font-heading)`, color: "var(--color-text)" }}>{q.q}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.opts.map((opt, i) => (
            <button key={i} onClick={() => pick(opt.scores)}
              style={{ border: "1.5px solid var(--color-divider)", borderRadius: 18, padding: "13px 16px", font: `400 14px/1.4 var(--font-body)`, background: "var(--color-neutral-100)", color: "var(--color-text)", cursor: "pointer", textAlign: "left" }}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function QuizResult({ result, onExplore, onBack }) {
  const step = result.step === "intercession"
    ? DISCOVER_INTERCESSION
    : DISCOVER_STEPS.find(s => s.id === result.step)

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--color-bg)" }}>
      <div style={{ flexShrink: 0, padding: "56px 20px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--color-divider)" }}>
        <button onClick={onBack} style={{ width: 38, height: 38, border: 0, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon d={IC.back} color="var(--color-neutral-800)" size={19} />
        </button>
        <h3 style={{ fontSize: 20, margin: 0 }}>Ton chemin</h3>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "28px 20px 32px", display: "flex", flexDirection: "column", gap: 18, alignItems: "center", textAlign: "center" }}>
        {step && (
          <div style={{ width: 76, height: 76, borderRadius: 999, background: step.tint, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-md)" }}>
            <Icon d={IC[step.icon]} color={step.ink} size={34} />
          </div>
        )}
        <div>
          <div style={{ font: `600 11px var(--font-body)`, letterSpacing: ".09em", textTransform: "uppercase", color: "var(--color-neutral-600)", marginBottom: 8 }}>Le chemin qui te correspond</div>
          <div style={{ font: `400 30px/1.1 var(--font-heading)` }}>{result.label}</div>
          {step && <p style={{ marginTop: 10, font: `400 14px/1.55 var(--font-body)`, color: "var(--color-neutral-700)" }}>{step.tagline}</p>}
        </div>
        <button onClick={() => onExplore(result.step)}
          style={{ width: "100%", border: 0, cursor: "pointer", borderRadius: 999, padding: 15, font: `400 15px var(--font-heading)`, background: "var(--color-accent)", color: "var(--color-bg)" }}>
          Découvrir ce chemin
        </button>
        <button onClick={onBack}
          style={{ border: 0, background: "transparent", cursor: "pointer", font: `400 13.5px var(--font-body)`, color: "var(--color-neutral-600)", padding: 0 }}>
          Explorer tous les chemins
        </button>
      </div>
    </div>
  )
}

export default function DiscoverScreen({ onBack }) {
  const [mode, setMode] = useState("choose")
  const [quizResult, setQuizResult] = useState(null)
  const [detailId, setDetailId] = useState(null)

  if (detailId) {
    return <StepDetail stepId={detailId} onBack={() => setDetailId(null)} />
  }

  if (mode === "quiz") {
    return <QuizView onBack={() => setMode("choose")} onResult={r => { setQuizResult(r); setMode("result") }} />
  }

  if (mode === "result" && quizResult) {
    return (
      <QuizResult
        result={quizResult}
        onExplore={id => { setDetailId(id) }}
        onBack={() => setMode("path")}
      />
    )
  }

  if (mode === "path") {
    return <PathView onBack={() => setMode("choose")} onStepOpen={id => setDetailId(id)} />
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--color-bg)" }}>
      <div style={{ flexShrink: 0, padding: "56px 20px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--color-divider)" }}>
        <button onClick={onBack} style={{ width: 38, height: 38, border: 0, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon d={IC.back} color="var(--color-neutral-800)" size={19} />
        </button>
        <h3 style={{ fontSize: 20, margin: 0 }}>Découvrir</h3>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "24px 20px 40px", display: "flex", flexDirection: "column", gap: 14 }}>
        <p style={{ margin: 0, font: `400 15px/1.55 var(--font-body)`, color: "var(--color-neutral-700)" }}>
          Cinq chemins pour servir, accessibles à chacun selon sa vie et ses forces. On entre où l'on veut, on s'arrête quand on veut.
        </p>

        <button onClick={() => setMode("quiz")}
          style={{ border: 0, cursor: "pointer", textAlign: "left", borderRadius: 24, padding: 18, background: "var(--color-accent)", color: "var(--color-bg)", boxShadow: "var(--shadow-md)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 999, background: "rgba(245,234,216,.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={IC.star} color="var(--color-bg)" size={19} />
            </div>
            <div style={{ font: `700 16px var(--font-body)` }}>Trouver mon chemin</div>
          </div>
          <p style={{ margin: 0, font: `400 13.5px/1.5 var(--font-body)`, opacity: .88 }}>
            5 questions pour identifier le chemin qui correspond le mieux à ta vie, tes dons et ta disponibilité.
          </p>
        </button>

        <button onClick={() => setMode("path")}
          style={{ border: "1.5px solid var(--color-divider)", cursor: "pointer", textAlign: "left", borderRadius: 24, padding: 18, background: "var(--color-neutral-100)", boxShadow: "var(--shadow-sm)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 999, background: "var(--color-neutral-200)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={IC.compass} color="var(--color-neutral-800)" size={19} />
            </div>
            <div style={{ font: `700 16px var(--font-body)` }}>Explorer librement</div>
          </div>
          <p style={{ margin: 0, font: `400 13.5px/1.5 var(--font-body)`, color: "var(--color-neutral-700)" }}>
            Parcourir les cinq étapes du chemin et la branche intercession à son rythme.
          </p>
        </button>

        <div style={{ marginTop: 4 }}>
          <div style={{ font: `600 11px var(--font-body)`, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-500)", marginBottom: 12 }}>Les cinq chemins</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {DISCOVER_STEPS.map(step => (
              <button key={step.id} onClick={() => setDetailId(step.id)}
                style={{ border: "1px solid var(--color-divider)", cursor: "pointer", textAlign: "left", borderRadius: 18, padding: "11px 13px", background: "transparent", display: "flex", alignItems: "center", gap: 11 }}>
                <div style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 999, background: step.tint, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon d={IC[step.icon]} color={step.ink} size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ font: `700 13.5px var(--font-body)` }}>{step.name}</div>
                  <div style={{ font: `400 11.5px var(--font-body)`, color: "var(--color-neutral-600)" }}>{step.tagline}</div>
                </div>
                <Icon d={IC.chevronRight} color="var(--color-neutral-400)" size={15} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
