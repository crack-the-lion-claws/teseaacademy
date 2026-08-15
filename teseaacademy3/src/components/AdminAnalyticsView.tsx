import React, { useState, useEffect } from 'react';
import { fetchDetailedAnalyticsData, DetailedAnalyticsData, RegionStat } from '../lib/learningService';

interface AdminAnalyticsViewProps {
  showToast: (msg: string) => void;
  adminName?: string;
}

export default function AdminAnalyticsView({ showToast }: AdminAnalyticsViewProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'Last 30 days' | 'Last 7 days' | 'This term'>('Last 30 days');
  const [analyticsData, setAnalyticsData] = useState<DetailedAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRegionalModal, setShowRegionalModal] = useState(false);

  const loadData = async (period: 'Last 30 days' | 'Last 7 days' | 'This term') => {
    try {
      setLoading(true);
      const data = await fetchDetailedAnalyticsData(period);
      setAnalyticsData(data);
    } catch (e) {
      console.error('Error fetching analytics:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(selectedPeriod);
  }, [selectedPeriod]);

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as 'Last 30 days' | 'Last 7 days' | 'This term';
    setSelectedPeriod(val);
    showToast(`Analytics refreshed for ${val}.`);
  };

  const handleExportReport = () => {
    if (!analyticsData) return;
    const csvRows = [
      ['TESEA Platform Analytics Report', selectedPeriod],
      ['Generated At', new Date().toISOString()],
      [],
      ['Metric', 'Value'],
      ['Active Learners', analyticsData.activeLearners.toString()],
      ['Learning Hours', analyticsData.learningHours.toString()],
      ['Course Completion %', `${analyticsData.avgCompletionPct}%`],
      ['Assessment Score %', `${analyticsData.assessmentAvgScore}%`],
      ['Total Assessment Attempts', analyticsData.assessmentAttemptsCount.toString()],
      [],
      ['Region', 'Active Learners', 'Learning Minutes', 'Share %'],
      ...analyticsData.learningReach.regions.map(r => [r.name, r.activeLearners.toString(), r.learningMinutes.toString(), `${r.percentage}%`]),
      [],
      ['Course Performance', 'Level', 'Active Learners', 'Completion Rate'],
      ...analyticsData.bestPerformingCourses.map(c => [c.courseTitle, c.level, c.activeLearners.toString(), `${c.completionRate}%`])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.map(x => `"${x}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TESEA_Analytics_${selectedPeriod.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Analytics report exported successfully.');
  };

  const activeLearners = analyticsData ? analyticsData.activeLearners : 0;
  const learningHours = analyticsData ? analyticsData.learningHours : 0;
  const avgCompletionPct = analyticsData ? analyticsData.avgCompletionPct : 0;
  const assessmentAvgScore = analyticsData ? analyticsData.assessmentAvgScore : 0;
  const assessmentAttempts = analyticsData ? analyticsData.assessmentAttemptsCount : 0;

  const weeklyGrowth = analyticsData?.weeklyGrowth || [
    { dateLabel: '1 Jul', sessionsCount: 0, newLearnersCount: 0, sessionHeightPct: 0, learnerHeightPct: 0 },
    { dateLabel: '5 Jul', sessionsCount: 0, newLearnersCount: 0, sessionHeightPct: 0, learnerHeightPct: 0 },
    { dateLabel: '10 Jul', sessionsCount: 0, newLearnersCount: 0, sessionHeightPct: 0, learnerHeightPct: 0 },
    { dateLabel: '15 Jul', sessionsCount: 0, newLearnersCount: 0, sessionHeightPct: 0, learnerHeightPct: 0 },
    { dateLabel: '20 Jul', sessionsCount: 0, newLearnersCount: 0, sessionHeightPct: 0, learnerHeightPct: 0 },
    { dateLabel: '25 Jul', sessionsCount: 0, newLearnersCount: 0, sessionHeightPct: 0, learnerHeightPct: 0 },
    { dateLabel: '30 Jul', sessionsCount: 0, newLearnersCount: 0, sessionHeightPct: 0, learnerHeightPct: 0 }
  ];

  const bestCourses = analyticsData?.bestPerformingCourses || [
    { courseTitle: 'English Language Skills · Form 4', level: 'NECTA Track', activeLearners: 0, completionRate: 0 },
    { courseTitle: 'Advanced Mathematics: Calculus · Form 6', level: 'Advanced Track', activeLearners: 0, completionRate: 0 },
    { courseTitle: 'Biology: Cell & Genetics · Form 4', level: 'NECTA Track', activeLearners: 0, completionRate: 0 }
  ];

  const levelBreakdown = analyticsData?.learnersByLevel.breakdown || [
    { level: 'Form 1–2', count: 0, percentage: 0, color: '#962c4a' },
    { level: 'Form 3–4', count: 0, percentage: 0, color: '#386fb7' },
    { level: 'Form 5–6', count: 0, percentage: 0, color: '#4e9d7d' },
    { level: 'Other', count: 0, percentage: 0, color: '#ddae50' }
  ];

  const donutGradient = analyticsData?.learnersByLevel.gradientStyle || 'conic-gradient(#e3e8ed 0% 100%)';
  const topRegions = analyticsData?.learningReach.topRegions || [];
  const activeRegionsForPins = (analyticsData?.learningReach.regions || []).filter(r => r.active || r.activeLearners > 0);

  const pinColors = ['#962c4a', '#386fb7', '#4e9d7d', '#ddae50', '#7b98b3', '#9768a8'];

  return (
    <div className="main" style={{ maxWidth: '1540px', padding: '33px 43px 55px' }}>
      {/* Intro Section */}
      <section className="intro" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <span className="eye" style={{ fontSize: '10px', letterSpacing: '.12em', color: '#8d97a2', fontWeight: 700 }}>PLATFORM INTELLIGENCE</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '34px', fontWeight: 700, letterSpacing: '-.035em', margin: '5px 0' }}>Analytics</h1>
          <p style={{ fontSize: '12px', color: '#63707d', margin: 0 }}>See how learners, content and curriculum performance are moving across TESEA Academy.</p>
        </div>
        <div className="controls" style={{ display: 'flex', gap: '9px', alignItems: 'center' }}>
          <select 
            value={selectedPeriod} 
            onChange={handlePeriodChange}
            style={{ border: '1px solid #e3e8ed', borderRadius: '7px', background: '#fff', padding: '9px 10px', fontSize: '11px', color: '#536270', outline: 'none' }}
          >
            <option value="Last 30 days">Last 30 days</option>
            <option value="Last 7 days">Last 7 days</option>
            <option value="This term">This term</option>
          </select>
          <button 
            onClick={handleExportReport}
            style={{ border: 0, background: '#962c4a', color: '#fff', borderRadius: '7px', padding: '10px 13px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
          >
            ↓ Export report
          </button>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="metrics" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '25px' }}>
        <article className="metric wine" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '11px', padding: '15px' }}>
          <i style={{ float: 'right', fontStyle: 'normal', width: '30px', height: '30px', background: '#fbf0f3', color: '#962c4a', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>♙</i>
          <small style={{ fontSize: '11px', color: '#63707d', display: 'block' }}>Active learners</small>
          <b style={{ fontSize: '22px', display: 'block', margin: '8px 0 3px' }}>{activeLearners.toLocaleString()}</b>
          <small style={{ fontSize: '11px', color: '#63707d' }}>
            <span style={{ color: '#15956c', fontWeight: 700 }}>{activeLearners > 0 ? '↑ 100%' : '0%'}</span> vs previous period
          </small>
        </article>

        <article className="metric" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '11px', padding: '15px' }}>
          <i style={{ float: 'right', fontStyle: 'normal', width: '30px', height: '30px', background: '#f1f5f7', color: '#5b738b', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>◷</i>
          <small style={{ fontSize: '11px', color: '#63707d', display: 'block' }}>Learning hours</small>
          <b style={{ fontSize: '22px', display: 'block', margin: '8px 0 3px' }}>{learningHours.toLocaleString()}</b>
          <small style={{ fontSize: '11px', color: '#63707d' }}>
            <span style={{ color: '#15956c', fontWeight: 700 }}>{learningHours > 0 ? '↑ 100%' : '0%'}</span> this period
          </small>
        </article>

        <article className="metric" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '11px', padding: '15px' }}>
          <i style={{ float: 'right', fontStyle: 'normal', width: '30px', height: '30px', background: '#f1f5f7', color: '#5b738b', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>◎</i>
          <small style={{ fontSize: '11px', color: '#63707d', display: 'block' }}>Course completion</small>
          <b style={{ fontSize: '22px', display: 'block', margin: '8px 0 3px' }}>{avgCompletionPct}%</b>
          <small style={{ fontSize: '11px', color: '#63707d' }}>
            <span style={{ color: '#15956c', fontWeight: 700 }}>{avgCompletionPct > 0 ? '↑ 100%' : '0%'}</span> achievement rate
          </small>
        </article>

        <article className="metric" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '11px', padding: '15px' }}>
          <i style={{ float: 'right', fontStyle: 'normal', width: '30px', height: '30px', background: '#f1f5f7', color: '#5b738b', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>✓</i>
          <small style={{ fontSize: '11px', color: '#63707d', display: 'block' }}>Assessment score</small>
          <b style={{ fontSize: '22px', display: 'block', margin: '8px 0 3px' }}>{assessmentAvgScore}%</b>
          <small style={{ fontSize: '11px', color: '#63707d' }}>Across {assessmentAttempts.toLocaleString()} attempts</small>
        </article>
      </section>

      {/* Main Grid */}
      <section className="grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.86fr', gap: '22px' }}>
        <div>
          {/* Growth and Engagement Dual-bar Chart */}
          <article className="card" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '12px', padding: '19px' }}>
            <div className="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Learner growth & engagement</h2>
                <p style={{ fontSize: '11px', color: '#63707d', margin: '4px 0 0' }}>New learners and completed learning sessions</p>
              </div>
              <div className="legend" style={{ display: 'flex', gap: '12px', fontSize: '10px', color: '#77838d', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <i style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#962c4a', marginRight: '4px' }}></i>
                  Sessions
                </span>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <i style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#dfb9c5', marginRight: '4px' }}></i>
                  New learners
                </span>
              </div>
            </div>

            <div style={{ height: '205px', display: 'flex', alignItems: 'flex-end', gap: '10px', background: 'repeating-linear-gradient(to bottom, transparent 0, transparent 50px, #eef1f4 51px)', padding: '0 5px', borderBottom: '1px solid #e3e8ed' }}>
              {weeklyGrowth.map((bar, i) => (
                <div key={i} style={{ height: '100%', flex: 1, display: 'flex', gap: '3px', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <i 
                    title={`${bar.sessionsCount} sessions`}
                    style={{ 
                      display: 'block', 
                      width: '45%', 
                      background: '#dfbdc7', 
                      borderRadius: '5px 5px 0 0', 
                      height: bar.sessionHeightPct > 0 ? `${bar.sessionHeightPct}%` : '4px',
                      transition: 'height 0.3s ease'
                    }}
                  ></i>
                  <i 
                    title={`${bar.newLearnersCount} new learners`}
                    style={{ 
                      display: 'block', 
                      width: '45%', 
                      background: '#962c4a', 
                      borderRadius: '5px 5px 0 0', 
                      height: bar.learnerHeightPct > 0 ? `${bar.learnerHeightPct}%` : '4px',
                      transition: 'height 0.3s ease'
                    }}
                  ></i>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#929ba5', fontSize: '10px', padding: '8px 5px' }}>
              {weeklyGrowth.map((bar, i) => (
                <span key={i}>{bar.dateLabel}</span>
              ))}
            </div>
          </article>

          {/* Key Insight Card */}
          <article className="card insight" style={{ marginTop: '22px', background: 'linear-gradient(135deg, #341521, #6c1b38)', color: '#fff', border: 0, borderRadius: '12px', padding: '19px' }}>
            <h2 style={{ fontSize: '16px', margin: '0 0 8px', fontWeight: 700 }}>{analyticsData?.keyInsight.title || 'Key insight'}</h2>
            <p style={{ fontSize: '11px', lineHeight: 1.6, color: '#f0d6dd', margin: '0 0 12px' }}>
              {analyticsData?.keyInsight.text || 'Platform analytics initialized. Real-time study velocity, subject completion rates, and regional learner distribution will update automatically as students engage.'}
            </p>
            <button 
              onClick={() => showToast('Insight saved to your report.')}
              style={{ border: 0, background: '#fff', color: '#962c4a', borderRadius: '6px', padding: '8px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
            >
              Save insight
            </button>
          </article>

          {/* Best Performing Courses Card */}
          <article className="card" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '12px', padding: '19px', marginTop: '22px' }}>
            <div className="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Best-performing courses</h2>
                <p style={{ fontSize: '11px', color: '#63707d', margin: '4px 0 0' }}>Highest completion rate this period</p>
              </div>
              <button 
                onClick={() => showToast('Course performance report opened.')}
                className="link" 
                style={{ border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                View report
              </button>
            </div>

            {bestCourses.map((course, idx) => (
              <div 
                key={idx}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  padding: '11px 0', 
                  borderBottom: idx < bestCourses.length - 1 ? '1px solid #edf0f3' : 'none' 
                }}
              >
                <span style={{ color: '#8b97a1', fontSize: '11px', width: '15px', fontWeight: 700 }}>0{idx + 1}</span>
                <span>
                  <b style={{ fontSize: '11px', display: 'block', color: '#17222e' }}>{course.courseTitle}</b>
                  <small style={{ fontSize: '10px', color: '#8d97a2', display: 'block', marginTop: '3px' }}>
                    {course.activeLearners.toLocaleString()} active learners
                  </small>
                </span>
                <span style={{ marginLeft: 'auto', color: '#962c4a', fontSize: '12px', fontWeight: 700 }}>
                  {course.completionRate}%
                </span>
              </div>
            ))}
          </article>
        </div>

        <aside>
          {/* Learners by level Donut Chart */}
          <article className="card" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '12px', padding: '19px' }}>
            <div className="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Learners by level</h2>
                <p style={{ fontSize: '11px', color: '#63707d', margin: '4px 0 0' }}>Active learners in current period</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '21px' }}>
              <div 
                style={{
                  width: '130px',
                  height: '130px',
                  borderRadius: '50%',
                  background: donutGradient,
                  position: 'relative',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0
                }}
              >
                <div 
                  style={{
                    position: 'absolute',
                    inset: '20px',
                    background: '#fff',
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: 700,
                    lineHeight: 1.45
                  }}
                >
                  <div>
                    {activeLearners.toLocaleString()}
                    <small style={{ display: 'block', fontSize: '10px', color: '#8d97a2', fontWeight: 400 }}>learners</small>
                  </div>
                </div>
              </div>

              <div style={{ flex: 1 }}>
                {levelBreakdown.map((item, i) => (
                  <div 
                    key={i}
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      borderBottom: i < levelBreakdown.length - 1 ? '1px solid #eef1f4' : 'none', 
                      padding: '8px 0', 
                      fontSize: '11px', 
                      alignItems: 'center' 
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                      <i style={{ width: '7px', height: '7px', borderRadius: '50%', background: item.color, display: 'inline-block' }}></i>
                      {item.level}
                    </span>
                    <b>{item.count.toLocaleString()}</b>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Learning Reach Card */}
          <article className="card" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '12px', padding: '19px', marginTop: '22px' }}>
            <div className="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Learning reach</h2>
                <p style={{ fontSize: '11px', color: '#63707d', margin: '4px 0 0' }}>Leading learner locations across Tanzania</p>
              </div>
              <button 
                onClick={() => setShowRegionalModal(true)}
                className="link" 
                style={{ border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                Details
              </button>
            </div>

            <div 
              style={{
                height: '155px',
                background: 'linear-gradient(135deg, #f1f4f6, #eef3f5)',
                borderRadius: '9px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10px'
              }}
            >
              <div style={{ letterSpacing: '.25em', color: '#cbd3d8', fontWeight: 700, fontSize: '20px', transform: 'rotate(-9deg)', userSelect: 'none' }}>
                TANZANIA
              </div>

              {/* Dynamic Location Map Pins */}
              {activeRegionsForPins.length > 0 ? (
                activeRegionsForPins.map((reg, idx) => (
                  <i 
                    key={reg.code}
                    title={`${reg.name}: ${reg.activeLearners} learners (${reg.percentage}%)`}
                    style={{ 
                      position: 'absolute', 
                      width: '11px', 
                      height: '11px', 
                      borderRadius: '50%', 
                      background: pinColors[idx % pinColors.length], 
                      boxShadow: `0 0 0 5px ${pinColors[idx % pinColors.length]}22`, 
                      left: reg.pinLeft, 
                      top: reg.pinTop,
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease'
                    }}
                  ></i>
                ))
              ) : (
                <>
                  <i 
                    title="Arusha"
                    style={{ position: 'absolute', width: '11px', height: '11px', borderRadius: '50%', background: '#962c4a', boxShadow: '0 0 0 5px rgba(150,44,74,.12)', left: '58%', top: '34%' }}
                  ></i>
                  <i 
                    title="Dodoma"
                    style={{ position: 'absolute', width: '11px', height: '11px', borderRadius: '50%', background: '#386fb7', boxShadow: '0 0 0 5px rgba(56,111,183,.12)', left: '47%', top: '49%' }}
                  ></i>
                  <i 
                    title="Dar es Salaam"
                    style={{ position: 'absolute', width: '11px', height: '11px', borderRadius: '50%', background: '#4e9d7d', boxShadow: '0 0 0 5px rgba(78,157,125,.12)', left: '66%', top: '59%' }}
                  ></i>
                </>
              )}
            </div>

            {topRegions.length > 0 ? (
              topRegions.map((reg, idx) => (
                <div 
                  key={reg.code}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    padding: '11px 0', 
                    borderBottom: idx < topRegions.length - 1 ? '1px solid #edf0f3' : 'none' 
                  }}
                >
                  <span style={{ color: '#8b97a1', fontSize: '11px', width: '15px', fontWeight: 700 }}>0{idx + 1}</span>
                  <span>
                    <b style={{ fontSize: '11px', display: 'block', color: '#17222e' }}>{reg.name}</b>
                    <small style={{ fontSize: '10px', color: '#8d97a2', display: 'block', marginTop: '3px' }}>
                      {reg.activeLearners.toLocaleString()} active learner{reg.activeLearners !== 1 ? 's' : ''}
                    </small>
                  </span>
                  <span style={{ marginLeft: 'auto', color: '#962c4a', fontSize: '12px', fontWeight: 700 }}>
                    {reg.percentage}%
                  </span>
                </div>
              ))
            ) : (
              <div style={{ padding: '16px 0', textAlign: 'center', color: '#8d97a2', fontSize: '11px' }}>
                No regional learner data yet.
              </div>
            )}
          </article>
        </aside>
      </section>

      {/* Regional Location Intelligence Modal */}
      {showRegionalModal && analyticsData && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,33,0.5)', zIndex: 50, padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setShowRegionalModal(false)}
        >
          <div 
            style={{ width: 'min(700px, 100%)', maxHeight: '85vh', background: '#fff', borderRadius: '15px', padding: '25px', boxShadow: '0 28px 70px rgba(10,16,24,.24)', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div>
                <span style={{ fontSize: '10px', letterSpacing: '.12em', color: '#8d97a2', fontWeight: 700 }}>REGIONAL DEMOGRAPHICS</span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, margin: '5px 0' }}>Tanzania Regional Intelligence</h2>
                <p style={{ fontSize: '12px', color: '#63707d', margin: 0 }}>Learner distribution and active study time across all 31 regions.</p>
              </div>
              <button 
                onClick={() => setShowRegionalModal(false)} 
                style={{ border: 0, background: 'none', color: '#85909a', fontSize: '22px', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '15px' }}>
              {analyticsData.learningReach.regions.map((reg, idx) => (
                <div 
                  key={reg.code}
                  style={{ 
                    background: reg.activeLearners > 0 ? '#fdf8f9' : '#f9fafb', 
                    border: reg.activeLearners > 0 ? '1px solid #f3d7e0' : '1px solid #edf0f3',
                    borderRadius: '8px', 
                    padding: '12px' 
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <b style={{ fontSize: '12px', color: '#17222e' }}>{reg.name}</b>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: reg.activeLearners > 0 ? '#962c4a' : '#8d97a2' }}>
                      {reg.percentage}%
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#63707d' }}>
                    {reg.activeLearners} active learner{reg.activeLearners !== 1 ? 's' : ''}
                  </div>
                  {reg.learningMinutes > 0 && (
                    <div style={{ fontSize: '10px', color: '#8d97a2', marginTop: '2px' }}>
                      {reg.learningMinutes} mins studied
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button 
                onClick={() => setShowRegionalModal(false)}
                style={{ border: 0, background: '#962c4a', color: '#fff', borderRadius: '7px', padding: '10px 18px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
