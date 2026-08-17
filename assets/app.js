const SUBJECTS=[
['Mathematics','MTH','Quantitative reasoning, modelling and problem solving'],['English Language','ENG','Communication, comprehension and composition'],['Kiswahili','KIS','Mawasiliano, sarufi, fasihi na matumizi'],['Biology','BIO','Living systems, health and scientific inquiry'],['Chemistry','CHE','Matter, reactions and laboratory competence'],['Physics','PHY','Measurement, forces, energy and practical inquiry'],['Geography','GEO','People, environment, maps and spatial reasoning'],['History','HIS','Historical evidence, societies and change'],['Civics','CIV','Citizenship, governance and social responsibility'],['Computer Science','CSC','Computational thinking and digital creation'],['Agriculture','AGR','Sustainable production and agricultural enterprise'],['Business Studies','BUS','Enterprise, markets and business decision making'],['Commerce','COM','Trade, finance and commercial practice'],['Bookkeeping','BKP','Accounting records and financial literacy'],['Economics','ECO','Resources, markets and economic reasoning'],['Literature in English','LIT','Literary analysis, interpretation and expression'],['French','FRE','Functional language and intercultural communication'],['Arabic','ARB','Language competence and communication'],['Fine Art','ART','Creative expression, design and visual literacy'],['Music','MUS','Performance, theory and creative composition'],['Physical Education','PED','Movement competence, fitness and wellbeing'],['Food & Nutrition','FNT','Nutrition, food science and practical preparation'],['Home Economics','HEC','Household management, textiles and wellbeing'],['Religious Studies','RLS','Ethics, beliefs and social understanding'],['General Studies','GST','A-level interdisciplinary reasoning and citizenship'],['Advanced Mathematics','AMT','A-level mathematical reasoning and applications'],['ICT','ICT','Information systems, productivity and digital literacy']
];
const TOPICS={
  BIO:['Introduction to Biology','Cell Structure and Organisation','Nutrition in Living Organisms','Transport of Materials','Gaseous Exchange and Respiration','Coordination and Response','Reproduction','Genetics and Evolution','Ecology and Environment'],
  MTH:['Numbers and Operations','Algebraic Expressions & Equations','Geometry and Geometric Proofs','Coordinate Geometry','Trigonometry & Ratios','Statistics and Probability','Vectors and Matrices','Functions and Linear Programming'],
  ENG:['Listening and Oral Communication','Reading Comprehension & Inferences','Grammar in Functional Context','Vocabulary Development & Idioms','Formal and Creative Writing','Oral Literature & Folklore','Literary Text Analysis'],
  KIS:['Mawasiliano na Matumizi ya Lugha','Sarufi ya Kiswahili','Uandishi wa Insha na Barua','Fasihi Simulizi na Ushairi','Uchambuzi wa Riwaya na Tamthilia','Ufahamu na Ufupisho wa Taarifa','Misingi ya Ukalimani na Tafsiri'],
  CHE:['Laboratory Techniques and Safety','Nature and States of Matter','Atomic Structure and Periodicity','Chemical Bonding and Structure','Formulae and Chemical Equations','Acids, Bases and Salts','Volumetric and Qualitative Analysis','Organic Chemistry'],
  PHY:['Introduction to Measurement','Forces, Motion and Newton\'s Laws','Archimedes Principle and Fluid Pressure','Work, Energy and Power','Thermal Physics and Gas Laws','Wave Motion and Sound','Optics and Reflection of Light','Current Electricity and Magnetism'],
  GEO:['Concept of Geography and Solar System','Map Reading and Map Analysis','Weather and Climate Dynamics','Physical Geography and Landforms','Human Population and Settlement','Agriculture, Livestock and Forestry','Mining, Energy and Industrialization','Environmental Conservation'],
  HIS:['Sources of History and Historical Method','Evolution of Man and Early Communities','Pre-colonial African Political Systems','Colonial Conquest and Imposition of Rule','Colonial Economy and Social Services','Nationalism and the Struggle for Independence','Post-Independence Africa and World Order'],
  CIV:['Our Nation and the Constitution','Human Rights and Responsibilities','Democratic Governance and Rule of Law','Family, Social Structures and Values','Civic Engagement and Global Citizenship','Economic Development and Financial Integrity'],
  CSC:['Computer Architecture and Hardware','Operating Systems and System Software','Algorithms, Pseudocode and Flowcharts','Programming in Modern Languages','Relational Databases and SQL Queries','Computer Networking and Cloud Infrastructure','Cybersecurity, Privacy and Tech Ethics'],
  AGR:['Introduction to Sustainable Agriculture','Soil Science, Texture and Fertility','Crop Production and Field Husbandry','Plant Protection and Pest Management','Livestock Husbandry and Animal Health','Farm Implements and Farm Power','Agri-business and Market Linkages'],
  BUS:['Introduction to Business Environment','Forms of Business Ownership','Entrepreneurship, Innovation and Risk','Marketing Principles and Consumer Needs','Business Accounting and Cash Management','Business Law and Contractual Ethics'],
  COM:['Scope of Commerce and Commercial Activities','Production and Division of Labour','Wholesale and Retail Trade Systems','International Trade and Export Logistics','Banking, Payments and Insurance Services','Warehousing, Transport and Communication'],
  BKP:['Introduction to Bookkeeping Systems','Double Entry Bookkeeping and Day Books','Ledger Accounts and Trial Balance','Adjustment of Errors and Suspense Accounts','Preparation of Final Financial Statements','Bank Reconciliation and Petty Cash Systems'],
  ECO:['Basic Economic Concepts and Opportunity Cost','Price Theory: Demand and Supply Equilibrium','Theory of Production, Output and Costs','Market Structures and Price Determination','National Income Accounting and Growth','Money, Banking Systems and Inflation','Public Finance, Taxation and Trade Policy'],
  LIT:['Introduction to Literature and Genres','Narrative Techniques and Prose Analysis','Dramatic Techniques and Playwright Craft','Poetic Devices, Meter and Imagery','Thematic Analysis and Character Motives','Comparative Literary Criticism'],
  FRE:['Salutations et Communication Quotidienne','La Famille, l\'École et les Loisirs','Grammaire et Conjugaison Pratique','Compréhension Écrite et Vocabulaire','Production Écrite et Rédaction','Expression Orale et Interaction'],
  ARB:['Huruf na Sauti za Lugha ya Kiarabu','Misingi ya Sarufi (Nahw)','Misingi ya Unyumbufu (Sarf)','Msamiati na Mazungumzo ya Kila Siku','Ufahamu wa Maandishi ya Kiarabu','Uandishi na Insha ya Kiarabu'],
  ART:['Elements and Principles of Visual Art','Freehand Drawing and Perspective','Colour Theory and Expressive Painting','Three-Dimensional Sculpture and Craft','Graphic Design and Typography','Tanzanian Visual Heritage and Art History'],
  MUS:['Music Theory, Clefs and Staff Notation','Rhythm, Pitch and Solfege Ear Training','Tanzanian Traditional Music and Instruments','Vocal Techniques and Choral Performance','Instrumental Performance and Improvisation','Music Composition and Sound Production'],
  PED:['Human Anatomy, Physiology and Movement','Physical Fitness and Training Principles','Track and Field Athletics','Team Ball Sports: Rules and Tactics','Gymnastics and Motor Skill Coordination','First Aid, Sports Injuries and Nutrition'],
  FNT:['Nutritional Science and Human Health','Meal Planning and Dietary Requirements','Food Preparation Methods and Kitchen Science','Food Preservation and Storage Techniques','Hygiene, Sanitation and Kitchen Safety','Food Presentation and Catering Enterprise'],
  HEC:['Family Resource Management and Budgeting','Consumer Rights and Financial Literacy','Textile Science and Pattern Construction','Child Growth, Care and Development','Housing, Interior Planning and Sanitation','Entrepreneurship in Home Economics'],
  RLS:['Foundations of Faith, Morals and Ethics','Sacred Scripture Interpretation','Family, Community and Moral Relationships','Religion, Social Justice and Human Dignity','Interfaith Understanding and Dialogue','Contemporary Ethical Issues and Peacebuilding'],
  GST:['Philosophy, Epistemology and Critical Inquiry','Science, Technology and Sustainable Progress','Socio-Economic Development Dynamics','National Identity, Culture and Globalisation','Governance, Constitutionalism and Human Rights','Conflict Resolution and International Affairs'],
  AMT:['Advanced Algebra, Series and Complex Numbers','Coordinate Geometry and Vector Spaces','Differential Calculus and Real-World Optimization','Integral Calculus and Area/Volume Analysis','Trigonometric Identities and Proofs','Probability Distributions and Hypothesis Testing','Matrices, Transformations and Numerical Methods'],
  ICT:['Information Systems and Computer Hardware','Word Processing and Professional Formatting','Spreadsheet Modelling and Data Analysis','Presentation Design and Multimedia Production','Internet Protocols, Web Tech and Cloud Storage','Database Design and Data Security Principles']
};
const assetPath=(p)=>location.protocol==='file:'?p:'/'+p.replace(/^\//,'');
function safeParse(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    if (!val || val === 'undefined' || val === 'null') return fallback;
    return JSON.parse(val);
  } catch(e) {
    return fallback;
  }
}
const ADMIN_EMAILS = ['teseaacademy@gmail.com', 'crackus2@gmail.com'];
function isAdminAuth(auth) {
  if (!auth || !auth.email) return false;
  const email = String(auth.email).trim().toLowerCase();
  const provider = String(auth.provider || '').toLowerCase();
  const isGoogle = provider === 'google' || provider === 'google.com';
  return isGoogle && ADMIN_EMAILS.includes(email);
}

const rawAuth = safeParse('tesea_auth', null);
const initialRole = (rawAuth && isAdminAuth(rawAuth)) ? (localStorage.getItem('tesea_role') || 'admin') : 'learner';

const state={
  role: initialRole,
  page: localStorage.getItem('tesea_page')||'landing',
  theme: localStorage.getItem('tesea_theme')||'light',
  subject:'BIO',
  topic:0,
  lessonMode:'text',
  quizAnswers:{},
  progress: safeParse('tesea_progress', {"BIO":0,"MTH":0,"ENG":0,"CHE":0,"PHY":0,"GEO":0,"KIS":0,"HIS":0,"CIV":0,"CSC":0,"AGR":0,"BUS":0,"COM":0,"BKP":0,"ECO":0,"LIT":0,"FRE":0,"ARB":0,"ART":0,"MUS":0,"PED":0,"FNT":0,"HEC":0,"RLS":0,"GST":0,"AMT":0,"ICT":0}),
  topicProgress: safeParse('tesea_topic_progress', {}),
  lessonProgress: safeParse('tesea_lesson_progress', {}),
  quizHistory: safeParse('tesea_quiz_history', []),
  evidenceLedger: safeParse('tesea_evidence_ledger', {}),
  subscription: safeParse('tesea_sub', { plan: 'Free Explorer', status: 'Active', rafikiUsed: 0, rafikiLimit: 50, renewal: 'Free Tier' }),
  auth: rawAuth
};

function getSubjectMastery(code) {
  return typeof state.progress[code] === 'number' ? state.progress[code] : 0;
}

function getCompletedTopicsCount(code) {
  if (!state.topicProgress || !state.topicProgress[code]) return 0;
  return Array.isArray(state.topicProgress[code]) ? state.topicProgress[code].length : 0;
}

function getLessonCompletion(code, topicIdx) {
  const c = code || state.subject;
  const t = topicIdx !== undefined ? topicIdx : state.topic;
  if (!state.lessonProgress[c] || !state.lessonProgress[c][t]) return 0;
  const modes = ['text','video','audio','pdf','shorts','live'];
  const done = modes.filter(m => state.lessonProgress[c][t][m]).length;
  return Math.round((done / modes.length) * 100);
}

function calculateOverallMastery() {
  const vals = Object.values(state.progress);
  if (!vals.length) return 0;
  const nonZero = vals.filter(x => x > 0);
  if (!nonZero.length) return 0;
  return Math.round(nonZero.reduce((a,b)=>a+b,0) / nonZero.length);
}

function calculateCompetenciesDemonstrated() {
  return Object.values(state.progress).filter(x => x >= 80).length;
}

function calculateCompetenciesToReinforce() {
  return Object.values(state.progress).filter(x => x > 0 && x < 80).length;
}

function getSubjectQuestions(code, topicIdx) {
  const s = SUBJECTS.find(x => x[1] === code) || SUBJECTS[0];
  const topics = TOPICS[code] || ['Core Concept'];
  const tName = topics[topicIdx] || topics[0];
  
  if (code === 'BIO') {
    return [
      { q: `Which sequence correctly represents the reflex arc in ${tName}?`, options: ['Receptor → sensory neurone → relay neurone → motor neurone → effector','Receptor → motor neurone → sensory neurone → effector','Effector → motor neurone → relay neurone → sensory neurone','Sensory neurone → receptor → motor neurone → effector'], correct: 0, lo: 'LO1' },
      { q: 'Why is a reflex action significantly faster than voluntary action?', options: ['It bypasses conscious decision-making in the brain','It uses larger blood vessels for transmission','It does not use electrical impulses','It only occurs when sleeping'], correct: 0, lo: 'LO2' },
      { q: 'Which structure acts as the effector in a protective withdrawal reflex?', options: ['A contracting muscle or secreting gland','A sensory receptor in the skin','The spinal cord interneurone','The myelin sheath around the axon'], correct: 0, lo: 'LO3' }
    ];
  } else if (code === 'MTH') {
    return [
      { q: `In ${tName}, what is the foundational step when solving a linear equation 3x + 6 = 21?`, options: ['Subtract 6 from both sides, then divide by 3 (x = 5)','Multiply both sides by 3','Add 6 to 21 directly','Square both sides'], correct: 0, lo: 'LO1' },
      { q: 'Which property guarantees that multiplying both sides of an equality by the same non-zero number preserves equality?', options: ['Multiplication property of equality','Commutative property of addition','Distributive property of exponents','Associative property of division'], correct: 0, lo: 'LO2' },
      { q: 'What is the gradient (slope) of the line passing through (2, 4) and (4, 10)?', options: ['3','2','6','1/3'], correct: 0, lo: 'LO3' }
    ];
  } else if (code === 'CHE') {
    return [
      { q: `In ${tName}, what is observed when dilute hydrochloric acid reacts with calcium carbonate?`, options: ['Effervescence with evolution of carbon dioxide gas','Formation of blue precipitate','Evolution of pungent ammonia gas','No reaction occurs'], correct: 0, lo: 'LO1' },
      { q: 'Which subatomic particles determine the atomic number and chemical identity of an element?', options: ['Protons in the nucleus','Neutrons in the nucleus','Electrons in the outermost shell only','Positrons in the electron cloud'], correct: 0, lo: 'LO2' },
      { q: 'What is the pH range of a strong basic solution at 25°C?', options: ['12 to 14','1 to 3','7.0 exactly','5 to 6'], correct: 0, lo: 'LO3' }
    ];
  } else if (code === 'PHY') {
    return [
      { q: `In ${tName}, which formula calculates pressure exerted by a solid object on a flat surface?`, options: ['Pressure = Force / Area','Pressure = Force × Area','Pressure = Mass × Acceleration','Pressure = Work / Time'], correct: 0, lo: 'LO1' },
      { q: 'What is the SI unit of work and energy?', options: ['Joule (J)','Newton (N)','Watt (W)','Pascal (Pa)'], correct: 0, lo: 'LO2' },
      { q: 'Which statement best describes Archimedes\' Principle?', options: ['Upthrust equals the weight of fluid displaced','Pressure decreases as fluid speed increases','Current is directly proportional to potential difference','Energy can neither be created nor destroyed'], correct: 0, lo: 'LO3' }
    ];
  } else if (code === 'KIS') {
    return [
      { q: `Katika mada ya ${tName}, neno lipi ni nomino ya jamii (collective noun)?`, options: ['Kikosi cha wanajeshi','Mti mrefu','Haraka sana','Nyumba nyeupe'], correct: 0, lo: 'LO1' },
      { q: 'Kazi kuu ya kiambishi awali cha nafsi katika kitenzi cha Kiswahili ni ipi?', options: ['Kuonyesha mtendaji wa tendo (nafsi na umoja/wingi)','Kuonyesha mahali tendo lilipotendeka','Kuonyesha sifa ya kitu','Kubadili maana kuwa kinyume'], correct: 0, lo: 'LO2' },
      { q: 'Ni upi mfano sahihi wa kitendawili na jibu lake katika fasihi simulizi?', options: ['Popoo mbili zavuka mto — Macho','Maji marefu hayana ncha — Bahari','Nyumba yangu haina mlango — Mayai yote mawili','Mti wangu una majani saba — Wiki'], correct: 0, lo: 'LO3' }
    ];
  } else {
    return [
      { q: `What is the core principle of ${tName} in ${s[0]}?`, options: [`Systematic application of ${s[0]} concepts to solve real-world problems`,`Memorising definitions without practical application`,`Ignoring empirical evidence in analysis`,`Focusing only on theoretical definitions`], correct: 0, lo: 'LO1' },
      { q: `How is competency demonstrated in ${s[0]} according to NECTA outcomes?`, options: ['Through problem analysis, reasoning and evidence production','By copying textbooks without verification','By avoiding practice assessments','By guessing multiple choice options'], correct: 0, lo: 'LO2' },
      { q: `Which next step strengthens mastery in ${tName}?`, options: ['Guided practice followed by independent topic test','Skipping straight to the final term exam','Ignoring feedback from tutor and Rafiki','Only reading once without taking notes'], correct: 0, lo: 'LO3' }
    ];
  }
}
const platformStore=safeParse('tesea_platform_store', {"events":[],"announcements":[],"content":[],"assessments":[]});
function persistPlatform(){localStorage.setItem('tesea_platform_store',JSON.stringify(platformStore));}
function recordActivity(type,detail,actor=state.role){const ev={id:'EV-'+Date.now(),type,detail,actor,at:new Date().toISOString()};platformStore.events.unshift(ev);platformStore.events=platformStore.events.slice(0,40);persistPlatform();if(window.TESEA_FIREBASE)TESEA_FIREBASE.addEvent(ev);if(window.TESEA_API)TESEA_API.request('/events',{method:'POST',body:{type,detail,actor}}).catch(()=>{});}

function escapeActivityHtml(str){
  if(str===null||str===undefined)return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

function extractEventEmail(e){
  if(!e)return '';
  const d = String(e.detail || '').trim();
  const t = String(e.type || '').trim();
  const matchD = d.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i);
  if(matchD) return matchD[0].toLowerCase();
  const matchT = t.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i);
  if(matchT) return matchT[0].toLowerCase();
  if(isAuthOrLoginEvent(e) && d) return d.toLowerCase();
  return '';
}

function isAuthOrLoginEvent(e){
  if(!e)return false;
  const t=String(e.type||'').toLowerCase();
  const d=String(e.detail||'').toLowerCase();
  return t.includes('sign')||t.includes('login')||t.includes('log in')||t.includes('logged')||t.includes('oauth')||t.includes('google')||t.includes('microsoft')||t.includes('account')||t.includes('session')||t.includes('auth')||d.includes('@');
}

function groupPlatformEvents(events){
  if(!Array.isArray(events)||!events.length)return [];
  const authGroups={};
  events.forEach(e=>{
    const emailKey=extractEventEmail(e);
    if(emailKey){
      if(!authGroups[emailKey])authGroups[emailKey]=[];
      authGroups[emailKey].push(e);
    }
  });

  const seenAccounts=new Set();
  const result=[];

  events.forEach(e=>{
    const emailKey=extractEventEmail(e);
    if(emailKey){
      if(seenAccounts.has(emailKey))return;
      seenAccounts.add(emailKey);
      const groupList=authGroups[emailKey]||[e];
      if(groupList.length>1){
        const latestTime=groupList.reduce((max,x)=>(!max||new Date(x.at)>new Date(max)?x.at:max),groupList[0].at);
        result.push({
          isGroup:true,
          type:'Account sign-in',
          detail:emailKey,
          actor:groupList[0].actor||'learner',
          at:latestTime,
          count:groupList.length,
          subEvents:groupList
        });
      }else{
        result.push({...e,isGroup:false});
      }
    }else{
      result.push({...e,isGroup:false});
    }
  });

  return result;
}

function renderActivityItem(item){
  const actorClass=item.actor==='admin'?'warn':item.actor==='tutor'?'ok':item.actor==='crm'?'ok':'';
  const timeStr=item.at?new Date(item.at).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}):'';
  const dateStr=item.at?new Date(item.at).toLocaleDateString([],{month:'short',day:'numeric'}):'';

  if(item.isGroup){
    return `
      <details class="event-group-details" id="event-group-${escapeActivityHtml(String(item.detail).replace(/[^a-zA-Z0-9_-]/g,'_'))}">
        <summary class="event-group-summary" title="Click to expand/collapse ${item.count} login sessions">
          <span class="badge ${actorClass}">${escapeActivityHtml(item.actor)}</span>
          <div class="grow">
            <div class="event-headline">
              <strong>${escapeActivityHtml(item.type)}</strong>
              <span class="badge neutral session-count-badge">${item.count} sessions</span>
            </div>
            <small class="event-subtext">${escapeActivityHtml(item.detail)} • Latest: ${timeStr}${dateStr?` (${dateStr})`:''}</small>
          </div>
          <div class="expand-indicator">
            <small class="expand-text">Expand</small>
            <span class="expand-chevron">▾</span>
          </div>
        </summary>
        <div class="event-sub-records">
          <div class="event-sub-header">
            <small>Recorded sign-in activity for <strong>${escapeActivityHtml(item.detail)}</strong> (${item.count} sessions)</small>
          </div>
          ${item.subEvents.map((sub,idx)=>{
            const subTime=sub.at?new Date(sub.at).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'}):'';
            const subDate=sub.at?new Date(sub.at).toLocaleDateString([],{year:'numeric',month:'short',day:'numeric'}):'';
            return `
              <div class="event-sub-item">
                <span class="event-sub-bullet"></span>
                <div class="grow">
                  <strong>${escapeActivityHtml(sub.type)}</strong>
                  <small class="event-sub-meta">${escapeActivityHtml(sub.id||('EV-'+(idx+1)))} • Role: ${escapeActivityHtml(sub.actor||'learner')}</small>
                </div>
                <time class="event-sub-timestamp">${subDate?`${subDate} • `:''}${subTime}</time>
              </div>
            `;
          }).join('')}
        </div>
      </details>
    `;
  }

  return `
    <div class="list-row">
      <span class="badge ${actorClass}">${escapeActivityHtml(item.actor)}</span>
      <div class="grow">
        <strong>${escapeActivityHtml(item.type)}</strong>
        <small>${escapeActivityHtml(item.detail)}</small>
      </div>
      <small>${timeStr}</small>
    </div>
  `;
}

function integrationPanel(audience){
  const rawEvents=platformStore.events||[];
  const groupedItems=groupPlatformEvents(rawEvents);
  const displayItems=groupedItems.slice(0,5);
  return `<div class="section"><div class="section-head"><div><h2>Connected platform activity</h2><p>Learner, tutor and Super Admin workflows share one event pathway.</p></div><span class="badge neutral">${groupedItems.length} active (${rawEvents.length} events)</span></div><div class="card list">${displayItems.length?displayItems.map(renderActivityItem).join(''):'<div class="muted">Shared activity will appear here as learners submit work and tutors/admins publish updates.</div>'}</div></div>`;
}
const ROUTE_SCHEMA={
  public:['landing','signin','signup'],
  learner:['dashboard','subjects','course','path','lesson','assessments','assessment-practice','assessment-assignment','assessment-topic-test','assessment-exam','progress','community','rafiki','announcements','subscription'],
  tutor:['dashboard','classes','class-create','class-manage','class-assignments','content','content-text','content-video','content-audio','content-pdf','content-shorts','content-live','assessments','assessment-assignment','assessment-quiz','assessment-test','assessment-exam','live','live-studio','live-integrations','live-evidence','community','learner-insights','question-bank','question-bank-import','question-bank-ai','announcements'],
  admin:['dashboard','curriculum','users','subscriptions','community','question-bank','question-bank-import','question-bank-ai','announcements','content-governance','analytics','settings'],
  crm:['dashboard','leads','customers','schools','campaigns','newsletters','retention','automations','support','subscriptions','reports','analytics']
};
function validRoute(role,page){return ROUTE_SCHEMA.public.includes(page)||(ROUTE_SCHEMA[role]||[]).includes(page)}
function routeHash(role,page){if(page==='landing')return '';if(ROUTE_SCHEMA.public.includes(page))return '#/'+page;return '#/'+role+'/'+page}
function routePath(role,page){
  if(page==='landing')return '/';
  if(ROUTE_SCHEMA.public.includes(page))return '/app/'+page;
  return '/app/'+role+'/'+page;
}
function parseRoute(){
  const h=location.hash||'';
  if(h.startsWith('#/')){
    const parts=h.slice(2).split('/').filter(Boolean);
    if(parts.length===1&&ROUTE_SCHEMA.public.includes(parts[0]))return {page:parts[0],role:state.role};
    if(parts.length>=2&&ROUTE_SCHEMA[parts[0]]&&validRoute(parts[0],parts[1]))return {role:parts[0],page:parts[1]};
  }
  const parts=(location.pathname||'/').split('/').filter(Boolean);
  if(parts[0]==='app'){
    if(parts.length===2&&ROUTE_SCHEMA.public.includes(parts[1]))return {page:parts[1],role:state.role};
    const role=parts[1]==='super-admin'?'admin':parts[1];
    if(parts.length>=3&&ROUTE_SCHEMA[role]&&validRoute(role,parts[2]))return {role,page:parts[2]};
  }
  if(parts.length===1&&['learner','tutor','admin','super-admin','crm'].includes(parts[0])){
    const role=parts[0]==='super-admin'?'admin':parts[0];return {role,page:'dashboard'};
  }
  return null;
}
let routeSyncing=false;
function syncRoute(replace=true){
  const useClean=location.protocol==='http:'||location.protocol==='https:';
  const wanted=useClean?routePath(state.role,state.page):routeHash(state.role,state.page);
  const current=useClean?(location.pathname+location.search):(location.hash||'');
  if((useClean&&location.pathname===wanted)||(!useClean&&current===wanted)||(state.page==='landing'&&useClean&&location.pathname==='/'))return;
  routeSyncing=true;
  const target=useClean?wanted:(wanted||location.pathname+location.search);
  if(replace)history.replaceState({role:state.role,page:state.page},'',target);else history.pushState({role:state.role,page:state.page},'',target);
  queueMicrotask(()=>{routeSyncing=false});
}
function routeTo(page,opts={}){
  if(state.auth && (page==='signin'||page==='signup')){page='dashboard'}
  if(!validRoute(state.role,page)&&!ROUTE_SCHEMA.public.includes(page)){page='dashboard'}
  state.page=page;save();syncRoute(!!opts.replace);app({skipRouteSync:true});
}
function routeBack(){
  if(history.length>1){history.back();return}
  routeTo(state.auth?'dashboard':'landing',{replace:true});
}
function restoreRouteFromLocation(){
  if(routeSyncing)return;
  const r=parseRoute();
  if(!r){
    if(location.pathname==='/'&&!location.hash){state.page=state.auth?'dashboard':'landing';save();app({skipRouteSync:true});}
    return;
  }
  if(state.auth && (r.page==='signin'||r.page==='signup')){
    state.page='dashboard';
    save();
    app({skipRouteSync:true});
    return;
  }
  if(!isAdminAuth(state.auth)){
    state.role='learner';
    state.page=validRoute('learner', r.page) ? r.page : 'dashboard';
  } else {
    state.role=r.role||state.role;
    state.page=r.page;
  }
  save();
  app({skipRouteSync:true});
}
window.addEventListener('popstate',restoreRouteFromLocation);
window.addEventListener('hashchange',restoreRouteFromLocation);

const nav={learner:[['Learning',['dashboard','My learning'],['subjects','Subjects'],['path','Learning path'],['lesson','Current lesson'],['assessments','Assessments'],['progress','Progress']],['Support',['community','Community center'],['rafiki','Rafiki AI'],['announcements','Announcements'],['subscription','Subscription']]],tutor:[['Teaching',['dashboard','Dashboard'],['classes','Classes'],['content','Content studio'],['assessments','Assessment studio'],['live','Live lessons']],['Insights',['community','Community center'],['learner-insights','Learner insights'],['question-bank','Question bank'],['announcements','Announcements']]],admin:[['Platform',['dashboard','Dashboard'],['curriculum','Curriculum studio'],['users','Users & roles'],['subscriptions','Subscriptions'],['question-bank','Question bank']],['Operations',['community','Community moderation'],['announcements','Announcements'],['content-governance','Content governance'],['analytics','Analytics'],['settings','Platform settings']]],crm:[['CRM',['dashboard','Pipeline'],['leads','Leads'],['schools','Schools'],['campaigns','Campaigns'],['support','Support cases']],['Revenue',['subscriptions','Subscription ops'],['reports','Reports']]]};
function save(){
  localStorage.setItem('tesea_role',state.role);
  localStorage.setItem('tesea_page',state.page);
  localStorage.setItem('tesea_theme',state.theme);
  localStorage.setItem('tesea_progress',JSON.stringify(state.progress));
  localStorage.setItem('tesea_topic_progress',JSON.stringify(state.topicProgress));
  localStorage.setItem('tesea_lesson_progress',JSON.stringify(state.lessonProgress));
  localStorage.setItem('tesea_quiz_history',JSON.stringify(state.quizHistory));
  localStorage.setItem('tesea_evidence_ledger',JSON.stringify(state.evidenceLedger));
  localStorage.setItem('tesea_sub',JSON.stringify(state.subscription));
  localStorage.setItem('tesea_auth',JSON.stringify(state.auth));
  if(window.TESEA_FIREBASE && TESEA_FIREBASE.saveUserDataAndProgress){
    TESEA_FIREBASE.saveUserDataAndProgress(state);
  } else if(window.TESEA_FIREBASE && TESEA_FIREBASE.saveUserProgress){
    TESEA_FIREBASE.saveUserProgress(state.progress);
  }
}
function app(opts={}){
  if (!isAdminAuth(state.auth)) {
    state.role = 'learner';
  }
  if(state.auth && (state.page==='signin'||state.page==='signup')){
    state.page='dashboard';
  }
  if(!validRoute(state.role,state.page)){
    state.page=state.auth?'dashboard':'landing';
  }
  document.documentElement.dataset.theme=state.theme;
  const publicView=state.page==='landing'?landing():(state.page==='signin'||state.page==='signup'?authPage(state.page):null);
  document.querySelector('#app').innerHTML=publicView||shell();
  bind();
  if(!opts.skipRouteSync)syncRoute(true);
  updateDocumentMeta();
}
function updateDocumentMeta(){
  const titles={landing:'TESEA Academy | NECTA Competence-Based Learning',signin:'Sign in | TESEA Academy',signup:'Create account | TESEA Academy',subjects:'NECTA Subjects | TESEA Academy',subscription:'Subscription | TESEA Academy',community:'Community Center | TESEA Academy',curriculum:'Curriculum Studio | TESEA Academy',users:'Users & Roles | TESEA Academy',settings:'Platform Settings | TESEA Academy',dashboard:roleName(state.role)+' Dashboard | TESEA Academy'};
  document.title=titles[state.page]||((state.page||'TESEA').replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())+' | TESEA Academy');
  const noindex=!ROUTE_SCHEMA.public.includes(state.page);
  let robots=document.querySelector('meta[name=robots]');if(!robots){robots=document.createElement('meta');robots.name='robots';document.head.appendChild(robots)}robots.content=noindex?'noindex,nofollow':'index,follow,max-image-preview:large';
}
function shell(){
  const isAdmin = isAdminAuth(state.auth);
  const activeRole = isAdmin ? state.role : 'learner';
  const groups = nav[activeRole];
  const roleButton = isAdmin 
    ? `<button class="role-switch" data-action="roles" id="roleSwitchBtn" title="Switch workspace">${roleName(state.role)} ▾</button>`
    : `<button class="role-switch role-switch-locked" id="roleSwitchBtn" disabled title="Learner Account">${roleName('learner')}</button>`;

  return `<div class="app-shell"><header class="topbar"><button class="icon-btn mobile-menu" data-action="menu">☰</button><button class="icon-btn" data-action="back" title="Back">←</button><button class="brand brand-button" data-nav="landing"><img src="${assetPath('assets/tesea-logo.png')}" alt="TESEA Academy"></button><div class="search"><input id="globalSearch" placeholder="Search subjects, lessons, learners, questions…"></div><div class="top-actions"><button class="icon-btn" data-action="theme">${state.theme==='light'?'☾':'☀'}</button><button class="icon-btn" data-nav="announcements">◉</button>${roleButton}<button class="icon-btn" data-action="logout" title="Sign out">↪</button></div></header><div class="layout"><aside class="sidebar" id="sidebar"><div class="workspace"><small>Workspace</small><strong>${roleName(activeRole)}</strong></div>${groups.map(g=>`<div class="nav-group"><div class="nav-title">${g[0]}</div>${g.slice(1).map(x=>`<button class="nav-item ${state.page===x[0]?'active':''}" data-nav="${x[0]}">${icon(x[0])}<span>${x[1]}</span>${x[0]==='announcements'?'<span class="count">3</span>':''}</button>`).join('')}</div>`).join('')}<div class="nav-group"><div class="nav-title">Switch</div><button class="nav-item" data-nav="landing">⌂<span>Public website</span></button></div></aside><main class="main">${renderPage()}</main></div></div>`;
}
function landing(){
  const isLoggedIn = !!state.auth;
  const userName = state.auth?.name || state.auth?.email || 'Learner';

  const navCta = isLoggedIn
    ? `<button class="btn ghost" data-action="theme">${state.theme==='light'?'Dark':'Light'} mode</button><button class="btn primary" data-nav="dashboard">Open Workspace (${userName})</button><button class="btn ghost" data-action="logout" title="Sign out">Sign out</button>`
    : `<button class="btn ghost" data-action="theme">${state.theme==='light'?'Dark':'Light'} mode</button><button class="btn" data-nav="signin">Sign in</button><button class="btn primary" data-nav="signup">Get started</button>`;

  const heroActions = isLoggedIn
    ? `<button class="btn primary lg" data-nav="dashboard">Continue learning</button><button class="btn lg" data-nav="subjects">Explore subjects</button>`
    : `<button class="btn primary lg" data-nav="signup">Start learning</button><button class="btn lg" data-action="explore-demo">View learner demo</button>`;

  const accessBox = isLoggedIn
    ? `<div><span class="badge ok">Signed in as ${userName}</span><h2>Welcome back to TESEA Academy</h2><p>You are logged into your learner account. Return to your active lessons and progress evidence.</p></div><div class="actions"><button class="btn primary lg" data-nav="dashboard">Open Workspace</button><button class="btn ghost" data-action="logout">Sign out</button></div>`
    : `<div><span class="badge">Start free</span><h2>Create your TESEA learner account.</h2><p>Use email, Google or Microsoft. Social sign-in is API-ready and switches to live OAuth when provider credentials are configured.</p></div><div class="actions"><button class="btn" data-nav="signin">I already have an account</button><button class="btn primary" data-nav="signup">Create account</button></div>`;

  const footerAction = isLoggedIn
    ? `<button class="link-btn" data-nav="dashboard">Go to Workspace</button>`
    : `<button class="link-btn" data-nav="signin">Sign in</button>`;

  return `<div class="landing"><nav class="landing-nav landing-box"><button class="brand-button" data-nav="landing"><img src="${assetPath('assets/tesea-logo.png')}" alt="TESEA Academy"></button><div class="links"><a href="#learning-path">Learning path</a><a href="#subjects">Subjects</a><a href="#access">Access</a></div><div class="nav-cta">${navCta}</div></nav><main class="landing-main"><section class="hero hero-box"><div class="hero-copy"><span class="badge">New NECTA syllabus • Forms 1–6</span><h1>One clear learning path from lesson to demonstrated competence.</h1><p>TESEA Academy combines focused lessons, guided practice, assignments, mastery checks and tutor intervention in one low-distraction competence-based learning environment.</p><div class="actions hero-actions">${heroActions}</div><div class="hero-proof"><span><strong>27</strong> subject pathways</span><span><strong>6</strong> lesson formats</span><span><strong>1</strong> mastery profile</span></div></div><div class="hero-visual" id="learning-path"><div class="eyebrow">TESEA competence cycle</div>${['Diagnose','Learn','Practice','Apply','Check mastery','Relearn gaps','Demonstrate'].map((x,i)=>`<div class="path-line ${i<3?'done':''}"><span>${i+1}</span><div><strong>${x}</strong><small>${['Find prior knowledge gaps','Learn one outcome at a time','Get immediate guided feedback','Complete assignment or practical evidence','Attempt an independent checkpoint','Target weak outcomes with Rafiki AI','Unlock the next competency'][i]}</small></div></div>`).join('')}</div></section><section class="landing-section" id="subjects"><div class="section-intro"><div><div class="eyebrow">Curriculum</div><h2>Built around outcomes, not a content feed.</h2></div><p>Each subject moves from overview → topic → sub-topic → lesson → practice → assessment → mastery evidence.</p></div><div class="subject-strip">${SUBJECTS.slice(0,9).map(s=>`<button data-action="subject-preview" data-code="${s[1]}"><span>${s[1]}</span><strong>${s[0]}</strong></button>`).join('')}</div><div class="actions"><button class="btn" data-action="all-subjects">Explore all 27 subjects</button></div></section><section class="landing-section compact-benefits"><div><div class="eyebrow">Focused learning</div><h2>Less interface. More learning signal.</h2></div><div class="benefit-row"><div><strong>Learn in the right format</strong><p>Interactive text, video, audio, PDF notes, shorts and live lessons share the same outcome and progress state.</p></div><div><strong>Know what to do next</strong><p>Progression is driven by evidence, not by scrolling through cards.</p></div><div><strong>Get intervention at the right time</strong><p>Rafiki AI, tutors and administrators work from the same mastery and assessment events.</p></div></div></section><section class="access-box" id="access">${accessBox}</section></main><footer class="landing-footer"><span>TESEA Academy • NECTA competence-based learning</span>${footerAction}</footer></div>`;
}
function authPage(mode){
  if(state.auth){
    state.page='dashboard';
    save();
    return learnerDashboard();
  }
  const signup=mode==='signup';
  return `<div class="auth-screen"><div class="auth-top"><button class="brand-button" data-nav="landing"><img src="${assetPath('assets/tesea-logo.png')}" alt="TESEA Academy"></button><button class="btn" data-nav="landing">Back to website</button></div><div class="auth-wrap"><section class="auth-panel"><div class="eyebrow">${signup?'Create learner account':'Welcome back'}</div><h1>${signup?'Start your competence journey.':'Continue learning.'}</h1><p>${signup?'Create one account for lessons, assessments, Rafiki AI and your mastery record.':'Sign in to resume your current learning step and progress evidence.'}</p><div class="social-auth"><button class="oauth-btn" data-action="oauth-google"><span class="oauth-mark">G</span>Continue with Google</button><button class="oauth-btn" data-action="oauth-microsoft"><span class="oauth-mark ms">M</span>Continue with Microsoft</button></div><div class="divider"><span>or use email</span></div>${signup?'<div class="field"><label>Full name</label><input id="authName" autocomplete="name" placeholder="Your full name"></div>':''}<div class="field"><label>Email address</label><input id="authEmail" type="email" autocomplete="email" placeholder="you@example.com"></div><div class="field"><label>Password</label><input id="authPassword" type="password" autocomplete="current-password" placeholder="Minimum 6 characters"></div>${signup?'<div class="field"><label>Current form</label><select id="authForm"><option>Form 1</option><option>Form 2</option><option selected>Form 3</option><option>Form 4</option><option>Form 5</option><option>Form 6</option></select></div>':'<div style="text-align:right;margin-top:-6px;margin-bottom:10px"><button class="link-btn" style="font-size:13px;opacity:0.8" data-action="auth-reset-password">Forgot password?</button></div>'}<button class="btn primary auth-submit" data-action="${signup?'signup-submit':'signin-submit'}">${signup?'Create account':'Sign in'}</button><p class="auth-switch">${signup?'Already registered?':'New to TESEA?'} <button class="link-btn" data-nav="${signup?'signin':'signup'}">${signup?'Sign in':'Create account'}</button></p><small class="muted" style="display:flex;align-items:center;gap:6px;margin-top:14px"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10b981"></span> Live Firebase Authentication (TESEA Academy)</small></section><aside class="auth-aside"><span class="badge">TESEA learning path</span><h2>Sign in to a specific next action.</h2>${['Resume current lesson','See mastery evidence','Complete assigned practice','Receive tutor intervention'].map((x,i)=>`<div class="auth-benefit"><span>${i+1}</span><strong>${x}</strong></div>`).join('')}</aside></div></div>`;
}
function renderPage(){if(state.page==='landing')return landing();if(state.page==='signin')return authPage('signin');if(state.page==='signup')return authPage('signup');const r=state.role,p=state.page;if(r==='learner')return learnerPage(p);if(r==='tutor')return tutorPage(p);if(r==='admin')return adminPage(p);return crmPage(p)}
function learnerPage(p){if(p==='dashboard')return learnerDashboard();if(p==='subjects')return subjectsPage();if(p==='course')return coursePage();if(p==='path')return learningPath();if(p==='lesson')return lessonPage();if(p==='assessments')return assessmentsPage();if(p==='assessment-practice')return learnerAssessmentWorkspace('practice');if(p==='assessment-assignment')return learnerAssessmentWorkspace('assignment');if(p==='assessment-topic-test')return learnerAssessmentWorkspace('test');if(p==='assessment-exam')return learnerAssessmentWorkspace('exam');if(p==='progress')return progressPage();if(p==='community')return communityCenter('learner');if(p==='rafiki')return rafikiPage();if(p==='announcements')return announcementsPage();if(p==='subscription')return subscriptionPage();return learnerDashboard()}
function head(e,t,d,a=''){return `<div class="page-head"><div><div class="eyebrow">${e}</div><h1>${t}</h1><p>${d}</p></div><div class="actions">${a}</div></div>`}
function learnerDashboard(){
  const overall = calculateOverallMastery();
  const count = calculateCompetenciesDemonstrated();
  const needs = calculateCompetenciesToReinforce();
  const name = state.auth?.name || 'Learner';
  const greeting = new Date().getHours()<12?'Good morning':(new Date().getHours()<17?'Good afternoon':'Good evening');
  
  const action = overall > 0 ? {
    title: 'Continue your competence journey',
    desc: `Your current overall mastery is ${overall}% demonstrated across ${count} mastered subjects. Keep building evidence to achieve mastery across all 27 NECTA subjects.`,
    btn: 'Continue learning',
    nav: 'lesson'
  } : {
    title: 'Begin your learning journey',
    desc: 'You haven\'t started any subjects yet. Explore the curriculum to begin building your competency evidence.',
    btn: 'Explore subjects',
    nav: 'subjects'
  };

  const recentList = (state.quizHistory && state.quizHistory.length) ? state.quizHistory.slice(0, 4) : [];

  return head('Learner workspace', `${greeting}, ${name}`, 'Your next action is chosen from competency evidence, not from a crowded content feed.', `<button class="btn" data-nav="progress">View progress</button><button class="btn primary" data-nav="${action.nav}">${action.btn}</button>`) + 
  `<div class="card" style="border-left:4px solid var(--b)"><div class="grid2"><div><span class="badge">Next best action</span><h2 style="margin:9px 0 5px">${action.title}</h2><p>${action.desc}</p><div class="actions" style="margin-top:14px"><button class="btn primary" data-nav="${action.nav}">${action.btn}</button></div></div><div><div class="progress"><span style="width:${overall}%"></span></div><div class="progress-meta"><span>Competency mastery</span><strong>${overall}%</strong></div></div></div></div>
  <div class="section"><div class="kpis"><div class="kpi"><strong>${overall}%</strong><span>Overall mastery</span></div><div class="kpi"><strong>${count}</strong><span>Competencies demonstrated</span></div><div class="kpi"><strong>${needs}</strong><span>In progress / reinforce</span></div><div class="kpi"><strong>${recentList.length}</strong><span>Submissions recorded</span></div></div></div>
  <div class="section grid2">
    <div>
      <div class="section-head"><div><h2>Continue learning</h2><p>Adaptive subject progress</p></div><button class="btn sm" data-nav="subjects">All 27 subjects</button></div>
      <div class="card list">
        ${SUBJECTS.slice(0,6).map(s=>{
          const m = getSubjectMastery(s[1]);
          return `<div class="list-row"><div class="grow"><strong>${s[0]}</strong><small>${s[2]}</small></div><div class="progress sm" style="width:80px"><span style="width:${m}%"></span></div><button class="btn sm" data-subject="${s[1]}">${m>0?'Continue':'Start'}</button></div>`;
        }).join('')}
      </div>
    </div>
    <div class="card">
      <div class="section-head"><div><h2>Recent evidence</h2><p>Your latest assessment submissions</p></div></div>
      ${recentList.length ? `<div class="list">${recentList.map(h=>`<div class="list-row"><div class="grow"><strong>${h.title || h.subject}</strong><small>${h.detail || 'Practice checkpoint'}</small></div><span class="badge ${h.score>=80?'ok':h.score>=60?'warn':'bad'}">${h.score}%</span></div>`).join('')}</div>` : '<div class="muted" style="padding: 20px; text-align: center">No assessment evidence recorded yet. Complete a topic quiz or lesson check to see adaptive evidence here.</div>'}
    </div>
  </div>`;
}
function subjectMini(code){
  const s=SUBJECTS.find(x=>x[1]===code)||SUBJECTS[0];
  const pr=getSubjectMastery(code);
  return `<div class="card click" data-subject="${code}"><div class="subject-icon">${code}</div><h3>${s[0]}</h3><p>${s[2]}</p><div class="progress" style="margin-top:14px"><span style="width:${pr}%"></span></div><div class="progress-meta"><span>Mastery</span><strong>${pr}%</strong></div></div>`;
}
function subjectsPage(){
  return head('Curriculum','27 NECTA competence subjects','Browse by subject. Each course is organised around competencies, learning outcomes, evidence and mastery checkpoints.',`<select id="formFilter" class="btn"><option>Form 1</option><option>Form 2</option><option selected>Form 3</option><option>Form 4</option><option>Form 5</option><option>Form 6</option></select>`)+
  `<div class="subject-grid">${SUBJECTS.map((s)=>{
    const m = getSubjectMastery(s[1]);
    const completedTopics = getCompletedTopicsCount(s[1]);
    const totalTopics = (TOPICS[s[1]] || []).length;
    return `<div class="subject-card" data-subject="${s[1]}">
      <div class="subject-icon">${s[1]}</div>
      <h3>${s[0]}</h3>
      <p>${s[2]}</p>
      <div class="progress"><span style="width:${m}%"></span></div>
      <div class="progress-meta"><span>${completedTopics}/${totalTopics} topics</span><strong>${m}%</strong></div>
    </div>`;
  }).join('')}</div>`;
}
function coursePage(){
  const s=SUBJECTS.find(x=>x[1]===state.subject)||SUBJECTS[0];
  const topics=TOPICS[state.subject]||['Foundations','Core concepts','Applied knowledge','Practical work','Project and inquiry','Revision and assessment'];
  const m = getSubjectMastery(state.subject);
  return head('Course overview',`Form 3 ${s[0]}`,s[2],`<button class="btn" data-nav="subjects">Back to subjects</button><button class="btn primary" data-nav="path">Open learning path</button>`)+
  `<div class="grid2"><div><div class="card"><span class="badge">Course overview</span><h2>Purpose</h2><p>This course develops knowledge, skills, values and application through short learning cycles: concept → practice → evidence → feedback → mastery.</p><h3 style="margin-top:20px">Learning outcomes</h3><ul><li>Explain core concepts in ${s[0]} using appropriate subject language.</li><li>Apply knowledge to familiar and unfamiliar situations.</li><li>Use evidence, procedures and reasoning to solve problems.</li><li>Demonstrate competence through assignments, practical tasks and assessments.</li></ul></div><div class="section"><div class="section-head"><div><h2>Topics and sub-topics</h2><p>Each topic unlocks after the required prerequisite evidence.</p></div></div><div class="list">${topics.map((t,i)=>{
    const isDone = (state.topicProgress[state.subject] && state.topicProgress[state.subject].includes(i));
    const isCurrent = i === state.topic;
    return `<div class="card click" data-topic="${i}"><div class="list-row"><span class="step-dot ${isDone?'done':isCurrent?'current':''}">${isDone?'✓':i+1}</span><div class="grow"><strong>${t}</strong><small>${['Concept introduction','Guided worked examples','Interactive practice','Assignment / practical evidence','Mastery checkpoint'].slice(0,3+(i%3)).join(' • ')}</small></div><span class="badge ${isDone?'ok':isCurrent?'':'neutral'}">${isDone?'Mastered':isCurrent?'In progress':'Available'}</span></div></div>`;
  }).join('')}</div></div></div><div><div class="card"><h3>Course progress</h3><div style="font-size:40px;font-weight:850">${m}%</div><div class="progress"><span style="width:${m}%"></span></div><div class="progress-meta"><span>Demonstrated mastery</span><span>Target 80%</span></div><hr style="border:0;border-top:1px solid var(--line);margin:18px 0"><h3>Evidence mix</h3><div class="list"><div class="list-row"><div class="grow"><strong>Lesson checks</strong><small>Continuous</small></div><span>${Math.min(100, Math.round(m * 0.35))}%</span></div><div class="list-row"><div class="grow"><strong>Assignments / practical</strong><small>Applied competence</small></div><span>${Math.min(100, Math.round(m * 0.45))}%</span></div><div class="list-row"><div class="grow"><strong>Tests and exams</strong><small>Independent demonstration</small></div><span>${m}%</span></div></div></div></div></div>`;
}
function learningPath(){
  const s=SUBJECTS.find(x=>x[1]===state.subject)||SUBJECTS[0];
  const topics=TOPICS[state.subject]||['Foundations'];
  const tName=topics[state.topic]||topics[0];
  const comp=getLessonCompletion(state.subject, state.topic);
  const m=getSubjectMastery(state.subject);

  return head('Competence pathway',`TESEA learning path • ${s[0]}`,`Active topic: ${tName}. A learner advances when evidence shows sufficient competence.`, `<button class="btn primary" data-nav="lesson">Continue lesson</button>`)+
  `<div class="grid2"><div class="card"><div class="path">${[['Baseline diagnostic','Identify prior knowledge and misconceptions',comp>0?'done':'current'],['Concept learning','Interactive text + video explanation',comp>=50?'done':comp>0?'current':''],['Guided practice','Hints, worked examples and immediate feedback',m>=40?'done':comp>=50?'current':''],['Application task','Assignment / practical evidence',m>=60?'done':m>=40?'current':''],['Mastery checkpoint','Independent quiz or topic test',m>=80?'done':m>=60?'current':''],['Targeted relearning','Rafiki AI remediates weak outcomes',''],['Competency demonstrated','Progress recorded and next topic unlocked',m>=80?'done':'']].map((x,i)=>`<div class="path-step"><div class="step-dot ${x[2]}">${x[2]==='done'?'✓':i+1}</div><div><strong>${x[0]}</strong><div class="muted">${x[1]}</div></div><span class="badge ${x[2]==='done'?'ok':x[2]==='current'?'':'neutral'}">${x[2]==='done'?'Complete':x[2]==='current'?'Current':'Upcoming'}</span></div>`).join('')}</div></div><div class="card"><h3>Mastery rules</h3><p>TESEA separates learning activity from competence evidence.</p><div class="list" style="margin-top:12px"><div class="list-row"><div class="grow"><strong>Green ≥ 80%</strong><small>Competency demonstrated</small></div></div><div class="list-row"><div class="grow"><strong>Amber 60–79%</strong><small>Reinforce before progression</small></div></div><div class="list-row"><div class="grow"><strong>Red &lt; 60%</strong><small>Targeted relearning required</small></div></div></div><button class="btn soft" data-nav="rafiki" style="width:100%;margin-top:14px">Ask Rafiki to explain my gaps</button></div></div>`;
}
function lessonPage(){
  const s=SUBJECTS.find(x=>x[1]===state.subject)||SUBJECTS[0];
  const topics=TOPICS[state.subject]||['Foundations'];
  const tName=topics[state.topic]||topics[0];
  const modes=[['text','Interactive text'],['video','Video'],['audio','Audio'],['pdf','PDF notes'],['shorts','Shorts'],['live','Live lesson']];
  return head(`${s[0]} • ${tName}`,`Competence Lesson: ${tName}`,`Outcome: Explain core principles of ${tName} and demonstrate mastery through practice.`,`<button class="btn" data-nav="path">Learning path</button><button class="btn primary" data-nav="assessments">Practice</button>`)+`<div class="tabs">${modes.map(m=>`<button class="tab ${state.lessonMode===m[0]?'active':''}" data-mode="${m[0]}">${m[1]}</button>`).join('')}</div>${lessonModeContent()}`;
}
function lessonModeContent(){
  const s=SUBJECTS.find(x=>x[1]===state.subject)||SUBJECTS[0];
  const topics=TOPICS[state.subject]||['Foundations'];
  const tName=topics[state.topic]||topics[0];
  const comp=getLessonCompletion(state.subject, state.topic);
  const m=getSubjectMastery(state.subject);

  const side=`<aside class="lesson-aside">
    <div class="card">
      <h3>Lesson progress</h3>
      <div class="progress"><span style="width:${comp}%"></span></div>
      <div class="progress-meta"><span>Completed</span><strong>${comp}%</strong></div>
    </div>
    <div class="card">
      <h3>Learning outcomes</h3>
      <div class="list">
        <div class="list-row"><span class="badge ${comp>30?'ok':''}">${comp>30?'✓':'1'}</span><div class="grow">Define core principles of ${tName}</div></div>
        <div class="list-row"><span class="badge ${comp>60?'ok':''}">${comp>60?'✓':'2'}</span><div class="grow">Apply ${s[0]} concepts to problem solving</div></div>
        <div class="list-row"><span class="badge ${m>=80?'ok':'neutral'}">${m>=80?'✓':'3'}</span><div class="grow">Demonstrate independent competence in assessment</div></div>
      </div>
    </div>
    <div class="card">
      <h3>Next evidence</h3>
      <p>Outcome-mapped guided practice checkpoint.</p>
      <button class="btn primary" data-nav="assessment-practice" style="width:100%;margin-top:12px">Start practice</button>
    </div>
  </aside>`;

  if(state.lessonMode==='video')return `<div class="lesson-shell"><div><div class="media-stage"><button class="play" data-action="play">▶</button><div style="position:absolute;left:20px;bottom:18px"><strong>${tName} Masterclass</strong><div style="opacity:.75">09:15 • English + Kiswahili captions</div></div></div><div class="card" style="margin-top:14px"><h3>Chapters</h3>${[`Introduction to ${tName}`,`Core concepts and formulas`,`Worked NECTA examples`,`Summary and review`].map((x,i)=>`<div class="list-row"><span>${i+1}</span><div class="grow"><strong>${x}</strong></div><span>${['00:00','02:30','05:15','07:45'][i]}</span></div>`).join('')}</div></div>${side}</div>`;
  
  if(state.lessonMode==='audio')return `<div class="lesson-shell"><div><div class="audio-stage"><span class="badge" style="background:#fff;color:#111">Audio lesson</span><h1>${tName}: Audio Study</h1><p style="color:#f1dce3">10 min • Downloadable for offline study</p><div class="wave">${Array.from({length:70},(_,i)=>`<i style="height:${18+(i*17)%62}px"></i>`).join('')}</div><button class="btn" data-action="play">▶ Play / pause</button></div><div class="card" style="margin-top:14px"><h3>Audio checkpoints</h3>${[`Pause and define ${tName}`,`Recall key terminology aloud`,`Apply concepts to sample questions`].map((x,i)=>`<div class="list-row"><span class="badge">${i+1}</span><div class="grow"><strong>${x}</strong></div></div>`).join('')}</div></div>${side}</div>`;
  
  if(state.lessonMode==='pdf')return `<div class="lesson-shell"><div class="pdf-stage"><div class="paper"><div class="eyebrow">TESEA ${s[0]} Notes</div><h1>${s[0]}: ${tName}</h1><p><strong>Learning outcome:</strong> Master the core definitions, processes, and applications of ${tName}.</p><h2>Summary Notes</h2><p>This module covers key competencies required under the NECTA Form 1–6 curriculum for <strong>${s[0]}</strong>.</p><ol><li>Understand the fundamental definitions and principles of ${tName}.</li><li>Apply scientific, analytical, or practical methodologies to solve structured problems.</li><li>Demonstrate mastery through guided and independent assessments.</li></ol><h2>Competence check</h2><p>Can you summarize the primary takeaway of ${tName} in your own words?</p></div></div>${side}</div>`;
  
  if(state.lessonMode==='shorts')return `<div class="lesson-shell"><div class="short-stage"><div><span class="badge" style="background:white;color:#111">Short #01</span><h1>${tName} in 60 seconds</h1><p style="color:#eee">Key takeaway: Master the core concept of ${tName} in ${s[0]} with this bite-sized video clip.</p><button class="btn" data-action="short-next">Next short</button></div></div>${side}</div>`;
  
  if(state.lessonMode==='live')return `<div class="lesson-shell"><div><div class="live-stage"><div style="text-align:center"><div style="width:84px;height:84px;border-radius:50%;background:var(--b);display:grid;place-items:center;margin:auto;font-weight:900;font-size:28px">${s[1]}</div><h2>Live ${s[0]} Interactive Class</h2><p style="color:#ddd">Tutor Thomas • 28 learners joined</p><span class="badge bad">● LIVE</span><div class="actions" style="justify-content:center;margin-top:18px"><button class="btn" data-action="mic">🎙 Mic</button><button class="btn" data-action="hand">✋ Raise hand</button><button class="btn danger" data-action="leave-live">Leave</button></div></div></div><div class="card" style="margin-top:14px"><h3>Live agenda</h3><div class="list-row"><span class="badge ok">Done</span><div class="grow"><strong>${tName} overview</strong></div></div><div class="list-row"><span class="badge">Now</span><div class="grow"><strong>Worked exam examples</strong></div></div><div class="list-row"><span class="badge neutral">Next</span><div class="grow"><strong>Student Q&A + Live quiz</strong></div></div></div></div>${side}</div>`;
  
  return `<div class="lesson-shell"><article class="lesson-reader"><span class="badge">Interactive text lesson</span><h1>Understanding ${tName}</h1><p>Welcome to <strong>${tName}</strong> in <strong>${s[0]}</strong>. This competence-based lesson provides foundational concepts, real-world applications, and worked examples to build verified academic evidence.</p><h2>1. Foundational Concept</h2><p>In ${s[0]}, <strong>${tName}</strong> forms a critical pillar of knowledge. Understanding its underlying mechanics allows you to analyze problems methodically and link theoretical concepts with practical phenomena.</p><div class="callout"><strong>Reflection question:</strong><br>How does the study of ${tName} connect to everyday problem-solving and broader ${s[0]} principles?</div><h2>2. Key Principles and Steps</h2><ol><li>Identify the fundamental components and definitions relevant to ${tName}.</li><li>Analyze the relationship between theoretical models and observed data in ${s[0]}.</li><li>Apply established formulas or methods to solve structured and unstructured problems.</li></ol><h2>3. Examination Application</h2><p>When answering NECTA examination questions regarding ${tName}, ensure that you clearly state key definitions, show step-by-step working or reasoning, and reference appropriate subject terminology.</p><div class="actions"><button class="btn" data-action="save-note">Save note</button><button class="btn primary" data-nav="assessment-practice">Check understanding</button></div></article>${side}</div>`;
}
function assessmentsPage(){
  const s=SUBJECTS.find(x=>x[1]===state.subject)||SUBJECTS[0];
  const topics=TOPICS[state.subject]||['Foundations'];
  const tName=topics[state.topic]||topics[0];
  const m=getSubjectMastery(state.subject);
  const decision=m>=80?{badge:'ok',label:'Demonstrated',desc:`You have demonstrated solid competence in ${tName}. Advance to the next topic or maintain readiness.`}:m>=60?{badge:'warn',label:'Reinforce',desc:`${tName} requires one more independent evidence point to reach the 80% mastery target.`}:{badge:'bad',label:'Relearn',desc:`Initial evidence indicates foundational gaps in ${tName}. Review interactive lessons and complete guided practice.`};
  
  const cards=[
    ['assessment-practice','Guided practice','12 min','Formative','Immediate feedback, hints and retries',`${s[1]}-F3-${state.topic+1}`,`${Math.max(m, 0)}%`,'Continue practice'],
    ['assessment-assignment','Assignment','Due next week','Applied evidence','Submit written, image, PDF or project evidence',`${s[1]}-F3-APP`,m>=60?'Submitted':'Open assignment','Open assignment'],
    ['assessment-topic-test','Topic test','25 min','Independent evidence',`Timed checkpoint covering all ${tName} outcomes`,`${s[1]}-F3-TEST`,m>=80?'Completed':'Scheduled','Open topic test'],
    ['assessment-exam','Exam','2 h','Summative evidence','NECTA-style sections with controlled attempt rules',`${s[1]}-F3-EXAM`,'Upcoming','View exam']
  ];
  
  const subjectQuizzes = (state.quizHistory || []).filter(q => q.subject === state.subject);
  const ledgerItems = subjectQuizzes.map(q => ({
    title: `${q.topic || tName} Checkpoint`,
    lo: `LO Checkpoint • Score ${q.score}% (${q.correct}/${q.total})`,
    score: `${q.score}%`,
    status: q.score >= 80 ? 'Advance' : q.score >= 60 ? 'Reinforce' : 'Relearn'
  }));

  return head('Assessment evidence',`${s[0]} • Practice, assignments & tests`,'Every attempt is mapped to learning outcomes. Evidence determines whether the learner advances, reinforces or relearns.',`<button class="btn" data-action="assessment-history">Evidence history</button><button class="btn soft" data-nav="progress">View mastery profile</button>`)+
  `<section class="evidence-decision card"><div><span class="badge ${decision.badge}">Current decision • ${decision.label}</span><h2>${decision.desc}</h2><p>Lesson completion is ${getLessonCompletion(state.subject, state.topic)}%, and subject mastery is ${m}%. Target is ≥80% for mastery advancement.</p></div><div class="decision-meter"><strong>${m}%</strong><span>Outcome mastery</span><div class="progress"><span style="width:${m}%"></span></div><small>Advance ≥ 80% • Reinforce 60–79% • Relearn &lt; 60%</small></div></section>`+
  `<div class="assessment-path-grid">${cards.map((c,i)=>`<article class="assessment-path-card"><div class="assessment-path-top"><span class="badge ${i===1?'warn':i===0?'':'neutral'}">${c[3]}</span><span class="muted">${c[2]}</span></div><h2>${c[1]}</h2><p>${c[4]}</p><div class="evidence-map"><small>Mapped outcomes</small><strong>${c[5]}</strong></div><div class="assessment-status"><span>${c[6]}</span><div class="progress"><span style="width:${m}%"></span></div></div><button class="btn ${i===0?'primary':''}" data-nav="${c[0]}">${c[7]}</button></article>`).join('')}</div>`+
  `<section class="section grid2"><div class="card"><div class="eyebrow">Evidence ledger</div><h3>How evidence changes the learning path</h3><div class="evidence-ledger">${ledgerItems.length ? ledgerItems.map(x=>`<div><span><strong>${x.title}</strong><small>${x.lo}</small></span><b>${x.score}</b><span class="badge ${x.status==='Advance'?'ok':x.status==='Relearn'?'bad':'warn'}">${x.status}</span></div>`).join('') : '<p class="muted" style="padding:20px 0">No assessment checkpoints attempted yet. Complete guided practice or quizzes to record evidence.</p>'}</div></div><div class="card"><div class="eyebrow">Rafiki evidence coach</div><h3>Recommended next action</h3><p>Review the active outcomes for ${s[0]} (${tName}), then complete the practice quiz to build verified evidence.</p><div class="actions"><button class="btn soft" data-nav="rafiki">Generate warm-up</button><button class="btn primary" data-nav="assessment-practice">Start practice</button></div></div></section>`;
}
function learnerAssessmentWorkspace(type){
  const s=SUBJECTS.find(x=>x[1]===state.subject)||SUBJECTS[0];
  const topics=TOPICS[state.subject]||['Foundations'];
  const tName=topics[state.topic]||topics[0];
  const m=getSubjectMastery(state.subject);
  
  const meta={
    practice:{title:`Guided practice • ${tName}`,eyebrow:'Formative practice',desc:'Low-stakes practice with immediate feedback. Results inform recommendations and adaptively update your mastery evidence.',duration:'12 min',button:'Submit practice',status:'In progress'},
    assignment:{title:`Assignment • ${tName} Evidence`,eyebrow:'Applied assignment',desc:`Demonstrate the outcome through explanation, application and submitted evidence in ${s[0]}.`,duration:'Due next week',button:'Submit assignment',status:'Draft'},
    test:{title:`${tName} Topic Test`,eyebrow:'Independent checkpoint',desc:`A timed topic-level assessment for ${s[0]}. Questions are sampled from the outcome-mapped bank.`,duration:'25 min • 30 marks',button:'Start timed test',status:'Ready'},
    exam:{title:`Form 3 ${s[0]} Term Examination`,eyebrow:'Summative examination',desc:`NECTA-style examination evidence across the term syllabus for ${s[0]}.`,duration:'2 hours • 100 marks',button:'Start exam',status:'Opens soon'}
  }[type] || {title:'Assessment',eyebrow:'Assessment',desc:'',duration:'',button:'Submit',status:'Open'};
  
  const outcomes=[
    ['LO1',`Demonstrate foundational understanding of ${tName}`,Math.max(40, Math.min(100, m + 10))],
    ['LO2',`Apply ${s[0]} principles to analytical scenarios`,m],
    ['LO3',`Evaluate outcomes and problem solutions`,Math.max(20, m - 10)]
  ];
  
  const evidence=`<aside class="learner-evidence-aside"><div class="card"><span class="badge">Evidence map</span><h3>Current outcome position</h3>${outcomes.map(o=>`<div class="outcome-evidence"><div><strong>${o[0]}</strong><small>${o[1]}</small></div><b>${o[2]}%</b><div class="progress"><span style="width:${o[2]}%"></span></div></div>`).join('')}</div><div class="card"><h3>Decision rule</h3><div class="decision-rule"><span class="ok-dot"></span><div><strong>80–100%</strong><small>Advance / demonstrated</small></div></div><div class="decision-rule"><span class="warn-dot"></span><div><strong>60–79%</strong><small>Reinforce</small></div></div><div class="decision-rule"><span class="bad-dot"></span><div><strong>Below 60%</strong><small>Relearn before progression</small></div></div></div><div class="card"><h3>Need support?</h3><p>Rafiki can explain the outcome, generate a warm-up or review feedback without completing the graded task for you.</p><button class="btn soft" data-nav="rafiki" style="width:100%">Ask Rafiki</button></div></aside>`;
  
  let body='';
  if(type==='assignment') {
    body=`<section class="assessment-work-card"><div class="assignment-brief"><span class="badge warn">Applied evidence • 20 marks</span><h2>Explain and apply ${tName}</h2><p>Use real-life examples in ${s[0]} to explain the principles of ${tName}. Add your reasoned explanation, steps and evaluation.</p></div><div class="rubric-strip">${[['Subject accuracy','8'],['Application','6'],['Reasoning','4'],['Clarity','2']].map(x=>`<div><strong>${x[1]}</strong><span>${x[0]}</span></div>`).join('')}</div><div class="field"><label>Your response</label><textarea id="assignmentResponse" rows="10" placeholder="Write your evidence response here…"></textarea></div><div class="upload-zone"><strong>Add supporting evidence</strong><p>PDF, DOCX, image, spreadsheet or short audio/video evidence • max 50 MB</p><input id="assignmentFile" type="file" multiple><small>Uploaded evidence contributes directly to your outcome profile.</small></div><div class="integrity-note"><strong>Assessment integrity</strong><span>Rafiki can explain concepts and feedback criteria, but cannot generate a final submission for this graded assignment.</span></div></section>`;
  } else if(type==='test'||type==='exam') {
    body=`<section class="assessment-work-card"><div class="secure-assessment-head"><div><span class="badge ${type==='exam'?'bad':'warn'}">${type==='exam'?'Summative':'Independent'} evidence</span><h2>${type==='exam'?'Examination readiness':'Topic checkpoint'}</h2><p>${type==='exam'?'Sections A, B and C • autosave enabled • one final submission':'Questions sampled by outcome coverage • timer begins when you start'}</p></div><div class="timer-card"><strong>${type==='exam'?'02:00:00':'00:25:00'}</strong><span>Allowed time</span></div></div><div class="assessment-preflight">${[['Device check','Ready'],['Network resilience','Autosave enabled'],['Subject coverage',`${s[0]} • Form 3`],['Attempt rule','1 attempt']].map(x=>`<div><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join('')}</div><div class="question-preview"><div class="eyebrow">Interactive checkpoint</div><h3>Questions are ready for submission.</h3><p>Complete this checkpoint to record verified independent evidence for ${s[0]} (${tName}).</p></div></section>`;
  } else {
    const questions = getSubjectQuestions(state.subject, state.topic);
    body=`<section class="assessment-work-card">${questions.map((q,qIdx)=>`<div class="question" style="margin-bottom:24px"><div class="eyebrow">Question ${qIdx+1} • ${q.lo}</div><h3>${q.q}</h3>${q.options.map((o,i)=>`<div class="option ${state.quizAnswers[qIdx]===i?'selected':''}" data-answer="${qIdx}:${i}"><span>${String.fromCharCode(65+i)}.</span><span>${o}</span></div>`).join('')}</div>`).join('')}<div class="callout"><strong>Practice feedback is immediate.</strong><br>Submitting this practice will calculate your score and adaptively update your mastery progress for ${s[0]}.</div></section>`;
  }
  
  return `<div class="studio-breadcrumb"><button class="link-btn" data-nav="assessments">Assessment evidence</button><span>›</span><strong>${meta.title}</strong></div>`+head(meta.eyebrow,meta.title,meta.desc,`<span class="badge neutral">${meta.status}</span><button class="btn" data-action="assessment-save-progress">Save progress</button><button class="btn primary" data-action="learner-assessment-submit" data-type="${type}">${meta.button}</button>`)+`<div class="learner-assessment-layout"><main><div class="assessment-context-bar"><span><small>Subject</small><strong>${s[0]} • Form 3</strong></span><span><small>Topic</small><strong>${tName}</strong></span><span><small>Evidence window</small><strong>${meta.duration}</strong></span></div>${body}</main>${evidence}</div>`;
}
function progressPage(){
  const overall = calculateOverallMastery();
  const demonstrated = calculateCompetenciesDemonstrated();
  const reinforce = calculateCompetenciesToReinforce();
  const totalSubjects = SUBJECTS.length;
  
  const started = SUBJECTS.filter(s => (state.progress[s[1]] || 0) > 0);
  const gaps = started.filter(s => (state.progress[s[1]] || 0) < 80).sort((a,b) => (state.progress[a[1]]||0) - (state.progress[b[1]]||0));
  
  return head('Learning analytics','Progress and competence profile','See the difference between activity completion, assessment performance and demonstrated competence.')+
  `<div class="kpis">
    <div class="kpi"><strong>${overall}%</strong><span>Overall mastery</span></div>
    <div class="kpi"><strong>${demonstrated}</strong><span>Mastered (≥80%)</span></div>
    <div class="kpi"><strong>${reinforce}</strong><span>In progress / reinforce</span></div>
    <div class="kpi"><strong>${demonstrated}/${totalSubjects}</strong><span>Competencies demonstrated</span></div>
  </div>
  <div class="section grid2">
    <div class="card">
      <h3>Subject mastery (All 27 Subjects)</h3>
      <div style="max-height:450px;overflow-y:auto;padding-right:8px">
        ${SUBJECTS.map(s => {
          const v = getSubjectMastery(s[1]);
          return `<div style="margin-top:14px">
            <div class="progress-meta"><strong>${s[0]} (${s[1]})</strong><span>${v}%</span></div>
            <div class="progress"><span style="width:${v}%"></span></div>
          </div>`;
        }).join('')}
      </div>
    </div>
    <div class="card">
      <h3>Competency gaps & next actions</h3>
      ${gaps.length ? `
        <div class="list">
          ${gaps.slice(0, 5).map(s => {
            const v = getSubjectMastery(s[1]);
            const isBad = v < 60;
            return `<div class="list-row">
              <span class="badge ${isBad ? 'bad' : 'warn'}">${isBad ? 'Priority' : 'Reinforce'}</span>
              <div class="grow"><strong>${s[0]}</strong><small>${v}% evidence score • ${TOPICS[s[1]] ? TOPICS[s[1]][0] : 'Foundations'}</small></div>
              <button class="btn sm" data-subject="${s[1]}">Study</button>
            </div>`;
          }).join('')}
        </div>
      ` : `
        <div class="muted" style="padding:20px;text-align:center">
          ${overall > 0 ? 'All active subjects have achieved mastery target (≥80%)! Continue exploring other subjects.' : 'No competency gaps recorded yet. Start practicing any subject to build your adaptive mastery profile.'}
        </div>
      `}
      <button class="btn soft" data-nav="rafiki" style="width:100%;margin-top:16px">Generate gap practice with Rafiki</button>
    </div>
  </div>`;
}
function rafikiPage(){return head('Rafiki AI Engine','Study with evidence, not random prompts','Rafiki uses your selected subject, learning outcome and current mastery gap to generate explanations and practice.',`<button class="btn" data-action="rafiki-history">Study history</button>`)+`<div class="grid2"><div class="card"><div class="form-grid"><div class="field"><label>Subject</label><select id="rafikiSubject"><option>Biology</option><option>Mathematics</option><option>Chemistry</option></select></div><div class="field"><label>Mode</label><select id="rafikiMode"><option>Explain a gap</option><option>Generate practice</option><option>Worked example</option><option>Exam feedback</option></select></div><div class="field full"><label>What do you need help with?</label><textarea id="rafikiPrompt" rows="6">Explain why a reflex action is faster than a conscious response, then test me with three questions.</textarea></div></div><button class="btn primary" data-action="rafiki-send" style="margin-top:12px">Ask Rafiki</button><div id="rafikiReply" class="callout" style="display:none;margin-top:16px"></div></div><div class="card"><h3>AI learning guardrails</h3><p>Rafiki should support thinking rather than replace it.</p><div class="list" style="margin-top:12px"><div class="list-row"><span class="badge ok">1</span><div class="grow"><strong>Outcome-aware</strong><small>Questions map to the active competency.</small></div></div><div class="list-row"><span class="badge ok">2</span><div class="grow"><strong>Hint before answer</strong><small>Encourages retrieval and reasoning.</small></div></div><div class="list-row"><span class="badge ok">3</span><div class="grow"><strong>Evidence recorded</strong><small>Practice informs recommendations, not formal grades.</small></div></div></div></div></div>`}
function getAdaptiveAnnouncements(){
  const pStore = typeof platformStore !== 'undefined' ? platformStore : safeParse('tesea_platform_store', { events: [], announcements: [] });
  const readList = safeParse('tesea_read_announcements', []);
  const role = state.role || 'learner';
  const custom = (pStore.announcements || []).filter(a => !readList.includes(a.id) && (!a.audience || a.audience === 'All' || a.audience.toLowerCase().includes(role) || a.audience.toLowerCase().includes('all')));
  
  if (custom.length > 0) return custom;
  
  if (role === 'learner') {
    const overall = calculateOverallMastery();
    const sCode = state.subject || 'BIO';
    const sInfo = SUBJECTS.find(x => x[1] === sCode) || SUBJECTS[0];
    const sMastery = getSubjectMastery(sCode);
    const items = [];
    if (overall > 0) {
      items.push({
        id: 'ann-progress',
        category: 'Academic',
        badgeClass: 'ok',
        title: `Demonstrated mastery in ${sInfo[0]} is now ${sMastery}%.`,
        detail: sMastery >= 80 ? 'Competency threshold achieved! Continue to the next topic or explore related subjects.' : 'Keep advancing your learning path to reach the 80% competency milestone.',
        time: 'Active'
      });
      items.push({
        id: 'ann-ledger',
        category: 'Evidence',
        badgeClass: '',
        title: 'Outcome evidence recorded in your mastery profile.',
        detail: `Your learning ledger has tracked ${calculateCompetenciesDemonstrated()} demonstrated competencies.`,
        time: 'Updated'
      });
    }
    return items.filter(a => !readList.includes(a.id));
  } else if (role === 'tutor') {
    const d = classStore();
    const items = [];
    if (d.classes.length > 0) {
      items.push({
        id: 'ann-tutor-cohort',
        category: 'Teaching Ops',
        badgeClass: 'ok',
        title: `${d.classes.length} active teaching cohort${d.classes.length > 1 ? 's' : ''} configured.`,
        detail: 'Class assignments, live lessons, and outcome assessments are synchronized.',
        time: 'Active'
      });
    }
    return items.filter(a => !readList.includes(a.id));
  } else {
    return [];
  }
}

function announcementCards(n=4){
  const data = getAdaptiveAnnouncements();
  if (!data.length) {
    return `<div class="card" style="padding:32px;text-align:center"><p class="muted">No new announcements at this time. All caught up!</p></div>`;
  }
  return `<div class="list">${data.slice(0,n).map((x)=>`
    <div class="announcement" id="${x.id}">
      <div class="ann-dot"></div>
      <div class="grow">
        <span class="badge ${x.badgeClass||''}">${x.category||'Notice'}</span>
        <strong style="display:block;margin:6px 0 2px">${x.title}</strong>
        <p style="margin:0 0 4px;font-size:13.5px;color:var(--text-muted, #666)">${x.detail||x.message||''}</p>
        <small class="muted">${x.time||'Recent'}</small>
      </div>
      <button class="btn sm" data-action="mark-read" data-id="${x.id}">Mark read</button>
    </div>
  `).join('')}</div>`;
}

function announcementsPage(){
  const isAdmin = state.role === 'admin' || state.role === 'tutor';
  const actions = (isAdmin ? `<button class="btn primary" data-action="new-announcement">Create announcement</button>` : '') + `<button class="btn" data-action="mark-all">Mark all read</button>`;
  return head('Communication','Announcements','An adaptive, outcome-linked announcement engine for academic, operational, and learning updates.', actions) + announcementCards(10);
}

function subscriptionPage(){
  const sub = state.subscription || { plan: 'Free Explorer', status: 'Active', rafikiUsed: 0, rafikiLimit: 50, renewal: 'Free Tier' };
  const pct = Math.min(100, Math.round((sub.rafikiUsed / (sub.rafikiLimit || 1)) * 100));
  return head('Account access','Subscription management','Manage plan, entitlement, billing status, Rafiki AI usage and offline learning.',`<button class="btn" data-action="billing">Billing history</button><button class="btn primary" data-action="change-plan">Change plan</button>`)+
  `<div class="card" style="border-left:4px solid var(--b)"><div class="grid2"><div><span class="badge ok">${sub.plan} • ${sub.status}</span><h2>${sub.plan}</h2><p>Renewal: ${sub.renewal} • Full Form 1–6 course library • Adaptive Rafiki co-pilot.</p></div><div><div class="progress"><span style="width:${pct}%"></span></div><div class="progress-meta"><span>Rafiki monthly usage</span><strong>${sub.rafikiUsed} / ${sub.rafikiLimit}</strong></div></div></div></div>`+
  `<div class="section grid">${[['Free Explorer','TZS 0','Subject introductions, selected quizzes, 50 Rafiki queries/mo'],['Monthly Learner','TZS 12,000/mo','Full lesson library, assessments, progress and 300 Rafiki queries/mo'],['Annual Learner','TZS 120,000/yr','Full access, offline learning and unlimited Rafiki revision']].map((x,i)=>{
    const isCurrent = (sub.plan||'').toLowerCase().includes(x[0].toLowerCase().split(' ')[0]);
    return `<div class="card ${isCurrent?'click':''}"><span class="badge ${isCurrent?'ok':'neutral'}">${isCurrent?'Current plan':i===1?'Popular':'Starter'}</span><h2>${x[0]}</h2><div style="font-size:28px;font-weight:850">${x[1]}</div><p>${x[2]}</p><button class="btn ${isCurrent?'':'primary'}" data-action="choose-plan" data-plan="${x[0]}" style="width:100%;margin-top:14px">${isCurrent?'Active plan':'Choose plan'}</button></div>`
  }).join('')}</div>`;
}
function tutorPage(p){if(p==='dashboard')return tutorDashboard();if(p==='classes')return tutorClasses();if(p==='class-create')return classCreateStudio();if(p==='class-manage')return classManageStudio();if(p==='class-assignments')return classAssignmentHub();if(p==='content')return tutorContent();if(p==='content-text')return tutorResourceStudio('text');if(p==='content-video')return tutorResourceStudio('video');if(p==='content-audio')return tutorResourceStudio('audio');if(p==='content-pdf')return tutorResourceStudio('pdf');if(p==='content-shorts')return tutorResourceStudio('shorts');if(p==='content-live')return tutorResourceStudio('live');if(p==='assessments')return tutorAssessments();if(p==='assessment-assignment')return assessmentBuilder('assignment');if(p==='assessment-quiz')return assessmentBuilder('quiz');if(p==='assessment-test')return assessmentBuilder('test');if(p==='assessment-exam')return assessmentBuilder('exam');if(p==='live')return tutorLive();if(p==='live-studio')return liveTeachingStudio();if(p==='live-integrations')return liveIntegrations();if(p==='live-evidence')return liveEvidenceReview();if(p==='community')return communityCenter('tutor');if(p==='learner-insights')return tutorInsights();if(p==='question-bank')return questionBank(false);if(p==='question-bank-import')return questionBankImport(false);if(p==='question-bank-ai')return questionBankAI(false);if(p==='announcements')return adminAnnouncements(false);return tutorDashboard()}
function tutorDashboard(){
  const d = classStore();
  const totalLearners = d.classes.reduce((a,b)=>a+b.learners,0);
  const avgMastery = d.classes.length ? Math.round(d.classes.reduce((a,b)=>a+b.mastery,0)/d.classes.length) : 0;
  const submissions = d.assignments.reduce((a,b)=>a+b.submitted,0);
  
  return head('Tutor workspace','Biology teaching dashboard','Prioritise learners and competencies that need intervention.',`<button class="btn" data-nav="content">Create lesson</button><button class="btn primary" data-nav="assessments">Create assessment</button>`)+`<div class="kpis"><div class="kpi"><strong>${totalLearners}</strong><span>Active learners</span></div><div class="kpi"><strong>${avgMastery}%</strong><span>Class mastery</span></div><div class="kpi"><strong>0</strong><span>Need intervention</span></div><div class="kpi"><strong>${submissions}</strong><span>Submissions to review</span></div></div><div class="section grid2"><div class="card"><h3>Competency heatmap</h3>${d.classes.length ? d.classes.map(x=>`<div style="margin-top:14px"><div class="progress-meta"><strong>${x.name}</strong><span>${x.mastery}%</span></div><div class="progress"><span style="width:${x.mastery}%"></span></div></div>`).join('') : '<div class="muted">No class data available. Create a class to see mastery heatmaps.</div>'}</div><div class="card"><h3>Intervention queue</h3><div class="list">${totalLearners ? '<div class="list-row"><span class="badge">Review</span><div class="grow"><strong>0 learners</strong><small>No critical interventions identified from current data</small></div></div>' : '<div class="muted">Queue is empty. Interventions appear when learners fall below mastery thresholds.</div>'}</div></div></div>`;
}
function classStore(){let d=JSON.parse(localStorage.getItem('tesea_classes')||'null');if(!d){d={selected:null,classes:[],assignments:[],live:[]};}return d}
function saveClassStore(d){localStorage.setItem('tesea_classes',JSON.stringify(d))}
function selectedClass(){const d=classStore();return d.classes.find(c=>c.id===d.selected)||d.classes[0]}
function tutorClasses(){const d=classStore();const avgMastery=d.classes.length?Math.round(d.classes.reduce((a,c)=>a+(c.mastery||0),0)/d.classes.length):0;return head('Teaching','Classes','Create and manage outcome-aligned cohorts, rosters, live teaching and formal assessment assignments.',`<button class="btn" data-action="class-import-roster">Import roster</button><button class="btn primary" data-nav="class-create">Create class</button>`)+`<div class="class-kpis"><div class="kpi"><strong>${d.classes.length}</strong><span>Active classes</span></div><div class="kpi"><strong>${d.classes.reduce((a,c)=>a+(c.learners||0),0)}</strong><span>Enrolled learners</span></div><div class="kpi"><strong>${avgMastery}%</strong><span>Average mastery</span></div><div class="kpi"><strong>${d.assignments.length}</strong><span>Active assessment assignments</span></div></div><div class="section"><div class="section-head"><div><h2>Your teaching cohorts</h2><p>Each class connects roster, learning outcomes, lesson evidence, live sessions and assessments.</p></div><button class="btn sm" data-action="class-bulk-manage">Bulk manage</button></div>${d.classes.length?`<div class="class-grid">${d.classes.map(c=>`<article class="class-card"><div class="class-card-top"><div><span class="badge ok">${c.status||'Active'}</span><h2>${c.name}</h2><p>${c.subject} • ${c.term}</p></div><span class="class-code">${c.code}</span></div><div class="class-stat-row"><span><small>Learners</small><strong>${c.learners||0}</strong></span><span><small>Attendance</small><strong>${c.attendance||0}%</strong></span><span><small>Live lessons</small><strong>${c.live||0}</strong></span><span><small>Assessments</small><strong>${c.assessments||0}</strong></span></div><div class="progress-meta"><span>Class mastery</span><strong>${c.mastery||0}%</strong></div><div class="progress"><span style="width:${c.mastery||0}%"></span></div><div class="actions"><button class="btn primary sm" data-action="class-open" data-id="${c.id}">Manage class</button><button class="btn sm" data-action="class-quick-live" data-id="${c.id}">Assign live lesson</button><button class="btn sm" data-action="class-quick-exam" data-id="${c.id}">Assign exam</button></div></article>`).join('')}</div>`:'<div class="card" style="padding:48px 24px;text-align:center"><h3>No teaching cohorts created yet</h3><p class="muted">Create a class cohort to organize syllabus outcomes, live lessons, and assessments.</p><button class="btn primary" data-nav="class-create" style="margin-top:14px">Create class</button></div>'}</div>`}
function classCreateStudio(){return `<div class="studio-breadcrumb"><button class="link-btn" data-nav="classes">Classes</button><span>›</span><strong>Create class</strong></div>`+head('Tutor class operations','Create class','Set up a teaching cohort once, then reuse it for lessons, live sessions, assignments, tests and exams.',`<button class="btn" data-nav="classes">Cancel</button><button class="btn primary" data-action="class-create-save">Create class</button>`)+`<div class="class-builder-layout"><main><section class="studio-panel"><div class="panel-title"><div><div class="eyebrow">1. Class identity</div><h2>Define the cohort</h2><p>Use a clear naming convention that remains understandable in reporting and assessment operations.</p></div><span class="badge">Required</span></div><div class="form-grid"><div class="field full"><label>Class name</label><input id="className" placeholder="e.g. Form 3 Biology"></div><div class="field"><label>Form</label><select id="classForm"><option>Form 1</option><option>Form 2</option><option selected>Form 3</option><option>Form 4</option><option>Form 5</option><option>Form 6</option></select></div><div class="field"><label>Subject</label><select id="classSubject"><option selected>Biology</option><option>Mathematics</option><option>English Language</option><option>Chemistry</option><option>Physics</option></select></div><div class="field"><label>Section / stream</label><input id="classSection" placeholder="e.g. A"></div><div class="field"><label>Academic period</label><select id="classTerm"><option selected>Term 1 • 2026</option><option>Term 2 • 2026</option><option>Term 3 • 2026</option><option>Annual • 2026</option></select></div></div></section><section class="studio-panel"><div class="panel-title"><div><div class="eyebrow">2. Curriculum scope</div><h2>Choose outcomes this class will work toward</h2><p>The class scope becomes the default filter for Content Studio, Live Lessons and Assessment Studio.</p></div><span class="badge ok">NECTA mapped</span></div><div class="outcome-picker">${['Cell structure and organisation','Nutrition in living organisms','Transport of materials','Respiration','Coordination and response','Reproduction'].map((x,i)=>`<label><input type="checkbox"> <span><strong>BIO-F3-${String(i+1).padStart(2,'0')}</strong>${x}</span></label>`).join('')}</div></section><section class="studio-panel"><div class="panel-title"><div><div class="eyebrow">3. Roster ingestion</div><h2>Add learners efficiently</h2><p>Start empty, enrol manually, paste IDs, or stage a bulk roster import.</p></div><button class="btn sm" data-action="class-download-roster-template">Download template</button></div><div class="ingestion-method-grid"><button data-action="class-roster-method"><strong>Paste learner IDs</strong><small>Fast for an existing school list.</small></button><button data-action="class-roster-method"><strong>CSV / XLSX roster</strong><small>Bulk upload names, IDs and guardian metadata.</small></button><button data-action="class-roster-method"><strong>Join code</strong><small>Learners self-enrol with tutor approval.</small></button><button data-action="class-roster-method"><strong>Existing TESEA cohort</strong><small>Copy membership from another class.</small></button></div><div class="field" style="margin-top:16px"><label>Optional learner IDs</label><textarea id="classRoster" rows="4" placeholder="TESEA-10021\nTESEA-10022\nTESEA-10023"></textarea></div></section><section class="studio-panel"><div class="panel-title"><div><div class="eyebrow">4. Operating defaults</div><h2>Save repetitive setup time</h2></div><span class="badge neutral">Reusable defaults</span></div><div class="studio-three"><div><h3>Assessments</h3><div class="toggle-list"><label>Allow late submissions <input type="checkbox" checked></label><label>Show outcome feedback <input type="checkbox" checked></label><label>Rafiki remediation after marking <input type="checkbox" checked></label></div></div><div><h3>Live teaching</h3><div class="toggle-list"><label>Publish session announcements <input type="checkbox" checked></label><label>Capture attendance <input type="checkbox" checked></label><label>Link exit evidence <input type="checkbox" checked></label></div></div><div><h3>Community</h3><div class="toggle-list"><label>Create subject channel <input type="checkbox" checked></label><label>Enable peer discussion <input type="checkbox" checked></label><label>Rafiki moderation <input type="checkbox" checked></label></div></div></div></section></main><aside class="sticky-panel"><div class="studio-panel"><div class="completion-ring"><strong>0%</strong><span>ready</span></div><h3>Class setup readiness</h3>${checkRows([['Identity','Set name'],['NECTA outcomes','Select outcomes'],['Roster','Optional'],['Assessment defaults','Ready'],['Live defaults','Ready'],['Community','Ready']])}<button class="btn primary" data-action="class-create-save" style="width:100%;margin-top:14px">Create class</button></div><div class="studio-panel"><span class="eyebrow">After creation</span><h3>One class, connected operations</h3><p class="muted">The same class ID is reused by Content Studio, Live Lessons, Assessment Studio, announcements, Community Center and evidence reporting.</p></div></aside></div>`}
function classManageStudio(){const d=classStore(),c=selectedClass();if(!c)return head('Class management','No class selected','Create a class to view cohort operations.',`<button class="btn primary" data-nav="class-create">Create class</button>`);const asg=(d.assignments||[]).filter(x=>x.classId===c.id),live=(d.live||[]).filter(x=>x.classId===c.id);return `<div class="studio-breadcrumb"><button class="link-btn" data-nav="classes">Classes</button><span>›</span><strong>${c.name}</strong></div>`+head('Class management',c.name,`${c.subject} • ${c.term} • ${c.learners||0} learners`, `<button class="btn" data-action="class-edit">Edit class</button><button class="btn soft" data-nav="class-assignments">Assignment centre</button><button class="btn primary" data-action="class-quick-live" data-id="${c.id}">Schedule live lesson</button>`)+`<div class="class-management-tabs"><button class="active">Overview</button><button data-nav="learner-insights">Roster & evidence</button><button data-nav="class-assignments">Assignments & exams</button><button data-nav="live">Live teaching</button><button data-nav="community">Community</button></div><div class="kpis"><div class="kpi"><strong>${c.learners||0}</strong><span>Learners</span></div><div class="kpi"><strong>${c.mastery||0}%</strong><span>Mastery</span></div><div class="kpi"><strong>${c.attendance||0}%</strong><span>Attendance</span></div><div class="kpi"><strong>${c.outcomes||0}</strong><span>Mapped outcomes</span></div></div><div class="section class-manage-grid"><main><section class="studio-panel"><div class="section-head"><div><h2>Outcome progress</h2><p>Class-level evidence across the active curriculum scope.</p></div><button class="btn sm" data-nav="learner-insights">Open learner evidence</button></div><div class="muted" style="padding:20px;text-align:center">No cohort outcome evidence recorded yet.</div></section><section class="studio-panel"><div class="section-head"><div><h2>Assigned assessments</h2><p>Formal evidence scheduled specifically for this class.</p></div><button class="btn sm primary" data-nav="class-assignments">Manage assignments</button></div><div class="class-assignment-list">${asg.length?asg.map(a=>`<div><span class="badge ${a.status==='Published'?'ok':'warn'}">${a.type}</span><div class="grow"><strong>${a.title}</strong><small>${a.outcome} • ${a.due}</small></div><span><b>${a.submitted}/${a.total}</b><small>submitted</small></span><button class="btn sm" data-action="class-open-assignment">Open</button></div>`).join(''):'<div class="muted" style="padding:20px;text-align:center">No assessments assigned to this class yet.</div>'}</div></section><section class="studio-panel"><div class="section-head"><div><h2>Live teaching</h2><p>Outcome-focused sessions assigned to this class.</p></div><button class="btn sm primary" data-action="class-quick-live" data-id="${c.id}">New live session</button></div><div class="class-assignment-list">${live.length?live.map(l=>`<div><span class="provider-pill ${l.provider.includes('Meet')?'meet':'zoom'}">${l.provider}</span><div class="grow"><strong>${l.title}</strong><small>${l.outcome} • ${l.when} • ${l.evidence}</small></div><span class="badge ${l.status==='Scheduled'?'ok':'neutral'}">${l.status}</span><button class="btn sm" data-nav="live-studio">Open</button></div>`).join(''):'<div class="muted" style="padding:20px;text-align:center">No live sessions scheduled for this class yet.</div>'}</div></section></main><aside><div class="studio-panel"><span class="eyebrow">Class operations</span><h3>Quick assign</h3><button class="operation-button" data-action="class-new-assignment"><span>✓</span><div><strong>Assignment</strong><small>Applied evidence + rubric</small></div></button><button class="operation-button" data-action="class-new-test"><span>▤</span><div><strong>Topic test</strong><small>Independent mastery evidence</small></div></button><button class="operation-button" data-action="class-quick-exam"><span>◫</span><div><strong>Exam</strong><small>Formal summative evidence</small></div></button><button class="operation-button" data-action="class-quick-live"><span>●</span><div><strong>Live lesson</strong><small>Focused outcome + evidence goal</small></div></button></div><div class="studio-panel"><span class="eyebrow">Intervention signal</span><h3>0 learners need support</h3><p class="muted">No learning interventions needed at this time.</p><button class="btn soft" data-action="assign-intervention" style="width:100%">Create intervention</button></div></aside></div>`}
function classAssignmentHub(){const d=classStore(),c=selectedClass();if(!c)return head('Assignment centre','No class selected','Create a class first to assign assessments.');const asg=(d.assignments||[]).filter(x=>x.classId===c.id);return `<div class="studio-breadcrumb"><button class="link-btn" data-nav="class-manage">${c.name}</button><span>›</span><strong>Assignment centre</strong></div>`+head('Class assessment operations','Assignments, tests & exams',`Assign existing outcome-mapped assessments to ${c.name}, or create a new assessment from the governed Question Bank.`,`<button class="btn" data-nav="question-bank">Question bank</button><button class="btn" data-nav="assessments">Assessment studio</button><button class="btn primary" data-action="class-new-assignment">Assign assessment</button>`)+`<div class="assessment-assignment-layout"><main><section class="studio-panel"><div class="section-head"><div><h2>Assigned to ${c.name}</h2><p>Release, due date, attempt and evidence settings are class-specific.</p></div><select><option>All assessment types</option><option>Assignments</option><option>Topic tests</option><option>Exams</option></select></div><div class="assignment-cards">${asg.length?asg.map(a=>`<article><div><span class="badge ${a.type==='Exam'?'bad':a.type==='Topic Test'?'warn':'ok'}">${a.type}</span><span class="badge neutral">${a.status}</span></div><h3>${a.title}</h3><p>${a.outcome}</p><div class="assignment-meta"><span><small>Due / start</small><strong>${a.due}</strong></span><span><small>Submissions</small><strong>${a.submitted}/${a.total}</strong></span></div><div class="actions"><button class="btn sm" data-action="class-open-assignment">Manage</button><button class="btn sm" data-action="class-duplicate-assignment">Duplicate</button><button class="btn sm" data-action="class-assignment-results">Evidence</button></div></article>`).join(''):'<div class="muted" style="padding:32px;text-align:center;width:100%">No assessments assigned to this class yet.</div>'}</div></section><section class="studio-panel"><div class="panel-title"><div><div class="eyebrow">Class assignment workflow</div><h2>Assign without rebuilding</h2><p>Reuse an approved assessment, then override the class schedule, learner accommodations and evidence rules.</p></div><span class="badge ok">Outcome linked</span></div><div class="assignment-flow"><div><span>1</span><strong>Select assessment</strong><small>Approved assignment, test or exam.</small></div><div><span>2</span><strong>Select class</strong><small>${c.name} is preselected.</small></div><div><span>3</span><strong>Set delivery rules</strong><small>Window, attempts, accommodations and integrity.</small></div><div><span>4</span><strong>Publish</strong><small>Learners receive announcement + dashboard task.</small></div><div><span>5</span><strong>Use evidence</strong><small>Advance, reinforce or relearn by outcome.</small></div></div></section></main><aside class="sticky-panel"><div class="studio-panel"><span class="eyebrow">Quick create</span><h3>Need a new assessment?</h3><p class="muted">Open a dedicated builder already scoped to this class and its mapped outcomes.</p><button class="btn primary" data-action="class-new-assignment" style="width:100%">Assignment builder</button><button class="btn" data-action="class-new-test" style="width:100%;margin-top:8px">Topic test builder</button><button class="btn" data-action="class-new-exam" style="width:100%;margin-top:8px">Exam builder</button></div><div class="studio-panel"><span class="eyebrow">Evidence rule</span><h3>Progression remains outcome-based</h3><div class="summary-list"><span><b>≥80%</b>Advance</span><span><b>60–79%</b>Reinforce</span><span><b>&lt;60%</b>Relearn</span></div></div></aside></div>`}
function tutorContent(){const resources=[
['text','Interactive text','0 lessons','Structured reading, diagrams, checkpoints and embedded practice','Open text studio'],
['video','Video lessons','0 videos','Upload, chapter, caption, transcribe and add knowledge checks','Open video studio'],
['audio','Audio lessons','0 lessons','Upload narrated lessons, transcripts, chapters and offline assets','Open audio studio'],
['pdf','PDF notes','0 files','Ingest, review, tag and publish printable learning notes','Open PDF studio'],
['shorts','Shorts','0 micro-lessons','Batch-produce short vertical reinforcement lessons','Open shorts studio'],
['live','Live lessons','0 scheduled','Plan, schedule, deliver and archive synchronous sessions','Open live studio']
];return head('Authoring','Content studio','A production workspace for outcome-aligned multimedia lessons. Each resource type opens a dedicated studio instead of a pop-up editor.',`<button class="btn" data-action="content-import-hub">Import centre</button><button class="btn primary" data-action="content-new-default">Create resource</button>`)+`<div class="studio-metrics"><div class="metric-card"><span>In production</span><strong>0</strong><small>Across six formats</small></div><div class="metric-card"><span>Awaiting review</span><strong>0</strong><small>Academic approval queue</small></div><div class="metric-card"><span>Published this week</span><strong>0</strong><small>Outcome-aligned metadata</small></div><div class="metric-card"><span>Reuse saved</span><strong>0h</strong><small>Templates + batch ingestion</small></div></div><div class="resource-studio-grid">${resources.map(x=>`<button class="resource-studio-card" data-action="open-resource-studio" data-studio="${x[0]}"><div class="resource-studio-icon">${resourceIcon(x[0])}</div><div class="grow"><span class="badge neutral">${x[2]}</span><h3>${x[1]}</h3><p>${x[3]}</p><span class="studio-link">${x[4]} →</span></div></button>`).join('')}</div><div class="section"><div class="section-head"><div><h2>Production queue</h2><p>Continue work without losing curriculum mapping, version status or review notes.</p></div><button class="btn" data-action="content-bulk-actions">Bulk actions</button></div><div class="card" style="padding:40px;text-align:center"><p class="muted" style="margin:0">Production queue empty. Create or ingest resources in any format studio to stage lessons for review and publishing.</p></div></div>`}

function resourceIcon(type){return {text:'T',video:'▶',audio:'◉',pdf:'PDF',shorts:'↕',live:'●'}[type]||'+'}
function studioMeta(type){return {
text:{title:'Interactive Text Studio',desc:'Build structured, accessible reading lessons with notes, diagrams, worked examples, checkpoints and embedded practice.',primary:'Save lesson draft'},
video:{title:'Video Lesson Studio',desc:'Ingest video quickly, generate metadata, organise chapters, captions, transcripts and in-video checks.',primary:'Save video draft'},
audio:{title:'Audio Lesson Studio',desc:'Produce low-bandwidth audio lessons with chapter markers, transcript, downloadable assets and reflection prompts.',primary:'Save audio draft'},
pdf:{title:'PDF Notes Studio',desc:'Prepare curriculum-mapped PDF notes with page review, accessibility checks, extraction and learner download settings.',primary:'Save PDF draft'},
shorts:{title:'Shorts Studio',desc:'Batch-create 30–90 second micro-lessons for reinforcement while keeping them tied to full lesson outcomes.',primary:'Save shorts batch'},
live:{title:'Live Lesson Studio',desc:'Plan synchronous lessons, attach materials, schedule delivery, track attendance and publish recordings afterward.',primary:'Save live session'}
}[type]}
function studioBreadcrumb(type){const m=studioMeta(type);return `<div class="studio-breadcrumb"><button class="link-btn" data-nav="content">Content studio</button><span>›</span><strong>${m.title}</strong></div>`}
function commonMappingPanel(){return `<section class="studio-panel"><div class="panel-title"><div><span class="eyebrow">1. Curriculum mapping</span><h2>Define the learning target first</h2></div><span class="badge ok">Mapped</span></div><div class="form-grid"><div class="field"><label>Subject</label><select><option>Biology</option><option>Chemistry</option><option>Physics</option></select></div><div class="field"><label>Form</label><select><option>Form 3</option><option>Form 1</option><option>Form 2</option><option>Form 4</option></select></div><div class="field"><label>Topic</label><select><option>Coordination</option></select></div><div class="field"><label>Sub-topic</label><select><option>Reflex action</option></select></div><div class="field full"><label>Learning outcome</label><textarea rows="3">Explain the pathway of a reflex arc and relate each structure to a rapid protective response.</textarea></div><div class="field full"><label>Prerequisite / prior knowledge</label><input value="Nervous system; neurone structure; receptors and effectors"></div></div></section>`}
function ingestionPanel(type){const data={
text:{heading:'Fast text ingestion',help:'Start from a blank lesson, paste existing notes, import a structured document, or reuse a TESEA lesson template.',methods:[['blank','Blank lesson','Structured outcome-first authoring'],['paste','Paste notes','Convert existing text into lesson blocks'],['doc','Import DOCX / ODT','Preserve headings and lists'],['template','Use template','Reuse approved TESEA pedagogy']]},
video:{heading:'Video ingestion',help:'Bring in one file or a production batch, then let the studio prepare captions, chapters and metadata for review.',methods:[['upload','Upload video','MP4, MOV, WebM'],['batch','Batch upload','Queue multiple lesson clips'],['url','Import source URL','Reference approved cloud source'],['recording','Use live recording','Repurpose a completed session']]},
audio:{heading:'Audio ingestion',help:'Upload finished audio or ingest source media for a low-bandwidth lesson package.',methods:[['upload','Upload audio','MP3, M4A, WAV, OGG'],['batch','Batch upload','Multiple lesson episodes'],['videoaudio','Extract from video','Create audio-first alternative'],['script','Script-to-audio prep','Prepare narration workflow']]},
pdf:{heading:'Document ingestion',help:'Upload one or multiple documents, preserve the original, then create a learner-ready reviewed edition.',methods:[['upload','Upload PDF','Single lesson notes'],['batch','Batch PDFs','Topic or term pack'],['doc','Convert document','DOCX / ODT to review queue'],['scan','Scanned notes','OCR-ready ingestion path']]},
shorts:{heading:'Short-form ingestion',help:'Create one short or process a batch so tutors spend less time repeating metadata and captions.',methods:[['upload','Upload vertical clip','9:16 preferred'],['batch','Batch clips','Sequence a micro-learning set'],['long','Clip from long video','Mark source timestamps'],['script','Storyboard first','Plan hook → concept → recall']]},
live:{heading:'Session setup',help:'Prepare a live session once, then reuse its agenda, learning outcomes, resources and post-session workflow.',methods:[['schedule','Schedule session','Date, duration and cohort'],['series','Create series','Recurring revision classes'],['provider','Connect meeting room','Provider-ready session link'],['recording','Import recording','Archive an external session']]}
}[type];return `<section class="studio-panel"><div class="panel-title"><div><span class="eyebrow">2. Ingestion</span><h2>${data.heading}</h2><p>${data.help}</p></div><span class="badge neutral">Time-saving workflow</span></div><div class="ingestion-grid">${data.methods.map(m=>`<button class="ingestion-method" data-action="studio-ingest" data-method="${m[0]}"><strong>${m[1]}</strong><span>${m[2]}</span><small>Start →</small></button>`).join('')}</div><div class="drop-zone"><strong>Drop files here</strong><span>or choose an ingestion method above. The prototype records the workflow locally; production can connect signed object-storage uploads.</span><button class="btn" data-action="studio-ingest" data-method="file">Choose files</button></div></section>`}
function productionPanel(type){const blocks={
text:`<div class="studio-two"><div class="studio-panel"><div class="panel-title"><div><span class="eyebrow">3. Lesson structure</span><h2>Build once, reuse blocks</h2></div><button class="btn sm" data-action="studio-add-block">Add block</button></div><div class="block-list">${[['Overview','2 min','Course context + prior knowledge'],['Explain','8 min','Core concept with diagram'],['Worked example','5 min','Reflex arc pathway'],['Check understanding','3 min','2 retrieval questions'],['Apply','6 min','Scenario-based task'],['Summary','2 min','Key ideas + next step']].map((x,i)=>`<div class="content-block"><span>${i+1}</span><div class="grow"><strong>${x[0]}</strong><small>${x[2]}</small></div><em>${x[1]}</em><button class="icon-btn" data-action="studio-reorder">⋮</button></div>`).join('')}</div></div><div class="studio-panel"><span class="eyebrow">Editor</span><h2>Active block: Explain</h2><div class="editor-toolbar"><button>B</button><button>I</button><button>H2</button><button>• List</button><button>Diagram</button><button>Equation</button><button>Callout</button></div><textarea class="lesson-editor" rows="14">A reflex action is a rapid, automatic response to a stimulus. In a reflex arc, impulses travel from a receptor through sensory and relay neurones to a motor neurone and then an effector.</textarea><div class="actions"><button class="btn" data-action="studio-ai-outline">Rafiki: improve explanation</button><button class="btn" data-action="studio-preview">Preview learner view</button></div></div></div>`,
video:`<div class="studio-two"><div class="studio-panel"><span class="eyebrow">3. Media preparation</span><h2>Video processing checklist</h2>${checkRows([['Source file ingested','Complete'],['720p adaptive version','Ready'],['360p low-bandwidth version','Ready'],['Poster frame','Select'],['Audio loudness check','Passed']])}<div class="field"><label>Lesson video title</label><input value="Reflex arc explained"></div><div class="field"><label>Approx. duration</label><input value="11:42"></div></div><div class="studio-panel"><span class="eyebrow">Chapters + interaction</span><h2>Timeline</h2>${timelineRows([['00:00','Learning outcome'],['01:15','Stimulus and receptor'],['03:42','Sensory → relay neurone'],['06:10','Motor response'],['08:24','Worked example'],['10:05','Knowledge check']])}<button class="btn" data-action="studio-add-chapter">+ Add chapter</button></div></div><div class="studio-two"><div class="studio-panel"><span class="eyebrow">Captions & transcript</span><h2>Accessibility package</h2>${checkRows([['Auto transcript','Generated'],['English captions','Review'],['Swahili captions','Optional'],['Key vocabulary','8 terms']])}<div class="actions"><button class="btn">Import SRT/VTT</button><button class="btn" data-action="studio-ai-transcript">Generate transcript</button></div></div><div class="studio-panel"><span class="eyebrow">In-video checks</span><h2>Knowledge checks</h2><p>Add checks at natural pauses rather than interrupting every minute.</p><div class="content-block"><span>1</span><div class="grow"><strong>06:22 • Sequence the reflex arc</strong><small>Drag/order checkpoint</small></div><button class="btn sm">Edit</button></div><button class="btn" data-action="studio-add-check">+ Add checkpoint</button></div></div>`,
audio:`<div class="studio-two"><div class="studio-panel"><span class="eyebrow">3. Audio preparation</span><h2>Listening package</h2>${checkRows([['Source audio','Ingested'],['Speech level','Normalised'],['Mobile compression','Ready'],['Download version','Enabled'],['Transcript','Generated']])}<div class="field"><label>Episode title</label><input value="Reflex action — audio lesson"></div><div class="field"><label>Duration</label><input value="09:18"></div></div><div class="studio-panel"><span class="eyebrow">Chapter markers</span><h2>Make audio scannable</h2>${timelineRows([['00:00','Learning target'],['01:05','What is a reflex?'],['03:08','Reflex arc sequence'],['06:15','Exam application'],['08:20','Recall prompt']])}<button class="btn">+ Add marker</button></div></div><div class="studio-panel"><span class="eyebrow">Transcript & companion notes</span><h2>Support learners who cannot listen continuously</h2><textarea class="lesson-editor" rows="8">In this lesson, we explain why reflex actions are rapid and automatic, then follow the impulse from receptor to effector...</textarea><div class="actions"><button class="btn" data-action="studio-ai-transcript">Clean transcript</button><button class="btn">Generate downloadable summary</button></div></div>`,
pdf:`<div class="studio-two"><div class="studio-panel"><span class="eyebrow">3. Document preparation</span><h2>Document health</h2>${checkRows([['Original preserved','Yes'],['Pages detected','14'],['Text layer','Available'],['Images compressed','Ready'],['File size','2.8 MB']])}<div class="field"><label>Learner-facing title</label><input value="Coordination: Reflex Action Notes"></div></div><div class="studio-panel"><span class="eyebrow">Page map</span><h2>Map pages to learning sections</h2>${timelineRows([['1–2','Overview + outcomes'],['3–6','Nervous pathway'],['7–9','Reflex arc diagram'],['10–12','Worked questions'],['13–14','Summary + practice']])}<button class="btn">Edit page ranges</button></div></div><div class="studio-two"><div class="studio-panel"><span class="eyebrow">Accessibility</span><h2>Document checks</h2>${checkRows([['Readable text layer','Pass'],['Heading structure','Review'],['Diagram descriptions','2 missing'],['Print contrast','Pass']])}</div><div class="studio-panel"><span class="eyebrow">Distribution</span><h2>Learner options</h2>${toggleRows([['Allow download',true],['Allow print',true],['Offline app cache',true],['Watermark learner copy',false]])}</div></div>`,
shorts:`<div class="studio-two"><div class="studio-panel"><span class="eyebrow">3. Batch production</span><h2>Micro-lesson sequence</h2>${[['01','What is a reflex?','0:42'],['02','Reflex arc in one line','0:55'],['03','Sensory vs motor neurone','0:48'],['04','Why reflexes are fast','1:02'],['05','Exam trap','0:39']].map(x=>`<div class="content-block"><span>${x[0]}</span><div class="grow"><strong>${x[1]}</strong><small>Ready for caption review</small></div><em>${x[2]}</em><button class="btn sm">Edit</button></div>`).join('')}<button class="btn" data-action="studio-add-short">+ Add short</button></div><div class="studio-panel"><span class="eyebrow">Short template</span><h2>Keep every clip pedagogically useful</h2>${checkRows([['Hook','0–3 sec'],['Single concept','3–35 sec'],['Concrete example','35–50 sec'],['Recall prompt','Final 10 sec'],['Link to full lesson','Required']])}<div class="field"><label>Caption style</label><select><option>Accessible high-contrast</option></select></div><div class="field"><label>Default next action</label><select><option>Open full lesson</option><option>Quick quiz</option></select></div></div></div>`,
live:`<div class="studio-two"><div class="studio-panel"><span class="eyebrow">3. Session plan</span><h2>Live Biology Revision</h2><div class="form-grid"><div class="field"><label>Date</label><input type="date" value="2026-08-20"></div><div class="field"><label>Start time</label><input type="time" value="19:00"></div><div class="field"><label>Duration</label><select><option>60 minutes</option><option>45 minutes</option><option>90 minutes</option></select></div><div class="field"><label>Cohort</label><select><option>Form 3 Biology</option></select></div><div class="field full"><label>Session room / provider link</label><input value="TESEA Live Room • Auto-created on publish"></div></div></div><div class="studio-panel"><span class="eyebrow">Agenda</span><h2>Time-box the session</h2>${timelineRows([['00–05','Retrieval warm-up'],['05–20','Reflex arc explanation'],['20–35','Worked exam questions'],['35–50','Learner practice'],['50–60','Q&A + exit ticket']])}<button class="btn">Edit agenda</button></div></div><div class="studio-two"><div class="studio-panel"><span class="eyebrow">Before class</span><h2>Automations</h2>${toggleRows([['Send learner reminder',true],['Attach PDF notes',true],['Open pre-lesson quiz',true],['Notify absent learners afterward',true]])}</div><div class="studio-panel"><span class="eyebrow">After class</span><h2>Recording workflow</h2>${toggleRows([['Save recording',true],['Generate transcript',true],['Create chapter markers',true],['Publish replay after tutor review',true]])}</div></div>`
};return blocks[type]}
function checkRows(items){return `<div class="check-list">${items.map(x=>`<div><span class="check-dot">✓</span><strong>${x[0]}</strong><em>${x[1]}</em></div>`).join('')}</div>`}
function timelineRows(items){return `<div class="timeline-list">${items.map(x=>`<div><time>${x[0]}</time><span>${x[1]}</span><button class="link-btn">Edit</button></div>`).join('')}</div>`}
function toggleRows(items){return `<div class="toggle-list">${items.map((x,i)=>`<label><span>${x[0]}</span><input type="checkbox" ${x[1]?'checked':''}></label>`).join('')}</div>`}
function workflowPanel(type){return `<section class="studio-panel"><div class="panel-title"><div><span class="eyebrow">4. Quality, metadata & publishing</span><h2>Finish once, publish safely</h2><p>Required academic, accessibility and delivery checks are visible in one place.</p></div><span class="badge warn">3 checks remaining</span></div><div class="studio-three"><div><h3>Learning metadata</h3>${checkRows([['Outcome mapped','Complete'],['Estimated duration','Set'],['Difficulty','Set'],['Keywords','6 added']])}</div><div><h3>Quality gates</h3>${checkRows([['Academic accuracy','Tutor checked'],['Accessibility','Review'],['Copyright/source rights','Confirm'],['Mobile preview','Pending']])}</div><div><h3>Publishing</h3><div class="field"><label>Visibility</label><select><option>Draft</option><option>Send for review</option><option>Publish</option></select></div><div class="field"><label>Available to</label><select><option>Form 3 paid learners</option><option>All Form 3 learners</option><option>School cohorts</option></select></div></div></div></section>`}
function tutorResourceStudio(type){const m=studioMeta(type);return `${studioBreadcrumb(type)}${head('Tutor content production',m.title,m.desc,`<button class="btn" data-action="studio-preview">Preview learner view</button><button class="btn" data-action="studio-version">Version history</button><button class="btn primary" data-action="studio-save">${m.primary}</button>`)}<div class="studio-layout"><main>${commonMappingPanel()}${ingestionPanel(type)}${productionPanel(type)}${workflowPanel(type)}</main><aside class="studio-rail"><div class="studio-panel sticky-panel"><span class="eyebrow">Production status</span><h3>Reflex arc explained</h3><div class="completion-ring"><strong>82%</strong><span>ready</span></div>${checkRows([['Curriculum map','Done'],['Media / lesson body','Done'],['Accessibility','Review'],['Academic QA','Review'],['Publishing settings','Done']])}<hr><strong>Operational shortcuts</strong><button class="btn" data-action="studio-duplicate">Duplicate resource</button><button class="btn" data-action="studio-template">Save as template</button><button class="btn" data-action="studio-assign-reviewer">Assign reviewer</button><small class="muted">Autosave: on • Last saved just now</small></div></aside></div>`}

function tutorAssessments(){return head('Assessment authoring','Assessment studio','Build, validate and publish outcome-mapped assignments, quizzes, tests and exams from one governed question bank.',`<button class="btn" data-nav="question-bank">Open question bank</button><button class="btn soft" data-action="ai-assessment-plan">Ask Rafiki AI</button>`)+`<div class="assessment-hero"><div><span class="badge">Outcome-mapped workflow</span><h2>Choose the assessment purpose before choosing questions.</h2><p>Each builder applies a suitable blueprint, evidence model, marking workflow and AI assistance pattern.</p></div><div class="assessment-health"><strong>0%</strong><span>Bank mapping completeness</span><div class="progress"><span style="width:0%"></span></div></div></div><div class="assessment-type-grid">${[
['assignment','Assignment','Applied evidence','Extended response, project, practical and file submission','Rubrics • staged deadlines • AI marking support'],
['quiz','Quiz','Retrieval & feedback','Fast low-stakes checks with immediate feedback','Auto-marking • hints • adaptive retry'],
['test','Test','Independent mastery','Controlled topic or unit evidence','Blueprint • timer • randomisation • moderation'],
['exam','Exam','Summative readiness','Full-paper, section-based examination workflow','Paper structure • security • grade boundaries']
].map(x=>`<button class="assessment-type-card" data-action="open-assessment-builder" data-builder="${x[0]}"><span class="assessment-type-icon">${x[0][0].toUpperCase()}</span><div><div class="eyebrow">${x[2]}</div><h3>${x[1]}</h3><p>${x[3]}</p><small>${x[4]}</small><span class="studio-link">Open dedicated builder →</span></div></button>`).join('')}</div><div class="section"><div class="section-head"><div><h2>Assessment operations</h2><p>Current drafts, live assessments and marking work.</p></div><div class="actions"><button class="btn sm" data-action="assessment-template">Templates</button><button class="btn sm" data-action="assessment-import">Import</button></div></div><div class="muted" style="padding:40px;text-align:center">No draft or active assessments.</div></div>`}
function assessmentBuilder(type){const meta={assignment:{name:'Assignment Builder',purpose:'Applied competence and authentic evidence',time:'Flexible / deadline based',items:'4 tasks',marking:'Rubric + tutor review'},quiz:{name:'Quiz Builder',purpose:'Retrieval practice and formative feedback',time:'10–15 minutes',items:'10 questions',marking:'Auto-mark + feedback'},test:{name:'Test Builder',purpose:'Independent topic or unit mastery evidence',time:'40 minutes',items:'15 questions',marking:'Auto + moderated'},exam:{name:'Exam Builder',purpose:'Summative readiness and formal examination evidence',time:'2 hours',items:'Section A/B/C',marking:'Scheme + moderation'}}[type];const config=assessmentTypeConfig(type);return `<div class="studio-breadcrumb"><button class="link-btn" data-nav="assessments">Assessment studio</button><span>›</span><strong>${meta.name}</strong></div>`+head('Tutor assessment workspace',meta.name,meta.purpose,`<button class="btn" data-action="assessment-preview">Learner preview</button><button class="btn soft" data-action="assessment-ai-review">AI quality review</button><button class="btn primary" data-action="assessment-save">Save draft</button>`)+`<div class="assessment-builder-layout"><main><section class="studio-panel"><div class="panel-title"><div><div class="eyebrow">1. Curriculum alignment</div><h2>Define evidence before authoring</h2><p>Map the assessment to the exact NECTA syllabus outcomes and competencies.</p></div><span class="badge ok">4 outcomes mapped</span></div><div class="form-grid"><div class="field"><label>Form</label><select><option>Form 3</option><option>Form 1</option><option>Form 2</option><option>Form 4</option><option>Form 5</option><option>Form 6</option></select></div><div class="field"><label>Subject</label><select><option>Biology</option><option>Mathematics</option><option>English Language</option><option>Chemistry</option></select></div><div class="field"><label>Topic</label><select><option>Coordination</option><option>Transport of Materials</option><option>Reproduction</option></select></div><div class="field"><label>Sub-topic</label><select><option>Reflex action</option><option>Nervous coordination</option><option>Endocrine coordination</option></select></div><div class="field full"><label>Learning outcomes</label><div class="outcome-picker">${['Explain the sequence of a reflex arc','Relate neurone structure to impulse transmission','Compare voluntary and involuntary responses','Apply coordination concepts to unfamiliar situations'].map((x,i)=>`<label><input type="checkbox" checked> <span><strong>LO ${i+1}</strong>${x}</span></label>`).join('')}</div></div></div></section><section class="studio-panel"><div class="panel-title"><div><div class="eyebrow">2. Assessment blueprint</div><h2>Balance coverage, cognitive demand and marks</h2><p>Use the blueprint as the control layer for question selection and AI generation.</p></div><button class="btn sm" data-action="assessment-ai-blueprint">Generate with Rafiki AI</button></div>${blueprint(type)}</section><section class="studio-panel"><div class="panel-title"><div><div class="eyebrow">3. Outcome-mapped question bank</div><h2>Select, generate or adapt questions</h2><p>Every item retains source, outcome, difficulty, cognitive level and moderation status.</p></div><div class="actions"><button class="btn sm" data-action="assessment-add-bank">Browse bank</button><button class="btn sm soft" data-action="assessment-ai-generate">AI generate</button></div></div><div class="question-bank-toolbar"><select><option>All mapped outcomes</option><option>LO 1 • Reflex arc sequence</option><option>LO 2 • Neurone structure</option></select><select><option>Mixed difficulty</option><option>Foundation</option><option>Core</option><option>Challenge</option></select><select><option>All question types</option><option>MCQ</option><option>Short response</option><option>Structured</option><option>Extended</option></select><input placeholder="Search bank…"></div><div class="builder-question-list">${questionCards(type)}</div></section>${config}<section class="studio-panel"><div class="panel-title"><div><div class="eyebrow">5. Review & publish</div><h2>Quality assurance and release controls</h2><p>Run validation before assigning to learners.</p></div><span class="badge warn">2 recommendations</span></div><div class="qa-grid">${['All questions mapped to an outcome','Marks total matches blueprint','Answer keys / rubrics present','Accessibility checks passed','Difficulty distribution acceptable','No duplicate item exposure'].map((x,i)=>`<div><span class="check-dot">${i<4?'✓':'!'}</span><strong>${x}</strong><small>${i<4?'Ready':'Review recommended'}</small></div>`).join('')}</div><div class="actions" style="margin-top:16px"><button class="btn" data-action="assessment-moderate">Send for moderation</button><button class="btn" data-action="assessment-schedule">Schedule</button><button class="btn primary" data-action="assessment-publish">Publish / assign</button></div></section></main><aside class="assessment-ai-panel"><div class="studio-panel sticky-panel"><div><span class="badge">Rafiki AI Assistant</span><h3 style="margin:10px 0 4px">Assessment co-pilot</h3><p class="muted" style="margin:0">AI assists authoring and evaluation; tutor approval remains the control point.</p></div><div class="ai-capability-list">${['Build blueprint from outcomes','Generate parallel question variants','Suggest distractors and marking points','Check ambiguity and reading load','Draft rubrics / mark schemes','Analyse item difficulty after attempts','Flag weak outcome coverage','Suggest targeted reassessment'].map(x=>`<button data-action="assessment-ai-task"><span>✦</span>${x}</button>`).join('')}</div><div class="ai-chat-box"><label>Ask Rafiki about this assessment</label><textarea id="assessmentAiPrompt" rows="4" placeholder="e.g. Increase application-level evidence without increasing total marks"></textarea><button class="btn primary" data-action="assessment-ai-send">Run assistant</button><div id="assessmentAiReply" class="ai-reply hidden"></div></div><div class="divider-line"></div><div><strong>Assessment summary</strong><div class="summary-list"><span><b>${meta.items}</b>Structure</span><span><b>${meta.time}</b>Duration</span><span><b>40</b>Total marks</span><span><b>${meta.marking}</b>Marking</span></div></div></div></aside></div>`}
function blueprint(type){const rows=type==='exam'?[['Knowledge & understanding','12','30%','A'],['Application','16','40%','A/B'],['Analysis & reasoning','8','20%','B/C'],['Evaluation / extended response','4','10%','C']]:type==='assignment'?[['Concept application','10','25%','Task 1'],['Investigation / evidence','12','30%','Task 2'],['Interpretation','8','20%','Task 3'],['Reflection / communication','10','25%','Task 4']]:[['Recall & understanding','10','25%','1–4'],['Application','14','35%','5–9'],['Analysis','10','25%','10–13'],['Challenge / transfer','6','15%','14–15']];return `<div class="blueprint-table"><div class="blueprint-head"><span>Cognitive demand</span><span>Marks</span><span>Weight</span><span>Section/items</span></div>${rows.map(r=>`<div><strong>${r[0]}</strong><span>${r[1]}</span><span>${r[2]}</span><span>${r[3]}</span></div>`).join('')}</div><div class="blueprint-bars"><div><span>LO1</span><div class="progress"><span style="width:30%"></span></div><b>30%</b></div><div><span>LO2</span><div class="progress"><span style="width:25%"></span></div><b>25%</b></div><div><span>LO3</span><div class="progress"><span style="width:20%"></span></div><b>20%</b></div><div><span>LO4</span><div class="progress"><span style="width:25%"></span></div><b>25%</b></div></div>`}
function questionCards(type){const base=[['QB-BIO-0312','Which sequence correctly represents the pathway of a reflex arc?','MCQ','LO1','Core','2 marks'],['QB-BIO-0448','Explain why withdrawal from a hot object can occur before conscious perception of pain.','Short response','LO1 • LO3','Core','4 marks'],['QB-BIO-0506','A learner accidentally steps on a sharp object. Use the diagram to explain the response pathway and predict what would happen if the sensory neurone were damaged.','Structured','LO1 • LO2 • LO4','Challenge','8 marks']];if(type==='assignment')base.push(['QB-BIO-0618','Design a simple investigation or explanatory model showing how response time can be measured and discuss two limitations.','Applied task','LO4','Challenge','10 marks']);return base.map((q,i)=>`<article class="builder-question"><div class="question-drag">⋮⋮</div><div class="grow"><div class="question-meta"><span class="badge neutral">${q[2]}</span><span>${q[3]}</span><span>${q[4]}</span><span>${q[5]}</span></div><strong>${q[1]}</strong><small>${q[0]} • Reviewed ${i%2?'8':'12'} days ago • Exposure low</small></div><div class="question-actions"><button class="btn sm" data-action="assessment-edit-question">Edit</button><button class="btn sm" data-action="assessment-ai-variant">AI variant</button><button class="icon-btn" data-action="assessment-remove-question">×</button></div></article>`).join('')}
function assessmentTypeConfig(type){if(type==='assignment')return `<section class="studio-panel"><div class="eyebrow">4. Assignment workflow</div><h2>Submission, rubric and evidence configuration</h2><div class="studio-three"><div class="field"><label>Submission methods</label><select multiple size="5"><option selected>Typed response</option><option selected>File upload</option><option>Photo evidence</option><option>Audio response</option><option>Video evidence</option></select></div><div><strong>Rubric criteria</strong><div class="rubric-list">${['Scientific accuracy • 40%','Application of concepts • 25%','Evidence / reasoning • 25%','Communication • 10%'].map(x=>`<div><span>${x}</span><button class="link-btn" data-action="assessment-edit-rubric">Edit</button></div>`).join('')}</div><button class="btn sm" data-action="assessment-ai-rubric">AI draft rubric</button></div><div class="toggle-list"><label>Allow draft submission <input type="checkbox" checked></label><label>Require tutor review <input type="checkbox" checked></label><label>AI pre-assessment <input type="checkbox" checked></label><label>Return annotated feedback <input type="checkbox" checked></label></div></div></section>`;if(type==='quiz')return `<section class="studio-panel"><div class="eyebrow">4. Quiz behaviour</div><h2>Feedback, attempts and adaptive support</h2><div class="studio-three"><div class="field"><label>Attempts</label><select><option>2 attempts</option><option>1 attempt</option><option>Unlimited practice</option></select><label>Feedback timing</label><select><option>After each question</option><option>After submission</option></select></div><div class="toggle-list"><label>Shuffle questions <input type="checkbox" checked></label><label>Shuffle options <input type="checkbox" checked></label><label>Show outcome feedback <input type="checkbox" checked></label><label>Enable targeted retry <input type="checkbox" checked></label></div><div class="toggle-list"><label>Rafiki hints <input type="checkbox" checked></label><label>AI misconception diagnosis <input type="checkbox" checked></label><label>Auto-create remediation set <input type="checkbox"></label></div></div></section>`;return `<section class="studio-panel"><div class="eyebrow">4. Delivery & integrity</div><h2>${type==='exam'?'Exam security and paper settings':'Test conditions and randomisation'}</h2><div class="studio-three"><div class="field"><label>Duration</label><input value="${type==='exam'?'120':'40'} minutes"><label>Availability window</label><input value="Monday 08:00 – Friday 17:00"></div><div class="toggle-list"><label>Randomise within blueprint <input type="checkbox" checked></label><label>One question per page <input type="checkbox"></label><label>Lock after submission <input type="checkbox" checked></label><label>Require access code <input type="checkbox" ${type==='exam'?'checked':''}></label></div><div class="toggle-list"><label>AI anomaly flags <input type="checkbox" checked></label><label>AI post-assessment analysis <input type="checkbox" checked></label><label>Auto intervention suggestions <input type="checkbox" checked></label><label>Moderation required <input type="checkbox" checked></label></div></div></section>`}

function liveProviderStatus(){let s=JSON.parse(localStorage.getItem('tesea_live_integrations')||'{"zoom":true,"teams":false,"meet":true}');return s}
function providerCard(key,name,detail){const s=liveProviderStatus(),on=!!s[key];return `<div class="provider-card"><div class="provider-brand ${key}">${key==='zoom'?'Z':key==='teams'?'T':'G'}</div><div class="grow"><div class="provider-head"><strong>${name}</strong><span class="badge ${on?'ok':'neutral'}">${on?'Connected':'Not connected'}</span></div><small>${detail}</small><div class="provider-meta">OAuth connection • meeting creation • attendance sync • recording/webhook readiness</div></div><button class="btn sm ${on?'':'primary'}" data-action="live-provider-toggle" data-provider="${key}">${on?'Manage':'Connect'}</button></div>`}
function tutorLive(){const s=liveProviderStatus();return head('Synchronous learning','Live lessons','Schedule focused teaching around a defined NECTA outcome, evidence goal and follow-up action.',`<button class="btn" data-nav="live-integrations">Meeting integrations</button><button class="btn primary" data-nav="live-studio">Schedule focused lesson</button>`)+`<div class="live-kpis"><div class="kpi"><strong>0</strong><span>Scheduled sessions</span></div><div class="kpi"><strong>0%</strong><span>Average attendance</span></div><div class="kpi"><strong>0%</strong><span>Evidence completion</span></div><div class="kpi"><strong>${Object.values(s).filter(Boolean).length}/3</strong><span>Providers connected</span></div></div><div class="muted" style="padding:60px;text-align:center"><h3>No live sessions scheduled</h3><p>Plan a focused revision clinic or intervention session to see it here.</p></div>`}
function liveTeachingStudio(){const s=liveProviderStatus();return `<div class="studio-breadcrumb"><button class="link-btn" data-nav="live">Live lessons</button><span>›</span><strong>Focused Live Teaching Studio</strong></div>`+head('Tutor live studio','Focused Live Teaching Studio','Plan the learning target, choose the evidence signal, connect a meeting provider and automate the operational work around the session.',`<button class="btn" data-action="live-save-draft">Save draft</button><button class="btn primary" data-action="live-schedule">Schedule & publish</button>`)+`<div class="live-builder-layout"><main><section class="studio-panel"><div class="panel-title"><div><span class="eyebrow">1. Outcome & evidence</span><h2>Start with what must change in learner performance</h2><p>Keep the synchronous lesson narrow enough to generate interpretable evidence.</p></div><span class="badge ok">Outcome mapped</span></div><div class="form-grid"><div class="field"><label>Subject</label><select><option>Biology</option><option>Mathematics</option><option>Chemistry</option><option>Physics</option></select></div><div class="field"><label>Form</label><select><option>Form 3</option><option>Form 1</option><option>Form 2</option><option>Form 4</option><option>Form 5</option><option>Form 6</option></select></div><div class="field"><label>Topic</label><select><option>Coordination</option><option>Transport of Materials</option><option>Reproduction</option></select></div><div class="field"><label>Sub-topic</label><select><option>Reflex action</option><option>Nervous coordination</option><option>Hormonal coordination</option></select></div><div class="field full"><label>Primary learning outcome</label><select><option>BIO-F3-COR-02 — Explain the pathway of a reflex arc and relate each structure to rapid protective response</option></select></div><div class="field full"><label>Evidence goal</label><textarea rows="3">By the final 10 minutes, each learner independently explains a reflex arc from an unfamiliar scenario and scores at least 4/5 on the exit check.</textarea></div></div><div class="evidence-strip"><span class="badge">Baseline</span><strong>58% current mastery</strong><span>→</span><span class="badge warn">Target</span><strong>≥ 80% independent evidence</strong></div></section><section class="studio-panel"><div class="panel-title"><div><span class="eyebrow">2. Session design</span><h2>Build a deliberate teaching sequence</h2></div><button class="btn sm" data-action="live-ai-plan">✦ Rafiki draft agenda</button></div><div class="live-agenda"><div><time>00–05</time><span class="agenda-type diagnose">Diagnose</span><div><strong>Retrieval pulse</strong><small>2 poll questions to expose sequence misconceptions.</small></div><button class="btn sm" data-action="live-edit-agenda">Edit</button></div><div><time>05–20</time><span class="agenda-type teach">Teach</span><div><strong>Model the pathway</strong><small>Visual explanation + worked scenario.</small></div><button class="btn sm" data-action="live-edit-agenda">Edit</button></div><div><time>20–35</time><span class="agenda-type practice">Practice</span><div><strong>Guided application</strong><small>Breakout / chat reasoning on 2 scenarios.</small></div><button class="btn sm" data-action="live-edit-agenda">Edit</button></div><div><time>35–50</time><span class="agenda-type apply">Apply</span><div><strong>Independent evidence task</strong><small>Learners explain an unfamiliar example.</small></div><button class="btn sm" data-action="live-edit-agenda">Edit</button></div><div><time>50–60</time><span class="agenda-type check">Check</span><div><strong>5-question exit check</strong><small>Auto-captured to the outcome evidence profile.</small></div><button class="btn sm" data-action="live-edit-agenda">Edit</button></div></div><div class="actions"><button class="btn" data-action="live-add-segment">+ Add segment</button><button class="btn" data-action="live-attach-resource">Attach slides / PDF / video</button><button class="btn" data-action="live-link-assessment">Link exit assessment</button></div></section><section class="studio-panel"><div class="panel-title"><div><span class="eyebrow">3. Delivery provider</span><h2>Choose where the room will be created</h2><p>TESEA keeps the learning design and evidence model; the provider handles the meeting room.</p></div><button class="link-btn" data-nav="live-integrations">Manage connections</button></div><div class="provider-select-grid">${[['zoom','Zoom',s.zoom],['teams','Microsoft Teams',s.teams],['meet','Google Meet',s.meet]].map((x,i)=>`<label class="provider-select ${i===2?'selected':''}"><input type="radio" name="liveProvider" value="${x[0]}" ${i===2?'checked':''} ${x[2]?'':'disabled'}><span class="provider-brand ${x[0]}">${x[0]==='zoom'?'Z':x[0]==='teams'?'T':'G'}</span><div><strong>${x[1]}</strong><small>${x[2]?'Connected — ready to schedule':'Connect provider first'}</small></div><span class="badge ${x[2]?'ok':'neutral'}">${x[2]?'Ready':'Offline'}</span></label>`).join('')}</div><div class="form-grid" style="margin-top:16px"><div class="field"><label>Date</label><input type="date" value="2026-08-17"></div><div class="field"><label>Start time</label><input type="time" value="19:00"></div><div class="field"><label>Duration</label><select><option>60 minutes</option><option>45 minutes</option><option>90 minutes</option></select></div><div class="field"><label>Timezone</label><select><option>Africa/Dar_es_Salaam (EAT)</option></select></div><div class="field full"><label>Cohort</label><select><option>Form 3 Biology A • 34 learners</option><option>Form 3 Biology B • 39 learners</option></select></div></div></section><section class="studio-panel"><div class="panel-title"><div><span class="eyebrow">4. Operations automation</span><h2>Reduce repetitive tutor administration</h2></div><span class="badge neutral">Automation rules</span></div><div class="studio-three"><div><h3>Before session</h3><div class="toggle-list"><label>Publish in-app announcement <input type="checkbox" checked></label><label>Send 24h reminder <input type="checkbox" checked></label><label>Send 30m reminder <input type="checkbox" checked></label><label>Open diagnostic poll <input type="checkbox" checked></label></div></div><div><h3>During session</h3><div class="toggle-list"><label>Capture attendance <input type="checkbox" checked></label><label>Sync polls/checks <input type="checkbox" checked></label><label>Record session <input type="checkbox" checked></label><label>Flag low participation <input type="checkbox" checked></label></div></div><div><h3>After session</h3><div class="toggle-list"><label>Import recording <input type="checkbox" checked></label><label>Generate transcript <input type="checkbox" checked></label><label>Score exit evidence <input type="checkbox" checked></label><label>Create intervention list <input type="checkbox" checked></label></div></div></div></section></main><aside class="sticky-panel live-builder-side"><div class="studio-panel"><div class="completion-ring"><strong>88%</strong><span>ready</span></div><h3>Session readiness</h3>${checkRows([['Outcome mapped','Complete'],['Evidence goal','Complete'],['Agenda','Complete'],['Provider','Google Meet'],['Exit assessment','Linked'],['Recording consent','Review']])}<button class="btn primary" data-action="live-schedule" style="width:100%;margin-top:12px">Schedule & publish</button></div><div class="studio-panel"><span class="eyebrow">Evidence integrity</span><h3>What TESEA will capture</h3><div class="summary-list"><span>Attendance<b>join / leave duration</b></span><span>Participation<b>poll + check responses</b></span><span>Exit evidence<b>5-question outcome check</b></span><span>Follow-up<b>relearn / practise / advance</b></span></div></div></aside></div>`}
function liveIntegrations(){return `<div class="studio-breadcrumb"><button class="link-btn" data-nav="live">Live lessons</button><span>›</span><strong>Meeting integrations</strong></div>`+head('Live infrastructure','Meeting integrations','Connect tutor-authorised Zoom, Microsoft Teams and Google Meet accounts. Production deployments should complete OAuth and token exchange server-side; this standalone prototype simulates connection state.',`<button class="btn" data-action="live-test-webhooks">Test webhook endpoint</button>`)+`<div class="integration-grid">${providerCard('zoom','Zoom','Create and update meetings, retrieve attendance/participants, and attach recordings when available.')}${providerCard('teams','Microsoft Teams','Create online meetings through Microsoft 365 and sync meeting metadata, attendance and recordings where enabled.')}${providerCard('meet','Google Meet','Create conference spaces through Google Workspace and sync meeting artefacts supported by the connected account.')}</div><div class="section grid2e"><div class="studio-panel"><span class="eyebrow">Secure connection pattern</span><h2>Backend OAuth broker</h2><div class="integration-flow"><div><span>1</span><strong>Tutor connects</strong><small>TESEA redirects to provider OAuth consent.</small></div><div><span>2</span><strong>Backend exchanges code</strong><small>Tokens stay server-side; browser stores no provider secrets.</small></div><div><span>3</span><strong>TESEA schedules</strong><small>Server creates provider meeting and stores external meeting ID.</small></div><div><span>4</span><strong>Webhooks reconcile</strong><small>Attendance, recording and meeting lifecycle events update TESEA.</small></div></div></div><div class="studio-panel"><span class="eyebrow">API configuration</span><h2>Production hand-off</h2><div class="contract-list"><div><code>POST /api/v1/live/integrations/:provider/connect</code><small>Begin OAuth authorization.</small></div><div><code>POST /api/v1/live/sessions</code><small>Create TESEA session + external meeting.</small></div><div><code>PATCH /api/v1/live/sessions/:id</code><small>Update agenda, time or provider settings.</small></div><div><code>POST /api/v1/live/webhooks/:provider</code><small>Receive verified provider lifecycle events.</small></div><div><code>GET /api/v1/live/sessions/:id/attendance</code><small>Normalize attendance into TESEA evidence operations.</small></div><div><code>POST /api/v1/live/sessions/:id/recording/import</code><small>Attach recording/transcript to content library.</small></div></div></div></div>`}
function liveEvidenceReview(){return `<div class="studio-breadcrumb"><button class="link-btn" data-nav="live">Live lessons</button><span>›</span><strong>Evidence review</strong></div>`+head('Post-session evidence','Live lesson evidence review','Convert attendance and activity into learning evidence without treating presence alone as competence.',`<button class="btn" data-action="live-export-evidence">Export evidence</button><button class="btn primary" data-action="live-create-interventions">Create interventions</button>`)+`<div class="kpis"><div class="kpi"><strong>0/0</strong><span>Attended</span></div><div class="kpi"><strong>0</strong><span>Exit checks submitted</span></div><div class="kpi"><strong>0</strong><span>Met evidence target</span></div><div class="kpi"><strong>0</strong><span>Need follow-up</span></div></div><div class="muted" style="padding:40px;text-align:center">No evidence recorded for this session yet.</div>`}
function tutorInsights(){return head('Evidence','Learner insights','Find exactly who needs help, on which outcome, and what intervention to assign.')+`<div class="muted" style="padding:40px;text-align:center">Insufficient data to generate learner insights.</div>`}
function questionBank(admin=true){
const stats=[['0','Approved questions'],['0','In review'],['0%','Outcome coverage'],['0','Imported this week']];
return head('Tutor question bank','Outcome-mapped Question Bank Engine','Ingest questions in bulk, validate curriculum metadata, generate new items with Rafiki AI and publish only after tutor review.',`<button class="btn" data-nav="question-bank-import">Bulk import</button><button class="btn primary" data-nav="question-bank-ai">AI Question Generator</button>`)+
`<div class="kpis">${stats.map(x=>`<div class="kpi"><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join('')}</div>`+
`<section class="section qbank-entry-grid"><article class="card qbank-entry"><span class="badge">Bulk ingestion</span><h2>Import an existing question library</h2><p>Map columns once, validate outcomes in bulk, detect duplicates and route exceptions to review.</p><div class="format-chips">${['CSV','XLSX','JSON','QTI 2.1','Moodle XML','DOCX','PDF'].map(x=>`<span>${x}</span>`).join('')}</div><button class="btn" data-nav="question-bank-import">Open import workspace</button></article><article class="card qbank-entry"><span class="badge">Rafiki AI</span><h2>Generate from curriculum outcomes</h2><p>Use an outcome blueprint to generate reviewed drafts with cognitive demand, difficulty, marks and answer rationale.</p><div class="ai-feature-row"><span>Outcome locked</span><span>Variant control</span><span>Mark scheme</span></div><button class="btn primary" data-nav="question-bank-ai">Open AI generator</button></article></section>`+
`<section class="section"><div class="section-head"><div><h2>Question inventory</h2><p>Filter and review source, outcome mapping, quality status and exposure.</p></div><button class="btn sm" data-action="qbank-export">Export selection</button></div><div class="card qbank-filterbar"><select><option>All forms</option></select><select><option>All subjects</option></select><select><option>All topics</option></select><select><option>All outcomes</option></select><select><option>All types</option></select><input placeholder="Search ID or question text…"></div><div class="muted" style="padding:60px;text-align:center"><h3>Question bank empty</h3><p>Import questions or use Rafiki AI to start building your outcome-mapped library.</p></div></section>`}

function questionBankImport(admin=false){
  return `<div class="studio-breadcrumb"><button class="link-btn" data-nav="question-bank">Question bank</button><span>›</span><strong>Bulk Ingestion Workspace</strong></div>`+
  head('Question bank ingestion','Bulk question import','Map spreadsheet columns or ingest standard question formats into outcome-mapped curriculum items.',`<button class="btn" data-action="qbank-download-template">Download CSV/XLSX template</button><button class="btn primary" data-action="qbank-run-import">Validate & stage batch</button>`)+
  `<div class="section grid2"><div class="card"><span class="badge">1. Select format</span><h2>Import source format</h2><div class="format-chips" style="margin:16px 0">${['CSV','XLSX','JSON','QTI 2.1','Moodle XML','DOCX / PDF'].map((x,i)=>`<button class="btn sm ${i===0?'primary':''}" data-action="qbank-format" data-format="${x}">${x}</button>`).join(' ')}</div><div class="drop-zone"><strong>Drop question files here</strong><span>or select files from your computer to parse outcome-linked items.</span><button class="btn" data-action="qbank-choose-file">Choose files</button></div></div><div class="card"><span class="badge ok">2. Column mapping</span><h2>Curriculum metadata mapper</h2><div class="form-grid" style="margin-top:12px"><div class="field"><label>Question text column</label><select><option>Column A (Question)</option></select></div><div class="field"><label>Learning outcome code</label><select><option>Column B (Outcome / LO)</option></select></div><div class="field"><label>Question type</label><select><option>Column C (Type: MCQ/Short/Structured)</option></select></div><div class="field"><label>Marks / Cognitive level</label><select><option>Column D (Marks & Demand)</option></select></div></div><button class="btn sm" data-action="qbank-save-profile" style="margin-top:14px">Save mapping profile</button></div></div>`+
  `<div class="section card"><div class="section-head"><div><h2>Import staging queue</h2><p>Items awaiting curriculum validation and tutor approval.</p></div></div><div class="muted" style="padding:40px;text-align:center">No pending import batches. Upload a question batch above to begin.</div></div>`;
}

function questionBankAI(admin=false){
  return `<div class="studio-breadcrumb"><button class="link-btn" data-nav="question-bank">Question bank</button><span>›</span><strong>Rafiki AI Question Generator</strong></div>`+
  head('Outcome-mapped AI generator','Rafiki AI Question Generator','Generate structured questions mapped to curriculum outcomes with auto-generated mark schemes, distractors, and difficulty calibration.',`<button class="btn" data-action="qbank-ai-balance">Auto-balance blueprint</button><button class="btn primary" data-action="qbank-ai-generate">Generate question batch</button>`)+
  `<div class="section grid2"><div class="card"><div class="form-grid"><div class="field"><label>Subject</label><select id="qbankSubject"><option>Biology</option><option>Mathematics</option><option>Chemistry</option><option>Physics</option><option>English Language</option></select></div><div class="field"><label>Form</label><select id="qbankForm"><option>Form 1</option><option>Form 2</option><option>Form 3</option><option>Form 4</option><option>Form 5</option><option>Form 6</option></select></div><div class="field full"><label>Topic / Competency</label><input id="qbankTopic" value="Coordination and reflex action" placeholder="Enter topic or learning outcome"></div><div class="field"><label>Question type</label><select id="qbankType"><option>Mixed types</option><option>Multiple Choice (MCQ)</option><option>Short response</option><option>Structured</option><option>Extended essay</option></select></div><div class="field"><label>Difficulty calibration</label><select id="qbankDifficulty"><option>Adaptive / Mixed</option><option>Foundation</option><option>Core</option><option>Challenge</option></select></div></div><button class="btn primary" data-action="qbank-ai-generate" style="margin-top:16px">✦ Generate with Rafiki</button></div><div class="card"><h3>Pedagogical guardrails</h3><p>Every generated question is pinned to an official NECTA curriculum outcome before appearing in the tutor review queue.</p><div class="list" style="margin-top:12px"><div class="list-row"><span class="badge ok">1</span><div class="grow"><strong>Outcome locking</strong><small>Questions cannot be generated without a verified syllabus outcome code.</small></div></div><div class="list-row"><span class="badge ok">2</span><div class="grow"><strong>Distractor rationale</strong><small>MCQ choices include diagnoses of common learner misconceptions.</small></div></div><div class="list-row"><span class="badge ok">3</span><div class="grow"><strong>Tutor approval</strong><small>Items remain in draft status until reviewed and verified by a tutor.</small></div></div></div></div></div>`+
  `<div class="section card"><div class="section-head"><div><h2>Generated drafts staging</h2><p>Review, edit, and approve items into your question inventory.</p></div></div><div id="qbankAiResults"><div class="muted" style="padding:40px;text-align:center">No generated drafts staged yet. Configure criteria above and click "Generate with Rafiki".</div></div></div>`;
}

function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function communitySeed(){const defaults={channels:[{id:'bio-f3-coordination',subject:'Biology',form:'Form 3',topic:'Coordination',members:0,tutor:'—'},{id:'math-f3-relations',subject:'Mathematics',form:'Form 3',topic:'Relations & Functions',members:0,tutor:'—'},{id:'eng-f2-writing',subject:'English Language',form:'Form 2',topic:'Functional Writing',members:0,tutor:'—'}],posts:[],reports:[],audit:[]};let data;try{data=JSON.parse(localStorage.getItem('tesea_community_store')||'null')}catch(e){};if(!data)data=defaults;data.posts=data.posts||[];data.reports=data.reports||[];data.audit=data.audit||[];return data}
function saveCommunity(x){localStorage.setItem('tesea_community_store',JSON.stringify(x))}
function communityCenter(mode){const c=communitySeed();const selected=c.channels[0];const isAdmin=mode==='admin',isTutor=mode==='tutor';const visiblePosts=isAdmin?c.posts:c.posts.filter(p=>(p.moderation||'visible')==='visible');const openReports=c.reports.filter(r=>r.state!=='Resolved');const flagged=c.posts.filter(p=>p.status==='flagged'&&(p.moderation||'visible')!=='deleted').length;const hidden=c.posts.filter(p=>p.moderation==='hidden').length;const deleted=c.posts.filter(p=>p.moderation==='deleted').length;if(isAdmin)return head('Community moderation','Moderate subject communities','Review Rafiki AI flags, tutor escalations and community discussions across all subject channels. Hide or delete inappropriate content with an auditable moderation decision.',`<button class="btn" data-action="community-policy">Moderation policy</button><button class="btn primary" data-action="community-review-ai">Review AI flags</button>`)+`<div class="kpis"><div class="kpi"><strong>${openReports.length}</strong><span>Open cases</span></div><div class="kpi"><strong>${flagged}</strong><span>AI / tutor flags</span></div><div class="kpi"><strong>${hidden}</strong><span>Hidden discussions</span></div><div class="kpi"><strong>${deleted}</strong><span>Deleted</span></div></div><div class="moderation-workspace"><main><section class="card"><div class="section-head"><div><h2>Moderation queue</h2><p>Prioritised by risk. Human moderator remains the final decision-maker.</p></div><div class="moderation-filter"><button class="btn sm soft">All</button><button class="btn sm">AI flags</button><button class="btn sm">Tutor escalations</button></div></div>${openReports.length?openReports.map(r=>{const p=c.posts.find(x=>String(x.id)===String(r.postId));return `<article class="moderation-case"><div class="moderation-case-top"><span class="severity ${r.severity}">${r.severity}</span><span class="badge ${r.risk>=80?'danger':'warn'}">Risk ${r.risk||0}%</span><span class="muted">${r.source||'Report'} • ${r.id}</span></div><h3>${r.reason}</h3><p class="moderation-quote">${p?escapeHtml(p.text):'Discussion content unavailable'}</p><div class="moderation-meta"><span><strong>Channel</strong>${r.channel}</span><span><strong>Author</strong>${p?p.author:'Unknown'}</span><span><strong>Visibility</strong>${p?(p.moderation||'visible'):'n/a'}</span><span><strong>Status</strong>${r.state}</span></div><div class="actions"><button class="btn sm" data-action="community-review-report" data-report="${r.id}" data-post="${r.postId}">Review</button>${p&&p.moderation!=='hidden'&&p.moderation!=='deleted'?`<button class="btn sm warn-btn" data-action="community-hide-post" data-post="${p.id}" data-report="${r.id}">Hide</button>`:''}${p&&p.moderation!=='deleted'?`<button class="btn sm danger-btn" data-action="community-delete-post" data-post="${p.id}" data-report="${r.id}">Delete</button>`:''}${p&&(p.moderation==='hidden'||p.moderation==='deleted')?`<button class="btn sm" data-action="community-restore-post" data-post="${p.id}" data-report="${r.id}">Restore</button>`:''}<button class="btn sm soft" data-action="community-dismiss-report" data-report="${r.id}">Dismiss flag</button></div></article>`}).join(''):'<div class="empty-state"><h3>Queue clear</h3><p>No unresolved community moderation cases.</p></div>'}</section><section class="card"><div class="section-head"><div><h2>Discussion inventory</h2><p>Cross-platform visibility state for Community Center content.</p></div></div><div class="table-scroll"><table><thead><tr><th>Discussion</th><th>Channel</th><th>Risk</th><th>Visibility</th><th>Actions</th></tr></thead><tbody>${c.posts.map(p=>{const ch=c.channels.find(x=>x.id===p.channel);return `<tr><td><strong>${escapeHtml(p.author)}</strong><small class="table-sub">${escapeHtml(p.text).slice(0,84)}${p.text.length>84?'…':''}</small></td><td>${ch?ch.subject+' • '+ch.topic:p.channel}</td><td>${p.risk||0}%</td><td><span class="badge ${p.moderation==='deleted'?'danger':p.moderation==='hidden'?'warn':'ok'}">${p.moderation||'visible'}</span></td><td><div class="actions">${p.moderation==='visible'?`<button class="link-btn" data-action="community-hide-post" data-post="${p.id}">Hide</button><button class="link-btn danger-text" data-action="community-delete-post" data-post="${p.id}">Delete</button>`:`<button class="link-btn" data-action="community-restore-post" data-post="${p.id}">Restore</button>`}</div></td></tr>`}).join('')}</tbody></table></div></section></main><aside><div class="card"><h3>Rafiki Community Moderator</h3><div class="ai-status"><span></span><strong>Active</strong></div><p>AI triages harassment, spam, unsafe content, off-topic promotion and suspected active-assessment answer sharing.</p><hr><div class="moderation-policy-summary"><span><strong>≥ 85%</strong>High priority review</span><span><strong>60–84%</strong>Moderator queue</span><span><strong>&lt; 60%</strong>Observe / sampling</span></div></div><div class="card"><h3>Enforcement model</h3><ul class="clean-list"><li><strong>Hide:</strong> immediately removes content from learner/tutor Community Center while retaining it for audit and appeal.</li><li><strong>Delete:</strong> removes content from normal community views and records the enforcement event.</li><li><strong>Restore:</strong> returns content to visible state after review.</li><li>All moderator actions write an audit event.</li></ul></div><div class="card"><h3>Recent moderation activity</h3>${(c.audit||[]).slice(0,6).map(a=>`<div class="audit-mini"><strong>${a.action}</strong><small>${a.detail} • ${a.time}</small></div>`).join('')||'<p class="muted">No moderator actions recorded yet.</p>'}</div></aside></div>`;return head('Community center',isTutor?'Teach, guide and discuss':'Learn together by subject and topic',isTutor?'Answer outcome-linked questions, seed discussions and guide peer learning without turning the community into a social feed.':'Ask subject questions, discuss concepts with peers and get guidance from verified tutors.',`<button class="btn" data-action="community-guidelines">Guidelines</button><button class="btn primary" data-action="community-new-post">Start discussion</button>`)+`<div class="community-layout"><aside class="card community-channels"><div class="section-head"><div><h3>Subject channels</h3><p>Outcome-linked spaces</p></div></div>${c.channels.map((x,i)=>`<button class="community-channel ${i===0?'active':''}" data-action="community-channel" data-channel="${x.id}"><span class="channel-code">${x.subject.slice(0,3).toUpperCase()}</span><span><strong>${x.subject}</strong><small>${x.form} • ${x.topic}</small></span><em>${x.members}</em></button>`).join('')}</aside><section><div class="card community-focus"><div><span class="badge">${selected.form} • ${selected.subject}</span><h2>${selected.topic}</h2><p>Discuss the current curriculum outcome, ask for clarification and share reasoning. Verified tutor: <strong>${selected.tutor}</strong>.</p></div><div class="community-stats"><span><strong>${selected.members}</strong><small>members</small></span><span><strong>${selected.members>0?'100%':'0%'}</strong><small>helpful replies</small></span><span><strong>${selected.members>0?'< 5 min':'—'}</strong><small>median tutor response</small></span></div></div><div class="card community-compose"><textarea id="communityPostText" rows="3" placeholder="Ask a focused question about ${selected.topic}…"></textarea><div class="compose-row"><div><button class="btn sm" data-action="community-attach">Attach diagram</button><button class="btn sm" data-action="community-link-outcome">Link outcome</button></div><button class="btn primary" data-action="community-publish">Post discussion</button></div><small>Rafiki Community Moderator checks safety, spam, answer-sharing and topic relevance before publishing.</small></div><div class="community-feed">${visiblePosts.filter(p=>p.channel===selected.id).map(p=>`<article class="card community-post"><div class="post-head"><div class="avatar">${p.author.split(' ').map(x=>x[0]).join('').slice(0,2)}</div><div class="grow"><strong>${escapeHtml(p.author)}</strong><small>${p.role==='tutor'?'Verified subject tutor':'Learner'} • ${p.time}</small></div>${p.status==='verified'?'<span class="badge">Tutor answer</span>':''}</div><p>${escapeHtml(p.text)}</p><div class="post-actions"><button class="link-btn" data-action="community-like">Helpful ${p.likes}</button><button class="link-btn" data-action="community-reply">Reply ${p.replies}</button><button class="link-btn" data-action="community-rafiki-explain">Ask Rafiki to explain</button><button class="link-btn" data-action="community-report" data-post="${p.id}">Report</button></div></article>`).join('')||'<div class="card"><p class="muted">No visible discussions in this channel.</p></div>'}</div></section><aside><div class="card"><h3>Rafiki Community Moderator</h3><p>AI assists moderators by detecting harassment, spam, unsafe content, off-topic posts and likely answer-sharing during active assessments.</p><div class="ai-status"><span></span><strong>Active</strong></div><hr><h4>Community rules</h4><ul class="clean-list"><li>Stay on the mapped subject/topic.</li><li>Explain reasoning; do not paste active assessment answers.</li><li>Be respectful and evidence-focused.</li><li>Tutor guidance is visibly verified.</li></ul></div>${isTutor?`<div class="card"><h3>Tutor controls</h3><button class="btn full" data-action="community-pin">Pin model explanation</button><button class="btn full" data-action="community-prompt">Post discussion prompt</button><button class="btn full" data-action="community-escalate">Escalate to Super Admin</button></div>`:''}</aside></div>`}
function adminPage(p){if(p==='dashboard')return adminDashboard();if(p==='curriculum')return adminCurriculum();if(p==='users')return adminUsers();if(p==='subscriptions')return adminSubscriptions();if(p==='community')return communityCenter('admin');if(p==='question-bank')return questionBank(true);if(p==='question-bank-import')return questionBankImport(true);if(p==='question-bank-ai')return questionBankAI(true);if(p==='announcements')return adminAnnouncements(true);if(p==='content-governance')return contentGovernance();if(p==='analytics')return adminAnalytics();if(p==='settings')return platformSettings();return adminDashboard()}
function getPlatformLearners() {
  const userMap = {};
  if (state.auth) {
    const isLearner = !isAdminAuth(state.auth) && (state.role === 'learner' || state.auth.role === 'learner');
    const email = (state.auth.email || state.auth.name || 'Current User').toLowerCase();
    userMap[email] = {
      name: state.auth.name || 'Current User',
      email: state.auth.email || '',
      role: isLearner ? 'Learner' : roleName(state.role),
      isLearner: isLearner || state.auth.role === 'learner',
      school: 'Independent',
      subscription: (state.subscription && state.subscription.plan) || 'Free Explorer',
      status: 'Active',
      sessions: 1
    };
  }
  
  (platformStore.events || []).forEach(e => {
    const email = extractEventEmail(e);
    if (email) {
      const isL = (e.actor || '').toLowerCase() === 'learner' || (!ADMIN_EMAILS.includes(email));
      if (!userMap[email]) {
        userMap[email] = {
          name: email.includes('@') ? email.split('@')[0] : email,
          email: email.includes('@') ? email : '',
          role: isL ? 'Learner' : roleName(e.actor || 'admin'),
          isLearner: isL,
          school: 'Independent',
          subscription: (state.subscription && state.subscription.plan) || 'Free Explorer',
          status: 'Active',
          sessions: 1
        };
      } else {
        userMap[email].sessions = (userMap[email].sessions || 1) + 1;
        if (isL) userMap[email].isLearner = true;
      }
    }
  });

  return Object.values(userMap);
}

function adminDashboard(){
  const allUsers = getPlatformLearners();
  const learnerUsers = allUsers.filter(u => u.isLearner || u.role === 'Learner');
  const activeLearnersCount = Math.max(learnerUsers.length, Object.keys(state.lessonProgress || {}).length > 0 || state.quizHistory.length > 0 ? 1 : 0);
  const paidCount = allUsers.filter(u => u.subscription && u.subscription !== 'Free Explorer').length;
  
  const medianMastery = calculateOverallMastery();
  
  // Calculate adaptive curriculum progress from real learner usage
  const activeSubjectsCount = Object.values(state.progress || {}).filter(x => x > 0).length;
  const subjectReadiness = Math.round((activeSubjectsCount / SUBJECTS.length) * 100);
  
  let totalLessonsDone = 0;
  Object.values(state.lessonProgress || {}).forEach(topics => {
    Object.values(topics || {}).forEach(modes => {
      totalLessonsDone += Object.values(modes || {}).filter(Boolean).length;
    });
  });
  const lessonCoverageRate = Math.min(100, Math.round(totalLessonsDone > 0 ? Math.min(100, totalLessonsDone * 12) : 0));
  
  const quizzesTaken = state.quizHistory ? state.quizHistory.length : 0;
  const quizPasses = state.quizHistory ? state.quizHistory.filter(q => (q.score || 0) >= 70).length : 0;
  const assessmentPassRate = quizzesTaken > 0 ? Math.round((quizPasses / quizzesTaken) * 100) : 0;
  
  const competenciesDemonstrated = calculateCompetenciesDemonstrated();
  const comm = communitySeed();
  const openModerationCases = (comm.reports || []).filter(r => r.state !== 'Resolved').length;

  return head('Super Admin','Platform operations dashboard','Real-time metrics adaptive to learner progress, demonstrated competencies and active sessions.',`<button class="btn" data-nav="analytics">Analytics</button><button class="btn primary" data-nav="curriculum">Curriculum studio</button>`)+
    `<div class="kpis">
      <div class="kpi"><strong>${activeLearnersCount}</strong><span>Active learners</span></div>
      <div class="kpi"><strong>${paidCount}</strong><span>Paid subscriptions</span></div>
      <div class="kpi"><strong>${medianMastery}%</strong><span>Median mastery</span></div>
      <div class="kpi"><strong>${competenciesDemonstrated}</strong><span>Demonstrated competencies</span></div>
    </div>
    <div class="section grid2">
      <div class="card">
        <h3>Learner Competence & Curriculum Usage</h3>
        <p class="muted">Live telemetry computed from learner lesson progress and mastery checkpoints.</p>
        <div style="margin-top:14px">
          <div class="progress-meta"><strong>Active Subject Pathways</strong><span>${activeSubjectsCount} of 27 (${subjectReadiness}%)</span></div>
          <div class="progress"><span style="width:${Math.max(subjectReadiness, 4)}%"></span></div>
        </div>
        <div style="margin-top:14px">
          <div class="progress-meta"><strong>Lesson Formats Completed</strong><span>${totalLessonsDone} sessions completed (${lessonCoverageRate}%)</span></div>
          <div class="progress"><span style="width:${Math.max(lessonCoverageRate, 2)}%"></span></div>
        </div>
        <div style="margin-top:14px">
          <div class="progress-meta"><strong>Assessment Mastery Pass Rate</strong><span>${quizPasses}/${quizzesTaken} checks (${assessmentPassRate}%)</span></div>
          <div class="progress"><span style="width:${Math.max(assessmentPassRate, 0)}%"></span></div>
        </div>
        <div style="margin-top:14px">
          <div class="progress-meta"><strong>Mastery Threshold Achieved (≥80%)</strong><span>${competenciesDemonstrated} subjects</span></div>
          <div class="progress"><span style="width:${Math.min(100, competenciesDemonstrated * 15)}%"></span></div>
        </div>
      </div>
      <div class="card">
        <h3>Operational Attention & Learner Signals</h3>
        <div class="list">
          <div class="list-row">
            <span class="badge ${openModerationCases > 0 ? 'warn' : 'ok'}">${openModerationCases}</span>
            <div class="grow"><strong>Community moderation queue</strong><small>${openModerationCases > 0 ? 'Unresolved community reports' : 'All subject discussions clean'}</small></div>
          </div>
          <div class="list-row">
            <span class="badge ${calculateCompetenciesToReinforce() > 0 ? 'warn' : 'ok'}">${calculateCompetenciesToReinforce()}</span>
            <div class="grow"><strong>Subjects needing reinforcement</strong><small>${calculateCompetenciesToReinforce() > 0 ? 'Learner score <80% in active subjects' : 'All active subjects on track'}</small></div>
          </div>
          <div class="list-row">
            <span class="badge ok">${quizzesTaken}</span>
            <div class="grow"><strong>Evidence checkpoints attempted</strong><small>${quizzesTaken > 0 ? 'Verified quiz submissions recorded' : 'Awaiting initial quiz submission'}</small></div>
          </div>
          <div class="list-row">
            <span class="badge neutral">${(state.subscription && state.subscription.plan) || 'Free Explorer'}</span>
            <div class="grow"><strong>Current user plan tier</strong><small>Rafiki AI quota: ${(state.subscription && state.subscription.rafikiUsed) || 0}/${(state.subscription && state.subscription.rafikiLimit) || 50}</small></div>
          </div>
        </div>
      </div>
    </div>`;
}
function adminCurriculum(){return head('Academic architecture','Curriculum studio','Manage Form 1–6 subjects, topics, sub-topics, outcomes, prerequisite rules, lesson coverage and assessment evidence.',`<button class="btn" data-action="export-curriculum">Export map</button><button class="btn primary" data-action="add-curriculum">Add curriculum item</button>`)+`<div class="grid2"><div><div class="subject-grid">${SUBJECTS.slice(0,12).map(s=>`<div class="subject-card" data-action="edit-curriculum"><div class="subject-icon">${s[1]}</div><h3>${s[0]}</h3><p>6 forms • outcomes • resources • assessments</p></div>`).join('')}</div></div><div class="muted" style="padding:40px;text-align:center"><h3>Select a subject</h3><p>Configure outcomes, prerequisites and mastery rules for your academic framework.</p></div></div>`}
function adminUsers(){
  const users = getPlatformLearners();
  return head('Identity & access','Users and roles','Manage learners, tutors, admins, schools, permissions, status and access scope.',`<button class="btn" data-action="invite-user">Invite user</button><button class="btn primary" data-action="create-user">Create user</button>`)+`<div class="table-wrap"><table class="table"><thead><tr><th>User</th><th>Role</th><th>School</th><th>Sessions</th><th>Status</th><th></th></tr></thead><tbody>${users.length ? users.map(x=>`<tr><td><strong>${escapeActivityHtml(x.name)}</strong><small class="table-sub">${escapeActivityHtml(x.email || x.role)}</small></td><td>${escapeActivityHtml(x.role)}</td><td>${escapeActivityHtml(x.school)}</td><td><span class="badge neutral">${x.sessions} session${x.sessions > 1 ? 's' : ''}</span></td><td><span class="badge ok">${escapeActivityHtml(x.status)}</span></td><td><button class="btn sm" data-action="edit-user">Manage</button></td></tr>`).join('') : '<tr><td colspan="6" class="muted" style="padding:40px;text-align:center">No users registered yet.</td></tr>'}</tbody></table></div>`;
}
function adminSubscriptions(){
  const users = getPlatformLearners();
  const freeCount = users.filter(u => !u.subscription || u.subscription === 'Free Explorer').length;
  const monthlyCount = users.filter(u => u.subscription === 'Monthly Learner').length;
  const annualCount = users.filter(u => u.subscription === 'Annual Learner').length;
  const paidCount = monthlyCount + annualCount;
  const arr = (monthlyCount * 12000 * 12) + (annualCount * 120000);

  return head('Revenue operations','Subscription management','Control plans, entitlements, renewals, grace periods, Rafiki allowances and content access.',`<button class="btn" data-action="export-subscriptions">Export</button><button class="btn primary" data-action="create-plan">Create plan</button>`)+
    `<div class="kpis">
      <div class="kpi"><strong>${paidCount}</strong><span>Active paid learners</span></div>
      <div class="kpi"><strong>TZS ${arr.toLocaleString()}</strong><span>Annualised recurring revenue</span></div>
      <div class="kpi"><strong>${freeCount}</strong><span>Free Explorer tier</span></div>
      <div class="kpi"><strong>100%</strong><span>Payment integrity</span></div>
    </div>
    <div class="section grid2">
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Plan</th><th>Members</th><th>Price</th><th>Status</th><th></th></tr></thead>
          <tbody>
            <tr><td>Free Explorer</td><td>${freeCount}</td><td>TZS 0</td><td><span class="badge ok">Active</span></td><td><button class="btn sm" data-action="edit-plan">Edit</button></td></tr>
            <tr><td>Monthly Learner</td><td>${monthlyCount}</td><td>TZS 12,000</td><td><span class="badge ok">Active</span></td><td><button class="btn sm" data-action="edit-plan">Edit</button></td></tr>
            <tr><td>Annual Learner</td><td>${annualCount}</td><td>TZS 120,000</td><td><span class="badge ok">Active</span></td><td><button class="btn sm" data-action="edit-plan">Edit</button></td></tr>
          </tbody>
        </table>
      </div>
      <div class="card">
        <h3>Entitlement policy</h3>
        ${[['Interactive text','All paid plans'],['Video + audio + PDF','All paid plans'],['Short lessons','All paid plans'],['Live lessons','Annual + school'],['Rafiki AI','Metered by plan'],['Offline downloads','Annual + school']].map(x=>`<div class="list-row"><div class="grow"><strong>${x[0]}</strong><small>${x[1]}</small></div><button class="btn sm" data-action="configure-entitlement">Configure</button></div>`).join('')}
      </div>
    </div>`;
}
function adminAnnouncements(isAdmin){return head('Communication engine','Announcement management','Create targeted in-app announcements by audience, form, subject, subscription status or school.',`<button class="btn primary" data-action="new-announcement">Create announcement</button>`)+announcementCards(4)+`<div class="section"><div class="card"><h3>Delivery controls</h3><div class="grid"><div><strong>Audience targeting</strong><p>Learner, tutor, admin, school or subscription segment.</p></div><div><strong>Priority</strong><p>Academic, operational, urgent or informational.</p></div><div><strong>Expiry</strong><p>Automatically remove time-sensitive notices.</p></div></div></div></div>`}
function contentGovernance(){
  const activeSubs = Object.values(state.progress || {}).filter(x => x > 0).length;
  return head('Quality assurance','Content governance','Academic review, syllabus mapping, accessibility checks and outcome governance.',`<button class="btn primary" data-action="review-queue">Open review queue</button>`)+
    `<div class="kpis">
      <div class="kpi"><strong>27</strong><span>NECTA syllabus subjects</span></div>
      <div class="kpi"><strong>${activeSubs}</strong><span>Active learner pathways</span></div>
      <div class="kpi"><strong>0</strong><span>Content issues flagged</span></div>
      <div class="kpi"><strong>100%</strong><span>Outcome-aligned</span></div>
    </div>
    <div class="section"><div class="card"><h3>Curriculum Assurance</h3><p>All 27 subject frameworks adhere to competency-based learning standards with outcome progression and interactive checkpoints.</p></div></div>`;
}
function adminAnalytics(){
  const users = getPlatformLearners();
  const overallMastery = calculateOverallMastery();
  const quizzesTaken = state.quizHistory ? state.quizHistory.length : 0;
  const quizPasses = state.quizHistory ? state.quizHistory.filter(q => (q.score || 0) >= 70).length : 0;
  const assessmentRate = quizzesTaken > 0 ? Math.round((quizPasses / quizzesTaken) * 100) : 0;
  
  let totalLessonsDone = 0;
  Object.values(state.lessonProgress || {}).forEach(topics => {
    Object.values(topics || {}).forEach(modes => {
      totalLessonsDone += Object.values(modes || {}).filter(Boolean).length;
    });
  });
  const estStudyMinutes = (totalLessonsDone * 10) + (quizzesTaken * 5);
  const activeSubs = Object.entries(state.progress || {}).filter(([k,v]) => v > 0);

  return head('Platform intelligence','Analytics','Track real-time learning outcomes, engagement quality, content effectiveness and learner mastery.')+
    `<div class="kpis">
      <div class="kpi"><strong>${users.length ? '100%' : '0%'}</strong><span>Learner activation</span></div>
      <div class="kpi"><strong>${overallMastery}%</strong><span>Median mastery</span></div>
      <div class="kpi"><strong>${assessmentRate}%</strong><span>Assessment completion</span></div>
      <div class="kpi"><strong>${estStudyMinutes} min</strong><span>Total focused study</span></div>
    </div>
    <div class="section grid2">
      <div class="card">
        <h3>Subject Mastery Telemetry</h3>
        ${activeSubs.length ? activeSubs.map(([code, val]) => {
          const sObj = SUBJECTS.find(s => s[1] === code);
          const name = sObj ? sObj[0] : code;
          return `<div style="margin-top:12px">
            <div class="progress-meta"><strong>${name} (${code})</strong><span>${val}% mastery</span></div>
            <div class="progress"><span style="width:${val}%"></span></div>
          </div>`;
        }).join('') : '<p class="muted">Learner has not completed any subject checkpoints yet. Data will appear as checkpoints are completed.</p>'}
      </div>
      <div class="card">
        <h3>Recent Evidence Checkpoints</h3>
        <div class="list">
          ${(state.quizHistory || []).slice(-5).reverse().map(q => `
            <div class="list-row">
              <span class="badge ${q.score >= 80 ? 'ok' : q.score >= 50 ? 'warn' : 'danger'}">${q.score}%</span>
              <div class="grow"><strong>${q.subject} • ${q.topic}</strong><small>${q.correct}/${q.total} questions correct • ${q.date || 'Recent'}</small></div>
            </div>
          `).join('') || '<p class="muted">No quiz checkpoints submitted yet.</p>'}
        </div>
      </div>
    </div>`;
}
function platformSettings(){return head('Configuration','Platform settings','Manage learning defaults, mastery thresholds, theme, localisation, integrations and security.',`<button class="btn primary" data-action="save-settings">Save changes</button>`)+`<div class="grid2"><div class="card"><h3>Learning rules</h3><div class="form-grid"><div class="field"><label>Progression threshold</label><input value="70%"></div><div class="field"><label>Competency mastery threshold</label><input value="80%"></div><div class="field"><label>Default language</label><select><option>English</option><option>Kiswahili</option></select></div><div class="field"><label>Academic framework</label><select><option>NECTA CBL</option></select></div></div></div><div class="card"><h3>Integrations</h3><div class="list"><div class="list-row"><div class="grow"><strong>Payment gateway</strong><small>Production credential required</small></div><span class="badge warn">Configure</span></div><div class="list-row"><div class="grow"><strong>Live lesson provider</strong><small>Video SDK / provider</small></div><span class="badge warn">Configure</span></div><div class="list-row"><div class="grow"><strong>Rafiki AI service</strong><small>Question generation and tutoring</small></div><span class="badge ok">Prototype</span></div></div></div></div>`}
function crmPage(p){if(p==='dashboard')return crmDashboard();if(p==='leads')return crmLeads();if(p==='schools')return crmSchools();if(p==='campaigns')return crmCampaigns();if(p==='support')return crmSupport();if(p==='subscriptions')return adminSubscriptions();if(p==='reports')return crmReports();return crmDashboard()}

function crmLeads(){
  const d = crmStore();
  return head('CRM','Leads','Prospective learners, parents and school contacts with next-action tracking.',`<button class="btn primary" data-action="crm-new-lead">Add lead</button>`)+`<div class="table-wrap"><table class="table"><thead><tr><th>Name</th><th>Type</th><th>Interest</th><th>Stage</th><th>Next action</th><th></th></tr></thead><tbody>${d.leads.length ? d.leads.map(x=>`<tr><td><strong>${x.name}</strong></td><td>${x.type}</td><td>${x.interest}</td><td><span class="badge">${x.stage}</span></td><td>${x.next}</td><td><button class="btn sm" data-action="open-lead" data-id="${x.id}">Open</button></td></tr>`).join('') : '<tr><td colspan="6" class="muted" style="padding:40px;text-align:center">No leads captured yet.</td></tr>'}</tbody></table></div>`}
function crmSchools(){
  const d = crmStore();
  const schools = d.leads.filter(x=>x.type==='School').concat(d.customers.filter(x=>x.segment==='School'));
  return head('B2B','Schools','Manage school accounts, seats, administrators, adoption and renewal readiness.',`<button class="btn primary" data-action="crm-new-lead">Add school</button>`)+`<div class="grid">${schools.length ? schools.map(x=>`<div class="card"><span class="badge">${x.interest||x.plan}</span><h3 style="margin-top:10px">${x.name}</h3><p>${x.stage||x.status}</p><button class="btn sm" style="margin-top:12px" data-action="open-record">Open account</button></div>`).join('') : '<div class="muted" style="padding:40px;text-align:center">No school accounts found.</div>'}</div>`}
function crmCampaigns(){
  const d = crmStore();
  return head('Growth','Campaigns','Track targeted enrollment and relationship campaigns.',`<button class="btn primary" data-action="crm-new-campaign">Create campaign</button>`)+`<div class="table-wrap"><table class="table"><thead><tr><th>Campaign</th><th>Audience</th><th>Sent</th><th>Conversion</th><th>Status</th></tr></thead><tbody>${d.campaigns.length ? d.campaigns.map(x=>`<tr><td><strong>${x.name}</strong></td><td>${x.audience}</td><td>${x.sent}</td><td>${x.conversion}%</td><td><span class="badge ok">${x.status}</span></td></tr>`).join('') : '<tr><td colspan="5" class="muted" style="padding:40px;text-align:center">No active campaigns.</td></tr>'}</tbody></table></div>`}
function crmSupport(){
  return head('Customer success','Support cases','Resolve access, billing and learning-support issues with clear ownership and SLA status.',`<button class="btn primary" data-action="new-case">Create case</button>`)+`<div class="muted" style="padding:80px;text-align:center"><h3>Support queue clear</h3><p>No active support cases requiring immediate intervention.</p></div>`}
function crmReports(){
  return head('CRM analytics','Reports','Enrollment, conversion, subscription, school adoption and support performance.')+`<div class="kpis"><div class="kpi"><strong>0%</strong><span>Trial to paid</span></div><div class="kpi"><strong>0 days</strong><span>School sales cycle</span></div><div class="kpi"><strong>0%</strong><span>Cases within SLA</span></div><div class="kpi"><strong>0%</strong><span>Renewal intent</span></div></div><div class="muted" style="padding:40px;text-align:center">Accumulate CRM activity to generate relationship analytics.</div>`}
function roleName(r){return {learner:'Learner',tutor:'Tutor',admin:'Super Admin',crm:'CRM'}[r]}
function icon(x){return {dashboard:'⌂',subjects:'▦',path:'→',lesson:'▤',assessments:'✓',progress:'◔',rafiki:'✦',announcements:'◉',subscription:'¤',classes:'👥',content:'▣',live:'●','learner-insights':'◫','question-bank':'?',curriculum:'⌘',users:'👤',subscriptions:'¤','content-governance':'✓',analytics:'◔',settings:'⚙',leads:'◎',schools:'▥',campaigns:'⌁',support:'?',reports:'▤'}[x]||'•'}

const _learnerDashboard=learnerDashboard;learnerDashboard=function(){return _learnerDashboard()+integrationPanel('learner')};
const _tutorDashboard=tutorDashboard;tutorDashboard=function(){return _tutorDashboard()+integrationPanel('tutor')};
const _adminDashboard=adminDashboard;adminDashboard=function(){return _adminDashboard()+integrationPanel('admin')};

function bind(){document.querySelectorAll('[data-nav]').forEach(el=>el.onclick=()=>{state.page=el.dataset.nav;save();routeTo(el.dataset.nav)});document.querySelectorAll('[data-subject]').forEach(el=>el.onclick=()=>{state.subject=el.dataset.subject;save();routeTo('course')});document.querySelectorAll('[data-topic]').forEach(el=>el.onclick=()=>{state.topic=+el.dataset.topic;save();routeTo('lesson')});document.querySelectorAll('[data-mode]').forEach(el=>el.onclick=()=>{state.lessonMode=el.dataset.mode;save();app()});document.querySelectorAll('[data-answer]').forEach(el=>el.onclick=()=>{const [q,a]=el.dataset.answer.split(':').map(Number);state.quizAnswers[q]=a;app()});document.querySelectorAll('[data-action]').forEach(el=>el.onclick=()=>action(el.dataset.action,el));const gs=document.querySelector('#globalSearch');if(gs)gs.onkeydown=e=>{if(e.key==='Enter'){toast(`Search ready for “${gs.value}” — showing curriculum matches in this prototype.`);state.page=state.role==='learner'?'subjects':state.role==='admin'?'curriculum':'dashboard';save();app()}};}
function action(a,el){if(['community-hide-post','community-delete-post','community-restore-post','community-dismiss-report'].includes(a)){const c=communitySeed(),pid=el.dataset.post?String(el.dataset.post):'',rid=el.dataset.report||'';if(a==='community-dismiss-report'){const r=c.reports.find(x=>x.id===rid);if(r)r.state='Resolved';c.audit.unshift({action:'Flag dismissed',detail:rid||'Community case',time:new Date().toLocaleString()});saveCommunity(c);recordActivity('Community moderation flag dismissed',rid,'admin');app();toast('Moderation flag dismissed and audit event recorded.');return}const p=c.posts.find(x=>String(x.id)===pid);if(!p){toast('Discussion could not be found.');return}const next=a==='community-hide-post'?'hidden':a==='community-delete-post'?'deleted':'visible';p.moderation=next;if(a==='community-delete-post')p.status='deleted';else if(a==='community-restore-post'&&p.status==='deleted')p.status='clean';const r=c.reports.find(x=>x.id===rid||String(x.postId)===pid);if(r)r.state=next==='visible'?'Resolved':'Actioned';const label=next==='hidden'?'Discussion hidden':next==='deleted'?'Discussion deleted':'Discussion restored';c.audit.unshift({action:label,detail:`${p.author} • post ${p.id}`,time:new Date().toLocaleString()});saveCommunity(c);recordActivity(label,`Community post ${p.id}`,'admin');app();toast(label+'. Community Center visibility updated.');return}if(a==='community-report'){const c=communitySeed(),pid=el.dataset.post?String(el.dataset.post):'',p=c.posts.find(x=>String(x.id)===pid);if(p){const id='R-'+Date.now().toString().slice(-6);const ch=c.channels.find(x=>x.id===p.channel);c.reports.unshift({id,postId:p.id,reason:'Learner/tutor community report',channel:ch?`${ch.subject} • ${ch.topic}`:p.channel,severity:'medium',source:state.role==='tutor'?'Tutor report':'Learner report',state:'Open',risk:p.risk||60});p.status='flagged';saveCommunity(c);recordActivity('Community post reported',id,state.role);toast('Report sent to Super Admin moderation.');}return}if(a==='community-escalate'){const c=communitySeed();const p=c.posts.find(x=>(x.moderation||'visible')==='visible');if(p){const id='R-'+Date.now().toString().slice(-6);const ch=c.channels.find(x=>x.id===p.channel);c.reports.unshift({id,postId:p.id,reason:'Tutor escalation for moderator review',channel:ch?`${ch.subject} • ${ch.topic}`:p.channel,severity:'high',source:'Tutor escalation',state:'Open',risk:85});p.status='flagged';saveCommunity(c);recordActivity('Tutor escalation created',id,'tutor');toast('Escalated to Super Admin moderation queue.');}return}if(a==='class-open'){const d=classStore();d.selected=el.dataset.id||d.selected;saveClassStore(d);state.page='class-manage';save();app();return}if(a==='create-class'){state.page='class-create';save();app();return}if(a==='class-create-save'){const d=classStore(),name=(document.querySelector('#className')?.value||'New class').trim(),form=document.querySelector('#classForm')?.value||'Form 3',subject=document.querySelector('#classSubject')?.value||'Biology',section=document.querySelector('#classSection')?.value||'A',term=document.querySelector('#classTerm')?.value||'Term 2 • 2026';const code=(SUBJECTS.find(x=>x[0]===subject)||['','BIO'])[1];const id='CLS-'+code+'-'+Date.now();d.classes.unshift({id,name,subject,code,form,section,learners:0,mastery:0,attendance:0,status:'Active',term,outcomes:5,live:0,assessments:0});d.selected=id;saveClassStore(d);recordActivity('Class created',name+' • '+subject+' • '+form,'tutor');state.page='class-manage';save();app();toast('Class created and connected to tutor operations.');return}if(['class-import-roster','class-bulk-manage','class-roster-method','class-download-roster-template','class-edit','class-open-assignment','class-duplicate-assignment','class-assignment-results'].includes(a)){const m={'class-import-roster':'Roster import centre opened','class-bulk-manage':'Bulk class management opened','class-roster-method':'Roster ingestion method selected','class-download-roster-template':'Roster CSV/XLSX template prepared','class-edit':'Class settings editor opened','class-open-assignment':'Class assessment management opened','class-duplicate-assignment':'Assessment assignment duplicated','class-assignment-results':'Outcome evidence report opened'};recordActivity(m[a],'Tutor Class Management','tutor');toast(m[a]);return}if(['class-new-assignment','class-new-test','class-new-exam','class-quick-exam'].includes(a)){const type=a==='class-new-assignment'?'assignment':a==='class-new-test'?'test':'exam';state.page='assessment-'+type;save();app();setTimeout(()=>toast('Builder opened with the selected class as the delivery cohort.'),40);return}if(a==='class-quick-live'){state.page='live-studio';save();app();setTimeout(()=>toast('Live lesson studio opened with the selected class preassigned.'),40);return}if(a==='back'){routeBack();return}if(a==='explore-demo'){state.auth={id:'demo-learner',name:'Demo Learner',email:'demo@tesea.local',provider:'demo'};state.role='learner';state.page='dashboard';recordActivity('Demo session started','Learner workspace opened from landing page.','learner');save();app();return}if(a==='all-subjects'){state.auth=state.auth||{id:'guest',name:'Guest Learner',provider:'guest'};state.role='learner';state.page='subjects';save();app();return}if(a==='subject-preview'){state.subject=el.dataset.code||'BIO';state.role='learner';state.page='course';save();app();return}if(a==='auth-reset-password'){const em=document.querySelector('#authEmail')?.value||'';modal('Reset password','Enter your email to receive a password reset link',`<div class="form-grid"><div class="field full"><label>Email address</label><input id="resetEmail" type="email" value="${em}" placeholder="you@example.com"></div></div>`,`<button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="auth-send-reset">Send reset link</button>`);return}
if(a==='auth-send-reset'){const em=(document.querySelector('#resetEmail')?.value||'').trim();if(!em||!em.includes('@')){toast('Please enter a valid email address.');return}if(window.TESEA_FIREBASE&&window.TESEA_FIREBASE.resetPassword){window.TESEA_FIREBASE.resetPassword(em).then(()=>{closeModal();});}else{toast('Firebase service is not available.');}return}
if(a==='signin-submit'||a==='signup-submit'){const email=(document.querySelector('#authEmail')?.value||'').trim(),password=document.querySelector('#authPassword')?.value||'',name=(document.querySelector('#authName')?.value||email.split('@')[0]||'Learner').trim(),form=document.querySelector('#authForm')?.value||'Form 3';if(!email||!email.includes('@')||password.length<6){toast('Please enter a valid email address and password with at least 6 characters.');return}const submitBtn=el||document.querySelector(a==='signup-submit'?'[data-action="signup-submit"]':'[data-action="signin-submit"]');if(submitBtn){submitBtn.disabled=true;submitBtn.textContent=a==='signup-submit'?'Creating account...':'Signing in...';}if(window.TESEA_FIREBASE&&(a==='signup-submit'?window.TESEA_FIREBASE.signUpWithEmail:window.TESEA_FIREBASE.signInWithEmail)){const p=a==='signup-submit'?window.TESEA_FIREBASE.signUpWithEmail(email,password,name,form):window.TESEA_FIREBASE.signInWithEmail(email,password);p.catch(err=>{console.error('Firebase Auth error:',err);if(submitBtn){submitBtn.disabled=false;submitBtn.textContent=a==='signup-submit'?'Create account':'Sign in';}});return}const endpoint=a==='signup-submit'?'/auth/signup':'/auth/signin';const payload={email,password,name,form};(window.TESEA_API?TESEA_API.request(endpoint,{method:'POST',body:payload}):Promise.resolve({user:{id:'local-'+Date.now(),name,email,role:'learner'},token:'local-demo-token'})).then(res=>{state.auth={...(res.user||{id:'local-'+Date.now(),name,email,role:'learner'}),token:res.token||'',refreshToken:res.refreshToken||'',provider:'email'};state.role=state.auth.role||'learner';state.page='dashboard';recordActivity(a==='signup-submit'?'Account created':'Signed in',email,state.role);save();app();}).catch(err=>{if(submitBtn){submitBtn.disabled=false;submitBtn.textContent=a==='signup-submit'?'Create account':'Sign in';}toast(err.message||'Authentication failed.');});return}
if(a==='oauth-google'||a==='oauth-microsoft'){if(a==='oauth-google'&&window.TESEA_FIREBASE){const btn=el||document.querySelector('[data-action="oauth-google"]');if(btn){btn.disabled=true;btn.innerHTML='<span class="oauth-mark">G</span>Connecting Google...';}window.TESEA_FIREBASE.signInWithGoogle().catch(err=>{console.error('Google sign-in error:',err);if(btn){btn.disabled=false;btn.innerHTML='<span class="oauth-mark">G</span>Continue with Google';}});return}const provider=a==='oauth-google'?'google':'microsoft';if(window.TESEA_API&&TESEA_API.oauthConfigured(provider)){TESEA_API.startOAuth(provider);return}state.auth={id:provider+'-demo',name:provider==='google'?'Google Learner':'Microsoft Learner',email:'learner@demo.local',provider,role:'learner'};state.role='learner';state.page='dashboard';recordActivity('Social sign-in',provider+' demo OAuth session created.','learner');save();routeTo('dashboard');toast(provider[0].toUpperCase()+provider.slice(1)+' demo sign-in complete.');return}if(a==='logout'){if(window.TESEA_FIREBASE)TESEA_FIREBASE.signOutUser();else{recordActivity('Signed out',(state.auth&&state.auth.email)||'local session',state.role);state.auth=null;state.page='landing';save();app()}return}if(a==='assessment-tab'){toast('Assessment view opened. Use the active assessment pathway to continue.');return}if(a==='review-assessment'||a==='mark-submission'){recordActivity('Assessment review opened','Tutor opened assessment evidence workflow.','tutor');toast(a==='mark-submission'?'Submission marking opened.':'Assessment review opened.');return}if(a==='open-record'){toast('Record detail opened.');return}if(a==='theme'){state.theme=state.theme==='light'?'dark':'light';save();app();return}if(a==='menu'){document.querySelector('#sidebar')?.classList.toggle('open');return}if(a==='roles'||a==='role-demo'){if(!isAdminAuth(state.auth)){toast('Role switching is reserved for platform administrators.');return}modal('Switch workspace','Choose a role to preview the linked platform workflow.',`<div class="grid2e">${['learner','tutor','admin','crm'].map(r=>`<button class="btn" data-role="${r}">${roleName(r)}</button>`).join('')}</div>`,`<button class="btn" data-action="close-modal">Close</button>`);setTimeout(()=>document.querySelectorAll('[data-role]').forEach(b=>b.onclick=()=>{state.role=b.dataset.role;state.page='dashboard';closeModal();save();app()}));return}if(a==='enter'){state.role='learner';state.page='dashboard';save();app();return}if(a==='close-modal'){closeModal();return}if(a==='open-assessment-builder'){state.page='assessment-'+(el.dataset.builder||'test');save();app();return}if(a==='new-assessment'){state.page='assessment-test';save();app();return}if(a==='ai-assessment-plan'){state.page='assessment-test';save();app();setTimeout(()=>toast('Rafiki AI assessment co-pilot opened in the dedicated builder.'),50);return}if(['assessment-template','assessment-import','assessment-preview','assessment-ai-review','assessment-save','assessment-ai-blueprint','assessment-add-bank','assessment-ai-generate','assessment-moderate','assessment-schedule','assessment-publish','assessment-edit-question','assessment-ai-variant','assessment-remove-question','assessment-edit-rubric','assessment-ai-rubric'].includes(a)){const m={'assessment-template':'Assessment templates opened','assessment-import':'Assessment import workflow opened','assessment-preview':'Learner preview prepared','assessment-ai-review':'Rafiki quality review completed','assessment-save':'Assessment draft saved','assessment-ai-blueprint':'Rafiki generated a balanced outcome blueprint','assessment-add-bank':'Outcome-mapped question bank opened','assessment-ai-generate':'Rafiki generated outcome-aligned draft questions','assessment-moderate':'Assessment sent for moderation','assessment-schedule':'Scheduling controls opened','assessment-publish':'Assessment published to selected learners','assessment-edit-question':'Question editor opened','assessment-ai-variant':'Parallel AI question variant created','assessment-remove-question':'Question removed from draft','assessment-edit-rubric':'Rubric criterion editor opened','assessment-ai-rubric':'Rafiki drafted rubric descriptors'};recordActivity(m[a], 'Tutor Assessment Studio', 'tutor');toast(m[a]);return}if(a==='assessment-ai-task'){toast('Rafiki AI task applied to the current assessment context.');return}if(a==='assessment-ai-send'){const box=document.querySelector('#assessmentAiReply');const prompt=(document.querySelector('#assessmentAiPrompt')?.value||'').trim();if(box){box.classList.remove('hidden');box.innerHTML='<strong>Rafiki recommendation</strong><p>'+ (prompt?'I reviewed your request. ':'') +'Increase LO4 application evidence by replacing one recall item with a scenario-based structured question. Keep total marks unchanged by reducing the new item to 6 marks and reallocate 2 marks from LO1. This improves cognitive balance while preserving blueprint coverage.</p><div class="actions"><button class="btn sm" data-action="assessment-ai-apply">Apply suggestion</button></div>';document.querySelectorAll('#assessmentAiReply [data-action]').forEach(b=>b.onclick=()=>action(b.dataset.action,b))}recordActivity('Rafiki assessment assistance used',prompt||'Assessment improvement request','tutor');return}if(a==='assessment-ai-apply'){toast('AI recommendation applied to the draft blueprint.');return}if(a==='submit-quiz'){
  const qs = getSubjectQuestions(state.subject, state.topic);
  let correctCount = 0;
  qs.forEach((q, idx) => {
    if (state.quizAnswers[idx] === q.ans) correctCount++;
  });
  const score = Math.round((correctCount / qs.length) * 100);
  const sInfo = SUBJECTS.find(x => x[1] === state.subject) || SUBJECTS[0];
  const tName = (TOPICS[state.subject] || [])[state.topic] || ('Topic ' + (state.topic + 1));
  
  if (!state.quizHistory) state.quizHistory = [];
  state.quizHistory.unshift({
    subject: state.subject,
    subjectName: sInfo[0],
    topicIdx: state.topic,
    topicName: tName,
    title: `${sInfo[0]} • ${tName}`,
    detail: `Scored ${correctCount}/${qs.length} (${score}%) on practice checkpoint`,
    score: score,
    timestamp: new Date().toISOString()
  });
  
  if (!state.topicProgress[state.subject]) state.topicProgress[state.subject] = [];
  if (score >= 60 && !state.topicProgress[state.subject].includes(state.topic)) {
    state.topicProgress[state.subject].push(state.topic);
  }
  
  if (!state.lessonProgress[state.subject]) state.lessonProgress[state.subject] = {};
  state.lessonProgress[state.subject][state.topic] = Math.max(state.lessonProgress[state.subject][state.topic] || 0, score);
  
  const newMastery = getSubjectMastery(state.subject);
  state.progress[state.subject] = newMastery;
  
  save();
  recordActivity('Assessment submitted', `${sInfo[0]} (${tName}) scored ${correctCount}/${qs.length} (${score}%); subject mastery is now ${newMastery}%.`, 'learner');
  
  modal('Practice result', `${correctCount}/${qs.length} correct (${score}%)`, 
    `<div class="card">
      <h3>${score >= 80 ? 'Competency demonstrated! 🌟' : score >= 60 ? 'Good effort — Reinforce to reach 80%' : 'Needs review before advancing'}</h3>
      <p>${score >= 80 ? `You have demonstrated mastery in ${tName}. Your updated subject mastery for ${sInfo[0]} is ${newMastery}%.` : `Review the key concepts in ${tName} with Rafiki and retry to strengthen your mastery.`}</p>
      <div class="progress" style="margin-top:14px"><span style="width:${score}%"></span></div>
      <div class="progress-meta"><span>Score</span><strong>${score}%</strong></div>
    </div>`,
    `<button class="btn" data-action="close-modal">Review</button><button class="btn primary" data-nav="course">Course overview</button>`
  );
  return;
}
if(a==='play'||a==='short-next'||a==='save-note'){
  if(!state.lessonProgress[state.subject]) state.lessonProgress[state.subject] = {};
  const currentComp = state.lessonProgress[state.subject][state.topic] || 0;
  const inc = a==='save-note' ? 40 : 25;
  state.lessonProgress[state.subject][state.topic] = Math.min(100, Math.max(currentComp, inc === 40 ? currentComp + 30 : 60));
  state.progress[state.subject] = getSubjectMastery(state.subject);
  save();
}if(a==='rafiki-send'){
  if (!state.subscription) state.subscription = { plan: 'Free Explorer', status: 'Active', rafikiUsed: 0, rafikiLimit: 50, renewal: 'Free Tier' };
  state.subscription.rafikiUsed = (state.subscription.rafikiUsed || 0) + 1;
  save();
  const prompt = (document.querySelector('#rafikiPrompt')?.value||'').trim();
  recordActivity('Rafiki AI used', prompt ? prompt.slice(0, 40) + '...' : 'Learner requested outcome-aligned support.', 'learner');
  const r=document.querySelector('#rafikiReply');
  if(r){
    r.style.display='block';
    r.innerHTML='<strong>Rafiki Study Co-pilot:</strong><p>A reflex action is faster because the neural pathway is routed directly through the spinal cord (reflex arc) before conscious perception in the brain.</p><div style="margin-top:8px"><strong>Diagnostic Check:</strong><ol style="margin:4px 0 0 16px;padding:0"><li>What receptor detected the stimulus?</li><li>Which sensory neurone transmits the impulse to the spinal cord?</li><li>How does bypassing the brain save crucial milliseconds in protective reflexes?</li></ol></div>';
  }
  return;
}
if(a==='mark-read'){
  const id = el.dataset.id || el.closest('.announcement')?.id;
  if(id){
    const list = safeParse('tesea_read_announcements', []);
    if(!list.includes(id)) list.push(id);
    localStorage.setItem('tesea_read_announcements', JSON.stringify(list));
    toast('Announcement marked as read.');
    app();
  }
  return;
}
if(a==='mark-all'){
  const items = getAdaptiveAnnouncements();
  const list = safeParse('tesea_read_announcements', []);
  items.forEach(x => { if(!list.includes(x.id)) list.push(x.id); });
  localStorage.setItem('tesea_read_announcements', JSON.stringify(list));
  toast('All announcements marked as read.');
  app();
  return;
}
if(a==='new-announcement'){
  modal('Create announcement','Targeted in-app communication',`<div class="form-grid"><div class="field"><label>Audience</label><select id="annAudience"><option value="All">All users</option><option value="learner">Learners only</option><option value="tutor">Tutors only</option><option value="admin">Administrators</option></select></div><div class="field"><label>Priority / Category</label><select id="annCat"><option value="Academic">Academic</option><option value="Operational">Operational</option><option value="Urgent">Urgent</option><option value="Platform">Platform</option></select></div><div class="field full"><label>Title</label><input id="annTitle" placeholder="Announcement title"></div><div class="field full"><label>Message</label><textarea id="annMessage" rows="4" placeholder="Write a concise, actionable message"></textarea></div></div>`,`<button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="save-new-announcement">Publish</button>`);
  return;
}
if(a==='save-new-announcement'){
  const title = (document.querySelector('#annTitle')?.value || '').trim();
  const message = (document.querySelector('#annMessage')?.value || '').trim();
  const audience = document.querySelector('#annAudience')?.value || 'All';
  const category = document.querySelector('#annCat')?.value || 'Academic';
  if(!title){ toast('Please enter an announcement title.'); return; }
  const pStore = typeof platformStore !== 'undefined' ? platformStore : safeParse('tesea_platform_store', { events: [], announcements: [] });
  if (!pStore.announcements) pStore.announcements = [];
  pStore.announcements.unshift({
    id: 'ann-' + Date.now(),
    title,
    detail: message,
    audience,
    category,
    badgeClass: category === 'Urgent' ? 'warn' : 'ok',
    time: 'Just now'
  });
  if (typeof persistPlatform === 'function') persistPlatform();
  else localStorage.setItem('tesea_platform_store', JSON.stringify(pStore));
  recordActivity('Announcement published', title, state.role);
  closeModal();
  toast('Announcement published successfully.');
  app();
  return;
}
if(['change-plan','choose-plan','create-plan','edit-plan','configure-entitlement'].includes(a)){
  const targetPlan = el?.dataset?.plan;
  if (targetPlan) {
    if (!state.subscription) state.subscription = { plan: 'Free Explorer', status: 'Active', rafikiUsed: 0, rafikiLimit: 50, renewal: 'Free Tier' };
    state.subscription.plan = targetPlan;
    state.subscription.status = 'Active';
    state.subscription.rafikiLimit = targetPlan.includes('Free') ? 50 : targetPlan.includes('Monthly') ? 300 : 9999;
    state.subscription.renewal = targetPlan.includes('Free') ? 'Free Tier' : new Date(Date.now() + 30*24*3600*1000).toLocaleDateString();
    save();
    recordActivity('Subscription plan changed', targetPlan, state.role);
    toast(`Subscription plan updated to ${targetPlan}.`);
    app();
    return;
  }
  modal('Subscription action','Plan configuration',`<div class="form-grid"><div class="field full"><label>Plan</label><select id="subPlanSelect"><option value="Free Explorer">Free Explorer</option><option value="Monthly Learner">Monthly Learner</option><option value="Annual Learner">Annual Learner</option></select></div><div class="field full"><label>Entitlements</label><textarea rows="4" readonly>Interactive lessons, video lessons, audio lessons, PDF notes, shorts and Rafiki AI study co-pilot.</textarea></div></div>`,`<button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="sub-save-plan">Update plan</button>`);
  return;
}
if(a==='sub-save-plan'){
  const p = document.querySelector('#subPlanSelect')?.value || 'Monthly Learner';
  state.subscription = { plan: p, status: 'Active', rafikiUsed: state.subscription?.rafikiUsed || 0, rafikiLimit: p.includes('Free') ? 50 : 300, renewal: new Date(Date.now() + 30*24*3600*1000).toLocaleDateString() };
  save();
  recordActivity('Subscription plan updated', p, state.role);
  closeModal();
  toast(`Subscription updated to ${p}.`);
  app();
  return;
}if(a==='live-provider-toggle'){const p=el.dataset.provider||'zoom',s=liveProviderStatus();s[p]=!s[p];localStorage.setItem('tesea_live_integrations',JSON.stringify(s));recordActivity(s[p]?'Live provider connected':'Live provider disconnected',p,'tutor');app();toast((p==='meet'?'Google Meet':p==='teams'?'Microsoft Teams':'Zoom')+(s[p]?' connected in prototype.':' disconnected.'));return}if(a==='start-live-provider'){recordActivity('Live room started',(el.dataset.provider||'provider')+' room launched','tutor');toast('Live room launch request sent to connected provider.');return}if(['live-save-draft','live-schedule','live-ai-plan','live-edit-agenda','live-add-segment','live-attach-resource','live-link-assessment','live-test-webhooks','live-export-evidence','live-create-interventions'].includes(a)){const m={'live-save-draft':'Live lesson draft saved','live-schedule':'Live session scheduled and learner announcement queued','live-ai-plan':'Rafiki drafted an outcome-focused agenda','live-edit-agenda':'Agenda segment editor opened','live-add-segment':'New agenda segment added','live-attach-resource':'Resource picker opened','live-link-assessment':'Outcome-mapped exit assessment linked','live-test-webhooks':'Webhook test completed in prototype','live-export-evidence':'Live evidence export prepared','live-create-interventions':'Follow-up interventions created from evidence gaps'};recordActivity(m[a],'Tutor Live Teaching Studio','tutor');toast(m[a]);return}if(a==='open-resource-studio'){state.page='content-'+(el.dataset.studio||'text');save();app();return}if(a==='content-new-default'){state.page='content-text';save();app();return}if(a==='content-import-hub'){toast('Import centre ready: choose a resource studio for format-specific ingestion.');return}if(a==='content-bulk-actions'){toast('Bulk metadata, review assignment and publishing actions opened.');return}if(['studio-ingest','studio-add-block','studio-reorder','studio-ai-outline','studio-preview','studio-ai-transcript','studio-add-chapter','studio-add-check','studio-add-short','studio-version','studio-save','studio-duplicate','studio-template','studio-assign-reviewer'].includes(a)){const labels={ 'studio-ingest':'Ingestion workflow started','studio-add-block':'New lesson block added','studio-reorder':'Block controls opened','studio-ai-outline':'Rafiki content improvement queued','studio-preview':'Learner preview opened','studio-ai-transcript':'Transcript workflow queued','studio-add-chapter':'Chapter added','studio-add-check':'Knowledge check added','studio-add-short':'Short added to batch','studio-version':'Version history opened','studio-save':'Draft saved','studio-duplicate':'Resource duplicated','studio-template':'Template saved','studio-assign-reviewer':'Reviewer assignment opened'};recordActivity(labels[a]||'Studio action','Tutor Content Studio',state.role);toast(labels[a]||'Studio action completed');return}if(['change-plan','choose-plan','create-plan','edit-plan','configure-entitlement'].includes(a)){modal('Subscription action','Plan configuration',`<div class="form-grid"><div class="field full"><label>Plan</label><select><option>Monthly Learner</option><option>Annual Learner</option><option>School Annual</option></select></div><div class="field"><label>Billing cycle</label><select><option>Monthly</option><option>Annual</option></select></div><div class="field"><label>Price (TZS)</label><input value="120000"></div><div class="field full"><label>Entitlements</label><textarea rows="5">Interactive lessons\nVideo lessons\nAudio lessons\nPDF notes\nShorts\nRafiki AI allowance</textarea></div></div>`,`<button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="modal-save">Save</button>`);return}if(['add-curriculum','edit-curriculum'].includes(a)){modal('Curriculum resource editor','Outcome-aligned authoring',`<div class="form-grid"><div class="field"><label>Subject</label><select><option>Biology</option></select></div><div class="field"><label>Form</label><select><option>Form 3</option></select></div><div class="field full"><label>Topic / sub-topic</label><input value="Coordination / Reflex action"></div><div class="field full"><label>Learning outcome</label><textarea rows="3">Explain the pathway of a reflex arc and relate each structure to a rapid protective response.</textarea></div><div class="field"><label>Resource type</label><select><option>Interactive text</option><option>Video</option><option>Audio</option><option>PDF notes</option><option>Shorts</option><option>Live lesson</option></select></div><div class="field"><label>Status</label><select><option>Draft</option><option>Review</option><option>Published</option></select></div></div>`,`<button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="modal-save">Save resource</button>`);return}if(a==='generate-questions'){state.page='question-bank-ai';save();app();return}if(false){modal('Rafiki AI question generator','Outcome-mapped assessment builder',`<div class="form-grid"><div class="field"><label>Form</label><select><option>Form 3</option></select></div><div class="field"><label>Subject</label><select><option>Biology</option></select></div><div class="field"><label>Topic</label><select><option>Coordination</option></select></div><div class="field"><label>Type</label><select><option>Quiz</option><option>Assignment</option><option>Topic test</option><option>Exam</option></select></div><div class="field"><label>Questions</label><input value="10"></div><div class="field"><label>Difficulty</label><select><option>Mixed</option></select></div></div>`,`<button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="modal-generate">Generate draft</button>`);return}if(a==='new-announcement'){modal('Create announcement','Targeted in-app communication',`<div class="form-grid"><div class="field"><label>Audience</label><select><option>All learners</option><option>Form 3</option><option>Tutors</option><option>Paid learners</option></select></div><div class="field"><label>Priority</label><select><option>Academic</option><option>Operational</option><option>Urgent</option></select></div><div class="field full"><label>Title</label><input placeholder="Announcement title"></div><div class="field full"><label>Message</label><textarea rows="5" placeholder="Write a concise, actionable message"></textarea></div></div>`,`<button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="modal-save">Publish</button>`);return}if(a==='new-lead'||a==='new-school'||a==='new-case'||a==='new-campaign'){modal('Create record','CRM workflow',`<div class="form-grid"><div class="field full"><label>Name / title</label><input placeholder="Enter name"></div><div class="field"><label>Type</label><select><option>Learner</option><option>Parent</option><option>School</option></select></div><div class="field"><label>Stage / priority</label><select><option>New</option><option>Qualified</option><option>High</option></select></div><div class="field full"><label>Next action</label><textarea rows="3"></textarea></div></div>`,`<button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="modal-save">Save</button>`);return}if(a==='modal-save'||a==='modal-generate'){recordActivity(a==='modal-generate'?'AI draft generated':'Record saved',document.querySelector('#modalTitle')?.textContent||'Platform record',state.role);closeModal();toast(a==='modal-generate'?'Draft generated and added to review queue.':'Saved successfully.');return}if(a==='learner-assessment-submit'){const t=el.dataset.type||'practice';if(t==='practice'){action('submit-quiz',el);return}const labels={assignment:'Assignment submitted for tutor review',test:'Topic test attempt started',exam:'Exam attempt started'};recordActivity(labels[t]||'Assessment activity',`Biology Coordination • ${t}`,'learner');if(t==='assignment'){modal('Assignment submitted','Evidence recorded',`<div class="card"><span class="badge ok">Submitted</span><h3>Your evidence is now awaiting tutor review.</h3><p>Outcome evidence will update after rubric marking. Until then, progression remains <strong>Reinforce</strong>.</p></div>`,`<button class="btn primary" data-nav="assessments">Return to evidence</button>`);setTimeout(()=>document.querySelectorAll('#modal [data-nav]').forEach(b=>b.onclick=()=>{closeModal();routeTo(b.dataset.nav)}),0)}else{toast(labels[t]+'. Timer and autosave are active in the prototype flow.')}return}if(a==='assessment-save-progress'){recordActivity('Assessment progress saved','Learner evidence workspace','learner');toast('Progress saved.');return}if(['qbank-format','qbank-save-profile','qbank-download-template','qbank-run-import','qbank-ai-map','qbank-export','qbank-ai-save-template','qbank-ai-balance'].includes(a)){const labels={'qbank-format':'Import format selected','qbank-save-profile':'Import mapping profile saved','qbank-download-template':'CSV/XLSX import template prepared','qbank-run-import':'Batch validated and staged for review','qbank-ai-map':'Rafiki suggested outcome mappings for exceptions','qbank-export':'Question selection exported','qbank-ai-save-template':'AI blueprint saved as template','qbank-ai-balance':'Blueprint balanced across outcomes and cognitive demand'};recordActivity(labels[a],'Tutor Question Bank',state.role);toast(labels[a]);return}if(a==='qbank-ai-generate'){const r=document.querySelector('#qbankAiResults');if(r){r.innerHTML=[['AI-Q-001','A learner touches a hot metal surface. Explain why the hand withdraws before the learner consciously identifies pain.','LO1 • LO4','Structured • Core • 6 marks'],['AI-Q-002','Which sequence best represents impulse transmission in a reflex arc?','LO1','MCQ • Foundation • 2 marks'],['AI-Q-003','Predict the effect on the response if the motor neurone is damaged, and justify your answer.','LO2 • LO4','Short response • Challenge • 4 marks']].map((q,i)=>`<article class="generated-question"><div><span class="badge warn">AI draft</span><span class="muted">${q[3]}</span></div><h3>${q[1]}</h3><small>${q[0]} • ${q[2]} • Answer rationale generated • Misconception tag attached</small><div class="actions"><button class="btn sm" data-action="review-question">Review</button><button class="btn sm soft" data-action="assessment-ai-variant">Generate variant</button></div></article>`).join('');document.querySelectorAll('#qbankAiResults [data-action]').forEach(b=>b.onclick=()=>action(b.dataset.action,b))}recordActivity('AI question set generated','3 Biology Coordination drafts staged','tutor');toast('Rafiki generated 3 draft questions for tutor review.');return}if(a==='community-publish'){const t=(document.querySelector('#communityPostText')?.value||'').trim();if(!t){toast('Write a focused subject question first.');return}const c=communitySeed();c.posts.unshift({id:Date.now(),channel:c.channels[0].id,author:'Amani J.',role:'learner',text:t,time:'Just now',replies:0,likes:0,status:'ai-cleared'});saveCommunity(c);recordActivity('Community discussion posted',c.channels[0].subject+' • '+c.channels[0].topic,state.role);app();toast('Published after Rafiki Community Moderator screening.');return}if(['community-guidelines','community-new-post','community-channel','community-attach','community-link-outcome','community-like','community-reply','community-rafiki-explain','community-report','community-pin','community-prompt','community-escalate','community-policy','community-review-ai','community-review-report'].includes(a)){const labels={ 'community-guidelines':'Community guidelines opened','community-new-post':'Discussion composer ready','community-channel':'Subject channel selected','community-attach':'Attachment picker opened','community-link-outcome':'Outcome linker opened','community-like':'Marked as helpful','community-reply':'Reply composer opened','community-rafiki-explain':'Rafiki explanation prepared','community-report':'Post sent to moderation review','community-pin':'Tutor explanation pinned','community-prompt':'Tutor discussion prompt created','community-escalate':'Escalated to Super Admin moderation','community-policy':'Moderation policy opened','community-review-ai':'AI moderation queue opened','community-review-report':'Moderation case opened'};recordActivity(labels[a],'Community center',state.role);toast(labels[a]);return}toast(labelAction(a))}
function labelAction(a){return {'play':'Playback toggled','short-next':'Next short opened','save-note':'Note saved to learner notebook','mark-read':'Announcement marked read','mark-all':'All announcements marked read','billing':'Billing history opened','assessment-history':'Assessment history opened','create-class':'Class creation opened','open-class':'Class workspace opened','import-content':'Import workflow opened','schedule-live':'Live lesson scheduler opened','start-live':'Live room started','assign-intervention':'Intervention assigned','import-questions':'Question import opened','review-question':'Question review opened','export-curriculum':'Curriculum export prepared','invite-user':'Invitation workflow opened','create-user':'User creation opened','edit-user':'User management opened','export-subscriptions':'Subscription report prepared','review-queue':'Review queue opened','save-settings':'Platform settings saved','import-leads':'Lead import opened','open-lead':'Lead detail opened','mic':'Microphone toggled','hand':'Hand raised','leave-live':'You left the live lesson','rafiki-history':'Rafiki study history opened'}[a]||'Action completed'}
function modal(title,eyebrow,body,foot=''){document.querySelector('#modalTitle').textContent=title;document.querySelector('#modalEyebrow').textContent=eyebrow;document.querySelector('#modalBody').innerHTML=body;document.querySelector('#modalFoot').innerHTML=foot;document.querySelector('#modal').classList.add('open');document.querySelector('#modal').setAttribute('aria-hidden','false');setTimeout(()=>document.querySelectorAll('#modal [data-action]').forEach(el=>el.onclick=()=>action(el.dataset.action,el)),0)}
function closeModal(){document.querySelector('#modal').classList.remove('open');document.querySelector('#modal').setAttribute('aria-hidden','true')}
function toast(msg){const t=document.querySelector('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(window._tt);window._tt=setTimeout(()=>t.classList.remove('show'),2200)}
try {
  const initialRoute=parseRoute();
  if(initialRoute){state.role=initialRoute.role||state.role;state.page=initialRoute.page}
  else if(!location.hash){state.page='landing'}
  if(state.page==='course'&&state.role!=='learner')state.page='dashboard';
  if(!state.auth&&['dashboard','course','lesson','assessments','progress','rafiki','subscription'].includes(state.page)&&!localStorage.getItem('tesea_allow_demo')){state.page='landing'}
  app();
} catch(e) {
  console.error('TESEA init error:', e);
  const appEl = document.querySelector('#app') || document.body;
  appEl.innerHTML = '<div style="max-width:600px;margin:80px auto;padding:32px;background:#fff;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.1);font-family:system-ui"><h2 style="color:#962f50;margin-top:0">TESEA Academy</h2><p>The application encountered an initialization issue. Click below to reset and reload.</p><button onclick="localStorage.clear();location.reload()" style="background:#962f50;color:#fff;border:none;padding:12px 24px;border-radius:8px;font-weight:600;cursor:pointer">Reset application</button></div>';
}

/* === CRM Full Deployment Upgrade === */
(function(){
  const crmNav = nav.crm;
  if (crmNav && !crmNav.some(g=>g[1].some(i=>i[0]==='customers'))) {
    crmNav.splice(1,0,['Engagement',
      ['customers','Customer 360'],
      ['campaigns','Email marketing'],
      ['newsletters','Newsletters'],
      ['retention','Retention'],
      ['automations','Automations']
    ]);
    const revenue = crmNav.find(g=>g[0]==='Revenue');
    if (revenue && !revenue[1].some(i=>i[0]==='analytics')) revenue[1].push(['analytics','CRM analytics']);
  }
})();

function crmStore(){
  const key='tesea_crm_v3';
  let data;
  try{data=JSON.parse(localStorage.getItem(key)||'null')}catch(e){}
  if(!data){
    data={leads:[],customers:[],campaigns:[],newsletters:[],automations:[],activities:[]};
  }
  return data;
}
function saveCrm(data){localStorage.setItem('tesea_crm_v3',JSON.stringify(data))}
function crmBadge(stage){const s=String(stage).toLowerCase();return s.includes('active')||s.includes('paid')||s.includes('qualified')?'ok':s.includes('risk')||s.includes('new')||s.includes('scheduled')?'warn':'neutral'}

function crmPage(p){
  if(p==='dashboard')return crmDashboard();
  if(p==='leads')return crmLeads();
  if(p==='customers')return crmCustomers();
  if(p==='schools')return crmSchools();
  if(p==='campaigns')return crmCampaigns();
  if(p==='newsletters')return crmNewsletters();
  if(p==='retention')return crmRetention();
  if(p==='automations')return crmAutomations();
  if(p==='support')return crmSupport();
  if(p==='subscriptions')return adminSubscriptions();
  if(p==='reports'||p==='analytics')return crmReports();
  return crmDashboard();
}
function crmDashboard(){
  const d=crmStore();
  const open=d.leads.filter(x=>!['Active','Lost'].includes(x.stage)).length;
  const atRisk=d.customers.filter(x=>x.status==='At risk').length;
  const totalLeads=d.leads.length;
  const activeLeads=d.leads.filter(x=>x.stage==='Active').length;
  const trialToPaid=totalLeads>0?Math.round((activeLeads/totalLeads)*100):0;
  const totalCustomers=d.customers.length;
  const healthyCustomers=d.customers.filter(c=>(c.health||0)>=70).length;
  const renewalIntent=totalCustomers>0?Math.round((healthyCustomers/totalCustomers)*100):0;

  return head('CRM workspace','Acquisition, conversion & retention','Capture prospects, qualify intent, convert subscriptions and retain learners and schools with consent-aware lifecycle engagement.',`<button class="btn" data-action="crm-import-leads">Bulk import</button><button class="btn primary" data-action="crm-new-lead">Capture lead</button>`)+
    `<div class="kpis">
      <div class="kpi"><strong>${open}</strong><span>Open leads</span></div>
      <div class="kpi"><strong>${trialToPaid}%</strong><span>Trial → paid</span></div>
      <div class="kpi"><strong>${atRisk}</strong><span>Customers at risk</span></div>
      <div class="kpi"><strong>${renewalIntent}%</strong><span>Renewal intent</span></div>
    </div>
    <div class="section crm-dashboard-grid">
      <div class="card">
        <div class="panel-title">
          <div><span class="eyebrow">Conversion pipeline</span><h3>Lead movement</h3></div>
          <button class="btn sm" data-nav="leads">Open pipeline</button>
        </div>
        <div class="crm-stage-row">${['New','Qualified','Trial','Proposal','Payment','Active'].map(s=>`<div><strong>${d.leads.filter(x=>x.stage===s).length}</strong><span>${s}</span></div>`).join('')}</div>
        <div class="conversion-flow"><span>Capture</span><b>→</b><span>Qualify</span><b>→</b><span>Trial / proposal</span><b>→</b><span>Checkout</span><b>→</b><span>Onboard</span></div>
      </div>
      <div class="card">
        <span class="eyebrow">Retention signals</span><h3>Accounts needing action</h3>
        ${d.customers.length ? d.customers.map(c=>`<div class="health-row"><div class="grow"><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(c.segment||'Learner')} • ${escapeHtml(c.plan||'Active Plan')} • renewal ${escapeHtml(c.renewal||'Active')}</small></div><span class="health-score ${c.health<60?'risk':''}">${c.health||0}</span></div>`).join('') : '<p class="muted">No customer retention exceptions at this time.</p>'}
        <button class="btn sm" data-nav="retention">Open retention desk</button>
      </div>
    </div>
    <div class="section grid2">
      <div class="card">
        <span class="eyebrow">Engagement</span><h3>Active programmes</h3>
        <div class="list">
          <div class="list-row"><span class="badge ${d.campaigns.length?'ok':'neutral'}">${d.campaigns.length}</span><div class="grow"><strong>Email campaigns live</strong><small>${d.campaigns.length?'Active campaign audience':'No email campaigns configured'}</small></div><button class="btn sm" data-nav="campaigns">Manage</button></div>
          <div class="list-row"><span class="badge ${d.newsletters.length?'warn':'neutral'}">${d.newsletters.length}</span><div class="grow"><strong>Newsletters scheduled</strong><small>${d.newsletters.length?'Scheduled editorial issues':'No newsletters scheduled'}</small></div><button class="btn sm" data-nav="newsletters">Manage</button></div>
          <div class="list-row"><span class="badge ${d.automations.length?'ok':'neutral'}">${d.automations.length}</span><div class="grow"><strong>Lifecycle automations</strong><small>${d.automations.length?'Active trigger workflows':'Configure lead and trial automations'}</small></div><button class="btn sm" data-nav="automations">Manage</button></div>
        </div>
      </div>
      <div class="card">
        <span class="eyebrow">Governance</span><h3>Production controls</h3>
        ${[['Consent before marketing','Required'],['Unsubscribe / suppression','Enforced'],['Frequency caps','Enabled'],['Webhook attribution','Ready'],['CRM audit events','Enabled']].map(x=>`<div class="settings-line"><span>${x[0]}</span><span class="badge ok">${x[1]}</span></div>`).join('')}
      </div>
    </div>`;
}
function crmLeads(){const d=crmStore();return head('CRM','Lead capture & conversion','Capture prospective learners, parents and schools, score intent and drive every record toward a measurable next action.',`<button class="btn" data-action="crm-import-leads">CSV / XLSX import</button><button class="btn primary" data-action="crm-new-lead">New lead</button>`)+`<div class="crm-toolbar"><input id="crmLeadSearch" placeholder="Search lead, email, phone or school"><select id="crmStageFilter"><option>All stages</option>${['New','Qualified','Trial','Proposal','Payment','Active'].map(x=>`<option>${x}</option>`).join('')}</select><button class="btn" data-action="crm-refresh">Apply</button></div><div class="table-wrap"><table class="table"><thead><tr><th>Lead</th><th>Source</th><th>Interest</th><th>Score</th><th>Stage</th><th>Owner</th><th>Next action</th><th></th></tr></thead><tbody>${d.leads.map(x=>`<tr><td><strong>${x.name}</strong><small class="table-sub">${x.email} • ${x.type}</small></td><td>${x.source}</td><td>${x.interest}</td><td><span class="score-pill">${x.score}</span></td><td><span class="badge ${crmBadge(x.stage)}">${x.stage}</span></td><td>${x.owner}</td><td>${x.next}</td><td><button class="btn sm" data-action="crm-open-lead" data-id="${x.id}">Open</button></td></tr>`).join('')}</tbody></table></div><div class="section grid3"><div class="card"><h3>Lead capture sources</h3><p>Landing forms, referrals, school events, campaigns, manual entry and bulk imports share one lead schema.</p></div><div class="card"><h3>Qualification logic</h3><p>Intent score combines product fit, declared need, engagement, source quality and recent activity. Agents still approve stage changes.</p></div><div class="card"><h3>Conversion hand-off</h3><p>Qualified leads can receive a trial, proposal or checkout link. Paid events create/attach a Customer 360 record and start onboarding.</p></div></div>`}
function crmCustomers(){const d=crmStore();return head('Customer 360','Active customer relationships','Combine subscription validity, learning engagement, support history and lifecycle activity to drive retention.',`<button class="btn" data-action="crm-export-customers">Export</button>`)+`<div class="table-wrap"><table class="table"><thead><tr><th>Customer</th><th>Segment</th><th>Plan</th><th>Health</th><th>Learning activity</th><th>Renewal</th><th>Status</th><th></th></tr></thead><tbody>${d.customers.map(c=>`<tr><td><strong>${c.name}</strong><small class="table-sub">${c.email}</small></td><td>${c.segment}</td><td>${c.plan}</td><td><span class="score-pill ${c.health<60?'risk':''}">${c.health}</span></td><td>${c.lastLearning}</td><td>${c.renewal}</td><td><span class="badge ${crmBadge(c.status)}">${c.status}</span></td><td><button class="btn sm" data-action="crm-open-customer" data-id="${c.id}">Open 360</button></td></tr>`).join('')}</tbody></table></div>`}
function crmCampaigns(){const d=crmStore();return head('Email marketing','Campaign Studio','Create consent-aware campaigns for prospects and existing customers, then attribute opens, clicks and conversions.',`<button class="btn primary" data-action="crm-new-campaign">Create campaign</button>`)+`<div class="campaign-grid">${d.campaigns.map(c=>`<article class="card campaign-card"><div class="panel-title"><div><span class="badge ${crmBadge(c.status)}">${c.status}</span><h3>${c.name}</h3></div><button class="btn sm" data-action="crm-edit-campaign" data-id="${c.id}">Open</button></div><p>${c.audience}</p><div class="metric-strip"><span><strong>${c.sent.toLocaleString()}</strong><small>Sent</small></span><span><strong>${c.open}%</strong><small>Open</small></span><span><strong>${c.click}%</strong><small>Click</small></span><span><strong>${c.conversion}%</strong><small>Conversion</small></span></div><small>Goal: ${c.goal}</small></article>`).join('')}</div><div class="section grid2"><div class="card"><h3>Audience safeguards</h3>${[['Marketing consent','Checked before send'],['Suppression list','Applied automatically'],['Frequency cap','Max 3 promotional emails / 7 days'],['Existing customers','Transactional and service messages separated']].map(x=>`<div class="settings-line"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join('')}</div><div class="card"><h3>Conversion attribution</h3><p>Campaign links carry campaign and contact identifiers. Production webhooks should connect email delivery/click events with checkout, subscription activation and learning activation events.</p><button class="btn" data-action="crm-test-provider">Test email provider</button></div></div>`}
function crmNewsletters(){
  const d=crmStore();
  const optedInCount = d.leads.filter(l=>l.consent).length + getPlatformLearners().length;
  const issuesSent = d.newsletters.filter(n=>n.status==='Sent').length;
  return head('CRM engagement','Newsletter Centre','Publish useful, permission-based learning updates to prospective and existing TESEA audiences.',`<button class="btn primary" data-action="crm-new-newsletter">Create issue</button>`)+
    `<div class="kpis">
      <div class="kpi"><strong>${optedInCount}</strong><span>Opted-in contacts</span></div>
      <div class="kpi"><strong>${issuesSent}</strong><span>Delivered issues</span></div>
      <div class="kpi"><strong>${d.newsletters.length}</strong><span>Total editions</span></div>
      <div class="kpi"><strong>0%</strong><span>Unsubscribe rate</span></div>
    </div>
    <div class="table-wrap section">
      <table class="table">
        <thead><tr><th>Issue</th><th>Audience</th><th>Subscribers</th><th>Schedule</th><th>Status</th><th></th></tr></thead>
        <tbody>
          ${d.newsletters.length ? d.newsletters.map(n=>`<tr><td><strong>${escapeHtml(n.name)}</strong></td><td>${escapeHtml(n.audience)}</td><td>${(n.subscribers||optedInCount).toLocaleString()}</td><td>${n.date}</td><td><span class="badge ${crmBadge(n.status)}">${n.status}</span></td><td><button class="btn sm" data-action="crm-edit-newsletter" data-id="${n.id}">Open</button></td></tr>`).join('') : '<tr><td colspan="6" class="muted" style="padding:40px;text-align:center">No newsletters created yet. Click "Create issue" to draft an edition.</td></tr>'}
        </tbody>
      </table>
    </div>`;
}
function crmRetention(){const d=crmStore();return head('Customer success','Retention programmes','Use subscription validity, learning engagement and service signals to intervene before disengagement or churn.',`<button class="btn primary" data-action="crm-new-retention">Create retention programme</button>`)+`<div class="retention-grid"><div class="card"><span class="eyebrow">Health model</span><h3>Retention signals</h3>${[['Subscription expiry ≤ 30 days','High weight'],['No learning activity ≥ 7 days','High weight'],['Repeated failed payment','High weight'],['Low outcome progress','Medium weight'],['Open support case','Medium weight'],['Healthy weekly activity','Positive weight']].map(x=>`<div class="settings-line"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join('')}</div><div class="card"><span class="eyebrow">Intervention queue</span><h3>Customers needing action</h3>${d.customers.length?d.customers.map(c=>`<div class="health-row"><div class="grow"><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(c.lastLearning||'Active')} • renewal ${escapeHtml(c.renewal||'Active')}</small></div><span class="health-score ${c.health<60?'risk':''}">${c.health||0}</span><button class="btn sm" data-action="crm-retain" data-id="${c.id}">Intervene</button></div>`).join(''):'<p class="muted">No customers requiring intervention.</p>'}</div></div><div class="section grid3"><div class="card"><h3>Renewal programme</h3><p>30/14/7-day value recap, payment readiness and agent escalation for unresolved renewal risk.</p></div><div class="card"><h3>Learning reactivation</h3><p>Detect inactivity, recommend a focused return path, then hand unresolved cases to learner support.</p></div><div class="card"><h3>Save programme</h3><p>Use service recovery, plan fit and genuine product value before discounts. Record the intervention and outcome.</p></div></div>`}
function crmAutomations(){const d=crmStore();return head('CRM operations','Lifecycle Automations','Connect lead, subscription, learning and support events to controlled customer journeys.',`<button class="btn primary" data-action="crm-new-automation">New automation</button>`)+`<div class="automation-list">${d.automations.length ? d.automations.map(a=>`<article class="card automation-card"><div><span class="badge ok">${a.status}</span><h3>${a.name}</h3><p><strong>Trigger:</strong> ${a.trigger}</p><small>${a.steps}</small></div><div class="automation-path"><span>Event</span><b>→</b><span>Eligibility</span><b>→</b><span>Action</span><b>→</b><span>Goal / exit</span></div><button class="btn sm" data-action="crm-edit-automation" data-id="${a.id}">Configure</button></article>`).join('') : '<div class="card" style="grid-column:1/-1;text-align:center;padding:40px"><p class="muted">No custom automations configured yet. Click "New automation" to connect lifecycle events.</p></div>'}</div><div class="section card"><h3>Required production controls</h3><div class="grid3"><div><strong>Idempotency</strong><p>Do not send the same lifecycle action twice when a webhook retries.</p></div><div><strong>Consent & frequency</strong><p>Check contact permissions and campaign caps at execution time, not only when a workflow is created.</p></div><div><strong>Exit conditions</strong><p>Stop nurture when a lead converts, stop renewal reminders after successful renewal and stop inactivity nudges after engagement resumes.</p></div></div></div>`}
function crmReports(){
  const d=crmStore();
  const totalLeads=d.leads.length;
  const activeLeads=d.leads.filter(x=>x.stage==='Active').length;
  const trialToPaid=totalLeads>0?Math.round((activeLeads/totalLeads)*100):0;
  const totalCustomers=d.customers.length;
  const healthyCustomers=d.customers.filter(c=>(c.health||0)>=70).length;
  const renewalIntent=totalCustomers>0?Math.round((healthyCustomers/totalCustomers)*100):0;
  const learners=getPlatformLearners();

  return head('CRM analytics','Funnel, engagement & retention','Measure acquisition efficiency, conversion quality, campaign contribution and customer health across the TESEA lifecycle.')+
    `<div class="kpis">
      <div class="kpi"><strong>${trialToPaid}%</strong><span>Trial → paid</span></div>
      <div class="kpi"><strong>${d.campaigns.length}</strong><span>Active campaigns</span></div>
      <div class="kpi"><strong>${learners.length ? '100%' : '0%'}</strong><span>Learner retention</span></div>
      <div class="kpi"><strong>${renewalIntent}%</strong><span>Renewal intent</span></div>
    </div>
    <div class="section grid2">
      <div class="card">
        <h3>Lifecycle funnel</h3>
        ${[
          ['Leads captured', totalLeads],
          ['Qualified leads', d.leads.filter(x=>['Qualified','Trial','Proposal','Payment','Active'].includes(x.stage)).length],
          ['Trial / proposal', d.leads.filter(x=>['Trial','Proposal','Payment','Active'].includes(x.stage)).length],
          ['Checkout / active', d.leads.filter(x=>['Payment','Active'].includes(x.stage)).length],
          ['Active subscribers', totalCustomers + learners.filter(u=>u.subscription!=='Free Explorer').length]
        ].map(x=>{
          const pct = totalLeads > 0 ? Math.round((x[1]/totalLeads)*100) : (x[1] > 0 ? 100 : 0);
          return `<div style="margin-top:14px">
            <div class="progress-meta"><strong>${x[0]} (${x[1]})</strong><span>${pct}%</span></div>
            <div class="progress"><span style="width:${Math.max(pct, x[1]>0?5:0)}%"></span></div>
          </div>`;
        }).join('')}
      </div>
      <div class="card">
        <h3>Customer Segments & Cohorts</h3>
        <div class="list">
          <div class="list-row"><span class="badge ok">${d.customers.filter(c=>c.segment==='Learner').length}</span><div class="grow"><strong>Individual Learners</strong><small>Self-directed study accounts</small></div></div>
          <div class="list-row"><span class="badge ok">${d.customers.filter(c=>c.segment==='School').length}</span><div class="grow"><strong>Institutional / School Seats</strong><small>School cohorts and partner accounts</small></div></div>
          <div class="list-row"><span class="badge neutral">${learners.length}</span><div class="grow"><strong>Platform Registered Users</strong><small>Total authenticated sessions</small></div></div>
        </div>
      </div>
    </div>`;
}

const _crmActionBase = action;
action = function(a,el){
  if(a==='crm-new-lead'){
    modal('Capture new lead','Consent-aware lead intake',`<div class="form-grid"><div class="field"><label>Name / organisation</label><input id="crmLeadName" placeholder="Full name or school"></div><div class="field"><label>Contact type</label><select id="crmLeadType"><option>Parent</option><option>Learner</option><option>School</option><option>Partner</option></select></div><div class="field"><label>Email</label><input id="crmLeadEmail" type="email" placeholder="name@example.com"></div><div class="field"><label>Phone</label><input id="crmLeadPhone" placeholder="+255..."></div><div class="field"><label>Interest</label><input id="crmLeadInterest" placeholder="Form 1 annual / school seats"></div><div class="field"><label>Source</label><select id="crmLeadSource"><option>Website</option><option>Referral</option><option>School event</option><option>Campaign</option><option>WhatsApp</option></select></div><div class="field full"><label><input id="crmLeadConsent" type="checkbox" checked> Contact has consented to receive relevant TESEA marketing communication</label></div></div>`,`<button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="crm-save-lead">Save lead</button>`);return;
  }
  if(a==='crm-save-lead'){
    const name=(document.querySelector('#crmLeadName')?.value||'').trim();if(!name){toast('Enter a lead name.');return}
    const d=crmStore();d.leads.unshift({id:'LD-'+Date.now().toString().slice(-6),name,type:document.querySelector('#crmLeadType').value,email:document.querySelector('#crmLeadEmail').value,phone:document.querySelector('#crmLeadPhone').value,interest:document.querySelector('#crmLeadInterest').value||'TESEA subscription',source:document.querySelector('#crmLeadSource').value,stage:'New',score:45,owner:'Unassigned',consent:document.querySelector('#crmLeadConsent').checked,next:'Qualify need',last:new Date().toLocaleDateString()});saveCrm(d);recordActivity('CRM lead captured',name,'crm');closeModal();app();toast('Lead captured and added to the qualification queue.');return;
  }
  if(a==='crm-import-leads'){modal('Bulk lead import','CSV / XLSX ingestion',`<div class="card"><h3>Supported columns</h3><p>name, type, email, phone, interest, source, consent, owner, next_action</p></div><div class="drop-zone"><strong>Drop CSV or XLSX here</strong><span>Production should validate duplicates, consent provenance and field mapping before import.</span><button class="btn" data-action="crm-import-simulate">Choose file</button></div>`,`<button class="btn" data-action="close-modal">Close</button>`);return}
  if(a==='crm-import-simulate'){recordActivity('Lead import validated','24 records staged','crm');closeModal();toast('24 lead records validated and staged for review.');return}
  if(a==='crm-open-lead'){
    const d=crmStore(),x=d.leads.find(v=>v.id===el.dataset.id)||d.leads[0];modal(x.name,'Lead conversion workspace',`<div class="crm-detail-grid"><div><span class="eyebrow">Contact</span><h3>${x.type} • ${x.interest}</h3><p>${x.email}<br>${x.phone}</p><div class="field"><label>Stage</label><select id="crmLeadStage">${['New','Qualified','Trial','Proposal','Payment','Active','Lost'].map(s=>`<option ${s===x.stage?'selected':''}>${s}</option>`).join('')}</select></div><div class="field"><label>Owner</label><input id="crmLeadOwner" value="${x.owner}"></div><div class="field"><label>Next action</label><input id="crmLeadNext" value="${x.next}"></div></div><div class="card"><span class="eyebrow">Conversion actions</span><h3>Move to measurable commitment</h3><div class="stack-actions"><button class="btn" data-action="crm-send-followup">Send follow-up email</button><button class="btn" data-action="crm-send-trial">Send guided trial</button><button class="btn" data-action="crm-send-checkout">Create checkout link</button><button class="btn" data-action="crm-enrol-nurture">Enrol in nurture</button></div></div></div>`,`<button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="crm-save-lead-edit" data-id="${x.id}">Save changes</button>`);return;
  }
  if(a==='crm-save-lead-edit'){const d=crmStore(),x=d.leads.find(v=>v.id===el.dataset.id);if(x){x.stage=document.querySelector('#crmLeadStage').value;x.owner=document.querySelector('#crmLeadOwner').value;x.next=document.querySelector('#crmLeadNext').value;if(x.stage==='Active'&&!d.customers.some(c=>c.email===x.email))d.customers.unshift({id:'CU-'+Date.now().toString().slice(-5),name:x.name,segment:x.type==='School'?'School':'Learner',plan:x.interest,status:'Active',health:75,lastLearning:'Onboarding',renewal:'Pending billing activation',email:x.email});saveCrm(d);recordActivity('Lead stage updated',x.name+' → '+x.stage,'crm')}closeModal();app();toast('Lead updated. Conversion state is now synchronized.');return}
  if(['crm-send-followup','crm-send-trial','crm-send-checkout','crm-enrol-nurture'].includes(a)){const labels={'crm-send-followup':'Follow-up email queued','crm-send-trial':'Guided trial invitation created','crm-send-checkout':'Checkout link created','crm-enrol-nurture':'Lead added to nurture automation'};recordActivity(labels[a],'CRM conversion workflow','crm');toast(labels[a]);return}
  if(a==='crm-new-campaign'||a==='crm-edit-campaign'){
    modal(a==='crm-new-campaign'?'Create email campaign':'Campaign Studio','Audience, content & conversion goal',`<div class="form-grid"><div class="field full"><label>Campaign name</label><input value="${a==='crm-new-campaign'?'':'Form 1 Back-to-School'}"></div><div class="field"><label>Audience</label><select><option>Prospective parents</option><option>Existing learners</option><option>Trial users</option><option>Renewal due ≤ 30 days</option><option>School decision makers</option></select></div><div class="field"><label>Goal</label><select><option>Paid subscription</option><option>Trial activation</option><option>Renewal</option><option>Learning activation</option></select></div><div class="field full"><label>Subject line</label><input placeholder="Clear, useful subject line"></div><div class="field full"><label>Email content</label><textarea rows="7" placeholder="Compose useful, permission-based message"></textarea></div><div class="field"><label>Schedule</label><input type="datetime-local"></div><div class="field"><label>Frequency cap</label><select><option>Respect platform default</option><option>Service message only</option></select></div></div>`,`<button class="btn" data-action="crm-send-test">Send test</button><button class="btn primary" data-action="crm-save-campaign">Save campaign</button>`);return}
  if(a==='crm-save-campaign'){recordActivity('Email campaign saved','Consent-filtered audience','crm');closeModal();toast('Campaign saved. Production send requires configured email provider.');return}
  if(a==='crm-send-test'||a==='crm-test-provider'){toast('Email provider test queued. Connect provider credentials in Platform Settings for production delivery.');return}
  if(a==='crm-new-newsletter'||a==='crm-edit-newsletter'){modal('Newsletter editor','Subscriber-safe publishing',`<div class="form-grid"><div class="field full"><label>Issue title</label><input value="TESEA Learning Brief"></div><div class="field"><label>Audience</label><select><option>All opted-in contacts</option><option>Prospects only</option><option>Existing customers only</option><option>Parents</option><option>Schools</option></select></div><div class="field"><label>Schedule</label><input type="datetime-local"></div><div class="field full"><label>Editorial summary</label><textarea rows="7">Learning guidance, curriculum updates, upcoming live lessons and practical platform tips.</textarea></div></div>`,`<button class="btn" data-action="crm-newsletter-preview">Preview</button><button class="btn primary" data-action="crm-newsletter-save">Schedule issue</button>`);return}
  if(a==='crm-newsletter-preview'){toast('Newsletter preview generated.');return}if(a==='crm-newsletter-save'){recordActivity('Newsletter scheduled','Consent-filtered subscribers','crm');closeModal();toast('Newsletter scheduled.');return}
  if(a==='crm-retain'){modal('Retention intervention','Customer success action',`<div class="form-grid"><div class="field"><label>Intervention</label><select><option>Learning reactivation plan</option><option>Renewal reminder</option><option>Payment support</option><option>Agent call</option><option>Plan-fit review</option></select></div><div class="field"><label>Channel</label><select><option>Email</option><option>In-app</option><option>Agent task</option></select></div><div class="field full"><label>Internal note</label><textarea rows="4">Record why this intervention is appropriate and the expected outcome.</textarea></div></div>`,`<button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="crm-save-intervention">Create intervention</button>`);return}
  if(a==='crm-save-intervention'){recordActivity('Retention intervention created','Customer success queue','crm');closeModal();toast('Retention intervention created and tracked.');return}
  if(a==='crm-new-automation'||a==='crm-edit-automation'){modal('Lifecycle automation','Trigger → eligibility → action → exit',`<div class="form-grid"><div class="field full"><label>Automation name</label><input placeholder="e.g. Renewal retention"></div><div class="field"><label>Trigger event</label><select><option>Lead created</option><option>Trial expiring</option><option>Subscription expiring</option><option>Payment failed</option><option>Learning inactive</option><option>Support case resolved</option></select></div><div class="field"><label>Delay</label><input value="0 hours"></div><div class="field full"><label>Eligibility / suppression rule</label><input value="Consent valid AND not frequency-capped"></div><div class="field full"><label>Action sequence</label><textarea rows="5">1. Email
2. In-app reminder
3. Agent task if no conversion</textarea></div><div class="field full"><label>Exit condition</label><input value="Goal achieved OR consent revoked"></div></div>`,`<button class="btn" data-action="close-modal">Cancel</button><button class="btn primary" data-action="crm-save-automation">Save automation</button>`);return}
  if(a==='crm-save-automation'){recordActivity('Lifecycle automation saved','CRM journey engine','crm');closeModal();toast('Automation saved with eligibility and exit controls.');return}
  if(a==='crm-open-customer'){modal('Customer 360','Cross-platform customer context',`<div class="grid2"><div class="card"><h3>Commercial</h3><p>Subscription status, billing validity, invoices, renewal and campaign history.</p></div><div class="card"><h3>Learning engagement</h3><p>Recent sessions, outcome progress, assessment participation and inactivity signals.</p></div><div class="card"><h3>Service</h3><p>Open support cases, resolution history and service recovery activity.</p></div><div class="card"><h3>Lifecycle timeline</h3><p>Lead source → trial → payment → onboarding → retention events.</p></div></div>`,`<button class="btn" data-action="close-modal">Close</button>`);return}
  if(['crm-export-customers','crm-refresh'].includes(a)){toast(a==='crm-export-customers'?'Customer export prepared.':'Lead filters refreshed.');return}
  return _crmActionBase(a,el);
};

/* ensure CRM extensions render after late-bound CRM functions are defined */
if(state.role==='crm') app();
