import React, { useState, useEffect } from 'react';
import { 
  AssessmentItem, 
  fetchAssessments, 
  saveAssessment, 
  updateAssessmentStatus 
} from '../lib/learningService';

interface AdminAssessmentsViewProps {
  showToast: (msg: string) => void;
  adminName?: string;
}

export default function AdminAssessmentsView({ showToast, adminName = 'Administrator' }: AdminAssessmentsViewProps) {
  const [assessments, setAssessments] = useState<AssessmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'All' | 'Published' | 'Drafts' | 'Scheduled'>('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'Quiz' | 'Test' | 'Mock exam'>('Quiz');
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Mathematics · Form 4');
  const [newQuestionSource, setNewQuestionSource] = useState('Build with question bank');

  const loadData = async () => {
    try {
      const list = await fetchAssessments();
      setAssessments(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered by Tab
  const filteredAssessments = assessments.filter(item => {
    if (activeTab === 'Published') return item.status === 'Published';
    if (activeTab === 'Drafts') return item.status === 'Draft' || item.status === 'In review';
    if (activeTab === 'Scheduled') return item.status === 'Scheduled';
    return true;
  });

  // Calculate Real-Time Metrics
  const publishedAssessments = assessments.filter(a => a.status === 'Published');
  const activeCount = publishedAssessments.length;
  
  // Total attempts from active assessments
  const totalAttempts = assessments.reduce((acc, a) => acc + (a.attempts || 0), 0);
  
  // Average Score across scored assessments
  const scoredList = assessments.filter(a => typeof a.avgScore === 'number' && a.avgScore > 0);
  const averageScore = scoredList.length > 0
    ? Math.round(scoredList.reduce((acc, a) => acc + (a.avgScore || 0), 0) / scoredList.length)
    : 0;

  // Moderation queue (In review items)
  const moderationQueueItems = assessments.filter(a => a.status === 'In review');
  const moderationQueueCount = moderationQueueItems.length;

  // Handle Assessment Creation
  const handleCreateAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    const titleToUse = newTitle.trim() || 'Untitled assessment';
    
    try {
      const created = await saveAssessment({
        title: titleToUse,
        subject: newSubject,
        questionsCount: selectedType === 'Quiz' ? 15 : selectedType === 'Test' ? 30 : 50,
        type: selectedType,
        attempts: 0,
        avgScore: null,
        status: 'Draft',
        questionSource: newQuestionSource
      });

      setAssessments([created, ...assessments]);
      setIsModalOpen(false);
      setNewTitle('');
      showToast(`${selectedType} “${titleToUse}” created as a draft.`);
      await loadData();
    } catch (err) {
      showToast('Failed to create assessment.');
    }
  };

  return (
    <div className="main" style={{ maxWidth: '1540px', padding: '33px 43px 55px' }}>
      <section className="intro" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '25px' }}>
        <div>
          <span className="eye" style={{ fontSize: '10px', letterSpacing: '.12em', color: '#8d97a2', fontWeight: 700 }}>ASSESSMENT OPERATIONS</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '34px', fontWeight: 700, letterSpacing: '-.035em', margin: '5px 0' }}>Assessments</h1>
          <p style={{ fontSize: '12px', color: '#63707d', margin: 0 }}>Create, moderate and monitor learning checks across the TESEA Academy curriculum.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="primary" 
          style={{ border: 0, background: '#962c4a', color: '#fff', borderRadius: '7px', padding: '11px 15px', fontSize: '12px', fontWeight: 700, boxShadow: '0 8px 18px rgba(150,44,74,.18)', cursor: 'pointer' }}
        >
          ＋ Create assessment
        </button>
      </section>

      {/* Metric Cards */}
      <section className="metrics" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '25px' }}>
        <article className="metric wine" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '11px', padding: '15px' }}>
          <i style={{ float: 'right', fontStyle: 'normal', width: '30px', height: '30px', background: '#fbf0f3', color: '#962c4a', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>✓</i>
          <small style={{ fontSize: '11px', color: '#63707d', display: 'block' }}>Active assessments</small>
          <b style={{ fontSize: '22px', display: 'block', margin: '8px 0 3px' }}>{activeCount}</b>
          <small style={{ fontSize: '11px', color: '#63707d' }}>
            <span style={{ color: '#15956c', fontWeight: 700 }}>{activeCount > 0 ? `↑ ${activeCount}` : '0'}</span> published in system
          </small>
        </article>

        <article className="metric" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '11px', padding: '15px' }}>
          <i style={{ float: 'right', fontStyle: 'normal', width: '30px', height: '30px', background: '#f1f5f7', color: '#5b738b', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>◷</i>
          <small style={{ fontSize: '11px', color: '#63707d', display: 'block' }}>Attempts this month</small>
          <b style={{ fontSize: '22px', display: 'block', margin: '8px 0 3px' }}>{totalAttempts.toLocaleString()}</b>
          <small style={{ fontSize: '11px', color: '#63707d' }}>
            <span style={{ color: '#15956c', fontWeight: 700 }}>Live</span> student submissions
          </small>
        </article>

        <article className="metric" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '11px', padding: '15px' }}>
          <i style={{ float: 'right', fontStyle: 'normal', width: '30px', height: '30px', background: '#f1f5f7', color: '#5b738b', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>◎</i>
          <small style={{ fontSize: '11px', color: '#63707d', display: 'block' }}>Average score</small>
          <b style={{ fontSize: '22px', display: 'block', margin: '8px 0 3px' }}>{averageScore > 0 ? `${averageScore}%` : '—'}</b>
          <small style={{ fontSize: '11px', color: '#63707d' }}>Across all graded attempts</small>
        </article>

        <article className="metric" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '11px', padding: '15px' }}>
          <i style={{ float: 'right', fontStyle: 'normal', width: '30px', height: '30px', background: '#f1f5f7', color: '#5b738b', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>!</i>
          <small style={{ fontSize: '11px', color: '#63707d', display: 'block' }}>Moderation queue</small>
          <b style={{ fontSize: '22px', display: 'block', margin: '8px 0 3px' }}>{moderationQueueCount}</b>
          <small style={{ fontSize: '11px', color: '#63707d' }}>Items awaiting review</small>
        </article>
      </section>

      {/* Main Grid: Library & Queues */}
      <section className="grid" style={{ display: 'grid', gridTemplateColumns: '1.45fr 0.85fr', gap: '22px' }}>
        <div>
          {/* Assessment Library Card */}
          <article className="card" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '12px', padding: '19px' }}>
            <div className="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Assessment library</h2>
                <p style={{ fontSize: '11px', color: '#63707d', margin: '4px 0 0' }}>Recently updated quizzes, tests and mock examinations</p>
              </div>
              <button 
                onClick={() => { setActiveTab('All'); showToast(`Showing all ${assessments.length} assessments.`); }}
                className="link" 
                style={{ border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                View all
              </button>
            </div>

            <div className="tabs" style={{ display: 'flex', gap: '14px', borderBottom: '1px solid #e3e8ed', marginBottom: '8px' }}>
              {(['All', 'Published', 'Drafts', 'Scheduled'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  style={{
                    border: 0,
                    background: 'none',
                    padding: '9px 1px',
                    color: activeTab === tab ? '#962c4a' : '#73808c',
                    fontSize: '11px',
                    fontWeight: 700,
                    borderBottom: activeTab === tab ? '2px solid #962c4a' : '2px solid transparent',
                    cursor: 'pointer'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', fontSize: '9px', letterSpacing: '.09em', color: '#8b96a0', padding: '9px 8px', borderBottom: '1px solid #e3e8ed' }}>ASSESSMENT</th>
                    <th style={{ textAlign: 'left', fontSize: '9px', letterSpacing: '.09em', color: '#8b96a0', padding: '9px 8px', borderBottom: '1px solid #e3e8ed' }}>TYPE</th>
                    <th style={{ textAlign: 'left', fontSize: '9px', letterSpacing: '.09em', color: '#8b96a0', padding: '9px 8px', borderBottom: '1px solid #e3e8ed' }}>ATTEMPTS</th>
                    <th style={{ textAlign: 'left', fontSize: '9px', letterSpacing: '.09em', color: '#8b96a0', padding: '9px 8px', borderBottom: '1px solid #e3e8ed' }}>AVG. SCORE</th>
                    <th style={{ textAlign: 'left', fontSize: '9px', letterSpacing: '.09em', color: '#8b96a0', padding: '9px 8px', borderBottom: '1px solid #e3e8ed' }}>STATUS</th>
                    <th style={{ borderBottom: '1px solid #e3e8ed' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssessments.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: '30px 8px', textAlign: 'center', color: '#909aa5', fontSize: '12px' }}>
                        {loading ? 'Loading assessments...' : 'No assessments found in this view. Click "＋ Create assessment" to add one.'}
                      </td>
                    </tr>
                  ) : (
                    filteredAssessments.map((item) => (
                      <tr key={item.id}>
                        <td style={{ padding: '12px 8px', borderBottom: '1px solid #eef1f4' }}>
                          <b style={{ color: '#17222e', fontSize: '12px', display: 'block' }}>{item.title}</b>
                          <small style={{ fontSize: '10px', color: '#8d97a2' }}>{item.subject} · {item.questionsCount} questions</small>
                        </td>
                        <td style={{ padding: '12px 8px', borderBottom: '1px solid #eef1f4', color: '#52606e', fontSize: '11px' }}>
                          {item.type}
                        </td>
                        <td style={{ padding: '12px 8px', borderBottom: '1px solid #eef1f4', color: '#52606e', fontSize: '11px' }}>
                          {item.attempts > 0 ? item.attempts.toLocaleString() : '—'}
                        </td>
                        <td style={{ padding: '12px 8px', borderBottom: '1px solid #eef1f4', color: '#52606e', fontSize: '11px' }}>
                          {item.avgScore !== null && item.avgScore > 0 ? `${item.avgScore}%` : '—'}
                        </td>
                        <td style={{ padding: '12px 8px', borderBottom: '1px solid #eef1f4' }}>
                          <button
                            onClick={async () => {
                              const nextStatus = item.status === 'Draft' ? 'In review' : item.status === 'In review' ? 'Published' : 'Draft';
                              await updateAssessmentStatus(item.id, nextStatus, adminName);
                              showToast(`Assessment marked as ${nextStatus}.`);
                              await loadData();
                            }}
                            title="Click to cycle status"
                            style={{
                              display: 'inline-block',
                              borderRadius: '12px',
                              padding: '4px 7px',
                              fontSize: '9px',
                              fontWeight: 700,
                              border: 0,
                              cursor: 'pointer',
                              background: item.status === 'Published' ? '#eaf8f3' : item.status === 'In review' ? '#fff5e4' : '#edf1f5',
                              color: item.status === 'Published' ? '#107e5d' : item.status === 'In review' ? '#a16905' : '#667586'
                            }}
                          >
                            {item.status}
                          </button>
                        </td>
                        <td style={{ padding: '12px 8px', borderBottom: '1px solid #eef1f4', textAlign: 'right' }}>
                          <button 
                            onClick={async () => {
                              const nextStatus = item.status === 'Published' ? 'Draft' : 'Published';
                              await updateAssessmentStatus(item.id, nextStatus, adminName);
                              showToast(`"${item.title}" ${nextStatus === 'Published' ? 'published' : 'moved to drafts'}.`);
                              await loadData();
                            }}
                            className="more" 
                            title="Quick toggle publish/draft"
                            style={{ border: 0, background: 'none', fontSize: '16px', color: '#87929c', cursor: 'pointer' }}
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

          {/* Question Bank Card */}
          <article className="card moderate" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '12px', padding: '19px', marginTop: '22px' }}>
            <div className="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Question bank</h2>
                <p style={{ fontSize: '11px', color: '#63707d', margin: '4px 0 0' }}>Build stronger assessments from reusable questions</p>
              </div>
              <button 
                onClick={() => showToast('Question bank repository opened.')}
                className="link" 
                style={{ border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                Open bank
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid #edf0f3' }}>
              <span style={{ width: '29px', height: '29px', borderRadius: '7px', background: '#fbf0f3', color: '#962c4a', display: 'grid', placeItems: 'center', fontSize: '13px', fontWeight: 700 }}>?</span>
              <span>
                <b style={{ fontSize: '11px', display: 'block' }}>Mathematics</b>
                <small style={{ display: 'block', color: '#63707d', fontSize: '10px', marginTop: '3px' }}>Form 1 – 6 Curriculum & NECTA Banks</small>
              </span>
              <button 
                onClick={() => showToast('Mathematics question bank loaded.')}
                style={{ marginLeft: 'auto', background: 'none', border: 0, color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                Browse
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid #edf0f3' }}>
              <span style={{ width: '29px', height: '29px', borderRadius: '7px', background: '#fbf0f3', color: '#962c4a', display: 'grid', placeItems: 'center', fontSize: '13px', fontWeight: 700 }}>?</span>
              <span>
                <b style={{ fontSize: '11px', display: 'block' }}>Sciences</b>
                <small style={{ display: 'block', color: '#63707d', fontSize: '10px', marginTop: '3px' }}>Physics, Chemistry, Biology Modules</small>
              </span>
              <button 
                onClick={() => showToast('Sciences question bank loaded.')}
                style={{ marginLeft: 'auto', background: 'none', border: 0, color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                Browse
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0' }}>
              <span style={{ width: '29px', height: '29px', borderRadius: '7px', background: '#fbf0f3', color: '#962c4a', display: 'grid', placeItems: 'center', fontSize: '13px', fontWeight: 700 }}>?</span>
              <span>
                <b style={{ fontSize: '11px', display: 'block' }}>Languages & Humanities</b>
                <small style={{ display: 'block', color: '#63707d', fontSize: '10px', marginTop: '3px' }}>English, Geography, History Sets</small>
              </span>
              <button 
                onClick={() => showToast('Languages & Humanities question bank loaded.')}
                style={{ marginLeft: 'auto', background: 'none', border: 0, color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                Browse
              </button>
            </div>
          </article>
        </div>

        <aside>
          {/* Performance Trend Card */}
          <article className="card" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '12px', padding: '19px' }}>
            <div className="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Performance trend</h2>
                <p style={{ fontSize: '11px', color: '#63707d', margin: '4px 0 0' }}>Average learner score across recent assessments</p>
              </div>
              <button 
                onClick={() => showToast('Performance analytics opened.')}
                className="link" 
                style={{ border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                Analytics
              </button>
            </div>

            <div className="chart" style={{ height: '170px', display: 'flex', alignItems: 'flex-end', gap: '12px', background: 'repeating-linear-gradient(to bottom, transparent 0, transparent 42px, #eef1f4 43px)', padding: '0 5px', borderBottom: '1px solid #e3e8ed' }}>
              {[
                { label: 'T1', height: averageScore > 0 ? `${Math.max(averageScore - 15, 20)}%` : '46%' },
                { label: 'T2', height: averageScore > 0 ? `${Math.max(averageScore - 8, 30)}%` : '57%' },
                { label: 'T3', height: averageScore > 0 ? `${Math.max(averageScore - 12, 25)}%` : '51%' },
                { label: 'T4', height: averageScore > 0 ? `${Math.min(averageScore + 5, 95)}%` : '69%' },
                { label: 'T5', height: averageScore > 0 ? `${Math.max(averageScore - 2, 40)}%` : '62%' },
                { label: 'T6', height: averageScore > 0 ? `${Math.min(averageScore + 8, 98)}%` : '78%' }
              ].map((bar, bIdx) => (
                <div key={bIdx} style={{ flex: 1, display: 'flex', height: '100%', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <i style={{ display: 'block', width: '24px', background: '#962c4a', borderRadius: '5px 5px 0 0', height: bar.height }}></i>
                </div>
              ))}
            </div>
            <div className="labels" style={{ display: 'flex', justifyContent: 'space-between', color: '#929ba5', fontSize: '10px', padding: '8px 5px' }}>
              <span>Test 1</span>
              <span>T2</span>
              <span>T3</span>
              <span>T4</span>
              <span>T5</span>
              <span>T6</span>
            </div>
          </article>

          {/* Moderation Queue Card */}
          <article className="card moderate" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '12px', padding: '19px', marginTop: '22px' }}>
            <div className="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Moderation queue</h2>
                <p style={{ fontSize: '11px', color: '#63707d', margin: '4px 0 0' }}>Assessments requiring action</p>
              </div>
              <button 
                onClick={() => { setActiveTab('Drafts'); showToast(`Showing ${moderationQueueCount} items needing moderation.`); }}
                className="link" 
                style={{ border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                View all
              </button>
            </div>

            <div className="queue" style={{ display: 'flex', gap: '10px', padding: '11px', borderRadius: '8px', background: '#fbfcfd', border: '1px solid #edf0f3', marginTop: '9px', alignItems: 'center' }}>
              <span style={{ width: '31px', height: '31px', background: '#fff2da', color: '#a76b08', borderRadius: '7px', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 700 }}>
                {String(moderationQueueCount).padStart(2, '0')}
              </span>
              <span>
                <b style={{ fontSize: '11px', display: 'block' }}>Content accuracy review</b>
                <small style={{ display: 'block', fontSize: '10px', color: '#8d97a2', marginTop: '3px' }}>Subject approval needed</small>
              </span>
              <button 
                onClick={() => { setActiveTab('Drafts'); showToast('Review queue selected.'); }}
                style={{ marginLeft: 'auto', border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                Review
              </button>
            </div>

            <div className="queue" style={{ display: 'flex', gap: '10px', padding: '11px', borderRadius: '8px', background: '#fbfcfd', border: '1px solid #edf0f3', marginTop: '9px', alignItems: 'center' }}>
              <span style={{ width: '31px', height: '31px', background: '#fff2da', color: '#a76b08', borderRadius: '7px', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 700 }}>
                {String(Math.max(0, assessments.filter(a => a.status === 'Draft').length)).padStart(2, '0')}
              </span>
              <span>
                <b style={{ fontSize: '11px', display: 'block' }}>Marking scheme review</b>
                <small style={{ display: 'block', fontSize: '10px', color: '#8d97a2', marginTop: '3px' }}>Rubrics need final verification</small>
              </span>
              <button 
                onClick={() => { setActiveTab('Drafts'); showToast('Marking review selected.'); }}
                style={{ marginLeft: 'auto', border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                Review
              </button>
            </div>

            <div className="queue" style={{ display: 'flex', gap: '10px', padding: '11px', borderRadius: '8px', background: '#fbfcfd', border: '1px solid #edf0f3', marginTop: '9px', alignItems: 'center' }}>
              <span style={{ width: '31px', height: '31px', background: '#fff2da', color: '#a76b08', borderRadius: '7px', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 700 }}>
                01
              </span>
              <span>
                <b style={{ fontSize: '11px', display: 'block' }}>Quality checks</b>
                <small style={{ display: 'block', fontSize: '10px', color: '#8d97a2', marginTop: '3px' }}>Formatting and accessibility checks</small>
              </span>
              <button 
                onClick={() => showToast('Quality checks passed.')}
                style={{ marginLeft: 'auto', border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                Review
              </button>
            </div>
          </article>
        </aside>
      </section>

      {/* Modal: Create Assessment */}
      {isModalOpen && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,33,0.5)', zIndex: 50, padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            style={{ width: 'min(620px, 100%)', background: '#fff', borderRadius: '15px', padding: '25px', boxShadow: '0 28px 70px rgba(10,16,24,.24)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '10px', letterSpacing: '.12em', color: '#8d97a2', fontWeight: 700 }}>ASSESSMENT BUILDER</span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, margin: '5px 0' }}>Create an assessment</h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                style={{ border: 0, background: 'none', color: '#85909a', fontSize: '22px', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>
            <p style={{ fontSize: '12px', color: '#63707d', margin: 0 }}>Choose an assessment type and define its learning context.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', margin: '19px 0' }}>
              {(['Quiz', 'Test', 'Mock exam'] as const).map(type => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setSelectedType(type)}
                  style={{
                    border: `1px solid ${selectedType === type ? '#d8a6b5' : '#e3e8ed'}`,
                    background: selectedType === type ? '#fbf0f3' : '#fff',
                    borderRadius: '8px',
                    padding: '12px',
                    textAlign: 'center',
                    color: selectedType === type ? '#962c4a' : '#65717e',
                    fontSize: '11px',
                    fontWeight: selectedType === type ? 700 : 500,
                    cursor: 'pointer'
                  }}
                >
                  <i style={{ display: 'block', fontStyle: 'normal', fontSize: '18px', marginBottom: '5px' }}>
                    {type === 'Quiz' ? '✓' : type === 'Test' ? '◷' : '▤'}
                  </i>
                  {type}
                </button>
              ))}
            </div>

            <form onSubmit={handleCreateAssessment}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '11px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', color: '#6b7782', fontSize: '9px', letterSpacing: '.07em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>Assessment title</label>
                  <input 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Algebra: Functions Quiz"
                    style={{ width: '100%', border: '1px solid #e3e8ed', borderRadius: '7px', padding: '10px', fontSize: '12px', outline: 0, boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#6b7782', fontSize: '9px', letterSpacing: '.07em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>Subject & level</label>
                  <select 
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    style={{ width: '100%', border: '1px solid #e3e8ed', borderRadius: '7px', padding: '10px', fontSize: '12px', outline: 0, background: '#fff' }}
                  >
                    <option>Mathematics · Form 4</option>
                    <option>Physics · Form 5</option>
                    <option>Biology · Form 4</option>
                    <option>Chemistry · Form 6</option>
                    <option>English · Form 4</option>
                    <option>Business Studies · Form 5</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', color: '#6b7782', fontSize: '9px', letterSpacing: '.07em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>Question source</label>
                  <select 
                    value={newQuestionSource}
                    onChange={(e) => setNewQuestionSource(e.target.value)}
                    style={{ width: '100%', border: '1px solid #e3e8ed', borderRadius: '7px', padding: '10px', fontSize: '12px', outline: 0, background: '#fff' }}
                  >
                    <option>Build with question bank</option>
                    <option>Write questions manually</option>
                    <option>Import questions</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '9px', marginTop: '19px' }}>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ border: 0, background: 'none', color: '#667381', fontSize: '12px', fontWeight: 700, padding: '10px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={{ border: 0, background: '#962c4a', color: '#fff', borderRadius: '7px', padding: '11px 15px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Start building
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
