import React, { useContext } from 'react';
import Card from '../components/Card';
import { Award, BarChart3 } from 'lucide-react';
import Badge from '../components/Badge';
import { GameContext } from '../context/GameContext';
import { BADGES } from '../data';
import ProgressBar from '../components/ProgressBar';

const Profile = () => {
  const { user } = useContext(GameContext);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-6">
      <Card className="p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-violet-500 to-fuchsia-600 opacity-20" />
        <div className="relative z-10 w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-4xl text-white font-bold">{user.name.charAt(0)}<div className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800" title="Online" /></div>
        <div className="flex-1 text-center md:text-left z-10"><h2 className="text-3xl font-bold mb-1">{user.name}</h2><p className="text-slate-500 mb-4">Master of Knowledge • Joined 2024</p><div className="flex flex-wrap justify-center md:justify-start gap-3"><span className="px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full text-xs font-bold uppercase tracking-wider">Lvl {user.level}</span><span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">Premium Member</span></div></div>
        <div className="w-full md:w-64 z-10"><div className="flex justify-between text-sm mb-2 font-semibold"><span>Level Progress</span><span>{Math.floor((user.xp / user.nextLevelXp) * 100)}%</span></div><ProgressBar current={user.xp} max={user.nextLevelXp} height="h-3" /><p className="text-xs text-center mt-2 text-slate-500">{user.nextLevelXp - user.xp} XP to Level {user.level + 1}</p></div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="p-6">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Award className="text-amber-500"/> Badges Earned</h3>
            <div className="grid grid-cols-3 gap-4">
               {BADGES.map(b => {
                 const isUnlocked = user.badges.includes(b.id);
                 return <Badge key={b.id} icon={b.icon} label={b.name} locked={!isUnlocked} />
               })}
            </div>
         </Card>
         <Card className="p-6">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><BarChart3 className="text-blue-500"/> Statistics</h3>
            <div className="space-y-4">
               {[
                 { l: 'Total Plays', v: user.stats.quizzesPlayed },
                 { l: 'Accuracy', v: `${user.stats.accuracy}%` },
                 { l: 'Perfect Scores', v: user.stats.wins },
                 { l: 'Best Streak', v: '12' },
               ].map((s,i) => (
                 <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50"><span className="text-slate-500 font-medium">{s.l}</span><span className="font-bold text-lg">{s.v}</span></div>
               ))}
            </div>
         </Card>
      </div>
    </div>
  );
};

export default Profile;
