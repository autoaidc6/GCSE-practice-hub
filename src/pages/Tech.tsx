import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal as TerminalIcon, Play, CheckCircle2, Code2 } from 'lucide-react';

const Tech = () => {
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
    },
    {
      title: "Binary Search Logic",
      topic: "Algorithms",
      code: [
        "# List: [10, 20, 30, 40, 50, 60, 70]",
        "Target: 60",
        "Low: 0, High: 6, Mid: 3 (Value 40)",
        "# Step 1: 60 > 40? Yes",
        "# Step 2: New Low = Mid + 1 = 4",
        "# Step 3: New Mid = (4 + 6) // 2 = 5",
        "# ERROR HERE: What is the value at index 5?",
        "Value at Index 5: ?"
      ],
      options: [
        { id: "1", text: "50" },
        { id: "2", text: "60" },
        { id: "3", text: "70" },
        { id: "4", text: "40" }
      ],
      correctId: "2",
      explanation: "Correct! The value at index 5 is 60, which matches our target. The search is complete."
    },
    {
      title: "Network Topologies",
      topic: "Networks",
      code: [
        "# Identify the topology",
        "All nodes are connected to a central hub/switch.",
        "If the central hub fails, the whole network fails.",
        "If one node cable fails, only that node is affected.",
        "# ERROR HERE: Is this a Bus or Star topology?",
        "Topology: Bus"
      ],
      options: [
        { id: "1", text: "Star" },
        { id: "2", text: "Bus" },
        { id: "3", text: "Ring" },
        { id: "4", text: "Mesh" }
      ],
      correctId: "1",
      explanation: "Correct! A Star topology uses a central hub or switch to connect all devices."
    },
    {
      title: "Cyber Security",
      topic: "Security",
      code: [
        "# Identify the attack",
        "An attacker sends an email pretending to be a bank.",
        "The email contains a link to a fake login page.",
        "The goal is to steal user credentials.",
        "# ERROR HERE: Is this Brute Force or Phishing?",
        "Attack: Brute Force"
      ],
      options: [
        { id: "1", text: "Phishing" },
        { id: "2", text: "Brute Force" },
        { id: "3", text: "SQL Injection" },
        { id: "4", text: "DDOS" }
      ],
      correctId: "1",
      explanation: "Correct! Phishing involves using fake communications to trick users into revealing sensitive data."
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
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <TerminalIcon className="text-blue-400 w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold">The Terminal</h2>
            </div>
            <p className="text-slate-400 text-lg">Think Like a Programmer. Master Principles of Computer Science (Edexcel Paper 1).</p>
            <p className="text-sm font-bold text-blue-400 mt-2 uppercase tracking-wider">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
          <button 
            onClick={() => setCurrentQuestion((prev) => (prev + 1) % questions.length)}
            className="p-3 bg-slate-800 border border-slate-700 rounded-full hover:bg-slate-700 transition-colors"
            title="Next Question"
          >
            <Play className="w-5 h-5 text-blue-400" />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Code2 className="text-blue-400 w-5 h-5" />
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
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
              <div className="absolute -inset-4 bg-blue-500/20 blur-3xl rounded-full"></div>
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
                    <CheckCircle2 className="text-blue-400 w-4 h-4" />
                    Binary to Hex Conversion
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-blue-400 w-4 h-4" />
                    Character Encoding (ASCII/Unicode)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="text-blue-400 w-4 h-4" />
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

export default Tech;
