import React, { useContext, useEffect, useState } from 'react';
import { Trophy, Star, LogOut, Zap, CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import Card from '../components/Card';
import { GameContext } from '../context/GameContext';

const QuizGame = ({ quiz }) => {
  const { handleQuizComplete, setView } = useContext(GameContext);
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
          <Button variant="secondary" onClick={() => setView('dashboard')}>Back Home</Button>
          <Button onClick={() => handleQuizComplete({ score, totalQuestions: quiz.questions.length })}>Claim Rewards</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto h-full flex flex-col animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="sm" onClick={() => setView('dashboard')}><LogOut size={18} /> Quit</Button>
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{quiz.category}</span>
          <span className="font-bold">Question {currentQIndex + 1}/{quiz.questions.length}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-600 rounded-full font-bold text-sm">
          <Zap size={14} fill="currentColor" /> {score}
        </div>
      </div>

      <div className="mb-8 space-y-2">
        <ProgressBar current={timeLeft} max={20} color={timeLeft < 5 ? 'bg-rose-500' : 'bg-violet-500'} />
        <div className="flex justify-between text-xs font-semibold text-slate-400">
          <span>Time Left</span>
          <span className={timeLeft < 5 ? "text-rose-500 animate-pulse" : ""}>{timeLeft}s</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {currentQ.image && (
          <div className="mb-6 rounded-2xl overflow-hidden shadow-lg mx-auto max-h-60 w-full md:w-3/4">
            <img src={currentQ.image} alt="Question" className="w-full h-full object-cover" />
          </div>
        )}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 leading-relaxed">{currentQ.text}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {currentQ.options.map((opt, idx) => {
            let stateStyle = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-violet-500";
            if (isAnswered) {
              if (idx === currentQ.correct) stateStyle = "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500 text-emerald-700 dark:text-emerald-300";
              else if (idx === selectedOption) stateStyle = "bg-rose-100 dark:bg-rose-900/30 border-rose-500 text-rose-700 dark:text-rose-300 opacity-60";
              else stateStyle = "opacity-40";
            }
            return (
              <button key={idx} disabled={isAnswered} onClick={() => handleAnswer(idx)} className={`p-6 rounded-2xl border-2 text-left transition-all duration-200 font-semibold text-lg flex items-center justify-between group ${stateStyle} ${!isAnswered ? 'hover:shadow-md hover:-translate-y-0.5 active:scale-95' : ''}`}>
                <span>{opt}</span>
                {isAnswered && idx === currentQ.correct && <CheckCircle className="text-emerald-500" />}
                {isAnswered && idx === selectedOption && idx !== currentQ.correct && <XCircle className="text-rose-500" />}
              </button>
            )
          })}
        </div>
      </div>

      <div className="h-24">
        {gameStatus === 'feedback' && (
          <div className="animate-slide-up flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl border-l-4 border-violet-500">
            <div>
              <p className="font-bold text-sm text-slate-500 uppercase mb-1">{selectedOption === currentQ.correct ? "Brilliant!" : "Correct Answer:"}</p>
              <p className="font-medium">{currentQ.explanation}</p>
            </div>
            <Button onClick={nextQuestion} className="flex-shrink-0">Next Question <ChevronRight size={18} /></Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGame;
