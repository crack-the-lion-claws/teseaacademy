import React, { useState, useEffect } from 'react';
import { fetchEducators, createEducator, EducatorItem } from '../lib/learningService';

interface AdminTutorsAuthorsViewProps {
  showToast: (msg: string) => void;
  adminName?: string;
}

export default function AdminTutorsAuthorsView({ showToast, adminName = 'Emmanuel Godfrey' }: AdminTutorsAuthorsViewProps) {
  const [educators, setEducators] = useState<EducatorItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Tutor');
  const [subjectFocus, setSubjectFocus] = useState('Mathematics');

  const loadData = async () => {
    try {
      const data = await fetchEducators();
      setEducators(data);
    } catch (e) {
      console.error('Failed to load educators:', e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSendInvite = async () => {
    const nameToUse = name.trim() || 'Educator';
    try {
      const created = await createEducator({
        name: nameToUse,
        email,
        role,
        subjectFocus
      });
      setEducators(prev => [created, ...prev]);
      setIsModalOpen(false);
      setName('');
      setEmail('');
      showToast(`Invitation prepared for ${nameToUse}.`);
    } catch (e) {
      showToast('Error sending educator invitation.');
    }
  };

  const filteredEducators = educators.filter(item => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || item.name.toLowerCase().includes(q) || item.subjectArea.toLowerCase().includes(q) || item.email.toLowerCase().includes(q);
    const matchesRole = !roleFilter || item.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <main className="main p-[33px_24px_55px] lg:p-[33px_43px_55px] max-w-[1540px] mx-auto">
      <section className="intro">
        <div>
          <span className="eye">EDUCATOR NETWORK</span>
          <h1>Tutors & authors</h1>
          <p>Coordinate subject experts, tutors and content creators building TESEA Academy’s learning library.</p>
        </div>
        <button className="primary" id="invite" onClick={() => setIsModalOpen(true)}>
          ＋ Invite educator
        </button>
      </section>

      <section className="metrics">
        <article className="metric wine">
          <i>♧</i>
          <small>Active educators</small>
          <b>38</b>
          <small><span className="up">↑ 4</span> joined this month</small>
        </article>
        <article className="metric">
          <i>▤</i>
          <small>Assigned subjects</small>
          <b>27</b>
          <small>Across Form 1–6</small>
        </article>
        <article className="metric">
          <i>✓</i>
          <small>Content submitted</small>
          <b>146</b>
          <small><span className="up">↑ 18</span> this week</small>
        </article>
        <article className="metric">
          <i>◷</i>
          <small>Pending approvals</small>
          <b>17</b>
          <small>Awaiting editorial action</small>
        </article>
      </section>

      <section className="grid">
        <div>
          <article className="card">
            <div className="head">
              <div>
                <h2>Educator directory</h2>
                <p>Roles, subject coverage and current production activity</p>
              </div>
              <button className="link" onClick={() => showToast('Educator directory exported.')}>
                Export
              </button>
            </div>

            <div className="tools">
              <label className="search">
                <input 
                  id="search" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search educator or subject" 
                />
              </label>
              <select 
                className="filter" 
                id="role"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">All roles</option>
                <option>Tutor</option>
                <option>Author</option>
                <option>Subject lead</option>
              </select>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Educator</th>
                  <th>Role</th>
                  <th>Subject area</th>
                  <th>Content</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="rows">
                {filteredEducators.length > 0 ? (
                  filteredEducators.map((edu, idx) => (
                    <tr key={edu.id || idx}>
                      <td>
                        <div className="person">
                          <span className={`photo ${edu.photoClass || ''}`}>{edu.initials}</span>
                          <span>
                            <b>{edu.name}</b>
                            <small>{edu.email}</small>
                          </span>
                        </div>
                      </td>
                      <td>{edu.role}</td>
                      <td>{edu.subjectArea}</td>
                      <td>{edu.contentCount}</td>
                      <td>
                        <span className={`tag ${edu.status === 'In review' ? 'review' : 'active'}`}>
                          {edu.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="more" 
                          onClick={() => showToast(`${edu.name} profile opened.`)}
                        >
                          ⋯
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '20px', color: '#8d97a2' }}>
                      No educators found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </article>
        </div>

        <aside>
          <article className="card">
            <div className="head">
              <div>
                <h2>Production workload</h2>
                <p>Active tasks this week</p>
              </div>
              <button className="link" onClick={() => showToast('Workload board opened.')}>
                Board
              </button>
            </div>

            <div className="load">
              <div className="load-top">
                <b>Rashid Mfinanga</b>
                <span>4 of 6</span>
              </div>
              <small>Physics video lessons</small>
              <div className="bar"><i style={{ width: '67%' }}></i></div>
            </div>

            <div className="load">
              <div className="load-top">
                <b>Doreen Mng’ong’o</b>
                <span>7 of 8</span>
              </div>
              <small>Chemistry text lessons</small>
              <div className="bar"><i style={{ width: '87%' }}></i></div>
            </div>

            <div className="load">
              <div className="load-top">
                <b>Amina Nyagava</b>
                <span>2 of 5</span>
              </div>
              <small>English audio lessons</small>
              <div className="bar"><i style={{ width: '40%' }}></i></div>
            </div>
          </article>

          <article className="card" style={{ marginTop: '22px' }}>
            <div className="head">
              <div>
                <h2>Latest submissions</h2>
                <p>New work requiring editorial action</p>
              </div>
              <button className="link" onClick={() => showToast('All submissions opened.')}>
                View all
              </button>
            </div>

            <div className="approval">
              <span className="ic">▶</span>
              <span>
                <b>Introduction to Kinematics</b>
                <small>Submitted by Rashid · 18 min ago</small>
              </span>
              <button onClick={() => showToast('Video submission opened for review.')}>
                Review
              </button>
            </div>

            <div className="approval">
              <span className="ic">¶</span>
              <span>
                <b>Organic Chemistry: Alkanes</b>
                <small>Submitted by Doreen · 1 hour ago</small>
              </span>
              <button onClick={() => showToast('Text lesson opened for review.')}>
                Review
              </button>
            </div>

            <div className="approval">
              <span className="ic">♫</span>
              <span>
                <b>Poetry: Sound Devices</b>
                <small>Submitted by Amina · 4 hours ago</small>
              </span>
              <button onClick={() => showToast('Audio submission opened for review.')}>
                Review
              </button>
            </div>
          </article>
        </aside>
      </section>

      {/* Modal: Invite Tutor or Author */}
      <div className={`modal-bg ${isModalOpen ? 'open' : ''}`} id="modal" onClick={() => setIsModalOpen(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-head">
            <div>
              <span className="eye">EDUCATOR INVITATION</span>
              <h2>Invite tutor or author</h2>
            </div>
            <button className="close" id="close" onClick={() => setIsModalOpen(false)}>×</button>
          </div>
          <p>Invite a contributor and assign an initial role and subject focus.</p>

          <div className="form">
            <div className="field">
              <label>Full name</label>
              <input 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Educator name" 
              />
            </div>
            <div className="field">
              <label>Email address</label>
              <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@tesea.ac.tz" 
              />
            </div>
            <div className="field">
              <label>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option>Tutor</option>
                <option>Author</option>
                <option>Subject lead</option>
              </select>
            </div>
            <div className="field">
              <label>Subject focus</label>
              <select value={subjectFocus} onChange={(e) => setSubjectFocus(e.target.value)}>
                <option>Mathematics</option>
                <option>Physics</option>
                <option>Biology</option>
                <option>English</option>
              </select>
            </div>
          </div>

          <div className="actions">
            <button className="cancel" id="cancel" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button className="primary" id="send" onClick={handleSendInvite}>
              Send invitation
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
