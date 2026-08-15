import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  FileText, 
  HelpCircle,
  LogOut
} from 'lucide-react';

interface StudentDashboardProps {
  userName?: string;
  userEmail?: string;
  learningPath?: string;
  onGoToPlans: () => void;
  onLogout: () => void;
  showToast: (msg: string) => void;
}

export default function StudentDashboard({
  userName = '',
  userEmail = '',
  learningPath = 'Form 4 NECTA',
  onGoToPlans,
  onLogout,
  showToast
}: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'quizzes' | 'ai'>('overview');

  return (
    <div className="min-h-screen bg-[#f8f7f5] text-[#22232b] font-sans antialiased">
      {/* Header */}
      <header className="h-[72px] bg-white border-b border-[#e8e5e2] sticky top-0 z-40 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="TESEA Academy" className="h-12 object-contain object-left" />
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-slate-900">{userName}</div>
            <div className="text-[11px] text-[#727680]">{learningPath}</div>
          </div>
          <button
            onClick={onLogout}
            className="p-2 text-slate-500 hover:text-[#962c4c] hover:bg-slate-100 rounded-xl transition-colors"
            title="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 space-y-8">
        <div className="bg-gradient-to-r from-[#18212b] via-[#243342] to-[#962c4c] text-white p-8 rounded-3xl shadow-xl space-y-4">
          <span className="text-xs font-bold bg-white/20 text-white px-3 py-1 rounded-full uppercase tracking-wider">
            Active Student Account
          </span>
          <h2 className="text-3xl font-serif font-bold">Welcome back, {userName}!</h2>
          <p className="text-sm text-white/80 max-w-xl leading-relaxed">
            Your personalized Form 4 NECTA revision path is active. Continue where you left off or practice with NECTA past papers.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => showToast('Resuming your active lesson...')}
              className="bg-white text-[#18212b] font-bold text-xs px-5 py-3 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Resume Mathematics Lesson →
            </button>
            <button
              onClick={onGoToPlans}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-3 rounded-xl border border-white/20 transition-colors"
            >
              View Membership Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
