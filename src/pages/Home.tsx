import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Beaker, BookOpen, Terminal as TerminalIcon, Globe, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AccordionItemProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, description, isOpen, onClick }) => (
  <div className="border-b border-slate-200 last:border-0">
    <button 
      onClick={onClick}
      className="w-full py-6 flex justify-between items-center text-left hover:text-blue-600 transition-colors group"
    >
      <span className="text-xl font-semibold">{title}</span>
      <ChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-slate-400 group-hover:text-blue-600`} />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="pb-6 text-slate-600 leading-relaxed max-w-2xl">
            {description}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Home = () => {
  const [activeAO, setActiveAO] = useState<number | null>(0);

  const assessmentObjectives = [
    {
      id: 0,
      title: "AO1: Knowledge & Understanding",
      description: "Demonstrating accurate scientific, literary, or technical understanding. This is the foundation of your answer—knowing the facts, definitions, and core concepts."
    },
    {
      id: 1,
      title: "AO2: Application & Analysis",
      description: "Applying knowledge to specific contexts, or analyzing language, form, and structure. Examiners want to see you use your knowledge to solve a problem or deconstruct a text."
    },
    {
      id: 2,
      title: "AO3: Evaluation & Synthesis",
      description: "Building a well-developed, logical plan or argument. This involves making judgements, weighing evidence, and bringing different ideas together into a coherent conclusion."
    }
  ];

  const subjects = [
    { name: 'Science', path: '/science', icon: Beaker, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Maths', path: '/maths', icon: Calculator, color: 'text-violet-600', bg: 'bg-violet-50' },
    { name: 'English', path: '/english', icon: BookOpen, color: 'text-rose-600', bg: 'bg-rose-50' },
    { name: 'Tech', path: '/tech', icon: TerminalIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Spanish', path: '/spanish', icon: Globe, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <header className="relative pt-12 pb-20 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="z-10"
          >
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-8">
              Master the Mark Scheme. <br/>
              <span className="text-blue-600">Ace Your GCSEs.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-xl">
              Stop guessing what the examiner wants. Dive into official Edexcel assessment criteria, test your knowledge with interactive quizzes, and unlock your top grade across Sciences, Humanities, Languages, and Tech.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
                Choose Your Subject
              </button>
              <button className="px-8 py-4 border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all">
                How Marking Works
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-slate-50 rounded-[4rem] flex items-center justify-center border border-slate-100 shadow-2xl relative overflow-hidden">
               <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-100 rounded-full blur-2xl"></div>
               <div className="absolute bottom-10 left-10 w-40 h-40 bg-rose-100 rounded-full blur-3xl"></div>
               
               <div className="text-center p-12 relative z-10">
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {subjects.map((sub, idx) => (
                      <Link 
                        key={idx} 
                        to={sub.path}
                        className={`w-24 h-24 bg-white rounded-3xl shadow-lg flex items-center justify-center transition-transform hover:scale-110 ${idx % 2 === 0 ? 'rotate-12' : '-rotate-12 translate-y-8'}`}
                      >
                        <sub.icon className={`${sub.color} w-10 h-10`} />
                      </Link>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">Interactive Learning</h3>
                  <p className="text-slate-500">Visualizing your path to Grade 9</p>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full leading-[0]">
          <svg className="relative block w-full h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-slate-50"></path>
          </svg>
        </div>
      </header>

      {/* Assessment Engine */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Inside the Examiner's Mind: How You Are Graded</h2>
          <p className="text-xl text-slate-600 mb-16 leading-relaxed">
            GCSE marking follows a <span className="font-bold text-blue-600">"Best-Fit" approach</span>. Examiners are trained to reward what you can do, rather than penalize minor omissions. They look for evidence across three key Assessment Objectives.
          </p>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 text-left">
            {assessmentObjectives.map((ao) => (
              <AccordionItem 
                key={ao.id}
                title={ao.title}
                description={ao.description}
                isOpen={activeAO === ao.id}
                onClick={() => setActiveAO(activeAO === ao.id ? null : ao.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Subject Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Explore Your Subjects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((sub, idx) => (
              <Link 
                key={idx} 
                to={sub.path}
                className="group p-8 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <div className={`w-16 h-16 ${sub.bg} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                  <sub.icon className={`${sub.color} w-8 h-8`} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{sub.name} Hub</h3>
                <p className="text-slate-600 mb-6">Master the mark scheme and practice interactive questions for Edexcel GCSE {sub.name}.</p>
                <div className={`flex items-center gap-2 font-bold ${sub.color}`}>
                  Start Learning
                  <ChevronDown className="w-4 h-4 -rotate-90" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
