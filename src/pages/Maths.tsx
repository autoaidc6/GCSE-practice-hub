import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator, Play, CheckCircle2, AlertCircle } from 'lucide-react';

const Maths = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(["", "", ""]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const questions = [
    {
      equation: "5(x - 3) = 20",
      steps: [
        { label: "Step 1: Expand brackets", placeholder: "5x - 15 = 20", correct: "5x-15=20" },
        { label: "Step 2: Isolate 5x", placeholder: "5x = 35", correct: "5x=35" },
        { label: "Step 3: Solve for x", placeholder: "x = 7", correct: "x=7" }
      ]
    },
    {
      equation: "3(2x - 5) = 9",
      steps: [
        { label: "Step 1: Expand brackets", placeholder: "6x - 15 = 9", correct: "6x-15=9" },
        { label: "Step 2: Isolate 6x", placeholder: "6x = 24", correct: "6x=24" },
        { label: "Step 3: Solve for x", placeholder: "x = 4", correct: "x=4" }
      ]
    },
    {
      equation: "4(x + 2) = 20",
      steps: [
        { label: "Step 1: Expand brackets", placeholder: "4x + 8 = 20", correct: "4x+8=20" },
        { label: "Step 2: Isolate 4x", placeholder: "4x = 12", correct: "4x=12" },
        { label: "Step 3: Solve for x", placeholder: "x = 3", correct: "x=3" }
      ]
    },
    {
      equation: "2(3x - 1) = 10",
      steps: [
        { label: "Step 1: Expand brackets", placeholder: "6x - 2 = 10", correct: "6x-2=10" },
        { label: "Step 2: Isolate 6x", placeholder: "6x = 12", correct: "6x=12" },
        { label: "Step 3: Solve for x", placeholder: "x = 2", correct: "x=2" }
      ]
    }
  ];

  useEffect(() => {
    setUserAnswers(["", "", ""]);
    setIsCorrect(null);
  }, [currentQuestion]);

  const checkAnswers = () => {
    const correct = userAnswers.every((ans, idx) => 
      ans.replace(/\s/g, '').toLowerCase() === questions[currentQuestion].steps[idx].correct
    );
    setIsCorrect(correct);
  };

  return (
    <section id="maths" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-violet-100 rounded-xl">
                <Calculator className="text-violet-600 w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold">The Calculation Center</h2>
            </div>
            <p className="text-slate-600 text-lg">Master the Numbers. Solve 2024 Edexcel Paper 1 Higher Algebra.</p>
            <p className="text-sm font-bold text-violet-600 mt-2 uppercase tracking-wider">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
          <button 
            onClick={() => setCurrentQuestion((prev) => (prev + 1) % questions.length)}
            className="p-3 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors shadow-sm"
            title="Next Question"
          >
            <Play className="w-5 h-5 text-violet-600" />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold mb-6">The Step-by-Step Solver</h3>
            <p className="text-slate-600 mb-8">Solve the equation: <span className="font-mono font-bold text-violet-600">{questions[currentQuestion].equation}</span></p>
            
            <div className="space-y-6">
              {questions[currentQuestion].steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <span className="text-sm font-bold text-slate-400 w-20">{step.label.split(':')[0]}:</span>
                  <input 
                    type="text" 
                    placeholder={step.placeholder}
                    value={userAnswers[idx]}
                    onChange={(e) => {
                      const newAnswers = [...userAnswers];
                      newAnswers[idx] = e.target.value;
                      setUserAnswers(newAnswers);
                    }}
                    className="flex-grow bg-slate-50 border border-slate-200 rounded-xl p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-violet-600"
                  />
                </div>
              ))}

              <button 
                onClick={checkAnswers}
                className="w-full bg-violet-600 text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-violet-200 mt-4"
              >
                Verify Steps
              </button>

              {isCorrect !== null && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-xl text-sm flex items-center gap-3 ${isCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}
                >
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Perfect logical progression! You've mastered algebraic isolation.
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5" />
                      Check your expansion or arithmetic. Ensure you apply the multiplier to both terms in the bracket.
                    </>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-8 bg-violet-50 rounded-3xl border border-violet-100">
              <h4 className="text-2xl font-bold mb-4">Algebraic Fluency</h4>
              <p className="text-slate-600 leading-relaxed">
                In the 2024 Edexcel Paper 1 Higher, showing your working is critical. Even if your final answer is wrong, you can pick up "method marks" for correct logical steps.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="text-violet-600 font-bold text-2xl mb-1">85%</div>
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Method Marks</div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="text-violet-600 font-bold text-2xl mb-1">Grade 9</div>
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Target Level</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Maths;
