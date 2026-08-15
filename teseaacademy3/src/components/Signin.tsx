import React, { useState } from 'react';
import { auth, googleProvider, db } from '../lib/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface SigninProps {
  onGoToSignup: () => void;
  onGoToPlans: () => void;
  onUserAuthenticated?: (user: { name: string; email: string; role: string }) => void;
  onGoToLanding?: () => void;
  onGoToAdmin?: () => void;
  showToast: (msg: string) => void;
}

export default function Signin({ onGoToSignup, onGoToPlans, onUserAuthenticated, onGoToLanding, onGoToAdmin, showToast }: SigninProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      showToast('Please enter your email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      // Check existing user profile in Firestore
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      let userName = userCred.user.displayName || 'Learner';
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data?.fullName) userName = data.fullName;
      }

      setIsSubmitting(false);
      showToast(`Welcome back, ${userName}!`);
      const userObj = { name: userName, email: userCred.user.email || email, role: 'Student' };
      if (onUserAuthenticated) {
        onUserAuthenticated(userObj);
      } else {
        onGoToPlans();
      }
    } catch (err: any) {
      setIsSubmitting(false);
      console.error('Sign in error:', err);
      if (err?.code === 'auth/invalid-credential' || err?.code === 'auth/user-not-found' || err?.code === 'auth/wrong-password') {
        showToast('Invalid email or password. Please check your credentials.');
      } else {
        showToast(err?.message || 'Failed to sign in. Please try again.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      setIsGoogleLoading(false);
      if (res.user) {
        let userName = res.user.displayName || 'Learner';

        try {
          const uid = res.user.uid;
          const userDocRef = doc(db, 'users', uid);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            await setDoc(userDocRef, {
              uid,
              fullName: userName,
              email: res.user.email,
              learningPath: 'General Learning',
              createdAt: new Date().toISOString()
            }, { merge: true });
          } else {
            const data = userDoc.data();
            if (data?.fullName) userName = data.fullName;
          }
        } catch (fsErr) {
          console.warn('Firestore user doc sync notice:', fsErr);
        }

        showToast(`Welcome back, ${userName}! Signed in with Google.`);
        const userObj = { name: userName, email: res.user.email || '', role: 'Student' };
        if (onUserAuthenticated) {
          onUserAuthenticated(userObj);
        } else {
          onGoToPlans();
        }
      }
    } catch (err: any) {
      setIsGoogleLoading(false);
      console.error('Google sign in error:', err);
      if (err?.code === 'auth/popup-blocked') {
        showToast('Popup was blocked by browser. Please allow popups to sign in with Google.');
      } else if (err?.code === 'auth/popup-closed-by-user') {
        showToast('Google sign-in popup was closed.');
      } else {
        showToast(err?.message || 'Google sign-in failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[minmax(400px,45%)_1fr] bg-white font-sans text-slate-800">
      {/* Story Panel */}
      <section className="relative overflow-hidden p-8 lg:p-16 text-white bg-gradient-to-br from-[#741a39] via-[#9c3151] to-[#c75571] flex flex-col justify-between">
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-lg tracking-tight">
            <span className="w-9 h-9 rounded-xl bg-white text-[#8f2948] grid place-items-center font-extrabold text-xl shadow-lg">✦</span>
            <span>TESEA Academy</span>
          </div>
          <div className="flex items-center gap-2">
            {onGoToAdmin && (
              <button
                onClick={onGoToAdmin}
                className="text-xs bg-white/25 hover:bg-white/35 text-white px-3 py-1.5 rounded-lg transition-colors border border-white/30 font-bold"
              >
                Admin Panel
              </button>
            )}
            <button
              onClick={onGoToPlans}
              className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors border border-white/20"
            >
              Explore Plans →
            </button>
          </div>
        </div>

        <div className="relative z-10 my-auto py-12 max-w-md">
          <p className="text-xs font-bold uppercase tracking-widest text-pink-100 mb-4 flex items-center gap-2">
            <span className="w-6 h-[1px] bg-pink-200"></span> Tanzania's learning companion
          </p>
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            Learn today.<br />Lead tomorrow.
          </h1>
          <p className="text-white/85 text-base leading-relaxed mb-8">
            Discover focused lessons, practice smarter with AI, and build the confidence to achieve more—at school and beyond.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <div className="flex -space-x-2">
              <span className="w-8 h-8 rounded-full border-2 border-[#a33353] bg-[#d9b080] grid place-items-center text-xs font-bold text-slate-900">A</span>
              <span className="w-8 h-8 rounded-full border-2 border-[#a33353] bg-[#8eb1a6] grid place-items-center text-xs font-bold text-slate-900">J</span>
              <span className="w-8 h-8 rounded-full border-2 border-[#a33353] bg-[#d0a4b2] grid place-items-center text-xs font-bold text-slate-900">M</span>
              <span className="w-8 h-8 rounded-full border-2 border-[#a33353] bg-[#f1d387] grid place-items-center text-xs font-bold text-[#603144]">+8k</span>
            </div>
            <small className="text-xs text-pink-100 leading-tight">
              Join thousands of ambitious<br />learners across Tanzania.
            </small>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-xs text-pink-200">
          <span className="w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_0_4px_rgba(149,231,201,0.2)]"></span>
          <span>Designed for NECTA, Cambridge &amp; lifelong learning</span>
        </div>
      </section>

      {/* Login Form Panel */}
      <section className="flex flex-col min-h-screen justify-between p-6 sm:p-12 lg:p-20">
        <div className="flex items-center justify-between w-full max-w-md mx-auto">
          <button 
            type="button" 
            onClick={() => onGoToLanding ? onGoToLanding() : onGoToPlans()} 
            className="font-bold text-slate-900 text-lg flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-[#8f2948] font-black text-xl">TESEA</span>
            <span className="text-slate-700 font-semibold text-base">ACADEMY</span>
          </button>
          <a href="#help" onClick={(e) => { e.preventDefault(); showToast('Support center available 24/7.'); }} className="text-xs text-slate-500 hover:text-[#8f2948] transition-colors">
            Need help?
          </a>
        </div>

        <div className="w-full max-w-md mx-auto my-auto py-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Welcome back</h2>
          <p className="text-slate-500 text-sm mb-8">Sign in to continue your personal learning journey.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="signin-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email address or phone number
              </label>
              <input
                id="signin-email"
                type="text"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-1.5 border-slate-200 rounded-lg px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#8f2948] focus:ring-4 focus:ring-[#8f2948]/10 transition-all"
              />
            </div>

            <div>
              <label htmlFor="signin-password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="signin-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border-1.5 border-slate-200 rounded-lg px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#8f2948] focus:ring-4 focus:ring-[#8f2948]/10 transition-all pr-16"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8f2948] hover:underline"
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#8f2948] focus:ring-[#8f2948]"
                />
                <span>Remember me</span>
              </label>
              <a
                href="#reset"
                onClick={(e) => { e.preventDefault(); showToast('Password reset link will be sent to your email.'); }}
                className="text-[#8f2948] font-bold hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#8f2948] hover:bg-[#67172f] text-white font-bold py-3.5 rounded-lg shadow-lg shadow-[#8f2948]/20 transition-all hover:-translate-y-0.5 disabled:opacity-70 text-sm mt-2"
            >
              {isSubmitting ? 'Signing in…' : 'Sign in to TESEA Academy'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6 text-xs text-slate-400">
            <div className="h-[1px] bg-slate-200 flex-1"></div>
            <span>or continue with</span>
            <div className="h-[1px] bg-slate-200 flex-1"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="w-full border-1.5 border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold py-3 rounded-lg flex items-center justify-center gap-2.5 text-sm transition-all shadow-sm disabled:opacity-70"
          >
            {isGoogleLoading ? (
              <span className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="text-blue-500 font-extrabold text-lg">G</span>
            )}
            {isGoogleLoading ? 'Connecting to Google...' : 'Google'}
          </button>

          <p className="text-center text-xs text-slate-500 mt-6">
            New to TESEA Academy?{' '}
            <button
              type="button"
              onClick={onGoToSignup}
              className="text-[#8f2948] font-bold hover:underline"
            >
              Create a free account
            </button>
          </p>
        </div>

        <footer className="flex justify-center gap-4 text-xs text-slate-400 max-w-md mx-auto w-full pt-4">
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:underline">Privacy</a>
          <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:underline">Terms of use</a>
          <a href="#support" onClick={(e) => e.preventDefault()} className="hover:underline">Support centre</a>
          <span>© 2026 TESEA Academy</span>
        </footer>
      </section>
    </div>
  );
}
