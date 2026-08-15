import React, { useState, useEffect } from 'react';
import { LearnerItem, fetchLearners, saveLearner, TANZANIA_REGIONS } from '../lib/learningService';

interface AdminLearnersViewProps {
  showToast: (msg: string) => void;
  adminName?: string;
}

export default function AdminLearnersView({ showToast }: AdminLearnersViewProps) {
  const [learners, setLearners] = useState<LearnerItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Search and Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [formFilter, setFormFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedForm, setSelectedForm] = useState('Form 5');
  const [selectedRegion, setSelectedRegion] = useState('Dar es Salaam');
  const [enrollmentMethod, setEnrollmentMethod] = useState('Send invitation email');

  const loadData = async () => {
    try {
      const list = await fetchLearners();
      setLearners(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddLearner = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim() || 'New Learner';
    const emailToUse = email.trim() || `learner.${Date.now()}@tesea.ac.tz`;

    try {
      const created = await saveLearner({
        name: fullName,
        email: emailToUse,
        school: 'TESEA Academy Partner School',
        region: selectedRegion || 'Dar es Salaam',
        form: selectedForm,
        learningPath: `Comprehensive Curriculum · ${selectedForm}`,
        progress: 0,
        lastActive: 'Just now',
        risk: 'On track'
      });

      setLearners([created, ...learners]);
      setIsModalOpen(false);
      setFirstName('');
      setLastName('');
      setEmail('');
      showToast(`Invitation prepared for ${fullName} in ${selectedRegion}.`);
      await loadData();
    } catch (err) {
      showToast('Failed to add learner.');
    }
  };

  const filteredLearners = learners.filter(item => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || item.name.toLowerCase().includes(q) || item.email.toLowerCase().includes(q) || item.school.toLowerCase().includes(q);
    const matchesForm = !formFilter || item.form === formFilter;
    const matchesRisk = !riskFilter || item.risk === riskFilter;
    return matchesSearch && matchesForm && matchesRisk;
  });

  // Calculate Metrics
  const activeCount = learners.length;
  const atRiskCount = learners.filter(l => l.risk === 'At risk' || l.risk === 'Watch').length;

  const photoColors = ['#7b98b3', '#bb7284', '#548a70', '#9768a8', '#3473bf', '#bd7f0f'];

  return (
    <div className="main" style={{ maxWidth: '1540px', padding: '33px 43px 55px' }}>
      <section className="intro" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '25px' }}>
        <div>
          <span className="eye" style={{ fontSize: '10px', letterSpacing: '.12em', color: '#8d97a2', fontWeight: 700 }}>LEARNER SUCCESS</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '34px', fontWeight: 700, letterSpacing: '-.035em', margin: '5px 0' }}>Learners</h1>
          <p style={{ fontSize: '12px', color: '#63707d', margin: 0 }}>Understand enrolment, progress and engagement across every TESEA Academy learning path.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="primary" 
          style={{ border: 0, background: '#962c4a', color: '#fff', borderRadius: '7px', padding: '11px 15px', fontSize: '12px', fontWeight: 700, boxShadow: '0 8px 18px rgba(150,44,74,.18)', cursor: 'pointer' }}
        >
          ＋ Add learner
        </button>
      </section>

      {/* Metrics Row */}
      <section className="metrics" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <article className="metric wine" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '11px', padding: '15px' }}>
          <i style={{ float: 'right', fontStyle: 'normal', width: '30px', height: '30px', background: '#fbf0f3', color: '#962c4a', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>♙</i>
          <small style={{ fontSize: '11px', color: '#63707d', display: 'block' }}>Active learners</small>
          <b style={{ fontSize: '22px', display: 'block', margin: '8px 0 3px' }}>{activeCount.toLocaleString()}</b>
          <small style={{ fontSize: '11px', color: '#63707d' }}>
            <span style={{ color: '#15956c', fontWeight: 700 }}>↑ 12.8%</span> vs last month
          </small>
        </article>

        <article className="metric" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '11px', padding: '15px' }}>
          <i style={{ float: 'right', fontStyle: 'normal', width: '30px', height: '30px', background: '#f1f5f7', color: '#5b738b', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>＋</i>
          <small style={{ fontSize: '11px', color: '#63707d', display: 'block' }}>New this month</small>
          <b style={{ fontSize: '22px', display: 'block', margin: '8px 0 3px' }}>{Math.max(1, activeCount)}</b>
          <small style={{ fontSize: '11px', color: '#63707d' }}>Across all learning hubs</small>
        </article>

        <article className="metric" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '11px', padding: '15px' }}>
          <i style={{ float: 'right', fontStyle: 'normal', width: '30px', height: '30px', background: '#f1f5f7', color: '#5b738b', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>◷</i>
          <small style={{ fontSize: '11px', color: '#63707d', display: 'block' }}>Weekly active rate</small>
          <b style={{ fontSize: '22px', display: 'block', margin: '8px 0 3px' }}>78.4%</b>
          <small style={{ fontSize: '11px', color: '#63707d' }}>
            <span style={{ color: '#15956c', fontWeight: 700 }}>↑ 4.1%</span> this week
          </small>
        </article>

        <article className="metric" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '11px', padding: '15px' }}>
          <i style={{ float: 'right', fontStyle: 'normal', width: '30px', height: '30px', background: '#f1f5f7', color: '#5b738b', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>!</i>
          <small style={{ fontSize: '11px', color: '#63707d', display: 'block' }}>Needs attention</small>
          <b style={{ fontSize: '22px', display: 'block', margin: '8px 0 3px' }}>{atRiskCount}</b>
          <small style={{ fontSize: '11px', color: '#63707d' }}>Learners needing follow-up</small>
        </article>
      </section>

      {/* Main Grid */}
      <section className="grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.86fr', gap: '22px' }}>
        <div>
          <article className="card" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '12px', padding: '19px' }}>
            <div className="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Learner directory</h2>
                <p style={{ fontSize: '11px', color: '#63707d', margin: '4px 0 0' }}>Monitor learner profiles, progress and participation</p>
              </div>
              <button 
                onClick={() => showToast('Learner directory exported successfully as CSV.')}
                className="link" 
                style={{ border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                Export
              </button>
            </div>

            <div className="tools" style={{ display: 'flex', gap: '10px', marginBottom: '13px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '9px', color: '#87929c', fontSize: '16px', pointerEvents: 'none' }}>⌕</span>
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search learner name, email or school"
                  style={{ width: '100%', border: '1px solid #e3e8ed', borderRadius: '7px', padding: '10px 12px 10px 35px', fontSize: '12px', outline: 0, boxSizing: 'border-box' }}
                />
              </div>
              <select 
                value={formFilter} 
                onChange={(e) => setFormFilter(e.target.value)}
                style={{ border: '1px solid #e3e8ed', borderRadius: '7px', padding: '9px 10px', fontSize: '11px', color: '#536270', background: '#fff', outline: 'none' }}
              >
                <option value="">All forms</option>
                <option value="Form 4">Form 4</option>
                <option value="Form 5">Form 5</option>
                <option value="Form 6">Form 6</option>
              </select>
              <select 
                value={riskFilter} 
                onChange={(e) => setRiskFilter(e.target.value)}
                style={{ border: '1px solid #e3e8ed', borderRadius: '7px', padding: '9px 10px', fontSize: '11px', color: '#536270', background: '#fff', outline: 'none' }}
              >
                <option value="">All activity</option>
                <option value="On track">On track</option>
                <option value="Watch">Watch</option>
                <option value="At risk">At risk</option>
              </select>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', fontSize: '9px', letterSpacing: '.09em', color: '#8b96a0', padding: '9px 8px', borderBottom: '1px solid #e3e8ed' }}>LEARNER</th>
                    <th style={{ textAlign: 'left', fontSize: '9px', letterSpacing: '.09em', color: '#8b96a0', padding: '9px 8px', borderBottom: '1px solid #e3e8ed' }}>LEARNING PATH</th>
                    <th style={{ textAlign: 'left', fontSize: '9px', letterSpacing: '.09em', color: '#8b96a0', padding: '9px 8px', borderBottom: '1px solid #e3e8ed' }}>PROGRESS</th>
                    <th style={{ textAlign: 'left', fontSize: '9px', letterSpacing: '.09em', color: '#8b96a0', padding: '9px 8px', borderBottom: '1px solid #e3e8ed' }}>LAST ACTIVE</th>
                    <th style={{ textAlign: 'left', fontSize: '9px', letterSpacing: '.09em', color: '#8b96a0', padding: '9px 8px', borderBottom: '1px solid #e3e8ed' }}>ACTIVITY</th>
                    <th style={{ borderBottom: '1px solid #e3e8ed' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLearners.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: '30px 8px', textAlign: 'center', color: '#909aa5', fontSize: '12px' }}>
                        {loading ? 'Loading learners...' : 'No learners match your search. Click "＋ Add learner" to invite one.'}
                      </td>
                    </tr>
                  ) : (
                    filteredLearners.map((item, idx) => {
                      const initials = item.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'ST';
                      const color = photoColors[idx % photoColors.length];

                      return (
                        <tr key={item.id}>
                          <td style={{ padding: '12px 8px', borderBottom: '1px solid #eef1f4' }}>
                            <div style={{ display: 'flex', gap: '9px', alignItems: 'center' }}>
                              <span style={{ height: '29px', width: '29px', borderRadius: '50%', display: 'grid', placeItems: 'center', color: '#fff', background: color, fontSize: '10px', fontWeight: 700 }}>
                                {initials}
                              </span>
                              <span>
                                <b style={{ color: '#17222e', fontSize: '12px', display: 'block' }}>{item.name}</b>
                                <small style={{ fontSize: '10px', color: '#8d97a2' }}>{item.school} · {item.region}</small>
                              </span>
                            </div>
                          </td>
                          <td style={{ padding: '12px 8px', borderBottom: '1px solid #eef1f4', color: '#52606e', fontSize: '11px' }}>
                            {item.learningPath}
                          </td>
                          <td style={{ padding: '12px 8px', borderBottom: '1px solid #eef1f4' }}>
                            <div style={{ height: '5px', background: '#e9edf1', borderRadius: '7px', overflow: 'hidden', minWidth: '70px', marginBottom: '4px' }}>
                              <i style={{ display: 'block', height: '100%', borderRadius: '7px', background: '#962c4a', width: `${item.progress}%` }}></i>
                            </div>
                            <small style={{ fontSize: '10px', color: '#8d97a2' }}>{item.progress}%</small>
                          </td>
                          <td style={{ padding: '12px 8px', borderBottom: '1px solid #eef1f4', color: '#52606e', fontSize: '11px' }}>
                            {item.lastActive}
                          </td>
                          <td style={{ padding: '12px 8px', borderBottom: '1px solid #eef1f4' }}>
                            <span style={{
                              display: 'inline-block',
                              borderRadius: '12px',
                              padding: '4px 7px',
                              fontSize: '9px',
                              fontWeight: 700,
                              background: item.risk === 'On track' ? '#eaf8f3' : item.risk === 'Watch' ? '#fff6e5' : '#fff0f2',
                              color: item.risk === 'On track' ? '#11805d' : item.risk === 'Watch' ? '#a36b06' : '#bf3151'
                            }}>
                              {item.risk}
                            </span>
                          </td>
                          <td style={{ padding: '12px 8px', borderBottom: '1px solid #eef1f4', textAlign: 'right' }}>
                            <button 
                              onClick={() => showToast(`${item.name} profile & progress details opened.`)} 
                              style={{ border: 0, background: 'none', fontSize: '16px', color: '#87929c', cursor: 'pointer' }}
                            >
                              ⋯
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </article>
        </div>

        <aside>
          {/* Active Learners Chart */}
          <article className="card" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '12px', padding: '19px' }}>
            <div className="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Active learners</h2>
                <p style={{ fontSize: '11px', color: '#63707d', margin: '4px 0 0' }}>Daily active users, last six days</p>
              </div>
              <button 
                onClick={() => showToast('Learner activity analytics opened.')}
                className="link" 
                style={{ border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                Analytics
              </button>
            </div>

            <div style={{ height: '170px', display: 'flex', alignItems: 'flex-end', gap: '10px', background: 'repeating-linear-gradient(to bottom, transparent 0, transparent 42px, #eef1f4 43px)', padding: '0 4px', borderBottom: '1px solid #e3e8ed' }}>
              {[
                { label: 'Mon', height: '49%' },
                { label: 'Tue', height: '61%' },
                { label: 'Wed', height: '54%' },
                { label: 'Thu', height: '70%' },
                { label: 'Fri', height: '65%' },
                { label: 'Sat', height: '83%' }
              ].map((item) => (
                <div key={item.label} style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <i style={{ width: '23px', background: '#962c4a', borderRadius: '5px 5px 0 0', display: 'block', height: item.height }}></i>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#929ba5', fontSize: '10px', padding: '8px 5px' }}>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>
          </article>

          {/* Needs Attention Card */}
          <article className="card attention" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '12px', padding: '19px', marginTop: '22px' }}>
            <div className="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Needs attention</h2>
                <p style={{ fontSize: '11px', color: '#63707d', margin: '4px 0 0' }}>Suggested learner-success actions</p>
              </div>
              <button 
                onClick={() => showToast('All learner alerts opened.')}
                className="link" 
                style={{ border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                View all
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px', padding: '11px', border: '1px solid #edf0f3', borderRadius: '8px', background: '#fbfcfd', marginTop: '9px', alignItems: 'center' }}>
              <span style={{ width: '30px', height: '30px', borderRadius: '7px', background: '#fff2da', color: '#a76b08', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: '13px' }}>!</span>
              <span>
                <b style={{ fontSize: '11px', display: 'block' }}>{Math.max(1, atRiskCount)} learners inactive for 14+ days</b>
                <small style={{ display: 'block', fontSize: '10px', color: '#8d97a2', marginTop: '3px' }}>Send an encouragement or tutor follow-up.</small>
              </span>
              <button 
                onClick={() => showToast('Re-engagement campaign drafted.')}
                style={{ marginLeft: 'auto', border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                Message
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px', padding: '11px', border: '1px solid #edf0f3', borderRadius: '8px', background: '#fbfcfd', marginTop: '9px', alignItems: 'center' }}>
              <span style={{ width: '30px', height: '30px', borderRadius: '7px', background: '#fff2da', color: '#a76b08', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: '13px' }}>◷</span>
              <span>
                <b style={{ fontSize: '11px', display: 'block' }}>41 learners near subscription expiry</b>
                <small style={{ display: 'block', fontSize: '10px', color: '#8d97a2', marginTop: '3px' }}>Subscriptions expire within 7 days.</small>
              </span>
              <button 
                onClick={() => showToast('Renewal reminder prepared.')}
                style={{ marginLeft: 'auto', border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                Notify
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px', padding: '11px', border: '1px solid #edf0f3', borderRadius: '8px', background: '#fbfcfd', marginTop: '9px', alignItems: 'center' }}>
              <span style={{ width: '30px', height: '30px', borderRadius: '7px', background: '#eaf8f3', color: '#11805d', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: '13px' }}>✓</span>
              <span>
                <b style={{ fontSize: '11px', display: 'block' }}>18 learners completed a course</b>
                <small style={{ display: 'block', fontSize: '10px', color: '#8d97a2', marginTop: '3px' }}>Certificates are ready to issue.</small>
              </span>
              <button 
                onClick={() => showToast('Certificate batch opened.')}
                style={{ marginLeft: 'auto', border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                Issue
              </button>
            </div>
          </article>
        </aside>
      </section>

      {/* Modal: Add Learner */}
      {isModalOpen && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,33,0.5)', zIndex: 50, padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            style={{ width: 'min(600px, 100%)', background: '#fff', borderRadius: '15px', padding: '25px', boxShadow: '0 28px 70px rgba(10,16,24,.24)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '10px', letterSpacing: '.12em', color: '#8d97a2', fontWeight: 700 }}>LEARNER MANAGEMENT</span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, margin: '5px 0' }}>Add a learner</h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                style={{ border: 0, background: 'none', color: '#85909a', fontSize: '22px', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>
            <p style={{ fontSize: '12px', color: '#63707d', margin: 0 }}>Create a learner profile or invite a student to begin learning.</p>

            <form onSubmit={handleAddLearner}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '11px', marginTop: '18px' }}>
                <div>
                  <label style={{ display: 'block', color: '#6b7782', fontSize: '9px', letterSpacing: '.07em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>First name</label>
                  <input 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    style={{ width: '100%', border: '1px solid #e3e8ed', borderRadius: '7px', padding: '10px', fontSize: '12px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#6b7782', fontSize: '9px', letterSpacing: '.07em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>Last name</label>
                  <input 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    style={{ width: '100%', border: '1px solid #e3e8ed', borderRadius: '7px', padding: '10px', fontSize: '12px', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', color: '#6b7782', fontSize: '9px', letterSpacing: '.07em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>Email address</label>
                  <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@email.com"
                    style={{ width: '100%', border: '1px solid #e3e8ed', borderRadius: '7px', padding: '10px', fontSize: '12px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#6b7782', fontSize: '9px', letterSpacing: '.07em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>Class level</label>
                  <select 
                    value={selectedForm}
                    onChange={(e) => setSelectedForm(e.target.value)}
                    style={{ width: '100%', border: '1px solid #e3e8ed', borderRadius: '7px', padding: '10px', fontSize: '12px', background: '#fff' }}
                  >
                    <option>Form 1</option>
                    <option>Form 2</option>
                    <option>Form 3</option>
                    <option>Form 4</option>
                    <option>Form 5</option>
                    <option>Form 6</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', color: '#6b7782', fontSize: '9px', letterSpacing: '.07em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>Region (Tanzania)</label>
                  <select 
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    style={{ width: '100%', border: '1px solid #e3e8ed', borderRadius: '7px', padding: '10px', fontSize: '12px', background: '#fff' }}
                  >
                    {TANZANIA_REGIONS.map(reg => (
                      <option key={reg.name} value={reg.name}>{reg.name}</option>
                    ))}
                  </select>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', color: '#6b7782', fontSize: '9px', letterSpacing: '.07em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>Enrollment method</label>
                  <select 
                    value={enrollmentMethod}
                    onChange={(e) => setEnrollmentMethod(e.target.value)}
                    style={{ width: '100%', border: '1px solid #e3e8ed', borderRadius: '7px', padding: '10px', fontSize: '12px', background: '#fff' }}
                  >
                    <option>Send invitation email</option>
                    <option>Create profile manually</option>
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
                  Invite learner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
