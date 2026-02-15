import React, { useState, useEffect } from 'react';
import {
  Brain, Trophy, Layout, Plus, User, Search, Flame, Zap,
  BookOpen, CheckCircle, Award, Sun, Moon, LogOut
} from 'lucide-react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { GameContext } from './context/GameContext';
import { useAuth } from './context/AuthContext';
import { CATEGORIES, BADGES, generateMockQuizzes } from './data';
import { cn } from './utils';
import NavItem, { MobileNavItem } from './components/NavItem';
import Button from './components/Button';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import Categories from './views/Categories';
import Explore from './views/Explore';
import Library from './views/Library';
import QuizGame from './views/QuizGame';
import HostQuiz from './views/HostQuiz';
import Leaderboard from './views/Leaderboard';
import Profile from './views/Profile';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import './index.css';
import AIAgent from './components/AIAgent';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  return children;
};

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

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

  // Helper to determine active view for NavItems
  const isActive = (path) => location.pathname === path;

  // Render layout differently for auth pages
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  if (isAuthPage) {
    return (
      <GameContext.Provider value={{ user, library, startQuiz, handleQuizComplete, saveNewQuiz, addNotification }}>
        <div className={cn('min-h-screen font-sans transition-colors duration-300', darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900')}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/signin" element={<PageTransition><SignIn /></PageTransition>} />
              <Route path="/signup" element={<PageTransition><SignUp /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </div>
      </GameContext.Provider>
    )
  }

  return (
    <GameContext.Provider value={{ user, library, startQuiz, handleQuizComplete, saveNewQuiz, addNotification }}>
      <div className={cn('min-h-screen font-sans transition-colors duration-300 flex', darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900')}>

        {/* Sidebar - Extracted Component */}
        <Sidebar className="z-20" />

        {/* Main Content */}
        <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden relative">
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
              <Button size="sm" variant="primary" onClick={() => addNotification("Premium features coming soon!", "info")}>Go Premium</Button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth pb-24 md:pb-8">
            <div className="max-w-6xl mx-auto">
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<PageTransition><ProtectedRoute><Dashboard /></ProtectedRoute></PageTransition>} />
                  <Route path="/categories" element={<PageTransition><ProtectedRoute><Categories /></ProtectedRoute></PageTransition>} />
                  <Route path="/explore" element={<PageTransition><ProtectedRoute><Explore /></ProtectedRoute></PageTransition>} />
                  <Route path="/library" element={<PageTransition><ProtectedRoute><Library /></ProtectedRoute></PageTransition>} />
                  <Route path="/create" element={<PageTransition><ProtectedRoute><HostQuiz /></ProtectedRoute></PageTransition>} />
                  <Route path="/leaderboard" element={<PageTransition><ProtectedRoute><Leaderboard /></ProtectedRoute></PageTransition>} />
                  <Route path="/profile" element={<PageTransition><ProtectedRoute><Profile /></ProtectedRoute></PageTransition>} />
                  <Route path="/game" element={<PageTransition><ProtectedRoute>{activeQuiz ? <QuizGame quiz={activeQuiz} /> : <Navigate to="/" />}</ProtectedRoute></PageTransition>} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </AnimatePresence>
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

        <AIAgent />

        <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 space-y-2 pointer-events-none">
          <AnimatePresence>
            {notifications.map(n => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 pointer-events-auto"
              >
                {n.type === 'success' ? <CheckCircle size={20} className="text-emerald-500" /> : <Award size={20} className="text-amber-500" />}
                <span className="font-medium">{n.msg}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </GameContext.Provider>
  );
}

