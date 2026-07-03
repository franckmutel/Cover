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
  questions: Question[];
};

export const ANSWER_OPTIONS: AnswerOption[] = [
  { label: 'Jamais', score: 0 },
  { label: 'Rarement', score: 1 },
  { label: 'Parfois', score: 2 },
  { label: 'Souvent', score: 3 },
  { label: 'Toujours', score: 4 },
];

export const MAX_SCORE_PER_THEME = 6 * 4; // 6 questions × max score 4

export const THEMES: Theme[] = [
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
      { id: 5, themeId: 1, text: 'J\'exprime librement et sainement mes émotions.' },
      { id: 6, themeId: 1, text: 'Je maintiens un équilibre entre mes responsabilités et mes plaisirs.' },
    ],
  },
  {
    id: 2,
    name: 'Relations Sociales',
    iconName: 'people',
    color: '#5B9BD5',
    questions: [
      { id: 7, themeId: 2, text: 'Mes relations avec mes proches sont harmonieuses et épanouissantes.' },
      { id: 8, themeId: 2, text: 'J\'ose exprimer mes besoins et mes limites à mon entourage.' },
      { id: 9, themeId: 2, text: 'Je me sens soutenu(e) et compris(e) par les personnes qui m\'entourent.' },
      { id: 10, themeId: 2, text: 'Je sais établir des limites saines dans mes relations.' },
      { id: 11, themeId: 2, text: 'Je cultive des amitiés sincères et nourrissantes.' },
      { id: 12, themeId: 2, text: 'Je me sens à l\'aise et confiant(e) dans les situations sociales.' },
    ],
  },
  {
    id: 3,
    name: 'Vie Professionnelle',
    iconName: 'briefcase',
    color: '#8B7EC8',
    questions: [
      { id: 13, themeId: 3, text: 'Je me sens motivé(e) et épanoui(e) dans mon travail.' },
      { id: 14, themeId: 3, text: 'Mon environnement de travail est sain et bienveillant.' },
      { id: 15, themeId: 3, text: 'Mes compétences et contributions sont reconnues à leur juste valeur.' },
      { id: 16, themeId: 3, text: 'J\'arrive à déconnecter du travail en dehors des heures de bureau.' },
      { id: 17, themeId: 3, text: 'Mes relations avec mes collègues sont agréables et positives.' },
      { id: 18, themeId: 3, text: 'Je trouve du sens dans mon activité professionnelle.' },
    ],
  },
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
  },
  {
    id: 5,
    name: 'Développement Personnel',
    iconName: 'trending-up',
    color: '#F5A623',
    questions: [
      { id: 25, themeId: 5, text: 'Je me fixe des objectifs personnels stimulants et je les poursuis.' },
      { id: 26, themeId: 5, text: 'Je continue d\'apprendre et de grandir chaque jour.' },
      { id: 27, themeId: 5, text: 'Mes valeurs profondes guident mes décisions au quotidien.' },
      { id: 28, themeId: 5, text: 'J\'accepte mes erreurs et j\'en tire des enseignements précieux.' },
      { id: 29, themeId: 5, text: 'Je suis ouvert(e) aux changements et aux nouveaux défis.' },
      { id: 30, themeId: 5, text: 'Je me sens en progression vers la vie que je désire vraiment.' },
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
      text: 'Votre bien-être personnel mérite plus d\'attention. Commencez par identifier une chose simple qui vous rend heureux(se) et intégrez-la à votre quotidien. La pleine conscience peut être un excellent premier pas.',
    },
    {
      range: 'mid',
      label: 'En progrès',
      color: '#FFB74D',
      text: 'Vous êtes sur la bonne voie ! Continuez à vous accorder du temps et à explorer ce qui vous ressource. Créez des rituels de bien-être et soyez bienveillant(e) avec vous-même.',
    },
    {
      range: 'high',
      label: 'Épanouissant',
      color: '#81C784',
      text: 'Excellent ! Votre bien-être personnel est florissant. Continuez à nourrir cet équilibre et à vous accorder la priorité dans votre vie. Vous avez trouvé ce qui vous épanouit.',
    },
  ],
  2: [
    {
      range: 'low',
      label: 'À travailler',
      color: '#E57373',
      text: 'Vos relations sociales ont besoin d\'un coup de pouce. Essayez de vous rapprocher d\'une personne de confiance cette semaine. Exprimer un besoin ou une émotion peut être un grand premier pas.',
    },
    {
      range: 'mid',
      label: 'En progrès',
      color: '#FFB74D',
      text: 'Vos relations s\'améliorent ! Continuez à cultiver vos liens en étant présent(e) et authentique. Travailler sur la communication et les limites vous aidera à progresser.',
    },
    {
      range: 'high',
      label: 'Épanouissant',
      color: '#81C784',
      text: 'Vos relations sociales sont une vraie richesse. Continuez à nourrir ces liens avec authenticité et bienveillance. Votre capacité à créer des connexions sincères est admirable.',
    },
  ],
  3: [
    {
      range: 'low',
      label: 'À travailler',
      color: '#E57373',
      text: 'Votre vie professionnelle demande attention. Prenez le temps d\'identifier ce qui vous pèse le plus et cherchez une petite amélioration concrète. Parlez à quelqu\'un de confiance ou envisagez un accompagnement.',
    },
    {
      range: 'mid',
      label: 'En progrès',
      color: '#FFB74D',
      text: 'Vous avancez dans votre équilibre professionnel. Renforcez vos limites entre vie pro et perso et continuez à chercher du sens dans ce que vous faites chaque jour.',
    },
    {
      range: 'high',
      label: 'Épanouissant',
      color: '#81C784',
      text: 'Votre vie professionnelle vous comble ! Vous avez su trouver sens et équilibre dans votre travail. Continuez à cultiver ces conditions favorables et à inspirer ceux qui vous entourent.',
    },
  ],
  4: [
    {
      range: 'low',
      label: 'À travailler',
      color: '#E57373',
      text: 'Votre santé mérite plus d\'attention. Commencez simplement : une promenade quotidienne, un repas équilibré par jour, ou aller au lit 30 minutes plus tôt. Chaque petit geste compte.',
    },
    {
      range: 'mid',
      label: 'En progrès',
      color: '#FFB74D',
      text: 'Vous prenez soin de vous de manière croissante, bravo ! Consolidez vos bonnes habitudes et identifiez un domaine (sommeil, alimentation, sport) où vous pouvez encore progresser.',
    },
    {
      range: 'high',
      label: 'Épanouissant',
      color: '#81C784',
      text: 'Votre santé et votre équilibre de vie sont exemplaires. Votre corps et votre esprit vous remercient ! Continuez à honorer ces habitudes précieuses qui vous donnent énergie et vitalité.',
    },
  ],
  5: [
    {
      range: 'low',
      label: 'À travailler',
      color: '#E57373',
      text: 'Votre développement personnel est un terrain à explorer. Commencez par définir une valeur importante pour vous et une petite action alignée avec elle. La croissance commence souvent par un seul pas.',
    },
    {
      range: 'mid',
      label: 'En progrès',
      color: '#FFB74D',
      text: 'Vous êtes en chemin vers votre meilleure version ! Continuez à vous fixer des défis stimulants et à apprendre de chaque expérience. La régularité est la clé de votre épanouissement.',
    },
    {
      range: 'high',
      label: 'Épanouissant',
      color: '#81C784',
      text: 'Votre développement personnel est une belle source d\'inspiration. Vous avancez avec clarté et intention vers la vie que vous souhaitez. Continuez à grandir et à partager cette sagesse autour de vous.',
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
