import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Signin from './components/Signin';
import MyCoursesPage from './components/MyCoursesPage';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import SchoolAdminDashboard from './components/SchoolAdminDashboard';
import { db, auth } from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, query, orderBy, limit, doc, getDoc } from 'firebase/firestore';

interface Feature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  eyebrow: string;
  flag?: string;
  name: string;
  description: string;
  monthlyPrice: string;
  annualPrice: string;
  currency: string;
  popular?: boolean;
  features: Feature[];
}

interface Transaction {
  id: string;
  plan: string;
  cycle: string;
  amount: string;
  currency: string;
  paymentMethod: string;
  accountNumber: string;
  status: 'COMPLETED' | 'PENDING_PUSH' | 'FAILED';
  createdAt: string;
}

const DEFAULT_PLANS: Plan[] = [
  {
    id: 'Explorer',
    eyebrow: 'Get started',
    name: 'Explorer',
    description: 'Build a focused study habit with the essentials.',
    monthlyPrice: '9,900',
    annualPrice: '7,920',
    currency: 'TZS',
    popular: false,
    features: [
      { text: '3 subjects of your choice', included: true },
      { text: '200+ practice questions monthly', included: true },
      { text: 'Study notes & video lessons', included: true },
      { text: 'AI Tutor access', included: false }
    ]
  },
  {
    id: 'Achiever',
    eyebrow: 'Best value',
    flag: 'MOST POPULAR',
    name: 'Achiever',
    description: 'The complete companion for serious secondary learners.',
    monthlyPrice: '19,900',
    annualPrice: '15,920',
    currency: 'TZS',
    popular: true,
    features: [
      { text: 'All NECTA secondary subjects', included: true },
      { text: 'Unlimited quizzes & mock exams', included: true },
      { text: 'Ask Rafiki AI Tutor', included: true },
      { text: 'Progress insights & certificates', included: true }
    ]
  },
  {
    id: 'Scholar',
    eyebrow: 'For future leaders',
    name: 'Scholar',
    description: 'Go further with both NECTA and Cambridge learning tracks.',
    monthlyPrice: '34,900',
    annualPrice: '27,920',
    currency: 'TZS',
    popular: false,
    features: [
      { text: 'Everything in Achiever', included: true },
      { text: 'Cambridge learning pathway', included: true },
      { text: 'Premium puzzle studio', included: true },
      { text: 'Priority learner support', included: true }
    ]
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'signup' | 'signin' | 'plans' | 'my-courses' | 'student-dashboard' | 'teacher-dashboard' | 'school-dashboard'>('landing');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [plans, setPlans] = useState<Plan[]>(DEFAULT_PLANS);
  const [cycle, setCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string>('Achiever');
  const [selectedPrice, setSelectedPrice] = useState<string>('19,900');
  const [method, setMethod] = useState<string>('M-Pesa');
  const [paymentInput, setPaymentInput] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Auto-restore session from device memory & Firebase auth state
  useEffect(() => {
    // 1. Check local device storage first for instant load
    try {
      const savedUserStr = localStorage.getItem('tesea_device_session');
      const savedView = localStorage.getItem('tesea_active_view');
      if (savedUserStr) {
        const savedUser = JSON.parse(savedUserStr);
        if (savedUser && (savedUser.email || savedUser.name)) {
          setCurrentUser(savedUser);
          if (savedView && savedView !== 'signin' && savedView !== 'signup') {
            setCurrentView(savedView as any);
          } else {
            setCurrentView('my-courses');
          }
        }
      }
    } catch (err) {
      console.warn('Failed to parse saved device session:', err);
    }

    // 2. Subscribe to Firebase auth persistent session
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        let userName = firebaseUser.displayName || 'Learner';
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data?.fullName) userName = data.fullName;
          }
        } catch (e) {
          console.warn('Firestore doc check error:', e);
        }

        const userObj = {
          name: userName,
          email: firebaseUser.email || '',
          role: 'Student'
        };
        setCurrentUser(userObj);
        try {
          localStorage.setItem('tesea_device_session', JSON.stringify(userObj));
        } catch (e) {}

        // Automatically bypass landing/signin/signup if user is already signed in on this device
        setCurrentView((prevView) => {
          if (prevView === 'landing' || prevView === 'signin' || prevView === 'signup') {
            return 'my-courses';
          }
          return prevView;
        });
      }
    });

    fetchPlans();
    fetchTransactions();

    return () => unsubscribe();
  }, []);

  // Save active view for device persistence
  useEffect(() => {
    if (currentUser && currentView !== 'signin' && currentView !== 'signup' && currentView !== 'landing') {
      try {
        localStorage.setItem('tesea_active_view', currentView);
      } catch (e) {}
    }
  }, [currentView, currentUser]);

  const fetchPlans = async () => {
    try {
      const res = await fetch('/api/plans');
      if (res.ok) {
        const data = await res.json();
        if (data.plans && data.plans.length > 0) setPlans(data.plans);
      }
    } catch (err) {
      console.warn('Backend API /api/plans unavailable, using default plans fallback:', err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const q = query(collection(db, 'transactions'), orderBy('createdAt', 'desc'), limit(10));
      const snapshot = await getDocs(q);
      const list: Transaction[] = [];
      snapshot.forEach((docSnap) => {
        list.push(docSnap.data() as Transaction);
      });
      if (list.length > 0) {
        setTransactions(list);
        return;
      }
      const res = await fetch('/api/subscriptions/transactions');
      if (res.ok) {
        const data = await res.json();
        if (data.transactions) setTransactions(data.transactions);
      }
    } catch (err) {
      console.error('Failed to load transactions:', err);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 5000);
  };

  const handleChoosePlan = (planName: string, monthly: string, annual: string) => {
    const amount = cycle === 'annual' ? annual : monthly;
    setSelectedPlan(planName);
    setSelectedPrice(amount);
    setIsModalOpen(true);
  };

  const handleCheckoutSubmit = async () => {
    if (!paymentInput.trim()) {
      showToast('Please enter your phone number or account details before proceeding.');
      return;
    }

    setIsSubmitting(true);
    try {
      const txId = 'TSA-' + Math.floor(100000 + Math.random() * 900000);
      const status = (method === 'M-Pesa' || method === 'Airtel Money') ? 'PENDING_PUSH' : 'COMPLETED';

      // Store transaction in Firestore
      await addDoc(collection(db, 'transactions'), {
        id: txId,
        plan: selectedPlan,
        cycle,
        amount: selectedPrice,
        currency: 'TZS',
        paymentMethod: method,
        accountNumber: paymentInput,
        status,
        createdAt: new Date().toISOString()
      });

      const res = await fetch('/api/subscriptions/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: selectedPlan,
          cycle,
          amount: selectedPrice,
          paymentMethod: method,
          accountNumber: paymentInput
        })
      });

      const data = await res.json();
      setIsSubmitting(false);

      if (res.ok && data.success) {
        setIsModalOpen(false);
        setPaymentInput('');
        showToast(data.message || `${selectedPlan} plan selected. Payment request sent.`);
        fetchTransactions();
      } else {
        showToast(data.message || 'Payment could not be completed. Please try again.');
      }
    } catch (err) {
      setIsSubmitting(false);
      showToast('Network error occurred. Please try again.');
    }
  };

  const handleSchoolInquiry = async () => {
    try {
      await addDoc(collection(db, 'school_inquiries'), {
        id: 'SCH-' + Math.floor(10000 + Math.random() * 90000),
        schoolName: 'Secondary School',
        email: 'school@tesea.ac.tz',
        createdAt: new Date().toISOString()
      });

      const res = await fetch('/api/school-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolName: 'Secondary School',
          email: 'school@tesea.ac.tz'
        })
      });
      const data = await res.json();
      showToast(data.message || 'School plans inquiry submitted successfully.');
    } catch (err) {
      showToast('School plans are tailored for your learners. Our education team will be in touch.');
    }
  };

  // Payment method labels and placeholders
  const methodLabels: Record<string, string> = {
    'M-Pesa': 'M-Pesa phone number',
    'Airtel Money': 'Airtel Money phone number',
    'Card': 'Card number',
    'Bank': 'Email address for payment instructions'
  };

  const methodPlaceholders: Record<string, string> = {
    'M-Pesa': 'e.g. 07XX XXX XXX',
    'Airtel Money': 'e.g. 07XX XXX XXX',
    'Card': '0000 0000 0000 0000',
    'Bank': 'you@example.com'
  };

  // Fallback plans if API is loading or unavailable
  const displayPlans = plans.length > 0 ? plans : DEFAULT_PLANS;

  const handleUserAuthenticated = (user: { name: string; email: string; role: string }) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('tesea_device_session', JSON.stringify(user));
      localStorage.setItem('tesea_active_view', 'my-courses');
    } catch (e) {}
    setCurrentView('my-courses');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('Signout error:', err);
    }
    try {
      localStorage.removeItem('tesea_device_session');
      localStorage.removeItem('tesea_active_view');
    } catch (e) {}
    setCurrentUser(null);
    setCurrentView('signin');
    showToast('Signed out successfully.');
  };

  if (currentView === 'landing') {
    return (
      <>
        <LandingPage
          onGoToSignup={() => setCurrentView('signup')}
          onGoToSignin={() => setCurrentView('signin')}
          onGoToPlans={() => setCurrentView('plans')}
          onOpenDemoDashboard={(role) => {
            if (role === 'teacher') setCurrentView('teacher-dashboard');
            else if (role === 'school') setCurrentView('school-dashboard');
            else setCurrentView('my-courses');
          }}
          showToast={showToast}
        />
        <div className={`toast ${isToastVisible ? 'show' : ''}`}>
          {toastMessage}
        </div>
      </>
    );
  }

  if (currentView === 'signup') {
    return (
      <>
        <Signup
          onGoToPlans={() => setCurrentView('my-courses')}
          onGoToSignin={() => setCurrentView('signin')}
          onUserAuthenticated={handleUserAuthenticated}
          onGoToLanding={() => setCurrentView('my-courses')}
          showToast={showToast}
        />
        <div className={`toast ${isToastVisible ? 'show' : ''}`}>
          {toastMessage}
        </div>
      </>
    );
  }

  if (currentView === 'signin') {
    return (
      <>
        <Signin
          onGoToSignup={() => setCurrentView('signup')}
          onGoToPlans={() => setCurrentView('my-courses')}
          onUserAuthenticated={handleUserAuthenticated}
          onGoToLanding={() => setCurrentView('my-courses')}
          onGoToAdmin={() => setCurrentView('school-dashboard')}
          showToast={showToast}
        />
        <div className={`toast ${isToastVisible ? 'show' : ''}`}>
          {toastMessage}
        </div>
      </>
    );
  }

  if (currentView === 'my-courses') {
    return (
      <>
        <MyCoursesPage
          userName={currentUser?.name || ''}
          userEmail={currentUser?.email || ''}
          isNewUser={!currentUser}
          userTrack="Form 4 • NECTA Track"
          onGoToLanding={() => setCurrentView('my-courses')}
          onGoToLessonPlayer={(title) => showToast(`Loading video lesson player for ${title}...`)}
          onLogout={handleLogout}
          showToast={showToast}
        />
        <div className={`toast ${isToastVisible ? 'show' : ''}`}>
          {toastMessage}
        </div>
      </>
    );
  }

  if (currentView === 'student-dashboard') {
    return (
      <>
        <StudentDashboard
          userName={currentUser?.name || ''}
          userEmail={currentUser?.email || ''}
          learningPath="Form 4 NECTA"
          onGoToPlans={() => setCurrentView('plans')}
          onLogout={handleLogout}
          showToast={showToast}
        />
        <div className={`toast ${isToastVisible ? 'show' : ''}`}>
          {toastMessage}
        </div>
      </>
    );
  }

  if (currentView === 'teacher-dashboard') {
    return (
      <TeacherDashboard
        userName={currentUser?.name || ''}
        userEmail={currentUser?.email || ''}
        onLogout={handleLogout}
        showToast={showToast}
      />
    );
  }

  if (currentView === 'school-dashboard') {
    return (
      <SchoolAdminDashboard
        userName={currentUser?.name || ''}
        userEmail={currentUser?.email || ''}
        onLogout={handleLogout}
        showToast={showToast}
      />
    );
  }

  return (
    <>
      <div className="topline"></div>
      
      {/* Navigation Header */}
      <nav className="nav">
        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); setCurrentView('my-courses'); }}>
          <div className="brand-fallback">
            <span>TESEA</span>
            <span style={{ color: '#18212b', fontWeight: 600, fontSize: '18px' }}>ACADEMY</span>
          </div>
        </a>
        <div className="navlinks">
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('signin'); }}>Sign In</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('signup'); }}>Sign Up</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Browse courses</a>
          <a href="#" onClick={(e) => e.preventDefault()}>For schools</a>
        </div>
        <div className="navright">
          <a className="help" href="#" onClick={(e) => e.preventDefault()}>Help centre</a>
          <div className="avatar">EG</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-inner">
          <div className="crumb">
            TESEA Academy <span>/</span> Subscription
          </div>
          <h1>Invest in the learner you are becoming.</h1>
          <p>
            One purposeful membership for the skills, confidence and exam readiness that move you forward—at school and beyond it.
          </p>
          <div className="trust">
            <div><span className="check">✓</span> Cancel whenever you need</div>
            <div><span className="check">✓</span> M-Pesa, Airtel Money & cards</div>
            <div><span className="check">✓</span> Learn on any device</div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="main">
        {/* Billing Cycle Controls */}
        <div className="control-row">
          <h2>Choose the plan that fits your journey</h2>
          <div className="billing">
            <button
              className={cycle === 'monthly' ? 'active' : ''}
              onClick={() => setCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={cycle === 'annual' ? 'active' : ''}
              onClick={() => setCycle('annual')}
            >
              Annual <span className="save">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Plans Grid */}
        <section className="plans">
          {displayPlans.map((plan) => {
            const currentAmount = cycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            const isPopular = plan.popular;

            return (
              <article
                key={plan.id}
                className={`plan ${isPopular ? 'popular' : ''}`}
                data-plan={plan.name}
              >
                {plan.flag && <div className="flag">{plan.flag}</div>}
                <div className="plan-top">
                  <div className="eyebrow">{plan.eyebrow}</div>
                  <h3>{plan.name}</h3>
                  <p className="desc">{plan.description}</p>
                </div>
                <div className="price">
                  <span className="currency">{plan.currency || 'TZS'}</span>
                  <span className="amount">{currentAmount}</span>
                  <span className="period">{cycle === 'annual' ? '/ month*' : '/ month'}</span>
                </div>
                <div className="price-note">
                  {cycle === 'annual' ? 'Billed annually' : 'Billed monthly'}
                </div>
                <button
                  className="select"
                  onClick={() => handleChoosePlan(plan.name, plan.monthlyPrice, plan.annualPrice)}
                >
                  Choose {plan.name}
                </button>
                <ul className="features">
                  {plan.features.map((feat, idx) => (
                    <li key={idx}>
                      {feat.included ? (
                        <span className="tick">✓</span>
                      ) : (
                        <span className="muted-tick">—</span>
                      )}
                      {feat.text}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </section>

        {/* School Strip */}
        <section className="course-strip">
          <div className="course-icon">🏫</div>
          <div>
            <h3>Buying for a school, class or organisation?</h3>
            <p>Flexible group plans and educator dashboards designed for schools across Tanzania.</p>
          </div>
          <button id="schoolBtn" onClick={handleSchoolInquiry}>
            Explore school plans →
          </button>
        </section>

        {/* Transaction History Banner if any transactions exist */}
        {transactions.length > 0 && (
          <div className="history-banner" style={{ marginTop: '24px' }}>
            <h4>Kumbukumbu za Malipo Yako (Backend Subscription History)</h4>
            <div className="history-list">
              {transactions.slice(0, 3).map((tx) => (
                <div key={tx.id} className="history-item">
                  <div>
                    <strong>{tx.plan} ({tx.cycle})</strong> — TZS {tx.amount} via {tx.paymentMethod}
                    <div style={{ color: '#637080', fontSize: '11px' }}>Ref: {tx.id} | Account: {tx.accountNumber}</div>
                  </div>
                  <span className={`badge ${tx.status}`}>{tx.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="footnotes">
          Your subscription renews automatically at the selected rate until cancelled. By continuing, you agree to the TESEA Academy <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>
      </main>

      {/* Payment Modal */}
      <div className={`modalback ${isModalOpen ? 'open' : ''}`} onClick={(e) => {
        if (e.target === e.currentTarget) setIsModalOpen(false);
      }}>
        <div className="modal">
          <div className="modal-head">
            <button
              className="close"
              aria-label="Close"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h3>Complete your membership</h3>
            <p>Secure payment, instant access to your learning plan.</p>
          </div>
          <div className="modal-body">
            <div className="summary">
              <div>
                <strong>{selectedPlan}</strong>
                <small>{cycle === 'annual' ? 'Annual membership · billed yearly' : 'Monthly membership'}</small>
              </div>
              <b>TZS {selectedPrice}</b>
            </div>

            <div className="methods">
              {['M-Pesa', 'Airtel Money', 'Card', 'Bank'].map((m) => (
                <button
                  key={m}
                  className={`method ${method === m ? 'active' : ''}`}
                  onClick={() => setMethod(m)}
                >
                  {m === 'M-Pesa' && '📱 M-Pesa'}
                  {m === 'Airtel Money' && '📲 Airtel Money'}
                  {m === 'Card' && '▣ Visa / Mastercard'}
                  {m === 'Bank' && '⌂ Bank transfer'}
                </button>
              ))}
            </div>

            <div className="field">
              <label>{methodLabels[method] || 'Phone or Account number'}</label>
              <input
                value={paymentInput}
                onChange={(e) => setPaymentInput(e.target.value)}
                placeholder={methodPlaceholders[method] || 'e.g. 07XX XXX XXX'}
                inputMode={method === 'Card' || method === 'M-Pesa' || method === 'Airtel Money' ? 'numeric' : 'text'}
              />
            </div>

            <button
              className="pay"
              onClick={handleCheckoutSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Inashughulikia...' : 'Continue securely'}
            </button>

            <p className="secure">
              🔒 Payments are processed securely. You can cancel anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <div className={`toast ${isToastVisible ? 'show' : ''}`}>
        {toastMessage}
      </div>
    </>
  );
}

