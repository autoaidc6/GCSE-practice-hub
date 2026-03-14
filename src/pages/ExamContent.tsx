import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, ArrowLeft, ChevronRight } from 'lucide-react';
import { TopicDots } from '../components/Common';

interface Topic {
  id: string;
  name: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number;
}

interface ExamContentProps {
  selectedSubject: {
    name: string;
    topics?: Topic[];
  };
}

export const ExamContent: React.FC<ExamContentProps> = ({ selectedSubject }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="grid grid-cols-12 gap-10"
    >
      {/* Sidebar */}
      <div className="col-span-4 space-y-2">
        <button className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Learn
        </button>
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold">{selectedSubject.name}</h1>
          <span className="text-slate-400 font-medium">AQA</span>
          {(selectedSubject as any).path && (
            <Link 
              to={(selectedSubject as any).path}
              className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-all"
            >
              Interactive Hub <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="bg-slate-50 p-2 rounded-2xl space-y-1">
          {[
            'The rate and extent of chemical change',
            'Chemical and allied industries',
            'Chemical changes',
            'Organic chemistry',
            'Structure, bonding and the property of matter',
            'Atomic structure and the periodic table',
          ].map((item, i) => (
            <button 
              key={item}
              className={`w-full text-left px-6 py-4 rounded-xl text-sm font-medium transition-all ${i === 0 ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-8 space-y-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search for any topic" 
            className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600">
                <div className="font-bold">A</div>
              </div>
              <h2 className="text-2xl font-bold">The rate and extent of chemical change</h2>
            </div>
            <div className="text-slate-400 font-medium"><span className="text-slate-900 font-bold">20</span> topics</div>
          </div>

          <div className="space-y-6">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rate of reaction</div>
            
            {selectedSubject.topics?.slice(0, 4).map((topic) => (
              <div key={topic.id} className="flex items-center justify-between group cursor-pointer">
                <span className="text-slate-700 font-medium group-hover:text-blue-600 transition-colors">{topic.name}</span>
                <div className="flex items-center gap-8">
                  <TopicDots count={topic.progress} color={topic.status === 'completed' ? 'green' : 'orange'} />
                  <ChevronRight className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </div>
            ))}

            <div className="pt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Reversible reactions and equilibrium</div>
            
            {selectedSubject.topics?.slice(4).map((topic) => (
              <div key={topic.id} className="flex items-center justify-between group cursor-pointer">
                <span className="text-slate-700 font-medium group-hover:text-blue-600 transition-colors">{topic.name}</span>
                <div className="flex items-center gap-8">
                  <TopicDots count={topic.progress} />
                  <ChevronRight className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
