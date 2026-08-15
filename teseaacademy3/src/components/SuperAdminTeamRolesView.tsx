import React, { useState, useEffect } from 'react';
import { fetchTeamMembers, inviteTeamMember, TeamMemberItem } from '../lib/learningService';

interface SuperAdminTeamRolesViewProps {
  showToast: (msg: string) => void;
  adminName?: string;
}

export default function SuperAdminTeamRolesView({ showToast, adminName = 'Emmanuel E.' }: SuperAdminTeamRolesViewProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMemberItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [teamFilter, setTeamFilter] = useState<'All' | 'Admins' | 'Content team' | 'Invited'>('All');
  const [roleFilter, setRoleFilter] = useState('All roles');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('Content Editor');

  const loadData = async () => {
    try {
      setLoading(true);
      const list = await fetchTeamMembers();
      setTeamMembers(list);
    } catch (e) {
      console.error('Error loading team members:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSendInvite = async () => {
    const nameToUse = fullName.trim() || 'team member';
    const emailToUse = workEmail.trim() || 'member@tesea.ac.tz';

    try {
      const newMember = await inviteTeamMember({
        name: nameToUse,
        email: emailToUse,
        role: selectedRole
      });
      setTeamMembers(prev => [newMember, ...prev]);
      setIsModalOpen(false);
      setFullName('');
      setWorkEmail('');
      showToast(`Invitation sent to ${nameToUse}.`);
    } catch (e) {
      showToast('Error sending invitation.');
    }
  };

  const filteredMembers = teamMembers.filter(item => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || item.name.toLowerCase().includes(q) || item.role.toLowerCase().includes(q) || item.workspace.toLowerCase().includes(q);

    let matchesGroup = true;
    if (teamFilter === 'Admins') {
      matchesGroup = item.role.toLowerCase().includes('admin');
    } else if (teamFilter === 'Content team') {
      matchesGroup = item.role.toLowerCase().includes('content') || item.workspace.toLowerCase().includes('content');
    } else if (teamFilter === 'Invited') {
      matchesGroup = item.status === 'Invited';
    }

    let matchesRoleSelect = true;
    if (roleFilter !== 'All roles') {
      matchesRoleSelect = item.role === roleFilter;
    }

    return matchesSearch && matchesGroup && matchesRoleSelect;
  });

  return (
    <>
      <section className="content">
        <div className="heading">
          <div>
            <h1 id="title">Team & role management</h1>
            <p>Give every TESEA contributor exactly the access they need to do their best work.</p>
          </div>
          <button className="btn" id="invite" onClick={() => setIsModalOpen(true)}>
            ＋ Invite team member
          </button>
        </div>

        <div className="kpis">
          <article className="card kpi">
            <div className="khead">Team members <i className="kicon">♧</i></div>
            <div className="num">48</div>
            <div className="trend">↗ 4 <span>this month</span></div>
          </article>
          <article className="card kpi">
            <div className="khead">Active admins <i className="kicon">✓</i></div>
            <div className="num">12</div>
            <div className="trend">↗ 2 <span>this week</span></div>
          </article>
          <article className="card kpi">
            <div className="khead">Pending invitations <i className="kicon">✉</i></div>
            <div className="num">6</div>
            <div className="trend">↘ 3 <span>from yesterday</span></div>
          </article>
          <article className="card kpi">
            <div className="khead">Security posture <i className="kicon">◈</i></div>
            <div className="num">96.8%</div>
            <div className="trend">↗ 1.6% <span>access score</span></div>
          </article>
        </div>

        <div className="grid">
          <article className="card">
            <div className="ph">
              <div>
                <h2>Role architecture</h2>
                <p>Core access roles across the TESEA operating system</p>
              </div>
              <button className="link" onClick={() => showToast('Role editor opened.')}>
                Manage roles →
              </button>
            </div>
            <div className="roles">
              <div className="role">
                <b>Super Admin</b>
                <small>3 members · Full platform control</small>
                <div className="chips">
                  <span className="chip">All access</span>
                  <span className="chip">Audit</span>
                </div>
              </div>
              <div className="role">
                <b>Content Editor</b>
                <small>14 members · Content governance</small>
                <div className="chips">
                  <span className="chip">Content</span>
                  <span className="chip">Review</span>
                </div>
              </div>
              <div className="role">
                <b>School Manager</b>
                <small>9 members · Institutional success</small>
                <div className="chips">
                  <span className="chip">Schools</span>
                  <span className="chip">Reports</span>
                </div>
              </div>
            </div>
          </article>

          <article className="card">
            <div className="ph">
              <div>
                <h2>Access health</h2>
                <p>Security & permissions review</p>
              </div>
            </div>
            <div className="security">
              <div className="secure">
                <b>Access governance is healthy</b>
                <p>Multi-factor authentication is enabled for all Super Admins and recent permission changes have been logged.</p>
              </div>
              <div className="stat"><span>Accounts with MFA</span><b>44 / 48</b></div>
              <div className="stat"><span>Inactive accounts</span><b>2</b></div>
              <div className="stat"><span>Review due</span><b>5 roles</b></div>
            </div>
          </article>
        </div>

        <div className="workspace">
          <article className="card">
            <div className="ph">
              <div>
                <h2>Team directory</h2>
                <p>Manage members, access roles and sign-in status</p>
              </div>
              <button className="link" onClick={() => showToast('Team directory exported.')}>
                Export list ↗
              </button>
            </div>
            <div className="team">
              <div className="filters">
                <button 
                  className={teamFilter === 'All' ? 'on' : ''} 
                  onClick={() => setTeamFilter('All')}
                >
                  All team
                </button>
                <button 
                  className={teamFilter === 'Admins' ? 'on' : ''} 
                  onClick={() => {
                    setTeamFilter('Admins');
                    showToast('Showing admins.');
                  }}
                >
                  Admins
                </button>
                <button 
                  className={teamFilter === 'Content team' ? 'on' : ''} 
                  onClick={() => {
                    setTeamFilter('Content team');
                    showToast('Showing content team.');
                  }}
                >
                  Content team
                </button>
                <button 
                  className={teamFilter === 'Invited' ? 'on' : ''} 
                  onClick={() => {
                    setTeamFilter('Invited');
                    showToast('Showing pending invitations.');
                  }}
                >
                  Invited
                </button>

                <select 
                  value={roleFilter} 
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option>All roles</option>
                  <option>Super Admin</option>
                  <option>Content Editor</option>
                  <option>School Manager</option>
                </select>

                <input 
                  id="filter" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter team" 
                />
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Team member</th>
                    <th>Role</th>
                    <th>Workspace</th>
                    <th>Last active</th>
                    <th>MFA</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody id="rows">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((item, idx) => {
                      const isInvited = item.status === 'Invited';
                      const firstName = item.name.split(' ')[0];
                      return (
                        <tr key={item.id || idx}>
                          <td>
                            <div className="person">
                              <i className="mini">{item.avatarInitials || 'TM'}</i>
                              {item.name}
                            </div>
                          </td>
                          <td>{item.role}</td>
                          <td className="mut">{item.workspace}</td>
                          <td>{item.lastActive}</td>
                          <td>{item.mfa}</td>
                          <td>
                            <span className={`pill ${isInvited ? 'pending' : 'active'}`}>
                              {item.status}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="link" 
                              onClick={() => showToast(isInvited ? `Invitation resent to ${firstName}.` : `Opening ${firstName}’s access profile…`)}
                            >
                              {isInvited ? 'Resend' : 'Manage'}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '24px', color: '#6b7a78' }}>
                        No team members found matching filters.
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
                Access review queue 
                <button className="link" onClick={() => showToast('Access review queue opened.')}>View all</button>
              </div>
              <div className="task">
                <div className="tic">!</div>
                <div>
                  <b>5 roles need review</b>
                  <p>Quarterly permission review is due</p>
                </div>
                <button onClick={() => showToast('Role review opened.')}>Review</button>
              </div>
              <div className="task">
                <div className="tic">◈</div>
                <div>
                  <b>2 inactive accounts</b>
                  <p>No sign-in activity for 30 days</p>
                </div>
                <button onClick={() => showToast('Inactive accounts review opened.')}>Check</button>
              </div>
              <div className="task">
                <div className="tic">✉</div>
                <div>
                  <b>6 invitations pending</b>
                  <p>New team members awaiting activation</p>
                </div>
                <button onClick={() => showToast('Pending invitations opened.')}>Manage</button>
              </div>
            </div>

            <div className="sec">
              <div className="mt">Team by function</div>
              <div className="metric">
                <span>Content</span>
                <div className="meter"><i style={{ width: '42%' }}></i></div>
                <b>20</b>
              </div>
              <div className="metric">
                <span>Operations</span>
                <div className="meter"><i style={{ width: '27%', background: '#d69f4c' }}></i></div>
                <b>13</b>
              </div>
              <div className="metric">
                <span>Growth</span>
                <div className="meter"><i style={{ width: '19%', background: '#96314c' }}></i></div>
                <b>9</b>
              </div>
            </div>

            <div className="sec">
              <div className="mt">Quick actions</div>
              <button className="link" onClick={() => showToast('Bulk invite panel opened.')}>Bulk invite team →</button>
              <br /><br />
              <button className="link" onClick={() => showToast('Role template editor opened.')}>Create role template →</button>
              <br /><br />
              <button className="link" onClick={() => showToast('Security audit generated.')}>Run access audit →</button>
            </div>
          </aside>
        </div>
      </section>

      {/* Modal: Invite team member */}
      <div className={`modalback ${isModalOpen ? 'show' : ''}`} id="modal" onClick={() => setIsModalOpen(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h2>Invite team member</h2>
          <p>Send a secure invitation and assign an initial role.</p>
          <label>Full name</label>
          <input 
            id="name" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Asha Mollel" 
          />
          <label>Work email</label>
          <input 
            value={workEmail}
            onChange={(e) => setWorkEmail(e.target.value)}
            placeholder="member@tesea.ac.tz" 
          />
          <label>Role</label>
          <select 
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option>Content Editor</option>
            <option>School Manager</option>
            <option>Marketing Manager</option>
            <option>Super Admin</option>
          </select>
          <div className="mf">
            <button className="btn ghost" id="cancel" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button className="btn" id="save" onClick={handleSendInvite}>
              Send invitation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
