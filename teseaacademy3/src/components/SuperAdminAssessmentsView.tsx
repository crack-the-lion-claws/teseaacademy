import React, { useState, useEffect } from 'react';
import { fetchAssessments, saveAssessment, AssessmentItem } from '../lib/learningService';

interface SuperAdminAssessmentsViewProps {
  showToast: (msg: string) => void;
  adminName?: string;
}

export default function SuperAdminAssessmentsView({ showToast, adminName = 'Emmanuel E.' }: SuperAdminAssessmentsViewProps) {
  const [assessments, setAssessments] = useState<AssessmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formatFilter, setFormatFilter] = useState<'All' | 'Mock exams' | 'Quizzes' | 'Question banks'>('All');
  const [subjectFilter, setSubjectFilter] = useState('All subjects');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assessmentTitle, setAssessmentTitle] = useState('');
  const [assessmentSubject, setAssessmentSubject] = useState('Mathematics');
  const [assessmentFormat, setAssessmentFormat] = useState('Mock exam');

  const loadData = async () => {
    try {
      setLoading(true);
      const list = await fetchAssessments();
      setAssessments(list);
    } catch (e) {
      console.error('Error loading assessments:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateAssessment = async () => {
    const title = assessmentTitle.trim() || 'New Assessment';
    try {
      const created = await saveAssessment({
        title,
        subject: assessmentSubject,
        format: assessmentFormat,
        type: assessmentFormat === 'Quiz' ? 'Quiz' : assessmentFormat === 'Test' ? 'Test' : 'Mock exam',
        attempts: 0,
        avgScore: null,
        status: 'Draft',
        icon: assessmentFormat.includes('Quiz') ? '?' : assessmentFormat.includes('Question') ? '∑' : '✓'
      });

      setAssessments(prev => [created, ...prev]);
      setIsModalOpen(false);
      setAssessmentTitle('');
      showToast(`${title} created in draft status.`);
    } catch (e) {
      showToast('Error creating assessment.');
    }
  };

  const handleExportList = () => {
    const rows = [
      ['Assessment', 'Subject', 'Format', 'Attempts', 'Average', 'Status'],
      ...assessments.map(a => [
        a.title, 
        a.subject, 
        a.format || a.type || 'Assessment', 
        a.attempts ? a.attempts.toString() : '—', 
        a.avgScore ? `${a.avgScore}%` : '—', 
        a.status
      ])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.map(x => `"${x}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TESEA_Assessments_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Assessment library exported.');
  };

  const filteredAssessments = assessments.filter(item => {
    const q = searchQuery.toLowerCase();
    const itemFormat = (item.format || item.type || '').toLowerCase();
    const matchesSearch = !q || item.title.toLowerCase().includes(q) || item.subject.toLowerCase().includes(q) || itemFormat.includes(q);
    
    let matchesFormat = true;
    if (formatFilter === 'Mock exams') {
      matchesFormat = itemFormat.includes('mock') || itemFormat.includes('exam');
    } else if (formatFilter === 'Quizzes') {
      matchesFormat = itemFormat.includes('quiz');
    } else if (formatFilter === 'Question banks') {
      matchesFormat = itemFormat.includes('bank') || itemFormat.includes('question');
    }

    const matchesSubject = subjectFilter === 'All subjects' || item.subject.toLowerCase() === subjectFilter.toLowerCase();

    return matchesSearch && matchesFormat && matchesSubject;
  });

  return (
    <>
      <section className="content">
        <div className="heading">
          <div>
            <h1 id="title">Assessment dashboard</h1>
            <p>Build reliable assessments, monitor delivery and protect academic integrity.</p>
          </div>
          <button className="btn" onClick={() => setIsModalOpen(true)}>
            ＋ Create assessment
          </button>
        </div>

        <div className="kpis">
          <article className="card kpi">
            <div className="kh">Question bank <i className="ki">?</i></div>
            <div className="num">18,642</div>
            <div className="up">↗ 326 <span>approved items</span></div>
          </article>
          <article className="card kpi">
            <div className="kh">Live assessments <i className="ki">◉</i></div>
            <div className="num">37</div>
            <div className="up">↗ 8 <span>this week</span></div>
          </article>
          <article className="card kpi">
            <div className="kh">Pending marking <i className="ki">!</i></div>
            <div className="num">1,284</div>
            <div className="up">↘ 14% <span>from yesterday</span></div>
          </article>
          <article className="card kpi">
            <div className="kh">Integrity score <i className="ki">✓</i></div>
            <div className="num">98.7%</div>
            <div className="up">↗ 0.4% <span>platform-wide</span></div>
          </article>
        </div>

        <div className="grid">
          <article className="card">
            <div className="ph">
              <div>
                <h2>Live assessment control</h2>
                <p>Today's highest-volume learning checks</p>
              </div>
              <button className="link" onClick={() => showToast('Exam monitoring console opened.')}>
                Monitor all →
              </button>
            </div>
            <div className="examrow">
              <div className="exam">
                <b>Form 4 Mock Exam</b>
                <small>Mathematics · 4,826 attempts</small>
                <div className="bar"><i style={{ width: '78%' }}></i></div>
                <footer><span>Completion</span><b>78%</b></footer>
              </div>
              <div className="exam">
                <b>IGCSE Biology Quiz</b>
                <small>Cambridge · 1,167 attempts</small>
                <div className="bar"><i style={{ width: '64%', background: '#d69f4c' }}></i></div>
                <footer><span>Completion</span><b>64%</b></footer>
              </div>
              <div className="exam">
                <b>NECTA Physics Practice</b>
                <small>Form 6 · 792 attempts</small>
                <div className="bar"><i style={{ width: '91%', background: '#96314c' }}></i></div>
                <footer><span>Completion</span><b>91%</b></footer>
              </div>
            </div>
          </article>

          <article className="card">
            <div className="ph">
              <div>
                <h2>Integrity watch</h2>
                <p>Signals requiring review</p>
              </div>
            </div>
            <div className="integrity">
              <div className="flag">
                <b>12 sessions need attention</b>
                <p>Unusual answer-pattern similarity detected in the Form 4 Mathematics Mock Exam.</p>
              </div>
              <ul className="ilist">
                <li><b>3</b> timed-exam session interruptions</li>
                <li><b>7</b> question items below reliability threshold</li>
                <li><b>2</b> marking exceptions awaiting review</li>
              </ul>
            </div>
          </article>
        </div>

        <div className="work">
          <article className="card">
            <div className="ph">
              <div>
                <h2>Assessment library</h2>
                <p>Question banks, exams, quizzes and practice tests</p>
              </div>
              <button className="link" onClick={handleExportList}>
                Export list ↗
              </button>
            </div>
            <div className="bank">
              <div className="filters">
                <button 
                  className={formatFilter === 'All' ? 'on' : ''} 
                  onClick={() => setFormatFilter('All')}
                >
                  All assessments
                </button>
                <button 
                  className={formatFilter === 'Mock exams' ? 'on' : ''} 
                  onClick={() => {
                    setFormatFilter('Mock exams');
                    showToast('Showing mock exams.');
                  }}
                >
                  Mock exams
                </button>
                <button 
                  className={formatFilter === 'Quizzes' ? 'on' : ''} 
                  onClick={() => {
                    setFormatFilter('Quizzes');
                    showToast('Showing quizzes.');
                  }}
                >
                  Quizzes
                </button>
                <button 
                  className={formatFilter === 'Question banks' ? 'on' : ''} 
                  onClick={() => {
                    setFormatFilter('Question banks');
                    showToast('Showing question banks.');
                  }}
                >
                  Question banks
                </button>
                <select 
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                >
                  <option>All subjects</option>
                  <option>Mathematics</option>
                  <option>Biology</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                </select>
                <div className="filterin">
                  <input 
                    id="filter" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter assessments" 
                  />
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Assessment</th>
                    <th>Subject</th>
                    <th>Format</th>
                    <th>Attempts</th>
                    <th>Average</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody id="rows">
                  {filteredAssessments.length > 0 ? (
                    filteredAssessments.map((item, idx) => {
                      const pillCls = item.status === 'Live' ? 'live' : item.status === 'Review' ? 'review' : 'draft';
                      return (
                        <tr key={item.id || idx}>
                          <td>
                            <div className="assess">
                              <i>{item.icon || '✓'}</i>
                              {item.title}
                            </div>
                          </td>
                          <td className="mut">{item.subject}</td>
                          <td>{item.format || item.type || 'Assessment'}</td>
                          <td>{item.attempts ? item.attempts.toLocaleString() : '—'}</td>
                          <td>{typeof item.avgScore === 'number' ? `${item.avgScore}%` : '—'}</td>
                          <td>
                            <span className={`pill ${pillCls}`}>
                              {item.status}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="link" 
                              onClick={() => showToast(`Opening ${item.title}…`)}
                            >
                              Open
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '24px', color: '#6b7a78' }}>
                        No assessments found matching the filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </article>

          <aside className="card sidepad">
            <div className="sec">
              <div className="mt">
                Marking queue 
                <button className="link" onClick={() => showToast('Marking queue opened.')}>View all</button>
              </div>
              <div className="task">
                <div className="tic">✓</div>
                <div>
                  <b>NECTA Essay responses</b>
                  <p>842 answers awaiting markers</p>
                </div>
                <button onClick={() => showToast('Markers assigned.')}>Assign</button>
              </div>
              <div className="task">
                <div className="tic">?</div>
                <div>
                  <b>Question validation</b>
                  <p>31 items need expert review</p>
                </div>
                <button onClick={() => showToast('Validation queue opened.')}>Review</button>
              </div>
              <div className="task">
                <div className="tic">!</div>
                <div>
                  <b>Flagged learner attempts</b>
                  <p>12 sessions need integrity check</p>
                </div>
                <button onClick={() => showToast('Integrity queue opened.')}>Check</button>
              </div>
            </div>

            <div className="sec">
              <div className="mt">Question quality</div>
              <div className="metric">
                <span>Reliable</span>
                <div className="bar"><i style={{ width: '81%' }}></i></div>
                <b>81%</b>
              </div>
              <div className="metric">
                <span>Review</span>
                <div className="bar"><i style={{ width: '14%', background: '#d69f4c' }}></i></div>
                <b>14%</b>
              </div>
              <div className="metric">
                <span>Retire</span>
                <div className="bar"><i style={{ width: '5%', background: '#96314c' }}></i></div>
                <b>5%</b>
              </div>
            </div>

            <div className="sec">
              <div className="mt">Quick actions</div>
              <button className="link" onClick={() => showToast('Bulk question import opened.')}>Import question bank →</button>
              <br /><br />
              <button className="link" onClick={() => showToast('Marking rules editor opened.')}>Configure marking rules →</button>
              <br /><br />
              <button className="link" onClick={() => showToast('Exam results report generated.')}>Generate results report →</button>
            </div>
          </aside>
        </div>
      </section>

      {/* Modal: Create Assessment */}
      <div className={`modalback ${isModalOpen ? 'show' : ''}`} id="modal" onClick={() => setIsModalOpen(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h2>Create assessment</h2>
          <p>Configure a new exam, quiz or question bank in the assessment operations platform.</p>
          <label>Assessment title</label>
          <input 
            id="assTitle" 
            value={assessmentTitle}
            onChange={(e) => setAssessmentTitle(e.target.value)}
            placeholder="e.g. Form 4 Biology Mid-Term Exam" 
          />
          <label>Subject</label>
          <select 
            value={assessmentSubject}
            onChange={(e) => setAssessmentSubject(e.target.value)}
          >
            <option>Mathematics</option>
            <option>Biology</option>
            <option>Physics</option>
            <option>Chemistry</option>
            <option>English Language</option>
          </select>
          <label>Assessment format</label>
          <select 
            value={assessmentFormat}
            onChange={(e) => setAssessmentFormat(e.target.value)}
          >
            <option>Mock exam</option>
            <option>Quiz</option>
            <option>Question bank</option>
            <option>Test</option>
          </select>
          <div className="mf">
            <button className="btn ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button className="btn" onClick={handleCreateAssessment}>
              Create assessment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
