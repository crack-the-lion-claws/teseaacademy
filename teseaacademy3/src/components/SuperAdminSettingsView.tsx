import React, { useState } from 'react';

interface SuperAdminSettingsViewProps {
  showToast: (msg: string) => void;
  adminName?: string;
}

type TabType = 'general' | 'learning' | 'ai' | 'notifications' | 'integrations' | 'security';

const tabInfo: Record<TabType, [string, string]> = {
  general: ['General settings', 'Set the identity and default regional preferences for your academy.'],
  learning: ['Learning experience', 'Control learner-facing learning defaults and academic preferences.'],
  ai: ['AI Tutor', 'Configure Rafiki AI language, learning policies and safety behaviour.'],
  notifications: ['Notifications', 'Control operational alerts, stakeholder messages and delivery preferences.'],
  integrations: ['Integrations', 'Connect payments, messaging, storage and learning services.'],
  security: ['Security & data', 'Manage platform safeguards, privacy, retention and access standards.']
};

export default function SuperAdminSettingsView({ showToast, adminName = 'Emmanuel E.' }: SuperAdminSettingsViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('general');

  // Form states
  const [academyName, setAcademyName] = useState('TESEA Academy');
  const [supportEmail, setSupportEmail] = useState('support@tesea.ac.tz');
  const [defaultLang, setDefaultLang] = useState('English & Kiswahili');
  const [timeZone, setTimeZone] = useState('Africa/Dar_es_Salaam (UTC+3)');
  const [portalUrl, setPortalUrl] = useState('academy.tesea.ac.tz');

  // Toggle states
  const [allowPublicReg, setAllowPublicReg] = useState(true);
  const [bilingualLearning, setBilingualLearning] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    showToast(`${tabInfo[tab][0]} loaded.`);
  };

  const handleSave = () => {
    showToast('Platform settings saved.');
  };

  const handleDiscard = () => {
    showToast('Changes discarded.');
  };

  const [panelTitle, panelText] = tabInfo[activeTab];

  return (
    <section className="content">
      <div className="heading">
        <div>
          <h1 id="title">Platform settings</h1>
          <p>Configure how TESEA Academy looks, learns, connects and stays secure.</p>
        </div>
        <button className="btn" id="saveTop" onClick={handleSave}>
          Save changes
        </button>
      </div>

      <div className="layout">
        <aside className="card tabs" id="tabs">
          <small>Workspace</small>
          <button 
            className={activeTab === 'general' ? 'active' : ''} 
            onClick={() => handleTabChange('general')}
          >
            General
          </button>
          <button 
            className={activeTab === 'learning' ? 'active' : ''} 
            onClick={() => handleTabChange('learning')}
          >
            Learning experience
          </button>
          <button 
            className={activeTab === 'ai' ? 'active' : ''} 
            onClick={() => handleTabChange('ai')}
          >
            AI Tutor
          </button>

          <small>System</small>
          <button 
            className={activeTab === 'notifications' ? 'active' : ''} 
            onClick={() => handleTabChange('notifications')}
          >
            Notifications
          </button>
          <button 
            className={activeTab === 'integrations' ? 'active' : ''} 
            onClick={() => handleTabChange('integrations')}
          >
            Integrations
          </button>
          <button 
            className={activeTab === 'security' ? 'active' : ''} 
            onClick={() => handleTabChange('security')}
          >
            Security & data
          </button>
        </aside>

        <div>
          <section className="card panel" id="panel">
            <h2 id="panelTitle">{panelTitle}</h2>
            <p id="panelText">{panelText}</p>

            {activeTab === 'general' && (
              <>
                <div className="formgrid">
                  <div className="field">
                    <label>Academy name</label>
                    <input 
                      value={academyName} 
                      onChange={(e) => setAcademyName(e.target.value)} 
                    />
                  </div>
                  <div className="field">
                    <label>Support email</label>
                    <input 
                      value={supportEmail} 
                      onChange={(e) => setSupportEmail(e.target.value)} 
                    />
                  </div>
                  <div className="field">
                    <label>Default language</label>
                    <select 
                      value={defaultLang} 
                      onChange={(e) => setDefaultLang(e.target.value)}
                    >
                      <option>English & Kiswahili</option>
                      <option>English</option>
                      <option>Kiswahili</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Time zone</label>
                    <select 
                      value={timeZone} 
                      onChange={(e) => setTimeZone(e.target.value)}
                    >
                      <option>Africa/Dar_es_Salaam (UTC+3)</option>
                      <option>UTC</option>
                    </select>
                  </div>
                  <div className="field wide">
                    <label>Public learner portal URL</label>
                    <input 
                      value={portalUrl} 
                      onChange={(e) => setPortalUrl(e.target.value)} 
                    />
                  </div>
                </div>

                <hr className="line" />

                <h3 className="section-title">Platform preferences</h3>
                <p className="desc">Set defaults for new accounts and platform-wide communication.</p>

                <div className="setting">
                  <div>
                    <b>Allow public learner registration</b>
                    <p>New learners can create accounts directly from the public portal.</p>
                  </div>
                  <button 
                    className={`switch ${allowPublicReg ? 'on' : ''}`} 
                    onClick={() => setAllowPublicReg(!allowPublicReg)} 
                  />
                </div>

                <div className="setting">
                  <div>
                    <b>Enable bilingual learning by default</b>
                    <p>Present English and Kiswahili support across learner-facing experiences.</p>
                  </div>
                  <button 
                    className={`switch ${bilingualLearning ? 'on' : ''}`} 
                    onClick={() => setBilingualLearning(!bilingualLearning)} 
                  />
                </div>

                <div className="setting">
                  <div>
                    <b>Weekly performance summary</b>
                    <p>Send a platform-level success summary to Super Admins.</p>
                  </div>
                  <button 
                    className={`switch ${weeklySummary ? 'on' : ''}`} 
                    onClick={() => setWeeklySummary(!weeklySummary)} 
                  />
                </div>
              </>
            )}

            {activeTab === 'learning' && (
              <>
                <div className="formgrid">
                  <div className="field">
                    <label>Default Curriculum Framework</label>
                    <select defaultValue="NECTA (Tanzania National)">
                      <option>NECTA (Tanzania National)</option>
                      <option>Cambridge International</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Max Quiz Retries</label>
                    <select defaultValue="3">
                      <option>Unlimited</option>
                      <option>3</option>
                      <option>5</option>
                    </select>
                  </div>
                </div>

                <hr className="line" />

                <h3 className="section-title">Academic Controls</h3>
                <p className="desc">Manage automated grading and certificate settings.</p>

                <div className="setting">
                  <div>
                    <b>Auto-issue certificates on completion</b>
                    <p>Learners receive verifiable digital certificates upon 100% course completion.</p>
                  </div>
                  <button className="switch on" onClick={(e) => (e.currentTarget as HTMLButtonElement).classList.toggle('on')} />
                </div>

                <div className="setting">
                  <div>
                    <b>Show streak counters</b>
                    <p>Encourage continuous learning with daily activity streaks.</p>
                  </div>
                  <button className="switch on" onClick={(e) => (e.currentTarget as HTMLButtonElement).classList.toggle('on')} />
                </div>
              </>
            )}

            {activeTab === 'ai' && (
              <>
                <div className="formgrid">
                  <div className="field">
                    <label>Rafiki AI Model</label>
                    <select defaultValue="Gemini 1.5 Flash (Optimized)">
                      <option>Gemini 1.5 Flash (Optimized)</option>
                      <option>Gemini 1.5 Pro (Deep reasoning)</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Tutor Personality Tone</label>
                    <select defaultValue="Encouraging & Structured">
                      <option>Encouraging & Structured</option>
                      <option>Strict Academic</option>
                      <option>Socratic / Questioning</option>
                    </select>
                  </div>
                </div>

                <hr className="line" />

                <h3 className="section-title">Safety & Supervision</h3>

                <div className="setting">
                  <div>
                    <b>Strict Curriculum Guardrails</b>
                    <p>Restrict Rafiki AI to answering only within NECTA/Cambridge syllabus topics.</p>
                  </div>
                  <button className="switch on" onClick={(e) => (e.currentTarget as HTMLButtonElement).classList.toggle('on')} />
                </div>

                <div className="setting">
                  <div>
                    <b>Auto-detect learning struggles</b>
                    <p>Alert school admins when a learner repeatedly fails specific topic quizzes.</p>
                  </div>
                  <button className="switch on" onClick={(e) => (e.currentTarget as HTMLButtonElement).classList.toggle('on')} />
                </div>
              </>
            )}

            {activeTab === 'notifications' && (
              <>
                <h3 className="section-title">Email Alerts</h3>
                <div className="setting">
                  <div>
                    <b>Daily operational Digest</b>
                    <p>Receive morning summary of active learners and new subscriptions.</p>
                  </div>
                  <button className="switch on" onClick={(e) => (e.currentTarget as HTMLButtonElement).classList.toggle('on')} />
                </div>
                <div className="setting">
                  <div>
                    <b>Security & Login Alerts</b>
                    <p>Instant notification upon suspicious admin login attempts.</p>
                  </div>
                  <button className="switch on" onClick={(e) => (e.currentTarget as HTMLButtonElement).classList.toggle('on')} />
                </div>
              </>
            )}

            {activeTab === 'integrations' && (
              <>
                <h3 className="section-title">Connected Services</h3>
                <div className="setting">
                  <div>
                    <b>SMS Gateway (AfrisMS / Twilio)</b>
                    <p>Connected · Used for OTPs and guardian updates.</p>
                  </div>
                  <button className="switch on" onClick={(e) => (e.currentTarget as HTMLButtonElement).classList.toggle('on')} />
                </div>
                <div className="setting">
                  <div>
                    <b>Payment Gateways (M-Pesa, TigoPesa, Airtel Money)</b>
                    <p>Connected · Processing live subscriptions.</p>
                  </div>
                  <button className="switch on" onClick={(e) => (e.currentTarget as HTMLButtonElement).classList.toggle('on')} />
                </div>
              </>
            )}

            {activeTab === 'security' && (
              <>
                <h3 className="section-title">Access Governance</h3>
                <div className="setting">
                  <div>
                    <b>Enforce MFA for all Super Admins</b>
                    <p>Require two-factor authentication on every admin login.</p>
                  </div>
                  <button className="switch on" onClick={(e) => (e.currentTarget as HTMLButtonElement).classList.toggle('on')} />
                </div>
                <div className="setting">
                  <div>
                    <b>Automatic Session Timeout (30 mins)</b>
                    <p>Log out inactive admin sessions after 30 minutes of inactivity.</p>
                  </div>
                  <button className="switch on" onClick={(e) => (e.currentTarget as HTMLButtonElement).classList.toggle('on')} />
                </div>
              </>
            )}

            <div className="savebar">
              <button className="btn ghost" onClick={handleDiscard}>
                Discard
              </button>
              <button className="btn" onClick={handleSave}>
                Save settings
              </button>
            </div>
          </section>

          <aside className="card health">
            <h3>System health</h3>
            <div className="healthrow">
              <span>Learning platform</span>
              <b className="ok">Operational</b>
            </div>
            <div className="healthrow">
              <span>AI Tutor services</span>
              <b className="ok">Operational</b>
            </div>
            <div className="healthrow">
              <span>Payment services</span>
              <b className="ok">Operational</b>
            </div>
            <div className="healthrow">
              <span>Scheduled backup</span>
              <b className="warning">Due in 3 hours</b>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
