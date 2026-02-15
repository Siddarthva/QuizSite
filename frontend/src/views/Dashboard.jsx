import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Flame, Zap, Star, Play } from 'lucide-react';
import Card from '../components/Card';
import CategoryCard from '../components/CategoryCard';
import Button from '../components/Button';
import QuizCard from '../components/QuizCard';
import QuizStartModal from '../components/QuizStartModal';
import { GameContext } from '../context/GameContext';
import { CATEGORIES } from '../data';

const Dashboard = () => {
  const { user, library, startQuiz } = useContext(GameContext);
  const navigate = useNavigate();
  const [selectedQuiz, setSelectedQuiz] = React.useState(null);
  const recommended = library.slice(0, 3);

  const handleDailyChallenge = () => {
    // Just pick a random quiz for now
    if (library.length > 0) {
      const randomQuiz = library[Math.floor(Math.random() * library.length)];
      setSelectedQuiz(randomQuiz);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 md:p-12 text-white shadow-2xl shadow-violet-600/20 ring-1 ring-white/10">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-heading tracking-tight">Ready to learn?  {/* {user.name.split(' ')[0]}?*/}</h2>
          <p className="text-violet-100 text-lg mb-8 font-medium">You're on a {/*{user.streak}*/} day streak! Keep it up to unlock the Firestarter badge.</p>
          <div className="flex gap-4">
            <Button variant="primary" size="lg" onClick={() => document.getElementById('rec-quizzes').scrollIntoView({ behavior: 'smooth' })} className="font-bold shadow-xl shadow-violet-900/20 hover:shadow-violet-900/30 transform hover:-translate-y-0.5" icon={Play}>
              Start Playing
            </Button>
            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 hover:border-white/40 backdrop-blur-sm" onClick={handleDailyChallenge}>
              Daily Challenge
            </Button>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 mix-blend-overlay" />
        <div className="absolute right-20 bottom-0 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl mix-blend-overlay" />
        <Brain size={280} className="absolute -right-12 -bottom-12 text-white/5 rotate-12" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total XP', value: user.xp, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-500/10' },
          { label: 'Accuracy', value: `${user.stats.accuracy}%`, icon: Star, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-500/10' },
          { label: 'Completed', value: user.stats.quizzesPlayed, icon: Star, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/10' },
          { label: 'Ranking', value: '#42', icon: Star, color: 'text-rose-500', bg: 'bg-rose-100 dark:bg-rose-500/10' },
        ].map((stat, i) => (
          <Card key={i} className="p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`p-3.5 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-white/50 dark:bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">Browse Categories</h3>
          <Button variant="ghost" size="sm" className="text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20" onClick={() => navigate('/categories')}>View All</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CATEGORIES.slice(0, 5).map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onClick={() => navigate('/explore', { state: { category: cat.name } })}
            />
          ))}
        </div>
      </div>

      <div id="rec-quizzes" className="pb-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white font-heading">
          <Star className="text-amber-500" fill="currentColor" /> Recommended for You
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommended.map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} onPlay={() => setSelectedQuiz(quiz)} />
          ))}
        </div>
      </div>

      <QuizStartModal
        quiz={selectedQuiz}
        onClose={() => setSelectedQuiz(null)}
        onStart={(quiz) => {
          setSelectedQuiz(null);
          startQuiz(quiz);
        }}
      />
    </div>
  );
};

export default Dashboard;
