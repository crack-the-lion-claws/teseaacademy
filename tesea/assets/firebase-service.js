import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
  where
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBFTZhuExuf7iTiJC_t7yihOSCCm8bB7a0",
  authDomain: "teseaacademy-d6eae.firebaseapp.com",
  projectId: "teseaacademy-d6eae",
  firestoreDatabaseId: "ai-studio-tesea-9dfc27a7-cbbe-4df6-a35c-84700f3a8b68",
  storageBucket: "teseaacademy-d6eae.firebasestorage.app",
  messagingSenderId: "942673850074",
  appId: "1:942673850074:web:988b0de098ebd9a4c63fe3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Error handler utility for Firestore
const OperationType = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list',
  GET: 'get',
  WRITE: 'write'
};

function handleFirestoreError(error, operationType, path) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.warn('Firestore Note: ', JSON.stringify(errInfo));
}

function formatAuthError(err) {
  if (!err) return 'Authentication failed.';
  const code = err.code || '';
  switch (code) {
    case 'auth/invalid-email':
      return 'Invalid email format. Please check your email address.';
    case 'auth/user-disabled':
      return 'This user account has been disabled by an administrator.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please sign up or create an account.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please verify your credentials and try again.';
    case 'auth/email-already-in-use':
      return 'This email address is already registered. Please sign in instead.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 6 characters.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in window was closed before completion.';
    case 'auth/popup-blocked':
      return 'Browser blocked the sign-in popup. Please allow popups for this site.';
    case 'auth/unauthorized-domain':
      return 'Domain not authorized in Firebase Console > Authentication > Authorized Domains.';
    case 'auth/network-request-failed':
      return 'Network connection error. Please check your internet connection.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.';
    case 'auth/operation-not-allowed':
      return 'This sign-in provider is not enabled in Firebase Console.';
    default:
      return err.message || 'An error occurred during authentication.';
  }
}

const ADMIN_EMAILS = ['teseaacademy@gmail.com', 'crackus2@gmail.com'];

function getAssignedRole(email, provider) {
  if (!email) return 'learner';
  const cleanEmail = String(email).trim().toLowerCase();
  const isGoogle = provider === 'google' || provider === 'google.com';
  if (isGoogle && ADMIN_EMAILS.includes(cleanEmail)) {
    return 'admin';
  }
  return 'learner';
}

const DEFAULT_PROGRESS = {"BIO":0,"MTH":0,"ENG":0,"CHE":0,"PHY":0,"GEO":0,"KIS":0,"HIS":0,"CIV":0,"CSC":0,"AGR":0,"BUS":0,"COM":0,"BKP":0,"ECO":0,"LIT":0,"FRE":0,"ARB":0,"ART":0,"MUS":0,"PED":0,"FNT":0,"HEC":0,"RLS":0,"GST":0,"AMT":0,"ICT":0};
const DEFAULT_SUB = { plan: 'Free Explorer', status: 'Active', rafikiUsed: 0, rafikiLimit: 50, renewal: 'Free Tier' };

async function fetchAndApplyUserData(user, provider = 'firebase') {
  if (!user || !user.uid) return null;
  const assignedRole = getAssignedRole(user.email, provider);
  let role = assignedRole;
  let form = 'Form 3';
  let name = user.displayName || (user.email ? user.email.split('@')[0] : 'Learner');
  let page = 'dashboard';
  let subject = 'BIO';
  let topic = 0;
  let lessonMode = 'text';
  let progress = { ...DEFAULT_PROGRESS };
  let topicProgress = {};
  let lessonProgress = {};
  let quizHistory = [];
  let evidenceLedger = {};
  let subscription = { ...DEFAULT_SUB };

  try {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const data = userDoc.data();
      if (assignedRole === 'admin') {
        role = data.role || 'admin';
      } else {
        role = 'learner';
      }
      form = data.form || form;
      name = data.name || name;
      page = data.page || page;
      subject = data.subject || subject;
      topic = typeof data.topic === 'number' ? data.topic : topic;
      lessonMode = data.lessonMode || lessonMode;
      progress = data.progress ? { ...DEFAULT_PROGRESS, ...data.progress } : progress;
      topicProgress = data.topicProgress || topicProgress;
      lessonProgress = data.lessonProgress || lessonProgress;
      quizHistory = data.quizHistory || quizHistory;
      evidenceLedger = data.evidenceLedger || evidenceLedger;
      subscription = data.subscription || subscription;
    } else {
      const initPayload = {
        uid: user.uid,
        email: user.email,
        name,
        role,
        form,
        page,
        subject,
        topic,
        lessonMode,
        progress,
        topicProgress,
        lessonProgress,
        quizHistory,
        evidenceLedger,
        subscription,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      await setDoc(userDocRef, initPayload, { merge: true });
    }
  } catch (err) {
    console.warn('Firestore user profile fetch notice:', err);
    handleFirestoreError(err, OperationType.GET, `users/${user.uid}`);
  }

  const authData = {
    name,
    email: user.email,
    role,
    form,
    uid: user.uid,
    photoURL: user.photoURL || '',
    provider
  };

  if (typeof state !== 'undefined') {
    state.auth = authData;
    state.role = role;
    state.progress = progress;
    state.topicProgress = topicProgress;
    state.lessonProgress = lessonProgress;
    state.quizHistory = quizHistory;
    state.evidenceLedger = evidenceLedger;
    state.subscription = subscription;
    state.subject = subject;
    state.topic = topic;
    state.lessonMode = lessonMode;
    if (state.page === 'signin' || state.page === 'signup' || state.page === 'landing') {
      state.page = page || 'dashboard';
    }
  }

  localStorage.setItem('tesea_auth', JSON.stringify(authData));
  localStorage.setItem('tesea_role', role);
  localStorage.setItem('tesea_progress', JSON.stringify(progress));
  localStorage.setItem('tesea_topic_progress', JSON.stringify(topicProgress));
  localStorage.setItem('tesea_lesson_progress', JSON.stringify(lessonProgress));
  localStorage.setItem('tesea_quiz_history', JSON.stringify(quizHistory));
  localStorage.setItem('tesea_evidence_ledger', JSON.stringify(evidenceLedger));
  localStorage.setItem('tesea_sub', JSON.stringify(subscription));
  if (typeof state !== 'undefined' && state.page) {
    localStorage.setItem('tesea_page', state.page);
  }

  if (typeof recordActivity === 'function') {
    recordActivity('Signed in (Cloud Synced)', user.email, role);
  }

  if (typeof routeTo === 'function' && (typeof state !== 'undefined' && (state.page === 'signin' || state.page === 'signup' || state.page === 'dashboard'))) {
    routeTo(state.page || 'dashboard', { replace: true });
  } else if (typeof app === 'function') {
    app();
  }

  return user;
}

window.TESEA_FIREBASE = {
  auth,
  db,
  formatAuthError,
  
  signInWithEmail: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await fetchAndApplyUserData(user, 'firebase-email');
      if (typeof toast === 'function') {
        toast('Welcome back, ' + (user.displayName || user.email) + '!');
      }
      return user;
    } catch (error) {
      console.error('Firebase Email Sign-In error:', error);
      const friendlyMsg = formatAuthError(error);
      if (typeof toast === 'function') toast(friendlyMsg);
      throw error;
    }
  },

  signUpWithEmail: async (email, password, name, form = 'Form 3') => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const displayName = name || email.split('@')[0];
      
      try {
        await updateProfile(user, { displayName });
      } catch (profileErr) {
        console.warn('Could not update displayName:', profileErr);
      }

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        name: displayName,
        role: 'learner',
        form,
        page: 'dashboard',
        subject: 'BIO',
        topic: 0,
        lessonMode: 'text',
        progress: { ...DEFAULT_PROGRESS },
        topicProgress: {},
        lessonProgress: {},
        quizHistory: [],
        evidenceLedger: {},
        subscription: { ...DEFAULT_SUB },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });

      await fetchAndApplyUserData(user, 'firebase-email');
      if (typeof toast === 'function') {
        toast('Account created successfully! Welcome to TESEA Academy, ' + displayName);
      }
      return user;
    } catch (error) {
      console.error('Firebase Email Sign-Up error:', error);
      const friendlyMsg = formatAuthError(error);
      if (typeof toast === 'function') toast(friendlyMsg);
      throw error;
    }
  },

  signInWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await fetchAndApplyUserData(user, 'google');
      if (typeof toast === 'function') {
        toast('Signed in with Google as ' + (user.displayName || user.email));
      }
      return user;
    } catch (error) {
      console.error('Firebase Google Sign-In error:', error);
      const friendlyMsg = formatAuthError(error);
      if (typeof toast === 'function') toast(friendlyMsg);
      throw error;
    }
  },

  resetPassword: async (email) => {
    if (!email || !email.includes('@')) {
      if (typeof toast === 'function') toast('Please enter a valid email address first.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      if (typeof toast === 'function') {
        toast('Password reset link sent to your email (' + email + ').');
      }
    } catch (error) {
      console.error('Firebase Password Reset error:', error);
      const friendlyMsg = formatAuthError(error);
      if (typeof toast === 'function') toast(friendlyMsg);
      throw error;
    }
  },

  signOutUser: async () => {
    try {
      await signOut(auth);
      if (typeof state !== 'undefined') {
        state.auth = null;
        state.role = 'learner';
        state.page = 'landing';
        state.subject = 'BIO';
        state.topic = 0;
        state.lessonMode = 'text';
        state.quizAnswers = {};
        state.progress = { ...DEFAULT_PROGRESS };
        state.topicProgress = {};
        state.lessonProgress = {};
        state.quizHistory = [];
        state.evidenceLedger = {};
        state.subscription = { ...DEFAULT_SUB };
      }
      localStorage.removeItem('tesea_auth');
      localStorage.removeItem('tesea_role');
      localStorage.removeItem('tesea_progress');
      localStorage.removeItem('tesea_topic_progress');
      localStorage.removeItem('tesea_lesson_progress');
      localStorage.removeItem('tesea_quiz_history');
      localStorage.removeItem('tesea_evidence_ledger');
      localStorage.removeItem('tesea_sub');
      localStorage.setItem('tesea_page', 'landing');
      if (typeof toast === 'function') toast('Signed out successfully.');
      if (typeof routeTo === 'function') {
        routeTo('landing', { replace: true });
      } else if (typeof app === 'function') {
        app();
      }
    } catch (error) {
      console.error('Firebase Sign-Out error:', error);
      if (typeof toast === 'function') toast('Sign-out error: ' + error.message);
    }
  },
  
  saveUserDataAndProgress: async (fullState) => {
    const st = fullState || (typeof state !== 'undefined' ? state : null);
    if (!st || !st.auth || !st.auth.uid) return;
    try {
      const userDocRef = doc(db, "users", st.auth.uid);
      const payload = {
        uid: st.auth.uid,
        email: st.auth.email || '',
        name: st.auth.name || (st.auth.email ? st.auth.email.split('@')[0] : 'Learner'),
        role: st.role || 'learner',
        form: st.auth.form || 'Form 3',
        page: st.page || 'dashboard',
        subject: st.subject || 'BIO',
        topic: typeof st.topic === 'number' ? st.topic : 0,
        lessonMode: st.lessonMode || 'text',
        progress: st.progress || {},
        topicProgress: st.topicProgress || {},
        lessonProgress: st.lessonProgress || {},
        quizHistory: st.quizHistory || [],
        evidenceLedger: st.evidenceLedger || {},
        subscription: st.subscription || {},
        updatedAt: serverTimestamp()
      };
      await setDoc(userDocRef, payload, { merge: true });
    } catch (err) {
      console.warn('Failed to sync user data to Firestore:', err);
      handleFirestoreError(err, OperationType.WRITE, `users/${st.auth.uid}`);
    }
  },

  saveUserProgress: async (progress) => {
    if (typeof state !== 'undefined' && state.auth && state.auth.uid) {
      try {
        const userDocRef = doc(db, "users", state.auth.uid);
        await setDoc(userDocRef, { progress, updatedAt: serverTimestamp() }, { merge: true });
      } catch (err) {
        console.warn('Failed to save progress to Firestore:', err);
      }
    }
  },
  
  addEvent: async (event) => {
    try {
      if (!auth.currentUser) return;
      await addDoc(collection(db, "events"), {
        ...event,
        at: serverTimestamp()
      });
    } catch (e) {
      console.warn("Note on addEvent: ", e);
    }
  },
  
  getEvents: (callback) => {
    try {
      const q = query(collection(db, "events"), orderBy("at", "desc"), limit(40));
      return onSnapshot(q, (snapshot) => {
        const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(events);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, 'events');
      });
    } catch (e) {
      console.error("Error subscribing to events: ", e);
    }
  },
  
  addCommunityPost: async (post) => {
    try {
      await addDoc(collection(db, "community_posts"), {
        ...post,
        at: serverTimestamp()
      });
    } catch (e) {
      console.error("Error adding post: ", e);
    }
  },
  
  getCommunityPosts: (callback) => {
    try {
      const q = query(collection(db, "community_posts"), orderBy("at", "desc"), limit(50));
      return onSnapshot(q, (snapshot) => {
        const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(posts);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, 'community_posts');
      });
    } catch (e) {
      console.error("Error subscribing to community posts: ", e);
    }
  }
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const isGoogle = user.providerData && user.providerData.some(p => p.providerId === 'google.com');
    const provider = isGoogle ? 'google' : (user.providerData?.[0]?.providerId || 'firebase');
    await fetchAndApplyUserData(user, provider);
  } else {
    if (typeof state !== 'undefined' && state.auth) {
      state.auth = null;
      state.page = 'landing';
      if (typeof app === 'function') app();
    }
  }
});
