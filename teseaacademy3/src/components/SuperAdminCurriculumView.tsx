import React, { useState, useEffect } from 'react';
import { fetchCurricula, saveCurriculumItem, CurriculumItem } from '../lib/learningService';

interface SuperAdminCurriculumViewProps {
  showToast: (msg: string) => void;
  adminName?: string;
}

export default function SuperAdminCurriculumView({ showToast, adminName = 'Emmanuel E.' }: SuperAdminCurriculumViewProps) {
  const [curricula, setCurricula] = useState<CurriculumItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [frameworkFilter, setFrameworkFilter] = useState<'All' | 'NECTA' | 'Cambridge' | 'Life-long'>('All');
  const [levelFilter, setLevelFilter] = useState('All levels');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState('Learning outcome');
  const [selectedFramework, setSelectedFramework] = useState('NECTA CBC 2023');

  const loadData = async () => {
    try {
      setLoading(true);
      const list = await fetchCurricula();
      setCurricula(list);
    } catch (e) {
      console.error('Error loading curricula:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateItem = async () => {
    const nameToUse = itemName.trim() || 'Curriculum item';
    try {
      const created = await saveCurriculumItem({
        name: nameToUse,
        framework: selectedFramework,
        level: itemType === 'Learning outcome' ? 'Form 1–4' : 'Form 5–6',
        outcomes: Math.floor(Math.random() * 50) + 50,
        coverage: '90%',
        status: 'Aligned',
        icon: nameToUse.charAt(0) || '◫'
      });

      setCurricula(prev => [created, ...prev]);
      setIsModalOpen(false);
      setItemName('');
      showToast(`${nameToUse} added to the curriculum map.`);
    } catch (e) {
      showToast('Failed to add curriculum item.');
    }
  };

  const handleExportMap = () => {
    const rows = [
      ['Subject Pathway', 'Framework', 'Level', 'Outcomes', 'Coverage', 'Review Status'],
      ...curricula.map(c => [c.name, c.framework, c.level, c.outcomes.toString(), c.coverage, c.status])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.map(x => `"${x}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TESEA_Curriculum_Map_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Curriculum map export prepared.');
  };

  const filteredCurricula = curricula.filter(item => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || item.name.toLowerCase().includes(q) || item.framework.toLowerCase().includes(q) || item.level.toLowerCase().includes(q);
    
    let matchesFramework = true;
    if (frameworkFilter === 'NECTA') {
      matchesFramework = item.framework.toLowerCase().includes('necta');
    } else if (frameworkFilter === 'Cambridge') {
      matchesFramework = item.framework.toLowerCase().includes('cambridge');
    } else if (frameworkFilter === 'Life-long') {
      matchesFramework = item.framework.toLowerCase().includes('professional') || item.framework.toLowerCase().includes('life-long') || item.framework.toLowerCase().includes('career');
    }

    let matchesLevel = true;
    if (levelFilter === 'Form 1–4') {
      matchesLevel = item.level.includes('Form 1–4') || item.level.includes('Form 1–6') || item.level.includes('Years');
    } else if (levelFilter === 'Form 5–6') {
      matchesLevel = item.level.includes('Form 5–6') || item.level.includes('Form 1–6') || item.level.includes('Form 3–6');
    }

    return matchesSearch && matchesFramework && matchesLevel;
  });

  return (
    <>
      <section className="content">
        <div className="heading">
          <div>
            <h1 id="title">Curriculum dashboard</h1>
            <p>Map, align and govern every learning pathway across TESEA Academy.</p>
          </div>
          <button className="btn" id="new" onClick={() => setIsModalOpen(true)}>
            ＋ Add curriculum item
          </button>
        </div>

        <div className="kpis">
          <article className="card kpi">
            <div className="kh">Active curricula <i className="ki">◫</i></div>
            <div className="num">{curricula.length.toLocaleString()}</div>
            <div className="up">{curricula.length > 0 ? '↗ 2' : '0'} <span>updated this term</span></div>
          </article>
          <article className="card kpi">
            <div className="kh">Subjects & pathways <i className="ki">▤</i></div>
            <div className="num">{curricula.length.toLocaleString()}</div>
            <div className="up">{curricula.length > 0 ? '↗ 6' : '0'} <span>new pathways</span></div>
          </article>
          <article className="card kpi">
            <div className="kh">Coverage gaps <i className="ki">!</i></div>
            <div className="num">{curricula.filter(c => c.status === 'Needs review').length}</div>
            <div className="up">{curricula.length > 0 ? '↘ 8' : '0'} <span>from last review</span></div>
          </article>
          <article className="card kpi">
            <div className="kh">Alignment score <i className="ki">✓</i></div>
            <div className="num">{curricula.length > 0 ? `${Math.round((curricula.filter(c => c.status === 'Aligned').length / curricula.length) * 100)}%` : '0%'}</div>
            <div className="up">{curricula.length > 0 ? '↗ 0.9%' : '0%'} <span>NECTA standard</span></div>
          </article>
        </div>

        <div className="grid">
          <article className="card">
            <div className="ph">
              <div>
                <h2>Programme coverage</h2>
                <p>Mapped learning outcomes across every TESEA programme</p>
              </div>
              <button className="link" onClick={() => showToast('Curriculum coverage report opened.')}>
                View report →
              </button>
            </div>
            <div className="coverage">
              <div className="program">
                <b>NECTA Secondary</b>
                <small>Form 1–6 · 27 subjects</small>
                <div className="bar"><i style={{ width: '96%' }}></i></div>
                <footer><span>Outcome coverage</span><b>96%</b></footer>
              </div>
              <div className="program">
                <b>Cambridge</b>
                <small>Lower secondary · IGCSE</small>
                <div className="bar"><i style={{ width: '84%', background: '#d69f4c' }}></i></div>
                <footer><span>Outcome coverage</span><b>84%</b></footer>
              </div>
              <div className="program">
                <b>Life-long Learning</b>
                <small>Professional & career tracks</small>
                <div className="bar"><i style={{ width: '72%', background: '#96314c' }}></i></div>
                <footer><span>Pathway coverage</span><b>72%</b></footer>
              </div>
              <div className="program">
                <b>Foundation archive</b>
                <small>Revision & core skills</small>
                <div className="bar"><i style={{ width: '91%', background: '#6552bd' }}></i></div>
                <footer><span>Outcome coverage</span><b>91%</b></footer>
              </div>
            </div>
          </article>

          <article className="card">
            <div className="ph">
              <div>
                <h2>Alignment signal</h2>
                <p>Curriculum intelligence</p>
              </div>
            </div>
            <div className="signal">
              <div className="signalbox">
                <b>Priority gap identified</b>
                <p>Form 3 Physics: Electricity has incomplete practical application outcomes in the current content map.</p>
              </div>
              <ul>
                <li><b>12</b> learning outcomes need reviewer sign-off</li>
                <li><b>7</b> topics are due for syllabus refresh</li>
                <li><b>4</b> competency maps require translation review</li>
              </ul>
            </div>
          </article>
        </div>

        <div className="work">
          <article className="card">
            <div className="ph">
              <div>
                <h2>Curriculum map</h2>
                <p>Subject pathways and syllabus readiness</p>
              </div>
              <button className="link" onClick={handleExportMap}>
                Export map ↗
              </button>
            </div>
            <div className="map">
              <div className="filters">
                <button 
                  className={frameworkFilter === 'All' ? 'on' : ''} 
                  onClick={() => setFrameworkFilter('All')}
                >
                  All pathways
                </button>
                <button 
                  className={frameworkFilter === 'NECTA' ? 'on' : ''} 
                  onClick={() => {
                    setFrameworkFilter('NECTA');
                    showToast('Showing NECTA pathways.');
                  }}
                >
                  NECTA
                </button>
                <button 
                  className={frameworkFilter === 'Cambridge' ? 'on' : ''} 
                  onClick={() => {
                    setFrameworkFilter('Cambridge');
                    showToast('Showing Cambridge pathways.');
                  }}
                >
                  Cambridge
                </button>
                <button 
                  className={frameworkFilter === 'Life-long' ? 'on' : ''} 
                  onClick={() => {
                    setFrameworkFilter('Life-long');
                    showToast('Showing career pathways.');
                  }}
                >
                  Life-long
                </button>
                <select 
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                >
                  <option>All levels</option>
                  <option>Form 1–4</option>
                  <option>Form 5–6</option>
                </select>
                <div className="filterin">
                  <input 
                    id="filter" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter subjects" 
                  />
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Subject pathway</th>
                    <th>Framework</th>
                    <th>Level</th>
                    <th>Outcomes</th>
                    <th>Coverage</th>
                    <th>Review</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody id="rows">
                  {filteredCurricula.length > 0 ? (
                    filteredCurricula.map((item, idx) => {
                      const isOk = item.status === 'Aligned';
                      const iconCls = item.iconClass === 'r' ? 'r' : item.iconClass === 'a' ? 'a' : '';
                      return (
                        <tr key={item.id || idx}>
                          <td>
                            <div className="subject">
                              <i className={iconCls}>{item.icon || '◫'}</i>
                              {item.name}
                            </div>
                          </td>
                          <td className="mut">{item.framework}</td>
                          <td>{item.level}</td>
                          <td>{item.outcomes}</td>
                          <td>{item.coverage}</td>
                          <td>
                            <span className={`pill ${isOk ? 'ok' : 'review'}`}>
                              {item.status}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="link" 
                              onClick={() => showToast(`Opening ${item.name} curriculum map…`)}
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
                        No curriculum pathways found matching filters.
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
                Approval queue 
                <button className="link" onClick={() => showToast('Approval queue opened.')}>View all</button>
              </div>
              <div className="task">
                <div className="tic">!</div>
                <div>
                  <b>Physics practical outcomes</b>
                  <p>8 items need academic sign-off</p>
                </div>
                <button onClick={() => showToast('Physics review opened.')}>Review</button>
              </div>
              <div className="task">
                <div className="tic">◫</div>
                <div>
                  <b>Form 5 Biology refresh</b>
                  <p>Version 3.2 is awaiting approval</p>
                </div>
                <button onClick={() => showToast('Biology review opened.')}>Review</button>
              </div>
              <div className="task">
                <div className="tic">✓</div>
                <div>
                  <b>IGCSE English mapping</b>
                  <p>Translation review is required</p>
                </div>
                <button onClick={() => showToast('Translation review opened.')}>Assign</button>
              </div>
            </div>

            <div className="sec">
              <div className="mt">Current versions</div>
              <div className="version">
                <i></i>
                <span>
                  <b>NECTA CBC 2023</b>
                  <small>v3.2 · Last synced today</small>
                </span>
              </div>
              <div className="version">
                <i style={{ background: '#d69f4c' }}></i>
                <span>
                  <b>Cambridge IGCSE</b>
                  <small>v2.8 · Review in 14 days</small>
                </span>
              </div>
              <div className="version">
                <i style={{ background: '#96314c' }}></i>
                <span>
                  <b>Professional pathways</b>
                  <small>v1.9 · Updated 4 days ago</small>
                </span>
              </div>
            </div>

            <div className="sec">
              <div className="mt">Quick actions</div>
              <button className="link" onClick={() => showToast('Syllabus import wizard opened.')}>Import syllabus →</button>
              <br /><br />
              <button className="link" onClick={() => showToast('Outcome mapper opened.')}>Map learning outcomes →</button>
              <br /><br />
              <button className="link" onClick={() => showToast('Governance audit generated.')}>Run alignment audit →</button>
            </div>
          </aside>
        </div>
      </section>

      {/* Modal: Add curriculum item */}
      <div className={`modalback ${isModalOpen ? 'show' : ''}`} id="modal" onClick={() => setIsModalOpen(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h2>Add curriculum item</h2>
          <p>Create a subject, strand, topic or learning outcome in the current curriculum.</p>
          <label>Item name</label>
          <input 
            id="item" 
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="e.g. Electricity: Practical applications" 
          />
          <label>Item type</label>
          <select 
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
          >
            <option>Learning outcome</option>
            <option>Topic</option>
            <option>Subject pathway</option>
            <option>Programme framework</option>
          </select>
          <label>Curriculum framework</label>
          <select 
            value={selectedFramework}
            onChange={(e) => setSelectedFramework(e.target.value)}
          >
            <option>NECTA CBC 2023</option>
            <option>Cambridge IGCSE</option>
            <option>Professional pathways</option>
          </select>
          <div className="mf">
            <button className="btn ghost" id="cancel" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button className="btn" id="save" onClick={handleCreateItem}>
              Create item
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
