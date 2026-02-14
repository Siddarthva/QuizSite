import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Layout, Search, BookOpen, Plus, Trophy, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NavItem from './NavItem';
import Button from './Button';

const sidebarVariants = {
    hidden: { x: -250, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            staggerChildren: 0.1
        }
    },
    exit: {
        x: -250,
        opacity: 0,
        transition: { ease: "easeInOut" }
    }
};

const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
};

export default function Sidebar({ className }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/signin');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <motion.aside
            className={`hidden md:flex flex-col w-72 h-screen sticky top-0 border-r border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900/50 backdrop-blur-xl ${className}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
        >
            <motion.div
                className="flex items-center gap-3 mb-10 text-violet-600 dark:text-violet-400"
                variants={itemVariants}
            >
                <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-xl relative group">
                    <Brain size={32} className="relative z-10 transition-transform group-hover:scale-110 duration-300" />
                    <div className="absolute inset-0 bg-violet-400/20 rounded-xl blur-lg scale-0 group-hover:scale-150 transition-transform duration-500" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400">
                    MindQuest
                </h1>
            </motion.div>

            <nav className="space-y-2 flex-1">
                <motion.div variants={itemVariants}><NavItem icon={Layout} label="Dashboard" active={isActive('/')} onClick={() => navigate('/')} /></motion.div>
                <motion.div variants={itemVariants}><NavItem icon={Search} label="Explore" active={isActive('/explore')} onClick={() => navigate('/explore')} /></motion.div>
                <motion.div variants={itemVariants}><NavItem icon={BookOpen} label="My Library" active={isActive('/library')} onClick={() => navigate('/library')} /></motion.div>
                <motion.div variants={itemVariants}><NavItem icon={Plus} label="Create Quiz" active={isActive('/create')} onClick={() => navigate('/create')} /></motion.div>
                <motion.div variants={itemVariants}><NavItem icon={Trophy} label="Leaderboard" active={isActive('/leaderboard')} onClick={() => navigate('/leaderboard')} /></motion.div>
                <motion.div variants={itemVariants}><NavItem icon={User} label="Profile" active={isActive('/profile')} onClick={() => navigate('/profile')} /></motion.div>
            </nav>

            <motion.div
                className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800"
                variants={itemVariants}
            >
                {user ? (
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
                                {user.name.charAt(0)}
                            </div>
                            <div className="transition-opacity opacity-100">
                                <p className="font-bold text-sm bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
                                    {user.name}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Lvl {user.level} Scholar</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all active:scale-95"
                            title="Sign Out"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                ) : (
                    <Button size="sm" variant="primary" className="w-full" onClick={() => navigate('/signin')}>Sign In</Button>
                )}
            </motion.div>
        </motion.aside>
    );
}
