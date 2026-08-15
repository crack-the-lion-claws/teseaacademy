import React, { useState, useEffect } from 'react';
import { logStudentLearningSession, logActivityEvent } from '../lib/learningService';

interface MyCoursesPageProps {
  userName?: string;
  userEmail?: string;
  isNewUser?: boolean;
  userTrack?: string;
  onGoToLanding?: () => void;
  onGoToLessonPlayer?: (courseTitle: string) => void;
  onLogout?: () => void;
  showToast: (msg: string) => void;
}

interface CourseItem {
  id: string;
  classType: string;
  level: string;
  title: string;
  lesson: string;
  topic: string;
  subtopic: string;
  progress: number;
  timeLeft: string;
  type: string;
}

const COURSES_DATA: CourseItem[] = [
  {
    id: 'math',
    classType: 'math',
    level: 'NECTA • FORM 4',
    title: 'Mathematics',
    lesson: 'LESSON 1 OF 14',
    topic: 'Algebra Foundations',
    subtopic: 'Simultaneous equations: elimination',
    progress: 0,
    timeLeft: '18 min left',
    type: '▶ Video lesson'
  },
  {
    id: 'bio',
    classType: 'bio',
    level: 'NECTA • FORM 4',
    title: 'Biology',
    lesson: 'TOPIC 1 OF 9',
    topic: 'Human Nutrition',
    subtopic: 'Digestion and absorption revision',
    progress: 0,
    timeLeft: '22 min left',
    type: '▧ Revision notes'
  },
  {
    id: 'eng',
    classType: 'eng',
    level: 'CAMBRIDGE • IGCSE',
    title: 'English Language',
    lesson: 'UNIT 1 OF 12',
    topic: 'Listening for Meaning',
    subtopic: 'Climate change: audio practice',
    progress: 0,
    timeLeft: '31 min left',
    type: '♬ Audio lesson'
  },
  {
    id: 'chem',
    classType: 'chem',
    level: 'NECTA • FORM 4',
    title: 'Chemistry',
    lesson: 'LESSON 1 OF 16',
    topic: 'Organic Chemistry',
    subtopic: 'Hydrocarbons and their reactions',
    progress: 0,
    timeLeft: '16 min left',
    type: '▶ Video lesson'
  },
  {
    id: 'econ',
    classType: 'econ',
    level: 'LIFE-LONG LEARNING',
    title: 'Entrepreneurship',
    lesson: 'MODULE 1 OF 6',
    topic: 'Ideas into Ventures',
    subtopic: 'Finding the problem worth solving',
    progress: 0,
    timeLeft: '42 min left',
    type: '☷ Interactive text'
  },
  {
    id: 'digital',
    classType: 'digital',
    level: 'LIFE-LONG LEARNING',
    title: 'Digital Skills',
    lesson: 'MODULE 1 OF 8',
    topic: 'Digital Productivity',
    subtopic: 'Organise work and collaborate better',
    progress: 0,
    timeLeft: '25 min left',
    type: '▧ Project guide'
  }
];

export default function MyCoursesPage({
  userName = '',
  userEmail = '',
  userTrack = 'Form 4 • NECTA Track',
  onGoToLanding,
  onGoToLessonPlayer,
  onLogout,
  showToast
}: MyCoursesPageProps) {
  const [activeNav, setActiveNav] = useState('My courses');
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'saved'>('all');
  const [sortOption, setSortOption] = useState('Recently accessed');
  const [searchQuery, setSearchQuery] = useState('');

  // Settings Form States
  const [activeSettingsTab, setActiveSettingsTab] = useState('Profile');
  const [firstName, setFirstName] = useState(() => userName ? userName.trim().split(' ')[0] : '');
  const [lastName, setLastName] = useState(() => userName && userName.trim().split(' ')[1] ? userName.trim().split(' ').slice(1).join(' ') : '');
  const [email, setEmail] = useState(() => userEmail || '');
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  const [learningTrack, setLearningTrack] = useState('NECTA • Form 4');
  const [studyReminders, setStudyReminders] = useState(true);
  const [offlineDownloads, setOfflineDownloads] = useState(true);
  const [rafikiSuggestions, setRafikiSuggestions] = useState(false);

  // Dynamic Student Progress State (Starts at 0 for new learners)
  const [progressStats, setProgressStats] = useState({
    weeklyGoal: 0,
    monthlyMinutes: 0,
    longestStreakDays: 0,
    quizScoreImprovement: 0,
    quizzesCompleted: 0,
    puzzlesSolved: 0,
    mockExamsTaken: 0,
    certificatesEarned: 0,
    averageFinalScore: 0,
    pathsNearlyComplete: 0,
    earnedCertsList: [] as Array<{ title: string; course: string; track: string; date: string }>,
    activityData: [
      { day: 'M', pct: 0 },
      { day: 'T', pct: 0 },
      { day: 'W', pct: 0 },
      { day: 'T', pct: 0 },
      { day: 'F', pct: 0 },
      { day: 'S', pct: 0 },
      { day: 'S', pct: 0 },
    ],
    subjectMastery: [
      { subject: 'Mathematics', score: 0 },
      { subject: 'Biology', score: 0 },
      { subject: 'Chemistry', score: 0 },
      { subject: 'English', score: 0 },
    ]
  });

  const [userCourses, setUserCourses] = useState<CourseItem[]>([]);

  // Sync profile settings with actual logged in user
  useEffect(() => {
    if (userName) {
      const parts = userName.trim().split(' ');
      setFirstName(parts[0] || '');
      setLastName(parts.slice(1).join(' ') || '');
    }
    if (userEmail) {
      setEmail(userEmail);
    }
  }, [userName, userEmail]);

  // AI Tutor FAB Panel State
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    { sender: 'ai', text: 'I can help you plan your revision, explain a difficult concept, or make practice questions in English or Kiswahili.' }
  ]);

  const handleNavClick = (navName: string) => {
    setActiveNav(navName);
    showToast(`${navName} selected`);
  };

  const handleSaveSettings = () => {
    showToast('Your settings have been saved.');
  };

  const handleTabClick = (tabKey: 'all' | 'completed' | 'saved') => {
    setActiveTab(tabKey);
  };

  const handleSendAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const msgText = aiInput;
    setAiMessages(prev => [...prev, { sender: 'user', text: msgText }]);
    setAiInput('');
    showToast('Rafiki AI is preparing a helpful answer…');

    setTimeout(() => {
      setAiMessages(prev => [
        ...prev,
        { sender: 'ai', text: `Rafiki AI: Here is a clear breakdown for "${msgText}"... Let me know if you need more NECTA or Cambridge practice questions!` }
      ]);
    }, 600);
  };

  const filteredCourses = userCourses.filter(c => {
    if (activeTab === 'completed') return c.progress >= 100;
    if (activeTab === 'saved') return false; 
    if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase()) && !c.topic.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8f7f5] text-[#22232b] font-sans antialiased">
      {/* Embedded Exact Custom Styles from HTML Template */}
      <style>{`
        :root {
          --wine: #962c4c;
          --ink: #22232b;
          --muted: #727680;
          --line: #e8e5e2;
          --bg: #f8f7f5;
          --card: #fff;
          --blue: #3171ba;
          --green: #16835e;
          --gold: #d59634;
        }
        .tesea-top {
          height: 72px;
          background: #fff;
          border-bottom: 1px solid var(--line);
          display: flex;
          align-items: center;
          gap: 28px;
          padding: 0 clamp(18px, 4vw, 68px);
          position: sticky;
          top: 0;
          z-index: 40;
        }
        .tesea-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }
        .tesea-search {
          height: 42px;
          max-width: 460px;
          flex: 1;
          position: relative;
        }
        .tesea-search input {
          width: 100%;
          height: 100%;
          border: 1px solid #e2e1df;
          border-radius: 10px;
          background: #f8f8f8;
          padding: 0 16px 0 43px;
          outline: 0;
          font-size: 13px;
        }
        .tesea-search:before {
          content: '⌕';
          position: absolute;
          left: 14px;
          top: 5px;
          font-size: 26px;
          color: #777;
          z-index: 1;
        }
        .tesea-links {
          margin-left: auto;
          display: flex;
          gap: 23px;
          align-items: center;
        }
        .tesea-links a {
          color: #5c606b;
          font-size: 13px;
          text-decoration: none;
          text-align: center;
          cursor: pointer;
        }
        .tesea-links a:before {
          display: block;
          font-size: 18px;
          line-height: 15px;
        }
        .tesea-links a:nth-child(1):before { content: '⌂'; }
        .tesea-links a:nth-child(2):before { content: '▤'; }
        .tesea-links a:nth-child(3):before { content: '◫'; }
        .tesea-links a:nth-child(4):before { content: '♧'; }
        .tesea-links a.active {
          color: var(--wine);
          font-weight: 700;
        }
        .tesea-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e8b18c, #714331);
          border: 2px solid #fff;
          box-shadow: 0 0 0 2px #eadde1;
          display: grid;
          place-items: center;
          color: #fff;
          font-weight: bold;
          font-size: 13px;
        }
        .tesea-layout {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 30px;
          max-width: 1440px;
          margin: auto;
          padding: 28px clamp(18px, 4vw, 64px);
        }
        .tesea-side {
          position: sticky;
          top: 97px;
          align-self: start;
        }
        .tesea-account {
          background: #fff;
          border: 1px solid var(--line);
          padding: 18px;
          border-radius: 14px;
          margin-bottom: 18px;
        }
        .tesea-person {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .tesea-person b { font-size: 14px; }
        .tesea-person small {
          display: block;
          color: var(--muted);
          font-size: 11px;
          margin-top: 3px;
        }
        .tesea-bar {
          height: 7px;
          background: #eeeef0;
          border-radius: 20px;
          overflow: hidden;
          margin-top: 17px;
        }
        .tesea-bar i {
          display: block;
          height: 100%;
          background: var(--wine);
          border-radius: 20px;
        }
        .tesea-goal {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          margin-top: 7px;
          color: #656a74;
        }
        .tesea-navlabel {
          font-size: 11px;
          color: #999da5;
          font-weight: 700;
          letter-spacing: .1em;
          margin: 18px 12px 7px;
        }
        .tesea-nav {
          width: 100%;
          text-align: left;
          padding: 11px 12px;
          background: transparent;
          border: 0;
          border-radius: 9px;
          color: #535865;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .tesea-nav span {
          display: inline-block;
          width: 25px;
          font-size: 16px;
        }
        .tesea-nav.active, .tesea-nav:hover {
          background: #f4e9ed;
          color: var(--wine);
          font-weight: 700;
        }
        .tesea-tip {
          margin-top: 18px;
          border-radius: 13px;
          padding: 18px;
          background: #2b2730;
          color: #fff;
          background-image: radial-gradient(circle at 100% 0, #b34666, transparent 44%);
        }
        .tesea-tip b { font-size: 14px; }
        .tesea-tip p {
          font-size: 12px;
          line-height: 1.55;
          color: #e4dce0;
          margin: 8px 0 12px;
        }
        .tesea-tip button {
          background: #fff;
          color: #412c36;
          border: 0;
          border-radius: 7px;
          padding: 8px 10px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }
        .tesea-crumb {
          font-size: 12px;
          color: var(--muted);
          margin: 5px 0 8px;
        }
        .tesea-crumb b { color: var(--wine); }
        .tesea-intro {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 24px;
        }
        .tesea-intro p {
          margin: 6px 0 0;
          font-size: 14px;
          color: var(--muted);
        }
        .tesea-add {
          background: var(--wine);
          border: 0;
          border-radius: 8px;
          padding: 11px 14px;
          color: white;
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
        }
        .tesea-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-bottom: 28px;
        }
        .tesea-stat {
          border: 1px solid var(--line);
          border-radius: 12px;
          background: #fff;
          padding: 15px;
          display: flex;
          gap: 11px;
          align-items: center;
        }
        .tesea-stat .ico {
          width: 37px;
          height: 37px;
          display: grid;
          place-items: center;
          border-radius: 9px;
          font-size: 18px;
          background: #f3e8eb;
          color: var(--wine);
        }
        .tesea-stat:nth-child(2) .ico {
          background: #e8f1ff;
          color: var(--blue);
        }
        .tesea-stat:nth-child(3) .ico {
          background: #e8f6ef;
          color: var(--green);
        }
        .tesea-stat b {
          font-size: 18px;
          display: block;
        }
        .tesea-stat small {
          color: var(--muted);
          font-size: 11px;
        }
        .tesea-toolbar {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          border-bottom: 1px solid var(--line);
          margin-bottom: 20px;
        }
        .tesea-tabs {
          display: flex;
          gap: 21px;
          overflow: auto;
        }
        .tesea-tab {
          white-space: nowrap;
          background: transparent;
          border: 0;
          padding: 0 0 12px;
          color: #747883;
          font-size: 13px;
          cursor: pointer;
        }
        .tesea-tab.active {
          color: var(--wine);
          font-weight: 700;
          border-bottom: 2px solid var(--wine);
        }
        .tesea-tab span {
          background: #f4e9ed;
          color: var(--wine);
          padding: 2px 8px;
          border-radius: 20px;
          font-size: 10px;
          margin-left: 4px;
        }
        .tesea-filter {
          height: 32px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 7px;
          padding: 0 10px;
          color: #555b68;
          font-size: 12px;
          margin-top: -5px;
          outline: 0;
        }
        .tesea-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 17px;
        }
        .tesea-course {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 13px;
          overflow: hidden;
          transition: .2s;
        }
        .tesea-course:hover {
          box-shadow: 0 12px 26px rgba(32, 31, 37, .1);
          transform: translateY(-3px);
        }
        .tesea-cover {
          height: 118px;
          padding: 13px;
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .tesea-cover:after {
          content: '∑';
          position: absolute;
          font: 110px Georgia, serif;
          right: -4px;
          bottom: -46px;
          opacity: .17;
        }
        .tesea-cover b {
          position: relative;
          z-index: 1;
          font: 21px 'Playfair Display', Georgia, serif;
          display: block;
          margin-top: 10px;
          line-height: 1.05;
        }
        .tesea-cover small {
          position: relative;
          z-index: 1;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .09em;
        }
        .tesea-math { background: linear-gradient(135deg, #173c71, #5394cc); }
        .tesea-bio { background: linear-gradient(135deg, #245842, #50a678); }
        .tesea-eng { background: linear-gradient(135deg, #7f3f39, #d37661); }
        .tesea-chem { background: linear-gradient(135deg, #503668, #9975ba); }
        .tesea-econ { background: linear-gradient(135deg, #99641e, #dda84b); }
        .tesea-digital { background: linear-gradient(135deg, #17454d, #29a6a0); }
        
        .tesea-coursebody { padding: 14px; }
        .tesea-coursebody .label {
          font-size: 10px;
          letter-spacing: .08em;
          color: var(--wine);
          font-weight: 700;
        }
        .tesea-course h3 {
          font-size: 14px;
          margin: 6px 0 5px;
          font-weight: bold;
        }
        .tesea-course p {
          font-size: 11px;
          color: var(--muted);
          margin: 0 0 13px;
        }
        .tesea-line {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          margin-bottom: 6px;
        }
        .tesea-line span:last-child { color: #676b74; }
        .tesea-pbar {
          height: 6px;
          background: #eeeef0;
          border-radius: 8px;
          overflow: hidden;
        }
        .tesea-pbar i {
          height: 100%;
          background: var(--wine);
          display: block;
          border-radius: 8px;
        }
        .tesea-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 13px;
        }
        .tesea-actions small {
          font-size: 11px;
          color: var(--muted);
        }
        .tesea-resume {
          background: #f5e9ed;
          color: var(--wine);
          border: 0;
          border-radius: 6px;
          padding: 8px 10px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }
        .tesea-resume:hover {
          background: var(--wine);
          color: #fff;
        }
        .tesea-empty {
          background: #fff;
          border: 1px dashed #d8d1d3;
          border-radius: 12px;
          padding: 52px;
          text-align: center;
          color: var(--muted);
        }
        .tesea-empty b {
          display: block;
          font-size: 15px;
          color: var(--ink);
          margin: 10px;
        }
        .tesea-ai-fab {
          position: fixed;
          right: 28px;
          bottom: 26px;
          border-radius: 50px;
          background: #26222a;
          color: #fff;
          box-shadow: 0 10px 28px rgba(26, 20, 25, .28);
          padding: 13px 17px;
          display: flex;
          align-items: center;
          gap: 9px;
          font-weight: 700;
          font-size: 13px;
          z-index: 40;
          border: 0;
          cursor: pointer;
        }
        .tesea-spark {
          color: #f4bd5a;
          font-size: 20px;
        }
        .tesea-ai-panel {
          position: fixed;
          right: 25px;
          bottom: 82px;
          width: min(370px, calc(100vw - 32px));
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 16px;
          box-shadow: 0 20px 50px rgba(24, 24, 28, .2);
          padding: 18px;
          z-index: 50;
        }
        .tesea-ai-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: bold;
          font-size: 14px;
        }
        .tesea-close {
          background: #f5f3f2;
          border: 0;
          border-radius: 6px;
          width: 27px;
          height: 27px;
          font-weight: bold;
          cursor: pointer;
        }
        .tesea-message {
          background: #f4e8eb;
          color: #44353d;
          font-size: 13px;
          line-height: 1.5;
          padding: 11px;
          border-radius: 4px 11px 11px 11px;
          margin: 14px 0;
        }
        .tesea-ask {
          display: flex;
          border: 1px solid #ddd;
          border-radius: 9px;
          margin-top: 13px;
          overflow: hidden;
        }
        .tesea-ask input {
          flex: 1;
          border: 0;
          outline: 0;
          padding: 11px;
          font-size: 12px;
        }
        .tesea-ask button {
          background: var(--wine);
          color: #fff;
          border: 0;
          padding: 0 13px;
          cursor: pointer;
        }

        /* Settings Styles matching uploaded HTML */
        .tesea-settings-title {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 22px;
        }
        .tesea-settings-title h1 {
          font-family: 'Playfair Display', serif;
          font-size: 34px;
          margin: 0;
          font-weight: 600;
        }
        .tesea-settings-title p {
          font-size: 14px;
          color: var(--muted);
          margin: 6px 0 0 0;
        }
        .tesea-save-btn {
          background: var(--wine);
          color: #fff;
          padding: 11px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          border: 0;
          cursor: pointer;
        }
        .tesea-settings-grid {
          display: grid;
          grid-template-columns: 190px 1fr;
          gap: 17px;
        }
        .tesea-settings-box {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 14px;
        }
        .tesea-settings-menu {
          padding: 9px;
        }
        .tesea-settings-menu button {
          display: block;
          width: 100%;
          background: transparent;
          text-align: left;
          padding: 10px;
          border-radius: 8px;
          color: #555b68;
          font-size: 13px;
          border: 0;
          cursor: pointer;
        }
        .tesea-settings-menu button.on {
          background: #f4e9ed;
          color: var(--wine);
          font-weight: 700;
        }
        .tesea-settings-content {
          padding: 20px;
        }
        .tesea-settings-content h2 {
          font-size: 18px;
          margin: 0 0 5px;
          font-weight: 700;
        }
        .tesea-settings-content > p {
          font-size: 12px;
          color: var(--muted);
          margin: 0 0 20px;
        }
        .tesea-settings-field {
          margin: 14px 0;
        }
        .tesea-settings-field label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .tesea-settings-field input, .tesea-settings-field select {
          width: 100%;
          border: 1px solid var(--line);
          border-radius: 7px;
          padding: 10px;
          background: #fff;
          font-size: 13px;
          outline: 0;
        }
        .tesea-settings-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 13px;
        }
        .tesea-settings-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          border-top: 1px solid var(--line);
          padding: 15px 0;
        }
        .tesea-settings-item b {
          font-size: 13px;
          display: block;
        }
        .tesea-settings-item p {
          font-size: 11px;
          color: var(--muted);
          margin: 4px 0 0;
        }
        .tesea-switch {
          width: 38px;
          height: 22px;
          border-radius: 14px;
          background: #d8d7d8;
          padding: 3px;
          flex: none;
          cursor: pointer;
          border: 0;
          transition: background 0.2s;
          display: inline-block;
        }
        .tesea-switch i {
          display: block;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          transition: transform 0.2s;
        }
        .tesea-switch.on {
          background: var(--wine);
        }
        .tesea-switch.on i {
          transform: translateX(16px);
        }

        /* My Progress Page Styles */
        .tesea-progress-period {
          padding: 9px 11px;
          border: 1px solid var(--line);
          border-radius: 7px;
          background: #fff;
          color: #555b68;
          font-size: 12px;
          cursor: pointer;
        }
        .tesea-progress-hero {
          padding: 24px;
          border-radius: 16px;
          background: linear-gradient(115deg, #322731, #762d49);
          color: #fff;
          display: grid;
          grid-template-columns: 1fr 210px;
        }
        .tesea-progress-hero small {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
        }
        .tesea-progress-hero h2 {
          font-family: 'Playfair Display', serif;
          font-size: 27px;
          margin: 10px 0 7px;
          font-weight: 700;
        }
        .tesea-progress-hero p {
          font-size: 13px;
          line-height: 1.5;
          color: #f1dfe4;
          margin: 0;
        }
        .tesea-progress-ring {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          margin: auto;
          border: 12px solid #d87f98;
          border-top-color: #fff;
          display: grid;
          place-items: center;
          font-size: 25px;
          font-weight: 700;
        }
        .tesea-progress-ring small {
          font-size: 10px;
          letter-spacing: 0;
          color: #f1dfe4;
        }
        .tesea-progress-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin: 24px 0;
        }
        .tesea-progress-stat {
          padding: 16px;
          display: flex;
          gap: 11px;
          align-items: center;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 14px;
        }
        .tesea-progress-ico {
          height: 39px;
          width: 39px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: #f4e8eb;
          color: var(--wine);
          font-size: 19px;
        }
        .tesea-progress-stat:nth-child(2) .tesea-progress-ico {
          background: #fff2de;
          color: #be7a15;
        }
        .tesea-progress-stat:nth-child(3) .tesea-progress-ico {
          background: #e7f5ee;
          color: #198461;
        }
        .tesea-progress-stat b {
          display: block;
          font-size: 18px;
        }
        .tesea-progress-stat small {
          font-size: 11px;
          color: var(--muted);
        }
        .tesea-progress-cols {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 17px;
        }
        .tesea-progress-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 18px;
        }
        .tesea-progress-card h3 {
          font-size: 16px;
          margin: 0 0 14px;
          font-weight: 700;
        }
        .tesea-progress-chart {
          height: 160px;
          display: flex;
          align-items: flex-end;
          gap: 12px;
          border-bottom: 1px solid var(--line);
          padding: 0 9px 24px 9px;
        }
        .tesea-progress-col {
          width: 30px;
          background: #e7c5cf;
          border-radius: 6px 6px 0 0;
          position: relative;
          display: inline-block;
        }
        .tesea-progress-col.active {
          background: var(--wine);
        }
        .tesea-progress-col small {
          position: absolute;
          bottom: -22px;
          left: 7px;
          color: var(--muted);
          font-size: 10px;
        }
        .tesea-progress-subject {
          padding: 11px 0;
          border-top: 1px solid var(--line);
        }
        .tesea-progress-subject:first-of-type {
          border-top: 0;
        }
        .tesea-progress-subhead {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          margin-bottom: 7px;
        }
        .tesea-progress-subject b:last-child {
          color: var(--wine);
        }
        .tesea-progress-sbar {
          height: 7px;
          border-radius: 8px;
          background: #eeeef0;
          overflow: hidden;
        }
        .tesea-progress-sbar i {
          height: 100%;
          display: block;
          background: var(--wine);
          border-radius: 8px;
        }
        .tesea-progress-insight {
          margin-top: 17px;
          padding: 17px;
          display: flex;
          gap: 12px;
          align-items: center;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 14px;
        }
        .tesea-progress-insight .tesea-progress-ico {
          flex: none;
        }
        .tesea-progress-insight b {
          font-size: 13px;
        }
        .tesea-progress-insight p {
          font-size: 11px;
          color: var(--muted);
          margin: 3px 0 0;
        }
        .tesea-progress-insight button {
          margin-left: auto;
          background: #f5e9ed;
          color: var(--wine);
          border-radius: 6px;
          padding: 8px 10px;
          font-size: 11px;
          font-weight: 700;
          border: 0;
          cursor: pointer;
        }

        /* Mock Exams Styles */
        .tesea-mock-custom {
          background: var(--wine);
          color: #fff;
          border-radius: 8px;
          padding: 11px 14px;
          font-size: 12px;
          font-weight: 700;
          border: 0;
          cursor: pointer;
        }
        .tesea-mock-focus {
          background: linear-gradient(115deg, #322731, #762d49);
          border-radius: 16px;
          padding: 25px;
          color: #fff;
          display: grid;
          grid-template-columns: 1fr 180px;
        }
        .tesea-mock-focus small {
          font-size: 11px;
          letter-spacing: 0.1em;
          font-weight: 700;
        }
        .tesea-mock-focus h2 {
          font-family: 'Playfair Display', serif;
          font-size: 27px;
          margin: 10px 0 7px;
          font-weight: 700;
        }
        .tesea-mock-focus p {
          color: #f1dfe4;
          font-size: 13px;
          line-height: 1.5;
          margin: 0 0 15px;
        }
        .tesea-mock-begin {
          background: #fff;
          color: #722640;
          border-radius: 7px;
          padding: 10px 13px;
          font-size: 12px;
          font-weight: 700;
          border: 0;
          cursor: pointer;
        }
        .tesea-mock-ready {
          margin: auto;
          width: 122px;
          height: 122px;
          border-radius: 50%;
          border: 11px solid #d87f98;
          border-top-color: #fff;
          display: grid;
          place-items: center;
          font-size: 25px;
          font-weight: 700;
        }
        .tesea-mock-ready small {
          font-size: 10px;
          letter-spacing: 0;
          color: #f1dfe4;
        }
        .tesea-mock-sect {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 21px 0 13px;
        }
        .tesea-mock-sect h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
        }
        .tesea-mock-filter {
          padding: 8px 10px;
          border: 1px solid var(--line);
          border-radius: 7px;
          background: #fff;
          font-size: 12px;
          color: #555b68;
          cursor: pointer;
        }
        .tesea-mock-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .tesea-mock-exam {
          padding: 16px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 14px;
        }
        .tesea-mock-examicon {
          width: 42px;
          height: 42px;
          border-radius: 11px;
          display: grid;
          place-items: center;
          background: #eef4ff;
          color: #3168c7;
          font-size: 19px;
        }
        .tesea-mock-exam:nth-child(2) .tesea-mock-examicon {
          background: #e8f5ef;
          color: #18815f;
        }
        .tesea-mock-exam:nth-child(3) .tesea-mock-examicon {
          background: #fff1dc;
          color: #b97918;
        }
        .tesea-mock-tag {
          display: block;
          margin-top: 14px;
          color: var(--wine);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }
        .tesea-mock-exam h3 {
          font-size: 14px;
          margin: 6px 0;
          font-weight: 700;
        }
        .tesea-mock-exam p {
          font-size: 11px;
          line-height: 1.45;
          color: var(--muted);
          margin: 0 0 14px;
        }
        .tesea-mock-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .tesea-mock-bottom small {
          font-size: 11px;
          color: var(--muted);
        }
        .tesea-mock-go {
          background: #f5e9ed;
          color: var(--wine);
          border-radius: 6px;
          padding: 8px 10px;
          font-size: 11px;
          font-weight: 700;
          border: 0;
          cursor: pointer;
        }
        .tesea-mock-results {
          margin-top: 20px;
          padding: 18px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 14px;
        }
        .tesea-mock-results h3 {
          font-size: 16px;
          margin: 0 0 10px;
          font-weight: 700;
        }
        .tesea-mock-row {
          display: grid;
          grid-template-columns: 1fr 90px 75px;
          align-items: center;
          padding: 11px 0;
          border-top: 1px solid var(--line);
          font-size: 12px;
        }
        .tesea-mock-row small {
          display: block;
          font-size: 11px;
          color: var(--muted);
          margin-top: 3px;
        }
        .tesea-mock-score {
          font-weight: 700;
          color: #17815e;
        }

        /* Certificates Styles */
        .tesea-cert-seal {
          width: 110px;
          height: 110px;
          margin: auto;
          border-radius: 50%;
          background: radial-gradient(circle, #fff5d8 0 43%, #d29a37 44% 51%, #fff5d8 52% 59%, #a87521 60%);
          display: grid;
          place-items: center;
          color: #714b14;
          font: 26px Georgia, serif;
          box-shadow: 0 10px 25px rgba(0,0,0,.23);
        }
        .tesea-cert-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 17px;
        }
        .tesea-cert-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 14px;
          overflow: hidden;
        }
        .tesea-cert-top {
          background: #f9f4ef;
          border-bottom: 1px solid #efe4d7;
          min-height: 172px;
          padding: 21px;
          position: relative;
          text-align: center;
        }
        .tesea-cert-top::before {
          content: '';
          position: absolute;
          inset: 14px;
          border: 1px solid #ddcda9;
          pointer-events: none;
        }
        .tesea-cert-top small, .tesea-cert-top h3, .tesea-cert-top p {
          position: relative;
          z-index: 1;
        }
        .tesea-cert-top small {
          font-size: 9px;
          letter-spacing: .15em;
          color: #8f733d;
          font-weight: 700;
        }
        .tesea-cert-top h3 {
          font: 22px 'Playfair Display', serif;
          color: #392c30;
          margin: 13px 0 6px;
        }
        .tesea-cert-top p {
          font-size: 11px;
          color: #706c68;
          margin: 0;
        }
        .tesea-cert-miniseal {
          position: absolute;
          right: 23px;
          bottom: 18px;
          z-index: 1;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: #d59b39;
          color: #fff;
          font-size: 14px;
        }
        .tesea-cert-body {
          padding: 15px;
        }
        .tesea-cert-body h4 {
          font-size: 14px;
          margin: 0 0 5px;
          font-weight: 700;
        }
        .tesea-cert-body p {
          color: var(--muted);
          font-size: 11px;
          margin: 0;
        }
        .tesea-cert-actions {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid var(--line);
          margin-top: 14px;
          padding-top: 12px;
        }
        .tesea-cert-actions button {
          background: #f5e9ed;
          color: var(--wine);
          border-radius: 6px;
          padding: 8px 10px;
          font-size: 11px;
          font-weight: 700;
          border: 0;
          cursor: pointer;
        }
        .tesea-cert-actions .download {
          color: #444c58;
          background: #f4f4f4;
        }
        .tesea-cert-next {
          margin-top: 18px;
          padding: 17px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 13px;
          display: flex;
          gap: 14px;
          align-items: center;
        }
        .tesea-cert-next .round {
          height: 43px;
          width: 43px;
          background: #f4e8eb;
          color: var(--wine);
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-size: 19px;
        }
        .tesea-cert-next b {
          font-size: 13px;
        }
        .tesea-cert-next p {
          font-size: 11px;
          color: var(--muted);
          margin: 3px 0 0;
        }
        .tesea-cert-next button {
          margin-left: auto;
          border: 1px solid var(--wine);
          background: #fff;
          color: var(--wine);
          border-radius: 7px;
          padding: 8px 10px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        @media(max-width:1050px){
          .tesea-grid { grid-template-columns: repeat(2,1fr); }
          .tesea-links { gap:12px; }
          .tesea-links a:not(.active){ display:none; }
        }
        @media(max-width:760px){
          .tesea-layout { display:block; padding:19px; }
          .tesea-side { display:none; }
          .tesea-search { width:auto; flex:1; }
          .tesea-top { padding:0 16px; gap:12px; }
          .tesea-stats { grid-template-columns:1fr; }
          .tesea-intro { align-items:flex-start; }
          .tesea-intro .tesea-add { display:none; }
          .tesea-grid { grid-template-columns:1fr; }
          .tesea-toolbar { align-items:flex-start; }
          .tesea-filter { margin-top:0; }
          h1 { font-size:28px; }
          .tesea-settings-grid { grid-template-columns: 1fr; }
          .tesea-settings-menu { display: flex; overflow-x: auto; }
          .tesea-settings-menu button { white-space: nowrap; }
          .tesea-settings-row { grid-template-columns: 1fr; }
          .tesea-save-btn { display: none; }
          .tesea-progress-hero { grid-template-columns: 1fr; }
          .tesea-progress-ring { display: none; }
          .tesea-progress-stats, .tesea-progress-cols { grid-template-columns: 1fr; }
          .tesea-progress-period { display: none; }
          .tesea-mock-focus { grid-template-columns: 1fr; }
          .tesea-mock-ready { display: none; }
          .tesea-mock-grid { grid-template-columns: 1fr; }
          .tesea-mock-custom { display: none; }
        }
      `}</style>

      {/* Header */}
      <header className="tesea-top">
        <button onClick={onGoToLanding} className="tesea-logo bg-transparent border-0 cursor-pointer p-0 flex items-center">
          <img src="/logo.png" alt="TESEA Academy" className="h-12 object-contain object-left" />
        </button>

        <div className="tesea-search">
          <input 
            placeholder="Search your courses" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <nav className="tesea-links">
          <a onClick={onGoToLanding}>Home</a>
          <a className={activeNav === 'My courses' ? 'active' : ''} onClick={() => handleNavClick('My courses')}>My learning</a>
          <a className={activeNav === 'Mock Exams' ? 'active' : ''} onClick={() => handleNavClick('Mock Exams')}>Practice</a>
          <a onClick={() => showToast('Community forum opened.')}>Community</a>
        </nav>

        {onLogout && (
          <button 
            onClick={onLogout} 
            className="text-xs text-slate-400 hover:text-[#962c4c] border-0 bg-transparent cursor-pointer font-semibold"
            title="Sign Out"
          >
            Sign Out
          </button>
        )}

        <div className="tesea-avatar" title={userEmail}>
          {userName.charAt(0).toUpperCase()}
        </div>
      </header>

      {/* Layout Grid */}
      <div className="tesea-layout">
        <aside className="tesea-side">
          <div className="tesea-account">
            <div className="tesea-person">
              <div className="tesea-avatar">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <b>{userName}</b>
                <small>{userTrack}</small>
              </div>
            </div>
            <div className="tesea-bar">
              <i style={{ width: `${progressStats.weeklyGoal}%` }} />
            </div>
            <div className="tesea-goal">
              <span>Weekly learning goal</span>
              <b>{progressStats.weeklyGoal}%</b>
            </div>
          </div>

          <div className="tesea-navlabel">LEARN</div>
          <button 
            className={`tesea-nav ${activeNav === 'Overview' ? 'active' : ''}`}
            onClick={() => handleNavClick('Overview')}
          >
            <span>⌂</span>Overview
          </button>
          <button 
            className={`tesea-nav ${activeNav === 'My courses' ? 'active' : ''}`}
            onClick={() => handleNavClick('My courses')}
          >
            <span>▤</span>My courses
          </button>
          <button 
            className={`tesea-nav ${activeNav === 'Saved' ? 'active' : ''}`}
            onClick={() => handleNavClick('Saved')}
          >
            <span>♡</span>Saved
          </button>
          <button 
            className={`tesea-nav ${activeNav === 'Certificates' ? 'active' : ''}`}
            onClick={() => handleNavClick('Certificates')}
          >
            <span>◇</span>Certificates
          </button>

          <div className="tesea-navlabel">PRACTICE & EXAMS</div>
          <button 
            className={`tesea-nav ${activeNav === 'Quiz Studio' ? 'active' : ''}`}
            onClick={() => handleNavClick('Quiz Studio')}
          >
            <span>✓</span>Quiz Studio
          </button>
          <button 
            className={`tesea-nav ${activeNav === 'Brain Puzzles' ? 'active' : ''}`}
            onClick={() => handleNavClick('Brain Puzzles')}
          >
            <span>♜</span>Brain Puzzles
          </button>
          <button 
            className={`tesea-nav ${activeNav === 'Mock Exams' ? 'active' : ''}`}
            onClick={() => handleNavClick('Mock Exams')}
          >
            <span>◫</span>Mock Exams
          </button>

          <div className="tesea-navlabel">ACCOUNT</div>
          <button 
            className={`tesea-nav ${activeNav === 'My progress' ? 'active' : ''}`}
            onClick={() => handleNavClick('My progress')}
          >
            <span>◔</span>My progress
          </button>
          <button 
            className={`tesea-nav ${activeNav === 'Settings' ? 'active' : ''}`}
            onClick={() => handleNavClick('Settings')}
          >
            <span>⚙</span>Settings
          </button>

          <div className="tesea-tip">
            <b>Need a study partner?</b>
            <p>Ask Rafiki AI for an explanation in English or Kiswahili.</p>
            <button onClick={() => setIsAiOpen(true)}>Ask AI Tutor</button>
          </div>
        </aside>

        <main>
          {activeNav === 'Overview' ? (
            <div style={{ width: '100%', height: 'calc(100vh - 120px)', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e8e5e2', background: '#fff' }}>
              <iframe 
                src="/tesea-learning-platform-frontend-preview.html" 
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="TESEA Academy Frontend Preview"
              />
            </div>
          ) : activeNav === 'Certificates' ? (
            <>
              <div className="tesea-crumb">
                My learning <b>/ Certificates</b>
              </div>

              <div className="tesea-settings-title">
                <div>
                  <h1>Your certificates</h1>
                  <p>Celebrate the learning you have completed and share your progress with confidence.</p>
                </div>
                <button 
                  type="button" 
                  className="tesea-mock-custom"
                  onClick={() => showToast('Certificate verification is ready.')}
                >
                  Verify a certificate →
                </button>
              </div>

              <section className="tesea-mock-focus">
                <div>
                  <small>LEARNING MILESTONE</small>
                  <h2>You are building a record of progress.</h2>
                  <p>Every completed learning path brings you closer to the goals you set for yourself.</p>
                </div>
                <div className="tesea-cert-seal">
                  T
                </div>
              </section>

              <section className="tesea-progress-stats">
                <article className="tesea-progress-stat">
                  <div className="tesea-progress-ico">◇</div>
                  <div>
                    <b>{progressStats.certificatesEarned}</b>
                    <small>certificates earned</small>
                  </div>
                </article>
                <article className="tesea-progress-stat">
                  <div className="tesea-progress-ico">★</div>
                  <div>
                    <b>{progressStats.averageFinalScore}%</b>
                    <small>average final score</small>
                  </div>
                </article>
                <article className="tesea-progress-stat">
                  <div className="tesea-progress-ico">↗</div>
                  <div>
                    <b>{progressStats.pathsNearlyComplete}</b>
                    <small>paths nearly complete</small>
                  </div>
                </article>
              </section>

              <div className="tesea-mock-sect">
                <h3>Earned certificates</h3>
                <select 
                  className="tesea-mock-filter"
                  onChange={(e) => showToast(`Showing ${e.target.value} certificates`)}
                >
                  <option>Most recent</option>
                  <option>Curriculum</option>
                  <option>Highest score</option>
                </select>
              </div>

              <section className="tesea-cert-grid">
                {progressStats.earnedCertsList.length === 0 ? (
                  <div style={{ gridColumn: 'span 2', padding: '40px 20px', textAlign: 'center', background: '#fff', borderRadius: '14px', border: '1px solid var(--line)' }}>
                    <h3 style={{ margin: '0 0 8px', fontSize: '16px' }}>No certificates earned yet</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '13px', margin: '0 0 16px' }}>Complete courses and pass quizzes to earn verified TESEA Academy certificates.</p>
                    <button 
                      type="button" 
                      className="tesea-mock-custom"
                      onClick={() => handleNavClick('My courses')}
                    >
                      Explore my courses →
                    </button>
                  </div>
                ) : (
                  progressStats.earnedCertsList.map((cert, index) => (
                    <article key={index} className="tesea-cert-card">
                      <div className="tesea-cert-top">
                        <small>TESEA ACADEMY CERTIFICATE OF COMPLETION</small>
                        <h3>{cert.title}</h3>
                        <p>Presented to {userName || 'Student'} for completing the course</p>
                        <span className="tesea-cert-miniseal">T</span>
                      </div>
                      <div className="tesea-cert-body">
                        <h4>{cert.course}</h4>
                        <p>{cert.track} • Completed {cert.date}</p>
                        <div className="tesea-cert-actions">
                          <button type="button" onClick={() => showToast('Share options opened for your certificate.')}>Share</button>
                          <button type="button" className="download" onClick={() => showToast('Your certificate PDF is being prepared.')}>⇩ Download PDF</button>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </section>

              <section className="tesea-cert-next">
                <div className="round">◇</div>
                <div>
                  <b>Your next certificate is within reach.</b>
                  <p>Complete 4 more lessons in Organic Chemistry to earn it.</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => showToast('Opening Organic Chemistry: Lesson 12.')}
                >
                  Continue →
                </button>
              </section>
            </>
          ) : activeNav === 'Brain Puzzles' ? (
            <>
              <div className="tesea-crumb">
                Practice & exams <b>/ Brain Puzzles</b>
              </div>

              <div className="tesea-settings-title">
                <div>
                  <h1>Brain Puzzles</h1>
                  <p>Sharpen your logic, pattern recognition, and problem-solving skills with daily educational challenges.</p>
                </div>
                <button 
                  type="button" 
                  className="tesea-mock-custom"
                  onClick={() => showToast('Daily puzzle challenge started — good luck!')}
                >
                  Daily Challenge →
                </button>
              </div>

              <section className="tesea-mock-focus">
                <div>
                  <small>FEATURED PUZZLE OF THE DAY</small>
                  <h2>Logic Matrix: The Kilimanjaro Ascent</h2>
                  <p>Deduce the correct climbing sequence and supply distribution using propositional logic and basic arithmetic.</p>
                  <button 
                    type="button" 
                    className="tesea-mock-begin"
                    onClick={() => showToast('Puzzle studio launched!')}
                  >
                    Solve puzzle →
                  </button>
                </div>
                <div className="tesea-mock-ready">
                  85<small>% solved</small>
                </div>
              </section>

              <section className="tesea-progress-stats">
                <article className="tesea-progress-stat">
                  <div className="tesea-progress-ico">🧩</div>
                  <div>
                    <b>14</b>
                    <small>puzzles solved</small>
                  </div>
                </article>
                <article className="tesea-progress-stat">
                  <div className="tesea-progress-ico">⚡</div>
                  <div>
                    <b>5 days</b>
                    <small>logical streak</small>
                  </div>
                </article>
                <article className="tesea-progress-stat">
                  <div className="tesea-progress-ico">🏆</div>
                  <div>
                    <b>Top 12%</b>
                    <small>student brain rank</small>
                  </div>
                </article>
              </section>

              <div className="tesea-mock-sect">
                <h3>Choose a puzzle category</h3>
                <select 
                  className="tesea-mock-filter"
                  onChange={(e) => showToast(`Showing ${e.target.value} category puzzles`)}
                >
                  <option>All Puzzles</option>
                  <option>Logic & Deduction</option>
                  <option>Mathematical Riddles</option>
                  <option>Spatial & Patterns</option>
                </select>
              </div>

              <section className="tesea-mock-grid">
                <article className="tesea-mock-exam">
                  <div className="tesea-mock-examicon">⚖</div>
                  <span className="tesea-mock-tag">ALGEBRAIC RIDDLE</span>
                  <h3>The Market Balance</h3>
                  <p>Find the exact weight ratio of maize, beans, and cassava tubers using 3 balancing scales.</p>
                  <div className="tesea-mock-bottom">
                    <small>Medium • 15 min</small>
                    <button 
                      type="button" 
                      className="tesea-mock-go"
                      onClick={() => showToast('Puzzle opened. Enjoy!')}
                    >
                      Play
                    </button>
                  </div>
                </article>

                <article className="tesea-mock-exam">
                  <div className="tesea-mock-examicon">🗺</div>
                  <span className="tesea-mock-tag">SPATIAL REASONING</span>
                  <h3>East African Transit Matrix</h3>
                  <p>Connect regional trade routes with minimum fuel cost and zero path intersections.</p>
                  <div className="tesea-mock-bottom">
                    <small>Hard • 25 min</small>
                    <button 
                      type="button" 
                      className="tesea-mock-go"
                      onClick={() => showToast('Puzzle opened. Enjoy!')}
                    >
                      Play
                    </button>
                  </div>
                </article>

                <article className="tesea-mock-exam">
                  <div className="tesea-mock-examicon">🔢</div>
                  <span className="tesea-mock-tag">NUMBER THEORY</span>
                  <h3>Prime Sequence Pyramid</h3>
                  <p>Fill the missing Fibonacci and prime sequence nodes without breaking the checksum rule.</p>
                  <div className="tesea-mock-bottom">
                    <small>Easy • 10 min</small>
                    <button 
                      type="button" 
                      className="tesea-mock-go"
                      onClick={() => showToast('Puzzle opened. Enjoy!')}
                    >
                      Play
                    </button>
                  </div>
                </article>
              </section>

              <section className="tesea-mock-results">
                <h3>Recently solved puzzles</h3>
                <div className="tesea-mock-row">
                  <div>
                    <b>Swahili Lexicon Cipher</b>
                    <small>Completed Yesterday • Score: 98/100</small>
                  </div>
                  <span className="tesea-mock-score">Solved</span>
                  <button 
                    type="button" 
                    className="tesea-mock-go"
                    onClick={() => showToast('Puzzle review opened.')}
                  >
                    Review
                  </button>
                </div>

                <div className="tesea-mock-row">
                  <div>
                    <b>Rift Valley Elevation Grid</b>
                    <small>Completed 3 days ago • Score: 92/100</small>
                  </div>
                  <span className="tesea-mock-score">Solved</span>
                  <button 
                    type="button" 
                    className="tesea-mock-go"
                    onClick={() => showToast('Puzzle review opened.')}
                  >
                    Review
                  </button>
                </div>
              </section>
            </>
          ) : activeNav === 'Mock Exams' ? (
            <>
              <div className="tesea-crumb">
                Practice & exams <b>/ Mock Exams</b>
              </div>

              <div className="tesea-settings-title">
                <div>
                  <h1>Mock Exams</h1>
                  <p>Practise under real exam conditions and understand exactly where to improve.</p>
                </div>
                <button 
                  type="button" 
                  className="tesea-mock-custom"
                  onClick={() => showToast('Exam setup is ready — good luck!')}
                >
                  Build custom exam →
                </button>
              </div>

              <section className="tesea-mock-focus">
                <div>
                  <small>RECOMMENDED NEXT STEP</small>
                  <h2>Form 4 Mathematics: full mock exam</h2>
                  <p>Experience a timed 2 hour paper with marking, topic analysis and a personalised revision plan.</p>
                  <button 
                    type="button" 
                    className="tesea-mock-begin"
                    onClick={() => showToast('Exam setup is ready — good luck!')}
                  >
                    Start exam →
                  </button>
                </div>
                <div className="tesea-mock-ready">
                  78<small>% ready</small>
                </div>
              </section>

              <section className="tesea-progress-stats">
                <article className="tesea-progress-stat">
                  <div className="tesea-progress-ico">◫</div>
                  <div>
                    <b>7</b>
                    <small>exams completed</small>
                  </div>
                </article>
                <article className="tesea-progress-stat">
                  <div className="tesea-progress-ico">◷</div>
                  <div>
                    <b>9h 40m</b>
                    <small>time in exam mode</small>
                  </div>
                </article>
                <article className="tesea-progress-stat">
                  <div className="tesea-progress-ico">↗</div>
                  <div>
                    <b>76%</b>
                    <small>average score</small>
                  </div>
                </article>
              </section>

              <div className="tesea-mock-sect">
                <h3>Choose an exam</h3>
                <select 
                  className="tesea-mock-filter"
                  onChange={(e) => showToast(`Showing ${e.target.value} exam papers`)}
                >
                  <option>NECTA Form 4</option>
                  <option>Cambridge IGCSE</option>
                  <option>Life-Long Learning</option>
                </select>
              </div>

              <section className="tesea-mock-grid">
                <article className="tesea-mock-exam">
                  <div className="tesea-mock-examicon">∑</div>
                  <span className="tesea-mock-tag">NECTA • FORM 4</span>
                  <h3>Mathematics full paper</h3>
                  <p>50 questions • 2 hours • Instant marking & topic report</p>
                  <div className="tesea-mock-bottom">
                    <small>Exam mode</small>
                    <button 
                      type="button" 
                      className="tesea-mock-go"
                      onClick={() => showToast('Exam setup is ready — good luck!')}
                    >
                      Start
                    </button>
                  </div>
                </article>

                <article className="tesea-mock-exam">
                  <div className="tesea-mock-examicon">⌬</div>
                  <span className="tesea-mock-tag">NECTA • FORM 4</span>
                  <h3>Biology full paper</h3>
                  <p>45 questions • 2 hours 30 min • Examiner-style feedback</p>
                  <div className="tesea-mock-bottom">
                    <small>Exam mode</small>
                    <button 
                      type="button" 
                      className="tesea-mock-go"
                      onClick={() => showToast('Exam setup is ready — good luck!')}
                    >
                      Start
                    </button>
                  </div>
                </article>

                <article className="tesea-mock-exam">
                  <div className="tesea-mock-examicon">Aa</div>
                  <span className="tesea-mock-tag">CAMBRIDGE • IGCSE</span>
                  <h3>English Language paper</h3>
                  <p>40 questions • 1 hour 45 min • Reading & writing practice</p>
                  <div className="tesea-mock-bottom">
                    <small>Exam mode</small>
                    <button 
                      type="button" 
                      className="tesea-mock-go"
                      onClick={() => showToast('Exam setup is ready — good luck!')}
                    >
                      Start
                    </button>
                  </div>
                </article>
              </section>

              <section className="tesea-mock-results">
                <h3>Recent exam attempts</h3>
                <div className="tesea-mock-row">
                  <div>
                    <b>Form 4 Chemistry mock exam</b>
                    <small>Completed 12 July • 1h 54m</small>
                  </div>
                  <span className="tesea-mock-score">82%</span>
                  <button 
                    type="button" 
                    className="tesea-mock-go"
                    onClick={() => showToast('Exam review opened.')}
                  >
                    Review
                  </button>
                </div>

                <div className="tesea-mock-row">
                  <div>
                    <b>Form 4 Mathematics mock exam</b>
                    <small>Completed 05 July • 2h 01m</small>
                  </div>
                  <span className="tesea-mock-score">74%</span>
                  <button 
                    type="button" 
                    className="tesea-mock-go"
                    onClick={() => showToast('Exam review opened.')}
                  >
                    Review
                  </button>
                </div>
              </section>
            </>
          ) : activeNav === 'My progress' ? (
            <>
              <div className="tesea-crumb">
                Account <b>/ My progress</b>
              </div>

              <div className="tesea-settings-title">
                <div>
                  <h1>Your progress</h1>
                  <p>See your growth, celebrate consistency and focus your next study session.</p>
                </div>
                <button 
                  type="button"
                  className="tesea-progress-period"
                  onClick={() => showToast('Progress period options opened.')}
                >
                  Last 30 days ⌄
                </button>
              </div>

              <section className="tesea-progress-hero">
                <div>
                  <small>YOUR LEARNING STORY</small>
                  <h2>{progressStats.weeklyGoal > 0 ? 'Steady progress, stronger results.' : 'Welcome to your learning journey.'}</h2>
                  <p>
                    {progressStats.weeklyGoal > 0 
                      ? `You have completed ${progressStats.weeklyGoal}% of your weekly goal and improved your quiz average by +${progressStats.quizScoreImprovement}% this month.`
                      : 'You have completed 0% of your weekly goal. Resume your courses or take practice quizzes to track your learning progress.'}
                  </p>
                </div>
                <div className="tesea-progress-ring">
                  {progressStats.weeklyGoal}<small>% goal</small>
                </div>
              </section>

              <section className="tesea-progress-stats">
                <article className="tesea-progress-stat">
                  <div className="tesea-progress-ico">◷</div>
                  <div>
                    <b>{Math.floor(progressStats.monthlyMinutes / 60)}h {progressStats.monthlyMinutes % 60}m</b>
                    <small>learning this month</small>
                  </div>
                </article>
                <article className="tesea-progress-stat">
                  <div className="tesea-progress-ico">⚡</div>
                  <div>
                    <b>{progressStats.longestStreakDays} days</b>
                    <small>longest learning streak</small>
                  </div>
                </article>
                <article className="tesea-progress-stat">
                  <div className="tesea-progress-ico">↗</div>
                  <div>
                    <b>+{progressStats.quizScoreImprovement}%</b>
                    <small>quiz score improvement</small>
                  </div>
                </article>
              </section>

              <section className="tesea-progress-cols">
                <article className="tesea-progress-card">
                  <h3>Learning activity</h3>
                  <div className="tesea-progress-chart">
                    {progressStats.activityData.map((item, idx) => (
                      <i 
                        key={idx} 
                        className={`tesea-progress-col ${item.pct > 0 ? 'active' : ''}`} 
                        style={{ height: item.pct > 0 ? `${item.pct}%` : '2px' }}
                      >
                        <small>{item.day}</small>
                      </i>
                    ))}
                  </div>
                </article>

                <article className="tesea-progress-card">
                  <h3>Subject mastery</h3>
                  {progressStats.subjectMastery.map((sub) => (
                    <div key={sub.subject} className="tesea-progress-subject">
                      <div className="tesea-progress-subhead">
                        <span>{sub.subject}</span>
                        <b>{sub.score}%</b>
                      </div>
                      <div className="tesea-progress-sbar">
                        <i style={{ width: `${sub.score}%` }} />
                      </div>
                    </div>
                  ))}
                </article>
              </section>

              <section className="tesea-progress-insight">
                <div className="tesea-progress-ico">✦</div>
                <div>
                  <b>Rafiki AI insight</b>
                  <p>
                    {progressStats.weeklyGoal > 0 
                      ? 'Your strongest gains come after short, consistent study sessions. Keep up the momentum!'
                      : 'Welcome! Start learning lessons and taking practice quizzes to unlock personalized Rafiki AI insights.'}
                  </p>
                </div>
                <button 
                  type="button"
                  onClick={() => showToast('Rafiki AI study recommendations updated.')}
                >
                  View plan
                </button>
              </section>
            </>
          ) : activeNav === 'Settings' ? (
            <>
              <div className="tesea-crumb">
                Account <b>/ Settings</b>
              </div>

              <div className="tesea-settings-title">
                <div>
                  <h1>Settings</h1>
                  <p>Manage your account, learning experience and privacy preferences.</p>
                </div>
                <button className="tesea-save-btn" onClick={handleSaveSettings}>
                  Save changes
                </button>
              </div>

              <div className="tesea-settings-grid">
                <aside className="tesea-settings-box tesea-settings-menu">
                  <button 
                    type="button"
                    className={activeSettingsTab === 'Profile' ? 'on' : ''} 
                    onClick={() => { setActiveSettingsTab('Profile'); showToast('Profile settings selected.'); }}
                  >
                    Profile
                  </button>
                  <button 
                    type="button"
                    className={activeSettingsTab === 'Learning preferences' ? 'on' : ''} 
                    onClick={() => { setActiveSettingsTab('Learning preferences'); showToast('Learning preferences settings selected.'); }}
                  >
                    Learning preferences
                  </button>
                  <button 
                    type="button"
                    className={activeSettingsTab === 'Notifications' ? 'on' : ''} 
                    onClick={() => { setActiveSettingsTab('Notifications'); showToast('Notifications settings selected.'); }}
                  >
                    Notifications
                  </button>
                  <button 
                    type="button"
                    className={activeSettingsTab === 'Security' ? 'on' : ''} 
                    onClick={() => { setActiveSettingsTab('Security'); showToast('Security settings selected.'); }}
                  >
                    Security
                  </button>
                  <button 
                    type="button"
                    className={activeSettingsTab === 'Subscription' ? 'on' : ''} 
                    onClick={() => { setActiveSettingsTab('Subscription'); showToast('Subscription settings selected.'); }}
                  >
                    Subscription
                  </button>
                </aside>

                <section className="tesea-settings-box tesea-settings-content">
                  {activeSettingsTab === 'Profile' && (
                    <>
                      <h2>Profile information</h2>
                      <p>Keep your learner account details current.</p>
                      
                      <div className="tesea-settings-row">
                        <div className="tesea-settings-field">
                          <label>First name</label>
                          <input 
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)} 
                          />
                        </div>
                        <div className="tesea-settings-field">
                          <label>Last name</label>
                          <input 
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)} 
                          />
                        </div>
                      </div>

                      <div className="tesea-settings-field">
                        <label>Email address</label>
                        <input 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                        />
                      </div>

                      <div className="tesea-settings-row">
                        <div className="tesea-settings-field">
                          <label>Preferred language</label>
                          <select 
                            value={preferredLanguage} 
                            onChange={(e) => setPreferredLanguage(e.target.value)}
                          >
                            <option>English</option>
                            <option>Kiswahili</option>
                          </select>
                        </div>
                        <div className="tesea-settings-field">
                          <label>Learning track</label>
                          <select 
                            value={learningTrack} 
                            onChange={(e) => setLearningTrack(e.target.value)}
                          >
                            <option>NECTA • Form 4</option>
                            <option>Cambridge • IGCSE</option>
                          </select>
                        </div>
                      </div>

                      <div className="tesea-settings-item">
                        <div>
                          <b>Study reminders</b>
                          <p>Receive gentle reminders to keep your learning streak alive.</p>
                        </div>
                        <button 
                          type="button"
                          className={`tesea-switch ${studyReminders ? 'on' : ''}`}
                          onClick={() => { setStudyReminders(!studyReminders); showToast('Preference updated.'); }}
                        >
                          <i></i>
                        </button>
                      </div>

                      <div className="tesea-settings-item">
                        <div>
                          <b>Offline downloads</b>
                          <p>Make learning resources available when you are not connected.</p>
                        </div>
                        <button 
                          type="button"
                          className={`tesea-switch ${offlineDownloads ? 'on' : ''}`}
                          onClick={() => { setOfflineDownloads(!offlineDownloads); showToast('Preference updated.'); }}
                        >
                          <i></i>
                        </button>
                      </div>

                      <div className="tesea-settings-item">
                        <div>
                          <b>Rafiki AI suggestions</b>
                          <p>Allow personalised recommendations based on your activity.</p>
                        </div>
                        <button 
                          type="button"
                          className={`tesea-switch ${rafikiSuggestions ? 'on' : ''}`}
                          onClick={() => { setRafikiSuggestions(!rafikiSuggestions); showToast('Preference updated.'); }}
                        >
                          <i></i>
                        </button>
                      </div>
                    </>
                  )}

                  {activeSettingsTab === 'Learning preferences' && (
                    <>
                      <h2>Learning preferences</h2>
                      <p>Customise your default study speeds, subjects and goals.</p>
                      <div className="tesea-settings-field">
                        <label>Target Weekly Goal</label>
                        <select>
                          <option>5 hours / week</option>
                          <option>10 hours / week</option>
                          <option>15 hours / week</option>
                        </select>
                      </div>
                      <div className="tesea-settings-item">
                        <div>
                          <b>Autoplay next lesson</b>
                          <p>Automatically launch the next video or revision note when finished.</p>
                        </div>
                        <button 
                          type="button"
                          className="tesea-switch on"
                          onClick={() => showToast('Preference updated.')}
                        >
                          <i></i>
                        </button>
                      </div>
                    </>
                  )}

                  {activeSettingsTab === 'Notifications' && (
                    <>
                      <h2>Notification settings</h2>
                      <p>Manage how and when TESEA Academy reaches you.</p>
                      <div className="tesea-settings-item">
                        <div>
                          <b>Email digests</b>
                          <p>Receive weekly updates on your progress and study streak.</p>
                        </div>
                        <button 
                          type="button"
                          className="tesea-switch on"
                          onClick={() => showToast('Preference updated.')}
                        >
                          <i></i>
                        </button>
                      </div>
                      <div className="tesea-settings-item">
                        <div>
                          <b>Exam announcements</b>
                          <p>Get notified about mock exams and upcoming NECTA practice schedules.</p>
                        </div>
                        <button 
                          type="button"
                          className="tesea-switch on"
                          onClick={() => showToast('Preference updated.')}
                        >
                          <i></i>
                        </button>
                      </div>
                    </>
                  )}

                  {activeSettingsTab === 'Security' && (
                    <>
                      <h2>Security & Password</h2>
                      <p>Keep your credentials safe and manage active logins.</p>
                      <div className="tesea-settings-field">
                        <label>Current Password</label>
                        <input type="password" placeholder="••••••••" />
                      </div>
                      <div className="tesea-settings-field">
                        <label>New Password</label>
                        <input type="password" placeholder="••••••••" />
                      </div>
                    </>
                  )}

                  {activeSettingsTab === 'Subscription' && (
                    <>
                      <h2>Subscription & Billing</h2>
                      <p>Manage your active TESEA plan and payment methods.</p>
                      <div className="p-4 bg-[#f8f7f5] rounded-xl border border-[#e8e5e2] mb-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <b className="text-sm font-bold block text-[#22232b]">NO ACTIVE SUBSCRIPTION</b>
                            <span className="text-xs text-[#727680]">Free Learner • 0 active paid subscriptions</span>
                          </div>
                          <span className="px-3 py-1 bg-[#e9e7e4] text-[#525764] text-xs font-bold rounded-md">INACTIVE</span>
                        </div>
                      </div>
                    </>
                  )}
                </section>
              </div>
            </>
          ) : (
            <>
              <div className="tesea-crumb">
                My learning <b>/ My courses</b>
              </div>

              <div className="tesea-intro">
                <div>
                  <h1 className="font-serif text-3xl font-bold">My courses</h1>
                  <p>Pick up where you left off and keep your momentum going.</p>
                </div>
                <button 
                  className="tesea-add"
                  onClick={() => {
                    if (userCourses.length === 0) {
                      setUserCourses([COURSES_DATA[0], COURSES_DATA[1]]);
                      showToast('Enrolled in Mathematics and Biology courses.');
                    } else {
                      showToast('All available courses are already in your learning plan.');
                    }
                  }}
                >
                  Browse more courses →
                </button>
              </div>

              {/* Stats */}
              <section className="tesea-stats">
                <article className="tesea-stat">
                  <div className="ico">▤</div>
                  <div>
                    <b>{userCourses.filter(c => c.progress < 100).length}</b>
                    <small>courses in progress</small>
                  </div>
                </article>
                <article className="tesea-stat">
                  <div className="ico">◷</div>
                  <div>
                    <b>{Math.floor(progressStats.monthlyMinutes / 60)}h {progressStats.monthlyMinutes % 60}m</b>
                    <small>learning this week</small>
                  </div>
                </article>
                <article className="tesea-stat">
                  <div className="ico">✓</div>
                  <div>
                    <b>{progressStats.averageFinalScore}%</b>
                    <small>average quiz score</small>
                  </div>
                </article>
              </section>

              {/* Toolbar */}
              <section className="tesea-toolbar">
                <div className="tesea-tabs">
                  <button 
                    className={`tesea-tab ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => handleTabClick('all')}
                  >
                    In progress <span>{userCourses.filter(c => c.progress < 100).length}</span>
                  </button>
                  <button 
                    className={`tesea-tab ${activeTab === 'completed' ? 'active' : ''}`}
                    onClick={() => handleTabClick('completed')}
                  >
                    Completed <span style={{ background: '#eee', color: '#666' }}>{userCourses.filter(c => c.progress >= 100).length}</span>
                  </button>
                  <button 
                    className={`tesea-tab ${activeTab === 'saved' ? 'active' : ''}`}
                    onClick={() => handleTabClick('saved')}
                  >
                    Saved <span style={{ background: '#eee', color: '#666' }}>0</span>
                  </button>
                </div>

                <select 
                  className="tesea-filter"
                  value={sortOption}
                  onChange={(e) => {
                    setSortOption(e.target.value);
                    showToast(`Courses sorted by ${e.target.value}`);
                  }}
                >
                  <option>Recently accessed</option>
                  <option>Progress: high to low</option>
                  <option>Course title: A–Z</option>
                </select>
              </section>

              {/* Courses Grid or Empty */}
              {filteredCourses.length > 0 ? (
                <section className="tesea-grid">
                  {filteredCourses.map((c) => (
                    <article key={c.id} className="tesea-course">
                      <div className={`tesea-cover tesea-${c.classType}`}>
                        <small>{c.level}</small>
                        <b>{c.title}</b>
                      </div>
                      <div className="tesea-coursebody">
                        <div className="label">{c.lesson}</div>
                        <h3>{c.topic}</h3>
                        <p>{c.subtopic}</p>
                        <div className="tesea-line">
                          <b>{c.progress}% complete</b>
                          <span>{c.timeLeft}</span>
                        </div>
                        <div className="tesea-pbar">
                          <i style={{ width: `${c.progress}%` }} />
                        </div>
                        <div className="tesea-actions">
                          <small>{c.type}</small>
                          <button 
                            className="tesea-resume"
                            onClick={() => {
                              if (onGoToLessonPlayer) onGoToLessonPlayer(c.title);
                              showToast(`Opening lesson player for ${c.title}…`);
                              // Log real student session to Firestore and admin telemetry
                              logStudentLearningSession({
                                userId: userEmail || 'student@tesea.ac.tz',
                                userName: userName || 'Student',
                                courseTitle: c.title,
                                minutesSpent: 45,
                                completed: c.progress + 25 >= 100,
                                dayOfWeek: new Date().getDay()
                              });
                              // Dynamically update student learning progress and certificates
                              setProgressStats(prev => {
                                const newGoal = Math.min(100, prev.weeklyGoal + 25);
                                const isCourseFinished = newGoal >= 100;
                                const newCertsEarned = isCourseFinished && prev.earnedCertsList.length === 0 ? 1 : prev.certificatesEarned;
                                const updatedCertsList = isCourseFinished && prev.earnedCertsList.length === 0 
                                  ? [{ title: c.title, course: c.title + ' Essentials', track: c.category || 'NECTA Form 4', date: 'Today' }] 
                                  : prev.earnedCertsList;

                                const updatedMastery = prev.subjectMastery.map(sub => 
                                  c.title.toLowerCase().includes(sub.subject.toLowerCase()) 
                                    ? { ...sub, score: Math.min(100, sub.score + 25) } 
                                    : sub
                                );
                                const updatedActivity = prev.activityData.map((act, idx) => 
                                  idx === 3 ? { ...act, pct: Math.min(100, (act.pct || 15) + 35) } : act
                                );
                                return {
                                  ...prev,
                                  weeklyGoal: newGoal === 100 ? 100 : newGoal,
                                  monthlyMinutes: prev.monthlyMinutes + 45,
                                  longestStreakDays: prev.longestStreakDays === 0 ? 1 : prev.longestStreakDays + 1,
                                  quizScoreImprovement: Math.min(100, prev.quizScoreImprovement + 10),
                                  certificatesEarned: newCertsEarned,
                                  averageFinalScore: newCertsEarned > 0 ? 88 : 0,
                                  pathsNearlyComplete: isCourseFinished ? 0 : 1,
                                  earnedCertsList: updatedCertsList,
                                  activityData: updatedActivity,
                                  subjectMastery: updatedMastery
                                };
                              });
                              // Update course progress in userCourses
                              setUserCourses(prev => prev.map(course => 
                                course.id === c.id ? { ...course, progress: Math.min(100, course.progress + 25) } : course
                              ));
                            }}
                          >
                            Resume
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </section>
              ) : (
                <div className="tesea-empty" style={{ display: 'block' }}>
                  ◌ <b>No courses in progress yet</b>
                  Your enrolled courses will appear here as you start learning.
                  <div style={{ marginTop: '16px' }}>
                    <button 
                      type="button" 
                      className="tesea-mock-custom"
                      onClick={() => {
                        setUserCourses([COURSES_DATA[0], COURSES_DATA[1]]);
                        logActivityEvent({
                          title: 'Courses Enrolled',
                          subtitle: `${userName || 'Student'} enrolled in Mathematics & Biology`,
                          icon: '◈'
                        });
                        showToast('Started learning Mathematics & Biology!');
                      }}
                    >
                      + Start learning Mathematics & Biology
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Floating Rafiki AI FAB */}
      <button 
        className="tesea-ai-fab"
        onClick={() => setIsAiOpen(!isAiOpen)}
      >
        <span className="tesea-spark">✦</span> Ask Rafiki AI
      </button>

      {/* Floating Rafiki AI Panel */}
      {isAiOpen && (
        <section className="tesea-ai-panel">
          <div className="tesea-ai-title">
            <span><span className="tesea-spark">✦</span> Rafiki AI Tutor</span>
            <button className="tesea-close" onClick={() => setIsAiOpen(false)}>×</button>
          </div>

          <div className="space-y-2 my-3 max-h-[200px] overflow-y-auto">
            {aiMessages.map((m, idx) => (
              <div 
                key={idx} 
                className={m.sender === 'user' ? 'text-right font-bold text-[#962c4c] text-xs' : 'tesea-message'}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendAi} className="tesea-ask">
            <input 
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Ask anything about your learning..."
            />
            <button type="submit">→</button>
          </form>
        </section>
      )}
    </div>
  );
}
