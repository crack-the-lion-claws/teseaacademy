import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { 
  fetchLiveAdminAnalytics, 
  saveLearningContent, 
  updateContentStatus,
  AdminAnalyticsData, 
  LearningContent 
} from '../lib/learningService';
import AdminSubjectsCoursesView from './AdminSubjectsCoursesView';
import AdminAssessmentsView from './AdminAssessmentsView';
import AdminLearnersView from './AdminLearnersView';
import AdminSubscriptionsView from './AdminSubscriptionsView';
import AdminAnalyticsView from './AdminAnalyticsView';
import AdminTutorsAuthorsView from './AdminTutorsAuthorsView';
import AdminContentStudioSettingsView from './AdminContentStudioSettingsView';
import SuperAdminDashboard from './SuperAdminDashboard';

interface SchoolAdminDashboardProps {
  userName?: string;
  userEmail?: string;
  onLogout: () => void;
  showToast: (msg: string) => void;
}

export default function SchoolAdminDashboard({
  userName = 'Emmanuel Godfrey',
  userEmail = 'admin@tesea.ac.tz',
  onLogout,
  showToast
}: SchoolAdminDashboardProps) {
  const [currentWorkspace, setCurrentWorkspace] = useState<'Content Studio' | 'Super Admin'>('Content Studio');
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentType, setContentType] = useState<'Video' | 'Text' | 'Document' | 'Audio'>('Video');
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Physics · Form 5');
  const [newStatus, setNewStatus] = useState<'Published' | 'In review' | 'Draft'>('Draft');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showHelpWidget, setShowHelpWidget] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [analytics, setAnalytics] = useState<AdminAnalyticsData>({
    activeLearners: 1,
    learnersChangePct: 0,
    learningHours: 0,
    learningHoursChangePct: 0,
    publishedLessonsCount: 0,
    subjectsCount: 1,
    avgCompletionPct: 0,
    completionChangePct: 0,
    weeklyEngagement: [
      { day: 'Mon', lightBarPct: 0, darkBarPct: 0 },
      { day: 'Tue', lightBarPct: 0, darkBarPct: 0 },
      { day: 'Wed', lightBarPct: 0, darkBarPct: 0 },
      { day: 'Thu', lightBarPct: 0, darkBarPct: 0 },
      { day: 'Fri', lightBarPct: 0, darkBarPct: 0 },
      { day: 'Sat', lightBarPct: 0, darkBarPct: 0 },
      { day: 'Sun', lightBarPct: 0, darkBarPct: 0 }
    ],
    recentContents: [],
    workflow: {
      readyForReview: 0,
      scheduledThisWeek: 0,
      assessmentSubmissions: 0
    },
    teamActivities: []
  });

  const loadData = async () => {
    try {
      const data = await fetchLiveAdminAnalytics();
      setAnalytics(data);
    } catch (e) {
      console.warn('Failed to fetch admin analytics:', e);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      loadData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate EAT (East Africa Time, UTC+3, Dodoma, Tanzania)
  const getEATDetails = (date: Date) => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Dar_es_Salaam',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      });
      const parts = formatter.formatToParts(date);
      const getPart = (type: string) => parts.find(p => p.type === type)?.value || '';
      
      const year = getPart('year');
      const month = getPart('month');
      const day = getPart('day');
      const hour = parseInt(getPart('hour'), 10) || 0;
      const minute = parseInt(getPart('minute'), 10) || 0;
      const second = parseInt(getPart('second'), 10) || 0;

      return { year, month, day, hour, minute, second };
    } catch (e) {
      return {
        year: date.getFullYear().toString(),
        month: date.toLocaleString('en-US', { month: 'long' }),
        day: date.getDate().toString(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
      };
    }
  };

  const eat = getEATDetails(currentTime);
  const formattedDateStr = `${eat.month.toUpperCase()} ${eat.day}, ${eat.year}`;

  const getGreeting = (hour: number) => {
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const greeting = getGreeting(eat.hour);
  const displayName = userName && userName.trim() && userName.toLowerCase() !== 'administrator' ? userName : 'Emmanuel Godfrey';

  const handleCreateContent = async () => {
    const titleToUse = newTitle.trim() || 'Untitled learning asset';
    const formatType = contentType.toLowerCase() as 'video' | 'text' | 'audio' | 'pdf';
    const formatLabel = contentType === 'Video' ? 'Video · 15:00' : contentType === 'Audio' ? 'Audio · 12:00' : contentType === 'Document' ? 'PDF · 1.8 MB' : 'Text lesson';

    await saveLearningContent({
      title: titleToUse,
      meta: newSubject,
      format: formatLabel,
      formatType: formatType === ('document' as any) ? 'pdf' : formatType,
      author: displayName,
      status: newStatus
    });

    setNewTitle('');
    setIsModalOpen(false);
    showToast(`${contentType} “${titleToUse}” saved successfully.`);
    await loadData();
  };

  const filteredContents = analytics.recentContents.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.meta.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (currentWorkspace === 'Super Admin') {
    return (
      <SuperAdminDashboard
        onSwitchWorkspace={(ws) => {
          setCurrentWorkspace(ws);
          if (ws === 'Content Studio') {
            showToast('Switched to TESEA Content Studio.');
          }
        }}
        onLogout={onLogout}
        showToast={showToast}
        userName={userName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7f9] text-[#17212e] font-sans antialiased flex">
      {/* Sidebar */}
      <aside className="w-[256px] bg-[#202935] text-[#c4ced7] p-[23px_15px] sticky top-0 h-screen hidden lg:block overflow-y-auto shrink-0">
        <div className="flex items-center bg-white rounded-lg p-[7px_10px] mb-[31px]">
          <img src="/logo.png" alt="TESEA Academy" className="w-[170px] h-[47px] object-contain object-left" />
        </div>
        <p className="text-[11px] uppercase tracking-[0.11em] text-[#8090a0] font-bold mx-[12px] mb-[10px]">Workspace</p>
        
        {/* Interactive Workspace Dropdown with Slide Down */}
        <div className="relative mb-[25px]">
          <button
            onClick={() => setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen)}
            className="w-full bg-[#2e3946] hover:bg-[#374554] transition-colors rounded-lg p-[11px_12px] flex justify-between items-center text-white font-bold text-[13px] border-0 cursor-pointer text-left shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d56a89]"></span>
              <span>TESEA Content Studio</span>
            </div>
            <span className={`text-[11px] text-[#96a2ae] transition-transform duration-200 ${isWorkspaceDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {/* Slide-Down Dropdown Menu */}
          {isWorkspaceDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#17202a] border border-[#394655] rounded-lg p-1.5 z-40 shadow-2xl">
              <button
                onClick={() => {
                  setIsWorkspaceDropdownOpen(false);
                  setCurrentWorkspace('Content Studio');
                }}
                className="w-full text-left bg-[#283543] text-white p-[9px_10px] rounded-md text-[12px] font-bold border-0 cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d56a89]"></span>
                  <span>TESEA Content Studio</span>
                </div>
                <span className="text-[10px] text-[#d56a89] font-bold">Active</span>
              </button>

              <button
                onClick={() => {
                  setIsWorkspaceDropdownOpen(false);
                  setCurrentWorkspace('Super Admin');
                  showToast('Switched to Super Admin workspace.');
                }}
                className="w-full text-left bg-transparent hover:bg-[#283543] text-[#c4ced7] hover:text-white p-[9px_10px] rounded-md text-[12px] font-semibold border-0 cursor-pointer flex items-center gap-2 mt-1 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#057b79]"></span>
                <span>Super Admin</span>
              </button>
            </div>
          )}
        </div>

        <span className="block m-[23px_12px_8px] text-[#8290a0] text-[10px] font-bold tracking-[0.12em]">OVERVIEW</span>
        <button 
          onClick={() => { setActiveNav('Dashboard'); showToast('Dashboard refreshed.'); }}
          className={`w-full flex items-center gap-[11px] text-left p-[11px_12px] rounded-[7px] my-[2px] text-[13px] bg-transparent border-0 cursor-pointer ${activeNav === 'Dashboard' ? 'bg-[#3b2630] text-white shadow-[inset_3px_0_#d56a89]' : 'text-[#c8d0d8] hover:bg-[#3b2630] hover:text-white'}`}
        >
          <span className="w-[17px] text-center">▦</span> Dashboard
        </button>
        <button 
          onClick={() => { setActiveNav('Analytics'); showToast('Analytics workspace opened.'); }}
          className={`w-full flex items-center gap-[11px] text-left p-[11px_12px] rounded-[7px] my-[2px] text-[13px] bg-transparent border-0 cursor-pointer ${activeNav === 'Analytics' ? 'bg-[#3b2630] text-white shadow-[inset_3px_0_#d56a89]' : 'text-[#c8d0d8] hover:bg-[#3b2630] hover:text-white'}`}
        >
          <span className="w-[17px] text-center">◔</span> Analytics
        </button>

        <span className="block m-[23px_12px_8px] text-[#8290a0] text-[10px] font-bold tracking-[0.12em]">CURRICULUM</span>
        <button 
          onClick={() => { setActiveNav('Subjects'); showToast(`${analytics.subjectsCount} subjects active in curriculum.`); }}
          className={`w-full flex items-center gap-[11px] text-left p-[11px_12px] rounded-[7px] my-[2px] text-[13px] bg-transparent border-0 cursor-pointer ${activeNav === 'Subjects' ? 'bg-[#3b2630] text-white shadow-[inset_3px_0_#d56a89]' : 'text-[#c8d0d8] hover:bg-[#3b2630] hover:text-white'}`}
        >
          <span className="w-[17px] text-center">◈</span> Subjects & courses
        </button>
        <button 
          onClick={() => { setIsModalOpen(true); }}
          className="w-full flex items-center gap-[11px] text-left p-[11px_12px] rounded-[7px] my-[2px] text-[13px] bg-transparent border-0 cursor-pointer text-[#c8d0d8] hover:bg-[#3b2630] hover:text-white"
        >
          <span className="w-[17px] text-center">▤</span> Content library
        </button>
        <button 
          onClick={() => { setActiveNav('Assessments'); showToast('Assessments workspace active.'); }}
          className={`w-full flex items-center gap-[11px] text-left p-[11px_12px] rounded-[7px] my-[2px] text-[13px] bg-transparent border-0 cursor-pointer ${activeNav === 'Assessments' ? 'bg-[#3b2630] text-white shadow-[inset_3px_0_#d56a89]' : 'text-[#c8d0d8] hover:bg-[#3b2630] hover:text-white'}`}
        >
          <span className="w-[17px] text-center">✓</span> Assessments
        </button>

        <span className="block m-[23px_12px_8px] text-[#8290a0] text-[10px] font-bold tracking-[0.12em]">MANAGE</span>
        <button 
          onClick={() => { setActiveNav('Learners'); showToast('Learner management workspace active.'); }} 
          className={`w-full flex items-center gap-[11px] text-left p-[11px_12px] rounded-[7px] my-[2px] text-[13px] bg-transparent border-0 cursor-pointer ${activeNav === 'Learners' ? 'bg-[#3b2630] text-white shadow-[inset_3px_0_#d56a89]' : 'text-[#c8d0d8] hover:bg-[#3b2630] hover:text-white'}`}
        >
          <span className="w-[17px] text-center">♙</span> Learners
        </button>
        <button 
          onClick={() => { setActiveNav('Tutors'); showToast('Tutors & authors active.'); }} 
          className={`w-full flex items-center gap-[11px] text-left p-[11px_12px] rounded-[7px] my-[2px] text-[13px] bg-transparent border-0 cursor-pointer ${activeNav === 'Tutors' ? 'bg-[#3b2630] text-white shadow-[inset_3px_0_#d56a89]' : 'text-[#c8d0d8] hover:bg-[#3b2630] hover:text-white'}`}
        >
          <span className="w-[17px] text-center">♧</span> Tutors & authors
        </button>
        <button 
          onClick={() => { setActiveNav('Subscriptions'); showToast('Subscriptions workspace active.'); }} 
          className={`w-full flex items-center gap-[11px] text-left p-[11px_12px] rounded-[7px] my-[2px] text-[13px] bg-transparent border-0 cursor-pointer ${activeNav === 'Subscriptions' ? 'bg-[#3b2630] text-white shadow-[inset_3px_0_#d56a89]' : 'text-[#c8d0d8] hover:bg-[#3b2630] hover:text-white'}`}
        >
          <span className="w-[17px] text-center">◉</span> Subscriptions
        </button>
        <button 
          onClick={() => { setActiveNav('Settings'); showToast('Settings selected.'); }} 
          className={`w-full flex items-center gap-[11px] text-left p-[11px_12px] rounded-[7px] my-[2px] text-[13px] bg-transparent border-0 cursor-pointer ${activeNav === 'Settings' ? 'bg-[#3b2630] text-white shadow-[inset_3px_0_#d56a89]' : 'text-[#c8d0d8] hover:bg-[#3b2630] hover:text-white'}`}
        >
          <span className="w-[17px] text-center">⚙</span> Settings
        </button>

        {showHelpWidget && (
          <div className="absolute bottom-[23px] left-[15px] right-[15px] bg-[#28333f] border border-[#394653] p-[13px] rounded-lg relative">
            <button 
              onClick={() => setShowHelpWidget(false)} 
              aria-label="Close" 
              title="Close"
              className="absolute top-[8px] right-[8px] w-5 h-5 flex items-center justify-center text-[#96a2ae] hover:text-white bg-transparent border-0 cursor-pointer text-[14px] leading-none rounded transition-colors"
            >
              ×
            </button>
            <b className="text-[12px] text-white pr-4 block">Need a hand?</b>
            <small className="block text-[10px] text-[#96a2ae] my-[4px_0_10px]">Open the CMS guide or contact support.</small>
            <button onClick={() => showToast('CMS guide loaded.')} className="border-0 bg-transparent text-[#e8a0b6] p-0 text-[11px] font-bold cursor-pointer">Open CMS guide →</button>
          </div>
        )}
      </aside>

      <section className="flex-1 min-w-0">
        <header className="h-[73px] bg-white border-b border-[#e4e8ed] flex items-center px-6 lg:px-[43px] gap-[22px]">
          <div className="text-[12px] text-[#7e8995]">
            Content Studio <span>/</span> {activeNav === 'Analytics' ? <>Overview <span>/</span> <b className="text-[#962c4a]">Analytics</b></> : activeNav === 'Subjects' ? <>Curriculum <span>/</span> <b className="text-[#962c4a]">Subjects & courses</b></> : activeNav === 'Assessments' ? <>Curriculum <span>/</span> <b className="text-[#962c4a]">Assessments</b></> : activeNav === 'Learners' ? <>Manage <span>/</span> <b className="text-[#962c4a]">Learners</b></> : activeNav === 'Tutors' ? <>Manage <span>/</span> <b className="text-[#962c4a]">Tutors & authors</b></> : activeNav === 'Subscriptions' ? <>Manage <span>/</span> <b className="text-[#962c4a]">Subscriptions</b></> : activeNav === 'Settings' ? <>Account <span>/</span> <b className="text-[#962c4a]">Settings</b></> : <b className="text-[#962c4a]">Dashboard</b>}
          </div>
          <div className="ml-auto flex items-center gap-4">
            <button onClick={() => showToast(`${analytics.workflow.readyForReview} items awaiting review.`)} className="border-0 bg-transparent text-[#53606c] text-[12px] font-bold cursor-pointer">Approvals</button>
            <button onClick={() => showToast('Help centre opened.')} className="w-[30px] h-[30px] rounded-full bg-[#f2f5f7] border-0 text-[#53606c] font-bold cursor-pointer grid place-items-center">?</button>
            <div className="flex gap-[9px] items-center">
              <div className="bg-gradient-to-br from-[#a34a67] to-[#542131] text-white rounded-full w-[34px] h-[34px] grid place-items-center text-[11px] font-bold">
                {userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <span className="text-[12px] font-bold block">{userName}</span>
              </div>
            </div>
            <button onClick={onLogout} className="p-2 text-slate-500 hover:text-[#962c4c] ml-2" title="Log out">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {activeNav === 'Analytics' ? (
          <AdminAnalyticsView showToast={showToast} adminName={userName} />
        ) : activeNav === 'Subjects' ? (
          <AdminSubjectsCoursesView showToast={showToast} onOpenDashboard={() => setActiveNav('Dashboard')} />
        ) : activeNav === 'Assessments' ? (
          <AdminAssessmentsView showToast={showToast} adminName={userName} />
        ) : activeNav === 'Learners' ? (
          <AdminLearnersView showToast={showToast} adminName={userName} />
        ) : activeNav === 'Tutors' ? (
          <AdminTutorsAuthorsView showToast={showToast} adminName={userName} />
        ) : activeNav === 'Subscriptions' ? (
          <AdminSubscriptionsView showToast={showToast} adminName={userName} />
        ) : activeNav === 'Settings' ? (
          <AdminContentStudioSettingsView showToast={showToast} adminName={userName} />
        ) : (
          <main className="p-[33px_24px_55px] lg:p-[33px_43px_55px] max-w-[1520px] mx-auto">
          <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5 mb-[27px]">
            <div>
              <span className="text-[#9099a5] text-[10px] tracking-[0.12em] uppercase font-bold">CONTENT OPERATIONS · {formattedDateStr}</span>
              <h1 className="font-serif font-bold text-[34px] tracking-[-0.035em] mt-[5px] mb-0">{greeting}.</h1>
              <p className="m-0 text-[#65717e] text-[12px]">Here is a live view of TESEA Academy’s learning operation.</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="bg-[#962c4a] border-0 text-white rounded-[7px] p-[11px_15px] text-[12px] font-bold shadow-[0_8px_18px_rgba(150,44,74,.2)] cursor-pointer">
              ＋ Create learning content
            </button>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px] mb-[27px]">
            <article className="bg-white border border-[#e4e8ed] rounded-[11px] p-[16px] min-h-[106px] relative">
              <div className="float-right w-[31px] h-[31px] rounded-[8px] grid place-items-center bg-[#fbf0f3] text-[#962c4a]">♙</div>
              <small className="text-[11px] text-[#65717e] block">Active learners</small>
              <strong className="block text-[22px] my-[8px_0_3px]">{analytics.activeLearners.toLocaleString()}</strong>
              <small className="text-[11px] text-[#65717e]">{analytics.learnersChangePct > 0 ? <><span className="text-[#15956c] font-bold">↑ {analytics.learnersChangePct}%</span> vs last month</> : 'Registered learners'}</small>
            </article>

            <article className="bg-white border border-[#e4e8ed] rounded-[11px] p-[16px] min-h-[106px] relative">
              <div className="float-right w-[31px] h-[31px] rounded-[8px] grid place-items-center bg-[#eef9f5] text-[#15956c]">◷</div>
              <small className="text-[11px] text-[#65717e] block">Learning hours</small>
              <strong className="block text-[22px] my-[8px_0_3px]">{analytics.learningHours.toLocaleString()}</strong>
              <small className="text-[11px] text-[#65717e]">{analytics.learningHoursChangePct > 0 ? <><span className="text-[#15956c] font-bold">↑ {analytics.learningHoursChangePct}%</span> this month</> : 'Total student study time'}</small>
            </article>

            <article className="bg-white border border-[#e4e8ed] rounded-[11px] p-[16px] min-h-[106px] relative">
              <div className="float-right w-[31px] h-[31px] rounded-[8px] grid place-items-center bg-[#f2f5f8] text-[#607489]">▤</div>
              <small className="text-[11px] text-[#65717e] block">Published lessons</small>
              <strong className="block text-[22px] my-[8px_0_3px]">{analytics.publishedLessonsCount.toLocaleString()}</strong>
              <small className="text-[11px] text-[#65717e]">Across {analytics.subjectsCount} subjects</small>
            </article>

            <article className="bg-white border border-[#e4e8ed] rounded-[11px] p-[16px] min-h-[106px] relative">
              <div className="float-right w-[31px] h-[31px] rounded-[8px] grid place-items-center bg-[#f2f5f8] text-[#607489]">◎</div>
              <small className="text-[11px] text-[#65717e] block">Avg. completion</small>
              <strong className="block text-[22px] my-[8px_0_3px]">{analytics.avgCompletionPct}%</strong>
              <small className="text-[11px] text-[#65717e]">{analytics.completionChangePct > 0 ? <><span className="text-[#15956c] font-bold">↑ {analytics.completionChangePct}%</span> strongest this term</> : 'Course progress rate'}</small>
            </article>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.86fr] gap-[22px]">
            <div>
              <article className="bg-white border border-[#e4e8ed] rounded-[12px] p-[19px] shadow-[0_3px_10px_rgba(36,50,65,.02)] mb-[22px]">
                <div className="flex items-start justify-between mb-[17px]">
                  <div>
                    <h2 className="text-[16px] m-0 font-bold">Learning engagement</h2>
                    <p className="m-[4px_0_0] text-[#65717e] text-[11px]">Completed learning sessions over the last seven days</p>
                  </div>
                  <button onClick={() => showToast('Engagement report exported.')} className="bg-transparent border-0 text-[#962c4a] font-bold text-[11px] cursor-pointer">Export report</button>
                </div>
                <div className="h-[190px] flex items-end gap-[11px] px-[5px] border-b border-[#e4e8ed] relative bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_47px,#eef1f4_48px)]">
                  {analytics.weeklyEngagement.map((item, idx) => (
                    <div key={idx} className="h-full flex-1 flex gap-[4px] items-end">
                      <i className="block rounded-[5px_5px_0_0] w-1/2 bg-[#e4c3ce]" style={{ height: item.lightBarPct > 0 ? `${item.lightBarPct}%` : '4px' }}></i>
                      <i className="block rounded-[5px_5px_0_0] w-1/2 bg-[#962c4a]" style={{ height: item.darkBarPct > 0 ? `${item.darkBarPct}%` : '4px' }}></i>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[#9099a5] text-[10px] pt-[9px] px-[5px]">
                  {analytics.weeklyEngagement.map((item, idx) => (
                    <span key={idx}>{item.day}</span>
                  ))}
                </div>
              </article>

              <article className="bg-white border border-[#e4e8ed] rounded-[12px] p-[19px] shadow-[0_3px_10px_rgba(36,50,65,.02)] mt-[22px]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-[17px]">
                  <div>
                    <h2 className="text-[16px] m-0 font-bold">Recent content</h2>
                    <p className="m-[4px_0_0] text-[#65717e] text-[11px]">Latest changes across the learning library</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <input 
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search content"
                      className="border border-[#e4e8ed] rounded-[6px] p-[8px_10px] text-[11px] text-[#65717e] outline-none w-[150px] sm:w-[170px]"
                    />
                    <select 
                      value={statusFilter}
                      onChange={e => setStatusFilter(e.target.value)}
                      className="border border-[#e4e8ed] rounded-[6px] p-[8px_10px] text-[11px] text-[#65717e] outline-none bg-white"
                    >
                      <option value="">All status</option>
                      <option value="Published">Published</option>
                      <option value="In review">In review</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="text-left text-[#8994a0] text-[9px] uppercase tracking-[0.09em] p-[9px_8px] border-b border-[#e4e8ed]">Learning asset</th>
                        <th className="text-left text-[#8994a0] text-[9px] uppercase tracking-[0.09em] p-[9px_8px] border-b border-[#e4e8ed]">Format</th>
                        <th className="text-left text-[#8994a0] text-[9px] uppercase tracking-[0.09em] p-[9px_8px] border-b border-[#e4e8ed]">Author</th>
                        <th className="text-left text-[#8994a0] text-[9px] uppercase tracking-[0.09em] p-[9px_8px] border-b border-[#e4e8ed]">Status</th>
                        <th className="border-b border-[#e4e8ed]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContents.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-6 text-xs text-[#9099a5]">No content items found.</td>
                        </tr>
                      ) : (
                        filteredContents.map(item => (
                          <tr key={item.id}>
                            <td className="text-[11px] p-[12px_8px] border-b border-[#eef1f4] text-[#506070]">
                              <div className="flex items-center gap-2">
                                <div className={`w-[30px] h-[30px] rounded-[7px] grid place-items-center ${item.formatType === 'video' ? 'bg-[#fff0f3] text-[#962c4a]' : 'bg-[#f1f5f7] text-[#627b91]'}`}>
                                  {item.formatType === 'video' ? '▶' : item.formatType === 'audio' ? '♫' : item.formatType === 'pdf' ? '▤' : '¶'}
                                </div>
                                <span>
                                  <b className="text-[#17212e] block text-[12px]">{item.title}</b>
                                  <small className="block text-[#929ca7] mt-[3px]">{item.meta}</small>
                                </span>
                              </div>
                            </td>
                            <td className="text-[11px] p-[12px_8px] border-b border-[#eef1f4] text-[#506070]">{item.format}</td>
                            <td className="text-[11px] p-[12px_8px] border-b border-[#eef1f4] text-[#506070]">{item.author}</td>
                            <td className="text-[11px] p-[12px_8px] border-b border-[#eef1f4]">
                              <button
                                onClick={async () => {
                                  const nextStatus = item.status === 'Draft' ? 'In review' : item.status === 'In review' ? 'Published' : 'Draft';
                                  await updateContentStatus(item.id, nextStatus, displayName);
                                  showToast(`Status updated to "${nextStatus}".`);
                                  await loadData();
                                }}
                                title="Click to cycle status: Draft → In review → Published"
                                className={`inline-block rounded-[12px] p-[4px_7px] text-[9px] font-bold border-0 cursor-pointer ${item.status === 'Published' ? 'bg-[#eaf8f3] text-[#0d805c]' : item.status === 'In review' ? 'bg-[#fff6e7] text-[#a76f05]' : 'bg-[#edf1f5] text-[#657586]'}`}
                              >
                                {item.status}
                              </button>
                            </td>
                            <td className="p-[12px_8px] border-b border-[#eef1f4] text-right">
                              <button 
                                onClick={async () => {
                                  const nextStatus = item.status === 'Published' ? 'Draft' : 'Published';
                                  await updateContentStatus(item.id, nextStatus, displayName);
                                  showToast(nextStatus === 'Published' ? `"${item.title}" published!` : `"${item.title}" moved to drafts.`);
                                  await loadData();
                                }} 
                                title="Quick publish / draft toggle"
                                className="border-0 bg-transparent text-[16px] text-[#87929c] cursor-pointer hover:text-[#962c4a]"
                              >
                                ⋯
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </article>
            </div>

            <aside className="space-y-6">
              <article className="bg-white border border-[#e4e8ed] rounded-[12px] p-[19px] shadow-[0_3px_10px_rgba(36,50,65,.02)]">
                <div className="flex items-start justify-between mb-[17px]">
                  <div>
                    <h2 className="text-[16px] m-0 font-bold">Publishing workflow</h2>
                    <p className="m-[4px_0_0] text-[#65717e] text-[11px]">Items needing your attention</p>
                  </div>
                  <button 
                    onClick={() => {
                      setStatusFilter('');
                      showToast(`Workflow board: ${analytics.recentContents.length} total learning items.`);
                    }} 
                    className="bg-transparent border-0 text-[#962c4a] font-bold text-[11px] cursor-pointer"
                  >
                    View board
                  </button>
                </div>
                <div className="grid gap-[9px]">
                  <div className="flex items-center gap-[11px] p-[10px] rounded-[8px] bg-[#fbfcfd] border border-[#edf0f3]">
                    <span className="w-[31px] h-[31px] bg-[#fbf0f3] text-[#962c4a] rounded-[7px] grid place-items-center font-bold text-[12px]">{String(analytics.workflow.readyForReview).padStart(2, '0')}</span>
                    <span>
                      <b className="text-[12px] block">Ready for review</b>
                      <small className="block text-[10px] text-[#9099a5] mt-[3px]">Editorial & quality check</small>
                    </span>
                    <button 
                      onClick={() => {
                        setStatusFilter('In review');
                        showToast(`Filtering: ${analytics.workflow.readyForReview} items in review.`);
                      }} 
                      className="ml-auto bg-transparent border-0 text-[#962c4a] text-[11px] font-bold cursor-pointer"
                    >
                      Review
                    </button>
                  </div>
                  <div className="flex items-center gap-[11px] p-[10px] rounded-[8px] bg-[#fbfcfd] border border-[#edf0f3]">
                    <span className="w-[31px] h-[31px] bg-[#fbf0f3] text-[#962c4a] rounded-[7px] grid place-items-center font-bold text-[12px]">{String(analytics.workflow.scheduledThisWeek).padStart(2, '0')}</span>
                    <span>
                      <b className="text-[12px] block">Scheduled this week</b>
                      <small className="block text-[10px] text-[#9099a5] mt-[3px]">Publishing calendar</small>
                    </span>
                    <button 
                      onClick={() => {
                        setStatusFilter('Draft');
                        showToast(`Filtering: ${analytics.workflow.scheduledThisWeek} drafts / scheduled items.`);
                      }} 
                      className="ml-auto bg-transparent border-0 text-[#962c4a] text-[11px] font-bold cursor-pointer"
                    >
                      View
                    </button>
                  </div>
                  <div className="flex items-center gap-[11px] p-[10px] rounded-[8px] bg-[#fbfcfd] border border-[#edf0f3]">
                    <span className="w-[31px] h-[31px] bg-[#fbf0f3] text-[#962c4a] rounded-[7px] grid place-items-center font-bold text-[12px]">{String(analytics.workflow.assessmentSubmissions).padStart(2, '0')}</span>
                    <span>
                      <b className="text-[12px] block">Assessment submissions</b>
                      <small className="block text-[10px] text-[#9099a5] mt-[3px]">Awaiting moderation</small>
                    </span>
                    <button 
                      onClick={() => {
                        showToast(`${analytics.workflow.assessmentSubmissions} assessment submissions in queue.`);
                      }} 
                      className="ml-auto bg-transparent border-0 text-[#962c4a] text-[11px] font-bold cursor-pointer"
                    >
                      Moderate
                    </button>
                  </div>
                </div>
              </article>

              <article className="bg-white border border-[#e4e8ed] rounded-[12px] p-[19px] shadow-[0_3px_10px_rgba(36,50,65,.02)]">
                <div className="flex items-start justify-between mb-[17px]">
                  <div>
                    <h2 className="text-[16px] m-0 font-bold">Team activity</h2>
                    <p className="m-[4px_0_0] text-[#65717e] text-[11px]">Latest content actions</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {analytics.teamActivities.length === 0 ? (
                    <div className="text-center py-4 text-[11px] text-[#9099a5]">No recent activity logged yet.</div>
                  ) : (
                    analytics.teamActivities.slice(0, 5).map((act, idx) => (
                      <div key={act.id || idx} className={`flex gap-[10px] ${idx < Math.min(analytics.teamActivities.length, 5) - 1 ? 'pb-[9px] border-b border-[#eff2f4]' : ''}`}>
                        <div className="w-[27px] h-[27px] rounded-full bg-[#f0f3f6] text-[#596b7e] grid place-items-center text-[12px] shrink-0">{act.icon || '✓'}</div>
                        <div>
                          <b className="text-[11px] block">{act.title}</b>
                          <p className="text-[10px] text-[#65717e] my-[3px]">{act.subtitle}</p>
                          <time className="text-[9px] text-[#a0a8b1]">{act.timeAgo}</time>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </article>
            </aside>
          </section>
        </main>
        )}
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[rgba(15,23,33,.5)] z-50 p-5 flex items-center justify-center" onClick={() => setIsModalOpen(false)}>
          <div className="w-full max-w-[650px] bg-white rounded-[15px] shadow-[0_28px_70px_rgba(9,16,23,.22)] p-[26px]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[#9099a5] text-[10px] tracking-[0.12em] uppercase font-bold">CONTENT COMPOSER</span>
                <h2 className="font-serif font-bold text-[25px] m-[5px_0_0]">Create a learning asset</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="bg-transparent border-0 text-[22px] text-[#788491] cursor-pointer">×</button>
            </div>
            <p className="text-[#65717e] text-[12px] mt-2">Choose a format, then set the learning context for your new lesson.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-[10px] my-[20px]">
              {(['Video', 'Text', 'Document', 'Audio'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setContentType(type)}
                  className={`border rounded-[8px] p-[13px_8px] text-center bg-white text-[11px] cursor-pointer transition-all ${contentType === type ? 'border-[#ce8298] bg-[#fbf0f3] text-[#962c4a] font-bold' : 'border-[#e4e8ed] text-[#5d6a76]'}`}
                >
                  <span className="block text-[19px] mb-[6px]">{type === 'Video' ? '▶' : type === 'Text' ? '¶' : type === 'Document' ? '▤' : '♫'}</span>
                  {type === 'Text' ? 'Text lesson' : type}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
              <div className="mt-[12px]">
                <label className="block text-[#687480] text-[10px] font-bold mb-[6px] uppercase tracking-[0.07em]">Lesson title</label>
                <input 
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Introduction to Forces"
                  className="w-full border border-[#e4e8ed] rounded-[7px] p-[10px] outline-none text-[12px] focus:border-[#c9758d]"
                />
              </div>
              <div className="mt-[12px]">
                <label className="block text-[#687480] text-[10px] font-bold mb-[6px] uppercase tracking-[0.07em]">Subject</label>
                <select 
                  value={newSubject}
                  onChange={e => setNewSubject(e.target.value)}
                  className="w-full border border-[#e4e8ed] rounded-[7px] p-[10px] outline-none text-[12px] bg-white"
                >
                  <option>Physics · Form 5</option>
                  <option>Mathematics · Form 6</option>
                  <option>Biology · Form 4</option>
                  <option>Chemistry · Form 6</option>
                  <option>English · Form 4</option>
                </select>
              </div>
            </div>

            <div className="mt-[12px]">
              <label className="block text-[#687480] text-[10px] font-bold mb-[6px] uppercase tracking-[0.07em]">Publishing status</label>
              <select 
                value={newStatus}
                onChange={e => setNewStatus(e.target.value as any)}
                className="w-full border border-[#e4e8ed] rounded-[7px] p-[10px] outline-none text-[12px] bg-white"
              >
                <option value="Draft">Save as draft</option>
                <option value="In review">Send for review</option>
                <option value="Published">Publish now</option>
              </select>
            </div>

            <div className="flex justify-end gap-[10px] mt-[20px]">
              <button onClick={() => setIsModalOpen(false)} className="border-0 bg-transparent text-[#637180] text-[12px] font-bold p-[10px] cursor-pointer">Cancel</button>
              <button onClick={handleCreateContent} className="bg-[#962c4a] border-0 text-[#fff] rounded-[7px] p-[11px_15px] text-[12px] font-bold shadow-[0_8px_18px_rgba(150,44,74,.2)] cursor-pointer">Create content</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
