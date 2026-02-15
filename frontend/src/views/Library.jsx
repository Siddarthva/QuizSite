import { useContext } from 'react';
import { BookOpen, Clock, Trophy, Target, Calendar, BarChart3, Zap } from 'lucide-react';
import { GameContext } from '../context/GameContext';
import Card from '../components/Card';
import Button from '../components/Button';

const Library = () => {
  const { user } = useContext(GameContext);
  const history = user?.history || [];

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-violet-600 rounded-2xl shadow-lg shadow-violet-500/30">
          <BookOpen size={32} className="text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">My Library</h2>
          <p className="text-slate-500 dark:text-slate-400">Track your progress and quiz history</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-slate-800/50 border-white/5">
          <div className="text-slate-400 text-xs font-bold uppercase mb-1">Total XP</div>
          <div className="text-2xl font-black text-amber-400">{user.xp}</div>
        </Card>
        <Card className="p-4 bg-slate-800/50 border-white/5">
          <div className="text-slate-400 text-xs font-bold uppercase mb-1">Quizzes</div>
          <div className="text-2xl font-black text-violet-400">{user.stats.quizzesPlayed}</div>
        </Card>
        <Card className="p-4 bg-slate-800/50 border-white/5">
          <div className="text-slate-400 text-xs font-bold uppercase mb-1">Questions</div>
          <div className="text-2xl font-black text-blue-400">{user.stats.questionsAnswered}</div>
        </Card>
        <Card className="p-4 bg-slate-800/50 border-white/5">
          <div className="text-slate-400 text-xs font-bold uppercase mb-1">Avg. Accuracy</div>
          <div className="text-2xl font-black text-emerald-400">{user.stats.accuracy}%</div>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Clock size={20} className="text-violet-500" /> Recent Activity
        </h3>

        {history.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-white/5 border-dashed">
            <BarChart3 size={48} className="mx-auto mb-4 text-slate-700" />
            <p className="text-slate-500 mb-4">No quizzes played yet. Start your journey!</p>
            <Button onClick={() => window.location.href = '/explore'}>Explore Quizzes</Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {history.map((item, idx) => {
              const accuracy = Math.round((item.correctAnswers / item.totalQuestions) * 100) || 0;
              return (
                <Card key={idx} className="p-4 flex flex-col md:flex-row items-center gap-6 group hover:border-violet-500/30 transition-colors">
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                        <Calendar size={12} /> {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span className="flex items-center gap-1.5 text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md">
                        <Trophy size={14} /> {item.score} pts
                      </span>
                      <span className="flex items-center gap-1.5 text-violet-400 font-medium">
                        <Zap size={14} /> +{item.xpEarned} XP
                      </span>
                    </div>
                  </div>

                  {/* Accuracy Circle or Bar */}
                  <div className="flex items-center gap-3 w-full md:w-auto bg-slate-950/50 p-3 rounded-xl border border-white/5">
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold text-slate-500">Accuracy</div>
                      <div className={`text-xl font-black ${accuracy >= 80 ? 'text-emerald-400' : accuracy >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                        {accuracy}%
                      </div>
                    </div>
                    <div className="w-12 h-12 relative flex items-center justify-center">
                      <Target size={24} className={accuracy >= 80 ? 'text-emerald-500' : accuracy >= 50 ? 'text-amber-500' : 'text-rose-500'} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Library;
