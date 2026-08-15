import React, { useState } from 'react';

interface CourseItem {
  id: string;
  name: string;
  subject: string;
  form: string;
  status: 'Published' | 'In review';
  title: string;
  subtitle: string;
  lessons: number;
  learners: number;
  coverage: number;
  mark: string;
  gradient: string;
}

interface AdminSubjectsCoursesViewProps {
  showToast: (msg: string) => void;
  onOpenDashboard?: () => void;
}

const INITIAL_COURSES: CourseItem[] = [];

export default function AdminSubjectsCoursesView({ showToast }: AdminSubjectsCoursesViewProps) {
  const [courses, setCourses] = useState<CourseItem[]>(() => {
    try {
      const stored = localStorage.getItem('tesea_admin_courses');
      return stored ? JSON.parse(stored) : INITIAL_COURSES;
    } catch (e) {
      return INITIAL_COURSES;
    }
  });

  const saveCoursesToStorage = (updated: CourseItem[]) => {
    setCourses(updated);
    try {
      localStorage.setItem('tesea_admin_courses', JSON.stringify(updated));
    } catch (e) {}
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedForm, setSelectedForm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Mathematics');
  const [newClassLevel, setNewClassLevel] = useState('Form 5');
  const [newStatus, setNewStatus] = useState<'Save as draft' | 'Send for review'>('Save as draft');

  const filteredCourses = courses.filter(c => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || c.title.toLowerCase().includes(q) || c.subject.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
    const matchesForm = !selectedForm || c.form === selectedForm;
    const matchesStatus = !selectedStatus || c.status === selectedStatus;
    const matchesSubject = !selectedSubject || c.subject === selectedSubject;
    return matchesSearch && matchesForm && matchesStatus && matchesSubject;
  });

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const titleToUse = newTitle.trim() || 'Untitled course';
    const newCourse: CourseItem = {
      id: Date.now().toString(),
      name: `${newSubject} ${titleToUse}`,
      subject: newSubject,
      form: newClassLevel,
      status: newStatus === 'Send for review' ? 'In review' : 'Published',
      title: titleToUse,
      subtitle: `${newSubject} syllabus curriculum module`,
      lessons: 12,
      learners: 0,
      coverage: 15,
      mark: newSubject[0] || '◈',
      gradient: 'linear-gradient(135deg, #71364d, #bd647d)'
    };
    const updated = [newCourse, ...courses];
    saveCoursesToStorage(updated);
    setIsModalOpen(false);
    setNewTitle('');
    showToast(`“${titleToUse}” created successfully.`);
  };

  const activeSubjectsCount = new Set(courses.map(c => c.subject)).size;
  const publishedCoursesCount = courses.filter(c => c.status === 'Published').length;
  const awaitingReviewCount = courses.filter(c => c.status === 'In review').length;
  const avgCoveragePct = courses.length > 0 ? Math.round(courses.reduce((acc, c) => acc + (c.coverage || 0), 0) / courses.length) : 0;

  return (
    <div className="main" style={{ maxWidth: '1540px', padding: '33px 43px 55px' }}>
      <section className="intro" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '18px', marginBottom: '26px' }}>
        <div>
          <span className="eye" style={{ fontSize: '10px', color: '#909aa5', fontWeight: 700, letterSpacing: '.12em' }}>CURRICULUM MANAGEMENT</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '34px', fontWeight: 700, margin: '5px 0 0', letterSpacing: '-.035em' }}>Subjects & courses</h1>
          <p style={{ margin: '5px 0 0', color: '#63707d', fontSize: '12px' }}>Organise, publish and monitor every TESEA Academy learning pathway.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="primary" 
          style={{ border: 0, background: '#962c4a', color: '#fff', borderRadius: '7px', padding: '11px 15px', fontSize: '12px', fontWeight: 700, boxShadow: '0 8px 18px rgba(150,44,74,.18)', cursor: 'pointer' }}
        >
          ＋ Create new course
        </button>
      </section>

      <section className="overview" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '12px', padding: '17px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '24px' }}>
        <article style={{ padding: '4px 7px', borderRight: '1px solid #e3e8ed' }}>
          <b style={{ fontSize: '21px', display: 'block', marginBottom: '4px' }}>{activeSubjectsCount}</b>
          <small style={{ fontSize: '11px', color: '#63707d' }}>Active subjects</small>
        </article>
        <article style={{ padding: '4px 7px', borderRight: '1px solid #e3e8ed' }}>
          <b style={{ fontSize: '21px', display: 'block', marginBottom: '4px' }}>{publishedCoursesCount}</b>
          <small style={{ fontSize: '11px', color: '#63707d' }}>Published courses</small>
        </article>
        <article style={{ padding: '4px 7px', borderRight: '1px solid #e3e8ed' }}>
          <b style={{ fontSize: '21px', display: 'block', marginBottom: '4px' }}>{awaitingReviewCount}</b>
          <small style={{ fontSize: '11px', color: '#63707d' }}><span style={{ color: '#15956c', fontWeight: 700 }}>●</span> Awaiting review</small>
        </article>
        <article style={{ padding: '4px 7px' }}>
          <b style={{ fontSize: '21px', display: 'block', marginBottom: '4px' }}>{avgCoveragePct}%</b>
          <small style={{ fontSize: '11px', color: '#63707d' }}>Curriculum coverage</small>
        </article>
      </section>

      <section className="toolbar" style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '11px', padding: '13px', display: 'flex', gap: '11px', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <span style={{ position: 'absolute', left: '12px', top: '10px', color: '#87929c', fontSize: '16px', pointerEvents: 'none' }}>⌕</span>
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subjects or courses"
            style={{ width: '100%', border: '1px solid #e3e8ed', borderRadius: '7px', padding: '10px 12px 10px 35px', outline: 0, fontSize: '12px', boxSizing: 'border-box' }}
          />
        </div>
        <select 
          value={selectedForm} 
          onChange={(e) => setSelectedForm(e.target.value)}
          style={{ border: '1px solid #e3e8ed', borderRadius: '7px', padding: '9px 10px', color: '#566472', fontSize: '11px', background: '#fff', outline: 'none' }}
        >
          <option value="">All forms</option>
          <option value="Form 1">Form 1</option>
          <option value="Form 2">Form 2</option>
          <option value="Form 3">Form 3</option>
          <option value="Form 4">Form 4</option>
          <option value="Form 5">Form 5</option>
          <option value="Form 6">Form 6</option>
        </select>
        <select 
          value={selectedStatus} 
          onChange={(e) => setSelectedStatus(e.target.value)}
          style={{ border: '1px solid #e3e8ed', borderRadius: '7px', padding: '9px 10px', color: '#566472', fontSize: '11px', background: '#fff', outline: 'none' }}
        >
          <option value="">All status</option>
          <option value="Published">Published</option>
          <option value="In review">In review</option>
        </select>
        <div style={{ display: 'flex', gap: '3px', background: '#f1f4f6', padding: '3px', borderRadius: '6px' }}>
          <button 
            onClick={() => { setViewMode('grid'); showToast('Grid view selected.'); }}
            style={{ border: 0, background: viewMode === 'grid' ? '#fff' : 'none', color: viewMode === 'grid' ? '#962c4a' : '#7b8792', borderRadius: '4px', padding: '6px 8px', boxShadow: viewMode === 'grid' ? '0 1px 3px #d8dde2' : 'none', cursor: 'pointer' }}
          >
            ▦
          </button>
          <button 
            onClick={() => { setViewMode('list'); showToast('List view will be available in the full CMS.'); }}
            style={{ border: 0, background: viewMode === 'list' ? '#fff' : 'none', color: viewMode === 'list' ? '#962c4a' : '#7b8792', borderRadius: '4px', padding: '6px 8px', boxShadow: viewMode === 'list' ? '0 1px 3px #d8dde2' : 'none', cursor: 'pointer' }}
          >
            ☷
          </button>
        </div>
      </section>

      <div style={{ display: 'flex', gap: '9px', overflowX: 'auto', paddingBottom: '3px', marginBottom: '19px' }}>
        {[
          { label: 'All subjects', val: '' },
          { label: 'Mathematics', val: 'Mathematics' },
          { label: 'Physics', val: 'Physics' },
          { label: 'Biology', val: 'Biology' },
          { label: 'Chemistry', val: 'Chemistry' },
          { label: 'English', val: 'English' },
          { label: 'Geography', val: 'Geography' },
          { label: 'Business Studies', val: 'Business' }
        ].map(item => (
          <button
            key={item.label}
            onClick={() => setSelectedSubject(item.val)}
            style={{
              flex: '0 0 auto',
              border: `1px solid ${selectedSubject === item.val ? '#e2bcc7' : '#e3e8ed'}`,
              background: selectedSubject === item.val ? '#fbf0f3' : '#fff',
              color: selectedSubject === item.val ? '#962c4a' : '#576473',
              padding: '8px 11px',
              borderRadius: '17px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filteredCourses.length > 0 ? (
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
          {filteredCourses.map((c) => (
            <article 
              key={c.id} 
              style={{ background: '#fff', border: '1px solid #e3e8ed', borderRadius: '12px', overflow: 'hidden', transition: '.2s' }}
              className="hover:shadow-[0_12px_26px_rgba(37,51,64,0.09)] hover:-translate-y-[2px]"
            >
              <div style={{ height: '111px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', color: '#fff', background: c.gradient }}>
                <span style={{ fontSize: '10px', letterSpacing: '.1em', fontWeight: 700, opacity: 0.86 }}>
                  {c.subject.toUpperCase()} · {c.form.toUpperCase()}
                </span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '38px', opacity: 0.3, lineHeight: 0.8 }}>
                  {c.mark}
                </span>
              </div>
              <div style={{ padding: '15px' }}>
                <h2 style={{ fontSize: '15px', margin: '0 0 4px', fontWeight: 700 }}>{c.title}</h2>
                <p style={{ margin: 0, color: '#63707d', fontSize: '11px' }}>{c.subtitle}</p>
                <div style={{ display: 'flex', gap: '12px', color: '#75818c', fontSize: '10px', margin: '13px 0' }}>
                  <span>▤ {c.lessons} lessons</span>
                  <span>♙ {c.learners.toLocaleString()} learners</span>
                </div>
                <div style={{ height: '5px', background: '#ecf0f2', borderRadius: '8px', overflow: 'hidden' }}>
                  <b style={{ display: 'block', height: '100%', background: '#962c4a', borderRadius: '8px', width: `${c.coverage}%` }}></b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#78848e', marginTop: '6px' }}>
                  <span>Content coverage</span>
                  <b>{c.coverage}%</b>
                </div>
                <div style={{ borderTop: '1px solid #e3e8ed', margin: '14px -15px -15px', padding: '10px 15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    padding: '4px 7px',
                    borderRadius: '12px',
                    background: c.status === 'Published' ? '#eaf8f3' : '#fff6e6',
                    color: c.status === 'Published' ? '#11805d' : '#9d6808',
                    fontSize: '9px',
                    fontWeight: 700
                  }}>
                    {c.status}
                  </span>
                  <button 
                    onClick={() => showToast(`${c.title} workspace opened.`)} 
                    style={{ border: 0, background: 'none', color: '#962c4a', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {c.status === 'Published' ? 'Manage →' : 'Review →'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div style={{ border: '1px dashed #c9d1d8', background: '#fff', padding: '52px', textAlign: 'center', borderRadius: '11px', color: '#63707d' }}>
          <b style={{ fontSize: '14px', display: 'block', marginBottom: '6px' }}>No courses match these filters.</b>
          <p style={{ margin: 0, fontSize: '12px' }}>Try changing the subject, form, status or search term.</p>
        </div>
      )}

      {/* Modal to Create Course */}
      {isModalOpen && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,33,0.5)', zIndex: 50, padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            style={{ width: 'min(630px, 100%)', background: '#fff', borderRadius: '15px', padding: '25px', boxShadow: '0 28px 70px rgba(10,16,24,.24)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '10px', color: '#909aa5', fontWeight: 700, letterSpacing: '.12em' }}>COURSE SETUP</span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, margin: '5px 0' }}>Create a new course</h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                style={{ border: 0, background: 'none', color: '#85909a', fontSize: '22px', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>
            <p style={{ fontSize: '12px', color: '#63707d', margin: '0 0 15px' }}>Set the academic structure first. You can add modules and content after creation.</p>
            
            <form onSubmit={handleCreateCourse}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '11px', marginTop: '17px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', textTransform: 'uppercase', letterSpacing: '.07em', fontSize: '9px', color: '#697581', fontWeight: 700, marginBottom: '6px' }}>Course title</label>
                  <input 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. History of Tanzania · Form 3"
                    style={{ width: '100%', border: '1px solid #e3e8ed', borderRadius: '7px', padding: '10px', fontSize: '12px', outline: 0, boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', textTransform: 'uppercase', letterSpacing: '.07em', fontSize: '9px', color: '#697581', fontWeight: 700, marginBottom: '6px' }}>Subject</label>
                  <select 
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    style={{ width: '100%', border: '1px solid #e3e8ed', borderRadius: '7px', padding: '10px', fontSize: '12px', outline: 0, background: '#fff' }}
                  >
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Biology</option>
                    <option>Chemistry</option>
                    <option>English</option>
                    <option>History</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', textTransform: 'uppercase', letterSpacing: '.07em', fontSize: '9px', color: '#697581', fontWeight: 700, marginBottom: '6px' }}>Class level</label>
                  <select 
                    value={newClassLevel}
                    onChange={(e) => setNewClassLevel(e.target.value)}
                    style={{ width: '100%', border: '1px solid #e3e8ed', borderRadius: '7px', padding: '10px', fontSize: '12px', outline: 0, background: '#fff' }}
                  >
                    <option>Form 1</option>
                    <option>Form 2</option>
                    <option>Form 3</option>
                    <option>Form 4</option>
                    <option>Form 5</option>
                    <option>Form 6</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', textTransform: 'uppercase', letterSpacing: '.07em', fontSize: '9px', color: '#697581', fontWeight: 700, marginBottom: '6px' }}>Curriculum</label>
                  <select style={{ width: '100%', border: '1px solid #e3e8ed', borderRadius: '7px', padding: '10px', fontSize: '12px', outline: 0, background: '#fff' }}>
                    <option>NECTA CBC 2023</option>
                    <option>Cambridge</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', textTransform: 'uppercase', letterSpacing: '.07em', fontSize: '9px', color: '#697581', fontWeight: 700, marginBottom: '6px' }}>Publishing status</label>
                  <select 
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    style={{ width: '100%', border: '1px solid #e3e8ed', borderRadius: '7px', padding: '10px', fontSize: '12px', outline: 0, background: '#fff' }}
                  >
                    <option value="Save as draft">Save as draft</option>
                    <option value="Send for review">Send for review</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '9px', marginTop: '20px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  style={{ border: 0, background: 'none', color: '#667381', fontSize: '12px', fontWeight: 700, padding: '10px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ border: 0, background: '#962c4a', color: '#fff', borderRadius: '7px', padding: '11px 15px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Create course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
