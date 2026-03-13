/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Beaker, 
  BookOpen, 
  Terminal as TerminalIcon, 
  Globe, 
  Play, 
  CheckCircle2, 
  AlertCircle,
  GripVertical,
  Code2,
  Calculator
} from 'lucide-react';

// --- Components ---

const AccordionItem = ({ title, description, isOpen, onClick }: { title: string, description: string, isOpen: boolean, onClick: () => void, key?: number }) => (
  <div className="border-b border-slate-200 last:border-0">
    <button 
      onClick={onClick}
      className="w-full py-6 flex justify-between items-center text-left hover:text-accent-primary transition-colors group"
    >
      <span className="text-xl font-semibold">{title}</span>
      <ChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-slate-400 group-hover:text-accent-primary`} />
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

// --- Subject Sections ---

const ScienceLab = () => {
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
              <div className="p-3 bg-accent-biology/10 rounded-xl">
                <Beaker className="text-accent-biology w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold">The Science Lab</h2>
            </div>
            <p className="text-slate-600 text-lg">Decode the Universe. Master data interpretation and required practicals (Edexcel Biology).</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 bg-slate-100 p-1 rounded-full">
              <button 
                onClick={() => setIsHigher(false)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${!isHigher ? 'bg-white shadow-sm text-accent-biology' : 'text-slate-500'}`}
              >
                Foundation
              </button>
              <button 
                onClick={() => setIsHigher(true)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${isHigher ? 'bg-white shadow-sm text-accent-biology' : 'text-slate-500'}`}
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
            <div className="bg-accent-biology/5 border border-accent-biology/20 p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <GripVertical className="text-accent-biology w-5 h-5" />
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
                    <span className="font-mono text-accent-biology font-bold w-6">{idx + 1}.</span>
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
                  <div className="flex items-center gap-2 text-accent-biology font-semibold bg-accent-biology/10 px-4 py-2 rounded-lg">
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
                <div className="w-24 h-24 bg-accent-biology/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Beaker className="text-accent-biology w-12 h-12" />
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

const ReadingRoom = () => {
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
              <div className="p-3 bg-accent-english/10 rounded-xl">
                <BookOpen className="text-accent-english w-6 h-6" />
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
            <Play className="w-5 h-5 text-accent-english" />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* E-Reader View */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-widest text-accent-english mb-6">{questions[currentQuestion].sourceTitle}</h3>
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
                      ? 'border-accent-english bg-accent-english/5' 
                      : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                  {selectedOption === idx && (
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${idx === questions[currentQuestion].correctIndex ? 'bg-accent-biology' : 'bg-accent-english'}`}>
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
                className={`mt-6 p-4 rounded-xl text-sm ${selectedOption === questions[currentQuestion].correctIndex ? 'bg-accent-biology/10 text-accent-biology' : 'bg-accent-english/10 text-accent-english'}`}
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

const Terminal = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedFix, setSelectedFix] = useState("");

  const questions = [
    {
      title: "Binary Conversion",
      topic: "Data Representation",
      code: [
        "# Convert binary to hexadecimal",
        "Binary: 1011 0101",
        "# Step 1: Split into nibbles (4 bits)",
        "Nibble 1: 1011 (11 in decimal)",
        "Nibble 2: 0101 (5 in decimal)",
        "# ERROR HERE: Incorrect Hex mapping",
        "Hex: B6"
      ],
      options: [
        { id: "1", text: "A5" },
        { id: "2", text: "B5" },
        { id: "3", text: "C5" },
        { id: "4", text: "D5" }
      ],
      correctId: "2",
      explanation: "Correct! 1011 is B in Hex and 0101 is 5 in Hex, making the final value B5."
    },
    {
      title: "Logic Gates",
      topic: "Boolean Logic",
      code: [
        "# Determine output of logic circuit",
        "A = True, B = False",
        "Q = (A AND B) OR (NOT B)",
        "# Step 1: (True AND False) = False",
        "# Step 2: (NOT False) = True",
        "# Step 3: False OR True = ?",
        "Output: False"
      ],
      options: [
        { id: "1", text: "True" },
        { id: "2", text: "False" },
        { id: "3", text: "Undefined" },
        { id: "4", text: "Error" }
      ],
      correctId: "1",
      explanation: "Correct! False OR True evaluates to True in Boolean logic."
    }
  ];

  useEffect(() => {
    setSelectedFix("");
  }, [currentQuestion]);

  return (
    <section id="tech" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-accent-tech/10 rounded-xl">
                <TerminalIcon className="text-accent-tech w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold">The Terminal</h2>
            </div>
            <p className="text-slate-400 text-lg">Think Like a Programmer. Master Principles of Computer Science (Edexcel Paper 1).</p>
          </div>
          <button 
            onClick={() => setCurrentQuestion((prev) => (prev + 1) % questions.length)}
            className="p-3 bg-slate-800 border border-slate-700 rounded-full hover:bg-slate-700 transition-colors"
            title="Next Question"
          >
            <Play className="w-5 h-5 text-accent-tech" />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Code2 className="text-accent-tech w-5 h-5" />
                  {questions[currentQuestion].title}
                </h3>
                <span className="text-xs font-mono bg-slate-700 px-3 py-1 rounded-full text-slate-300">{questions[currentQuestion].topic}</span>
              </div>

              <div className="font-mono text-sm bg-slate-950 p-6 rounded-xl border border-slate-800 mb-8 overflow-x-auto">
                {questions[currentQuestion].code.map((line, idx) => (
                  <div key={idx} className={line.startsWith("# ERROR") ? "bg-red-900/30 border-l-2 border-red-500 py-1 -mx-2 px-2" : ""}>
                    {line.startsWith("#") ? <span className="text-slate-500 italic">{line}</span> : <span>{line}</span>}
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-400 mb-2">Select the correct value:</label>
                <select 
                  value={selectedFix}
                  onChange={(e) => setSelectedFix(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-accent-tech outline-none transition-all"
                >
                  <option value="">-- Choose the correct answer --</option>
                  {questions[currentQuestion].options.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.text}</option>
                  ))}
                </select>

                {selectedFix && (
                  <div className={`p-4 rounded-xl text-sm ${selectedFix === questions[currentQuestion].correctId ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {selectedFix === questions[currentQuestion].correctId 
                      ? questions[currentQuestion].explanation
                      : "Incorrect. Review the logic or conversion steps carefully."}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-accent-tech/20 blur-3xl rounded-full"></div>
              <div className="relative bg-slate-800 border border-slate-700 rounded-3xl p-10">
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <h4 className="text-2xl font-bold mb-4">Data Representation</h4>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Understanding how data is stored as binary and represented in Hexadecimal is a core component of Edexcel Computer Science Paper 1.
                </p>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-accent-tech w-4 h-4" />
                    Binary to Hex Conversion
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-accent-tech w-4 h-4" />
                    Character Encoding (ASCII/Unicode)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-accent-tech w-4 h-4" />
                    Bitmap Image Representation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GlobalLounge = () => {
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
              <div className="p-3 bg-accent-primary/10 rounded-xl">
                <Globe className="text-accent-primary w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold">The Global Lounge</h2>
            </div>
            <p className="text-slate-600 text-lg">Fluency & Comprehension. Master Reading and Understanding (Edexcel Spanish Paper 3).</p>
          </div>
          <button 
            onClick={() => setCurrentQuestion((prev) => (prev + 1) % questions.length)}
            className="p-3 bg-slate-50 border border-slate-200 rounded-full hover:bg-slate-100 transition-colors shadow-sm"
            title="Next Question"
          >
            <Play className="w-5 h-5 text-accent-primary" />
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
                  className="border-b-2 border-accent-primary outline-none px-2 w-32 text-center bg-transparent focus:bg-white transition-colors"
                />
                <span>"{questions[currentQuestion].english.split(']')[1]}"</span>
              </div>
              
              <div className="pt-6">
                <button 
                  onClick={() => setIsSubmitted(true)}
                  className="w-full bg-accent-primary text-white font-bold py-4 rounded-2xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-200"
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

const MathsHub = () => {
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
              <div className="p-3 bg-accent-maths/10 rounded-xl">
                <Calculator className="text-accent-maths w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold">The Calculation Center</h2>
            </div>
            <p className="text-slate-600 text-lg">Master the Numbers. Solve 2024 Edexcel Paper 1 Higher Algebra.</p>
          </div>
          <button 
            onClick={() => setCurrentQuestion((prev) => (prev + 1) % questions.length)}
            className="p-3 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors shadow-sm"
            title="Next Question"
          >
            <Play className="w-5 h-5 text-accent-maths" />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold mb-6">The Step-by-Step Solver</h3>
            <p className="text-slate-600 mb-8">Solve the equation: <span className="font-mono font-bold text-accent-maths">{questions[currentQuestion].equation}</span></p>
            
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
                    className="flex-grow bg-slate-50 border border-slate-200 rounded-xl p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-accent-maths"
                  />
                </div>
              ))}

              <button 
                onClick={checkAnswers}
                className="w-full bg-accent-maths text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-violet-200 mt-4"
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
            <div className="p-8 bg-accent-maths/5 rounded-3xl border border-accent-maths/20">
              <h4 className="text-2xl font-bold mb-4">Algebraic Fluency</h4>
              <p className="text-slate-600 leading-relaxed">
                In the 2024 Edexcel Paper 1 Higher, showing your working is critical. Even if your final answer is wrong, you can pick up "method marks" for correct logical steps.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="text-accent-maths font-bold text-2xl mb-1">85%</div>
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Method Marks</div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="text-accent-maths font-bold text-2xl mb-1">Grade 9</div>
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

// --- Main App ---

export default function App() {
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

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">G</div>
            <span className="font-bold text-xl tracking-tight">PracticeHub</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#science" className="hover:text-accent-primary transition-colors">Science</a>
            <a href="#maths" className="hover:text-accent-primary transition-colors">Maths</a>
            <a href="#english" className="hover:text-accent-primary transition-colors">English</a>
            <a href="#tech" className="hover:text-accent-primary transition-colors">Tech</a>
            <a href="#languages" className="hover:text-accent-primary transition-colors">Spanish</a>
            <button className="bg-accent-primary text-white px-6 py-2.5 rounded-full hover:bg-blue-600 transition-all shadow-lg shadow-blue-100">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Section 1: Hero Banner */}
      <header className="relative pt-32 pb-20 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="z-10"
          >
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-8">
              Master the Mark Scheme. <br/>
              <span className="text-accent-primary">Ace Your GCSEs.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-xl">
              Stop guessing what the examiner wants. Dive into official Edexcel assessment criteria, test your knowledge with interactive quizzes, and unlock your top grade across Sciences, Humanities, Languages, and Tech.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-accent-primary text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-blue-200">
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
               {/* Decorative elements */}
               <div className="absolute top-10 right-10 w-32 h-32 bg-accent-biology/10 rounded-full blur-2xl"></div>
               <div className="absolute bottom-10 left-10 w-40 h-40 bg-accent-english/10 rounded-full blur-3xl"></div>
               
               {/* Placeholder for 3D Illustration */}
               <div className="text-center p-12 relative z-10">
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="w-24 h-24 bg-white rounded-3xl shadow-lg flex items-center justify-center rotate-12">
                      <Beaker className="text-accent-biology w-10 h-10" />
                    </div>
                    <div className="w-24 h-24 bg-white rounded-3xl shadow-lg flex items-center justify-center -rotate-12 translate-y-8">
                      <BookOpen className="text-accent-english w-10 h-10" />
                    </div>
                    <div className="w-24 h-24 bg-white rounded-3xl shadow-lg flex items-center justify-center -rotate-6">
                      <TerminalIcon className="text-accent-tech w-10 h-10" />
                    </div>
                    <div className="w-24 h-24 bg-white rounded-3xl shadow-lg flex items-center justify-center rotate-6 translate-y-4">
                      <Globe className="text-accent-primary w-10 h-10" />
                    </div>
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

      {/* Section 2: The Assessment Engine */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Inside the Examiner's Mind: How You Are Graded</h2>
          <p className="text-xl text-slate-600 mb-16 leading-relaxed">
            GCSE marking follows a <span className="font-bold text-accent-primary">"Best-Fit" approach</span>. Examiners are trained to reward what you can do, rather than penalize minor omissions. They look for evidence across three key Assessment Objectives.
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

      {/* Section 3: Subject Hubs */}
      <ScienceLab />
      <MathsHub />
      <ReadingRoom />
      <Terminal />
      <GlobalLounge />

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-accent-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">G</div>
              <span className="font-bold text-xl tracking-tight">PracticeHub</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Empowering students to master the Edexcel and AQA mark schemes through interactive, data-driven practice.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Subjects</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#science" className="hover:text-white transition-colors">Biology & Physics</a></li>
              <li><a href="#maths" className="hover:text-white transition-colors">Mathematics</a></li>
              <li><a href="#english" className="hover:text-white transition-colors">English Literature</a></li>
              <li><a href="#tech" className="hover:text-white transition-colors">Computer Science</a></li>
              <li><a href="#languages" className="hover:text-white transition-colors">Spanish & French</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Mark Scheme Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Revision Timetable</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Past Papers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-20 mt-20 border-t border-slate-800 text-center text-slate-500 text-sm">
          © 2026 GCSE Exam Practice Hub. All rights reserved. Built for Edexcel Assessment Excellence.
        </div>
      </footer>
    </div>
  );
}
