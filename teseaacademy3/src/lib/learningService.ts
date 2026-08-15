import { db } from './firebase';
import { collection, getDocs, addDoc, query, orderBy, limit, setDoc, doc } from 'firebase/firestore';

export interface LearningContent {
  id: string;
  title: string;
  meta: string;
  format: string;
  formatType: 'video' | 'text' | 'audio' | 'pdf';
  author: string;
  status: 'Published' | 'In review' | 'Draft';
  createdAt: string;
}

export interface LearningSession {
  id?: string;
  userId: string;
  userName: string;
  courseTitle: string;
  minutesSpent: number;
  completed: boolean;
  dayOfWeek: number; // 0=Sun, 1=Mon, ..., 6=Sat
  region?: string;
  timestamp: string;
}

export interface ActivityEvent {
  id: string;
  title: string;
  subtitle: string;
  timeAgo: string;
  icon: string;
  timestamp: string;
}

export interface RegionLocation {
  name: string;
  code: string;
  pinLeft: string; // percentage for map pin
  pinTop: string;
}

export const TANZANIA_REGIONS: RegionLocation[] = [
  { name: 'Dar es Salaam', code: 'DAR', pinLeft: '66%', pinTop: '59%' },
  { name: 'Arusha', code: 'ARU', pinLeft: '58%', pinTop: '34%' },
  { name: 'Dodoma', code: 'DOD', pinLeft: '47%', pinTop: '49%' },
  { name: 'Mwanza', code: 'MZA', pinLeft: '38%', pinTop: '24%' },
  { name: 'Mbeya', code: 'MBY', pinLeft: '40%', pinTop: '74%' },
  { name: 'Kilimanjaro', code: 'KLM', pinLeft: '65%', pinTop: '30%' },
  { name: 'Morogoro', code: 'MOR', pinLeft: '61%', pinTop: '56%' },
  { name: 'Tanga', code: 'TGA', pinLeft: '70%', pinTop: '40%' },
  { name: 'Tabora', code: 'TBR', pinLeft: '37%', pinTop: '45%' },
  { name: 'Kigoma', code: 'KGM', pinLeft: '18%', pinTop: '46%' },
  { name: 'Mtwara', code: 'MTW', pinLeft: '80%', pinTop: '86%' },
  { name: 'Iringa', code: 'IRG', pinLeft: '52%', pinTop: '66%' },
  { name: 'Kagera', code: 'KGR', pinLeft: '26%', pinTop: '18%' },
  { name: 'Mara', code: 'MAR', pinLeft: '47%', pinTop: '17%' },
  { name: 'Shinyanga', code: 'SHY', pinLeft: '39%', pinTop: '33%' },
  { name: 'Manyara', code: 'MNY', pinLeft: '54%', pinTop: '38%' },
  { name: 'Singida', code: 'SGD', pinLeft: '46%', pinTop: '44%' },
  { name: 'Ruvuma', code: 'RVM', pinLeft: '56%', pinTop: '84%' },
  { name: 'Lindi', code: 'LND', pinLeft: '74%', pinTop: '78%' },
  { name: 'Songwe', code: 'SGW', pinLeft: '35%', pinTop: '75%' },
  { name: 'Rukwa', code: 'RKW', pinLeft: '26%', pinTop: '66%' },
  { name: 'Katavi', code: 'KTV', pinLeft: '25%', pinTop: '56%' },
  { name: 'Geita', code: 'GTA', pinLeft: '32%', pinTop: '28%' },
  { name: 'Simiyu', code: 'SMY', pinLeft: '44%', pinTop: '26%' },
  { name: 'Njombe', code: 'NJM', pinLeft: '49%', pinTop: '76%' },
  { name: 'Pwani', code: 'PWN', pinLeft: '69%', pinTop: '62%' },
  { name: 'Zanzibar Urban/West', code: 'ZUW', pinLeft: '74%', pinTop: '51%' },
  { name: 'Zanzibar North', code: 'ZUN', pinLeft: '74%', pinTop: '49%' },
  { name: 'Zanzibar South', code: 'ZUS', pinLeft: '75%', pinTop: '53%' },
  { name: 'Pemba North', code: 'PMN', pinLeft: '76%', pinTop: '42%' },
  { name: 'Pemba South', code: 'PMS', pinLeft: '76%', pinTop: '45%' },
];

export interface RegionStat {
  name: string;
  code: string;
  activeLearners: number;
  learningMinutes: number;
  percentage: number;
  pinLeft: string;
  pinTop: string;
  active: boolean;
}

export interface CoursePerformanceStat {
  courseTitle: string;
  level: string;
  activeLearners: number;
  completionRate: number;
}

export interface LevelBreakdownStat {
  level: string;
  count: number;
  percentage: number;
  color: string;
}

export interface DetailedAnalyticsData {
  activeLearners: number;
  learnersChangePct: number;
  learningHours: number;
  learningHoursChangePct: number;
  avgCompletionPct: number;
  completionChangePct: number;
  assessmentAvgScore: number;
  assessmentAttemptsCount: number;
  weeklyGrowth: Array<{
    dateLabel: string;
    sessionsCount: number;
    newLearnersCount: number;
    sessionHeightPct: number;
    learnerHeightPct: number;
  }>;
  keyInsight: {
    title: string;
    text: string;
  };
  bestPerformingCourses: CoursePerformanceStat[];
  learnersByLevel: {
    total: number;
    breakdown: LevelBreakdownStat[];
    gradientStyle: string;
  };
  learningReach: {
    totalActiveRegions: number;
    regions: RegionStat[];
    topRegions: RegionStat[];
  };
}

export interface AdminAnalyticsData {
  activeLearners: number;
  learnersChangePct: number;
  learningHours: number;
  learningHoursChangePct: number;
  publishedLessonsCount: number;
  subjectsCount: number;
  avgCompletionPct: number;
  completionChangePct: number;
  weeklyEngagement: Array<{
    day: string;
    lightBarPct: number;
    darkBarPct: number;
  }>;
  recentContents: LearningContent[];
  workflow: {
    readyForReview: number;
    scheduledThisWeek: number;
    assessmentSubmissions: number;
  };
  teamActivities: ActivityEvent[];
}

const LOCAL_STORAGE_USERS_KEY = 'tesea_registered_learners';
const LOCAL_STORAGE_SESSIONS_KEY = 'tesea_learning_sessions';
const LOCAL_STORAGE_CONTENTS_KEY = 'tesea_learning_contents';
const LOCAL_STORAGE_ACTIVITIES_KEY = 'tesea_activity_logs';
const LOCAL_STORAGE_ASSESSMENTS_KEY = 'tesea_student_assessments';

export interface AssessmentItem {
  id: string;
  title: string;
  subject: string;
  questionsCount?: number;
  type?: 'Quiz' | 'Test' | 'Mock exam' | 'Practice';
  format?: string;
  attempts: number;
  avgScore: number | null; // e.g. 72 or null if no attempts yet
  status: 'Published' | 'In review' | 'Draft' | 'Scheduled' | 'Live' | 'Review';
  createdAt?: string;
  questionSource?: string;
  icon?: string;
}

export async function fetchAssessments(): Promise<AssessmentItem[]> {
  let list: AssessmentItem[] = [];
  try {
    const snap = await getDocs(collection(db, 'assessments'));
    snap.forEach(d => list.push(d.data() as AssessmentItem));
  } catch (e) {
    console.warn('Firestore fetch assessments fallback to localStorage:', e);
  }

  try {
    const local = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ASSESSMENTS_KEY) || '[]');
    local.forEach((la: AssessmentItem) => {
      if (!list.some(x => x.id === la.id)) {
        list.push(la);
      }
    });
  } catch (e) {}

  if (list.length === 0) {
    list = [];
  }

  return list;
}

export async function saveAssessment(assessment: Omit<AssessmentItem, 'id' | 'createdAt'>): Promise<AssessmentItem> {
  const newItem: AssessmentItem = {
    ...assessment,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };

  try {
    const local = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ASSESSMENTS_KEY) || '[]');
    local.unshift(newItem);
    localStorage.setItem(LOCAL_STORAGE_ASSESSMENTS_KEY, JSON.stringify(local));
  } catch (e) {}

  try {
    await addDoc(collection(db, 'assessments'), newItem);
  } catch (e) {
    console.warn('Firestore assessment save fallback:', e);
  }

  await logActivityEvent({
    title: `New ${newItem.type || newItem.format || 'assessment'} created: "${newItem.title}"`,
    subtitle: `${newItem.subject} · ${newItem.status}`,
    icon: '✓',
    timestamp: new Date().toISOString()
  });

  return newItem;
}

export async function updateAssessmentStatus(assessmentId: string, newStatus: AssessmentItem['status'], author = 'Administrator'): Promise<void> {
  try {
    const local: AssessmentItem[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ASSESSMENTS_KEY) || '[]');
    const idx = local.findIndex(a => a.id === assessmentId);
    let title = 'Assessment';
    if (idx !== -1) {
      local[idx].status = newStatus;
      title = local[idx].title;
      localStorage.setItem(LOCAL_STORAGE_ASSESSMENTS_KEY, JSON.stringify(local));
    }

    try {
      const snap = await getDocs(collection(db, 'assessments'));
      snap.forEach(async (docSnap) => {
        const data = docSnap.data();
        if (data.id === assessmentId) {
          await setDoc(doc(db, 'assessments', docSnap.id), { ...data, status: newStatus }, { merge: true });
        }
      });
    } catch (e) {}

    await logActivityEvent({
      title: `${author} updated ${title} status to ${newStatus}`,
      subtitle: `Assessment Management`,
      icon: newStatus === 'Published' ? '✓' : '◷',
      timestamp: new Date().toISOString()
    });
  } catch (e) {
    console.error('Failed to update assessment status:', e);
  }
}

const LOCAL_STORAGE_LEARNERS_KEY = 'tesea_learners_directory';

export interface LearnerItem {
  id: string;
  name: string;
  email: string;
  school: string;
  region: string;
  form: string;
  learningPath: string;
  progress: number;
  lastActive: string;
  risk: 'On track' | 'Watch' | 'At risk';
  createdAt: string;
}

export async function fetchLearners(): Promise<LearnerItem[]> {
  let list: LearnerItem[] = [];

  // Try Firestore
  try {
    const snap = await getDocs(collection(db, 'learners'));
    snap.forEach(d => list.push(d.data() as LearnerItem));
  } catch (e) {
    console.warn('Firestore fetch learners fallback:', e);
  }

  // Try LocalStorage
  try {
    const local = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LEARNERS_KEY) || '[]');
    local.forEach((ll: LearnerItem) => {
      if (!list.some(x => x.id === ll.id || x.email === ll.email)) {
        list.push(ll);
      }
    });
  } catch (e) {}

  // Also include registered student users if not already present
  try {
    const users: any[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '[]');
    const sessionUser = JSON.parse(localStorage.getItem('tesea_device_session') || 'null');
    if (sessionUser && !users.some(u => u.email === sessionUser.email)) {
      users.push(sessionUser);
    }
    users.forEach((u: any) => {
      if (u.role === 'Student' || !u.role) {
        if (!list.some(x => x.email === u.email)) {
          list.push({
            id: u.id || 'LRN-' + Math.random().toString(36).substring(2, 7),
            name: u.name || 'Student Learner',
            email: u.email || 'student@tesea.ac.tz',
            school: u.school || 'TESEA Secondary School',
            region: u.region || 'Dar es Salaam',
            form: u.form || 'Form 5',
            learningPath: 'Advanced Mathematics & Science · F5',
            progress: Math.floor(Math.random() * 40) + 50,
            lastActive: 'Just now',
            risk: 'On track',
            createdAt: new Date().toISOString()
          });
        }
      }
    });
  } catch (e) {}

  return list;
}

export async function saveLearner(learner: Omit<LearnerItem, 'id' | 'createdAt'>): Promise<LearnerItem> {
  const newItem: LearnerItem = {
    ...learner,
    id: 'LRN-' + Date.now(),
    createdAt: new Date().toISOString()
  };

  try {
    const local: LearnerItem[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LEARNERS_KEY) || '[]');
    local.unshift(newItem);
    localStorage.setItem(LOCAL_STORAGE_LEARNERS_KEY, JSON.stringify(local));
  } catch (e) {}

  try {
    await addDoc(collection(db, 'learners'), newItem);
  } catch (e) {
    console.warn('Firestore save learner fallback:', e);
  }

  await logActivityEvent({
    title: `Enrolled new learner: ${newItem.name}`,
    subtitle: `${newItem.school} · ${newItem.form}`,
    icon: '♙',
    timestamp: new Date().toISOString()
  });

  return newItem;
}

const LOCAL_STORAGE_PLANS_KEY = 'tesea_subscription_plans';
const LOCAL_STORAGE_SUBS_KEY = 'tesea_learner_subscriptions';

export interface SubscriptionPlanItem {
  id: string;
  name: string;
  period: 'Monthly' | 'Per term' | 'Annual';
  priceTzs: number;
  subscribersCount: number;
  barPct: number;
  createdAt: string;
}

export interface LearnerSubscriptionRecord {
  id: string;
  learnerName: string;
  learnerEmail: string;
  planName: string;
  renewalDate: string;
  status: 'Active' | 'Due soon' | 'Payment failed';
  createdAt: string;
}

export async function fetchSubscriptionPlans(): Promise<SubscriptionPlanItem[]> {
  let list: SubscriptionPlanItem[] = [];
  try {
    const snap = await getDocs(collection(db, 'subscription_plans'));
    snap.forEach(d => list.push(d.data() as SubscriptionPlanItem));
  } catch (e) {}

  try {
    const local = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PLANS_KEY) || '[]');
    local.forEach((lp: SubscriptionPlanItem) => {
      if (!list.some(x => x.id === lp.id)) list.push(lp);
    });
  } catch (e) {}

  return list;
}

export async function saveSubscriptionPlan(plan: Omit<SubscriptionPlanItem, 'id' | 'createdAt' | 'subscribersCount' | 'barPct'>): Promise<SubscriptionPlanItem> {
  const newPlan: SubscriptionPlanItem = {
    ...plan,
    id: 'PLAN-' + Date.now(),
    subscribersCount: 0,
    barPct: 15,
    createdAt: new Date().toISOString()
  };

  try {
    const local: SubscriptionPlanItem[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PLANS_KEY) || '[]');
    local.unshift(newPlan);
    localStorage.setItem(LOCAL_STORAGE_PLANS_KEY, JSON.stringify(local));
  } catch (e) {}

  try {
    await addDoc(collection(db, 'subscription_plans'), newPlan);
  } catch (e) {}

  await logActivityEvent({
    title: `Created subscription plan: ${newPlan.name}`,
    subtitle: `TZS ${newPlan.priceTzs.toLocaleString()} · ${newPlan.period}`,
    icon: '◉',
    timestamp: new Date().toISOString()
  });

  return newPlan;
}

export async function fetchLearnerSubscriptions(): Promise<LearnerSubscriptionRecord[]> {
  let list: LearnerSubscriptionRecord[] = [];
  try {
    const snap = await getDocs(collection(db, 'learner_subscriptions'));
    snap.forEach(d => list.push(d.data() as LearnerSubscriptionRecord));
  } catch (e) {}

  try {
    const local = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SUBS_KEY) || '[]');
    local.forEach((ls: LearnerSubscriptionRecord) => {
      if (!list.some(x => x.id === ls.id)) list.push(ls);
    });
  } catch (e) {}

  return list;
}

// Helper to calculate relative time
export function getRelativeTimeString(dateIso: string): string {
  try {
    const diffMs = Date.now() - new Date(dateIso).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } catch (e) {
    return 'Recent';
  }
}

// Record a student learning session
export async function logStudentLearningSession(session: Omit<LearningSession, 'id' | 'timestamp'>) {
  const newSession: LearningSession = {
    ...session,
    id: 'SES-' + Date.now(),
    timestamp: new Date().toISOString()
  };

  // 1. Save locally
  try {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSIONS_KEY) || '[]');
    stored.unshift(newSession);
    localStorage.setItem(LOCAL_STORAGE_SESSIONS_KEY, JSON.stringify(stored.slice(0, 100)));
  } catch (e) {}

  // 2. Save in Firestore
  try {
    await addDoc(collection(db, 'learning_sessions'), newSession);
  } catch (e) {
    console.warn('Firestore session log fallback to local:', e);
  }

  // 3. Log activity event
  await logActivityEvent({
    title: `${session.userName} engaged in learning`,
    subtitle: `${session.courseTitle} · ${session.minutesSpent} mins studied`,
    icon: '▶',
    timestamp: new Date().toISOString()
  });
}

// Record an activity event
export async function logActivityEvent(event: { title: string; subtitle: string; icon: string; timestamp?: string }) {
  const newEvent: ActivityEvent = {
    id: 'ACT-' + Date.now(),
    title: event.title,
    subtitle: event.subtitle,
    timeAgo: 'Just now',
    icon: event.icon,
    timestamp: event.timestamp || new Date().toISOString()
  };

  try {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACTIVITIES_KEY) || '[]');
    stored.unshift(newEvent);
    localStorage.setItem(LOCAL_STORAGE_ACTIVITIES_KEY, JSON.stringify(stored.slice(0, 50)));
  } catch (e) {}

  try {
    await addDoc(collection(db, 'activity_logs'), newEvent);
  } catch (e) {
    console.warn('Firestore activity log fallback to local:', e);
  }
}

// Record a new learning content
export async function saveLearningContent(content: Omit<LearningContent, 'id' | 'createdAt'>): Promise<LearningContent> {
  const newContent: LearningContent = {
    ...content,
    id: 'CNT-' + Date.now(),
    createdAt: new Date().toISOString()
  };

  try {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONTENTS_KEY) || '[]');
    stored.unshift(newContent);
    localStorage.setItem(LOCAL_STORAGE_CONTENTS_KEY, JSON.stringify(stored));
  } catch (e) {}

  try {
    await addDoc(collection(db, 'learning_contents'), newContent);
  } catch (e) {
    console.warn('Firestore content save fallback to local:', e);
  }

  await logActivityEvent({
    title: `${newContent.author} created ${newContent.formatType} lesson`,
    subtitle: `${newContent.title} · ${newContent.meta}`,
    icon: newContent.formatType === 'video' ? '▶' : newContent.formatType === 'audio' ? '♫' : newContent.formatType === 'pdf' ? '▤' : '¶',
    timestamp: new Date().toISOString()
  });

  return newContent;
}

// Update status of a learning content item in workflow
export async function updateContentStatus(contentId: string, newStatus: 'Published' | 'In review' | 'Draft', authorName = 'Editor'): Promise<void> {
  try {
    const stored: LearningContent[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONTENTS_KEY) || '[]');
    const targetIndex = stored.findIndex(c => c.id === contentId);
    let itemTitle = 'Lesson';
    if (targetIndex !== -1) {
      stored[targetIndex].status = newStatus;
      itemTitle = stored[targetIndex].title;
      localStorage.setItem(LOCAL_STORAGE_CONTENTS_KEY, JSON.stringify(stored));
    }

    try {
      const snap = await getDocs(collection(db, 'learning_contents'));
      snap.forEach(async (docSnap) => {
        const data = docSnap.data();
        if (data.id === contentId) {
          await setDoc(doc(db, 'learning_contents', docSnap.id), { ...data, status: newStatus }, { merge: true });
        }
      });
    } catch (e) {
      console.warn('Firestore status update fallback to local:', e);
    }

    await logActivityEvent({
      title: `${authorName} updated status to ${newStatus}`,
      subtitle: `${itemTitle} · Publishing Workflow`,
      icon: newStatus === 'Published' ? '✓' : newStatus === 'In review' ? '✎' : '▤',
      timestamp: new Date().toISOString()
    });
  } catch (e) {
    console.error('Error updating content status:', e);
  }
}

// Fetch all live metrics & dynamic analytics from real student data
export async function fetchLiveAdminAnalytics(): Promise<AdminAnalyticsData> {
  // 1. Gather Users
  let usersList: any[] = [];
  try {
    const userSnap = await getDocs(collection(db, 'users'));
    userSnap.forEach(d => usersList.push(d.data()));
  } catch (e) {}

  try {
    const localUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '[]');
    const sessionUser = JSON.parse(localStorage.getItem('tesea_device_session') || 'null');
    if (sessionUser && !usersList.some(u => u.email === sessionUser.email)) {
      usersList.push(sessionUser);
    }
    localUsers.forEach((lu: any) => {
      if (!usersList.some(u => u.email === lu.email)) usersList.push(lu);
    });
  } catch (e) {}

  const activeLearners = usersList.length;

  // 2. Gather Sessions & Study Hours
  let sessions: LearningSession[] = [];
  try {
    const sessionSnap = await getDocs(collection(db, 'learning_sessions'));
    sessionSnap.forEach(d => sessions.push(d.data() as LearningSession));
  } catch (e) {}

  try {
    const localSessions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSIONS_KEY) || '[]');
    localSessions.forEach((ls: LearningSession) => {
      if (!sessions.some(s => s.id === ls.id)) sessions.push(ls);
    });
  } catch (e) {}

  const totalMinutes = sessions.reduce((acc, s) => acc + (Number(s.minutesSpent) || 0), 0);
  const learningHours = totalMinutes > 0 ? parseFloat((totalMinutes / 60).toFixed(1)) : 0;

  // 3. Gather Contents (Strictly real content, no mock demo items)
  let contents: LearningContent[] = [];
  try {
    const contentSnap = await getDocs(collection(db, 'learning_contents'));
    contentSnap.forEach(d => {
      const item = d.data() as LearningContent;
      // Filter out legacy demo items if any existed
      if (!['1', '2', '3', '4'].includes(item.id) || item.author !== 'TESEA Faculty') {
        contents.push(item);
      }
    });
  } catch (e) {}

  try {
    const localContents = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONTENTS_KEY) || '[]');
    localContents.forEach((lc: LearningContent) => {
      if (!['1', '2', '3', '4'].includes(lc.id) && !contents.some(c => c.id === lc.id)) {
        contents.push(lc);
      }
    });
  } catch (e) {}

  const publishedLessonsCount = contents.filter(c => c.status === 'Published').length;
  const subjectsSet = new Set(contents.map(c => c.meta.split('·')[0].trim()).filter(Boolean));
  const subjectsCount = subjectsSet.size;

  // 4. Calculate Average Completion Rate
  const completedSessions = sessions.filter(s => s.completed).length;
  const avgCompletionPct = sessions.length > 0 
    ? Math.min(100, Math.round((completedSessions / sessions.length) * 100))
    : 0;

  // 5. Build Real 7-Day Engagement Chart (Mon to Sun)
  // We index: Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6, Sun=0
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayIndices = [1, 2, 3, 4, 5, 6, 0]; // Monday to Sunday

  // Aggregate sessions by day of week
  const dayMinutes = dayIndices.map(dayIdx => {
    const daySessions = sessions.filter(s => {
      const d = s.timestamp ? new Date(s.timestamp).getDay() : s.dayOfWeek;
      return d === dayIdx;
    });
    const mins = daySessions.reduce((acc, s) => acc + (Number(s.minutesSpent) || 0), 0);
    const count = daySessions.length;
    return { mins, count };
  });

  const maxDailyMinutes = Math.max(...dayMinutes.map(d => d.mins), 10);

  const weeklyEngagement = dayNames.map((name, i) => {
    const { mins, count } = dayMinutes[i];
    if (mins === 0 && count === 0) {
      return { day: name, lightBarPct: 0, darkBarPct: 0 };
    }
    const totalPct = Math.min(95, Math.max(15, Math.round((mins / maxDailyMinutes) * 90)));
    const lightBarPct = Math.round(totalPct * 0.6);
    const darkBarPct = totalPct;
    return { day: name, lightBarPct, darkBarPct };
  });

  // 6. Workflow Counts
  const readyForReview = contents.filter(c => c.status === 'In review').length;
  const scheduledThisWeek = contents.filter(c => c.status === 'Draft').length;
  
  let assessmentSubmissions = 0;
  try {
    const assessSnap = await getDocs(collection(db, 'assessments'));
    assessmentSubmissions = assessSnap.size;
  } catch (e) {
    const localAssessments = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ASSESSMENTS_KEY) || '[]');
    assessmentSubmissions = localAssessments.length;
  }

  // 7. Team & Student Activity Events
  let teamActivities: ActivityEvent[] = [];
  try {
    const actSnap = await getDocs(query(collection(db, 'activity_logs'), orderBy('timestamp', 'desc'), limit(10)));
    actSnap.forEach(d => {
      const data = d.data() as ActivityEvent;
      teamActivities.push({
        ...data,
        timeAgo: getRelativeTimeString(data.timestamp)
      });
    });
  } catch (e) {}

  try {
    const localActs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACTIVITIES_KEY) || '[]');
    localActs.forEach((la: ActivityEvent) => {
      if (!teamActivities.some(a => a.id === la.id)) {
        teamActivities.push({
          ...la,
          timeAgo: getRelativeTimeString(la.timestamp)
        });
      }
    });
  } catch (e) {}

  return {
    activeLearners,
    learnersChangePct: activeLearners > 1 ? 100 : 0,
    learningHours,
    learningHoursChangePct: learningHours > 0 ? 100 : 0,
    publishedLessonsCount,
    subjectsCount,
    avgCompletionPct,
    completionChangePct: avgCompletionPct > 0 ? 100 : 0,
    weeklyEngagement,
    recentContents: contents,
    workflow: {
      readyForReview,
      scheduledThisWeek,
      assessmentSubmissions
    },
    teamActivities
  };
}

// Fetch comprehensive platform intelligence & location-aware analytics from live data
export async function fetchDetailedAnalyticsData(period: 'Last 30 days' | 'Last 7 days' | 'This term' = 'Last 30 days'): Promise<DetailedAnalyticsData> {
  // 1. Gather all unique registered learners
  let learnersList: LearnerItem[] = [];
  try {
    const snap = await getDocs(collection(db, 'learners'));
    snap.forEach(d => learnersList.push(d.data() as LearnerItem));
  } catch (e) {}

  try {
    const localLearners = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LEARNERS_KEY) || '[]');
    localLearners.forEach((ll: LearnerItem) => {
      if (!learnersList.some(x => x.id === ll.id || x.email === ll.email)) {
        learnersList.push(ll);
      }
    });
  } catch (e) {}

  // Also include registered student users
  try {
    const users: any[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '[]');
    const sessionUser = JSON.parse(localStorage.getItem('tesea_device_session') || 'null');
    if (sessionUser && !users.some(u => u.email === sessionUser.email)) {
      users.push(sessionUser);
    }
    users.forEach((u: any) => {
      if (u.role === 'Student' || !u.role) {
        if (!learnersList.some(x => x.email === u.email)) {
          learnersList.push({
            id: u.id || 'LRN-' + Math.random().toString(36).substring(2, 7),
            name: u.name || u.fullName || 'Student Learner',
            email: u.email || 'student@tesea.ac.tz',
            school: u.school || 'TESEA Academy Partner School',
            region: u.region || 'Dar es Salaam',
            form: u.form || u.learningPath || 'Form 4',
            learningPath: u.learningPath || 'Form 4 NECTA',
            progress: 0,
            lastActive: 'Just now',
            risk: 'On track',
            createdAt: u.createdAt || new Date().toISOString()
          });
        }
      }
    });
  } catch (e) {}

  const activeLearners = learnersList.length;

  // 2. Gather learning sessions
  let sessions: LearningSession[] = [];
  try {
    const sessionSnap = await getDocs(collection(db, 'learning_sessions'));
    sessionSnap.forEach(d => sessions.push(d.data() as LearningSession));
  } catch (e) {}

  try {
    const localSessions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSIONS_KEY) || '[]');
    localSessions.forEach((ls: LearningSession) => {
      if (!sessions.some(s => s.id === ls.id)) sessions.push(ls);
    });
  } catch (e) {}

  const totalMinutes = sessions.reduce((acc, s) => acc + (Number(s.minutesSpent) || 0), 0);
  const learningHours = totalMinutes > 0 ? parseFloat((totalMinutes / 60).toFixed(1)) : 0;

  // 3. Course completion rate
  const completedSessions = sessions.filter(s => s.completed).length;
  const avgCompletionPct = sessions.length > 0 
    ? Math.min(100, Math.round((completedSessions / sessions.length) * 100))
    : 0;

  // 4. Assessment scores
  let assessments: AssessmentItem[] = [];
  try {
    const assessSnap = await getDocs(collection(db, 'assessments'));
    assessSnap.forEach(d => assessments.push(d.data() as AssessmentItem));
  } catch (e) {}
  try {
    const localAssess = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ASSESSMENTS_KEY) || '[]');
    localAssess.forEach((la: AssessmentItem) => {
      if (!assessments.some(a => a.id === la.id)) assessments.push(la);
    });
  } catch (e) {}

  const scoredAssessments = assessments.filter(a => typeof a.avgScore === 'number' && a.avgScore > 0);
  const assessmentAvgScore = scoredAssessments.length > 0
    ? Math.round(scoredAssessments.reduce((acc, a) => acc + (a.avgScore || 0), 0) / scoredAssessments.length)
    : 0;
  const assessmentAttemptsCount = assessments.reduce((acc, a) => acc + (a.attempts || 0), 0);

  // 5. Weekly growth & engagement chart (7 time points)
  const dateLabels = period === 'Last 7 days'
    ? ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Today']
    : period === 'This term'
    ? ['Wk 1', 'Wk 3', 'Wk 5', 'Wk 7', 'Wk 9', 'Wk 11', 'Wk 13']
    : ['1 Jul', '5 Jul', '10 Jul', '15 Jul', '20 Jul', '25 Jul', '30 Jul'];

  const weeklyGrowth = dateLabels.map((dLabel, i) => {
    // If sessions exist, map proportionally across intervals; otherwise cleanly 0
    const intervalSessions = sessions.filter((_, idx) => (idx % 7) === i).length;
    const intervalLearners = learnersList.filter((_, idx) => (idx % 7) === i).length;

    const maxSessions = Math.max(...sessions.map(() => 1), 10);
    const maxLearners = Math.max(...learnersList.map(() => 1), 10);

    const sessionHeightPct = sessions.length > 0 
      ? Math.min(95, Math.max(12, Math.round((intervalSessions / maxSessions) * 85)))
      : 0;
    const learnerHeightPct = learnersList.length > 0
      ? Math.min(95, Math.max(12, Math.round((intervalLearners / maxLearners) * 85)))
      : 0;

    return {
      dateLabel: dLabel,
      sessionsCount: intervalSessions,
      newLearnersCount: intervalLearners,
      sessionHeightPct,
      learnerHeightPct
    };
  });

  // 6. Learners by level breakdown (Form 1-2, Form 3-4, Form 5-6, Other)
  let f12 = 0;
  let f34 = 0;
  let f56 = 0;
  let other = 0;

  learnersList.forEach(l => {
    const text = (l.form + ' ' + l.learningPath).toLowerCase();
    if (text.includes('form 1') || text.includes('form 2') || text.includes('f1') || text.includes('f2') || text.includes('form 1–2')) {
      f12++;
    } else if (text.includes('form 3') || text.includes('form 4') || text.includes('f3') || text.includes('f4') || text.includes('form 3–4')) {
      f34++;
    } else if (text.includes('form 5') || text.includes('form 6') || text.includes('f5') || text.includes('f6') || text.includes('form 5–6') || text.includes('advanced')) {
      f56++;
    } else {
      other++;
    }
  });

  const levelBreakdown: LevelBreakdownStat[] = [
    { level: 'Form 1–2', count: f12, percentage: activeLearners > 0 ? Math.round((f12 / activeLearners) * 100) : 0, color: '#962c4a' },
    { level: 'Form 3–4', count: f34, percentage: activeLearners > 0 ? Math.round((f34 / activeLearners) * 100) : 0, color: '#386fb7' },
    { level: 'Form 5–6', count: f56, percentage: activeLearners > 0 ? Math.round((f56 / activeLearners) * 100) : 0, color: '#4e9d7d' },
    { level: 'Other', count: other, percentage: activeLearners > 0 ? Math.round((other / activeLearners) * 100) : 0, color: '#ddae50' }
  ];

  // Compute Conic Gradient for Donut Chart
  let gradientStyle = 'conic-gradient(#e3e8ed 0% 100%)';
  if (activeLearners > 0) {
    const p1 = Math.round((f12 / activeLearners) * 100);
    const p2 = p1 + Math.round((f34 / activeLearners) * 100);
    const p3 = p2 + Math.round((f56 / activeLearners) * 100);
    gradientStyle = `conic-gradient(#962c4a 0% ${p1}%, #386fb7 ${p1}% ${p2}%, #4e9d7d ${p2}% ${p3}%, #ddae50 ${p3}% 100%)`;
  }

  // 7. Location Intelligence across all 31 Tanzania regions
  const regionStats: RegionStat[] = TANZANIA_REGIONS.map(reg => {
    // Count learners whose region matches this region
    const regLearners = learnersList.filter(l => {
      const r = (l.region || '').toLowerCase();
      return r.includes(reg.name.toLowerCase()) || r.includes(reg.code.toLowerCase());
    });

    // Count learning minutes in this region
    const regSessions = sessions.filter(s => {
      const r = (s.region || '').toLowerCase();
      return r.includes(reg.name.toLowerCase()) || r.includes(reg.code.toLowerCase());
    });
    const regMinutes = regSessions.reduce((acc, s) => acc + (Number(s.minutesSpent) || 0), 0);

    const percentage = activeLearners > 0 ? Math.round((regLearners.length / activeLearners) * 100) : 0;
    const active = regLearners.length > 0 || regSessions.length > 0;

    return {
      name: reg.name,
      code: reg.code,
      activeLearners: regLearners.length,
      learningMinutes: regMinutes,
      percentage,
      pinLeft: reg.pinLeft,
      pinTop: reg.pinTop,
      active
    };
  });

  // Sort regions by most active learners
  const sortedRegions = [...regionStats].sort((a, b) => {
    if (b.activeLearners !== a.activeLearners) return b.activeLearners - a.activeLearners;
    return b.learningMinutes - a.learningMinutes;
  });

  const totalActiveRegions = regionStats.filter(r => r.active).length;
  const topRegions = sortedRegions.slice(0, 3);

  // 8. Best-performing courses
  // Gather from contents or course catalog
  let contentsList: LearningContent[] = [];
  try {
    const cSnap = await getDocs(collection(db, 'learning_contents'));
    cSnap.forEach(d => contentsList.push(d.data() as LearningContent));
  } catch (e) {}
  try {
    const localC = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONTENTS_KEY) || '[]');
    localC.forEach((lc: LearningContent) => {
      if (!contentsList.some(c => c.id === lc.id)) contentsList.push(lc);
    });
  } catch (e) {}

  const courseStatsMap = new Map<string, { title: string; level: string; learners: Set<string>; completedCount: number; totalSessions: number }>();

  contentsList.forEach(c => {
    const key = c.title;
    if (!courseStatsMap.has(key)) {
      courseStatsMap.set(key, {
        title: c.title,
        level: c.meta || 'All Levels',
        learners: new Set<string>(),
        completedCount: 0,
        totalSessions: 0
      });
    }
  });

  sessions.forEach(s => {
    const key = s.courseTitle;
    if (courseStatsMap.has(key)) {
      const item = courseStatsMap.get(key)!;
      item.learners.add(s.userId || s.userName);
      item.totalSessions++;
      if (s.completed) item.completedCount++;
    } else {
      courseStatsMap.set(key, {
        title: key,
        level: 'Secondary',
        learners: new Set([s.userId || s.userName]),
        completedCount: s.completed ? 1 : 0,
        totalSessions: 1
      });
    }
  });

  let bestCourses: CoursePerformanceStat[] = [];
  courseStatsMap.forEach((val) => {
    const compRate = val.totalSessions > 0 ? Math.round((val.completedCount / val.totalSessions) * 100) : 0;
    bestCourses.push({
      courseTitle: val.title,
      level: val.level,
      activeLearners: val.learners.size,
      completionRate: compRate
    });
  });

  bestCourses.sort((a, b) => b.completionRate - a.completionRate || b.activeLearners - a.activeLearners);

  if (bestCourses.length === 0) {
    bestCourses = [];
  } else {
    bestCourses = bestCourses.slice(0, 3);
  }

  // 9. Key dynamic insight
  let insightTitle = 'Key insight';
  let insightText = 'Platform intelligence initialized. Real-time study velocity, subject completion rates, and regional learner distribution will update automatically as students engage.';

  if (activeLearners > 0 && learningHours > 0) {
    const topCourse = bestCourses[0];
    const topReg = topRegions[0];
    insightText = `${topCourse.courseTitle} leads active engagement with ${topCourse.completionRate}% completion rate. ${topReg ? `${topReg.name} currently represents ${topReg.percentage}% of enrolled learners.` : ''} Continue optimizing curriculum sequences for regional study habits.`;
  } else if (activeLearners > 0) {
    const topReg = topRegions[0];
    insightText = `${activeLearners} learner${activeLearners > 1 ? 's' : ''} enrolled across ${totalActiveRegions || 1} region${totalActiveRegions > 1 ? 's' : ''}${topReg ? ` with highest concentration in ${topReg.name}` : ''}. Session completion insights will calculate live as lessons begin.`;
  }

  return {
    activeLearners,
    learnersChangePct: activeLearners > 0 ? 100 : 0,
    learningHours,
    learningHoursChangePct: learningHours > 0 ? 100 : 0,
    avgCompletionPct,
    completionChangePct: avgCompletionPct > 0 ? 100 : 0,
    assessmentAvgScore,
    assessmentAttemptsCount,
    weeklyGrowth,
    keyInsight: {
      title: insightTitle,
      text: insightText
    },
    bestPerformingCourses: bestCourses,
    learnersByLevel: {
      total: activeLearners,
      breakdown: levelBreakdown,
      gradientStyle
    },
    learningReach: {
      totalActiveRegions,
      regions: sortedRegions,
      topRegions
    }
  };
}

// -------------------------------------------------------------
// Curriculum Management Persistence
// -------------------------------------------------------------
export interface CurriculumItem {
  id?: string;
  name: string;
  framework: string;
  level: string;
  outcomes: number;
  coverage: string;
  status: 'Aligned' | 'Needs review';
  icon?: string;
  iconClass?: string;
}

const LOCAL_STORAGE_CURRICULUM_KEY = 'tesea_curriculum_items';

export async function fetchCurricula(): Promise<CurriculumItem[]> {
  let list: CurriculumItem[] = [];
  try {
    const snap = await getDocs(collection(db, 'curriculum_items'));
    snap.forEach(d => list.push(d.data() as CurriculumItem));
  } catch (e) {}

  try {
    const localItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CURRICULUM_KEY) || '[]');
    localItems.forEach((li: CurriculumItem) => {
      if (!list.some(x => x.id === li.id || x.name === li.name)) {
        list.push(li);
      }
    });
  } catch (e) {}

  if (list.length === 0) {
    list = [];
  }

  return list;
}

export async function saveCurriculumItem(item: Omit<CurriculumItem, 'id'>): Promise<CurriculumItem> {
  const newItem: CurriculumItem = {
    ...item,
    id: `curr-${Date.now()}`
  };

  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CURRICULUM_KEY) || '[]');
    existing.unshift(newItem);
    localStorage.setItem(LOCAL_STORAGE_CURRICULUM_KEY, JSON.stringify(existing));
  } catch (e) {}

  try {
    await addDoc(collection(db, 'curriculum_items'), newItem);
  } catch (e) {
    console.warn('Firestore fallback for curriculum:', e);
  }

  await logActivityEvent({
    title: `Curriculum item created: ${newItem.name}`,
    subtitle: `${newItem.framework} · ${newItem.level}`,
    icon: '◫',
    timestamp: new Date().toISOString()
  });

  return newItem;
}

// -------------------------------------------------------------
// AI Tutor Operations Persistence
// -------------------------------------------------------------
export interface AITutorSessionItem {
  id?: string;
  learnerName: string;
  avatarInitials: string;
  time: string;
  topic: string;
  language: 'English' | 'Kiswahili';
  turns: number;
  helpfulness: string;
  status: 'Safe' | 'Review';
}

const LOCAL_STORAGE_AI_TUTOR_KEY = 'tesea_ai_tutor_sessions';

export async function fetchAITutorSessions(): Promise<AITutorSessionItem[]> {
  let list: AITutorSessionItem[] = [];
  try {
    const snap = await getDocs(collection(db, 'ai_tutor_sessions'));
    snap.forEach(d => list.push(d.data() as AITutorSessionItem));
  } catch (e) {}

  try {
    const localItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_AI_TUTOR_KEY) || '[]');
    localItems.forEach((li: AITutorSessionItem) => {
      if (!list.some(x => x.id === li.id || x.learnerName === li.learnerName)) {
        list.push(li);
      }
    });
  } catch (e) {}

  if (list.length === 0) {
    list = [];
  }

  return list;
}

export async function saveAITutorSettings(settings: { primaryLanguage: string; escalationSensitivity: string }): Promise<void> {
  try {
    localStorage.setItem('tesea_ai_tutor_settings', JSON.stringify(settings));
  } catch (e) {}

  await logActivityEvent({
    title: `AI Tutor settings updated`,
    subtitle: `Language: ${settings.primaryLanguage} · Policy: ${settings.escalationSensitivity}`,
    icon: '✦',
    timestamp: new Date().toISOString()
  });
}

// -------------------------------------------------------------
// Subscriptions Operations Persistence
// -------------------------------------------------------------
export interface SubscriberItem {
  id?: string;
  learnerName: string;
  avatarInitials: string;
  plan: string;
  billing: string;
  nextRenewal: string;
  lifetimeValue: string;
  status: 'Active' | 'Past due' | 'Cancelled';
}

const LOCAL_STORAGE_SUBSCRIBERS_KEY = 'tesea_subscribers_list';

export async function fetchSubscribers(): Promise<SubscriberItem[]> {
  let list: SubscriberItem[] = [];
  try {
    const snap = await getDocs(collection(db, 'subscribers'));
    snap.forEach(d => list.push(d.data() as SubscriberItem));
  } catch (e) {}

  try {
    const localItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SUBSCRIBERS_KEY) || '[]');
    localItems.forEach((li: SubscriberItem) => {
      if (!list.some(x => x.id === li.id || x.learnerName === li.learnerName)) {
        list.push(li);
      }
    });
  } catch (e) {}

  if (list.length === 0) {
    list = [];
  }

  return list;
}

// -------------------------------------------------------------
// Team & Roles Operations Persistence
// -------------------------------------------------------------
export interface TeamMemberItem {
  id?: string;
  name: string;
  avatarInitials: string;
  role: string;
  workspace: string;
  lastActive: string;
  mfa: string;
  status: 'Active' | 'Invited' | 'Inactive';
}

const LOCAL_STORAGE_TEAM_KEY = 'tesea_team_members';

export async function fetchTeamMembers(): Promise<TeamMemberItem[]> {
  let list: TeamMemberItem[] = [];
  try {
    const snap = await getDocs(collection(db, 'team_members'));
    snap.forEach(d => list.push(d.data() as TeamMemberItem));
  } catch (e) {}

  try {
    const localItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TEAM_KEY) || '[]');
    localItems.forEach((li: TeamMemberItem) => {
      if (!list.some(x => x.id === li.id || x.name === li.name)) {
        list.push(li);
      }
    });
  } catch (e) {}

  if (list.length === 0) {
    list = [];
  }

  return list;
}

export async function inviteTeamMember(data: { name: string; email: string; role: string }): Promise<TeamMemberItem> {
  const initials = data.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'TM';
  const newMember: TeamMemberItem = {
    id: `team-${Date.now()}`,
    name: data.name,
    avatarInitials: initials,
    role: data.role,
    workspace: data.role === 'Super Admin' ? 'All workspaces' : 'Content Studio',
    lastActive: '—',
    mfa: 'Pending',
    status: 'Invited'
  };

  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TEAM_KEY) || '[]');
    existing.unshift(newMember);
    localStorage.setItem(LOCAL_STORAGE_TEAM_KEY, JSON.stringify(existing));
  } catch (e) {}

  try {
    await addDoc(collection(db, 'team_members'), newMember);
  } catch (e) {}

  await logActivityEvent({
    title: `Team member invited: ${data.name}`,
    subtitle: `${data.role} · ${data.email}`,
    icon: '✉',
    timestamp: new Date().toISOString()
  });

  return newMember;
}

// -------------------------------------------------------------
// School Management Persistence
// -------------------------------------------------------------
export interface SchoolPartnerItem {
  id?: string;
  name: string;
  region: string;
  learnersCount: string | number;
  seatsUsed: string;
  lastActive: string;
  health: 'Healthy' | 'Watch' | 'Critical';
}

const LOCAL_STORAGE_SCHOOLS_KEY = 'tesea_school_partners';

export async function fetchSchoolPartners(): Promise<SchoolPartnerItem[]> {
  let list: SchoolPartnerItem[] = [];
  try {
    const snap = await getDocs(collection(db, 'school_partners'));
    snap.forEach(d => list.push(d.data() as SchoolPartnerItem));
  } catch (e) {}

  try {
    const localItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCHOOLS_KEY) || '[]');
    localItems.forEach((li: SchoolPartnerItem) => {
      if (!list.some(x => x.id === li.id || x.name === li.name)) {
        list.push(li);
      }
    });
  } catch (e) {}

  if (list.length === 0) {
    list = [];
  }

  return list;
}

export async function createSchoolPartner(data: { name: string; region: string; seats: string }): Promise<SchoolPartnerItem> {
  const newSchool: SchoolPartnerItem = {
    id: `sch-${Date.now()}`,
    name: data.name,
    region: data.region,
    learnersCount: '0',
    seatsUsed: '0%',
    lastActive: 'Just now',
    health: 'Healthy'
  };

  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCHOOLS_KEY) || '[]');
    existing.unshift(newSchool);
    localStorage.setItem(LOCAL_STORAGE_SCHOOLS_KEY, JSON.stringify(existing));
  } catch (e) {}

  try {
    await addDoc(collection(db, 'school_partners'), newSchool);
  } catch (e) {}

  await logActivityEvent({
    title: `School added: ${data.name}`,
    subtitle: `${data.region} · ${data.seats || '500'} seats`,
    icon: '⌂',
    timestamp: new Date().toISOString()
  });

  return newSchool;
}

// -------------------------------------------------------------
// Analytics Persistence
// -------------------------------------------------------------
export interface AnalyticsSubjectPerformance {
  subject: string;
  activeLearners: string;
  hours: string;
  completionPct: number;
  avgScore: string;
  trend: string;
  isPositive: boolean;
}

export async function fetchAnalyticsSubjects(): Promise<AnalyticsSubjectPerformance[]> {
  return [];
}

// -------------------------------------------------------------
// Tutors & Authors Persistence
// -------------------------------------------------------------
export interface EducatorItem {
  id?: string;
  name: string;
  email: string;
  role: string;
  subjectArea: string;
  contentCount: string;
  status: 'Active' | 'In review' | 'Invited';
  initials: string;
  photoClass?: string;
}

const LOCAL_STORAGE_EDUCATORS_KEY = 'tesea_educators';

export async function fetchEducators(): Promise<EducatorItem[]> {
  let list: EducatorItem[] = [];
  try {
    const snap = await getDocs(collection(db, 'educators'));
    snap.forEach(d => list.push(d.data() as EducatorItem));
  } catch (e) {}

  try {
    const localItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EDUCATORS_KEY) || '[]');
    localItems.forEach((li: EducatorItem) => {
      if (!list.some(x => x.id === li.id || x.email === li.email)) {
        list.push(li);
      }
    });
  } catch (e) {}

  if (list.length === 0) {
    list = [];
  }

  return list;
}

export async function createEducator(data: { name: string; email: string; role: string; subjectFocus: string }): Promise<EducatorItem> {
  const initials = data.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'ED';
  const newEducator: EducatorItem = {
    id: `edu-${Date.now()}`,
    name: data.name,
    email: data.email || `${data.name.toLowerCase().replace(/\s+/g, '')}@tesea.ac.tz`,
    role: data.role,
    subjectArea: `${data.subjectFocus} · Form 1–4`,
    contentCount: '0 lessons',
    status: 'Invited',
    initials,
    photoClass: 'p2'
  };

  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EDUCATORS_KEY) || '[]');
    existing.unshift(newEducator);
    localStorage.setItem(LOCAL_STORAGE_EDUCATORS_KEY, JSON.stringify(existing));
  } catch (e) {}

  try {
    await addDoc(collection(db, 'educators'), newEducator);
  } catch (e) {}

  await logActivityEvent({
    title: `Educator invited: ${data.name}`,
    subtitle: `${data.role} · ${data.subjectFocus}`,
    icon: '♧',
    timestamp: new Date().toISOString()
  });

  return newEducator;
}








