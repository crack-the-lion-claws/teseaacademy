import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { fetchLiveAdminAnalytics, AdminAnalyticsData } from '../lib/learningService';
import SuperAdminLearnersView from './SuperAdminLearnersView';
import SuperAdminContentStudioView from './SuperAdminContentStudioView';
import SuperAdminCurriculumView from './SuperAdminCurriculumView';
import SuperAdminAssessmentsView from './SuperAdminAssessmentsView';
import SuperAdminAITutorView from './SuperAdminAITutorView';
import SuperAdminSubscriptionsView from './SuperAdminSubscriptionsView';
import SuperAdminTeamRolesView from './SuperAdminTeamRolesView';
import SuperAdminSchoolsView from './SuperAdminSchoolsView';
import SuperAdminAnalyticsView from './SuperAdminAnalyticsView';
import SuperAdminSettingsView from './SuperAdminSettingsView';


interface SuperAdminDashboardProps {
  onSwitchWorkspace: (workspace: 'Content Studio' | 'Super Admin') => void;
  onLogout?: () => void;
  showToast: (msg: string) => void;
  userName?: string;
}

export default function SuperAdminDashboard({
  onSwitchWorkspace,
  onLogout,
  showToast,
  userName = 'Emmanuel E.'
}: SuperAdminDashboardProps) {
  const [activeView, setActiveView] = useState('Overview');
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemType, setItemType] = useState('Course');
  const [itemName, setItemName] = useState('');
  const [liveAnalytics, setLiveAnalytics] = useState<AdminAnalyticsData | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getEATHour = (date: Date) => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Dar_es_Salaam',
        hour: 'numeric',
        hour12: false
      });
      const parts = formatter.formatToParts(date);
      const hourPart = parts.find(p => p.type === 'hour')?.value || '';
      return parseInt(hourPart, 10) || date.getHours();
    } catch (e) {
      return date.getHours();
    }
  };

  const currentHour = getEATHour(currentTime);
  const greeting = currentHour >= 5 && currentHour < 12 ? 'Good morning' : currentHour >= 12 && currentHour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = (userName || 'Emmanuel').split(' ')[0];

  useEffect(() => {
    fetchLiveAdminAnalytics().then(data => setLiveAnalytics(data)).catch(() => {});
  }, []);

  // Handle modal submit
  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    const name = itemName.trim() || `New ${itemType}`;
    setIsModalOpen(false);
    setItemName('');
    showToast(`"${name}" created successfully.`);
  };

  const handleNavClick = (view: string) => {
    setActiveView(view);
    showToast(`${view} workspace loaded.`);
  };

  return (
    <div className="min-h-screen bg-[#f6f9f8] text-[#192225] font-sans antialiased flex">
      {/* Super Admin Dark Teal Sidebar */}
      <aside 
        style={{
          background: '#102827',
          color: '#d6e2e0',
          width: '266px',
          height: '100vh',
          position: 'sticky',
          top: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 14px',
          overflowY: 'auto',
          flexShrink: 0
        }}
        className="hidden lg:flex"
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 10px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div 
            style={{
              width: '38px',
              height: '29px',
              background: '#96314c',
              clipPath: 'polygon(50% 0, 100% 75%, 82% 75%, 82% 100%, 18% 100%, 18% 75%, 0 75%)',
              position: 'relative'
            }}
          >
            <span style={{ position: 'absolute', width: '8px', height: '8px', borderRadius: '50%', background: '#fff', left: '15px', top: '11px' }}></span>
          </div>
          <div>
            <b style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '18px', display: 'block', color: '#fff' }}>TESEA Academy</b>
            <small style={{ display: 'block', fontSize: '10px', color: '#8eb2ad', letterSpacing: '.12em', textTransform: 'uppercase', marginTop: '2px' }}>
              Learn today. Lead tomorrow.
            </small>
          </div>
        </div>

        {/* Workspace Switcher with Slide-Down Dropdown */}
        <div style={{ margin: '20px 4px 10px', position: 'relative' }}>
          <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.12em', color: '#81a7a2', display: 'block', marginBottom: '8px', fontWeight: 700 }}>
            Workspace
          </span>
          
          <button
            onClick={() => setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen)}
            style={{
              width: '100%',
              background: '#1b4442',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              padding: '10px 12px',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d39b45' }}></span>
              <span>Super Admin</span>
            </div>
            <span style={{ transform: isWorkspaceDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', fontSize: '11px' }}>▼</span>
          </button>

          {/* Slide Down Dropdown Menu */}
          {isWorkspaceDropdownOpen && (
            <div 
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '6px',
                background: '#0d2221',
                border: '1px solid #235451',
                borderRadius: '8px',
                padding: '6px',
                zIndex: 30,
                boxShadow: '0 12px 28px rgba(0,0,0,0.4)',
                animation: 'slideDown 0.2s ease-out'
              }}
            >
              <button
                onClick={() => {
                  setIsWorkspaceDropdownOpen(false);
                  onSwitchWorkspace('Content Studio');
                  showToast('Switched to TESEA Content Studio.');
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'transparent',
                  border: 0,
                  color: '#c4d3d0',
                  padding: '9px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#1c403e'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c4d3d0'; }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#96314c' }}></span>
                <span>TESEA Content Studio</span>
              </button>

              <button
                onClick={() => {
                  setIsWorkspaceDropdownOpen(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: '#1c403e',
                  border: 0,
                  color: '#fff',
                  padding: '9px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '3px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d39b45' }}></span>
                  <span>Super Admin</span>
                </div>
                <span style={{ fontSize: '10px', color: '#d39b45' }}>Active</span>
              </button>
            </div>
          )}
        </div>

        {/* Navigation - Control centre */}
        <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.12em', color: '#81a7a2', margin: '18px 11px 8px', fontWeight: 700 }}>
          Control centre
        </div>
        <nav style={{ display: 'grid', gap: '3px' }}>
          {[
            { id: 'Overview', icon: '▦', tag: null },
            { id: 'Learners', icon: '♙', tag: '24' },
            { id: 'Content Studio', icon: '▤', tag: null },
            { id: 'Curriculum', icon: '◫', tag: null },
            { id: 'Assessments', icon: '✓', tag: null },
            { id: 'AI Tutor', icon: '✦', tag: null }
          ].map((item) => {
            const isActive = activeView === item.id;
            return (
              <a
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  color: isActive ? '#fff' : '#c4d3d0',
                  background: isActive ? '#1c403e' : 'transparent',
                  boxShadow: isActive ? 'inset 3px 0 #d39b45' : 'none',
                  textDecoration: 'none',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '11px',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = '#153331'; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ width: '18px', textAlign: 'center', color: '#a4c7c2' }}>{item.icon}</span>
                <span>{item.id}</span>
                {item.tag && (
                  <span style={{ marginLeft: 'auto', background: '#dc9e43', color: '#27210f', borderRadius: '20px', padding: '1px 7px', fontSize: '10px', fontWeight: 700 }}>
                    {item.tag}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Navigation - Business */}
        <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.12em', color: '#81a7a2', margin: '18px 11px 8px', fontWeight: 700 }}>
          Business
        </div>
        <nav style={{ display: 'grid', gap: '3px' }}>
          {[
            { id: 'Subscriptions', icon: '◇' },
            { id: 'Schools', icon: '⌂' },
            { id: 'Analytics', icon: '◔' },
            { id: 'Team & Roles', icon: '♧' },
            { id: 'Settings', icon: '⚙' }
          ].map((item) => {
            const isActive = activeView === item.id;
            return (
              <a
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  color: isActive ? '#fff' : '#c4d3d0',
                  background: isActive ? '#1c403e' : 'transparent',
                  boxShadow: isActive ? 'inset 3px 0 #d39b45' : 'none',
                  textDecoration: 'none',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '11px',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = '#153331'; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ width: '18px', textAlign: 'center', color: '#a4c7c2' }}>{item.icon}</span>
                <span>{item.id}</span>
              </a>
            );
          })}
        </nav>

        {/* Sidebar Bottom */}
        <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.11)', paddingTop: '18px', paddingLeft: '6px', paddingRight: '6px' }}>
          <div style={{ background: '#1b4442', borderRadius: '10px', padding: '12px', marginBottom: '16px', fontSize: '12px', lineHeight: 1.45 }}>
            <b style={{ display: 'block', color: '#fff', marginBottom: '3px' }}>Need a hand?</b>
            <span style={{ color: '#8eb2ad' }}>View the Super Admin guide.</span>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'linear-gradient(145deg, #f2c291, #7e4931)', color: '#fff', fontWeight: 700, fontSize: '12px' }}>
              EE
            </div>
            <div>
              <b style={{ color: '#fff', fontSize: '13px', display: 'block' }}>{userName}</b>
              <small style={{ display: 'block', color: '#8eb2ad', fontSize: '11px' }}>Super Administrator</small>
            </div>
            {onLogout && (
              <button 
                onClick={onLogout} 
                style={{ marginLeft: 'auto', background: 'none', border: 0, color: '#8eb2ad', cursor: 'pointer', padding: '4px' }} 
                title="Log out"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Topbar */}
        <header 
          style={{
            height: '76px',
            background: '#fff',
            borderBottom: '1px solid #e6eceb',
            display: 'flex',
            alignItems: 'center',
            padding: '0 34px',
            gap: '23px',
            position: 'sticky',
            top: 0,
            zIndex: 10
          }}
        >
          <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', whiteSpace: 'nowrap' }}>
            {activeView} <span style={{ color: '#667578', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 500, display: 'block', marginTop: '2px' }}>
              {activeView === 'Content Studio' ? 'Super Admin / Learning content' : activeView === 'Curriculum' ? 'Super Admin / Curriculum governance' : activeView === 'Assessments' ? 'Super Admin / Assessment operations' : activeView === 'AI Tutor' ? 'Super Admin / Rafiki AI operations' : activeView === 'Subscriptions' ? 'Super Admin / Commercial operations' : (activeView === 'Schools' || activeView === 'School') ? 'Super Admin / Institutional learning' : activeView === 'Analytics' ? 'Super Admin / Intelligence centre' : (activeView === 'Team & Roles' || activeView === 'Team & roles') ? 'Super Admin / Access governance' : activeView === 'Settings' ? 'Super Admin / Platform configuration' : activeView === 'Learners' ? 'Super Admin / Learner access' : 'Platform management'}
            </span>

          </div>

          <div style={{ maxWidth: '450px', flex: 1, marginLeft: '8px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '14px', top: '7px', fontSize: '20px', color: '#80908f' }}>⌕</span>
            <input 
              aria-label="Search" 
              placeholder="Search learners, courses, schools…" 
              style={{
                width: '100%',
                padding: '10px 15px 10px 39px',
                border: '1px solid #dde6e4',
                background: '#f9fbfb',
                borderRadius: '7px',
                outline: 0,
                fontSize: '13px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '13px' }}>
            {/* Quick Switch to Content Studio button */}
            <button
              onClick={() => {
                setActiveView('Content Studio');
                showToast('Content Studio workspace loaded.');
              }}
              style={{
                background: activeView === 'Content Studio' ? '#057b79' : '#f1f6f5',
                border: '1px solid #dbe6e4',
                color: activeView === 'Content Studio' ? '#fff' : '#057b79',
                borderRadius: '7px',
                padding: '7px 12px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              ▤ Open Content Studio
            </button>

            <button 
              onClick={() => showToast('Help guide opened.')}
              style={{ border: '1px solid #e6eceb', background: '#fff', borderRadius: '7px', width: '38px', height: '38px', cursor: 'pointer', color: '#49615e', fontSize: '15px' }} 
              title="Help"
            >
              ?
            </button>
            <button 
              onClick={() => showToast('3 unread super admin notifications.')}
              style={{ border: '1px solid #e6eceb', background: '#fff', borderRadius: '7px', width: '38px', height: '38px', cursor: 'pointer', color: '#49615e', fontSize: '15px', position: 'relative' }} 
              title="Notifications"
            >
              ♢
              <span style={{ position: 'absolute', width: '7px', height: '7px', borderRadius: '50%', background: '#d84e50', top: '8px', right: '9px' }}></span>
            </button>
            <div 
              style={{ width: '35px', height: '35px', borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'linear-gradient(145deg, #f2c291, #7e4931)', color: '#fff', fontWeight: 700, fontSize: '12px' }}
              title="Profile"
            >
              EE
            </div>
          </div>
        </header>

        {/* Content View */}
        {activeView === 'Learners' ? (
          <SuperAdminLearnersView showToast={showToast} adminName={userName} />
        ) : activeView === 'Content Studio' ? (
          <SuperAdminContentStudioView showToast={showToast} adminName={userName} />
        ) : activeView === 'Curriculum' ? (
          <SuperAdminCurriculumView showToast={showToast} adminName={userName} />
        ) : activeView === 'Assessments' ? (
          <SuperAdminAssessmentsView showToast={showToast} adminName={userName} />
        ) : activeView === 'AI Tutor' ? (
          <SuperAdminAITutorView showToast={showToast} adminName={userName} />
        ) : activeView === 'Subscriptions' ? (
          <SuperAdminSubscriptionsView showToast={showToast} adminName={userName} />
        ) : (activeView === 'Schools' || activeView === 'School') ? (
          <SuperAdminSchoolsView showToast={showToast} adminName={userName} />
        ) : activeView === 'Analytics' ? (
          <SuperAdminAnalyticsView showToast={showToast} adminName={userName} />
        ) : (activeView === 'Team & Roles' || activeView === 'Team & roles') ? (
          <SuperAdminTeamRolesView showToast={showToast} adminName={userName} />
        ) : activeView === 'Settings' ? (
          <SuperAdminSettingsView showToast={showToast} adminName={userName} />
        ) : (

          <main style={{ padding: '31px 34px 45px', maxWidth: '1600px', margin: 'auto' }}>
          {/* Header Title */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '26px' }}>
            <div>
              <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '25px', margin: '0 0 5px' }}>
                {greeting}, {firstName}
              </h1>
              <p style={{ margin: 0, color: '#667578', fontSize: '13px' }}>
                Here’s a live picture of TESEA Academy today.
              </p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{
                background: '#057b79',
                color: '#fff',
                border: 0,
                borderRadius: '7px',
                padding: '11px 15px',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: '0 6px 13px rgba(5,123,121,.19)'
              }}
            >
              ＋ Add new
            </button>
          </div>

          {/* 4 KPIs Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '17px', marginBottom: '23px' }}>
            {/* Total Learners */}
            <article style={{ background: '#fff', border: '1px solid #e6eceb', borderRadius: '11px', boxShadow: '0 10px 28px rgba(21,48,47,.07)', padding: '19px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#667578', fontWeight: 600, fontSize: '12px' }}>
                Total learners 
                <span style={{ width: '35px', height: '35px', borderRadius: '9px', display: 'grid', placeItems: 'center', fontSize: '17px', background: '#e7f4f3', color: '#057b79' }}>♙</span>
              </div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '24px', margin: '15px 0 5px' }}>
                {liveAnalytics ? liveAnalytics.activeLearners.toLocaleString() : '0'}
              </div>
              <div style={{ fontSize: '12px', color: '#16875f', fontWeight: 700 }}>
                {liveAnalytics && liveAnalytics.activeLearners > 0 ? '↗ 100%' : '0%'} <span style={{ fontWeight: 400, color: '#667578', marginLeft: '3px' }}>vs last month</span>
              </div>
            </article>

            {/* Active Subscriptions */}
            <article style={{ background: '#fff', border: '1px solid #e6eceb', borderRadius: '11px', boxShadow: '0 10px 28px rgba(21,48,47,.07)', padding: '19px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#667578', fontWeight: 600, fontSize: '12px' }}>
                Active subscriptions 
                <span style={{ width: '35px', height: '35px', borderRadius: '9px', display: 'grid', placeItems: 'center', fontSize: '17px', background: '#fbecee', color: '#96314c' }}>◇</span>
              </div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '24px', margin: '15px 0 5px' }}>0</div>
              <div style={{ fontSize: '12px', color: '#667578', fontWeight: 700 }}>
                0% <span style={{ fontWeight: 400, color: '#667578', marginLeft: '3px' }}>vs last month</span>
              </div>
            </article>

            {/* Learning Hours */}
            <article style={{ background: '#fff', border: '1px solid #e6eceb', borderRadius: '11px', boxShadow: '0 10px 28px rgba(21,48,47,.07)', padding: '19px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#667578', fontWeight: 600, fontSize: '12px' }}>
                Learning hours 
                <span style={{ width: '35px', height: '35px', borderRadius: '9px', display: 'grid', placeItems: 'center', fontSize: '17px', background: '#fff3df', color: '#b87912' }}>◴</span>
              </div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '24px', margin: '15px 0 5px' }}>
                {liveAnalytics ? liveAnalytics.learningHours.toLocaleString() : '0'}
              </div>
              <div style={{ fontSize: '12px', color: '#16875f', fontWeight: 700 }}>
                {liveAnalytics && liveAnalytics.learningHours > 0 ? '↗ 100%' : '0%'} <span style={{ fontWeight: 400, color: '#667578', marginLeft: '3px' }}>this month</span>
              </div>
            </article>

            {/* Monthly Revenue */}
            <article style={{ background: '#fff', border: '1px solid #e6eceb', borderRadius: '11px', boxShadow: '0 10px 28px rgba(21,48,47,.07)', padding: '19px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#667578', fontWeight: 600, fontSize: '12px' }}>
                Monthly revenue 
                <span style={{ width: '35px', height: '35px', borderRadius: '9px', display: 'grid', placeItems: 'center', fontSize: '17px', background: '#eeeaff', color: '#6252bd' }}>▤</span>
              </div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '24px', margin: '15px 0 5px' }}>TZS 0</div>
              <div style={{ fontSize: '12px', color: '#667578', fontWeight: 700 }}>
                0% <span style={{ fontWeight: 400, color: '#667578', marginLeft: '3px' }}>vs last month</span>
              </div>
            </article>
          </div>

          {/* Grid: Charts Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 0.95fr', gap: '20px', marginBottom: '20px' }}>
            {/* Platform Growth Line Chart */}
            <article style={{ background: '#fff', border: '1px solid #e6eceb', borderRadius: '11px', boxShadow: '0 10px 28px rgba(21,48,47,.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 21px 0' }}>
                <div>
                  <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '15px', margin: 0 }}>Platform growth</h2>
                  <p style={{ fontSize: '12px', color: '#667578', margin: '4px 0 0' }}>Learner registrations and completed lessons</p>
                </div>
                <button 
                  onClick={() => showToast('Growth report is ready to export.')}
                  style={{ border: 0, background: 'transparent', color: '#057b79', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}
                >
                  Export report ↗
                </button>
              </div>

              <div style={{ padding: '15px 21px 21px', height: '248px' }}>
                <div style={{ height: '184px', position: 'relative', borderBottom: '1px solid #e8eeed', background: 'repeating-linear-gradient(to bottom, transparent 0, transparent 44px, #edf1f0 45px)' }}>
                  <svg style={{ width: '100%', height: '100%', overflow: 'visible' }} viewBox="0 0 700 180" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="fillSuper" x1="0" x2="0" y1="0" y2="1">
                        <stop stopColor="#07817d" stopOpacity="0.25" />
                        <stop offset="1" stopColor="#07817d" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0 148 C45 142 58 125 94 133 S150 112 178 118 S233 97 262 106 S323 85 350 93 S407 67 438 75 S486 43 525 59 S583 27 611 39 S662 14 700 20 L700 180 L0 180Z" fill="url(#fillSuper)" />
                    <path d="M0 148 C45 142 58 125 94 133 S150 112 178 118 S233 97 262 106 S323 85 350 93 S407 67 438 75 S486 43 525 59 S583 27 611 39 S662 14 700 20" fill="none" stroke="#057b79" strokeWidth="3" />
                  </svg>
                </div>
                <div style={{ display: 'flex', gap: '16px', color: '#667578', fontSize: '11px', marginTop: '12px' }}>
                  <span><i style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', marginRight: '5px', background: '#057b79' }}></i>New learners</span>
                  <span><i style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', marginRight: '5px', background: '#d39b45' }}></i>Course completions</span>
                  <span style={{ marginLeft: 'auto' }}>Jan &nbsp; Feb &nbsp; Mar &nbsp; Apr &nbsp; May &nbsp; Jun &nbsp; Jul</span>
                </div>
              </div>
            </article>

            {/* Learner Mix Donut */}
            <article style={{ background: '#fff', border: '1px solid #e6eceb', borderRadius: '11px', boxShadow: '0 10px 28px rgba(21,48,47,.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 21px 0' }}>
                <div>
                  <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '15px', margin: 0 }}>Learner mix</h2>
                  <p style={{ fontSize: '12px', color: '#667578', margin: '4px 0 0' }}>Active learners by programme</p>
                </div>
                <button 
                  onClick={() => showToast('Programme insight opened.')}
                  style={{ border: 0, background: 'transparent', color: '#057b79', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}
                >
                  Details →
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px 22px 25px' }}>
                <div 
                  style={{
                    width: '145px',
                    height: '145px',
                    borderRadius: '50%',
                    background: 'conic-gradient(#057b79 0 51%, #d89c45 51% 75%, #96314c 75% 91%, #dfe9e7 91% 100%)',
                    display: 'grid',
                    placeItems: 'center',
                    position: 'relative'
                  }}
                >
                  <div style={{ position: 'absolute', width: '96px', height: '96px', borderRadius: '50%', background: '#fff' }}></div>
                  <strong style={{ zIndex: 1, textAlign: 'center', fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '20px' }}>
                    128K
                    <small style={{ display: 'block', color: '#667578', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 400 }}>learners</small>
                  </strong>
                </div>

                <div style={{ display: 'grid', gap: '10px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: '#667578' }}><i style={{ width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block', marginRight: '7px', background: '#057b79' }}></i>NECTA</span>
                    <b>51%</b>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: '#667578' }}><i style={{ width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block', marginRight: '7px', background: '#d89c45' }}></i>Cambridge</span>
                    <b>24%</b>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: '#667578' }}><i style={{ width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block', marginRight: '7px', background: '#96314c' }}></i>Professional</span>
                    <b>16%</b>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: '#667578' }}><i style={{ width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block', marginRight: '7px', background: '#dfe9e7' }}></i>Other</span>
                    <b>9%</b>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Lower Grid: Content Command Centre & Admin Activity */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 0.95fr', gap: '20px' }}>
            {/* Content Command Centre Table */}
            <article style={{ background: '#fff', border: '1px solid #e6eceb', borderRadius: '11px', boxShadow: '0 10px 28px rgba(21,48,47,.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 21px 0' }}>
                <div>
                  <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '15px', margin: 0 }}>Content command centre</h2>
                  <p style={{ fontSize: '12px', color: '#667578', margin: '4px 0 0' }}>Content awaiting action across the academy</p>
                </div>
                <button 
                  onClick={() => { onSwitchWorkspace('Content Studio'); showToast('Opening Content Studio…'); }}
                  style={{ border: 0, background: 'transparent', color: '#057b79', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}
                >
                  Manage content →
                </button>
              </div>

              <div style={{ padding: '10px 21px 18px', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '560px' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', color: '#81908e', fontSize: '10px', letterSpacing: '.08em', textTransform: 'uppercase', padding: '11px 0' }}>COURSE</th>
                      <th style={{ textAlign: 'left', color: '#81908e', fontSize: '10px', letterSpacing: '.08em', textTransform: 'uppercase', padding: '11px 0' }}>OWNER</th>
                      <th style={{ textAlign: 'left', color: '#81908e', fontSize: '10px', letterSpacing: '.08em', textTransform: 'uppercase', padding: '11px 0' }}>PROGRESS</th>
                      <th style={{ textAlign: 'left', color: '#81908e', fontSize: '10px', letterSpacing: '.08em', textTransform: 'uppercase', padding: '11px 0' }}>STATUS</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '12px 0', borderTop: '1px solid #edf1f0', fontSize: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '9px', fontWeight: 700 }}>
                          <i style={{ width: '31px', height: '31px', borderRadius: '6px', display: 'grid', placeItems: 'center', background: '#e5f0eb', fontSize: '15px', fontStyle: 'normal' }}>∑</i>
                          Advanced Mathematics · F5
                        </div>
                      </td>
                      <td style={{ padding: '12px 0', borderTop: '1px solid #edf1f0', fontSize: '12px', color: '#556567' }}>Dr. M. Lema</td>
                      <td style={{ padding: '12px 0', borderTop: '1px solid #edf1f0', fontSize: '12px', color: '#556567' }}>92%</td>
                      <td style={{ padding: '12px 0', borderTop: '1px solid #edf1f0' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, borderRadius: '20px', padding: '4px 8px', color: '#ab6b0a', background: '#fff3dd' }}>
                          Needs review
                        </span>
                      </td>
                      <td style={{ padding: '12px 0', borderTop: '1px solid #edf1f0', textAlign: 'right', color: '#91a09e', cursor: 'pointer' }}>•••</td>
                    </tr>

                    <tr>
                      <td style={{ padding: '12px 0', borderTop: '1px solid #edf1f0', fontSize: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '9px', fontWeight: 700 }}>
                          <i style={{ width: '31px', height: '31px', borderRadius: '6px', display: 'grid', placeItems: 'center', background: '#f5e9eb', fontSize: '15px', fontStyle: 'normal' }}>⚗</i>
                          Chemistry · F4
                        </div>
                      </td>
                      <td style={{ padding: '12px 0', borderTop: '1px solid #edf1f0', fontSize: '12px', color: '#556567' }}>A. Juma</td>
                      <td style={{ padding: '12px 0', borderTop: '1px solid #edf1f0', fontSize: '12px', color: '#556567' }}>100%</td>
                      <td style={{ padding: '12px 0', borderTop: '1px solid #edf1f0' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, borderRadius: '20px', padding: '4px 8px', color: '#08776c', background: '#e6f4f1' }}>
                          Published
                        </span>
                      </td>
                      <td style={{ padding: '12px 0', borderTop: '1px solid #edf1f0', textAlign: 'right', color: '#91a09e', cursor: 'pointer' }}>•••</td>
                    </tr>

                    <tr>
                      <td style={{ padding: '12px 0', borderTop: '1px solid #edf1f0', fontSize: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '9px', fontWeight: 700 }}>
                          <i style={{ width: '31px', height: '31px', borderRadius: '6px', display: 'grid', placeItems: 'center', background: '#fff1dd', fontSize: '15px', fontStyle: 'normal' }}>◉</i>
                          English for Careers
                        </div>
                      </td>
                      <td style={{ padding: '12px 0', borderTop: '1px solid #edf1f0', fontSize: '12px', color: '#556567' }}>S. Mushi</td>
                      <td style={{ padding: '12px 0', borderTop: '1px solid #edf1f0', fontSize: '12px', color: '#556567' }}>68%</td>
                      <td style={{ padding: '12px 0', borderTop: '1px solid #edf1f0' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, borderRadius: '20px', padding: '4px 8px', color: '#ab6b0a', background: '#fff3dd' }}>
                          Needs review
                        </span>
                      </td>
                      <td style={{ padding: '12px 0', borderTop: '1px solid #edf1f0', textAlign: 'right', color: '#91a09e', cursor: 'pointer' }}>•••</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* Admin Activity Moderation */}
            <article style={{ background: '#fff', border: '1px solid #e6eceb', borderRadius: '11px', boxShadow: '0 10px 28px rgba(21,48,47,.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 21px 0' }}>
                <div>
                  <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '15px', margin: 0 }}>Admin activity</h2>
                  <p style={{ fontSize: '12px', color: '#667578', margin: '4px 0 0' }}>Latest platform actions</p>
                </div>
                <button 
                  onClick={() => showToast('All activity is up to date.')}
                  style={{ border: 0, background: 'transparent', color: '#057b79', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}
                >
                  View all
                </button>
              </div>

              <div style={{ padding: '8px 21px 16px' }}>
                <div style={{ display: 'flex', gap: '11px', padding: '13px 0', borderBottom: '1px solid #edf1f0', alignItems: 'flex-start' }}>
                  <div style={{ width: '30px', height: '30px', display: 'grid', placeItems: 'center', borderRadius: '50%', background: '#edf6f5', color: '#057b79', fontWeight: 700, flexShrink: 0 }}>
                    ✓
                  </div>
                  <div>
                    <b style={{ fontSize: '12px', display: 'block' }}>1,284 quiz submissions processed</b>
                    <p style={{ margin: '3px 0', color: '#667578', fontSize: '11px', lineHeight: 1.35 }}>Automated marking completed for NECTA Biology.</p>
                    <time style={{ fontSize: '10px', color: '#91a09e' }}>12 minutes ago</time>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '11px', padding: '13px 0', borderBottom: '1px solid #edf1f0', alignItems: 'flex-start' }}>
                  <div style={{ width: '30px', height: '30px', display: 'grid', placeItems: 'center', borderRadius: '50%', background: '#edf6f5', color: '#057b79', fontWeight: 700, flexShrink: 0 }}>
                    ♙
                  </div>
                  <div>
                    <b style={{ fontSize: '12px', display: 'block' }}>New school added: Bright Future</b>
                    <p style={{ margin: '3px 0', color: '#667578', fontSize: '11px', lineHeight: 1.35 }}>28 learners invited by School Admin.</p>
                    <time style={{ fontSize: '10px', color: '#91a09e' }}>48 minutes ago</time>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '11px', padding: '13px 0', borderBottom: '1px solid #edf1f0', alignItems: 'flex-start' }}>
                  <div style={{ width: '30px', height: '30px', display: 'grid', placeItems: 'center', borderRadius: '50%', background: '#edf6f5', color: '#057b79', fontWeight: 700, flexShrink: 0 }}>
                    ✦
                  </div>
                  <div>
                    <b style={{ fontSize: '12px', display: 'block' }}>AI Tutor safety review passed</b>
                    <p style={{ margin: '3px 0', color: '#667578', fontSize: '11px', lineHeight: 1.35 }}>Swahili response quality: 96.4%.</p>
                    <time style={{ fontSize: '10px', color: '#91a09e' }}>2 hours ago</time>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '11px', padding: '13px 0', alignItems: 'flex-start' }}>
                  <div style={{ width: '30px', height: '30px', display: 'grid', placeItems: 'center', borderRadius: '50%', background: '#edf6f5', color: '#057b79', fontWeight: 700, flexShrink: 0 }}>
                    ◇
                  </div>
                  <div>
                    <b style={{ fontSize: '12px', display: 'block' }}>46 annual plans renewed</b>
                    <p style={{ margin: '3px 0', color: '#667578', fontSize: '11px', lineHeight: 1.35 }}>TZS 7.8M successfully collected.</p>
                    <time style={{ fontSize: '10px', color: '#91a09e' }}>4 hours ago</time>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </main>
        )}
      </div>

      {/* Modal: Create a Platform Item */}
      {isModalOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(9,32,31,.48)',
            zIndex: 50,
            display: 'grid',
            placeItems: 'center',
            padding: '20px'
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            style={{
              background: '#fff',
              borderRadius: '13px',
              width: 'min(490px, 100%)',
              padding: '25px',
              boxShadow: '0 25px 70px rgba(0,0,0,.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '20px', margin: '0 0 7px' }}>
              Create a platform item
            </h2>
            <p style={{ color: '#667578', lineHeight: 1.5, fontSize: '13px', margin: '0 0 15px' }}>
              Add a new course, school, team member or subscription plan.
            </p>

            <form onSubmit={handleCreateItem}>
              <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', margin: '15px 0 6px' }}>
                What would you like to add?
              </label>
              <select 
                value={itemType}
                onChange={(e) => setItemType(e.target.value)}
                style={{ width: '100%', border: '1px solid #dce5e3', borderRadius: '6px', padding: '10px', fontSize: '13px', outline: 0, background: '#fff' }}
              >
                <option value="Course">Course</option>
                <option value="School">School</option>
                <option value="Team member">Team member</option>
                <option value="Subscription plan">Subscription plan</option>
              </select>

              <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', margin: '15px 0 6px' }}>
                Name
              </label>
              <input 
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Enter a name"
                style={{ width: '100%', border: '1px solid #dce5e3', borderRadius: '6px', padding: '10px', fontSize: '13px', outline: 0, boxSizing: 'border-box' }}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '9px', marginTop: '21px' }}>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    background: '#f0f4f3',
                    color: '#40514f',
                    border: 0,
                    borderRadius: '7px',
                    padding: '11px 15px',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={{
                    background: '#057b79',
                    color: '#fff',
                    border: 0,
                    borderRadius: '7px',
                    padding: '11px 15px',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: '0 6px 13px rgba(5,123,121,.19)'
                  }}
                >
                  Create item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
