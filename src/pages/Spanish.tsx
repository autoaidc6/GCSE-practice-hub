import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Globe, Play, CheckCircle2, AlertCircle } from 'lucide-react';

const Spanish = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [translation, setTranslation] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = [
    {
      spanish: "En mi tiempo libre, me encanta ir al cine con mis amigos porque es muy divertido.",
      english: "In my free time, I love going to the [cine] with my friends.",
      missingWord: "cine",
      correctTranslation: "cinema",
      hint: "The word 'cine' translates to 'cinema' in English."
    },
    {
      spanish: "Mi asignatura favorita es el dibujo porque soy una persona muy creativa.",
      english: "My favorite subject is [dibujo] because I am a very creative person.",
      missingWord: "dibujo",
      correctTranslation: "art",
      hint: "The word 'dibujo' translates to 'art' or 'drawing' in English."
    },
    {
      spanish: "Normalmente, desayuno cereales con leche y bebo un zumo de naranja.",
      english: "Normally, I have breakfast of cereals with milk and I drink an [zumo] of orange.",
      missingWord: "zumo",
      correctTranslation: "juice",
      hint: "The word 'zumo' translates to 'juice' in English."
    },
    {
      spanish: "El fin de semana pasado, fui al parque con mi familia y jugamos al fútbol.",
      english: "Last weekend, I went to the [parque] with my family and we played football.",
      missingWord: "parque",
      correctTranslation: "park",
      hint: "The word 'parque' translates to 'park' in English."
    }
  ];

  useEffect(() => {
    setTranslation("");
    setIsSubmitted(false);
  }, [currentQuestion]);

  return (
    <section id="languages" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <Globe className="text-amber-600 w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold">The Global Lounge</h2>
            </div>
            <p className="text-slate-600 text-lg">Fluency & Comprehension. Master Reading and Understanding (Edexcel Spanish Paper 3).</p>
            <p className="text-sm font-bold text-amber-600 mt-2 uppercase tracking-wider">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
          <button 
            onClick={() => setCurrentQuestion((prev) => (prev + 1) % questions.length)}
            className="p-3 bg-slate-50 border border-slate-200 rounded-full hover:bg-slate-100 transition-colors shadow-sm"
            title="Next Question"
          >
            <Play className="w-5 h-5 text-amber-600" />
          </button>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-50 rounded-3xl p-10 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold mb-8 text-center">Reading Comprehension</h3>
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-10">
              <p className="italic text-slate-600 mb-4">"{questions[currentQuestion].spanish}"</p>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Reading Task</span>
            </div>

            <div className="space-y-6">
              <p className="text-lg font-medium text-slate-700">
                Translate the missing word from the sentence:
              </p>
              <div className="text-2xl font-serif text-slate-800 flex flex-wrap items-center gap-3">
                <span>"{questions[currentQuestion].english.split('[')[0]}"</span>
                <input 
                  type="text" 
                  value={translation}
                  onChange={(e) => setTranslation(e.target.value)}
                  placeholder="..."
                  className="border-b-2 border-amber-600 outline-none px-2 w-32 text-center bg-transparent focus:bg-white transition-colors"
                />
                <span>"{questions[currentQuestion].english.split(']')[1]}"</span>
              </div>
              
              <div className="pt-6">
                <button 
                  onClick={() => setIsSubmitted(true)}
                  className="w-full bg-amber-600 text-white font-bold py-4 rounded-2xl hover:bg-amber-700 transition-colors shadow-lg shadow-amber-200"
                >
                  Check Translation
                </button>
              </div>

              {isSubmitted && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`mt-6 p-6 rounded-2xl flex items-start gap-4 ${translation.toLowerCase() === questions[currentQuestion].correctTranslation ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}
                >
                  {translation.toLowerCase() === questions[currentQuestion].correctTranslation ? (
                    <>
                      <CheckCircle2 className="w-6 h-6 shrink-0" />
                      <div>
                        <p className="font-bold">¡Excelente!</p>
                        <p className="text-sm">"{questions[currentQuestion].correctTranslation}" is the correct translation.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-6 h-6 shrink-0" />
                      <div>
                        <p className="font-bold">Almost there...</p>
                        <p className="text-sm">{questions[currentQuestion].hint}</p>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Spanish;
