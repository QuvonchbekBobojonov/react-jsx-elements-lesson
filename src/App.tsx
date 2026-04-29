import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Code2, 
  Layers, 
  CheckCircle2, 
  ChevronRight, 
  GraduationCap,
  Lightbulb,
  AlertCircle,
  Zap,
  RefreshCw
} from 'lucide-react';

// --- Data ---

const lessonSteps = [
  {
    id: 1,
    title: 'React Elementi nima?',
    icon: <BookOpen className="w-6 h-6" />,
    content: (
      <div className="space-y-4">
        <p>React ilovasining eng kichik va oddiy bo\'lagi — bu <b>Element</b>. U brauzer ekranida nima ko\'rinishini tasvirlaydi.</p>
        <div className="bg-white p-4 rounded-xl border border-brand-200">
          <pre className="code-block text-xs">{`const el = <h1>Salom!</h1>;`}</pre>
        </div>
        <p className="text-sm text-slate-500 italic">Elementlar o'zgarmasdir (immutable). Ularni yaratgandan so'ng tarkibini o'zgartirib bo'lmaydi.</p>
      </div>
    ),
    question: "React elementi nima?",
    options: ["JavaScript funksiyasi", "Ekranda ko'rinadigan eng kichik bo'lak", "Faqat rasm", "Ma'lumotlar bazasi"],
    correct: 1
  },
  {
    id: 2,
    title: 'JSX haqida tushuncha',
    icon: <Code2 className="w-6 h-6" />,
    content: (
      <div className="space-y-4">
        <p><b>JSX (JavaScript XML)</b> — bu JavaScript ichida HTML-ga o'xshash kod yozish imkonini beruvchi sintaksis. U React bilan ishlashni osonlashtiradi.</p>
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm italic">
          💡 JSX brauzerga yetib borguncha oddiy JavaScript obyektlariga aylanadi.
        </div>
      </div>
    ),
    question: "JSX nima degani?",
    options: ["JavaScript XML", "Java Syntax Extension", "JSON Format", "JavaScript Logo"],
    correct: 0
  },
  {
    id: 3,
    title: 'Yagona ota element (Fragment)',
    icon: <Layers className="w-6 h-6" />,
    content: (
      <div className="space-y-4">
        <p>JSX-da bir nechta elementni yonma-yon yozib bo'lmaydi. Ular har doim <b>bitta ota element</b> ichida bo'lishi shart.</p>
        <pre className="code-block text-xs">{`// Xato!\n<h1>Salom</h1>\n<p>Dunyo</p>\n\n// To'g'ri\n<>\n  <h1>Salom</h1>\n  <p>Dunyo</p>\n</>`}</pre>
      </div>
    ),
    question: "Bir nechta elementni JSX-da qanday o'rash kerak?",
    options: ["O'rab bo'lmaydi", "Bitta ota element ichida", "Har birini alohida", "Massiv ichida"],
    correct: 1
  },
  {
    id: 4,
    title: 'Teglarni yopish qoidalari',
    icon: <RefreshCw className="w-6 h-6" />,
    content: (
      <div className="space-y-4">
        <p>HTML-da yopish shart bo'lmagan teglar (<code>img</code>, <code>br</code>, <code>input</code>) JSX-da albatta yopilishi shart.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
            <p className="text-xs text-emerald-600 font-bold mb-1 italic">To'g'ri:</p>
            <code className="text-xs">{'<img src="..." />'}</code>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
            <p className="text-xs text-emerald-600 font-bold mb-1 italic">Yoki:</p>
            <code className="text-xs">{'<input />'}</code>
          </div>
        </div>
      </div>
    ),
    question: "Qaysi teg JSX-da xato yozilgan?",
    options: ["<br />", "<img>", "<hr />", "<input />"],
    correct: 1
  },
  {
    id: 5,
    title: 'className va Atributlar',
    icon: <Zap className="w-6 h-6" />,
    content: (
      <div className="space-y-4">
        <p>React-da HTML-dagi <code>class</code> atributi o'rniga <code>className</code> ishlatiladi. Chunki JavaScript-da "class" so'zi band.</p>
        <pre className="code-block text-xs">{`<div className="button">Salom</div>`}</pre>
      </div>
    ),
    question: "HTML dagi 'class' nomi JSX-da nima deyiladi?",
    options: ["Class", "className", "classList", "Style"],
    correct: 1
  },
  {
    id: 6,
    title: 'Jingalak qavslar { }',
    icon: <Lightbulb className="w-6 h-6" />,
    content: (
      <div className="space-y-4">
        <p>JSX ichida xohlagan JavaScript kodingizni jingalak qavslar {`{ }`} ichida yozishingiz mumkin.</p>
        <pre className="code-block text-xs">{`const ism = "Olim";\nreturn <h1>{ism}</h1>;`}</pre>
      </div>
    ),
    question: "O'zgaruvchini JSX ichida qanday ko'rsatamiz?",
    options: ["(ism)", "[ism]", "{ism}", "<ism>"],
    correct: 2
  },
  {
    id: 7,
    title: 'Komponentlar tushunchasi',
    icon: <Layers className="w-6 h-6" />,
    content: (
      <div className="space-y-4">
        <p>Komponentlar — bu saytni tashkil qiluvchi alohida va qayta ishlatiladigan bo'laklardir.</p>
        <pre className="code-block text-xs">{`function Salom() {\n  return <h2>Xush kelibsiz!</h2>;\n}`}</pre>
      </div>
    ),
    question: "Komponent nima qaytaradi?",
    options: ["Raqam", "Tekst", "React elementi", "Massiv"],
    correct: 2
  },
  {
    id: 8,
    title: 'Komponentlarni nomlash',
    icon: <AlertCircle className="w-6 h-6" />,
    content: (
      <div className="space-y-4">
        <p>React-da komponent nomlari har doim <b>Katta harf</b> bilan boshlanishi shart (PascalCase).</p>
        <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
           <p className="text-sm font-bold text-amber-800">To'g'ri: &lt;MeningKomponentim /&gt;</p>
        </div>
      </div>
    ),
    question: "Komponent nomi qanday harf bilan boshlanishi shart?",
    options: ["Kichik harf", "Faqat raqam", "Katta harf", "Bosh harfsiz"],
    correct: 2
  }
];

// --- Components ---

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const percentage = (current / total) * 100;
  return (
    <div className="w-full h-2 bg-brand-100 rounded-full overflow-hidden">
      <motion.div 
        className="h-full bg-brand-500"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [view, setView] = useState<'content' | 'quiz' | 'finished'>('content');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    if (view === 'content') {
      setView('quiz');
      setSelectedOption(null);
      setIsCorrect(null);
    } else if (view === 'quiz') {
      if (currentStep < lessonSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
        setView('content');
      } else {
        setView('finished');
      }
    }
  };

  const handleAnswer = (optionIdx: number) => {
    if (isCorrect !== null) return;
    
    setSelectedOption(optionIdx);
    const correct = optionIdx === lessonSteps[currentStep].correct;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-50">
      <header className="bg-white border-b border-brand-100 sticky top-0 z-40 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-slate-900 leading-tight">React & JSX Darsligi</h1>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">8-Sinf Informatsiya</p>
            </div>
          </div>
          <div className="text-sm font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-lg">
            Ball: {score}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto p-6 flex flex-col">
        <AnimatePresence mode="wait">
          {view === 'content' && (
            <motion.div 
              key="content"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8 flex-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-brand-600">
                  {lessonSteps[currentStep].icon}
                  <h2 className="text-2xl font-display font-bold">{lessonSteps[currentStep].title}</h2>
                </div>
                <span className="text-sm font-mono text-slate-400">{currentStep + 1} / 8</span>
              </div>
              
              <ProgressBar current={currentStep + 1} total={8} />
              
              <div className="bg-white p-8 rounded-3xl border border-brand-100 shadow-sm min-h-[300px]">
                {lessonSteps[currentStep].content}
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={handleNext}
                  className="flex items-center gap-2 px-10 py-4 bg-brand-500 text-white font-bold rounded-2xl hover:bg-brand-600 shadow-lg shadow-brand-200 transition-all"
                >
                  Savolga o'tish <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {view === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-8 flex-1"
            >
              <div className="text-center">
                 <h2 className="text-2xl font-display font-bold text-brand-700">Sinov testi</h2>
                 <p className="text-slate-500 italic mt-1">Sizning bilimingizni tekshiramiz</p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-brand-100 shadow-sm text-center">
                <p className="text-xl font-medium mb-8 text-slate-800">{lessonSteps[currentStep].question}</p>
                <div className="space-y-3">
                  {lessonSteps[currentStep].options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrectOption = idx === lessonSteps[currentStep].correct;
                    
                    let bgClass = "bg-white border-slate-200 hover:border-brand-500";
                    if (isCorrect !== null) {
                      if (isCorrectOption) bgClass = "bg-emerald-50 border-emerald-500 text-emerald-700";
                      else if (isSelected) bgClass = "bg-red-50 border-red-500 text-red-700";
                    }

                    return (
                      <button 
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={isCorrect !== null}
                        className={`w-full text-left p-5 rounded-2xl border transition-all font-medium flex items-center justify-between ${bgClass}`}
                      >
                        {option}
                        {isCorrect !== null && isCorrectOption && <CheckCircle2 className="w-5 h-5" />}
                        {isCorrect !== null && isSelected && !isCorrectOption && <AlertCircle className="w-5 h-5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={handleNext}
                  disabled={isCorrect === null}
                  className="px-12 py-4 bg-brand-600 text-white font-bold rounded-2xl hover:bg-brand-700 shadow-xl shadow-brand-100 disabled:opacity-30 transition-all font-sans"
                >
                  {currentStep === 7 ? 'Natijani ko\'rish' : 'Keyingi mavzu'}
                </button>
              </div>
            </motion.div>
          )}

          {view === 'finished' && (
            <motion.div 
              key="finished"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-4xl font-display font-bold text-slate-800 mb-4">Kurs yakunlandi!</h2>
              
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-100 inline-block px-16 mb-8">
                 <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Sizning balingiz</p>
                 <p className="text-6xl font-display font-extrabold text-brand-600">{score} / 8</p>
              </div>

              <div className="mt-4">
                <button 
                  onClick={() => {
                    setCurrentStep(0);
                    setView('content');
                    setScore(0);
                  }}
                  className="px-10 py-4 bg-brand-500 text-white font-bold rounded-2xl hover:bg-brand-600 shadow-lg shadow-brand-200"
                >
                  Boshidan boshlash
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-6 bg-white border-t border-brand-100 text-center">
        <p className="text-xs text-slate-400 font-medium font-sans">React & JSX &bull; 8-Sinf &bull; 2026</p>
      </footer>
    </div>
  );
}
