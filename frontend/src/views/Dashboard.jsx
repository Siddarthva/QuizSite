import React, { useContext } from 'react';
import { Brain, Flame, Zap, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GameContext } from '../context/GameContext';
import { CATEGORIES } from '../data';
import Card from '../components/Card';
import Button from '../components/Button';
import QuizCard from '../components/QuizCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

const Dashboard = () => {
  const { user, library, startQuiz } = useContext(GameContext);
  const recommended = library.slice(0, 3);

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 md:p-12 text-white shadow-2xl shadow-violet-500/20 group"
      >
        <div className="relative z-10 max-w-lg">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-extrabold mb-4"
          >
            Ready to learn, {user.name.split(' ')[0]}?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-violet-100 text-lg mb-8"
          >
            You're on a <span className="font-bold text-amber-300">{user.streak} day streak</span>! Keep it up to unlock the Firestarter badge.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4"
          >
            <Button size="lg" className="bg-white text-violet-400 hover:bg-slate-100 hover:text-white border-none shadow-lg hover:shadow-xl transition-all" onClick={() => document.getElementById('rec-quizzes').scrollIntoView({ behavior: 'smooth' })}>
              <p className="text-black text-lg" >Start Playing</p> <ArrowRight className="ml-2 w-5 h-5 text-black" />
            </Button>
            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:border-white transition-all">
              <p className="text-white text-lg" >Daily Challenge</p>
            </Button>
          </motion.div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse" />
        <div className="absolute right-20 bottom-0 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl" />
        <Brain size={280} className="absolute -right-12 -bottom-12 text-white/5 rotate-12 group-hover:rotate-6 transition-transform duration-700 ease-in-out" />
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total XP', value: user.xp, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Accuracy', value: `${user.stats.accuracy}%`, icon: Brain, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Completed', value: user.stats.quizzesPlayed, icon: Star, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Ranking', value: '#42', icon: Trophy, color: 'text-rose-500', bg: 'bg-rose-500/10' }
        ].map((stat, i) => (
          <Card key={i} className="p-4 flex items-center gap-4 hover:scale-105 transition-transform duration-300 border-none shadow-lg hover:shadow-xl dark:bg-slate-800/50">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl font-extrabold">{stat.value}</p>
            </div>
          </Card>
        ))}
      </motion.div>

      {/* Categories */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Browse Categories</h3>
          <Button variant="ghost" size="sm" className="text-violet-500 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20">View All</Button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 group relative w-32 h-36 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all snap-start"
            >
              <div className={`absolute inset-0 ${cat.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm">{cat.icon}</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-tight">{cat.name}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Recommended Quizzes */}
      <motion.div variants={itemVariants} id="rec-quizzes">
        <h3 className="text-xl font-bold mb-4">Recommended for You</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommended.map((quiz, i) => (
            <motion.div key={quiz.id} whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
              <QuizCard quiz={quiz} onPlay={() => startQuiz(quiz)} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
import { Trophy } from 'lucide-react'; // Added missing import

export default Dashboard;
