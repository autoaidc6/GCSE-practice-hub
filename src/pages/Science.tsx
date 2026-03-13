import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Beaker, Play, CheckCircle2, AlertCircle, GripVertical, ChevronDown } from 'lucide-react';

const Science = () => {
  const [isHigher, setIsHigher] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const questions = [
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
    }
  ];

  const [items, setItems] = useState(
    [...questions[0].items].sort(() => Math.random() - 0.5)
  );

  useEffect(() => {
    setItems([...questions[currentQuestion].items].sort(() => Math.random() - 0.5));
  }, [currentQuestion]);

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

  const isCorrect = items.every((item, idx) => item.id === questions[currentQuestion].correctOrder[idx]);

  return (
    <section id="science" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Beaker className="text-emerald-600 w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold">The Science Lab</h2>
            </div>
            <p className="text-slate-600 text-lg">Decode the Universe. Master data interpretation and required practicals (Edexcel Biology).</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 bg-slate-100 p-1 rounded-full">
              <button 
                onClick={() => setIsHigher(false)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${!isHigher ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500'}`}
              >
                Foundation
              </button>
              <button 
                onClick={() => setIsHigher(true)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${isHigher ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500'}`}
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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <GripVertical className="text-emerald-600 w-5 h-5" />
                {questions[currentQuestion].title}
              </h3>
              <p className="text-sm text-slate-500 mb-6 italic">Task: {questions[currentQuestion].task}</p>
              
              <div className="space-y-3">
                {items.map((item, idx) => (
                  <motion.div 
                    layout
                    key={item.id}
                    className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm"
                  >
                    <span className="font-mono text-emerald-600 font-bold w-6">{idx + 1}.</span>
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
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold bg-emerald-100 px-4 py-2 rounded-lg">
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
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Beaker className="text-emerald-600 w-12 h-12" />
                </div>
                <h4 className="text-2xl font-bold mb-2">Practical Simulation</h4>
                <p className="text-slate-500">Interactive lab equipment visualization for Edexcel Biology Paper 1.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Science;
