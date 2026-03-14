import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  BarChart3, 
  FileText, 
  CheckCircle2, 
  ChevronRight,
  Edit3,
  User,
  Layout as LayoutIcon,
  Globe
} from 'lucide-react';
import { AnimatePresence } from 'motion/react';

// --- Pages ---
import { RevisionPlan } from './RevisionPlan';
import { ExamContent } from './ExamContent';
import { GradeTracking } from './GradeTracking';
import { PracticePapers } from './PracticePapers';
import { InstantMarking } from './InstantMarking';
import { Profile } from './Profile';

// --- Types ---

type Tab = 'revision' | 'content' | 'tracking' | 'papers' | 'marking' | 'profile';

interface Subject {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  lightColor: string;
  grade: number;
  progress: number;
  path?: string;
  topics?: Topic[];
}

interface Topic {
  id: string;
  name: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number; // 0 to 4
}

interface Paper {
  id: string;
  subject: string;
  title: string;
  questions: number;
  duration: number;
  type: 'practice' | 'past';
}

// --- Mock Data ---

const subjects: Subject[] = [
  { 
    id: 'english-lang', 
    name: 'English language', 
    icon: <FileText className="w-5 h-5" />, 
    color: 'bg-purple-500', 
    lightColor: 'bg-purple-50',
    grade: 7,
    progress: 65,
    path: '/english'
  },
  { 
    id: 'english-lit', 
    name: 'English literature', 
    icon: <BookOpen className="w-5 h-5" />, 
    color: 'bg-pink-500', 
    lightColor: 'bg-pink-50',
    grade: 6,
    progress: 45,
    path: '/english'
  },
  { 
    id: 'maths', 
    name: 'Maths', 
    icon: <div className="font-bold">÷</div>, 
    color: 'bg-blue-500', 
    lightColor: 'bg-blue-50',
    grade: 8,
    progress: 85,
    path: '/maths'
  },
  { 
    id: 'chemistry', 
    name: 'Chemistry', 
    icon: <div className="font-bold">A</div>, 
    color: 'bg-yellow-500', 
    lightColor: 'bg-yellow-50',
    grade: 7,
    progress: 70,
    path: '/science',
    topics: [
      { id: 't1', name: 'Collision theory', status: 'in-progress', progress: 2 },
      { id: 't2', name: 'Catalysts', status: 'completed', progress: 4 },
      { id: 't3', name: 'Measuring rate of reaction', status: 'completed', progress: 4 },
      { id: 't4', name: 'Factors that influence rate of reaction', status: 'completed', progress: 4 },
      { id: 't5', name: 'Dynamic equilibrium', status: 'not-started', progress: 0 },
      { id: 't6', name: 'Reversible reactions', status: 'not-started', progress: 0 },
    ]
  },
  { 
    id: 'physics', 
    name: 'Physics', 
    icon: <div className="font-bold">⚛</div>, 
    color: 'bg-slate-500', 
    lightColor: 'bg-slate-50',
    grade: 7,
    progress: 55,
    path: '/science'
  },
  { 
    id: 'biology', 
    name: 'Biology', 
    icon: <div className="font-bold">🧬</div>, 
    color: 'bg-emerald-500', 
    lightColor: 'bg-emerald-50',
    grade: 6,
    progress: 40,
    path: '/science'
  },
  { 
    id: 'geography', 
    name: 'Geography', 
    icon: <div className="font-bold">🌍</div>, 
    color: 'bg-lime-500', 
    lightColor: 'bg-lime-50',
    grade: 7,
    progress: 50
  },
  { 
    id: 'history', 
    name: 'History', 
    icon: <div className="font-bold">📜</div>, 
    color: 'bg-red-500', 
    lightColor: 'bg-red-50',
    grade: 8,
    progress: 75
  },
  { 
    id: 'spanish', 
    name: 'Spanish', 
    icon: <Globe className="w-5 h-5" />, 
    color: 'bg-amber-500', 
    lightColor: 'bg-amber-50',
    grade: 7,
    progress: 55,
    path: '/spanish'
  },
  { 
    id: 'tech', 
    name: 'Computer Science', 
    icon: <LayoutIcon className="w-5 h-5" />, 
    color: 'bg-indigo-500', 
    lightColor: 'bg-indigo-50',
    grade: 7,
    progress: 60,
    path: '/tech'
  },
];

const papers: Paper[] = [
  { id: 'p1', subject: 'English literature', title: 'Paper 1', questions: 20, duration: 20, type: 'practice' },
  { id: 'p2', subject: 'English literature', title: 'Paper 2', questions: 20, duration: 20, type: 'practice' },
  { id: 'p3', subject: 'English language', title: 'Paper 1', questions: 15, duration: 10, type: 'practice' },
  { id: 'p4', subject: 'English language', title: 'Paper 2', questions: 15, duration: 10, type: 'practice' },
  { id: 'p5', subject: 'Maths', title: 'Paper 1', questions: 20, duration: 20, type: 'practice' },
  { id: 'p6', subject: 'Maths', title: 'Paper 2', questions: 20, duration: 20, type: 'practice' },
  { id: 'p7', subject: 'Maths', title: 'Paper 3', questions: 20, duration: 20, type: 'practice' },
];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('revision');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('chemistry');

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans text-slate-900 p-4 md:p-8 pt-24">
      {/* Top Navigation Bar */}
      <nav className="max-w-6xl mx-auto mb-8 flex justify-center">
        <div className="flex items-center gap-1 bg-white/50 backdrop-blur-sm p-1 rounded-2xl shadow-sm border border-white/20">
          {[
            { id: 'revision', label: 'Revision plan' },
            { id: 'content', label: 'Exam content' },
            { id: 'tracking', label: 'Grade tracking' },
            { id: 'papers', label: 'Practice papers' },
            { id: 'marking', label: 'Instant Marking' },
            { id: 'profile', label: 'Profile' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-white shadow-md text-blue-600 scale-105' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto bg-white rounded-[40px] shadow-2xl shadow-blue-100/50 min-h-[700px] overflow-hidden border border-white relative">
        
        {/* Inner Header (Logo + Sub-nav) */}
        <div className="px-10 py-6 flex items-center justify-between border-b border-slate-50">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full translate-x-1 -translate-y-1" />
            </div>
            <h2 className="font-bold text-slate-800">Student Dashboard</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium text-slate-500">
                <Edit3 className="w-4 h-4" /> Learn
              </button>
              <button className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium ${activeTab === 'tracking' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>
                <BarChart3 className="w-4 h-4" /> Track
              </button>
              <button className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium ${activeTab === 'marking' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>
                <CheckCircle2 className="w-4 h-4" /> Test
              </button>
            </div>
            
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-100 transition-all hover:bg-slate-100 ${activeTab === 'profile' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-slate-50'}`}
            >
              <User className="w-4 h-4" />
              <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === 'profile' ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-10">
          <AnimatePresence mode="wait">
            {activeTab === 'revision' && <RevisionPlan key="revision" subjects={subjects} />}
            {activeTab === 'content' && <ExamContent key="content" selectedSubject={selectedSubject} />}
            {activeTab === 'tracking' && <GradeTracking key="tracking" subjects={subjects} />}
            {activeTab === 'papers' && <PracticePapers key="papers" subjects={subjects} papers={papers} />}
            {activeTab === 'marking' && <InstantMarking key="marking" />}
            {activeTab === 'profile' && <Profile key="profile" />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};


export default Dashboard;
