import React, { useState } from 'react';
import {
  Brain, Trophy, Layout, Plus, User, Search, Flame, Zap,
  BookOpen, LogOut, Star, Award, BarChart3, Hash,
  CheckCircle, XCircle, ChevronRight, Moon, Sun, Filter
} from 'lucide-react';
import { GameContext } from './context/GameContext';
import { CATEGORIES, BADGES, generateMockQuizzes } from './data';
import { cn } from './utils';
import NavItem, { MobileNavItem } from './components/NavItem';
import Card from './components/Card';
import Button from './components/Button';
import ProgressBar from './components/ProgressBar';
import Badge from './components/Badge';
import QuizCard from './components/QuizCard';
import Dashboard from './views/Dashboard';
import Explore from './views/Explore';
import Library from './views/Library';
import QuizGame from './views/QuizGame';
import HostQuiz from './views/HostQuiz';
import Leaderboard from './views/Leaderboard';
import Profile from './views/Profile';
import './index.css';

export default function App() {
  const [view, setView] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState({
    name: 'Alex Gamer',
    level: 12,
    xp: 2450,
    nextLevelXp: 3000,
    coins: 450,
    streak: 5,
    badges: ['newbie', 'streak_3'],
    stats: { quizzesPlayed: 42, questionsAnswered: 350, accuracy: 78, wins: 15 }
  });

  const [library, setLibrary] = useState(generateMockQuizzes());
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const addNotification = (msg, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3000);
  };

  const startQuiz = (quiz) => {
    if (!quiz.questions || quiz.questions.length === 0) {
      addNotification("This quiz is a placeholder. Try the 'Masterclass' ones!", "error");
      return;
    }
    setActiveQuiz(quiz);
    setView('game');
  };

  const handleQuizComplete = (results) => {
    const xpGained = results.score * 10;
    const isLevelUp = user.xp + xpGained >= user.nextLevelXp;
    setUser(prev => ({
      ...prev,
      xp: prev.xp + xpGained,
      level: isLevelUp ? prev.level + 1 : prev.level,
      nextLevelXp: isLevelUp ? prev.nextLevelXp * 1.2 : prev.nextLevelXp,
      coins: prev.coins + (results.score > 80 ? 50 : 10),
      stats: { ...prev.stats, quizzesPlayed: prev.stats.quizzesPlayed + 1, questionsAnswered: prev.stats.questionsAnswered + results.totalQuestions }
    }));
    if (isLevelUp) addNotification(`Level Up! You are now level ${user.level + 1}`, 'success');
    addNotification(`Quiz Complete! +${xpGained} XP`, 'success');
    setView('dashboard');
    setActiveQuiz(null);
  };

  const saveNewQuiz = (newQuiz) => {
    setLibrary(prev => [newQuiz, ...prev]);
    addNotification('Quiz Created Successfully!', 'success');
    setView('library');
  };

  return (
    <GameContext.Provider value={{ user, library, startQuiz, handleQuizComplete, saveNewQuiz, addNotification, setView }}>
      <div className={cn('min-h-screen font-sans transition-colors duration-300 flex', darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900')}>

        <aside className="hidden md:flex flex-col w-72 h-screen sticky top-0 border-r border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900/50 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-10 text-violet-600 dark:text-violet-400">
            <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-xl"><Brain size={32} /></div>
            <h1 className="text-2xl font-bold tracking-tight">MindQuest</h1>
          </div>

          <nav className="space-y-2 flex-1">
            <NavItem icon={Layout} label="Dashboard" active={view === 'dashboard'} onClick={() => setView('dashboard')} />
            <NavItem icon={Search} label="Explore" active={view === 'explore'} onClick={() => setView('explore')} />
            <NavItem icon={BookOpen} label="My Library" active={view === 'library'} onClick={() => setView('library')} />
            <NavItem icon={Plus} label="Create Quiz" active={view === 'host'} onClick={() => setView('host')} />
            <NavItem icon={Trophy} label="Leaderboard" active={view === 'leaderboard'} onClick={() => setView('leaderboard')} />
            <NavItem icon={User} label="Profile" active={view === 'profile'} onClick={() => setView('profile')} />
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800">
             <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold">{user.name.charAt(0)}</div>
                <div>
                  <p className="font-bold text-sm">{user.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Lvl {user.level} Scholar</p>
                </div>
             </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
          <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-6 z-10 sticky top-0">
            <div className="md:hidden flex items-center gap-2"><Brain className="text-violet-500" /><span className="font-bold">MindQuest</span></div>

            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-full"><Flame size={16} fill="currentColor" /><span>{user.streak} Day Streak</span></div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full"><Zap size={16} fill="currentColor" /><span>{user.xp} XP</span></div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">{darkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
              <Button size="sm" variant="primary">Go Premium</Button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth pb-24 md:pb-8">
            <div className="max-w-6xl mx-auto">
              {view === 'dashboard' && <Dashboard />}
              {view === 'explore' && <Explore />}
              {view === 'library' && <Library />}
              {view === 'game' && activeQuiz && <QuizGame quiz={activeQuiz} />}
              {view === 'host' && <HostQuiz />}
              {view === 'leaderboard' && <Leaderboard />}
              {view === 'profile' && <Profile />}
            </div>
          </div>

          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-2 flex justify-around z-50 safe-area-bottom">
            <MobileNavItem icon={Layout} active={view === 'dashboard'} onClick={() => setView('dashboard')} />
            <MobileNavItem icon={Search} active={view === 'explore'} onClick={() => setView('explore')} />
            <div className="relative -top-6">
               <button onClick={() => setView('host')} className="w-14 h-14 bg-violet-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-violet-500/40 active:scale-95 transition-transform"><Plus size={28} /></button>
            </div>
            <MobileNavItem icon={Trophy} active={view === 'leaderboard'} onClick={() => setView('leaderboard')} />
            <MobileNavItem icon={User} active={view === 'profile'} onClick={() => setView('profile')} />
          </nav>
        </main>

        <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 space-y-2 pointer-events-none">
          {notifications.map(n => (
            <div key={n.id} className="animate-slide-up bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 pointer-events-auto">
              {n.type === 'success' ? <CheckCircle size={20} className="text-emerald-500" /> : <Award size={20} className="text-amber-500" />}
              <span className="font-medium">{n.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </GameContext.Provider>
  );
}
