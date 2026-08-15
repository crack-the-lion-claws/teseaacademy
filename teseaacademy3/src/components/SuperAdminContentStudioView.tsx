import React, { useState, useEffect } from 'react';
import { fetchLiveAdminAnalytics, saveLearningContent, LearningContent } from '../lib/learningService';

interface SuperAdminContentStudioViewProps {
  showToast: (msg: string) => void;
  adminName?: string;
}

export default function SuperAdminContentStudioView({ showToast, adminName = 'Emmanuel E.' }: SuperAdminContentStudioViewProps) {
  const [contents, setContents] = useState<LearningContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [formatFilter, setFormatFilter] = useState<'All' | 'Video' | 'Documents' | 'Assessments'>('All');
  const [subjectFilter, setSubjectFilter] = useState('All subjects');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetTitle, setAssetTitle] = useState('');
  const [assetFormat, setAssetFormat] = useState('Video lesson');
  const [assetSubject, setAssetSubject] = useState('Mathematics');

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchLiveAdminAnalytics();
      setContents(data.recentContents || []);
    } catch (e) {
      console.error('Error fetching content studio data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateContent = async () => {
    const title = assetTitle.trim() || 'New learning asset';
    try {
      const formatType = assetFormat.toLowerCase().includes('video') 
        ? 'video' 
        : assetFormat.toLowerCase().includes('audio') 
        ? 'audio' 
        : assetFormat.toLowerCase().includes('document') 
        ? 'pdf' 
        : 'text';

      const created = await saveLearningContent({
        title,
        meta: `${assetSubject} · Form 4`,
        format: assetFormat,
        formatType,
        author: adminName || 'Emmanuel E.',
        status: 'Draft'
      });

      setContents(prev => [created, ...prev]);
      setIsModalOpen(false);
      setAssetTitle('');
      showToast(`${title} created as a draft.`);
    } catch (e) {
      showToast('Error creating learning asset.');
    }
  };

  const handleExportList = () => {
    const rows = [
      ['Learning Asset', 'Format', 'Owner', 'Status'],
      ...contents.map(c => [c.title, c.format, c.author, c.status])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.map(x => `"${x}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TESEA_Content_Library_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Content library export is prepared.');
  };

  // Filter content items
  const filteredContents = contents.filter(item => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || item.title.toLowerCase().includes(q) || item.author.toLowerCase().includes(q) || item.meta.toLowerCase().includes(q);
    
    let matchesFormat = true;
    if (formatFilter === 'Video') {
      matchesFormat = item.format.toLowerCase().includes('video') || item.formatType === 'video';
    } else if (formatFilter === 'Documents') {
      matchesFormat = item.format.toLowerCase().includes('document') || item.format.toLowerCase().includes('pdf') || item.formatType === 'pdf' || item.formatType === 'text';
    } else if (formatFilter === 'Assessments') {
      matchesFormat = item.format.toLowerCase().includes('assessment') || item.format.toLowerCase().includes('quiz') || item.format.toLowerCase().includes('test');
    }

    const matchesSubject = subjectFilter === 'All subjects' || item.meta.toLowerCase().includes(subjectFilter.toLowerCase());

    return matchesSearch && matchesFormat && matchesSubject;
  });

  const publishedCount = contents.filter(c => c.status === 'Published').length || 4826;
  const inProductionCount = contents.filter(c => c.status === 'Draft' || c.status === 'In review').length || 168;
  const awaitingReviewCount = contents.filter(c => c.status === 'In review').length || 42;

  // Fallback demo contents if none registered yet
  const defaultItems = [
    {
      title: 'Quadratic Equations: The Complete Method',
      format: 'Video lesson',
      author: 'Dr. M. Lema',
      completion: 92,
      updated: '12 mins ago',
      status: 'In review' as const,
      thumbClass: 'thumb',
      thumbIcon: '▶',
      statusClass: 'status approval'
    },
    {
      title: 'Organic Chemistry Revision Notes',
      format: 'Document',
      author: 'A. Juma',
      completion: 100,
      updated: 'Today',
      status: 'Published' as const,
      thumbClass: 'thumb t2',
      thumbIcon: '▤',
      statusClass: 'status published'
    },
    {
      title: 'Form 4 Biology: Genetics Quiz',
      format: 'Assessment',
      author: 'R. Mollel',
      completion: 71,
      updated: 'Yesterday',
      status: 'Published' as const,
      thumbClass: 'thumb t3',
      thumbIcon: '✓',
      statusClass: 'status published'
    },
    {
      title: 'Listening Skills: Job Interviews',
      format: 'Audio lesson',
      author: 'S. Mushi',
      completion: 46,
      updated: '2 days ago',
      status: 'Draft' as const,
      thumbClass: 'thumb t4',
      thumbIcon: '♫',
      statusClass: 'status draft'
    },
    {
      title: 'Cells and Systems: Interactive Lab',
      format: 'Activity',
      author: 'G. Kweka',
      completion: 83,
      updated: '3 days ago',
      status: 'In review' as const,
      thumbClass: 'thumb',
      thumbIcon: '♜',
      statusClass: 'status approval'
    }
  ];

  return (
    <>
      <section className="content">
        <div className="heading">
          <div>
            <h1 id="title">Content studio</h1>
            <p>Create, govern and publish the learning experiences powering TESEA Academy.</p>
          </div>
          <button className="button" id="newContent" onClick={() => setIsModalOpen(true)}>
            ＋ Create content
          </button>
        </div>

        <div className="kpis">
          <article className="card kpi">
            <div className="kpi-head">Published lessons <i className="kicon a">▤</i></div>
            <div className="number">{publishedCount.toLocaleString()}</div>
            <div className="up">↗ 84 <span>this month</span></div>
          </article>
          <article className="card kpi">
            <div className="kpi-head">In production <i className="kicon b">◌</i></div>
            <div className="number">{inProductionCount.toLocaleString()}</div>
            <div className="up">↗ 16 <span>this week</span></div>
          </article>
          <article className="card kpi">
            <div className="kpi-head">Awaiting review <i className="kicon c">!</i></div>
            <div className="number">{awaitingReviewCount.toLocaleString()}</div>
            <div className="up">↘ 11 <span>from yesterday</span></div>
          </article>
          <article className="card kpi">
            <div className="kpi-head">Content quality <i className="kicon d">✦</i></div>
            <div className="number">94.8%</div>
            <div className="up">↗ 1.7% <span>QA score</span></div>
          </article>
        </div>

        <div className="grid">
          <article className="card">
            <div className="panel-head">
              <div>
                <h2>Production pipeline</h2>
                <p>Every asset, from brief to learner-ready content</p>
              </div>
              <button className="link" onClick={() => showToast('Production board opened.')}>Open board →</button>
            </div>
            <div className="pipeline">
              <div className="stage"><small>Drafting</small><b>68</b><em>+12 this week</em></div>
              <div className="stage"><small>Editorial review</small><b>42</b><em>12 need action</em></div>
              <div className="stage"><small>Production</small><b>31</b><em>6 filming today</em></div>
              <div className="stage"><small>Ready to publish</small><b>27</b><em>8 scheduled</em></div>
            </div>
          </article>

          <article className="card">
            <div className="panel-head">
              <div>
                <h2>Quality signal</h2>
                <p>AI-assisted editorial governance</p>
              </div>
            </div>
            <div className="quality">
              <div className="quality-box">
                <b>Mathematics content review</b>
                <p>18 lessons have strong learner completion but low quiz accuracy. Flag explanations for editor review.</p>
              </div>
              <div className="quality-list">
                <div className="quality-item"><span>Curriculum alignment</span><b>98.2%</b></div>
                <div className="quality-item"><span>Swahili clarity score</span><b>95.7%</b></div>
                <div className="quality-item"><span>Media accessibility</span><b>90.4%</b></div>
              </div>
            </div>
          </article>
        </div>

        <div className="workspace">
          <article className="card">
            <div className="panel-head">
              <div>
                <h2>Content library</h2>
                <p>Manage lessons, media, documents and learning activities</p>
              </div>
              <button className="link" onClick={handleExportList}>Export list ↗</button>
            </div>
            <div className="library">
              <div className="filters">
                <button 
                  className={formatFilter === 'All' ? 'selected' : ''}
                  onClick={() => setFormatFilter('All')}
                >
                  All content
                </button>
                <button 
                  className={formatFilter === 'Video' ? 'selected' : ''}
                  onClick={() => {
                    setFormatFilter('Video');
                    showToast('Showing video content.');
                  }}
                >
                  Video
                </button>
                <button 
                  className={formatFilter === 'Documents' ? 'selected' : ''}
                  onClick={() => {
                    setFormatFilter('Documents');
                    showToast('Showing documents.');
                  }}
                >
                  Documents
                </button>
                <button 
                  className={formatFilter === 'Assessments' ? 'selected' : ''}
                  onClick={() => {
                    setFormatFilter('Assessments');
                    showToast('Showing assessments.');
                  }}
                >
                  Assessments
                </button>
                <select 
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                >
                  <option>All subjects</option>
                  <option>Mathematics</option>
                  <option>Biology</option>
                  <option>English</option>
                  <option>Chemistry</option>
                </select>
                <div className="table-search">
                  <input 
                    id="filter" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter content" 
                  />
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Learning asset</th>
                    <th>Format</th>
                    <th>Owner</th>
                    <th>Completion</th>
                    <th>Updated</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody id="rows">
                  {filteredContents.length > 0 ? (
                    filteredContents.map((item, idx) => {
                      const isPublished = item.status === 'Published';
                      const isInReview = item.status === 'In review';
                      const statusCls = isPublished ? 'published' : isInReview ? 'approval' : 'draft';
                      const thumbCls = item.formatType === 'video' ? 'thumb' : item.formatType === 'audio' ? 'thumb t4' : item.formatType === 'pdf' ? 'thumb t2' : 'thumb t3';
                      const thumbIcon = item.formatType === 'video' ? '▶' : item.formatType === 'audio' ? '♫' : item.formatType === 'pdf' ? '▤' : '✓';

                      return (
                        <tr key={item.id || idx}>
                          <td>
                            <div className="content-item">
                              <i className={thumbCls}>{thumbIcon}</i>
                              {item.title}
                            </div>
                          </td>
                          <td className="muted">{item.format || 'Lesson'}</td>
                          <td>{item.author || 'Dr. M. Lema'}</td>
                          <td>
                            <span className="progress"><i style={{ width: isPublished ? '100%' : '75%' }}></i></span>
                            {isPublished ? '100%' : '75%'}
                          </td>
                          <td className="muted">Recently</td>
                          <td><span className={`status ${statusCls}`}>{item.status}</span></td>
                          <td>
                            <button 
                              className="link" 
                              onClick={() => showToast(`Opening editor for ${item.title}…`)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    defaultItems.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="content-item">
                            <i className={item.thumbClass}>{item.thumbIcon}</i>
                            {item.title}
                          </div>
                        </td>
                        <td className="muted">{item.format}</td>
                        <td>{item.author}</td>
                        <td>
                          <span className="progress"><i style={{ width: `${item.completion}%` }}></i></span>
                          {item.completion}%
                        </td>
                        <td className="muted">{item.updated}</td>
                        <td><span className={item.statusClass}>{item.status}</span></td>
                        <td>
                          <button 
                            className="link" 
                            onClick={() => showToast(`Opening ${item.format.toLowerCase()} editor…`)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </article>

          <aside className="card sidepad">
            <div className="side-sec">
              <div className="mini-title">
                Editorial inbox 
                <button className="link" onClick={() => showToast('Editorial inbox opened.')}>View all</button>
              </div>
              <div className="task">
                <div className="task-icon">!</div>
                <div>
                  <b>12 lessons need curriculum approval</b>
                  <p>Form 5 Mathematics · due today</p>
                </div>
                <button onClick={() => showToast('Approval queue opened.')}>Review</button>
              </div>
              <div className="task">
                <div className="task-icon">▶</div>
                <div>
                  <b>6 video renders are complete</b>
                  <p>Ready for media quality check</p>
                </div>
                <button onClick={() => showToast('Media review opened.')}>Check</button>
              </div>
              <div className="task">
                <div className="task-icon">✦</div>
                <div>
                  <b>Accessibility checks require action</b>
                  <p>4 assets missing captions</p>
                </div>
                <button onClick={() => showToast('Accessibility audit opened.')}>Fix</button>
              </div>
            </div>

            <div className="side-sec">
              <div className="mini-title">Library by format</div>
              <div className="filetypes">
                <div className="filetype">Video<b>1,584</b></div>
                <div className="filetype">Documents<b>1,906</b></div>
                <div className="filetype">Assessments<b>892</b></div>
                <div className="filetype">Audio & others<b>444</b></div>
              </div>
            </div>

            <div className="side-sec">
              <div className="mini-title">Quick actions</div>
              <button className="link" onClick={() => showToast('Bulk uploader opened.')}>Upload media assets →</button>
              <br /><br />
              <button className="link" onClick={() => showToast('Content import wizard opened.')}>Import course package →</button>
              <br /><br />
              <button className="link" onClick={() => showToast('Publishing calendar opened.')}>Open publishing calendar →</button>
            </div>
          </aside>
        </div>
      </section>

      {/* Modal: Create learning content */}
      <div className={`modal-wrap ${isModalOpen ? 'show' : ''}`} id="modal" onClick={() => setIsModalOpen(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h2>Create learning content</h2>
          <p>Start a new learning asset and send it into the editorial workflow.</p>
          <label>Content title</label>
          <input 
            id="assetName" 
            value={assetTitle}
            onChange={(e) => setAssetTitle(e.target.value)}
            placeholder="e.g. Trigonometry: Revision Sprint" 
          />
          <label>Asset format</label>
          <select 
            value={assetFormat}
            onChange={(e) => setAssetFormat(e.target.value)}
          >
            <option>Video lesson</option>
            <option>Document</option>
            <option>Audio lesson</option>
            <option>Assessment</option>
            <option>Interactive activity</option>
          </select>
          <label>Subject</label>
          <select 
            value={assetSubject}
            onChange={(e) => setAssetSubject(e.target.value)}
          >
            <option>Mathematics</option>
            <option>Biology</option>
            <option>English</option>
            <option>Chemistry</option>
          </select>
          <div className="modal-footer">
            <button className="button ghost" id="cancel" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button className="button" id="create" onClick={handleCreateContent}>
              Create draft
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
