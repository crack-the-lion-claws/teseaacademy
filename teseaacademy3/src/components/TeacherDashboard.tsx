import React from 'react';
import { LogOut } from 'lucide-react';

interface TeacherDashboardProps {
  userName?: string;
  userEmail?: string;
  onLogout: () => void;
  showToast: (msg: string) => void;
}

export default function TeacherDashboard({
  userName = '',
  userEmail = '',
  onLogout,
  showToast
}: TeacherDashboardProps) {
  return (
    <div className="min-h-screen bg-[#f8f7f5] text-[#22232b] font-sans antialiased">
      <header className="h-[72px] bg-white border-b border-[#e8e5e2] flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="TESEA Academy" className="h-12 object-contain object-left" />
        </div>
        <button onClick={onLogout} className="p-2 text-slate-500 hover:text-[#962c4c]">
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <h2 className="text-2xl font-bold font-serif">Habari, {userName}!</h2>
        <p className="text-sm text-slate-600 mt-1">Teacher Dashboard & Lesson Management Studio</p>
      </div>
    </div>
  );
}
