import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Play, CheckCircle2, AlertCircle } from 'lucide-react';

const English = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const questions = [
    {
      sourceTitle: "Source Text: Extract from 'A Passage to Africa'",
      text: "\"I saw a thousand hungry, lean, scared and betrayed faces as I navigated through the village. But there was one face I will never forget.\"",
      highlight: "\"a thousand hungry, lean, scared and betrayed faces\"",
      question: "What is the effect of the list of adjectives \"hungry, lean, scared and betrayed\"?",
      options: [
        "It suggests the author is confused by the situation.",
        "It emphasizes the physical and emotional toll on the people.",
        "It shows the author's lack of interest in the village.",
        "It highlights the literal beauty of the landscape."
      ],
      correctIndex: 1,
      explanation: "Correct! The cumulative effect of these adjectives builds a vivid picture of the multifaceted misery faced by the villagers."
    },
    {
      sourceTitle: "Source Text: Extract from 'The Explorer's Daughter'",
      text: "\"The narwhal is an essential resource for the Inughuit people. Every part of the animal is used, from the blubber to the tusks.\"",
      highlight: "\"essential resource\"",
      question: "How does the author create a sense of necessity in this extract?",
      options: [
        "By describing the narwhal as a dangerous predator.",
        "By listing the various uses of the animal's body parts.",
        "By focusing on the beauty of the Arctic landscape.",
        "By suggesting the hunt is a recreational activity."
      ],
      correctIndex: 1,
      explanation: "Correct! The detailed list of uses reinforces the idea that the narwhal is vital for survival, not just a target for sport."
    }
  ];

  useEffect(() => {
    setSelectedOption(null);
  }, [currentQuestion]);

  return (
    <section id="english" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-rose-100 rounded-xl">
                <BookOpen className="text-rose-600 w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold">The Reading Room</h2>
            </div>
            <p className="text-slate-600 text-lg">Master the Written Word. Analyze Non-Fiction Texts (Edexcel Paper 1).</p>
          </div>
          <button 
            onClick={() => setCurrentQuestion((prev) => (prev + 1) % questions.length)}
            className="p-3 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors shadow-sm"
            title="Next Question"
          >
            <Play className="w-5 h-5 text-rose-600" />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* E-Reader View */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-widest text-rose-600 mb-6">{questions[currentQuestion].sourceTitle}</h3>
            <div className="font-serif text-xl leading-relaxed text-slate-800 space-y-6">
              <p>
                {questions[currentQuestion].text.split(questions[currentQuestion].highlight)[0]}
                <span className="bg-yellow-200 px-1 rounded">{questions[currentQuestion].highlight}</span>
                {questions[currentQuestion].text.split(questions[currentQuestion].highlight)[1]}
              </p>
            </div>
          </div>

          {/* Quiz UI */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold mb-8">The High-lighter</h3>
            <p className="text-lg font-medium mb-6">{questions[currentQuestion].question}</p>
            
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                    selectedOption === idx 
                      ? 'border-rose-600 bg-rose-50' 
                      : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                  {selectedOption === idx && (
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${idx === questions[currentQuestion].correctIndex ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                      {idx === questions[currentQuestion].correctIndex ? <CheckCircle2 className="text-white w-4 h-4" /> : <AlertCircle className="text-white w-4 h-4" />}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {selectedOption !== null && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-4 rounded-xl text-sm ${selectedOption === questions[currentQuestion].correctIndex ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}
              >
                {selectedOption === questions[currentQuestion].correctIndex 
                  ? questions[currentQuestion].explanation
                  : "Not quite. Think about how the highlighted phrase contributes to the overall meaning of the extract."}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default English;
