import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Flame, ChevronRight } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  lightColor: string;
  path?: string;
}

interface RevisionPlanProps {
  subjects: Subject[];
}

export const RevisionPlan: React.FC<RevisionPlanProps> = ({ subjects }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-bold tracking-tight">
        Morning, Sam! <span className="text-slate-400 font-normal">Keep your streak by doing another practice today.</span>
      </h1>
      
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-3 space-y-6">
          <div className="bg-orange-50 p-6 rounded-3xl flex items-center gap-4 border border-orange-100">
            <div className="bg-white p-2 rounded-xl shadow-sm">
              <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">23</div>
              <div className="flex gap-1 mt-1">
                {['W', 'T', 'F'].map((d, i) => (
                  <div key={d} className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${i < 2 ? 'bg-yellow-400 text-white' : 'bg-white text-slate-300'}`}>
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 p-6 rounded-3xl relative overflow-hidden h-[340px] flex flex-col justify-between border border-emerald-100">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                <div className="font-bold text-white text-xl">🧬</div>
              </div>
              <h2 className="text-3xl font-bold text-emerald-900 leading-tight">
                2 hours <br />
                <span className="text-emerald-700/60 font-medium text-lg">spent on Biology this week</span>
              </h2>
              <p className="mt-4 text-emerald-800/70 text-sm leading-relaxed">
                Great consistency, you're on track to outpace your usual weekly effort!
              </p>
            </div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-emerald-800' : 'bg-emerald-200'}`} />
                ))}
              </div>
              <div className="flex gap-2">
                <button className="p-1 text-emerald-400 hover:text-emerald-600">
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <button className="p-1 text-emerald-400 hover:text-emerald-600">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Decorative blobs */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-100 rounded-full translate-x-10 translate-y-10" />
          </div>
        </div>

        {/* Right Grid */}
        <div className="col-span-9 grid grid-cols-2 gap-6">
          {subjects.slice(0, 6).map((subject) => (
            <Link 
              key={subject.id}
              to={subject.path || '#'}
              className={`p-8 rounded-[32px] ${subject.lightColor} border border-white shadow-sm hover:shadow-md transition-all cursor-pointer group block`}
            >
              <div className="flex justify-between items-start mb-12">
                <div className={`w-12 h-12 ${subject.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-200`}>
                  {subject.icon}
                </div>
                {subject.path && (
                  <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1 text-sm font-bold">
                    Practice <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-slate-800">{subject.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
