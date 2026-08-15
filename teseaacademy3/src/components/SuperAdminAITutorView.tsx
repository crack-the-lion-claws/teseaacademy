import React, { useState, useEffect } from 'react';
import { fetchAITutorSessions, saveAITutorSettings, AITutorSessionItem } from '../lib/learningService';

interface SuperAdminAITutorViewProps {
  showToast: (msg: string) => void;
  adminName?: string;
}

export default function SuperAdminAITutorView({ showToast, adminName = 'Emmanuel E.' }: SuperAdminAITutorViewProps) {
  const [sessions, setSessions] = useState<AITutorSessionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessionFilter, setSessionFilter] = useState<'All' | 'Flagged' | 'Swahili' | 'Mathematics'>('All');
  const [riskFilter, setRiskFilter] = useState('All risk levels');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [primaryLanguage, setPrimaryLanguage] = useState('English & Kiswahili');
  const [escalationSensitivity, setEscalationSensitivity] = useState('Standard learner safety');

  const loadData = async () => {
    try {
      setLoading(true);
      const list = await fetchAITutorSessions();
      setSessions(list);
    } catch (e) {
      console.error('Error loading AI Tutor sessions:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveSettings = async () => {
    try {
      await saveAITutorSettings({ primaryLanguage, escalationSensitivity });
      setIsModalOpen(false);
      showToast('AI Tutor settings saved.');
    } catch (e) {
      showToast('Error saving AI Tutor settings.');
    }
  };

  const handleExportReport = () => {
    showToast('AI usage report prepared.');
  };

  const filteredSessions = sessions.filter(item => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || item.learnerName.toLowerCase().includes(q) || item.topic.toLowerCase().includes(q) || item.language.toLowerCase().includes(q);

    let matchesType = true;
    if (sessionFilter === 'Flagged') {
      matchesType = item.status === 'Review';
    } else if (sessionFilter === 'Swahili') {
      matchesType = item.language.toLowerCase().includes('swahili') || item.language.toLowerCase().includes('kiswahili');
    } else if (sessionFilter === 'Mathematics') {
      matchesType = item.topic.toLowerCase().includes('math') || item.topic.toLowerCase().includes('equation') || item.topic.toLowerCase().includes('algebra');
    }

    let matchesRisk = true;
    if (riskFilter === 'Needs review') {
      matchesRisk = item.status === 'Review';
    } else if (riskFilter === 'Safe') {
      matchesRisk = item.status === 'Safe';
    }

    return matchesSearch && matchesType && matchesRisk;
  });

  return (
    <>
      <section className="content">
        <div className="heading">
          <div>
            <h1 id="title">AI Tutor command centre</h1>
            <p>Run a safe, localized tutor that helps every learner move forward.</p>
          </div>
          <button className="btn" id="config" onClick={() => setIsModalOpen(true)}>
            ⚙ Tutor settings
          </button>
        </div>

        <div className="kpis">
          <article className="card kpi">
            <div className="khead">Tutor conversations <i className="kicon">✦</i></div>
            <div className="num">{sessions.length.toLocaleString()}</div>
            <div className="trend">{sessions.length > 0 ? '↗ 18.6%' : '0%'} <span>this week</span></div>
          </article>
          <article className="card kpi">
            <div className="khead">Helpful response rate <i className="kicon">☺</i></div>
            <div className="num">{sessions.length > 0 ? `${Math.round((sessions.filter(s => s.rating >= 4).length / sessions.length) * 100)}%` : '0%'}</div>
            <div className="trend">{sessions.length > 0 ? '↗ 1.2%' : '0%'} <span>learner rated</span></div>
          </article>
          <article className="card kpi">
            <div className="khead">Safety escalations <i className="kicon">!</i></div>
            <div className="num">{sessions.filter(s => s.status === 'Review').length}</div>
            <div className="trend">{sessions.length > 0 ? '↘ 22%' : '0%'} <span>vs last week</span></div>
          </article>
          <article className="card kpi">
            <div className="khead">Avg. response time <i className="kicon">◴</i></div>
            <div className="num">{sessions.length > 0 ? '1.2s' : '0s'}</div>
            <div className="trend">{sessions.length > 0 ? '↗ 0.3s' : '0s'} <span>within target</span></div>
          </article>
        </div>

        <div className="grid">
          <article className="card">
            <div className="ph">
              <div>
                <h2>Tutor usage</h2>
                <p>Conversations completed in the past seven days</p>
              </div>
              <button className="link" onClick={handleExportReport}>
                Export report ↗
              </button>
            </div>
            <div className="usage">
              <div className="col"><div className="bar"><i style={{ height: '44%' }}></i></div><label>Mon</label></div>
              <div className="col"><div className="bar"><i style={{ height: '68%' }}></i></div><label>Tue</label></div>
              <div className="col"><div className="bar"><i style={{ height: '51%' }}></i></div><label>Wed</label></div>
              <div className="col"><div className="bar"><i style={{ height: '82%' }}></i></div><label>Thu</label></div>
              <div className="col"><div className="bar"><i style={{ height: '73%' }}></i></div><label>Fri</label></div>
              <div className="col"><div className="bar"><i style={{ height: '91%' }}></i></div><label>Sat</label></div>
            </div>
          </article>

          <article className="card">
            <div className="ph">
              <div>
                <h2>Quality & language</h2>
                <p>Teaching quality across locales</p>
              </div>
            </div>
            <div className="signal">
              <div className="signalbox">
                <b>Swahili tutoring is improving</b>
                <p>Step-by-step science explanations received a 97.2% helpful rating this week.</p>
              </div>
              <div className="metric"><span>English clarity</span><div className="meter"><i style={{ width: '98%' }}></i></div><b>98%</b></div>
              <div className="metric"><span>Swahili clarity</span><div className="meter"><i style={{ width: '96%' }}></i></div><b>96%</b></div>
              <div className="metric"><span>Curriculum grounding</span><div className="meter"><i style={{ width: '94%' }}></i></div><b>94%</b></div>
            </div>
          </article>
        </div>

        <div className="workspace">
          <article className="card">
            <div className="ph">
              <div>
                <h2>Conversation review</h2>
                <p>Recent high-value sessions and items flagged for human attention</p>
              </div>
              <button className="link" onClick={() => showToast('Conversation audit opened.')}>
                Open audit →
              </button>
            </div>
            <div className="convos">
              <div className="filters">
                <button 
                  className={sessionFilter === 'All' ? 'on' : ''} 
                  onClick={() => setSessionFilter('All')}
                >
                  All sessions
                </button>
                <button 
                  className={sessionFilter === 'Flagged' ? 'on' : ''} 
                  onClick={() => {
                    setSessionFilter('Flagged');
                    showToast('Showing flagged sessions.');
                  }}
                >
                  Flagged
                </button>
                <button 
                  className={sessionFilter === 'Swahili' ? 'on' : ''} 
                  onClick={() => {
                    setSessionFilter('Swahili');
                    showToast('Showing Swahili sessions.');
                  }}
                >
                  Swahili
                </button>
                <button 
                  className={sessionFilter === 'Mathematics' ? 'on' : ''} 
                  onClick={() => {
                    setSessionFilter('Mathematics');
                    showToast('Showing Math sessions.');
                  }}
                >
                  Mathematics
                </button>
                <select 
                  value={riskFilter} 
                  onChange={(e) => setRiskFilter(e.target.value)}
                >
                  <option>All risk levels</option>
                  <option>Needs review</option>
                  <option>Safe</option>
                </select>
                <input 
                  id="filter" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter sessions" 
                />
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Learner session</th>
                    <th>Topic</th>
                    <th>Language</th>
                    <th>Turns</th>
                    <th>Helpfulness</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody id="rows">
                  {filteredSessions.length > 0 ? (
                    filteredSessions.map((item, idx) => {
                      const isSafe = item.status === 'Safe';
                      return (
                        <tr key={item.id || idx}>
                          <td>
                            <div className="session">
                              <i className="miniava">{item.avatarInitials || 'LM'}</i>
                              {item.learnerName} · {item.time}
                            </div>
                          </td>
                          <td>{item.topic}</td>
                          <td className="mut">{item.language}</td>
                          <td>{item.turns}</td>
                          <td>{item.helpfulness}</td>
                          <td>
                            <span className={`pill ${isSafe ? 'safe' : 'review'}`}>
                              {item.status}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="link" 
                              onClick={() => showToast(item.status === 'Review' ? 'Escalation review opened.' : `Opening ${item.learnerName.split(' ')[0]}’s conversation…`)}
                            >
                              Review
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '24px', color: '#6b7a78' }}>
                        No sessions found matching filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </article>

          <aside className="card right">
            <div className="section">
              <div className="mt">
                Safety queue 
                <button className="link" onClick={() => showToast('Safety queue opened.')}>View all</button>
              </div>
              <div className="task">
                <div className="tic">!</div>
                <div>
                  <b>Wellbeing escalation</b>
                  <p>1 session requires human follow-up</p>
                </div>
                <button onClick={() => showToast('Case assigned to learner success team.')}>Assign</button>
              </div>
              <div className="task">
                <div className="tic">?</div>
                <div>
                  <b>Potential hallucination</b>
                  <p>4 answers need subject review</p>
                </div>
                <button onClick={() => showToast('Subject review queue opened.')}>Check</button>
              </div>
              <div className="task">
                <div className="tic">◌</div>
                <div>
                  <b>Translation feedback</b>
                  <p>13 learner corrections received</p>
                </div>
                <button onClick={() => showToast('Language review opened.')}>Review</button>
              </div>
            </div>

            <div className="section">
              <div className="mt">Top learner intents</div>
              <div className="metric">
                <span>Explain a topic</span>
                <div className="meter"><i style={{ width: '77%' }}></i></div>
                <b>77%</b>
              </div>
              <div className="metric">
                <span>Practice questions</span>
                <div className="meter"><i style={{ width: '63%', background: '#d69f4c' }}></i></div>
                <b>63%</b>
              </div>
              <div className="metric">
                <span>Study planning</span>
                <div className="meter"><i style={{ width: '41%', background: '#96314c' }}></i></div>
                <b>41%</b>
              </div>
            </div>

            <div className="section">
              <div className="mt">Quick actions</div>
              <button className="link" onClick={() => showToast('Tutor knowledge sources opened.')}>Manage knowledge sources →</button>
              <br /><br />
              <button className="link" onClick={() => showToast('Prompt policy editor opened.')}>Configure tutor policies →</button>
              <br /><br />
              <button className="link" onClick={() => showToast('Weekly AI safety report generated.')}>Generate safety report →</button>
            </div>
          </aside>
        </div>
      </section>

      {/* Modal: AI Tutor settings */}
      <div className={`modalback ${isModalOpen ? 'show' : ''}`} id="modal" onClick={() => setIsModalOpen(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h2>AI Tutor settings</h2>
          <p>Update the teaching behaviour and protection standards for Rafiki AI.</p>
          <label>Primary teaching language</label>
          <select 
            value={primaryLanguage}
            onChange={(e) => setPrimaryLanguage(e.target.value)}
          >
            <option>English & Kiswahili</option>
            <option>English</option>
            <option>Kiswahili</option>
          </select>
          <label>Escalation sensitivity</label>
          <select 
            value={escalationSensitivity}
            onChange={(e) => setEscalationSensitivity(e.target.value)}
          >
            <option>Standard learner safety</option>
            <option>High sensitivity</option>
            <option>Restricted pilot</option>
          </select>
          <div className="mf">
            <button className="btn ghost" id="cancel" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button className="btn" id="save" onClick={handleSaveSettings}>
              Save settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
