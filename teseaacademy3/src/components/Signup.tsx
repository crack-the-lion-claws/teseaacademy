import React, { useState } from 'react';
import { auth, googleProvider, db } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { logActivityEvent } from '../lib/learningService';

interface SignupProps {
  onGoToPlans: () => void;
  onGoToSignin?: () => void;
  onUserAuthenticated?: (user: { name: string; email: string; role: string }) => void;
  onGoToLanding?: () => void;
  showToast: (msg: string) => void;
}

export default function Signup({ onGoToPlans, onGoToSignin, onUserAuthenticated, onGoToLanding, showToast }: SignupProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [level, setLevel] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};

    if (!name.trim()) newErrors.name = true;
    if (!email.trim() || !email.includes('@')) newErrors.email = true;
    if (!level) newErrors.level = true;
    if (!password || password.length < 8) newErrors.password = true;

    if (!agreeTerms) {
      showToast('Please accept the Terms of Use to continue.');
      setErrors(newErrors);
      return;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showToast('Please fill in all required fields correctly.');
      return;
    }

    setIsSubmitting(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      if (userCred.user) {
        await updateProfile(userCred.user, { displayName: name });
        await setDoc(doc(db, 'users', userCred.user.uid), {
          uid: userCred.user.uid,
          fullName: name,
          email: email,
          learningPath: level,
          createdAt: new Date().toISOString()
        });
        await logActivityEvent({
          title: 'New Student Registered',
          subtitle: `${name} registered for ${level}`,
          icon: '♙'
        });
      }
      setIsSubmitting(false);
      setIsSuccess(true);
      showToast('Account created and saved in Firebase!');
    } catch (err: any) {
      setIsSubmitting(false);
      console.error('Firebase Auth signup error:', err);
      const msg = err?.message || 'Failed to create account.';
      showToast(msg.includes('email-already-in-use') ? 'This email is already registered.' : msg);
    }
  };

  const handleSocialSignUp = async (providerName: string) => {
    if (providerName === 'Google') {
      setIsGoogleLoading(true);
      try {
        const res = await signInWithPopup(auth, googleProvider);
        setIsGoogleLoading(false);
        if (res.user) {
          try {
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              fullName: res.user.displayName || 'Learner',
              email: res.user.email,
              learningPath: 'General Learning',
              createdAt: new Date().toISOString()
            }, { merge: true });
            await logActivityEvent({
              title: 'Student Google Sign-in',
              subtitle: `${res.user.displayName || 'Learner'} signed in`,
              icon: '♙'
            });
          } catch (fsErr) {
            console.warn('Firestore user doc sync notice:', fsErr);
          }

          setIsSuccess(true);
          setName(res.user.displayName || 'Learner');
          showToast('Successfully signed in with Google!');
        }
      } catch (err: any) {
        setIsGoogleLoading(false);
        console.error('Google Sign In Error:', err);
        if (err?.code === 'auth/popup-blocked') {
          showToast('Popup was blocked by browser. Please allow popups to sign in with Google.');
        } else if (err?.code === 'auth/popup-closed-by-user') {
          showToast('Google sign-in popup was closed.');
        } else {
          showToast(err?.message || 'Google sign-in failed. Please ensure Google Provider is enabled in Firebase Console.');
        }
      }
    } else {
      showToast(`${providerName} sign-up requested.`);
    }
  };

  const firstName = name.split(' ')[0] || 'Learner';

  return (
    <main className="page">
      {/* Brand Side Panel */}
      <section className="brand-panel" aria-label="TESEA Academy introduction">
        <button 
          type="button"
          onClick={() => onGoToLanding ? onGoToLanding() : onGoToPlans()}
          className="brand-fallback border-0 bg-transparent text-left cursor-pointer hover:opacity-90 transition-opacity" 
          style={{ color: '#fff', fontSize: '24px', position: 'relative', zIndex: 1 }}
        >
          <span>TESEA</span>
          <span style={{ color: '#ffd98e', fontWeight: 600, fontSize: '20px', marginLeft: '6px' }}>ACADEMY</span>
        </button>
        <button
          className="return"
          onClick={onGoToPlans}
        >
          View Subscription Plans →
        </button>

        <div className="hero-auth" style={{ position: 'relative', zIndex: 1, margin: 'auto 0' }}>
          <div className="eyebrow-hero">
            <i></i> Tanzania's learning space
          </div>
          <h1>Your next chapter<br />starts here.</h1>
          <p>
            Join a learning community designed to help you study with clarity, practise with confidence and build the future you want.
          </p>
          <ul className="benefits">
            <li>
              <span className="check-svg">
                <svg viewBox="0 0 16 16"><path d="m3 8 3 3 7-7" /></svg>
              </span>
              NECTA &amp; Cambridge-aligned learning paths
            </li>
            <li>
              <span className="check-svg">
                <svg viewBox="0 0 16 16"><path d="m3 8 3 3 7-7" /></svg>
              </span>
              Personal AI Tutor whenever you need it
            </li>
            <li>
              <span className="check-svg">
                <svg viewBox="0 0 16 16"><path d="m3 8 3 3 7-7" /></svg>
              </span>
              Courses, quizzes and exam practice in one place
            </li>
          </ul>
        </div>

        <div className="trust-auth">
          <div><strong>27+</strong>secondary subjects</div>
          <div><strong>24/7</strong>learn at your pace</div>
          <div><strong>EN / SW</strong>built for Tanzania</div>
        </div>
      </section>

      {/* Form Side Panel */}
      <section className="form-panel">
        <div className="form-wrap">
          <div className="mobile-logo">
            <div className="brand-fallback">
              <span>TESEA</span>
              <span style={{ color: '#18212b', fontWeight: 600, fontSize: '18px' }}>ACADEMY</span>
            </div>
          </div>

          {!isSuccess ? (
            <div id="signup-content">
              <div className="form-top">
                <span className="step">01</span>
                <span>Create your learner account</span>
              </div>
              <h2>Start learning with TESEA.</h2>
              <p className="intro">It takes less than a minute. Your first learning journey is waiting.</p>

              <div className="socials">
                <button
                  type="button"
                  className="social"
                  onClick={() => handleSocialSignUp('Google')}
                >
                  <span className="icon google">G</span> Continue with Google
                </button>
                <button
                  type="button"
                  className="social"
                  onClick={() => handleSocialSignUp('Microsoft')}
                >
                  <span className="icon">⊞</span> Continue with Microsoft
                </button>
              </div>

              <div className="divider">or sign up with email</div>

              <form id="signup-form" onSubmit={handleSubmit} noValidate>
                <div className={`field ${errors.name ? 'error' : ''}`}>
                  <label htmlFor="name">Full name</label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="e.g. Amina Hassan"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((prev) => ({ ...prev, name: false }));
                    }}
                    required
                  />
                  <small>Please enter your full name.</small>
                </div>

                <div className={`field ${errors.email ? 'error' : ''}`}>
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({ ...prev, email: false }));
                    }}
                    required
                  />
                  <small>Enter a valid email address.</small>
                </div>

                <div className={`field ${errors.level ? 'error' : ''}`}>
                  <label htmlFor="level">What are you learning for?</label>
                  <select
                    id="level"
                    value={level}
                    onChange={(e) => {
                      setLevel(e.target.value);
                      setErrors((prev) => ({ ...prev, level: false }));
                    }}
                    required
                  >
                    <option value="">Choose your learning path</option>
                    <option value="Secondary school (Form 1–4)">Secondary school (Form 1–4)</option>
                    <option value="Advanced level (Form 5–6)">Advanced level (Form 5–6)</option>
                    <option value="Cambridge programme">Cambridge programme</option>
                    <option value="Professional & lifelong learning">Professional &amp; lifelong learning</option>
                  </select>
                  <small>Please select a learning path.</small>
                </div>

                <div className={`field ${errors.password ? 'error' : ''}`}>
                  <label htmlFor="password">Create a password</label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: false }));
                    }}
                    required
                    minLength={8}
                  />
                  <button
                    className="password-toggle"
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </button>
                  <small>Use at least 8 characters.</small>
                </div>

                <label className="checkbox">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    required
                  />
                  <span>
                    I agree to TESEA Academy’s <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Use</a> and <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>.
                  </span>
                </label>

                <button className="submit" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating your account…' : 'Create free account →'}
                </button>
              </form>

              <p className="login" id="login">
                Already have an account?{' '}
                <a
                  href="#signin"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onGoToSignin) onGoToSignin();
                  }}
                >
                  Sign in
                </a>
              </p>
            </div>
          ) : (
            <div className="success" id="success">
              <div className="tick-success">✓</div>
              <h2>Welcome to TESEA Academy.</h2>
              <p>
                Your account is ready, <strong>{firstName}</strong>. Your learning track is waiting for you.
              </p>
              <button onClick={() => {
                if (onUserAuthenticated) {
                  onUserAuthenticated({ name, email, role: 'Student' });
                } else {
                  onGoToPlans();
                }
              }}>
                Tazama Kozi Zako & Anza Kujifunza →
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
