import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Edit3, Layout, Settings, CheckCircle2, Clock, ChevronRight, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const InstantMarking: React.FC = () => {
  const [answer, setAnswer] = useState("The fission fragments produced inside the reactor have a lot of kinetic energy. This energy gets passed to the water that's around when the fragments hit water molecules. The water gets hotter and eventually turns into steam. Then the steam moves a turbine, which transfers kinetic energy to the generator and that's what makes electricity, by electromagnetic induction in coils. Some energy gets lost as heat throughout so it's not 100% transferred, but most ends up as useful electrical energy.");
  const [isMarking, setIsMarking] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  const handleMarking = async () => {
    setIsMarking(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `
          Question: Describe how energy from fission fragments becomes useful electrical energy in a typical water-cooled reactor. (4 marks)
          Student Answer: ${answer}
          
          Please mark this answer based on GCSE Physics standards. 
          Return a JSON object with:
          - totalMarks (number out of 4)
          - feedback (array of objects with { criteria: string, marksAwarded: number, totalCriteriaMarks: number, explanation: string })
          - overallSummary (string)
        `,
        config: {
          responseMimeType: "application/json"
        }
      });

      const result = JSON.parse(response.text || "{}");
      setFeedback(result);
    } catch (error) {
      console.error('Error marking answer:', error);
      alert('Failed to mark answer. Please try again.');
    } finally {
      setIsMarking(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-slate-600">Physics practice</span>
        </div>
        <div className="flex-1 max-w-md mx-10">
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-blue-600 rounded-full" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-slate-600"><Edit3 className="w-5 h-5" /></button>
          <button className="p-2 text-slate-400 hover:text-slate-600"><Layout className="w-5 h-5" /></button>
          <button className="p-2 text-slate-400 hover:text-slate-600"><Settings className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-2 gap-8 flex-1">
        {/* Left: Question & Answer */}
        <div className="bg-slate-50/50 rounded-[32px] p-10 border border-slate-100 flex flex-col">
          <div className="space-y-6 flex-1">
            <h2 className="text-xl font-bold leading-relaxed">
              Describe how energy from fission fragments becomes useful electrical energy in a typical water-cooled reactor.
            </h2>
            <p className="text-slate-500 font-medium italic">Refer to specific energy transfers in your answer.</p>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">(4 marks)</p>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900">Your answer</label>
              <textarea 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full h-48 text-slate-700 text-sm leading-relaxed bg-white/50 p-4 rounded-xl border border-slate-100 focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none"
                placeholder="Type your answer here..."
              />
            </div>
          </div>
          <div className="mt-8 flex justify-between items-center">
            <button 
              onClick={handleMarking}
              disabled={isMarking}
              className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all disabled:opacity-50"
            >
              {isMarking ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              Mark my answer
            </button>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200">Next question</button>
          </div>
        </div>

        {/* Right: Feedback */}
        <div className="space-y-6 overflow-y-auto pr-2">
          <h2 className="text-2xl font-bold">Your result</h2>
          
          {feedback ? (
            <>
              <div className="flex gap-4">
                <div className="flex-1 bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{feedback.totalMarks}/4 <span className="text-slate-400 font-normal text-sm">marks total</span></div>
                  </div>
                </div>
                <div className="flex-1 bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">Live <span className="text-slate-400 font-normal text-sm">AI Marking</span></div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {feedback.feedback.map((item: any, index: number) => (
                  <div key={index} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">{index + 1}</div>
                        <div>
                          <h4 className="font-bold text-slate-800 leading-snug">{item.criteria}</h4>
                          <p className={`text-xs font-bold mt-1 ${item.marksAwarded > 0 ? 'text-emerald-500' : 'text-red-400'}`}>
                            {item.marksAwarded}/{item.totalCriteriaMarks} marks awarded
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-slate-50 rounded-3xl border border-dashed border-slate-200 text-slate-400">
              <Sparkles className="w-12 h-12 mb-4 opacity-20" />
              <p className="font-medium">Submit your answer to get AI feedback</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
