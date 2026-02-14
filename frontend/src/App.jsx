import React, { useState, useEffect } from 'react';
import {
  Brain, Trophy, Layout, Plus, User, Search, Flame, Zap,
  BookOpen, CheckCircle, Award, Sun, Moon, LogOut
} from 'lucide-react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { GameContext } from './context/GameContext';
import { useAuth } from './context/AuthContext';
import { CATEGORIES, BADGES, generateMockQuizzes } from './data';
import { cn } from './utils';
import NavItem, { MobileNavItem } from './components/NavItem';
import Button from './components/Button';
import Dashboard from './views/Dashboard';
import Explore from './views/Explore';
import Library from './views/Library';
import QuizGame from './views/QuizGame';
import HostQuiz from './views/HostQuiz';
import Leaderboard from './views/Leaderboard';
import Profile from './views/Profile';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import './index.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  return children;
};

export default function App() {
  const { user, logout, updateStats } = useAuth(); // Use Auth Context for user
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(true);

  // Keep local state for game-related things
  const [library, setLibrary] = useState(generateMockQuizzes());
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

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
    navigate('/game');
  };

  const handleQuizComplete = (results) => {
    if (!user) return; // Should be protected, but safety check

    const xpGained = results.score * 10;
    const isLevelUp = user.xp + xpGained >= user.nextLevelXp;

    // Update user stats via AuthContext
    const newStats = {
      xp: user.xp + xpGained,
      level: isLevelUp ? user.level + 1 : user.level,
      nextLevelXp: isLevelUp ? user.nextLevelXp * 1.2 : user.nextLevelXp,
      coins: user.coins + (results.score > 80 ? 50 : 10),
      stats: {
        ...user.stats,
        quizzesPlayed: user.stats.quizzesPlayed + 1,
        questionsAnswered: user.stats.questionsAnswered + results.totalQuestions
      }
    };

    updateStats(newStats);

    if (isLevelUp) addNotification(`Level Up! You are now level ${user.level + 1}`, 'success');
    addNotification(`Quiz Complete! +${xpGained} XP`, 'success');
    navigate('/');
    setActiveQuiz(null);
  };

  const saveNewQuiz = (newQuiz) => {
    setLibrary(prev => [newQuiz, ...prev]);
    addNotification('Quiz Created Successfully!', 'success');
    navigate('/library');
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  }

  // Helper to determine active view for NavItems
  const isActive = (path) => location.pathname === path;

  // Render layout differently for auth pages
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  if (isAuthPage) {
    return (
      <GameContext.Provider value={{ user, library, startQuiz, handleQuizComplete, saveNewQuiz, addNotification }}>
        <div className={cn('min-h-screen font-sans transition-colors duration-300', darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900')}>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </GameContext.Provider>
    )
  }

  return (
    <GameContext.Provider value={{ user, library, startQuiz, handleQuizComplete, saveNewQuiz, addNotification }}>
      <div className={cn('min-h-screen font-sans transition-colors duration-300 flex', darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900')}>

        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-72 h-screen sticky top-0 border-r border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900/50 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-10 text-violet-600 dark:text-violet-400">
            <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-xl"><Brain size={32} /></div>
            <h1 className="text-2xl font-bold tracking-tight">MindQuest</h1>
          </div>

          <nav className="space-y-2 flex-1">
            <NavItem icon={Layout} label="Dashboard" active={isActive('/')} onClick={() => navigate('/')} />
            <NavItem icon={Search} label="Explore" active={isActive('/explore')} onClick={() => navigate('/explore')} />
            <NavItem icon={BookOpen} label="My Library" active={isActive('/library')} onClick={() => navigate('/library')} />
            <NavItem icon={Plus} label="Create Quiz" active={isActive('/create')} onClick={() => navigate('/create')} />
            <NavItem icon={Trophy} label="Leaderboard" active={isActive('/leaderboard')} onClick={() => navigate('/leaderboard')} />
            <NavItem icon={User} label="Profile" active={isActive('/profile')} onClick={() => navigate('/profile')} />
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold">{user.name.charAt(0)}</div>
                  <div>
                    <p className="font-bold text-sm">{user.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Lvl {user.level}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 transition-colors"><LogOut size={18} /></button>
              </div>
            ) : (
              <Button size="sm" variant="primary" className="w-full" onClick={() => navigate('/signin')}>Sign In</Button>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
          <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-6 z-10 sticky top-0">
            <div className="md:hidden flex items-center gap-2"><Brain className="text-violet-500" /><span className="font-bold">MindQuest</span></div>

            {user && (
              <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-full"><Flame size={16} fill="currentColor" /><span>{user.streak} Day Streak</span></div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full"><Zap size={16} fill="currentColor" /><span>{user.xp} XP</span></div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">{darkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
              <Button size="sm" variant="primary">Go Premium</Button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth pb-24 md:pb-8">
            <div className="max-w-6xl mx-auto">
              <Routes>
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
                <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
                <Route path="/create" element={<ProtectedRoute><HostQuiz /></ProtectedRoute>} />
                <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/game" element={<ProtectedRoute>{activeQuiz ? <QuizGame quiz={activeQuiz} /> : <Navigate to="/" />}</ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>

          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-2 flex justify-around z-50 safe-area-bottom">
            <MobileNavItem icon={Layout} active={isActive('/')} onClick={() => navigate('/')} />
            <MobileNavItem icon={Search} active={isActive('/explore')} onClick={() => navigate('/explore')} />
            <div className="relative -top-6">
              <button onClick={() => navigate('/create')} className="w-14 h-14 bg-violet-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-violet-500/40 active:scale-95 transition-transform"><Plus size={28} /></button>
            </div>
            <MobileNavItem icon={Trophy} active={isActive('/leaderboard')} onClick={() => navigate('/leaderboard')} />
            <MobileNavItem icon={User} active={isActive('/profile')} onClick={() => navigate('/profile')} />
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

