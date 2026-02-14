import React, { useContext } from 'react';
import { Brain, Flame, Zap, Star } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import QuizCard from '../components/QuizCard';
import { GameContext } from '../context/GameContext';
import { CATEGORIES } from '../data';

const Dashboard = () => {
  const { user, library, startQuiz } = useContext(GameContext);
  const recommended = library.slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 md:p-12 text-white shadow-2xl shadow-violet-500/20">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to learn,  {/* {user.name.split(' ')[0]}?*/}</h2> 
          <p className="text-violet-100 text-lg mb-8">You're on a {/*{user.streak}*/} day streak! Keep it up to unlock the Firestarter badge.</p>
          <div className="flex gap-4">
            <Button size="lg" className="bg-white text-violet-700 hover:bg-slate-100 border-none" onClick={() => document.getElementById('rec-quizzes').scrollIntoView({ behavior: 'smooth'})}>
              Start Playing
            </Button>
            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:border-white">
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

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Browse Categories</h3>
          <Button variant="ghost" size="sm" className="text-violet-500">View All</Button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button key={cat.id} className="flex-shrink-0 group relative w-32 h-32 rounded-2xl overflow-hidden active:scale-95 transition-transform">
              <div className={`absolute inset-0 ${cat.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-tight">{cat.name}</span>
              </div>
            </button>
          ))}
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
