import React, { useState } from 'react';

interface AdminContentStudioSettingsViewProps {
  showToast: (msg: string) => void;
  adminName?: string;
}

type TabType = 'Profile' | 'Learning preferences' | 'Notifications' | 'Security' | 'Subscription';

export default function AdminContentStudioSettingsView({ showToast, adminName = 'Emmanuel Godfrey' }: AdminContentStudioSettingsViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('Profile');

  // Form states
  const [firstName, setFirstName] = useState(adminName.split(' ')[0] || 'Emmanuel');
  const [lastName, setLastName] = useState(adminName.split(' ')[1] || 'Godfrey');
  const [email, setEmail] = useState('emmanuel@example.com');
  const [language, setLanguage] = useState('English');
  const [track, setTrack] = useState('NECTA • Form 4');

  // Switch states
  const [studyReminders, setStudyReminders] = useState(true);
  const [offlineDownloads, setOfflineDownloads] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(false);

  const [autoPlay, setAutoPlay] = useState(true);
  const [swahiliSubtitles, setSwahiliSubtitles] = useState(true);

  const [emailDigest, setEmailDigest] = useState(true);
  const [quizAlerts, setQuizAlerts] = useState(true);
  const [smsReminders, setSmsReminders] = useState(true);

  const [enforceMfa, setEnforceMfa] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(true);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    showToast(`${tab} settings selected.`);
  };

  const handleSave = () => {
    showToast('Your settings have been saved.');
  };

  const toggleSwitch = (current: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(!current);
    showToast('Preference updated.');
  };

  return (
    <main className="main p-[28px_5%] max-w-[1440px] mx-auto min-w-0">
      <div className="crumb text-[12px] text-[#707580] mb-[8px]">
        Account <span>/</span> <b className="text-[#962c4c]">Settings</b>
      </div>

      <div className="title flex justify-between items-end mb-[22px]">
        <div>
          <h1 className="text-[34px] font-serif m-0 text-[#202129] font-bold">Settings</h1>
          <p className="text-[14px] text-[#707580] m-[6px_0]">Manage your account, learning experience and privacy preferences.</p>
        </div>
        <button className="save" id="save" onClick={handleSave}>
          Save changes
        </button>
      </div>

      <div className="settings grid grid-cols-1 md:grid-cols-[190px_1fr] gap-[17px]">
        <aside className="box menu bg-white border border-[#e9e7e4] rounded-[14px] p-[9px] h-fit">
          <button 
            className={activeTab === 'Profile' ? 'on' : ''} 
            onClick={() => handleTabChange('Profile')}
          >
            Profile
          </button>
          <button 
            className={activeTab === 'Learning preferences' ? 'on' : ''} 
            onClick={() => handleTabChange('Learning preferences')}
          >
            Learning preferences
          </button>
          <button 
            className={activeTab === 'Notifications' ? 'on' : ''} 
            onClick={() => handleTabChange('Notifications')}
          >
            Notifications
          </button>
          <button 
            className={activeTab === 'Security' ? 'on' : ''} 
            onClick={() => handleTabChange('Security')}
          >
            Security
          </button>
          <button 
            className={activeTab === 'Subscription' ? 'on' : ''} 
            onClick={() => handleTabChange('Subscription')}
          >
            Subscription
          </button>
        </aside>

        <section className="box content bg-white border border-[#e9e7e4] rounded-[14px] p-[20px]">
          {activeTab === 'Profile' && (
            <>
              <h2 className="text-[18px] m-0 mb-[5px] font-bold text-[#202129]">Profile information</h2>
              <p className="text-[12px] text-[#707580] m-0 mb-[20px]">Keep your learner account details current.</p>

              <div className="row grid grid-cols-1 sm:grid-cols-2 gap-[13px]">
                <div className="field my-[14px]">
                  <label className="block text-[12px] font-bold mb-[6px]">First name</label>
                  <input 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    className="w-full border border-[#e9e7e4] rounded-[7px] p-[10px] bg-white text-[13px]"
                  />
                </div>
                <div className="field my-[14px]">
                  <label className="block text-[12px] font-bold mb-[6px]">Last name</label>
                  <input 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    className="w-full border border-[#e9e7e4] rounded-[7px] p-[10px] bg-white text-[13px]"
                  />
                </div>
              </div>

              <div className="field my-[14px]">
                <label className="block text-[12px] font-bold mb-[6px]">Email address</label>
                <input 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full border border-[#e9e7e4] rounded-[7px] p-[10px] bg-white text-[13px]"
                />
              </div>

              <div className="row grid grid-cols-1 sm:grid-cols-2 gap-[13px]">
                <div className="field my-[14px]">
                  <label className="block text-[12px] font-bold mb-[6px]">Preferred language</label>
                  <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full border border-[#e9e7e4] rounded-[7px] p-[10px] bg-white text-[13px]"
                  >
                    <option>English</option>
                    <option>Kiswahili</option>
                  </select>
                </div>
                <div className="field my-[14px]">
                  <label className="block text-[12px] font-bold mb-[6px]">Learning track</label>
                  <select 
                    value={track} 
                    onChange={(e) => setTrack(e.target.value)}
                    className="w-full border border-[#e9e7e4] rounded-[7px] p-[10px] bg-white text-[13px]"
                  >
                    <option>NECTA • Form 4</option>
                    <option>Cambridge • IGCSE</option>
                  </select>
                </div>
              </div>

              <div className="item flex justify-between gap-[14px] border-t border-[#e9e7e4] py-[15px] items-center">
                <div>
                  <b className="text-[13px] text-[#202129]">Study reminders</b>
                  <p className="text-[11px] text-[#707580] m-0 mt-[4px]">Receive gentle reminders to keep your learning streak alive.</p>
                </div>
                <button 
                  className={`switch ${studyReminders ? 'on' : ''}`} 
                  onClick={() => toggleSwitch(studyReminders, setStudyReminders)}
                >
                  <i></i>
                </button>
              </div>

              <div className="item flex justify-between gap-[14px] border-t border-[#e9e7e4] py-[15px] items-center">
                <div>
                  <b className="text-[13px] text-[#202129]">Offline downloads</b>
                  <p className="text-[11px] text-[#707580] m-0 mt-[4px]">Make learning resources available when you are not connected.</p>
                </div>
                <button 
                  className={`switch ${offlineDownloads ? 'on' : ''}`} 
                  onClick={() => toggleSwitch(offlineDownloads, setOfflineDownloads)}
                >
                  <i></i>
                </button>
              </div>

              <div className="item flex justify-between gap-[14px] border-t border-[#e9e7e4] py-[15px] items-center">
                <div>
                  <b className="text-[13px] text-[#202129]">Rafiki AI suggestions</b>
                  <p className="text-[11px] text-[#707580] m-0 mt-[4px]">Allow personalised recommendations based on your activity.</p>
                </div>
                <button 
                  className={`switch ${aiSuggestions ? 'on' : ''}`} 
                  onClick={() => toggleSwitch(aiSuggestions, setAiSuggestions)}
                >
                  <i></i>
                </button>
              </div>
            </>
          )}

          {activeTab === 'Learning preferences' && (
            <>
              <h2 className="text-[18px] m-0 mb-[5px] font-bold text-[#202129]">Learning preferences</h2>
              <p className="text-[12px] text-[#707580] m-0 mb-[20px]">Customize how content is presented during study sessions.</p>

              <div className="item flex justify-between gap-[14px] border-t border-[#e9e7e4] py-[15px] items-center">
                <div>
                  <b className="text-[13px] text-[#202129]">Auto-play next lesson</b>
                  <p className="text-[11px] text-[#707580] m-0 mt-[4px]">Automatically start the next lesson when finishing video content.</p>
                </div>
                <button 
                  className={`switch ${autoPlay ? 'on' : ''}`} 
                  onClick={() => toggleSwitch(autoPlay, setAutoPlay)}
                >
                  <i></i>
                </button>
              </div>

              <div className="item flex justify-between gap-[14px] border-t border-[#e9e7e4] py-[15px] items-center">
                <div>
                  <b className="text-[13px] text-[#202129]">Subtitles in Kiswahili</b>
                  <p className="text-[11px] text-[#707580] m-0 mt-[4px]">Provide bilingual Kiswahili captions for English video lectures.</p>
                </div>
                <button 
                  className={`switch ${swahiliSubtitles ? 'on' : ''}`} 
                  onClick={() => toggleSwitch(swahiliSubtitles, setSwahiliSubtitles)}
                >
                  <i></i>
                </button>
              </div>
            </>
          )}

          {activeTab === 'Notifications' && (
            <>
              <h2 className="text-[18px] m-0 mb-[5px] font-bold text-[#202129]">Notification settings</h2>
              <p className="text-[12px] text-[#707580] m-0 mb-[20px]">Control how and when TESEA Academy reaches out to you.</p>

              <div className="item flex justify-between gap-[14px] border-t border-[#e9e7e4] py-[15px] items-center">
                <div>
                  <b className="text-[13px] text-[#202129]">Weekly email digest</b>
                  <p className="text-[11px] text-[#707580] m-0 mt-[4px]">Receive a weekly breakdown of study hours and quiz performance.</p>
                </div>
                <button 
                  className={`switch ${emailDigest ? 'on' : ''}`} 
                  onClick={() => toggleSwitch(emailDigest, setEmailDigest)}
                >
                  <i></i>
                </button>
              </div>

              <div className="item flex justify-between gap-[14px] border-t border-[#e9e7e4] py-[15px] items-center">
                <div>
                  <b className="text-[13px] text-[#202129]">Instant quiz alerts</b>
                  <p className="text-[11px] text-[#707580] m-0 mt-[4px]">Get notified when new mock exams or topical quizzes are assigned.</p>
                </div>
                <button 
                  className={`switch ${quizAlerts ? 'on' : ''}`} 
                  onClick={() => toggleSwitch(quizAlerts, setQuizAlerts)}
                >
                  <i></i>
                </button>
              </div>

              <div className="item flex justify-between gap-[14px] border-t border-[#e9e7e4] py-[15px] items-center">
                <div>
                  <b className="text-[13px] text-[#202129]">Mobile SMS reminders</b>
                  <p className="text-[11px] text-[#707580] m-0 mt-[4px]">Send critical alerts to your registered mobile number.</p>
                </div>
                <button 
                  className={`switch ${smsReminders ? 'on' : ''}`} 
                  onClick={() => toggleSwitch(smsReminders, setSmsReminders)}
                >
                  <i></i>
                </button>
              </div>
            </>
          )}

          {activeTab === 'Security' && (
            <>
              <h2 className="text-[18px] m-0 mb-[5px] font-bold text-[#202129]">Security & privacy</h2>
              <p className="text-[12px] text-[#707580] m-0 mb-[20px]">Manage credentials, multi-factor authentication and session security.</p>

              <div className="item flex justify-between gap-[14px] border-t border-[#e9e7e4] py-[15px] items-center">
                <div>
                  <b className="text-[13px] text-[#202129]">Two-factor authentication (MFA)</b>
                  <p className="text-[11px] text-[#707580] m-0 mt-[4px]">Require an extra security step when logging into your account.</p>
                </div>
                <button 
                  className={`switch ${enforceMfa ? 'on' : ''}`} 
                  onClick={() => toggleSwitch(enforceMfa, setEnforceMfa)}
                >
                  <i></i>
                </button>
              </div>

              <div className="item flex justify-between gap-[14px] border-t border-[#e9e7e4] py-[15px] items-center">
                <div>
                  <b className="text-[13px] text-[#202129]">Automatic session timeout</b>
                  <p className="text-[11px] text-[#707580] m-0 mt-[4px]">Automatically log out inactive sessions after 30 minutes.</p>
                </div>
                <button 
                  className={`switch ${sessionTimeout ? 'on' : ''}`} 
                  onClick={() => toggleSwitch(sessionTimeout, setSessionTimeout)}
                >
                  <i></i>
                </button>
              </div>
            </>
          )}

          {activeTab === 'Subscription' && (
            <>
              <h2 className="text-[18px] m-0 mb-[5px] font-bold text-[#202129]">Subscription plan</h2>
              <p className="text-[12px] text-[#707580] m-0 mb-[20px]">View active access tier and billing details.</p>

              <div className="p-[14px] bg-[#f8f8f8] border border-[#e9e7e4] rounded-[10px] mb-[15px]">
                <b className="text-[14px] block text-[#202129]">Pro Learner Unlimited</b>
                <span className="text-[12px] text-[#15956c] font-bold block mt-[2px]">● Active subscription</span>
                <p className="text-[11px] text-[#707580] mt-[6px]">Includes full access to Form 1–6 video courses, mock exams, and Rafiki AI tutoring.</p>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
