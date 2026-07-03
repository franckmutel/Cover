export type AnswerOption = {
  label: string;
  score: number;
};

export type Question = {
  id: number;
  themeId: number;
  text: string;
};

export type Theme = {
  id: number;
  name: string;
  iconName: string;
  color: string;
  questions: Question[];      // 6 questions — used by the full 30-question diagnostic
  quizQuestions: Question[];  // 30 questions — used by the per-theme quiz
};

export const ANSWER_OPTIONS: AnswerOption[] = [
  { label: 'Jamais', score: 0 },
  { label: 'Rarement', score: 1 },
  { label: 'Parfois', score: 2 },
  { label: 'Souvent', score: 3 },
  { label: 'Toujours', score: 4 },
];

/** Used by the full 30-question diagnostic (6 questions × max 4 pts) */
export const MAX_SCORE_PER_THEME = 6 * 4;

/** Used by the per-theme 30-question quiz (30 questions × max 4 pts) */
export const MAX_QUIZ_SCORE_PER_THEME = 30 * 4;

export const THEMES: Theme[] = [
  // ─────────────────────────────────────────────────────────────
  // THÈME 1 — Bien-être Personnel
  // ─────────────────────────────────────────────────────────────
  {
    id: 1,
    name: 'Bien-être Personnel',
    iconName: 'heart',
    color: '#E06B7D',
    questions: [
      { id: 1, themeId: 1, text: 'Je me sens épanoui(e) dans ma vie quotidienne.' },
      { id: 2, themeId: 1, text: 'Je gère efficacement mon stress et mes tensions.' },
      { id: 3, themeId: 1, text: 'Je prends du temps pour mes passions et mes loisirs.' },
      { id: 4, themeId: 1, text: 'Je me sens en paix avec moi-même.' },
      { id: 5, themeId: 1, text: "J'exprime librement et sainement mes émotions." },
      { id: 6, themeId: 1, text: 'Je maintiens un équilibre entre mes responsabilités et mes plaisirs.' },
    ],
    quizQuestions: [
      { id: 101, themeId: 1, text: 'Je me sens épanoui(e) dans ma vie quotidienne.' },
      { id: 102, themeId: 1, text: 'Je gère efficacement mon stress et mes tensions.' },
      { id: 103, themeId: 1, text: 'Je prends du temps pour mes passions et mes loisirs.' },
      { id: 104, themeId: 1, text: 'Je me sens en paix avec moi-même.' },
      { id: 105, themeId: 1, text: "J'exprime librement et sainement mes émotions." },
      { id: 106, themeId: 1, text: 'Je maintiens un équilibre entre mes responsabilités et mes plaisirs.' },
      { id: 107, themeId: 1, text: 'Je dors suffisamment pour me sentir reposé(e) chaque matin.' },
      { id: 108, themeId: 1, text: 'Je suis capable de me ressourcer après une période difficile.' },
      { id: 109, themeId: 1, text: 'Je me reconnais des qualités et je les valorise.' },
      { id: 110, themeId: 1, text: "Je sais demander de l'aide quand j'en ai besoin." },
      { id: 111, themeId: 1, text: 'Je prends soin de mon corps avec bienveillance.' },
      { id: 112, themeId: 1, text: 'Je me sens libre d\'être moi-même au quotidien.' },
      { id: 113, themeId: 1, text: 'Je vis en accord avec mes valeurs profondes.' },
      { id: 114, themeId: 1, text: 'J\'accepte mes imperfections sans me juger sévèrement.' },
      { id: 115, themeId: 1, text: 'Je ressens de la gratitude pour ce que j\'ai dans ma vie.' },
      { id: 116, themeId: 1, text: 'Je sais reconnaître quand je me surcharge et j\'ajuste mon rythme.' },
      { id: 117, themeId: 1, text: 'Je me permets de dire non sans culpabilité.' },
      { id: 118, themeId: 1, text: 'Je trouve des moments de joie et de légèreté chaque jour.' },
      { id: 119, themeId: 1, text: 'Je prends le temps de célébrer mes réussites, même les plus petites.' },
      { id: 120, themeId: 1, text: 'Je ne laisse pas les pensées négatives envahir mon quotidien.' },
      { id: 121, themeId: 1, text: 'Je me sens capable de traverser les moments difficiles.' },
      { id: 122, themeId: 1, text: "J'accorde autant d'importance à ma santé mentale qu'à ma santé physique." },
      { id: 123, themeId: 1, text: 'Je sais ce qui me rend heureux(se) et je le recherche activement.' },
      { id: 124, themeId: 1, text: 'Je me sens aligné(e) avec qui je suis vraiment.' },
      { id: 125, themeId: 1, text: 'Je préserve du temps pour moi, hors de toutes obligations.' },
      { id: 126, themeId: 1, text: 'Je gère bien mes émotions en situation de conflit.' },
      { id: 127, themeId: 1, text: 'Je me sens en sécurité émotionnelle dans ma vie.' },
      { id: 128, themeId: 1, text: "J'accueille le changement avec sérénité plutôt qu'avec anxiété." },
      { id: 129, themeId: 1, text: 'Je suis satisfait(e) de la direction que prend ma vie.' },
      { id: 130, themeId: 1, text: 'Je m\'apprécie et je m\'aime tel(le) que je suis.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // THÈME 2 — Relations Sociales
  // ─────────────────────────────────────────────────────────────
  {
    id: 2,
    name: 'Relations Sociales',
    iconName: 'people',
    color: '#5B9BD5',
    questions: [
      { id: 7, themeId: 2, text: 'Mes relations avec mes proches sont harmonieuses et épanouissantes.' },
      { id: 8, themeId: 2, text: "J'ose exprimer mes besoins et mes limites à mon entourage." },
      { id: 9, themeId: 2, text: "Je me sens soutenu(e) et compris(e) par les personnes qui m'entourent." },
      { id: 10, themeId: 2, text: 'Je sais établir des limites saines dans mes relations.' },
      { id: 11, themeId: 2, text: 'Je cultive des amitiés sincères et nourrissantes.' },
      { id: 12, themeId: 2, text: 'Je me sens à l\'aise et confiant(e) dans les situations sociales.' },
    ],
    quizQuestions: [
      { id: 201, themeId: 2, text: 'Mes relations avec mes proches sont harmonieuses et épanouissantes.' },
      { id: 202, themeId: 2, text: "J'ose exprimer mes besoins et mes limites à mon entourage." },
      { id: 203, themeId: 2, text: "Je me sens soutenu(e) et compris(e) par les personnes qui m'entourent." },
      { id: 204, themeId: 2, text: 'Je sais établir des limites saines dans mes relations.' },
      { id: 205, themeId: 2, text: 'Je cultive des amitiés sincères et nourrissantes.' },
      { id: 206, themeId: 2, text: 'Je me sens à l\'aise et confiant(e) dans les situations sociales.' },
      { id: 207, themeId: 2, text: 'Je communique de manière claire et bienveillante avec les autres.' },
      { id: 208, themeId: 2, text: 'Je sais écouter les autres avec attention et empathie.' },
      { id: 209, themeId: 2, text: 'Je suis capable de pardonner et de dépasser les conflits.' },
      { id: 210, themeId: 2, text: 'Je fais confiance aux gens qui m\'entourent.' },
      { id: 211, themeId: 2, text: 'Je passe du temps de qualité avec mes proches.' },
      { id: 212, themeId: 2, text: 'Je me sens aimé(e) et apprécié(e) par mon entourage.' },
      { id: 213, themeId: 2, text: 'Je suis capable d\'exprimer mes désaccords sans blesser l\'autre.' },
      { id: 214, themeId: 2, text: 'Je noue facilement de nouvelles relations quand je le souhaite.' },
      { id: 215, themeId: 2, text: 'Je suis présent(e) et attentif(ve) lors de mes interactions.' },
      { id: 216, themeId: 2, text: 'Je respecte les différences de mes proches sans les juger.' },
      { id: 217, themeId: 2, text: 'Je sais gérer les situations de conflit avec calme et bienveillance.' },
      { id: 218, themeId: 2, text: 'Je me sens utile et apprécié(e) dans mes relations.' },
      { id: 219, themeId: 2, text: "J'ai au moins une personne à qui je peux me confier sans retenue." },
      { id: 220, themeId: 2, text: 'Je maintiens des liens avec mes proches même quand la vie est chargée.' },
      { id: 221, themeId: 2, text: 'Je reconnais et apprécie les efforts que font les autres pour moi.' },
      { id: 222, themeId: 2, text: 'Je suis capable de demander de l\'aide à mes proches sans gêne.' },
      { id: 223, themeId: 2, text: 'Je ne me sens pas seul(e) même dans les moments difficiles.' },
      { id: 224, themeId: 2, text: 'Mes relations m\'apportent de la joie et de l\'énergie positive.' },
      { id: 225, themeId: 2, text: 'Je veille à l\'équilibre entre ce que je donne et ce que je reçois.' },
      { id: 226, themeId: 2, text: 'Je suis à l\'aise pour aborder des sujets sensibles avec mes proches.' },
      { id: 227, themeId: 2, text: "J'accueille les nouvelles personnes avec ouverture et curiosité." },
      { id: 228, themeId: 2, text: 'Je sais distinguer les relations saines de celles qui m\'épuisent.' },
      { id: 229, themeId: 2, text: 'Je gère bien la jalousie ou l\'envie dans mes relations.' },
      { id: 230, themeId: 2, text: 'Je me sens profondément connecté(e) aux personnes qui comptent pour moi.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // THÈME 3 — Vie Professionnelle
  // ─────────────────────────────────────────────────────────────
  {
    id: 3,
    name: 'Vie Professionnelle',
    iconName: 'briefcase',
    color: '#8B7EC8',
    questions: [
      { id: 13, themeId: 3, text: 'Je me sens motivé(e) et épanoui(e) dans mon travail.' },
      { id: 14, themeId: 3, text: 'Mon environnement de travail est sain et bienveillant.' },
      { id: 15, themeId: 3, text: 'Mes compétences et contributions sont reconnues à leur juste valeur.' },
      { id: 16, themeId: 3, text: "J'arrive à déconnecter du travail en dehors des heures de bureau." },
      { id: 17, themeId: 3, text: 'Mes relations avec mes collègues sont agréables et positives.' },
      { id: 18, themeId: 3, text: 'Je trouve du sens dans mon activité professionnelle.' },
    ],
    quizQuestions: [
      { id: 301, themeId: 3, text: 'Je me sens motivé(e) et épanoui(e) dans mon travail.' },
      { id: 302, themeId: 3, text: 'Mon environnement de travail est sain et bienveillant.' },
      { id: 303, themeId: 3, text: 'Mes compétences et contributions sont reconnues à leur juste valeur.' },
      { id: 304, themeId: 3, text: "J'arrive à déconnecter du travail en dehors des heures de bureau." },
      { id: 305, themeId: 3, text: 'Mes relations avec mes collègues sont agréables et positives.' },
      { id: 306, themeId: 3, text: 'Je trouve du sens dans mon activité professionnelle.' },
      { id: 307, themeId: 3, text: 'Je me sens compétent(e) dans mon domaine et je le reconnais.' },
      { id: 308, themeId: 3, text: 'Je suis capable de gérer ma charge de travail sans me sentir submergé(e).' },
      { id: 309, themeId: 3, text: 'Je m\'entends bien avec ma hiérarchie et je me sens respecté(e).' },
      { id: 310, themeId: 3, text: 'Je peux exprimer mes idées et opinions librement au travail.' },
      { id: 311, themeId: 3, text: 'Mon travail n\'empiète pas négativement sur ma vie personnelle.' },
      { id: 312, themeId: 3, text: 'Je me fixe des objectifs professionnels clairs et stimulants.' },
      { id: 313, themeId: 3, text: 'Je prends des initiatives et je me sens libre de le faire.' },
      { id: 314, themeId: 3, text: 'J\'apprends et je progresse continuellement dans mon travail.' },
      { id: 315, themeId: 3, text: 'Je suis satisfait(e) de ma rémunération et de mes conditions de travail.' },
      { id: 316, themeId: 3, text: 'Je sais dire non à une surcharge professionnelle.' },
      { id: 317, themeId: 3, text: 'Je m\'organise efficacement pour accomplir mes tâches dans les délais.' },
      { id: 318, themeId: 3, text: 'Je me sens utile et impactant(e) dans mon poste.' },
      { id: 319, themeId: 3, text: 'Je gère bien la pression et les délais professionnels.' },
      { id: 320, themeId: 3, text: 'Je prends soin de ne pas sacrifier ma santé pour le travail.' },
      { id: 321, themeId: 3, text: 'Je suis fier(ère) de ce que j\'accomplis professionnellement.' },
      { id: 322, themeId: 3, text: 'Je me sens en sécurité dans mon emploi.' },
      { id: 323, themeId: 3, text: 'Je peux parler de mes difficultés professionnelles sans crainte de jugement.' },
      { id: 324, themeId: 3, text: 'Je me forme et j\'évolue régulièrement dans ma carrière.' },
      { id: 325, themeId: 3, text: 'Mon travail est une source d\'épanouissement, pas seulement de revenus.' },
      { id: 326, themeId: 3, text: 'Je reçois les critiques constructives avec ouverture.' },
      { id: 327, themeId: 3, text: 'Je contribue positivement à l\'atmosphère de mon équipe.' },
      { id: 328, themeId: 3, text: 'Je respecte mes propres limites dans le cadre professionnel.' },
      { id: 329, themeId: 3, text: 'Je prends des congés et des pauses sans culpabilité.' },
      { id: 330, themeId: 3, text: 'Mon travail correspond à mes valeurs et à qui je suis vraiment.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // THÈME 4 — Santé & Équilibre
  // ─────────────────────────────────────────────────────────────
  {
    id: 4,
    name: 'Santé & Équilibre',
    iconName: 'leaf',
    color: '#4CAF8A',
    questions: [
      { id: 19, themeId: 4, text: 'Je dors suffisamment et me réveille reposé(e).' },
      { id: 20, themeId: 4, text: 'Je pratique une activité physique régulièrement.' },
      { id: 21, themeId: 4, text: 'Mon alimentation est équilibrée et adaptée à mes besoins.' },
      { id: 22, themeId: 4, text: 'Je prends soin de ma santé de manière préventive et consciente.' },
      { id: 23, themeId: 4, text: 'Je me sens bien et à l\'aise dans mon corps.' },
      { id: 24, themeId: 4, text: 'Je parviens à me détendre pleinement et à recharger mes batteries.' },
    ],
    quizQuestions: [
      { id: 401, themeId: 4, text: 'Je dors suffisamment et me réveille reposé(e).' },
      { id: 402, themeId: 4, text: 'Je pratique une activité physique régulièrement.' },
      { id: 403, themeId: 4, text: 'Mon alimentation est équilibrée et adaptée à mes besoins.' },
      { id: 404, themeId: 4, text: 'Je prends soin de ma santé de manière préventive et consciente.' },
      { id: 405, themeId: 4, text: 'Je me sens bien et à l\'aise dans mon corps.' },
      { id: 406, themeId: 4, text: 'Je parviens à me détendre pleinement et à recharger mes batteries.' },
      { id: 407, themeId: 4, text: 'Je bois suffisamment d\'eau chaque jour.' },
      { id: 408, themeId: 4, text: 'Je limite ma consommation d\'alcool, de tabac ou d\'autres substances.' },
      { id: 409, themeId: 4, text: 'Je consulte un professionnel de santé régulièrement.' },
      { id: 410, themeId: 4, text: 'Je suis à l\'écoute des signaux que m\'envoie mon corps.' },
      { id: 411, themeId: 4, text: 'Je gère mon niveau d\'énergie en alternant effort et repos.' },
      { id: 412, themeId: 4, text: 'Je prends soin de ma santé mentale autant que de ma santé physique.' },
      { id: 413, themeId: 4, text: 'Je pratique des activités de relaxation (yoga, méditation, respiration...).' },
      { id: 414, themeId: 4, text: 'Je limite mon temps d\'écran pour préserver mon bien-être.' },
      { id: 415, themeId: 4, text: 'Je passe du temps en plein air et dans la nature régulièrement.' },
      { id: 416, themeId: 4, text: 'Je mange à des heures régulières et de manière consciente.' },
      { id: 417, themeId: 4, text: 'Je prends le temps de me préparer des repas sains et nourrissants.' },
      { id: 418, themeId: 4, text: 'Je gère bien la fatigue et je ne m\'épuise pas.' },
      { id: 419, themeId: 4, text: 'Je m\'accorde des journées de repos complet sans culpabilité.' },
      { id: 420, themeId: 4, text: 'Je prends soin de ma posture et de mes tensions corporelles.' },
      { id: 421, themeId: 4, text: 'Je fais attention à la qualité de mon environnement (air, lumière, bruit).' },
      { id: 422, themeId: 4, text: 'Je gère bien les périodes de maladie sans m\'inquiéter excessivement.' },
      { id: 423, themeId: 4, text: 'Je maintiens une forme physique qui me convient et me satisfait.' },
      { id: 424, themeId: 4, text: 'Je prends soin de ma santé dentaire, visuelle et préventive.' },
      { id: 425, themeId: 4, text: 'Je dors à des heures régulières et mon sommeil est de qualité.' },
      { id: 426, themeId: 4, text: 'Je pratique une forme de pleine conscience au quotidien.' },
      { id: 427, themeId: 4, text: 'Mon équilibre entre vie active et repos me convient.' },
      { id: 428, themeId: 4, text: 'Je ressens de la vitalité et de l\'énergie dans ma vie quotidienne.' },
      { id: 429, themeId: 4, text: 'Je prends soin de moi même dans les périodes les plus chargées.' },
      { id: 430, themeId: 4, text: 'Je me sens en bonne santé globale, physiquement et mentalement.' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // THÈME 5 — Développement Personnel
  // ─────────────────────────────────────────────────────────────
  {
    id: 5,
    name: 'Développement Personnel',
    iconName: 'trending-up',
    color: '#F5A623',
    questions: [
      { id: 25, themeId: 5, text: 'Je me fixe des objectifs personnels stimulants et je les poursuis.' },
      { id: 26, themeId: 5, text: "Je continue d'apprendre et de grandir chaque jour." },
      { id: 27, themeId: 5, text: 'Mes valeurs profondes guident mes décisions au quotidien.' },
      { id: 28, themeId: 5, text: "J'accepte mes erreurs et j'en tire des enseignements précieux." },
      { id: 29, themeId: 5, text: "Je suis ouvert(e) aux changements et aux nouveaux défis." },
      { id: 30, themeId: 5, text: 'Je me sens en progression vers la vie que je désire vraiment.' },
    ],
    quizQuestions: [
      { id: 501, themeId: 5, text: 'Je me fixe des objectifs personnels stimulants et je les poursuis.' },
      { id: 502, themeId: 5, text: "Je continue d'apprendre et de grandir chaque jour." },
      { id: 503, themeId: 5, text: 'Mes valeurs profondes guident mes décisions au quotidien.' },
      { id: 504, themeId: 5, text: "J'accepte mes erreurs et j'en tire des enseignements précieux." },
      { id: 505, themeId: 5, text: "Je suis ouvert(e) aux changements et aux nouveaux défis." },
      { id: 506, themeId: 5, text: 'Je me sens en progression vers la vie que je désire vraiment.' },
      { id: 507, themeId: 5, text: 'Je lis ou me forme régulièrement sur des sujets qui m\'intéressent.' },
      { id: 508, themeId: 5, text: 'Je réfléchis à mes comportements et je cherche à m\'améliorer.' },
      { id: 509, themeId: 5, text: 'Je suis capable de sortir de ma zone de confort quand c\'est nécessaire.' },
      { id: 510, themeId: 5, text: 'Je connais mes forces et je les utilise pleinement.' },
      { id: 511, themeId: 5, text: 'Je suis conscient(e) de mes schémas limitants et je travaille à les dépasser.' },
      { id: 512, themeId: 5, text: 'Je m\'entoure de personnes qui m\'inspirent et m\'élèvent.' },
      { id: 513, themeId: 5, text: 'Je célèbre mes progrès, même les plus petits.' },
      { id: 514, themeId: 5, text: "Je suis curieux(se) et j'aime découvrir de nouvelles idées." },
      { id: 515, themeId: 5, text: 'Je prends le temps de réfléchir à ce que je veux vraiment dans la vie.' },
      { id: 516, themeId: 5, text: 'Je suis capable de remettre en question mes croyances limitantes.' },
      { id: 517, themeId: 5, text: 'Je cherche à comprendre les autres et à voir les choses de leur point de vue.' },
      { id: 518, themeId: 5, text: 'Je travaille sur moi-même de manière régulière et intentionnelle.' },
      { id: 519, themeId: 5, text: "J'ai une vision claire de qui je veux devenir." },
      { id: 520, themeId: 5, text: 'Je suis cohérent(e) entre ce que je dis et ce que je fais.' },
      { id: 521, themeId: 5, text: 'Je prends des décisions alignées avec mes valeurs profondes.' },
      { id: 522, themeId: 5, text: 'Je n\'ai pas peur de demander conseil ou d\'être guidé(e).' },
      { id: 523, themeId: 5, text: 'Je suis capable de prioriser ce qui est vraiment important pour moi.' },
      { id: 524, themeId: 5, text: 'Je travaille sur ma confiance en moi de façon progressive et bienveillante.' },
      { id: 525, themeId: 5, text: 'Je sais gérer la frustration et je persévère malgré les obstacles.' },
      { id: 526, themeId: 5, text: 'Je cherche à apporter une contribution positive autour de moi.' },
      { id: 527, themeId: 5, text: 'Je me remets en question de manière constructive, sans me dévaloriser.' },
      { id: 528, themeId: 5, text: "J'ai des projets qui me tiennent à cœur et sur lesquels j'avance." },
      { id: 529, themeId: 5, text: 'Je vis en accord avec ma vision de la vie que je souhaite mener.' },
      { id: 530, themeId: 5, text: 'Je sens que je me construis et que je deviens chaque jour plus moi-même.' },
    ],
  },
];

export const ALL_QUESTIONS: Question[] = THEMES.flatMap((t) => t.questions);

export type Recommendation = {
  range: string;
  label: string;
  color: string;
  text: string;
};

type ThemeRecommendations = Record<number, Recommendation[]>;

export const RECOMMENDATIONS: ThemeRecommendations = {
  1: [
    {
      range: 'low',
      label: 'À travailler',
      color: '#E57373',
      text: "Votre bien-être personnel mérite plus d'attention. Commencez par identifier une chose simple qui vous rend heureux(se) et intégrez-la à votre quotidien. La pleine conscience peut être un excellent premier pas.",
    },
    {
      range: 'mid',
      label: 'En progrès',
      color: '#FFB74D',
      text: "Vous êtes sur la bonne voie ! Continuez à vous accorder du temps et à explorer ce qui vous ressource. Créez des rituels de bien-être et soyez bienveillant(e) avec vous-même.",
    },
    {
      range: 'high',
      label: 'Épanouissant',
      color: '#81C784',
      text: "Excellent ! Votre bien-être personnel est florissant. Continuez à nourrir cet équilibre et à vous accorder la priorité dans votre vie. Vous avez trouvé ce qui vous épanouit.",
    },
  ],
  2: [
    {
      range: 'low',
      label: 'À travailler',
      color: '#E57373',
      text: "Vos relations sociales ont besoin d'un coup de pouce. Essayez de vous rapprocher d'une personne de confiance cette semaine. Exprimer un besoin ou une émotion peut être un grand premier pas.",
    },
    {
      range: 'mid',
      label: 'En progrès',
      color: '#FFB74D',
      text: "Vos relations s'améliorent ! Continuez à cultiver vos liens en étant présent(e) et authentique. Travailler sur la communication et les limites vous aidera à progresser.",
    },
    {
      range: 'high',
      label: 'Épanouissant',
      color: '#81C784',
      text: "Vos relations sociales sont une vraie richesse. Continuez à nourrir ces liens avec authenticité et bienveillance. Votre capacité à créer des connexions sincères est admirable.",
    },
  ],
  3: [
    {
      range: 'low',
      label: 'À travailler',
      color: '#E57373',
      text: "Votre vie professionnelle demande attention. Prenez le temps d'identifier ce qui vous pèse le plus et cherchez une petite amélioration concrète. Parlez à quelqu'un de confiance ou envisagez un accompagnement.",
    },
    {
      range: 'mid',
      label: 'En progrès',
      color: '#FFB74D',
      text: "Vous avancez dans votre équilibre professionnel. Renforcez vos limites entre vie pro et perso et continuez à chercher du sens dans ce que vous faites chaque jour.",
    },
    {
      range: 'high',
      label: 'Épanouissant',
      color: '#81C784',
      text: "Votre vie professionnelle vous comble ! Vous avez su trouver sens et équilibre dans votre travail. Continuez à cultiver ces conditions favorables et à inspirer ceux qui vous entourent.",
    },
  ],
  4: [
    {
      range: 'low',
      label: 'À travailler',
      color: '#E57373',
      text: "Votre santé mérite plus d'attention. Commencez simplement : une promenade quotidienne, un repas équilibré par jour, ou aller au lit 30 minutes plus tôt. Chaque petit geste compte.",
    },
    {
      range: 'mid',
      label: 'En progrès',
      color: '#FFB74D',
      text: "Vous prenez soin de vous de manière croissante, bravo ! Consolidez vos bonnes habitudes et identifiez un domaine (sommeil, alimentation, sport) où vous pouvez encore progresser.",
    },
    {
      range: 'high',
      label: 'Épanouissant',
      color: '#81C784',
      text: "Votre santé et votre équilibre de vie sont exemplaires. Votre corps et votre esprit vous remercient ! Continuez à honorer ces habitudes précieuses qui vous donnent énergie et vitalité.",
    },
  ],
  5: [
    {
      range: 'low',
      label: 'À travailler',
      color: '#E57373',
      text: "Votre développement personnel est un terrain à explorer. Commencez par définir une valeur importante pour vous et une petite action alignée avec elle. La croissance commence souvent par un seul pas.",
    },
    {
      range: 'mid',
      label: 'En progrès',
      color: '#FFB74D',
      text: "Vous êtes en chemin vers votre meilleure version ! Continuez à vous fixer des défis stimulants et à apprendre de chaque expérience. La régularité est la clé de votre épanouissement.",
    },
    {
      range: 'high',
      label: 'Épanouissant',
      color: '#81C784',
      text: "Votre développement personnel est une belle source d'inspiration. Vous avancez avec clarté et intention vers la vie que vous souhaitez. Continuez à grandir et à partager cette sagesse autour de vous.",
    },
  ],
};

export function getRecommendation(themeId: number, percentage: number): Recommendation {
  const recs = RECOMMENDATIONS[themeId];
  if (!recs) return { range: 'low', label: '', color: '#888', text: '' };
  if (percentage < 40) return recs[0]!;
  if (percentage < 70) return recs[1]!;
  return recs[2]!;
}
