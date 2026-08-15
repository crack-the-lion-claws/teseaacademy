import React, { useState, useEffect } from 'react';
import { fetchAnalyticsSubjects, fetchLiveAdminAnalytics, AnalyticsSubjectPerformance, AdminAnalyticsData } from '../lib/learningService';

interface SuperAdminAnalyticsViewProps {
  showToast: (msg: string) => void;
  adminName?: string;
}

export default function SuperAdminAnalyticsView({ showToast, adminName = 'Emmanuel E.' }: SuperAdminAnalyticsViewProps) {
  const [subjects, setSubjects] = useState<AnalyticsSubjectPerformance[]>([]);
  const [analytics, setAnalytics] = useState<AdminAnalyticsData | null>(null);
  const [termFilter, setTermFilter] = useState<'This term' | 'Last term' | 'NECTA' | 'Cambridge'>('This term');
  const [levelFilter, setLevelFilter] = useState('All levels');

  useEffect(() => {
    fetchAnalyticsSubjects().then(setSubjects);
    fetchLiveAdminAnalytics().then(setAnalytics);
  }, []);

  const activeLearners = analytics?.activeLearners || 0;
  const learningHours = analytics?.learningHours || 0;
  const avgCompletionPct = analytics?.avgCompletionPct || 0;

  const filteredSubjects = subjects.filter(s => {
    if (termFilter === 'NECTA') {
      return s.subject !== 'English Language';
    }
    if (termFilter === 'Cambridge') {
      return s.subject === 'Biology' || s.subject === 'Mathematics';
    }
    return true;
  });

  return (
    <section className="content">
      <div className="heading">
        <div>
          <h1 id="title">Platform analytics</h1>
          <p>Turn learner behaviour and platform performance into sharper decisions.</p>
        </div>
        <button className="btn" onClick={() => showToast('Custom report builder opened.')}>
          ＋ Build report
        </button>
      </div>

      <div className="kpis">
        <article className="card kpi">
          <div className="khead">Weekly active learners <i className="kicon">♙</i></div>
          <div className="num">{activeLearners.toLocaleString()}</div>
          <div className="trend">{activeLearners > 0 ? '↗ 9.4%' : '0%'} <span>vs last week</span></div>
        </article>
        <article className="card kpi">
          <div className="khead">Learning hours <i className="kicon">◴</i></div>
          <div className="num">{learningHours.toLocaleString()}</div>
          <div className="trend">{learningHours > 0 ? '↗ 16.2%' : '0%'} <span>this week</span></div>
        </article>
        <article className="card kpi">
          <div className="khead">Course completion <i className="kicon">✓</i></div>
          <div className="num">{avgCompletionPct}%</div>
          <div className="trend">{avgCompletionPct > 0 ? '↗ 3.1%' : '0%'} <span>this term</span></div>
        </article>
        <article className="card kpi">
          <div className="khead">Net revenue <i className="kicon">▤</i></div>
          <div className="num">{activeLearners > 0 ? `TZS ${(activeLearners * 15000).toLocaleString()}` : 'TZS 0'}</div>
          <div className="trend">{activeLearners > 0 ? '↗ 8.4%' : '0%'} <span>monthly recurring</span></div>
        </article>
      </div>

      <div className="grid">
        <article className="card">
          <div className="ph">
            <div>
              <h2>Learner engagement</h2>
              <p>Weekly active learners and completed lessons</p>
            </div>
            <button className="link" onClick={() => showToast('Engagement report exported.')}>
              Export ↗
            </button>
          </div>
          <div className="chart">
            <svg viewBox="0 0 700 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="f" x1="0" x2="0" y1="0" y2="1">
                  <stop stopColor="#057b79" stopOpacity=".25" />
                  <stop offset="1" stopColor="#057b79" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 148 C45 142 58 125 94 133 S150 112 178 118 S233 97 262 106 S323 85 350 93 S407 67 438 75 S486 43 525 59 S583 27 611 39 S662 14 700 20 L700 180 L0 180Z" fill="url(#f)" />
              <path d="M0 148 C45 142 58 125 94 133 S150 112 178 118 S233 97 262 106 S323 85 350 93 S407 67 438 75 S486 43 525 59 S583 27 611 39 S662 14 700 20" fill="none" stroke="#057b79" strokeWidth="3" />
            </svg>
            <div className="legend">
              <i></i>Active learners &nbsp;&nbsp; <span style={{ color: '#d69f4c' }}>●</span> Completed lessons
            </div>
          </div>
        </article>

        <article className="card">
          <div className="ph">
            <div>
              <h2>Decision signal</h2>
              <p>What deserves attention</p>
            </div>
          </div>
          <div className="insight">
            <div className="insightbox">
              <b>Completion opportunity</b>
              <p>Form 4 Mathematics has high engagement but a 14% drop at the Trigonometry unit. Targeted revision could recover completion.</p>
            </div>
            <div className="statline"><span>Strongest subject</span><b>Biology · 82%</b></div>
            <div className="statline"><span>Fastest growth</span><b>Cambridge · 21%</b></div>
            <div className="statline"><span>At-risk segment</span><b>Form 2 · 2,418</b></div>
          </div>
        </article>
      </div>

      <div className="workspace">
        <article className="card">
          <div className="ph">
            <div>
              <h2>Learning performance</h2>
              <p>Subject-level engagement, completion and assessment performance</p>
            </div>
            <button className="link" onClick={() => showToast('Performance dataset exported.')}>
              Export CSV ↗
            </button>
          </div>
          <div className="tablewrap">
            <div className="filters">
              <button 
                className={termFilter === 'This term' ? 'on' : ''} 
                onClick={() => setTermFilter('This term')}
              >
                This term
              </button>
              <button 
                className={termFilter === 'Last term' ? 'on' : ''} 
                onClick={() => {
                  setTermFilter('Last term');
                  showToast('Showing last term results.');
                }}
              >
                Last term
              </button>
              <button 
                className={termFilter === 'NECTA' ? 'on' : ''} 
                onClick={() => {
                  setTermFilter('NECTA');
                  showToast('Showing NECTA performance.');
                }}
              >
                NECTA
              </button>
              <button 
                className={termFilter === 'Cambridge' ? 'on' : ''} 
                onClick={() => {
                  setTermFilter('Cambridge');
                  showToast('Showing Cambridge performance.');
                }}
              >
                Cambridge
              </button>

              <select 
                value={levelFilter} 
                onChange={(e) => setLevelFilter(e.target.value)}
              >
                <option>All levels</option>
                <option>Form 1–4</option>
                <option>Form 5–6</option>
              </select>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Active learners</th>
                  <th>Learning hours</th>
                  <th>Completion</th>
                  <th>Avg. score</th>
                  <th>Trend</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredSubjects.map((row, idx) => (
                  <tr key={idx}>
                    <td className="course">{row.subject}</td>
                    <td>{row.activeLearners}</td>
                    <td>{row.hours}</td>
                    <td>
                      <span className="progress">
                        <i style={{ width: `${row.completionPct}%` }}></i>
                      </span>
                      {row.completionPct}%
                    </td>
                    <td>{row.avgScore}</td>
                    <td style={{ color: row.isPositive ? '#16875f' : '#ad7318' }}>
                      {row.trend}
                    </td>
                    <td>
                      <button 
                        className="link" 
                        onClick={() => showToast(`Opening ${row.subject} analytics…`)}
                      >
                        Explore
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <aside className="card right">
          <div className="sec">
            <div className="mt">Audience mix</div>
            <div className="metric">
              <span>NECTA</span>
              <div className="meter"><i style={{ width: '67%' }}></i></div>
              <b>67%</b>
            </div>
            <div className="metric">
              <span>Cambridge</span>
              <div className="meter"><i style={{ width: '19%', background: '#d69f4c' }}></i></div>
              <b>19%</b>
            </div>
            <div className="metric">
              <span>Life-long</span>
              <div className="meter"><i style={{ width: '14%', background: '#96314c' }}></i></div>
              <b>14%</b>
            </div>
          </div>

          <div className="sec">
            <div className="mt">
              Scheduled reports 
              <button className="link" onClick={() => showToast('Report schedule opened.')}>Manage</button>
            </div>
            <div className="task">
              <div className="tic">◔</div>
              <div>
                <b>Weekly executive brief</b>
                <p>Next delivery: Monday 08:00</p>
              </div>
              <button onClick={() => showToast('Executive brief generated.')}>Run</button>
            </div>
            <div className="task">
              <div className="tic">⌂</div>
              <div>
                <b>School impact report</b>
                <p>Next delivery: Friday 16:00</p>
              </div>
              <button onClick={() => showToast('School report generated.')}>Run</button>
            </div>
            <div className="task">
              <div className="tic">◇</div>
              <div>
                <b>Revenue health report</b>
                <p>Next delivery: 1 Aug 2026</p>
              </div>
              <button onClick={() => showToast('Revenue report generated.')}>Run</button>
            </div>
          </div>

          <div className="sec">
            <div className="mt">Quick actions</div>
            <button className="link" onClick={() => showToast('Segment builder opened.')}>Create learner segment →</button>
            <br /><br />
            <button className="link" onClick={() => showToast('Dashboard sharing settings opened.')}>Share dashboard →</button>
            <br /><br />
            <button className="link" onClick={() => showToast('Data export centre opened.')}>Open data exports →</button>
          </div>
        </aside>
      </div>
    </section>
  );
}
