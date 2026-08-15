import React, { useState, useEffect } from 'react';
import { fetchSchoolPartners, createSchoolPartner, SchoolPartnerItem } from '../lib/learningService';

interface SuperAdminSchoolsViewProps {
  showToast: (msg: string) => void;
  adminName?: string;
}

export default function SuperAdminSchoolsView({ showToast, adminName = 'Emmanuel E.' }: SuperAdminSchoolsViewProps) {
  const [schools, setSchools] = useState<SchoolPartnerItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Onboarding' | 'Renewals'>('All');
  const [regionFilter, setRegionFilter] = useState('All regions');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schoolName, setSchoolName] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Dar es Salaam');
  const [learnerSeats, setLearnerSeats] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const list = await fetchSchoolPartners();
      setSchools(list);
    } catch (e) {
      console.error('Error loading school partners:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateSchool = async () => {
    const nameToUse = schoolName.trim() || 'New school';
    try {
      const newSchool = await createSchoolPartner({
        name: nameToUse,
        region: selectedRegion,
        seats: learnerSeats.trim() || '500'
      });
      setSchools(prev => [newSchool, ...prev]);
      setIsModalOpen(false);
      setSchoolName('');
      setLearnerSeats('');
      showToast(`${nameToUse} created successfully.`);
    } catch (e) {
      showToast('Error creating school partner.');
    }
  };

  const filteredSchools = schools.filter(item => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || item.name.toLowerCase().includes(q) || item.region.toLowerCase().includes(q);

    let matchesStatus = true;
    if (statusFilter === 'Active') {
      matchesStatus = item.health === 'Healthy';
    } else if (statusFilter === 'Onboarding') {
      matchesStatus = item.health === 'Watch';
    } else if (statusFilter === 'Renewals') {
      matchesStatus = item.seatsUsed.includes('9') || item.seatsUsed.includes('88');
    }

    let matchesRegionSelect = true;
    if (regionFilter !== 'All regions') {
      matchesRegionSelect = item.region === regionFilter;
    }

    return matchesSearch && matchesStatus && matchesRegionSelect;
  });

  return (
    <>
      <section className="content">
        <div className="heading">
          <div>
            <h1 id="title">School management</h1>
            <p>Grow and support the institutions giving learners access to TESEA Academy.</p>
          </div>
          <button className="btn" id="new" onClick={() => setIsModalOpen(true)}>
            ＋ Add school
          </button>
        </div>

        <div className="kpis">
          <article className="card kpi">
            <div className="khead">Partner schools <i className="kicon">⌂</i></div>
            <div className="num">386</div>
            <div className="trend">↗ 24 <span>this month</span></div>
          </article>
          <article className="card kpi">
            <div className="khead">School learners <i className="kicon">♙</i></div>
            <div className="num">69,438</div>
            <div className="trend">↗ 12.4% <span>active this week</span></div>
          </article>
          <article className="card kpi">
            <div className="khead">Institutional licences <i className="kicon">◇</i></div>
            <div className="num">54,200</div>
            <div className="trend">↗ 3,680 <span>available seats</span></div>
          </article>
          <article className="card kpi">
            <div className="khead">School health score <i className="kicon">✓</i></div>
            <div className="num">88.6%</div>
            <div className="trend">↗ 2.8% <span>portfolio average</span></div>
          </article>
        </div>

        <div className="grid">
          <article className="card">
            <div className="ph">
              <div>
                <h2>Regional adoption</h2>
                <p>School partnerships and learner participation by priority region</p>
              </div>
              <button className="link" onClick={() => showToast('Regional adoption report opened.')}>
                View map →
              </button>
            </div>
            <div className="regions">
              <div className="region">
                <b>Dar es Salaam</b>
                <small>104 schools · 21,846 learners</small>
                <div className="bar"><i style={{ width: '92%' }}></i></div>
                <footer><span>Activation</span><b>92%</b></footer>
              </div>
              <div className="region">
                <b>Arusha</b>
                <small>68 schools · 11,360 learners</small>
                <div className="bar"><i style={{ width: '75%', background: '#d69f4c' }}></i></div>
                <footer><span>Activation</span><b>75%</b></footer>
              </div>
              <div className="region">
                <b>Dodoma</b>
                <small>56 schools · 9,824 learners</small>
                <div className="bar"><i style={{ width: '66%', background: '#96314c' }}></i></div>
                <footer><span>Activation</span><b>66%</b></footer>
              </div>
            </div>
          </article>

          <article className="card">
            <div className="ph">
              <div>
                <h2>Partner signal</h2>
                <p>Institution success intelligence</p>
              </div>
            </div>
            <div className="signal">
              <div className="signalbox">
                <b>Expansion opportunity</b>
                <p>18 active schools have used over 90% of their allocated learner seats. They are strong candidates for licence expansion.</p>
              </div>
              <ul className="slist">
                <li><b>12</b> schools need onboarding completion</li>
                <li><b>9</b> licences are due to renew this month</li>
                <li><b>6</b> school admins need support follow-up</li>
              </ul>
            </div>
          </article>
        </div>

        <div className="workspace">
          <article className="card">
            <div className="ph">
              <div>
                <h2>School directory</h2>
                <p>Manage institutional accounts, learning adoption and licence capacity</p>
              </div>
              <button className="link" onClick={() => showToast('School directory exported.')}>
                Export CSV ↗
              </button>
            </div>
            <div className="directory">
              <div className="filters">
                <button 
                  className={statusFilter === 'All' ? 'on' : ''} 
                  onClick={() => setStatusFilter('All')}
                >
                  All schools
                </button>
                <button 
                  className={statusFilter === 'Active' ? 'on' : ''} 
                  onClick={() => {
                    setStatusFilter('Active');
                    showToast('Showing active schools.');
                  }}
                >
                  Active
                </button>
                <button 
                  className={statusFilter === 'Onboarding' ? 'on' : ''} 
                  onClick={() => {
                    setStatusFilter('Onboarding');
                    showToast('Showing onboarding schools.');
                  }}
                >
                  Onboarding
                </button>
                <button 
                  className={statusFilter === 'Renewals' ? 'on' : ''} 
                  onClick={() => {
                    setStatusFilter('Renewals');
                    showToast('Showing renewal schools.');
                  }}
                >
                  Renewals
                </button>

                <select 
                  value={regionFilter} 
                  onChange={(e) => setRegionFilter(e.target.value)}
                >
                  <option>All regions</option>
                  <option>Dar es Salaam</option>
                  <option>Arusha</option>
                  <option>Dodoma</option>
                </select>

                <input 
                  id="filter" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter schools" 
                />
              </div>

              <table>
                <thead>
                  <tr>
                    <th>School</th>
                    <th>Region</th>
                    <th>Learners</th>
                    <th>Seats used</th>
                    <th>Last active</th>
                    <th>Health</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody id="rows">
                  {filteredSchools.length > 0 ? (
                    filteredSchools.map((item, idx) => {
                      const isHealthy = item.health === 'Healthy';
                      return (
                        <tr key={item.id || idx}>
                          <td>
                            <div className="school">
                              <i className="building">⌂</i>
                              {item.name}
                            </div>
                          </td>
                          <td className="mut">{item.region}</td>
                          <td>{item.learnersCount}</td>
                          <td>{item.seatsUsed}</td>
                          <td className="mut">{item.lastActive}</td>
                          <td>
                            <span className={`pill ${isHealthy ? 'healthy' : 'watch'}`}>
                              {item.health}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="link" 
                              onClick={() => showToast(`Opening ${item.name.split(' ')[0]} account…`)}
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '24px', color: '#6b7a78' }}>
                        No schools found matching filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </article>

          <aside className="card right">
            <div className="sec">
              <div className="mt">
                School success queue 
                <button className="link" onClick={() => showToast('School success queue opened.')}>View all</button>
              </div>
              <div className="task">
                <div className="tic">!</div>
                <div>
                  <b>Upendo High School</b>
                  <p>Low learner activation in last 7 days</p>
                </div>
                <button onClick={() => showToast('Success outreach assigned.')}>Assign</button>
              </div>
              <div className="task">
                <div className="tic">◇</div>
                <div>
                  <b>18 schools at seat limit</b>
                  <p>Licence expansion opportunity</p>
                </div>
                <button onClick={() => showToast('Expansion campaign drafted.')}>Prompt</button>
              </div>
              <div className="task">
                <div className="tic">↻</div>
                <div>
                  <b>9 renewal invoices due</b>
                  <p>Institutional contract follow-up</p>
                </div>
                <button onClick={() => showToast('Renewal reminders sent.')}>Remind</button>
              </div>
            </div>

            <div className="sec">
              <div className="mt">Onboarding health</div>
              <div className="metric">
                <span>Admin setup</span>
                <div className="meter"><i style={{ width: '94%' }}></i></div>
                <b>94%</b>
              </div>
              <div className="metric">
                <span>Learner import</span>
                <div className="meter"><i style={{ width: '83%', background: '#d69f4c' }}></i></div>
                <b>83%</b>
              </div>
              <div className="metric">
                <span>First lesson</span>
                <div className="meter"><i style={{ width: '72%', background: '#96314c' }}></i></div>
                <b>72%</b>
              </div>
            </div>

            <div className="sec">
              <div className="mt">Quick actions</div>
              <button className="link" onClick={() => showToast('School import wizard opened.')}>Bulk import schools →</button>
              <br /><br />
              <button className="link" onClick={() => showToast('School admin invitations opened.')}>Invite school admins →</button>
              <br /><br />
              <button className="link" onClick={() => showToast('Institutional impact report generated.')}>Generate impact report →</button>
            </div>
          </aside>
        </div>
      </section>

      {/* Modal: Add partner school */}
      <div className={`modalback ${isModalOpen ? 'show' : ''}`} id="modal" onClick={() => setIsModalOpen(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h2>Add partner school</h2>
          <p>Set up a school account and begin its TESEA Academy onboarding.</p>
          <label>School name</label>
          <input 
            id="schoolName" 
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            placeholder="e.g. New Horizon School" 
          />
          <label>Region</label>
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option>Dar es Salaam</option>
            <option>Arusha</option>
            <option>Dodoma</option>
            <option>Other region</option>
          </select>
          <label>Initial learner seats</label>
          <input 
            value={learnerSeats}
            onChange={(e) => setLearnerSeats(e.target.value)}
            placeholder="e.g. 500" 
          />
          <div className="mf">
            <button className="btn ghost" id="cancel" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button className="btn" id="save" onClick={handleCreateSchool}>
              Create school
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
