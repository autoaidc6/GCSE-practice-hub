import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Beaker, Play, CheckCircle2, AlertCircle, GripVertical, ChevronDown, Atom, FlaskConical } from 'lucide-react';

type ScienceSubject = 'Biology' | 'Chemistry' | 'Physics';

const allQuestions: Record<ScienceSubject, any[]> = {
  Biology: [
    {
      title: "The Starch Test",
      task: "Reorder the steps for testing a leaf for starch (Photosynthesis practical).",
      items: [
        { id: '1', text: 'Boil leaf in water' },
        { id: '2', text: 'Boil leaf in ethanol' },
        { id: '3', text: 'Dip in warm water' },
        { id: '4', text: 'Add iodine solution' },
      ],
      correctOrder: ['1', '2', '3', '4']
    },
    {
      title: "Microscopy",
      task: "Reorder the steps for preparing a cheek cell slide.",
      items: [
        { id: '1', text: 'Swab inside of cheek' },
        { id: '2', text: 'Smear on slide' },
        { id: '3', text: 'Add Methylene Blue' },
        { id: '4', text: 'Lower coverslip slowly' },
      ],
      correctOrder: ['1', '2', '3', '4']
    },
    {
      title: "Testing for Proteins",
      task: "Reorder the steps for the Biuret test.",
      items: [
        { id: '1', text: 'Add Biuret solution' },
        { id: '2', text: 'Shake gently' },
        { id: '3', text: 'Wait for color change' },
        { id: '4', text: 'Observe purple color' },
      ],
      correctOrder: ['1', '2', '3', '4']
    },
    {
      title: "Osmosis in Potato",
      task: "Reorder the steps for the osmosis practical.",
      items: [
        { id: '1', text: 'Cut potato cylinders' },
        { id: '2', text: 'Measure initial mass' },
        { id: '3', text: 'Place in sugar solutions' },
        { id: '4', text: 'Measure final mass' },
      ],
      correctOrder: ['1', '2', '3', '4']
    }
  ],
  Chemistry: [
    {
      title: "Titration",
      task: "Reorder the steps for a neutralisation titration.",
      items: [
        { id: '1', text: 'Fill burette with acid' },
        { id: '2', text: 'Pipette alkali into flask' },
        { id: '3', text: 'Add phenolphthalein' },
        { id: '4', text: 'Add acid until colorless' },
      ],
      correctOrder: ['1', '2', '3', '4']
    },
    {
      title: "Flame Tests",
      task: "Reorder the steps for identifying metal ions.",
      items: [
        { id: '1', text: 'Clean nichrome wire' },
        { id: '2', text: 'Dip in HCl' },
        { id: '3', text: 'Dip in sample' },
        { id: '4', text: 'Place in blue flame' },
      ],
      correctOrder: ['1', '2', '3', '4']
    }
  ],
  Physics: [
    {
      title: "Density of Irregular Object",
      task: "Reorder the steps to find density using a displacement can.",
      items: [
        { id: '1', text: 'Measure mass of object' },
        { id: '2', text: 'Fill displacement can' },
        { id: '3', text: 'Submerge object' },
        { id: '4', text: 'Measure displaced water' },
      ],
      correctOrder: ['1', '2', '3', '4']
    },
    {
      title: "Resistance of a Wire",
      task: "Reorder the steps to investigate how length affects resistance.",
      items: [
        { id: '1', text: 'Connect circuit' },
        { id: '2', text: 'Attach wire to ruler' },
        { id: '3', text: 'Move crocodile clip' },
        { id: '4', text: 'Record V and I' },
      ],
      correctOrder: ['1', '2', '3', '4']
    },
    {
      title: "Setting up a Series Circuit",
      task: "Reorder the steps to measure current and voltage in a series circuit.",
      items: [
        { id: '1', text: 'Connect battery to ammeter' },
        { id: '2', text: 'Connect ammeter to bulb' },
        { id: '3', text: 'Connect bulb to battery' },
        { id: '4', text: 'Connect voltmeter across bulb' },
      ],
      correctOrder: ['1', '2', '3', '4']
    },
    {
      title: "Refraction through Glass",
      task: "Reorder the steps for the refraction practical.",
      items: [
        { id: '1', text: 'Place glass block on paper' },
        { id: '2', text: 'Trace around the block' },
        { id: '3', text: 'Shine ray box at block' },
        { id: '4', text: 'Mark incident and emergent rays' },
      ],
      correctOrder: ['1', '2', '3', '4']
    },
    {
      title: "Extension of a Spring",
      task: "Reorder the steps to investigate Hooke's Law.",
      items: [
        { id: '1', text: 'Measure original spring length' },
        { id: '2', text: 'Add 100g mass to spring' },
        { id: '3', text: 'Measure new spring length' },
        { id: '4', text: 'Calculate extension (New - Original)' },
      ],
      correctOrder: ['1', '2', '3', '4']
    }
  ]
};

const subjectIcons = {
  Biology: <Beaker className="text-emerald-600 w-6 h-6" />,
  Chemistry: <FlaskConical className="text-blue-600 w-6 h-6" />,
  Physics: <Atom className="text-purple-600 w-6 h-6" />
};

const subjectColors = {
  Biology: 'emerald',
  Chemistry: 'blue',
  Physics: 'purple'
} as const;

const Science = () => {
  const [selectedSubject, setSelectedSubject] = useState<ScienceSubject>('Biology');
  const [isHigher, setIsHigher] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const questions = allQuestions[selectedSubject];
  const currentQuestionData = questions[currentQuestion] || questions[0];

  const [items, setItems] = useState(
    [...questions[0].items].sort(() => Math.random() - 0.5)
  );

  useEffect(() => {
    setCurrentQuestion(0);
  }, [selectedSubject]);

  useEffect(() => {
    if (questions[currentQuestion]) {
      setItems([...questions[currentQuestion].items].sort(() => Math.random() - 0.5));
    }
  }, [currentQuestion, selectedSubject]);

  const handleReorder = (id: string, direction: 'up' | 'down') => {
    const index = items.findIndex(item => item.id === id);
    if (direction === 'up' && index > 0) {
      const newItems = [...items];
      [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
      setItems(newItems);
    } else if (direction === 'down' && index < items.length - 1) {
      const newItems = [...items];
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
      setItems(newItems);
    }
  };

  const isCorrect = currentQuestionData && items.every((item, idx) => item.id === currentQuestionData.correctOrder[idx]);

  return (
    <section id="science" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 bg-${subjectColors[selectedSubject]}-100 rounded-xl`}>
                {subjectIcons[selectedSubject]}
              </div>
              <h2 className="text-3xl font-bold">The Science Lab</h2>
            </div>
            <p className="text-slate-600 text-lg">Decode the Universe. Master data interpretation and required practicals (Edexcel {selectedSubject}).</p>
            <p className={`text-sm font-bold text-${subjectColors[selectedSubject]}-600 mt-2 uppercase tracking-wider`}>Question {currentQuestion + 1} of {questions.length}</p>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
              {(['Biology', 'Chemistry', 'Physics'] as ScienceSubject[]).map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${selectedSubject === sub ? `bg-white shadow-sm text-${subjectColors[sub]}-600` : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {sub}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-end gap-4">
              <div className="flex items-center gap-4 bg-slate-100 p-1 rounded-full">
                <button 
                  onClick={() => setIsHigher(false)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${!isHigher ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-50'}`}
                >
                  Foundation
                </button>
                <button 
                  onClick={() => setIsHigher(true)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${isHigher ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-50'}`}
                >
                  Higher
                </button>
              </div>
              <button 
                onClick={() => setCurrentQuestion((prev) => (prev + 1) % questions.length)}
                className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                title="Next Question"
              >
                <Play className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className={`bg-${subjectColors[selectedSubject]}-50 border border-${subjectColors[selectedSubject]}-100 p-8 rounded-3xl`}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <GripVertical className={`text-${subjectColors[selectedSubject]}-600 w-5 h-5`} />
                {currentQuestionData.title}
              </h3>
              <p className="text-sm text-slate-500 mb-6 italic">Task: {currentQuestionData.task}</p>
              
              <div className="space-y-3">
                {items.map((item, idx) => (
                  <motion.div 
                    layout
                    key={item.id}
                    className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm"
                  >
                    <span className={`font-mono text-${subjectColors[selectedSubject]}-600 font-bold w-6`}>{idx + 1}.</span>
                    <span className="flex-grow font-medium">{item.text}</span>
                    <div className="flex flex-col gap-1">
                      <button onClick={() => handleReorder(item.id, 'up')} className="p-1 hover:bg-slate-100 rounded">
                        <ChevronDown className="w-4 h-4 rotate-180" />
                      </button>
                      <button onClick={() => handleReorder(item.id, 'down')} className="p-1 hover:bg-slate-100 rounded">
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3">
                {isCorrect ? (
                  <div className={`flex items-center gap-2 text-${subjectColors[selectedSubject]}-600 font-semibold bg-${subjectColors[selectedSubject]}-100 px-4 py-2 rounded-lg`}>
                    <CheckCircle2 className="w-5 h-5" />
                    Correct Sequence!
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-slate-400 font-medium px-4 py-2">
                    <AlertCircle className="w-5 h-5" />
                    Keep adjusting the order...
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="relative aspect-square bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 flex items-center justify-center">
             <div className="text-center p-12">
                <div className={`w-24 h-24 bg-${subjectColors[selectedSubject]}-100 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  {subjectIcons[selectedSubject]}
                </div>
                <h4 className="text-2xl font-bold mb-2">Practical Simulation</h4>
                <p className="text-slate-500">Interactive lab equipment visualization for Edexcel {selectedSubject} Paper 1.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Science;
