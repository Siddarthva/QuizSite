import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Flame, Zap, Star, Play } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import QuizCard from '../components/QuizCard';
import { GameContext } from '../context/GameContext';
import { CATEGORIES } from '../data';

const Dashboard = () => {
  const { user, library, startQuiz } = useContext(GameContext);
  const navigate = useNavigate();
  const recommended = library.slice(0, 3);

  const handleDailyChallenge = () => {
    // Just pick a random quiz for now
    if (library.length > 0) {
      const randomQuiz = library[Math.floor(Math.random() * library.length)];
      startQuiz(randomQuiz);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 md:p-12 text-white shadow-2xl shadow-violet-500/20">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-heading">Ready to learn,  {/* {user.name.split(' ')[0]}?*/}</h2>
          <p className="text-violet-100 text-lg mb-8">You're on a {/*{user.streak}*/} day streak! Keep it up to unlock the Firestarter badge.</p>
          <div className="flex gap-4">
            <Button variant="white" size="lg" onClick={() => document.getElementById('rec-quizzes').scrollIntoView({ behavior: 'smooth' })} className="font-bold flex items-center gap-2">
              Start Playing <Play size={20} fill="currentColor" />
            </Button>
            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:border-white" onClick={handleDailyChallenge}>
              Daily Challenge
            </Button>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute right-20 bottom-0 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl" />
        <Brain size={280} className="absolute -right-12 -bottom-12 text-white/5 rotate-12" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total XP', value: user.xp, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Accuracy', value: `${user.stats.accuracy}%`, icon: Star, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Completed', value: user.stats.quizzesPlayed, icon: Star, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Ranking', value: '#42', icon: Star, color: 'text-rose-500', bg: 'bg-rose-500/10' },
        ].map((stat, i) => (
          <Card key={i} className="p-4 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">{stat.label}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-slate-950 p-6 md:p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Browse Categories</h3>
          <Button variant="ghost" size="sm" className="text-violet-500 hover:text-violet-400" onClick={() => navigate('/explore')}>View All</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => navigate('/explore', { state: { category: cat.name } })}
                className={`
                  group relative flex flex-col items-center justify-center p-6
                  bg-slate-900 rounded-3xl border border-white/5
                  transition-all duration-300 ease-out
                  hover:-translate-y-2 hover:shadow-lg hover:shadow-${cat.shadow}/20
                `}
              >
                {/* Icon Container - Squircle */}
                <div className={`
                  mb-4 p-4 rounded-2xl bg-slate-800 text-white
                  group-hover:bg-${cat.color} group-hover:text-white
                  transition-colors duration-300
                `}>
                  <Icon size={32} strokeWidth={1.5} />
                </div>

                {/* Label */}
                <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
                  {cat.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div id="rec-quizzes">
        <h3 className="text-xl font-bold mb-4">Recommended for You</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommended.map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} onPlay={() => startQuiz(quiz)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
