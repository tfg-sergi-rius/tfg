export type Lang = 'ca' | 'es' | 'en';

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: 'ca', label: 'CA' },
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
];

export const TRANSLATIONS: Record<string, Record<Lang, string>> = {
  // Comú
  'common.back': { ca: 'Tornar', es: 'Volver', en: 'Back' },

  // Navegació
  'nav.random': { ca: 'TFG aleatori', es: 'TFG aleatorio', en: 'Random TFG' },
  'nav.about': { ca: 'Sobre nosaltres', es: 'Sobre nosotros', en: 'About us' },
  'nav.contact': { ca: 'Contacte', es: 'Contacto', en: 'Contact' },
  'nav.login': { ca: 'Inicia sessió', es: 'Iniciar sesión', en: 'Log in' },
  'nav.logout': { ca: 'Tanca sessió', es: 'Cerrar sesión', en: 'Log out' },

  // Home
  'home.hero.title1': { ca: 'Descobreix', es: 'Descubre', en: 'Discover' },
  'home.hero.title2': { ca: 'el teu TFG', es: 'tu TFG', en: 'your TFG' },
  'home.hero.subtitle': {
    ca: 'Respon a unes quantes preguntes sobre els teus interessos i rep suggeriments personalitzats per al teu projecte final de grau.',
    es: 'Responde a unas cuantas preguntas sobre tus intereses y recibe sugerencias personalizadas para tu proyecto final de grado.',
    en: 'Answer a few questions about your interests and get personalised suggestions for your final degree project.',
  },
  'home.hero.ctaForm': {
    ca: "Esbrina quin TFG s'adapta millor a tu",
    es: 'Descubre qué TFG se adapta mejor a ti',
    en: 'Find out which TFG fits you best',
  },
  'home.hero.ctaRandom': {
    ca: "Genera'm un TFG aleatori",
    es: 'Genérame un TFG aleatorio',
    en: 'Generate a random TFG',
  },
  'home.hero.forwhoLabel': { ca: 'Per a qui és', es: 'Para quién es', en: "Who it's for" },
  'home.hero.forwhoText': {
    ca: 'Pensat per a estudiants que volen passar de la indecisió inicial a una proposta de projecte concreta, viable i atractiva.',
    es: 'Pensado para estudiantes que quieren pasar de la indecisión inicial a una propuesta de proyecto concreta, viable y atractiva.',
    en: 'Designed for students who want to move from initial indecision to a concrete, feasible and appealing project proposal.',
  },
  'home.stats.kicker': {
    ca: 'Activitat de la plataforma',
    es: 'Actividad de la plataforma',
    en: 'Platform activity',
  },
  'home.stat.requests.title': {
    ca: 'Consultes totals',
    es: 'Consultas totales',
    en: 'Total queries',
  },
  'home.stat.requests.desc': {
    ca: "Sol·licituds de recomanació registrades des de la creació de l'aplicació.",
    es: 'Solicitudes de recomendación registradas desde la creación de la aplicación.',
    en: 'Recommendation requests recorded since the app was created.',
  },
  'home.stat.ideas.title': {
    ca: 'Idees generades',
    es: 'Ideas generadas',
    en: 'Ideas generated',
  },
  'home.stat.ideas.desc': {
    ca: 'Nombre total de propostes de TFG guardades fins ara.',
    es: 'Número total de propuestas de TFG guardadas hasta ahora.',
    en: 'Total number of TFG proposals saved so far.',
  },
  'home.stat.rating.title': {
    ca: 'Mitjana de valoracions',
    es: 'Media de valoraciones',
    en: 'Average rating',
  },
  'home.stat.rating.desc': {
    ca: 'Puntuació mitjana de les valoracions deixades pels usuaris.',
    es: 'Puntuación media de las valoraciones dejadas por los usuarios.',
    en: 'Average score of the ratings left by users.',
  },

  // Formulari
  'form.kicker': {
    ca: 'Brief creatiu del teu projecte',
    es: 'Brief creativo de tu proyecto',
    en: 'Creative brief for your project',
  },
  'form.step1.title1': { ca: 'Troba el teu', es: 'Encuentra tu', en: 'Find your' },
  'form.step1.title2': { ca: 'TFG ideal', es: 'TFG ideal', en: 'ideal TFG' },
  'form.step1.intro': {
    ca: "Comença dient-nos quina carrera estàs estudiant i et farem les preguntes adequades per trobar el TFG perfecte per a tu.",
    es: 'Empieza diciéndonos qué carrera estás estudiando y te haremos las preguntas adecuadas para encontrar el TFG perfecto para ti.',
    en: "Start by telling us what degree you're studying and we'll ask you the right questions to find the perfect TFG for you.",
  },
  'form.step1.panelLabel': {
    ca: 'Què tindràs al final',
    es: 'Qué tendrás al final',
    en: "What you'll get",
  },
  'form.step1.benefit1': {
    ca: 'Idees de TFG amb enfocament concret.',
    es: 'Ideas de TFG con un enfoque concreto.',
    en: 'TFG ideas with a concrete focus.',
  },
  'form.step1.benefit2': {
    ca: 'Tecnologies i temàtiques alineades amb el teu perfil.',
    es: 'Tecnologías y temáticas alineadas con tu perfil.',
    en: 'Technologies and topics aligned with your profile.',
  },
  'form.step1.benefit3': {
    ca: 'Propostes pensades per passar de bloqueig a direcció.',
    es: 'Propuestas pensadas para pasar del bloqueo a una dirección.',
    en: 'Proposals designed to move from being stuck to having direction.',
  },
  'form.step1.chip': { ca: 'Pas 1 de 2', es: 'Paso 1 de 2', en: 'Step 1 of 2' },
  'form.step1.headerText': {
    ca: 'Digues-nos quina carrera estàs estudiant per personalitzar les preguntes.',
    es: 'Dinos qué carrera estás estudiando para personalizar las preguntas.',
    en: "Tell us what degree you're studying to personalise the questions.",
  },
  'form.step1.careerLabel': {
    ca: 'Quina carrera estudies?',
    es: '¿Qué carrera estudias?',
    en: 'What degree are you studying?',
  },
  'form.step1.careerPlaceholder': {
    ca: 'Ex: Enginyeria Informàtica, ADE, Medicina...',
    es: 'Ej: Ingeniería Informática, ADE, Medicina...',
    en: 'E.g. Computer Engineering, Business, Medicine...',
  },
  'form.step1.submit': { ca: 'Continua', es: 'Continuar', en: 'Continue' },
  'form.step1.loading': {
    ca: 'Generant preguntes...',
    es: 'Generando preguntas...',
    en: 'Generating questions...',
  },
  'form.step2.title1': { ca: "Explica'ns", es: 'Cuéntanos', en: 'Tell us' },
  'form.step2.title2': { ca: 'més sobre tu', es: 'más sobre ti', en: 'more about you' },
  'form.step2.intro': {
    ca: 'Respon aquestes preguntes perquè puguem generar les millors propostes de TFG adaptades al teu perfil de',
    es: 'Responde estas preguntas para que podamos generar las mejores propuestas de TFG adaptadas a tu perfil de',
    en: 'Answer these questions so we can generate the best TFG proposals tailored to your profile in',
  },
  'form.step2.chip': { ca: 'Pas 2 de 2', es: 'Paso 2 de 2', en: 'Step 2 of 2' },
  'form.step2.headerText': {
    ca: 'Respon les preguntes i et proposarem 5 idees de TFG personalitzades.',
    es: 'Responde las preguntas y te propondremos 5 ideas de TFG personalizadas.',
    en: "Answer the questions and we'll propose 5 personalised TFG ideas.",
  },
  'form.step2.answerPlaceholder': {
    ca: 'La teva resposta...',
    es: 'Tu respuesta...',
    en: 'Your answer...',
  },
  'form.step2.submit': {
    ca: 'Generar idees de TFG',
    es: 'Generar ideas de TFG',
    en: 'Generate TFG ideas',
  },
  'form.step2.loading': { ca: 'Generant...', es: 'Generando...', en: 'Generating...' },

  // Resultats
  'results.title': {
    ca: 'Idees de TFG generades',
    es: 'Ideas de TFG generadas',
    en: 'Generated TFG ideas',
  },
  'results.intro': {
    ca: "Aquestes són les propostes que encaixen amb les respostes del teu briefing. Navega entre elles i queda't amb la que tingui més potencial.",
    es: 'Estas son las propuestas que encajan con las respuestas de tu briefing. Navega entre ellas y quédate con la que tenga más potencial.',
    en: 'These are the proposals that match your briefing answers. Browse through them and keep the one with the most potential.',
  },
  'results.loading': {
    ca: 'Generant idees amb IA...',
    es: 'Generando ideas con IA...',
    en: 'Generating ideas with AI...',
  },
  'results.proposal': { ca: 'Proposta', es: 'Propuesta', en: 'Proposal' },
  'results.elaborating': {
    ca: 'Desglossant...',
    es: 'Desglosando...',
    en: 'Breaking it down...',
  },
  'results.elaborateBtn': {
    ca: 'Desglossa aquest TFG',
    es: 'Desglosa este TFG',
    en: 'Break down this TFG',
  },
  'results.elaborationTitle': {
    ca: 'Desglossament detallat',
    es: 'Desglose detallado',
    en: 'Detailed breakdown',
  },
  'results.phases': {
    ca: 'Fases del projecte',
    es: 'Fases del proyecto',
    en: 'Project phases',
  },
  'results.challenges': {
    ca: 'Reptes principals',
    es: 'Retos principales',
    en: 'Main challenges',
  },
  'results.resources': {
    ca: 'Recursos i tecnologies clau',
    es: 'Recursos y tecnologías clave',
    en: 'Key resources and technologies',
  },
  'results.ratingKicker': {
    ca: 'Valora aquestes idees',
    es: 'Valora estas ideas',
    en: 'Rate these ideas',
  },
  'results.ratingTitle': {
    ca: 'Quina puntuació els dones?',
    es: '¿Qué puntuación les das?',
    en: 'What score do you give them?',
  },
  'results.ratingSaved': {
    ca: 'Valoració guardada:',
    es: 'Valoración guardada:',
    en: 'Rating saved:',
  },
  'results.ratingNone': {
    ca: 'Encara no has valorat aquestes idees.',
    es: 'Aún no has valorado estas ideas.',
    en: "You haven't rated these ideas yet.",
  },
  'results.moreQuestions': {
    ca: 'Vull més preguntes',
    es: 'Quiero más preguntas',
    en: 'I want more questions',
  },
  'results.emptyKicker': { ca: 'Sense resultats', es: 'Sin resultados', en: 'No results' },
  'results.emptyTitle': {
    ca: 'No hem trobat idees per mostrar.',
    es: 'No hemos encontrado ideas para mostrar.',
    en: "We couldn't find any ideas to show.",
  },
  'results.emptyText': {
    ca: 'Torna al formulari, ajusta les respostes i genera una nova proposta.',
    es: 'Vuelve al formulario, ajusta las respuestas y genera una nueva propuesta.',
    en: 'Go back to the form, adjust your answers and generate a new proposal.',
  },

  // TFG aleatori
  'random.title': { ca: 'TFG aleatori', es: 'TFG aleatorio', en: 'Random TFG' },
  'random.loading': {
    ca: 'Generant una idea sorpresa...',
    es: 'Generando una idea sorpresa...',
    en: 'Generating a surprise idea...',
  },

  // Sobre nosaltres
  'about.kicker': { ca: 'Sobre nosaltres', es: 'Sobre nosotros', en: 'About us' },
  'about.title': {
    ca: 'Una eina per convertir interessos dispersos en propostes de TFG clares.',
    es: 'Una herramienta para convertir intereses dispersos en propuestas de TFG claras.',
    en: 'A tool to turn scattered interests into clear TFG proposals.',
  },
  'about.p1': {
    ca: 'TFG Finder combina un formulari guiat amb generació assistida per IA per ajudar estudiants a descobrir idees viables, originals i alineades amb el seu perfil acadèmic i tecnològic.',
    es: 'TFG Finder combina un formulario guiado con generación asistida por IA para ayudar a los estudiantes a descubrir ideas viables, originales y alineadas con su perfil académico y tecnológico.',
    en: 'TFG Finder combines a guided form with AI-assisted generation to help students discover feasible, original ideas aligned with their academic and technical profile.',
  },
  'about.p2': {
    ca: "L'objectiu de la plataforma és reduir el temps inicial de bloqueig quan toca escollir tema i transformar preferències personals en opcions concretes que es puguin convertir en un projecte final realista.",
    es: 'El objetivo de la plataforma es reducir el tiempo inicial de bloqueo a la hora de elegir tema y transformar preferencias personales en opciones concretas que se puedan convertir en un proyecto final realista.',
    en: "The platform's goal is to reduce the initial time spent stuck when choosing a topic and to turn personal preferences into concrete options that can become a realistic final project.",
  },
  'about.cta': {
    ca: 'Començar amb el formulari',
    es: 'Empezar con el formulario',
    en: 'Start with the form',
  },

  // Contacte
  'contact.kicker': { ca: 'Contacte', es: 'Contacto', en: 'Contact' },
  'contact.title': {
    ca: 'Vols comentar una millora o proposar una funcionalitat nova?',
    es: '¿Quieres comentar una mejora o proponer una funcionalidad nueva?',
    en: 'Want to suggest an improvement or propose a new feature?',
  },
  'contact.p1': {
    ca: "Aquesta pàgina pot servir com a punt de contacte del projecte: s'hi podria afegir un correu electrònic, un perfil de GitHub o qualsevol altre canal dedicat únicament a aquesta finalitat.",
    es: 'Esta página puede servir como punto de contacto del proyecto: aquí se podría añadir un correo electrónico, un perfil de GitHub o cualquier otro canal dedicado únicamente a esta finalidad.',
    en: "This page can act as the project's contact point: an email address, a GitHub profile or any other channel dedicated solely to this purpose could be added here.",
  },
  'contact.p2': {
    ca: "També s'hi podria afegir un fòrum on els usuaris escriguin propostes de millora de l'aplicació i quedin desades i visibles.",
    es: 'También se podría añadir un foro donde los usuarios escriban propuestas de mejora de la aplicación y queden guardadas y visibles.',
    en: 'A forum could also be added where users post improvement suggestions for the app, which would be saved and remain visible.',
  },
  'contact.home': {
    ca: "Tornar a l'inici",
    es: 'Volver al inicio',
    en: 'Back to home',
  },

  // Login
  'login.title': { ca: 'Benvingut', es: 'Bienvenido', en: 'Welcome' },
  'login.subtitle': {
    ca: 'Inicia sessió per accedir al generador de TFG personalitzats.',
    es: 'Inicia sesión para acceder al generador de TFG personalizados.',
    en: 'Log in to access the personalised TFG generator.',
  },
  'login.googleBtn': {
    ca: 'Continua amb Google',
    es: 'Continuar con Google',
    en: 'Continue with Google',
  },
};
