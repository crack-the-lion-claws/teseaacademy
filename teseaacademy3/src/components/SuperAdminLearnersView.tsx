import React, { useState, useEffect } from 'react';
import { fetchLearners, saveLearner, LearnerItem, TANZANIA_REGIONS } from '../lib/learningService';

interface SuperAdminLearnersViewProps {
  showToast: (msg: string) => void;
  adminName?: string;
}

export default function SuperAdminLearnersView({ showToast, adminName = 'Emmanuel E.' }: SuperAdminLearnersViewProps) {
  const [learners, setLearners] = useState<LearnerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'NECTA Secondary' | 'Cambridge' | 'Life-long Learning'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('All schools');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [learnerName, setLearnerName] = useState('');
  const [learnerEmail, setLearnerEmail] = useState('');
  const [selectedProgramme, setSelectedProgramme] = useState('NECTA Secondary');
  const [selectedRegion, setSelectedRegion] = useState('Dar es Salaam');

  const loadData = async () => {
    try {
      setLoading(true);
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

  const handleSendInvitation = async () => {
    const nameToUse = learnerName.trim() || 'New Learner';
    const emailToUse = learnerEmail.trim() || `learner.${Date.now()}@email.com`;
    
    try {
      const created = await saveLearner({
        name: nameToUse,
        email: emailToUse,
        school: 'TESEA Direct',
        region: selectedRegion,
        form: selectedProgramme.includes('NECTA') ? 'Form 4' : 'IGCSE',
        learningPath: selectedProgramme,
        progress: 0,
        lastActive: 'Just now',
        risk: 'On track'
      });

      setLearners(prev => [created, ...prev]);
      setIsModalOpen(false);
      setLearnerName('');
      setLearnerEmail('');
      showToast(`Invitation sent to ${nameToUse}.`);
    } catch (err) {
      showToast('Failed to send invitation.');
    }
  };

  const filteredLearners = learners.filter(item => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || item.name.toLowerCase().includes(q) || item.email.toLowerCase().includes(q) || (item.school && item.school.toLowerCase().includes(q));
    const matchesProg = activeFilter === 'all' || item.learningPath.toLowerCase().includes(activeFilter.toLowerCase()) || (activeFilter === 'NECTA Secondary' && item.form.includes('Form'));
    const matchesStatus = statusFilter === 'All' || (statusFilter === 'Active' && item.risk === 'On track') || (statusFilter === 'At risk' && (item.risk === 'At risk' || item.risk === 'Watch'));
    return matchesSearch && matchesProg && matchesStatus;
  });

  const totalLearnersCount = learners.length;
  const atRiskLearners = learners.filter(l => l.risk === 'At risk' || l.risk === 'Watch');
  const atRiskCount = atRiskLearners.length;
  const activeThisWeekCount = learners.filter(l => l.lastActive.includes('min') || l.lastActive.includes('hour') || l.lastActive.includes('Yesterday') || l.lastActive === 'Just now').length || learners.length;

  const faces = ['f1', 'f2', 'f3', 'f4', 'f5'];

  return (
    <>
      <section className="content">
        <div className="heading">
          <div>
            <h1 id="title">Learner management</h1>
            <p>Monitor learner health, access and progress across TESEA Academy.</p>
          </div>
          <button className="button" id="invite" onClick={() => setIsModalOpen(true)}>
            ＋ Invite learners
          </button>
        </div>

        <div className="kpis">
          <article className="card kpi">
            <div className="kpi-head">Total learners <i className="kicon a">♙</i></div>
            <div className="number">{totalLearnersCount.toLocaleString()}</div>
            <div className="up">{totalLearnersCount > 0 ? '↗ 12.8%' : '0%'} <span>vs last month</span></div>
          </article>
          <article className="card kpi">
            <div className="kpi-head">Active this week <i className="kicon b">◉</i></div>
            <div className="number">{activeThisWeekCount.toLocaleString()}</div>
            <div className="up">{activeThisWeekCount > 0 ? '↗ 9.4%' : '0%'} <span>weekly activity</span></div>
          </article>
          <article className="card kpi">
            <div className="kpi-head">At-risk learners <i className="kicon c">!</i></div>
            <div className="number">{atRiskCount.toLocaleString()}</div>
            <div className="up">{atRiskCount > 0 ? '↘ 6.2%' : '0%'} <span>needs intervention</span></div>
          </article>
          <article className="card kpi">
            <div className="kpi-head">Completion rate <i className="kicon d">✓</i></div>
            <div className="number">{totalLearnersCount > 0 ? '72.6%' : '0%'}</div>
            <div className="up">{totalLearnersCount > 0 ? '↗ 3.1%' : '0%'} <span>this term</span></div>
          </article>
        </div>

        <div className="alerts">
          <article className="card">
            <div className="panel-head">
              <div>
                <h2>Cohort health</h2>
                <p>Engagement and lesson completion by programme</p>
              </div>
              <button className="link" onClick={() => showToast('Cohort analytics opened.')}>View analytics →</button>
            </div>
            <div className="cohorts">
              <div className="cohort">
                <b>NECTA Secondary</b>
                <small>{`${Math.round(totalLearnersCount * 0.67).toLocaleString()} active learners`}</small>
                <div className="bar"><i style={{ width: totalLearnersCount > 0 ? '76%' : '0%' }}></i></div>
                <div><span>Completion</span><b>{totalLearnersCount > 0 ? '76%' : '0%'}</b></div>
              </div>
              <div className="cohort">
                <b>Cambridge</b>
                <small>{`${Math.round(totalLearnersCount * 0.19).toLocaleString()} active learners`}</small>
                <div className="bar"><i style={{ width: totalLearnersCount > 0 ? '68%' : '0%', background: '#d69f4c' }}></i></div>
                <div><span>Completion</span><b>{totalLearnersCount > 0 ? '68%' : '0%'}</b></div>
              </div>
              <div className="cohort">
                <b>Life-long Learning</b>
                <small>{`${Math.round(totalLearnersCount * 0.14).toLocaleString()} active learners`}</small>
                <div className="bar"><i style={{ width: totalLearnersCount > 0 ? '59%' : '0%', background: '#96314c' }}></i></div>
                <div><span>Completion</span><b>{totalLearnersCount > 0 ? '59%' : '0%'}</b></div>
              </div>
            </div>
          </article>

          <article className="card">
            <div className="panel-head">
              <div>
                <h2>Attention needed</h2>
                <p>Today's learner success signals</p>
              </div>
            </div>
            <div className="insight">
              <div className="insight-box">
                <b>AI learning insight</b>
                <p>Form 4 Mathematics retention is down 8% in the past seven days. Consider assigning the Revision Sprint.</p>
              </div>
              <div className="quick">
                <button onClick={() => showToast('A revision campaign has been drafted.')}>Create campaign</button>
                <button onClick={() => showToast('Intervention list exported.')}>Export list</button>
                <button onClick={() => showToast('Tutor alerts sent.')}>Alert tutors</button>
                <button onClick={() => showToast('Report scheduled for Monday.')}>Schedule report</button>
              </div>
            </div>
          </article>
        </div>

        <div className="workspace">
          <article className="card">
            <div className="panel-head">
              <div>
                <h2>Learner directory</h2>
                <p><span id="count">{totalLearnersCount.toLocaleString()}</span> learner accounts across all programmes</p>
              </div>
              <button className="link" onClick={() => showToast('Learner data export prepared.')}>Export CSV ↗</button>
            </div>
            <div className="directory">
              <div className="filters">
                <button 
                  className={activeFilter === 'all' ? 'filter-active' : ''} 
                  onClick={() => setActiveFilter('all')}
                >
                  All learners
                </button>
                <select 
                  value={activeFilter} 
                  onChange={(e) => setActiveFilter(e.target.value as any)}
                >
                  <option value="all">All programmes</option>
                  <option value="NECTA Secondary">NECTA Secondary</option>
                  <option value="Cambridge">Cambridge</option>
                  <option value="Life-long Learning">Life-long Learning</option>
                </select>
                <select 
                  value={schoolFilter}
                  onChange={(e) => setSchoolFilter(e.target.value)}
                >
                  <option>All schools</option>
                  <option>TESEA Direct</option>
                  <option>Bright Future School</option>
                </select>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">Account status</option>
                  <option value="Active">Active</option>
                  <option value="At risk">At risk</option>
                </select>
                <div className="directory-search">
                  <input 
                    id="filter" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter listed learners" 
                  />
                </div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Learner</th>
                    <th>Programme</th>
                    <th>Progress</th>
                    <th>Plan</th>
                    <th>Last active</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody id="rows">
                  {filteredLearners.length > 0 ? (
                    filteredLearners.map((learner, idx) => {
                      const initials = learner.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'ST';
                      const faceClass = faces[idx % faces.length];
                      const isAtRisk = learner.risk === 'At risk' || learner.risk === 'Watch';
                      return (
                        <tr key={learner.id || idx}>
                          <td>
                            <div className="learner">
                              <i className={`face ${faceClass}`}>{initials}</i>
                              {learner.name}
                            </div>
                          </td>
                          <td className="muted">{learner.learningPath || `${learner.form} Track`}</td>
                          <td>{learner.progress}%</td>
                          <td><span className="plan">{learner.school?.includes('School') ? 'School' : idx % 2 === 0 ? 'Premium' : 'Basic'}</span></td>
                          <td className="muted">{learner.lastActive}</td>
                          <td><span className={`status ${isAtRisk ? 'at-risk' : 'active'}`}>{isAtRisk ? 'At risk' : 'Active'}</span></td>
                          <td><button className="link" onClick={() => showToast(`Opening ${learner.name.split(' ')[0]}’s learner profile…`)}>View</button></td>
                        </tr>
                      );
                    })
                  ) : (
                    <>
                      <tr>
                        <td>
                          <div className="learner">
                            <i className="face f1">AM</i>
                            Amara Mwakalonge
                          </div>
                        </td>
                        <td className="muted">NECTA · Form 4</td>
                        <td>84%</td>
                        <td><span className="plan">Premium</span></td>
                        <td className="muted">12 mins ago</td>
                        <td><span className="status active">Active</span></td>
                        <td><button className="link" onClick={() => showToast('Opening Amara’s learner profile…')}>View</button></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="learner">
                            <i className="face f2">JK</i>
                            Jabir Kweka
                          </div>
                        </td>
                        <td className="muted">Cambridge · IGCSE</td>
                        <td>71%</td>
                        <td><span className="plan">School</span></td>
                        <td className="muted">1 hour ago</td>
                        <td><span className="status active">Active</span></td>
                        <td><button className="link" onClick={() => showToast('Opening Jabir’s learner profile…')}>View</button></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="learner">
                            <i className="face f3">NM</i>
                            Neema Mushi
                          </div>
                        </td>
                        <td className="muted">NECTA · Form 2</td>
                        <td>38%</td>
                        <td><span className="plan">Basic</span></td>
                        <td className="muted">6 days ago</td>
                        <td><span className="status at-risk">At risk</span></td>
                        <td><button className="link" onClick={() => showToast('Opening Neema’s learner profile…')}>View</button></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="learner">
                            <i className="face f4">DK</i>
                            David Kaseke
                          </div>
                        </td>
                        <td className="muted">Life-long Learning</td>
                        <td>91%</td>
                        <td><span className="plan">Premium</span></td>
                        <td className="muted">Yesterday</td>
                        <td><span className="status active">Active</span></td>
                        <td><button className="link" onClick={() => showToast('Opening David’s learner profile…')}>View</button></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="learner">
                            <i className="face f5">ZR</i>
                            Zawadi Rwegasira
                          </div>
                        </td>
                        <td className="muted">NECTA · Form 6</td>
                        <td>52%</td>
                        <td><span className="plan">School</span></td>
                        <td className="muted">3 days ago</td>
                        <td><span className="status at-risk">At risk</span></td>
                        <td><button className="link" onClick={() => showToast('Opening Zawadi’s learner profile…')}>View</button></td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </article>

          <aside className="card right">
            <div className="side-section">
              <div className="mini-title">
                At-risk queue 
                <button className="link" onClick={() => showToast('Full at-risk queue opened.')}>View all</button>
              </div>
              <div className="risk">
                <i className="face f3">NM</i>
                <div>
                  <b>Neema Mushi</b>
                  <p>6 days inactive · Form 2</p>
                </div>
                <button onClick={() => showToast('Success check-in sent to Neema.')}>Send</button>
              </div>
              <div className="risk">
                <i className="face f5">ZR</i>
                <div>
                  <b>Zawadi Rwegasira</b>
                  <p>3 days inactive · Form 6</p>
                </div>
                <button onClick={() => showToast('Success check-in sent to Zawadi.')}>Send</button>
              </div>
              <div className="risk">
                <i className="face f2">RS</i>
                <div>
                  <b>Rahma Saleh</b>
                  <p>Low quiz score · Form 4</p>
                </div>
                <button onClick={() => showToast('Tutor support request sent.')}>Alert</button>
              </div>
            </div>

            <div className="side-section">
              <div className="mini-title">Acquisition sources</div>
              <div className="metric">
                <span>Schools</span>
                <div className="bar"><i style={{ width: '54%' }}></i></div>
                <strong>54%</strong>
              </div>
              <div className="metric">
                <span>Direct</span>
                <div className="bar"><i style={{ width: '28%', background: '#d69f4c' }}></i></div>
                <strong>28%</strong>
              </div>
              <div className="metric">
                <span>Referral</span>
                <div className="bar"><i style={{ width: '18%', background: '#96314c' }}></i></div>
                <strong>18%</strong>
              </div>
            </div>

            <div className="side-section">
              <div className="mini-title">Quick actions</div>
              <button className="link" onClick={() => showToast('Bulk import panel opened.')}>Import learners →</button>
              <br /><br />
              <button className="link" onClick={() => showToast('Bulk email composer opened.')}>Send bulk message →</button>
              <br /><br />
              <button className="link" onClick={() => showToast('Access audit report generated.')}>Audit account access →</button>
            </div>
          </aside>
        </div>
      </section>

      {/* Modal: Invite Learners */}
      <div className={`modal-wrap ${isModalOpen ? 'show' : ''}`} id="modal" onClick={() => setIsModalOpen(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h2>Invite learners</h2>
          <p>Send a secure invitation to a learner or add them to a school cohort.</p>
          <label>Learner name</label>
          <input 
            id="learnerName" 
            value={learnerName}
            onChange={(e) => setLearnerName(e.target.value)}
            placeholder="e.g. Asha Mollel" 
          />
          <label>Email address</label>
          <input 
            value={learnerEmail}
            onChange={(e) => setLearnerEmail(e.target.value)}
            placeholder="learner@email.com" 
          />
          <label>Programme</label>
          <select 
            value={selectedProgramme}
            onChange={(e) => setSelectedProgramme(e.target.value)}
          >
            <option>NECTA Secondary</option>
            <option>Cambridge</option>
            <option>Life-long Learning</option>
          </select>
          <label>Region (Tanzania)</label>
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {TANZANIA_REGIONS.map(r => (
              <option key={r.name} value={r.name}>{r.name}</option>
            ))}
          </select>
          <div className="modal-footer">
            <button className="button ghost" id="cancel" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button className="button" id="send" onClick={handleSendInvitation}>
              Send invitation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
