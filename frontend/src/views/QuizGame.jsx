import React, { useContext, useEffect, useState } from 'react';
import { Trophy, Star, LogOut, Zap, CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import Card from '../components/Card';
import { GameContext } from '../context/GameContext';

import { useNavigate } from 'react-router-dom';

const QuizGame = ({ quiz }) => {
  const { handleQuizComplete } = useContext(GameContext);
  const navigate = useNavigate();
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameStatus, setGameStatus] = useState('playing');
  const [streak, setStreak] = useState(0);
  const [answers, setAnswers] = useState([]);

  const currentQ = quiz.questions[currentQIndex];

  useEffect(() => {
    if (gameStatus !== 'playing') return;
    if (timeLeft <= 0) {
      handleAnswer(-1);
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameStatus]);

  const handleAnswer = (optionIndex) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(optionIndex);
    setGameStatus('feedback');
    const isCorrect = optionIndex === currentQ.correct;
    setAnswers(prev => [...prev, { question: currentQ.text, isCorrect, userAnswer: optionIndex === -1 ? 'Time Out' : currentQ.options[optionIndex], correctAnswer: currentQ.options[currentQ.correct] }]);
    if (isCorrect) {
      const timeBonus = Math.floor(timeLeft * 0.5);
      const streakBonus = streak * 10;
      setScore(prev => prev + 100 + timeBonus + streakBonus);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQIndex + 1 < quiz.questions.length) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setGameStatus('playing');
      setTimeLeft(20);
    } else {
      setGameStatus('finished');
    }
  };

  if (gameStatus === 'finished') {
    return (
      <div className="max-w-2xl mx-auto py-10 animate-fade-in text-center">
        <div className="mb-8 relative inline-block">
          <Trophy size={80} className="text-amber-400 drop-shadow-lg mx-auto" />
          <div className="absolute top-0 right-0 -mt-2 -mr-2 animate-bounce">
            <Star size={30} className="text-yellow-300 fill-current" />
          </div>
        </div>
        <h2 className="text-4xl font-extrabold mb-2">Quiz Complete!</h2>
        <p className="text-slate-500 mb-8">You conquered {quiz.title}</p>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-4 bg-violet-50 dark:bg-violet-900/20 border-violet-200">
            <div className="text-xs uppercase font-bold text-violet-500 mb-1">Score</div>
            <div className="text-3xl font-black text-violet-700 dark:text-violet-300">{score}</div>
          </Card>
          <Card className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200">
            <div className="text-xs uppercase font-bold text-emerald-500 mb-1">Correct</div>
            <div className="text-3xl font-black text-emerald-700 dark:text-emerald-300">{answers.filter(a => a.isCorrect).length}/{quiz.questions.length}</div>
          </Card>
          <Card className="p-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200">
            <div className="text-xs uppercase font-bold text-amber-500 mb-1">XP Earned</div>
            <div className="text-3xl font-black text-amber-700 dark:text-amber-300">+{Math.floor(score / 10)}</div>
          </Card>
        </div>
        <div className="flex gap-4 justify-center">
          <Button variant="secondary" onClick={() => navigate('/')}>Back Home</Button>
          <Button onClick={() => handleQuizComplete({
            score,
            totalQuestions: quiz.questions.length,
            correctAnswers: answers.filter(a => a.isCorrect).length
          })}>Claim Rewards</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col animate-fade-in px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 py-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="text-slate-400 hover:text-white hover:bg-white/5">
          <LogOut size={18} className="mr-2" /> Quit
        </Button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400 mb-1">{quiz.category}</span>
          <div className="flex gap-1">
            {[...Array(quiz.questions.length)].map((_, i) => (
              <div key={i} className={`h-1.5 w-6 rounded-full transition-colors duration-300 ${i === currentQIndex ? 'bg-white' : i < currentQIndex ? 'bg-violet-500' : 'bg-slate-800'}`} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-800/50 border border-white/5 backdrop-blur-md text-amber-400 rounded-full font-bold text-sm shadow-xl">
          <Zap size={14} fill="currentColor" /> {score}
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">
        {/* Timer Bar */}
        <div className="relative h-1 bg-slate-800 rounded-full mb-8 overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-linear ${timeLeft < 5 ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]' : 'bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]'}`}
            style={{ width: `${(timeLeft / 20) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="relative group perspective-1000">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-3xl blur-xl transition-all duration-500 group-hover:blur-2xl opacity-50" />

          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl mb-8">
            {currentQ.image && (
              <div className="mb-6 rounded-xl overflow-hidden h-48 md:h-64 relative shadow-inner">
                <img src={currentQ.image} alt="Question" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
              </div>
            )}
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-relaxed text-center">{currentQ.text}</h2>
          </div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {currentQ.options.map((opt, idx) => {
            let stateStyle = "bg-slate-800/50 border-white/5 text-slate-300 hover:bg-slate-800 hover:border-violet-500/50 hover:text-white";
            let icon = null;

            if (isAnswered) {
              if (idx === currentQ.correct) {
                stateStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]";
                icon = <CheckCircle size={20} className="text-emerald-400" />;
              }
              else if (idx === selectedOption) {
                stateStyle = "bg-rose-500/20 border-rose-500 text-rose-400";
                icon = <XCircle size={20} className="text-rose-400" />;
              }
              else stateStyle = "opacity-30 bg-slate-900 border-transparent";
            } else if (idx === selectedOption) { // Selected but waiting (if we had a confirm step, but here it's instant)
              stateStyle = "bg-violet-600 text-white border-violet-500";
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleAnswer(idx)}
                className={`
                  relative p-4 md:p-6 rounded-2xl border-2 text-left transition-all duration-300 font-semibold text-lg flex items-center justify-between 
                  ${stateStyle} 
                  ${!isAnswered ? 'hover:-translate-y-1 hover:shadow-lg active:scale-95' : ''}
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-sm font-bold opacity-70">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>
                {icon}
              </button>
            )
          })}
        </div>

        {/* Feedback / Next Button Area */}
        <div className="h-20 flex items-center justify-center">
          {gameStatus === 'feedback' && (
            <div className="animate-slide-up w-full bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-2xl">
              <div>
                <p className={`font-bold uppercase text-xs tracking-wider mb-1 ${selectedOption === currentQ.correct ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {selectedOption === currentQ.correct ? "Correct Answer" : "Incorrect"}
                </p>
                <p className="text-slate-300 text-sm font-medium">{currentQ.explanation}</p>
              </div>
              <Button onClick={nextQuestion} variant="primary" className="rounded-xl shadow-lg shadow-violet-500/20">
                Next <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
