export const IC = {
  heart: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
  utensils: "M3 2v7a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V2M6 2v20M21 15V2a5 5 0 0 0-5 5v6a2 2 0 0 0 2 2h3Zm0 0v7",
  book: "M12 7v14M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
  church: "M12 2v6M9 5h6M6 22V11l6-4 6 4v11M6 22h12M10 22v-5h4v5",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  moon: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
  home: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  flame: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5Z",
  star: "m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z",
  chat: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z",
  person: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  plus: "M5 12h14M12 5v14",
  back: "m15 18-6-6 6-6",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  share: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3",
  send: "M22 2 11 13M22 2l-7 20-4-9-9-4Z",
  dots: "M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2M12 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2M12 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2",
  close: "M18 6 6 18M6 6l12 12",
  chevronRight: "m9 18 6-6-6-6",
};

const ACC = { tint: "var(--color-accent-200)", ink: "var(--color-accent-700)" };
const SAGE = { tint: "var(--color-accent-2-200)", ink: "var(--color-accent-2-700)" };
const NEU = { tint: "var(--color-neutral-200)", ink: "var(--color-neutral-800)" };

export const WEEK = [
  { id: 1, dow: "Ven", day: "12", type: "Maraude", t: "Maraude du vendredi soir", when: "20h → 23h30", where: "Départ de la paroisse", need: 4, fill: 2, c: ACC, group: 1,
    desc: "Tournée de rue pour rencontrer les personnes sans abri, distribuer repas chauds et couvertures. On vient d'abord pour la rencontre." },
  { id: 2, dow: "Dim", day: "14", type: "Repas fraternel", t: "Repas fraternel du dimanche", when: "12h → 14h30", where: "Salle paroissiale", need: 8, fill: 5, c: SAGE, group: 2,
    desc: "Repas partagé ouvert à tous : paroissiens, personnes de la rue, familles en difficulté. On cuisine, on prie, on partage." },
  { id: 3, dow: "Mer", day: "10", type: "Visite", t: "Visites aux personnes seules", when: "14h30 → 17h", where: "Quartier Mercière", need: 6, fill: 4, c: SAGE, group: 5,
    desc: "Deux par deux, on rend visite aux paroissiens isolés et aux personnes âgées du quartier. Un café, du temps, rien d'autre." },
  { id: 4, dow: "Jeu", day: "11", type: "Prière", t: "Veillée d'intercession", when: "20h30 → 21h30", where: "Chapelle du Saint-Sacrement", need: 20, fill: 9, c: NEU, group: 3,
    desc: "Une heure de louange et d'intercession pour les personnes rencontrées en maraude cette semaine." }
];

export const GROUPS = [
  { id: 1, name: "Maraude", last: "Thomas : on a 12 thermos ce soir 👍", time: "18:42", members: "14 membres · Thomas référent", icon: "heart", tint: ACC.tint, ink: ACC.ink, unread: 3 },
  { id: 2, name: "Repas fraternel", last: "Anne : je m'occupe du dessert pour 40", time: "17:10", members: "22 membres · Anne référente", icon: "utensils", tint: SAGE.tint, ink: SAGE.ink, unread: 0 },
  { id: 3, name: "Prière", last: "Père Martin : l'intention pour Ahmed est en ligne", time: "Hier", members: "38 membres · Père Martin", icon: "book", tint: NEU.tint, ink: NEU.ink, unread: 1 },
  { id: 4, name: "Pastorale", last: "Claire : compte-rendu du conseil en pièce jointe", time: "Lun.", members: "9 membres · équipe paroissiale", icon: "church", tint: "var(--color-accent-100)", ink: "var(--color-accent-700)", unread: 0 },
  { id: 5, name: "Présence & visites", last: "Vous : Marie était contente de la visite 🌼", time: "Dim.", members: "11 membres · Sylvie référente", icon: "users", tint: "var(--color-accent-2-100)", ink: "var(--color-accent-2-700)", unread: 0 }
];

export const MSGS = {
  1: [
    { who: "Thomas L.", initials: "TL", text: "On a 12 thermos ce soir, ça devrait suffire pour la boucle Perrache.", mine: false },
    { who: "Marie B.", initials: "MB", text: "Je récupère les couvertures au local à 19h30.", mine: false },
    { who: "Vous", initials: "CM", text: "Parfait, je vous rejoins directement sur le parvis.", mine: true },
    { who: "Thomas L.", initials: "TL", text: "Il nous manque le pain — quelqu'un peut passer à la boulangerie ?", mine: false }
  ],
  2: [
    { who: "Anne D.", initials: "AD", text: "40 couverts dimanche, on est 5 en cuisine.", mine: false },
    { who: "Vous", initials: "CM", text: "Je viens dès 10h pour l'épluchage.", mine: true },
    { who: "Anne D.", initials: "AD", text: "Génial. Il manque encore quelqu'un pour le dessert.", mine: false }
  ],
  3: [
    { who: "Père Martin", initials: "PM", text: "L'intention pour Ahmed est en ligne, 23 personnes prient déjà.", mine: false },
    { who: "Sylvie R.", initials: "SR", text: "Veillée jeudi 20h30, on lit l'évangile des Béatitudes.", mine: false }
  ],
  4: [
    { who: "Claire V.", initials: "CV", text: "Compte-rendu du conseil pastoral en pièce jointe.", mine: false },
    { who: "Père Martin", initials: "PM", text: "Merci Claire. On valide le Dimanche des périphéries pour le 28.", mine: false }
  ],
  5: [
    { who: "Sylvie R.", initials: "SR", text: "Marie, 82 ans, rue Mercière — qui peut passer cette semaine ?", mine: false },
    { who: "Vous", initials: "CM", text: "J'y suis allée dimanche, elle était contente 🌼", mine: true }
  ]
};

export const NEEDS = [
  { id: 1, cat: "Matériel", title: "Jean a besoin de chaussures (taille 43)", desc: "Jean, croisé chaque vendredi près de Perrache, a les chaussures complètement usées.", by: "Équipe maraude", date: "Il y a 2 j", urgent: false },
  { id: 4, cat: "Bénévolat", title: "3 cuisiniers pour le repas de dimanche", desc: "On attend 40 personnes et il nous manque du monde en cuisine dès 10h.", by: "Équipe repas", date: "Aujourd'hui", urgent: true },
  { id: 2, cat: "Accompagnement", title: "Famille syrienne — aide aux démarches", desc: "Aide pour la préfecture et la CAF. Parler arabe serait un plus.", by: "Père Martin", date: "Hier", urgent: false },
  { id: 3, cat: "Présence", title: "Marie, 82 ans, se sent très seule", desc: "Elle habite rue Mercière et ne sort presque plus. Un café, une visite.", by: "Visiteurs des malades", date: "Il y a 3 j", urgent: false }
];

export const NEWS = [
  { t: "Collecte de couvertures", by: "Équipe maraude", date: "Il y a 4 h", d: "Vague de froid annoncée : dépôt de couvertures et duvets au secrétariat, tous les jours avant 19h.", icon: "flame", tint: "var(--color-accent-200)", ink: "var(--color-accent-700)" },
  { t: "Parcours Charité — session 1", by: "Père Martin", date: "Hier", d: "Jeudi 18 avril à 19h30, salle paroissiale. Interviews, premiers pas vers la maraude, 20 places.", icon: "book", tint: "var(--color-neutral-200)", ink: "var(--color-neutral-800)" },
  { t: "Hiver solidaire : merci !", by: "Conseil pastoral", date: "Il y a 3 j", d: "112 nuits d'accueil cette saison, 38 bénévoles mobilisés. La saison se clôture le 31 mars.", icon: "church", tint: "var(--color-accent-2-200)", ink: "var(--color-accent-2-700)" }
];

export const BADGES = [
  { name: "Maraudeuse", sub: "10 sorties", icon: "heart", on: true, tint: "var(--color-accent-200)", ink: "var(--color-accent-800)" },
  { name: "Parcours Charité", sub: "validé", icon: "book", on: true, tint: "var(--color-accent-2-200)", ink: "var(--color-accent-2-800)" },
  { name: "Veilleuse", sub: "25 prières", icon: "moon", on: true, tint: "var(--color-neutral-200)", ink: "var(--color-neutral-800)" },
  { name: "Volontaire Flash", sub: "5 réponses", icon: "flame", on: true, tint: "var(--color-accent-200)", ink: "var(--color-accent-800)" },
  { name: "Référente", sub: "thermos", icon: "star", on: true, tint: "var(--color-accent-2-200)", ink: "var(--color-accent-2-800)" },
  { name: "Marraine", sub: "à débloquer", icon: "users", on: false, tint: "var(--color-neutral-200)", ink: "var(--color-neutral-500)" }
];
