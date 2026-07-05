/**
 * 12 specific quizzes — one per photo cover.
 * Each quiz: 30 questions, 3-tier recommendations, unique color & icon.
 * Images (require() calls) live in the component files for Metro compatibility.
 */

export type SpecificQuestion = {
  id: number;
  text: string;
};

export type SpecificRecommendation = {
  title: string;
  text: string;
};

export type SpecificQuiz = {
  id: number;
  title: string;
  subtitle?: string;
  category: string;
  color: string;
  iconName: string;
  /** File-names of cover images (without path), used by the component's inline require() map */
  coverKeys: string[];
  questions: SpecificQuestion[];
  recommendations: {
    low: SpecificRecommendation;
    mid: SpecificRecommendation;
    high: SpecificRecommendation;
  };
};

export const MAX_SPECIFIC_QUIZ_SCORE = 30 * 4; // 120 pts

export const SPECIFIC_QUIZZES: SpecificQuiz[] = [

  // ─────────────────────────────────────────────────────────────
  // 1 — SUIS-JE PRÊTE À ÊTRE MÈRE ?
  // ─────────────────────────────────────────────────────────────
  {
    id: 1,
    title: 'Suis-je prête à être mère ?',
    category: 'Devenir parent',
    color: '#C0576A',
    iconName: 'heart',
    coverKeys: ['cover1_1', 'cover1_5'],
    questions: [
      { id: 1, text: 'Je me sens émotionnellement prête à accueillir un enfant dans ma vie.' },
      { id: 2, text: "J'ai sérieusement réfléchi aux responsabilités et aux sacrifices de la maternité." },
      { id: 3, text: 'Je suis en bonne santé physique et je prends soin de mon corps.' },
      { id: 4, text: "Mon environnement de vie (logement, quartier) est propice à l'accueil d'un enfant." },
      { id: 5, text: "Je suis financièrement stable pour assumer les dépenses liées à un enfant." },
      { id: 6, text: 'Mon/ma partenaire et moi partageons la même vision de l\'éducation et des valeurs familiales.' },
      { id: 7, text: 'Je me sens capable de gérer les nuits perturbées et la fatigue intense des premières années.' },
      { id: 8, text: 'Je suis prête à réorganiser mes priorités personnelles autour des besoins de l\'enfant.' },
      { id: 9, text: "J'ai un réseau de soutien solide (famille, amis, professionnels) sur lequel m'appuyer." },
      { id: 10, text: 'Je me suis informée sur la grossesse, l\'accouchement et les premières années de l\'enfant.' },
      { id: 11, text: 'Je suis capable de gérer mon stress et les imprévus inhérents à la vie parentale.' },
      { id: 12, text: "J'ai discuté avec mon/ma partenaire de nos valeurs éducatives et de notre rôle de parents." },
      { id: 13, text: 'Je suis prête à adapter ma vie professionnelle aux besoins de l\'enfant.' },
      { id: 14, text: 'Je me sens en accord profond avec ma décision de devenir mère.' },
      { id: 15, text: "J'ai réfléchi à mes modèles parentaux et à ce que je veux ou non reproduire." },
      { id: 16, text: 'Je suis capable d\'accepter que l\'enfant sera différent de mes attentes et de l\'aimer tel quel.' },
      { id: 17, text: 'Je suis prête à faire face aux défis médicaux éventuels liés à la grossesse ou à l\'après-naissance.' },
      { id: 18, text: 'Mon mode de vie actuel peut évoluer sereinement avec l\'arrivée d\'un bébé.' },
      { id: 19, text: 'Je suis prête à apprendre en permanence et à remettre en question mes pratiques parentales.' },
      { id: 20, text: "J'ai accès à un suivi médical adapté et à des professionnels de santé de confiance." },
      { id: 21, text: 'Je suis prête à voir ma relation de couple évoluer profondément avec l\'arrivée de l\'enfant.' },
      { id: 22, text: "J'accepte que la maternité soit à la fois extraordinaire et profondément exigeante." },
      { id: 23, text: 'Je suis capable de gérer mes propres émotions pour rester un pilier stable pour mon enfant.' },
      { id: 24, text: "J'ai réfléchi aux solutions de garde, à la crèche, et à l'organisation du quotidien." },
      { id: 25, text: 'Je suis prête à mettre de côté mes besoins immédiats par amour pour mon enfant.' },
      { id: 26, text: 'Je suis en paix avec mon histoire personnelle et familiale pour ne pas la répéter négativement.' },
      { id: 27, text: 'Mon/ma partenaire et moi communiquons ouvertement sur nos peurs et nos espoirs.' },
      { id: 28, text: "Je suis prête à assumer l'image sociale de la maternité avec confiance." },
      { id: 29, text: "J'envisage la maternité comme un projet de vie pleinement réfléchi et voulu." },
      { id: 30, text: 'Je me sens prête à aimer inconditionnellement un être entièrement dépendant de moi.' },
    ],
    recommendations: {
      low: {
        title: 'Encore quelques étapes',
        text: "Vous n'êtes peut-être pas encore totalement prête. Prenez le temps d'explorer vos craintes avec un professionnel de santé ou un accompagnant parental. La préparation à la maternité est un processus, pas un état instantané — et c'est tout à fait normal.",
      },
      mid: {
        title: 'Sur la bonne voie',
        text: "Vous avez de solides bases, mais certains aspects méritent plus d'attention. Identifiez les domaines où vous vous sentez moins sûre (finances, soutien, santé) et travaillez-les concrètement. Dialoguez avec votre partenaire — ensemble vous êtes plus forts.",
      },
      high: {
        title: 'Prête pour cette belle aventure',
        text: "Vous semblez bien préparée pour accueillir la maternité ! Votre réflexion est solide et votre entourage est en place. Continuez à vous informer et à communiquer avec votre partenaire — vous êtes sur une très belle voie.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 2 — SUIS-JE PRÊT À ÊTRE PÈRE ?
  // ─────────────────────────────────────────────────────────────
  {
    id: 2,
    title: 'Suis-je prêt à être père ?',
    category: 'Devenir parent',
    color: '#3B7DC0',
    iconName: 'person',
    coverKeys: ['cover1_2'],
    questions: [
      { id: 1, text: 'Je me sens émotionnellement prêt à devenir père.' },
      { id: 2, text: "J'ai sérieusement réfléchi aux responsabilités et aux implications de la paternité." },
      { id: 3, text: 'Je suis en bonne santé physique et mentale pour assumer ce nouveau rôle.' },
      { id: 4, text: "Mon environnement de vie est adapté à l'accueil d'un enfant." },
      { id: 5, text: 'Je suis financièrement stable pour subvenir aux besoins d\'un enfant à long terme.' },
      { id: 6, text: 'Mon/ma partenaire et moi partageons la même vision de l\'éducation et des valeurs familiales.' },
      { id: 7, text: 'Je me sens capable de gérer les nuits perturbées et la fatigue des premières années.' },
      { id: 8, text: 'Je suis prêt à réorganiser mes priorités personnelles autour des besoins de mon enfant.' },
      { id: 9, text: "J'ai un réseau de soutien (famille, amis) sur lequel je peux compter." },
      { id: 10, text: 'Je me suis informé sur le développement de l\'enfant et les besoins du nourrisson.' },
      { id: 11, text: 'Je suis capable de gérer mon stress et les imprévus de la vie parentale.' },
      { id: 12, text: "J'ai discuté avec mon/ma partenaire de nos valeurs éducatives et du rôle de chacun." },
      { id: 13, text: 'Je suis prêt à adapter ma vie professionnelle pour être un père présent.' },
      { id: 14, text: 'Je me sens en accord profond avec ma décision de devenir père.' },
      { id: 15, text: "J'ai réfléchi à mes modèles paternels et à ce que je veux transmettre ou éviter." },
      { id: 16, text: "Je suis capable d'accepter l'imprévisibilité de l'enfant et d'y répondre avec bienveillance." },
      { id: 17, text: 'Je suis prêt à soutenir activement mon/ma partenaire pendant la grossesse et l\'après-naissance.' },
      { id: 18, text: "Mon mode de vie actuel peut évoluer sereinement avec l'arrivée d'un bébé." },
      { id: 19, text: 'Je suis prêt à apprendre continuellement pour m\'améliorer dans mon rôle de père.' },
      { id: 20, text: 'Je me sens capable d\'assumer les responsabilités pratiques (soins, nuits, jeux) au quotidien.' },
      { id: 21, text: 'Je suis prêt à voir ma relation de couple évoluer profondément avec l\'arrivée de l\'enfant.' },
      { id: 22, text: "J'accepte que la paternité soit à la fois une chance extraordinaire et une grande exigence." },
      { id: 23, text: 'Je suis capable de gérer mes émotions pour rester stable et rassurant pour mon enfant.' },
      { id: 24, text: "J'ai réfléchi à l'organisation familiale : garde, école, activités, rôle de chacun." },
      { id: 25, text: 'Je suis prêt à m\'impliquer pleinement et équitablement dans les soins et l\'éducation.' },
      { id: 26, text: 'Je suis en paix avec mon histoire personnelle pour ne pas en répéter les schémas négatifs.' },
      { id: 27, text: 'Mon/ma partenaire et moi communiquons ouvertement sur nos peurs et nos espoirs.' },
      { id: 28, text: 'Je suis prêt à assumer mon rôle de père visible et engagé au quotidien.' },
      { id: 29, text: "J'envisage la paternité comme un projet de vie réfléchi, voulu et préparé." },
      { id: 30, text: 'Je me sens prêt à offrir à mon enfant un amour inconditionnel et une présence durable.' },
    ],
    recommendations: {
      low: {
        title: 'Encore quelques étapes',
        text: "Certains aspects de votre préparation méritent attention. Parlez de vos doutes à votre partenaire, à un médecin ou à un groupe de futurs pères. La paternité se prépare — et commencer à y réfléchir maintenant est déjà un grand pas.",
      },
      mid: {
        title: 'Sur la bonne voie',
        text: "Vous avez une bonne fondation. Renforcez votre communication de couple, votre réseau de soutien et vos connaissances sur les besoins du bébé. La curiosité et l'humilité sont vos meilleurs atouts de futur père.",
      },
      high: {
        title: 'Prêt pour cette belle aventure',
        text: "Vous semblez prêt à assumer pleinement votre rôle de père ! Votre implication et votre réflexion sont remarquables. Restez ouvert à l'apprentissage continu — la paternité est une aventure qui commence très bien pour vous.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 3 — SOMMES-NOUS PRÊTS À ÊTRE PÈRES ?
  // ─────────────────────────────────────────────────────────────
  {
    id: 3,
    title: 'Sommes-nous prêts à être pères ?',
    category: 'Devenir parent',
    color: '#7B5EA7',
    iconName: 'people',
    coverKeys: ['cover1_3'],
    questions: [
      { id: 1, text: 'Mon partenaire et moi sommes sur la même longueur d\'onde quant à notre projet parental.' },
      { id: 2, text: 'Nous nous sommes informés sur les options parentales disponibles (adoption, GPA, etc.).' },
      { id: 3, text: 'Nous sommes prêts à faire face aux démarches administratives et légales parfois longues.' },
      { id: 4, text: 'Nous nous sentons émotionnellement stables et prêts à accueillir un enfant.' },
      { id: 5, text: "Nous avons réfléchi à la manière d'expliquer notre famille à notre enfant et à son entourage." },
      { id: 6, text: 'Nous sommes financièrement préparés pour ce projet parental à long terme.' },
      { id: 7, text: 'Nous sommes capables de gérer les défis spécifiques liés à notre parcours (GPA, adoption).' },
      { id: 8, text: 'Nous avons un réseau de soutien bienveillant autour de nous.' },
      { id: 9, text: "Nous sommes prêts à faire face à d'éventuelles réactions extérieures négatives avec sérénité." },
      { id: 10, text: 'Nous avons discuté de nos valeurs éducatives et de notre vision du rôle de chacun.' },
      { id: 11, text: "Nous sommes prêts à adapter nos modes de vie à l'arrivée d'un enfant." },
      { id: 12, text: 'Nous avons réfléchi au cadre légal et à la protection juridique de notre famille.' },
      { id: 13, text: 'Nous communiquons bien en couple sur nos peurs, nos attentes et nos espoirs communs.' },
      { id: 14, text: 'Nous sommes prêts à répondre aux questions de notre enfant sur ses origines avec sincérité.' },
      { id: 15, text: 'Nous nous sentons capables d\'offrir à l\'enfant un environnement stable et aimant.' },
      { id: 16, text: 'Nous sommes informés sur les associations et ressources pour familles homoparentales.' },
      { id: 17, text: 'Nous sommes prêts à gérer les réactions des institutions (crèche, école, hôpital) avec calme.' },
      { id: 18, text: "Nous avons réfléchi au rôle de la famille élargie dans la vie de l'enfant." },
      { id: 19, text: 'Nous nous sentons en accord profond avec notre décision de devenir pères.' },
      { id: 20, text: 'Nous sommes capables de gérer notre stress de couple face aux défis du parcours parental.' },
      { id: 21, text: 'Nous sommes prêts à nous former et à apprendre continuellement sur la parentalité.' },
      { id: 22, text: "Nous avons abordé avec ouverture la question de l'identité future de notre enfant." },
      { id: 23, text: "Nous sommes prêts à offrir à l'enfant un environnement culturellement riche et ouvert." },
      { id: 24, text: "Nous avons réfléchi à comment parler de notre famille à l'entourage de notre enfant." },
      { id: 25, text: 'Nous nous soutenons mutuellement dans les moments de doute ou d\'inquiétude.' },
      { id: 26, text: "Nous avons abordé la question de la mère porteuse ou du don de gamètes avec respect et clarté." },
      { id: 27, text: "Nous sommes prêts à assumer notre rôle de pères visibles et engagés dans la société." },
      { id: 28, text: 'Nous avons réfléchi aux valeurs que nous souhaitons transmettre à notre enfant.' },
      { id: 29, text: 'Nous envisageons ce projet parental avec joie, lucidité et une grande détermination.' },
      { id: 30, text: 'Nous nous sentons prêts à aimer un enfant inconditionnellement et à lui offrir une vie belle.' },
    ],
    recommendations: {
      low: {
        title: 'Encore du chemin à parcourir ensemble',
        text: "Votre projet parental mérite encore quelques étapes de préparation. Renseignez-vous sur les démarches spécifiques à votre situation, rapprochez-vous d'associations de familles homoparentales et renforcez votre communication de couple.",
      },
      mid: {
        title: 'Bien engagés, continuez !',
        text: "Votre projet parental est bien amorcé. Consolidez les aspects pratiques (légaux, financiers, réseau de soutien) et continuez à parler ouvertement de vos attentes respectives. Vous avancez dans la bonne direction.",
      },
      high: {
        title: 'Prêts et soudés pour ce beau projet',
        text: "Vous semblez prêts et bien préparés pour accueillir un enfant ! Votre complicité de couple et votre réflexion approfondie sont de très solides fondations. Continuez à vous informer et à vous entourer — cette aventure vous appartient.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 4 — SOMMES-NOUS PRÊTES À ÊTRE MÈRES ?
  // ─────────────────────────────────────────────────────────────
  {
    id: 4,
    title: 'Sommes-nous prêtes à être mères ?',
    category: 'Devenir parent',
    color: '#4CAF8A',
    iconName: 'people',
    coverKeys: ['cover1_4'],
    questions: [
      { id: 1, text: 'Ma partenaire et moi sommes sur la même longueur d\'onde quant à notre projet parental.' },
      { id: 2, text: 'Nous nous sommes informées sur les options parentales disponibles (PMA, adoption, etc.).' },
      { id: 3, text: 'Nous sommes prêtes à faire face aux démarches administratives et légales nécessaires.' },
      { id: 4, text: 'Nous nous sentons émotionnellement stables et prêtes à accueillir un enfant.' },
      { id: 5, text: "Nous avons réfléchi à la manière d'expliquer notre famille à notre enfant et à son entourage." },
      { id: 6, text: 'Nous sommes financièrement préparées pour ce projet parental à long terme.' },
      { id: 7, text: 'Nous sommes capables de gérer les défis spécifiques liés à notre parcours (PMA, adoption).' },
      { id: 8, text: 'Nous avons un réseau de soutien bienveillant autour de nous.' },
      { id: 9, text: "Nous sommes prêtes à faire face à d'éventuelles réactions extérieures avec sérénité." },
      { id: 10, text: 'Nous avons discuté de nos valeurs éducatives et de notre vision du rôle de chacune.' },
      { id: 11, text: "Nous sommes prêtes à adapter nos modes de vie à l'arrivée d'un enfant." },
      { id: 12, text: 'Nous avons réfléchi au cadre légal et à la protection juridique de notre famille.' },
      { id: 13, text: 'Nous communiquons bien en couple sur nos peurs, nos attentes et nos espoirs.' },
      { id: 14, text: "Nous sommes prêtes à répondre aux questions de notre enfant sur ses origines avec sincérité." },
      { id: 15, text: 'Nous nous sentons capables d\'offrir à l\'enfant un environnement stable, aimant et sécurisant.' },
      { id: 16, text: 'Nous sommes informées sur les associations et ressources pour familles homoparentales.' },
      { id: 17, text: 'Nous sommes prêtes à gérer les réactions des institutions (crèche, école, médecins) avec calme.' },
      { id: 18, text: "Nous avons réfléchi au rôle de la famille élargie dans la vie de l'enfant." },
      { id: 19, text: 'Nous nous sentons en accord profond avec notre décision de devenir mères.' },
      { id: 20, text: 'Nous sommes capables de gérer notre stress de couple face aux défis du parcours parental.' },
      { id: 21, text: 'Nous sommes prêtes à nous former et à apprendre continuellement sur la parentalité.' },
      { id: 22, text: "Nous avons abordé avec ouverture la question de l'identité future de notre enfant." },
      { id: 23, text: "Nous sommes prêtes à offrir à l'enfant un environnement culturellement riche et ouvert." },
      { id: 24, text: "Si l'une de nous porte l'enfant, nous avons réfléchi à l'équilibre des rôles dans le couple." },
      { id: 25, text: 'Nous nous soutenons mutuellement dans les moments de doute ou d\'anxiété.' },
      { id: 26, text: 'Nous avons abordé la question du don de gamètes et des origines biologiques avec clarté.' },
      { id: 27, text: "Nous sommes prêtes à assumer notre rôle de mères visibles et engagées dans la société." },
      { id: 28, text: 'Nous avons réfléchi aux valeurs que nous souhaitons transmettre à notre enfant.' },
      { id: 29, text: 'Nous envisageons ce projet parental avec joie, lucidité et une grande détermination.' },
      { id: 30, text: 'Nous nous sentons prêtes à aimer un enfant inconditionnellement et à lui offrir une vie épanouissante.' },
    ],
    recommendations: {
      low: {
        title: 'Encore du chemin à parcourir ensemble',
        text: "Votre projet parental mérite encore quelques étapes de préparation. Renseignez-vous sur les démarches propres à votre situation (PMA, adoption), rapprochez-vous d'associations de familles homoparentales, et parlez ouvertement de vos appréhensions.",
      },
      mid: {
        title: 'Bien engagées, continuez !',
        text: "Votre projet est bien amorcé. Consolidez les aspects pratiques et continuez à renforcer votre communication en tant que couple. Vous construisez quelque chose de beau — chaque étape franchie ensemble vous rapproche du but.",
      },
      high: {
        title: 'Prêtes et soudées pour ce beau projet',
        text: "Vous semblez prêtes et pleinement préparées pour accueillir un enfant ! Votre complicité et votre réflexion approfondie sont de très solides fondations. Cette aventure est entre de bonnes mains — les vôtres.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 5 — SUIS-JE UNE BONNE MAMAN ?
  // ─────────────────────────────────────────────────────────────
  {
    id: 5,
    title: 'Suis-je une bonne maman ?',
    category: 'Être parent',
    color: '#D4547A',
    iconName: 'rose',
    coverKeys: ['cover2_1'],
    questions: [
      { id: 1, text: 'Je suis présente et attentive aux besoins de mes enfants au quotidien.' },
      { id: 2, text: 'Je communique ouvertement et avec bienveillance avec mes enfants.' },
      { id: 3, text: 'Je pose des limites claires tout en restant douce et compréhensive.' },
      { id: 4, text: 'Je sais gérer mes émotions pour ne pas les projeter sur mes enfants.' },
      { id: 5, text: 'Je prends soin de ma propre santé mentale et physique pour rester disponible.' },
      { id: 6, text: "J'encourage l'autonomie de mes enfants en leur faisant confiance." },
      { id: 7, text: 'Je suis cohérente entre ce que je dis et ce que je fais devant eux.' },
      { id: 8, text: 'Je passe du temps de qualité avec chaque enfant individuellement.' },
      { id: 9, text: 'Je reconnais mes erreurs et je m\'en excuse auprès de mes enfants.' },
      { id: 10, text: 'Je respecte la personnalité unique de chacun de mes enfants.' },
      { id: 11, text: 'Je soutiens les passions et les rêves de mes enfants sans les imposer les miens.' },
      { id: 12, text: 'Je sais détecter lorsque mon enfant est en difficulté émotionnelle.' },
      { id: 13, text: 'Je collabore efficacement avec mon/ma partenaire dans l\'éducation.' },
      { id: 14, text: 'Je maintiens des routines stables qui sécurisent mes enfants.' },
      { id: 15, text: 'Je sais expliquer les règles et leurs raisons plutôt que de simplement les imposer.' },
      { id: 16, text: 'Je gère les conflits entre mes enfants avec équité et calme.' },
      { id: 17, text: 'Je prends du recul quand je me sens débordée et je demande de l\'aide si besoin.' },
      { id: 18, text: 'Je valorise les efforts de mes enfants plutôt que leurs seuls résultats.' },
      { id: 19, text: "Je respecte l'intimité et l'espace de mes enfants selon leur âge." },
      { id: 20, text: 'Je suis curieuse du monde intérieur de mes enfants (rêves, peurs, joies, amis).' },
      { id: 21, text: 'Je me renseigne régulièrement sur le développement de l\'enfant et les bonnes pratiques.' },
      { id: 22, text: "Je m'adapte aux différentes étapes du développement de chaque enfant." },
      { id: 23, text: 'Je suis présente lors des moments importants de leur vie scolaire et sociale.' },
      { id: 24, text: 'Je sais mettre mes propres besoins en pause quand mes enfants ont besoin de moi.' },
      { id: 25, text: 'Je travaille sur mes propres blessures pour ne pas les transmettre à mes enfants.' },
      { id: 26, text: 'Je crée un environnement familial chaleureux, sécurisant et joyeux.' },
      { id: 27, text: 'Je suis à l\'écoute des signaux que mes enfants me donnent sur leur bien-être.' },
      { id: 28, text: "Je favorise leur estime de soi en les encourageant et en les valorisant sincèrement." },
      { id: 29, text: 'Je suis capable de demander de l\'aide professionnelle si une situation le nécessite.' },
      { id: 30, text: 'Je montre à mes enfants qu\'on peut s\'aimer et prendre soin de soi avec bienveillance.' },
    ],
    recommendations: {
      low: {
        title: 'De la bienveillance avant tout',
        text: "Être maman est l'un des rôles les plus exigeants qui soit. Si vous ressentez des difficultés, cherchez du soutien — auprès d'un professionnel, d'autres mamans ou d'un proche. Vous n'avez pas à tout porter seule.",
      },
      mid: {
        title: 'Une maman qui grandit avec ses enfants',
        text: "Vous êtes sur la bonne voie ! Travaillez en particulier sur votre propre bien-être et sur la communication avec vos enfants. Une maman épanouie est le meilleur cadeau qu'on puisse leur offrir.",
      },
      high: {
        title: 'Une maman formidable et présente',
        text: "Vos enfants ont une chance incroyable de vous avoir ! Votre présence, votre bienveillance et votre engagement transparaissent dans vos réponses. Continuez à prendre soin de vous autant que de votre famille.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 6 — SUIS-JE UN BON PAPA ?
  // ─────────────────────────────────────────────────────────────
  {
    id: 6,
    title: 'Suis-je un bon papa ?',
    category: 'Être parent',
    color: '#2E86C1',
    iconName: 'shield-checkmark',
    coverKeys: ['cover2_2'],
    questions: [
      { id: 1, text: 'Je suis présent et attentif aux besoins de mes enfants au quotidien.' },
      { id: 2, text: 'Je communique ouvertement et avec bienveillance avec mes enfants.' },
      { id: 3, text: 'Je pose des limites claires tout en restant doux et compréhensif.' },
      { id: 4, text: 'Je sais gérer mes émotions pour ne pas les projeter sur mes enfants.' },
      { id: 5, text: 'Je prends soin de ma propre santé mentale et physique pour rester disponible.' },
      { id: 6, text: "J'encourage l'autonomie de mes enfants en leur faisant confiance." },
      { id: 7, text: 'Je suis cohérent entre ce que je dis et ce que je fais devant eux.' },
      { id: 8, text: 'Je passe du temps de qualité avec chaque enfant individuellement.' },
      { id: 9, text: 'Je reconnais mes erreurs et je m\'en excuse auprès de mes enfants.' },
      { id: 10, text: 'Je respecte la personnalité unique de chacun de mes enfants.' },
      { id: 11, text: 'Je soutiens les passions et les rêves de mes enfants sans imposer les miens.' },
      { id: 12, text: 'Je sais détecter lorsque mon enfant traverse une difficulté émotionnelle.' },
      { id: 13, text: 'Je collabore efficacement avec mon/ma partenaire dans l\'éducation des enfants.' },
      { id: 14, text: 'Je maintiens des routines stables qui sécurisent mes enfants au quotidien.' },
      { id: 15, text: 'Je sais expliquer les règles et leurs raisons plutôt que de simplement les imposer.' },
      { id: 16, text: 'Je gère les conflits entre mes enfants avec équité et bienveillance.' },
      { id: 17, text: 'Je prends du recul quand je me sens débordé et je cherche de l\'aide si besoin.' },
      { id: 18, text: 'Je valorise les efforts de mes enfants plutôt que leurs seuls résultats.' },
      { id: 19, text: "Je respecte l'intimité et l'espace de mes enfants selon leur âge." },
      { id: 20, text: 'Je suis curieux du monde intérieur de mes enfants (rêves, peurs, joies, amis).' },
      { id: 21, text: 'Je me renseigne régulièrement sur le développement de l\'enfant et les bonnes pratiques.' },
      { id: 22, text: "Je m'adapte aux différentes étapes du développement de chaque enfant." },
      { id: 23, text: 'Je suis présent lors des moments importants de leur vie (école, sport, amis).' },
      { id: 24, text: 'Je sais mettre mes propres besoins en pause quand mes enfants ont besoin de moi.' },
      { id: 25, text: 'Je travaille sur mes propres blessures pour ne pas les transmettre à mes enfants.' },
      { id: 26, text: 'Je crée un environnement familial chaleureux, sécurisant et joyeux.' },
      { id: 27, text: 'Je suis à l\'écoute des signaux que mes enfants me donnent sur leur bien-être.' },
      { id: 28, text: "Je favorise leur estime de soi en les encourageant et en les valorisant." },
      { id: 29, text: 'Je suis capable de demander de l\'aide professionnelle si une situation le nécessite.' },
      { id: 30, text: 'Je montre à mes enfants par l\'exemple qu\'un homme peut être doux, ouvert et aimant.' },
    ],
    recommendations: {
      low: {
        title: 'Chaque jour est une nouvelle chance',
        text: "Être papa est un apprentissage permanent. Si vous ressentez des difficultés, parlez-en à votre partenaire, un ami ou un professionnel. Reconnaître ses limites, c'est déjà être un très bon père.",
      },
      mid: {
        title: 'Un papa qui grandit avec ses enfants',
        text: "Vous êtes engagé et présent — c'est l'essentiel. Travaillez sur votre communication émotionnelle et votre disponibilité. Vos enfants remarquent chaque effort que vous faites pour eux.",
      },
      high: {
        title: 'Un papa formidable et impliqué',
        text: "Vos enfants ont un papa présent, attentif et aimant — et ça se voit dans vos réponses. Continuez à prendre soin de vous autant que d'eux : un père épanoui est un cadeau pour toute la famille.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 7 — BON(NE) COLLÈGUE — Bureau & télétravail
  // ─────────────────────────────────────────────────────────────
  {
    id: 7,
    title: 'Suis-je un(e) bon(ne) collègue ?',
    subtitle: 'Bureau & télétravail',
    category: 'Vie professionnelle',
    color: '#6C5CE7',
    iconName: 'briefcase',
    coverKeys: ['cover3_1'],
    questions: [
      { id: 1, text: "J'arrive à mes réunions préparé(e) et à l'heure." },
      { id: 2, text: 'Je respecte les délais que je m\'engage à tenir auprès de mon équipe.' },
      { id: 3, text: 'Je communique clairement sur mes avancées et mes blocages sans attendre.' },
      { id: 4, text: 'Je suis disponible et réactif(ve) pour aider un collègue qui en a besoin.' },
      { id: 5, text: 'Je partage mes connaissances et mes bonnes pratiques avec mon équipe.' },
      { id: 6, text: 'Je reste positif(ve) et constructif(ve) même dans les situations de pression.' },
      { id: 7, text: 'Je contribue à une ambiance de travail agréable et bienveillante.' },
      { id: 8, text: 'Je respecte le travail et le temps de mes collègues.' },
      { id: 9, text: 'Je sais écouter les idées des autres sans les interrompre ni les dévaloriser.' },
      { id: 10, text: 'Je prends ma part dans les tâches collectives sans me défiler.' },
      { id: 11, text: 'Je gère mes conflits professionnels de manière directe et respectueuse.' },
      { id: 12, text: 'Je suis fiable : mon équipe peut compter sur moi pour tenir mes engagements.' },
      { id: 13, text: 'J\'adapte ma communication selon les besoins et le style de chaque collègue.' },
      { id: 14, text: 'Je prends le temps de comprendre les contraintes de mes collègues avant de juger.' },
      { id: 15, text: 'Je félicite mes collègues pour leurs réussites et je le dis ouvertement.' },
      { id: 16, text: 'Je suis capable de recevoir des critiques constructives sans me braquer.' },
      { id: 17, text: 'En télétravail, je reste visible et accessible pour mon équipe.' },
      { id: 18, text: 'Je ne monopolise pas la parole en réunion et je laisse de la place à chacun.' },
      { id: 19, text: 'Je respecte la vie privée et les limites de mes collègues.' },
      { id: 20, text: 'Je suis bienveillant(e) avec les nouveaux arrivants et je facilite leur intégration.' },
      { id: 21, text: 'Je gère ma propre charge de travail sans reporter mon stress sur l\'équipe.' },
      { id: 22, text: 'Je signale les problèmes à temps plutôt que de les laisser s\'aggraver.' },
      { id: 23, text: 'Je participe activement aux moments d\'équipe (réunions, événements, repas).' },
      { id: 24, text: 'Je ne pratique pas la rétention d\'information au détriment de mes collègues.' },
      { id: 25, text: 'Je reconnais ma part de responsabilité dans les échecs collectifs.' },
      { id: 26, text: 'Je contribue à créer un cadre de travail psychologiquement sûr pour tous.' },
      { id: 27, text: 'Je dis ce que je pense en réunion plutôt que de le faire dans les couloirs après.' },
      { id: 28, text: "Je m'intéresse au bien-être de mes collègues au-delà du strict cadre professionnel." },
      { id: 29, text: 'Je suis un relais de confiance pour les informations importantes dans mon équipe.' },
      { id: 30, text: 'Je me comporte de la même façon avec tout le monde, quel que soit le statut de chacun.' },
    ],
    recommendations: {
      low: {
        title: 'Des marges de progression à saisir',
        text: "Vos relations professionnelles pourraient gagner en qualité. Commencez par un point simple : être plus attentif(ve) aux besoins de vos collègues et plus transparent(e) sur votre travail. Les petits gestes font une grande différence.",
      },
      mid: {
        title: 'Un(e) collègue de valeur en devenir',
        text: "Vous avez de bonnes bases relationnelles au travail. Travaillez en particulier sur la communication proactive, la gestion des conflits et votre disponibilité pour l'équipe. Vos efforts sont remarqués.",
      },
      high: {
        title: 'Un(e) collègue précieux(se) pour son équipe',
        text: "Bravo ! Vous êtes le type de collègue que tout le monde rêve d'avoir. Votre fiabilité, votre bienveillance et votre engagement font de vous un pilier de votre équipe. Continuez à inspirer les autres par votre exemple.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 8 — BON(NE) COLLÈGUE — Industrie & terrain
  // ─────────────────────────────────────────────────────────────
  {
    id: 8,
    title: 'Suis-je un(e) bon(ne) collègue ?',
    subtitle: 'Industrie & terrain',
    category: 'Vie professionnelle',
    color: '#00838F',
    iconName: 'construct',
    coverKeys: ['cover3_2'],
    questions: [
      { id: 1, text: "J'arrive à mon poste préparé(e), équipé(e) et à l'heure." },
      { id: 2, text: 'Je respecte scrupuleusement les règles de sécurité pour moi et mes collègues.' },
      { id: 3, text: 'Je communique clairement sur les incidents ou anomalies que je détecte.' },
      { id: 4, text: 'Je suis disponible pour aider un collègue en difficulté sur le terrain.' },
      { id: 5, text: 'Je partage mes savoir-faire techniques avec les membres moins expérimentés.' },
      { id: 6, text: 'Je reste calme et efficace dans les situations d\'urgence ou de forte pression.' },
      { id: 7, text: 'Je contribue à une ambiance de travail solidaire et bienveillante dans mon équipe.' },
      { id: 8, text: 'Je respecte le matériel et les équipements collectifs avec autant de soin que les miens.' },
      { id: 9, text: 'Je prends mes pauses au bon moment sans prolonger au détriment de l\'équipe.' },
      { id: 10, text: 'Je prends ma part dans les tâches physiquement difficiles sans les laisser aux autres.' },
      { id: 11, text: 'Je signale immédiatement tout problème de sécurité, même mineur.' },
      { id: 12, text: 'Je suis fiable : on peut compter sur moi pour assurer mon poste.' },
      { id: 13, text: 'J\'adapte ma communication selon les situations (urgence, brief de chantier, etc.).' },
      { id: 14, text: 'Je prends le temps d\'expliquer les procédures aux intérimaires et nouveaux arrivants.' },
      { id: 15, text: 'Je félicite mes collègues pour le travail bien fait et je le dis clairement.' },
      { id: 16, text: 'Je suis capable de recevoir des retours sur ma façon de travailler.' },
      { id: 17, text: 'Je veille à laisser mon poste propre et rangé en fin de shift.' },
      { id: 18, text: 'Je ne laisse jamais un collègue en danger ou en situation critique sans réagir.' },
      { id: 19, text: 'Je respecte les temps de repos et les droits de mes collègues.' },
      { id: 20, text: 'Je soutiens les nouveaux et je les aide à trouver leur place dans l\'équipe.' },
      { id: 21, text: 'Je gère ma fatigue et mon état physique pour ne pas mettre l\'équipe en risque.' },
      { id: 22, text: 'Je remonte les problèmes à ma hiérarchie de manière factuelle et constructive.' },
      { id: 23, text: 'Je participe aux briefs et aux formations obligatoires avec engagement.' },
      { id: 24, text: 'Je ne dissimule pas mes erreurs techniques par peur du jugement.' },
      { id: 25, text: 'Je reconnais ma part de responsabilité dans les incidents ou erreurs collectives.' },
      { id: 26, text: 'Je contribue à une culture de sécurité positive dans mon unité de travail.' },
      { id: 27, text: 'Je m\'exprime directement quand quelque chose ne va pas, plutôt que de me plaindre en dehors.' },
      { id: 28, text: "Je m'intéresse au bien-être de mes collègues même en dehors du travail." },
      { id: 29, text: 'Je suis un relais d\'information fiable dans mon équipe ou sur mon chantier.' },
      { id: 30, text: 'Je traite tous mes collègues avec respect et équité, quel que soit leur rôle ou niveau.' },
    ],
    recommendations: {
      low: {
        title: 'Des axes concrets à améliorer',
        text: "Le travail en équipe sur le terrain demande une vigilance constante. Concentrez-vous d'abord sur la sécurité et la communication — deux piliers essentiels. Parler à votre chef d'équipe de vos difficultés est un signe de maturité professionnelle.",
      },
      mid: {
        title: 'Un(e) équipier(ère) de valeur',
        text: "Vous êtes un(e) collègue solide sur lequel/laquelle on peut compter. Continuez à renforcer votre communication et votre soutien aux nouveaux arrivants. La sécurité et la solidarité font les meilleurs équipiers.",
      },
      high: {
        title: 'Un(e) pilier de l\'équipe terrain',
        text: "Bravo ! Vous incarnez ce qu'est un(e) excellent(e) collègue sur le terrain : fiable, sécuritaire, solidaire. Votre engagement est une vraie valeur ajoutée pour toute l'équipe. Continuez à transmettre cette culture positive.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 9 — BON(NE) COLLÈGUE — Commerce & service client
  // ─────────────────────────────────────────────────────────────
  {
    id: 9,
    title: 'Suis-je un(e) bon(ne) collègue ?',
    subtitle: 'Commerce & service client',
    category: 'Vie professionnelle',
    color: '#A0522D',
    iconName: 'storefront',
    coverKeys: ['cover3_3'],
    questions: [
      { id: 1, text: "J'arrive à mon poste préparé(e), à l'heure et avec la bonne attitude." },
      { id: 2, text: 'Je respecte les consignes et les procédures établies par mon équipe.' },
      { id: 3, text: 'Je communique clairement sur les imprévus (retard, erreur, rupture de stock).' },
      { id: 4, text: 'Je suis disponible pour soutenir un collègue en difficulté avec un client.' },
      { id: 5, text: 'Je partage mes techniques de vente ou de relation client avec mon équipe.' },
      { id: 6, text: 'Je reste positif(ve) et souriant(e) même dans les moments de forte affluence.' },
      { id: 7, text: "Je contribue à une ambiance de travail agréable pour toute l'équipe." },
      { id: 8, text: 'Je prends soin du matériel, de l\'espace de vente et des outils collectifs.' },
      { id: 9, text: 'Je prends mes pauses au bon moment pour ne pas laisser l\'équipe en difficulté.' },
      { id: 10, text: 'Je prends ma part des tâches ingrates (rangement, ménage, réassort).' },
      { id: 11, text: 'Je gère les situations de conflits clients de manière calme et professionnelle.' },
      { id: 12, text: 'Je suis fiable : mon équipe peut compter sur ma présence et mon engagement.' },
      { id: 13, text: "J'adapte mon attitude selon les situations (rush, accueil, conseil, litige)." },
      { id: 14, text: 'Je prends le temps d\'accueillir et d\'aider les nouveaux collègues à s\'intégrer.' },
      { id: 15, text: 'Je félicite mes collègues pour leurs bonnes initiatives et leurs réussites.' },
      { id: 16, text: 'Je suis capable d\'entendre une remarque de mon responsable sans me braquer.' },
      { id: 17, text: 'Je veille à laisser mon espace de travail propre et ordonné à chaque fin de service.' },
      { id: 18, text: 'Je ne laisse pas un collègue gérer seul une situation cliente difficile si je peux aider.' },
      { id: 19, text: 'Je respecte les horaires et les droits de mes collègues.' },
      { id: 20, text: 'Je soutiens les nouveaux arrivants et je leur transmets les bons réflexes.' },
      { id: 21, text: 'Je gère mon stress de service sans le reporter sur mon équipe ou les clients.' },
      { id: 22, text: 'Je remonte les anomalies (prix, stock, comportement) à la bonne personne.' },
      { id: 23, text: 'Je participe activement aux réunions d\'équipe et aux formations.' },
      { id: 24, text: 'Je ne cache pas mes erreurs de caisse ou de gestion par peur des répercussions.' },
      { id: 25, text: 'Je reconnais ma part dans les tensions d\'équipe quand elles existent.' },
      { id: 26, text: 'Je contribue à une ambiance positive même dans les journées les plus chargées.' },
      { id: 27, text: 'Je m\'exprime directement avec mon responsable quand quelque chose me dérange.' },
      { id: 28, text: 'Je prends des nouvelles de mes collègues au-delà des échanges purement professionnels.' },
      { id: 29, text: 'Je suis un relais de confiance pour les informations importantes à transmettre.' },
      { id: 30, text: 'Je traite tous mes collègues avec respect et équité, quel que soit leur statut.' },
    ],
    recommendations: {
      low: {
        title: 'Des marges de progression à exploiter',
        text: "Le commerce est un milieu exigeant qui repose sur la cohésion d'équipe. Concentrez-vous sur la communication, la fiabilité et l'esprit d'entraide. Parler à votre responsable de vos points à améliorer est la première étape.",
      },
      mid: {
        title: 'Un(e) collègue engagé(e) et apprécié(e)',
        text: "Vous êtes un(e) collègue sur lequel/laquelle on peut compter au quotidien. Travaillez encore sur la gestion du stress en période de rush et sur votre présence auprès des nouveaux. Votre attitude positive est votre plus grande force.",
      },
      high: {
        title: 'Un(e) collègue exceptionnel(le)',
        text: "Bravo ! Vous êtes le type de collègue qui fait la différence au quotidien — professionnel(le), solidaire et positif(ve). Votre équipe a beaucoup de chance de vous avoir. Continuez à porter cette énergie bienveillante.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 10 — SOMMES-NOUS PRÊTS À AVOIR UN CHIEN ?
  // ─────────────────────────────────────────────────────────────
  {
    id: 10,
    title: 'Sommes-nous prêts à avoir un chien ?',
    category: 'Animaux de compagnie',
    color: '#8B6914',
    iconName: 'paw',
    coverKeys: ['cover4_1'],
    questions: [
      { id: 1, text: 'Nous avons réfléchi ensemble et sincèrement à notre désir d\'avoir un chien.' },
      { id: 2, text: 'L\'un ou l\'autre d\'entre nous a déjà de l\'expérience avec les chiens.' },
      { id: 3, text: 'Nous avons suffisamment de temps à consacrer à un chien au quotidien.' },
      { id: 4, text: 'Notre logement est adapté à l\'accueil d\'un chien (espace, jardin ou proximité d\'espaces verts).' },
      { id: 5, text: 'Nous sommes financièrement prêts pour les frais liés à un chien (vétérinaire, nourriture, toilettage).' },
      { id: 6, text: 'Nous avons réfléchi à qui s\'occupera du chien lors de nos absences ou vacances.' },
      { id: 7, text: 'Nous sommes prêts à adapter notre organisation (horaires, voyages) pour le chien.' },
      { id: 8, text: 'Nous avons réfléchi à la race ou au profil de chien adapté à notre style de vie.' },
      { id: 9, text: 'Nous sommes prêts à consacrer du temps à l\'éducation et à la socialisation du chien.' },
      { id: 10, text: 'Nous avons discuté des règles de vie avec le chien (accès aux pièces, canapé, chambre...).' },
      { id: 11, text: 'Nous sommes prêts à gérer les contraintes sanitaires (vermifuges, vaccins, puces).' },
      { id: 12, text: 'Nous avons vérifié que notre logement (propriétaire, copropriété) autorise un chien.' },
      { id: 13, text: 'Nous sommes prêts à faire face à des frais vétérinaires importants si nécessaire.' },
      { id: 14, text: 'Nous avons réfléchi à ce que nous ferions en cas d\'allergie ou d\'incompatibilité.' },
      { id: 15, text: 'Nous sommes en accord sur le niveau d\'intégration du chien dans notre vie quotidienne.' },
      { id: 16, text: 'Nous sommes prêts à sortir le chien plusieurs fois par jour, même par mauvais temps.' },
      { id: 17, text: 'Nous avons évalué l\'impact d\'un chien sur notre vie sociale et nos déplacements.' },
      { id: 18, text: 'Nous sommes prêts à gérer les comportements difficiles (aboiements, destructions) avec patience.' },
      { id: 19, text: 'Nous avons réfléchi à ce que nous ferons en cas de séparation de couple.' },
      { id: 20, text: 'Nous sommes prêts à suivre une formation ou des cours d\'éducation canine si nécessaire.' },
      { id: 21, text: 'Nous nous informons régulièrement sur les besoins spécifiques des chiens.' },
      { id: 22, text: 'Nous privilégions l\'adoption responsable plutôt que l\'achat impulsif.' },
      { id: 23, text: 'Nous avons évalué l\'impact d\'un chien sur les enfants ou autres animaux du foyer.' },
      { id: 24, text: 'Nous sommes prêts à consacrer du temps à l\'exercice et à l\'enrichissement mental du chien.' },
      { id: 25, text: 'Nous avons discuté de notre rôle respectif dans les soins quotidiens (repas, sorties, soins).' },
      { id: 26, text: 'Nous sommes prêts à faire appel à un éducateur canin ou vétérinaire comportementaliste si besoin.' },
      { id: 27, text: 'Nous envisageons l\'adoption d\'un chien comme un engagement à long terme (10-15 ans).' },
      { id: 28, text: 'Nous sommes prêts à accompagner le chien dans les moments difficiles de sa vieillesse.' },
      { id: 29, text: 'Notre entourage (famille, voisins) est informé et globalement favorable à cette décision.' },
      { id: 30, text: 'Nous nous sentons prêts, heureux et lucides à l\'idée d\'accueillir un chien dans notre vie.' },
    ],
    recommendations: {
      low: {
        title: 'Pas tout à fait prêts encore',
        text: "Avoir un chien est un engagement de 10 à 15 ans. Si plusieurs points vous ont questionnés, prenez encore le temps de vous renseigner, de visiter des refuges, et de peser les implications pratiques et financières avant de vous lancer.",
      },
      mid: {
        title: 'Presque prêts, quelques points à consolider',
        text: "Vous avez une bonne base mais certains aspects méritent attention (organisation, budget, logement). Identifiez les points faibles et trouvez des solutions concrètes avant d'adopter. Un chien bien préparé est un chien heureux.",
      },
      high: {
        title: 'Prêts à accueillir un nouveau membre de la famille !',
        text: "Vous semblez vraiment prêts ! Votre démarche est réfléchie, responsable et enthousiaste. La prochaine étape : choisir le bon compagnon selon votre mode de vie et privilégier l'adoption. Bonne aventure canine !",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 11 — SOMMES-NOUS PRÊTS À AVOIR UN CHAT ?
  // ─────────────────────────────────────────────────────────────
  {
    id: 11,
    title: 'Sommes-nous prêts à avoir un chat ?',
    category: 'Animaux de compagnie',
    color: '#5D6D7E',
    iconName: 'paw',
    coverKeys: ['cover4_2'],
    questions: [
      { id: 1, text: 'Nous avons réfléchi ensemble et sincèrement à notre désir d\'avoir un chat.' },
      { id: 2, text: 'L\'un ou l\'autre d\'entre nous a déjà de l\'expérience avec les chats.' },
      { id: 3, text: 'Notre logement est adapté à l\'accueil d\'un chat (espace, fenêtres sécurisées, coin calme).' },
      { id: 4, text: 'Nous sommes financièrement prêts pour les frais liés à un chat (vétérinaire, nourriture, litière).' },
      { id: 5, text: 'Nous avons réfléchi à qui s\'occupera du chat lors de nos absences ou vacances.' },
      { id: 6, text: 'Nous sommes prêts à adapter notre organisation au quotidien pour prendre soin du chat.' },
      { id: 7, text: 'Nous avons réfléchi à la race ou au profil de chat adapté à notre style de vie.' },
      { id: 8, text: 'Nous avons discuté des règles de vie avec le chat (accès aux pièces, dormir dans le lit...).' },
      { id: 9, text: 'Nous sommes prêts à gérer les contraintes sanitaires (vaccins, stérilisation, vermifuges).' },
      { id: 10, text: 'Nous avons vérifié que notre logement (propriétaire, copropriété) autorise un chat.' },
      { id: 11, text: 'Nous sommes prêts à faire face à des frais vétérinaires importants si nécessaire.' },
      { id: 12, text: 'Nous avons vérifié qu\'aucun de nous n\'est allergique aux poils de chat.' },
      { id: 13, text: 'Nous sommes en accord sur le niveau d\'affection et d\'intégration du chat dans notre vie.' },
      { id: 14, text: 'Nous comprenons et acceptons l\'indépendance naturelle du chat.' },
      { id: 15, text: 'Nous sommes prêts à gérer les griffures de meubles, les poils partout et les cadeaux surprise.' },
      { id: 16, text: 'Nous avons évalué l\'impact d\'un chat sur les enfants ou autres animaux du foyer.' },
      { id: 17, text: 'Nous sommes prêts à offrir un environnement stimulant (griffoirs, hauteurs, jouets variés).' },
      { id: 18, text: 'Nous avons envisagé la stérilisation et nous y sommes favorables.' },
      { id: 19, text: 'Nous privilégions l\'adoption responsable plutôt que l\'achat impulsif.' },
      { id: 20, text: 'Nous sommes prêts à gérer les comportements difficiles (griffures, fugues, agressivité) avec patience.' },
      { id: 21, text: 'Nous nous informons régulièrement sur les besoins spécifiques des chats.' },
      { id: 22, text: 'Nous avons discuté du rôle respectif de chacun dans les soins quotidiens.' },
      { id: 23, text: 'Nous envisageons l\'adoption d\'un chat comme un engagement à long terme (15-20 ans).' },
      { id: 24, text: 'Nous sommes prêts à accompagner le chat dans les moments difficiles de sa vieillesse.' },
      { id: 25, text: 'Nous avons réfléchi à ce que nous ferions en cas de séparation de couple.' },
      { id: 26, text: 'Notre entourage est informé et globalement favorable à cette décision.' },
      { id: 27, text: 'Nous sommes prêts à consulter un vétérinaire comportementaliste si nécessaire.' },
      { id: 28, text: 'Nous avons réfléchi à la question intérieur/extérieur et aux risques associés.' },
      { id: 29, text: 'Nous sommes sensibilisés aux besoins nutritionnels et à l\'alimentation adaptée aux chats.' },
      { id: 30, text: 'Nous nous sentons prêts, heureux et lucides à l\'idée d\'accueillir un chat dans notre vie.' },
    ],
    recommendations: {
      low: {
        title: 'Pas tout à fait prêts encore',
        text: "Avoir un chat est un engagement de 15 à 20 ans. Prenez encore le temps de vous renseigner sur ses besoins, les contraintes pratiques et les implications financières. Visiter un refuge est une excellente façon de commencer.",
      },
      mid: {
        title: 'Presque prêts, quelques points à consolider',
        text: "Vous avez une bonne disposition mais quelques aspects méritent plus de réflexion (allergies, logement, budget). Résolvez ces points avant d'adopter pour garantir une vie épanouissante au chat comme à vous.",
      },
      high: {
        title: 'Prêts à accueillir un compagnon félin !',
        text: "Votre démarche est responsable, réfléchie et enthousiaste. Vous semblez prêts à offrir une belle vie à un chat. La prochaine étape : choisir le bon profil selon votre logement et privilégier l'adoption. Bonne aventure féline !",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 12 — SUIS-JE PRÊT(E) À TRANSMETTRE MES VALEURS ?
  // ─────────────────────────────────────────────────────────────
  {
    id: 12,
    title: 'Suis-je prêt(e) à transmettre mes valeurs ?',
    category: 'Valeurs & Transmission',
    color: '#D48B00',
    iconName: 'sparkles',
    coverKeys: ['cover5_1'],
    questions: [
      { id: 1, text: 'Je suis capable d\'identifier clairement les valeurs qui me sont les plus importantes.' },
      { id: 2, text: 'Je vis au quotidien en accord avec les valeurs que je souhaite transmettre.' },
      { id: 3, text: 'Je suis cohérent(e) entre ce que je dis et ce que je fais devant mes enfants.' },
      { id: 4, text: 'Je prends le temps d\'expliquer à mes enfants le "pourquoi" de mes règles et décisions.' },
      { id: 5, text: 'Je favorise le dialogue et les questions de mes enfants sur les sujets importants.' },
      { id: 6, text: 'Je respecte la personnalité et les opinions de mes enfants même quand ils diffèrent des miens.' },
      { id: 7, text: 'Je m\'interroge régulièrement sur les valeurs que je transmets réellement, pas seulement celles que je veux transmettre.' },
      { id: 8, text: 'Je montre l\'exemple dans les domaines où j\'attends quelque chose de mes enfants.' },
      { id: 9, text: "J'aborde les sujets difficiles (injustice, mort, différences) avec honnêteté et adaptation à leur âge." },
      { id: 10, text: 'Je transmets le sens du respect des autres et de la diversité.' },
      { id: 11, text: 'J\'enseigne à mes enfants la valeur du travail et de l\'effort par mon exemple.' },
      { id: 12, text: 'Je transmets la valeur de la gratitude et de l\'appréciation du quotidien.' },
      { id: 13, text: 'Je suis attentif(ve) aux valeurs transmises par les écrans et l\'environnement de mes enfants.' },
      { id: 14, text: "J'inculque à mes enfants le sens de la justice et de l'équité dans leurs relations." },
      { id: 15, text: 'Je transmets l\'importance de l\'honnêteté, même quand c\'est difficile.' },
      { id: 16, text: 'Je favorise l\'empathie et la capacité à se mettre à la place des autres.' },
      { id: 17, text: "J'aborde la question de la solidarité et de l'entraide dans notre quotidien familial." },
      { id: 18, text: 'Je transmets à mes enfants le sens de la responsabilité : leurs actes ont des conséquences.' },
      { id: 19, text: 'J\'encourage la curiosité intellectuelle et l\'ouverture d\'esprit.' },
      { id: 20, text: 'Je transmets le respect de la nature et de l\'environnement par des gestes concrets.' },
      { id: 21, text: 'Je suis prêt(e) à changer d\'avis devant mes enfants et à leur montrer qu\'on peut évoluer.' },
      { id: 22, text: 'Je laisse mes enfants développer leurs propres valeurs en les guidant sans les contraindre.' },
      { id: 23, text: "J'aborde avec eux la question du rapport à l'argent, à la générosité et à la sobriété." },
      { id: 24, text: 'Je transmets l\'importance de la parole donnée et du respect des engagements.' },
      { id: 25, text: 'Je favorise l\'autonomie de pensée de mes enfants plutôt que la simple obéissance.' },
      { id: 26, text: 'Je prends le temps de réfléchir à l\'impact de mes propres valeurs sur leur bien-être.' },
      { id: 27, text: 'Je transmets le droit à l\'erreur et la capacité de se relever après un échec.' },
      { id: 28, text: "J'enseigne à mes enfants la valeur de la bienveillance envers eux-mêmes et envers les autres." },
      { id: 29, text: 'Je suis prêt(e) à remettre en question certaines valeurs héritées de ma propre éducation.' },
      { id: 30, text: 'Je me sens capable de préparer mes enfants à un monde complexe avec lucidité et amour.' },
    ],
    recommendations: {
      low: {
        title: 'Une belle réflexion à approfondir',
        text: "Transmettre ses valeurs commence par les clarifier soi-même. Prenez le temps de réfléchir à ce qui compte vraiment pour vous, et à la cohérence entre ce que vous dites et ce que vous vivez. C'est un travail personnel profond qui vaut la peine d'être fait.",
      },
      mid: {
        title: 'Sur la voie d\'une transmission consciente',
        text: "Vous avez une belle conscience de l'importance de la transmission. Travaillez en particulier sur la cohérence entre vos actes et vos paroles, et sur votre capacité à dialoguer avec vos enfants sur les sujets difficiles. Vous êtes déjà un modèle positif.",
      },
      high: {
        title: 'Un passeur de sens inspirant',
        text: "Vos enfants ont la chance d'être guidés par quelqu'un qui réfléchit profondément à ce qu'il transmet. Votre cohérence, votre ouverture et votre engagement font de vous un modèle précieux. Continuez à cultiver cette belle complicité avec eux.",
      },
    },
  },
];

/** Find a specific quiz by id */
export function getSpecificQuiz(id: number): SpecificQuiz | undefined {
  return SPECIFIC_QUIZZES.find((q) => q.id === id);
}

/** Group quizzes by category */
export function getQuizzesByCategory(): { category: string; quizzes: SpecificQuiz[] }[] {
  const map = new Map<string, SpecificQuiz[]>();
  for (const quiz of SPECIFIC_QUIZZES) {
    if (!map.has(quiz.category)) map.set(quiz.category, []);
    map.get(quiz.category)!.push(quiz);
  }
  return Array.from(map.entries()).map(([category, quizzes]) => ({ category, quizzes }));
}
