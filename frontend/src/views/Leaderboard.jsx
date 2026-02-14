import React from 'react';
import Card from '../components/Card';
import { Trophy } from 'lucide-react';

const Leaderboard = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Global Leaderboard</h2>
        <p className="text-slate-500">See who's dominating the leagues this week</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end mb-12">
        {[
          { name: "Sarah J.", xp: 12500, avatar: "bg-pink-500", rank: 2, height: "h-32" },
          { name: "Alex Gamer", xp: 15400, avatar: "bg-violet-500", rank: 1, height: "h-40" },
          { name: "Mike T.", xp: 10200, avatar: "bg-blue-500", rank: 3, height: "h-24" },
        ].map((u, i) => (
          <div key={i} className={`flex flex-col items-center ${i === 1 ? 'order-2' : i === 0 ? 'order-1' : 'order-3'}`}>
             <div className="relative mb-4">
                <div className={`w-16 h-16 rounded-full ${u.avatar} border-4 border-white dark:border-slate-900 shadow-xl flex items-center justify-center text-white font-bold text-xl`}>
                  {u.name.charAt(0)}
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-2 py-0.5 rounded-full">#{u.rank}</div>
             </div>
             <div className={`w-full ${u.height} bg-gradient-to-t from-slate-200 to-white dark:from-slate-800 dark:to-slate-900 rounded-t-2xl flex items-end justify-center pb-4`}>
                <div className="text-center"><p className="font-bold">{u.name}</p><p className="text-violet-500 text-sm font-semibold">{u.xp} XP</p></div>
             </div>
          </div>
        ))}
      </div>

      <Card className="overflow-hidden">
        {[4,5,6,7,8].map((rank) => (
          <div key={rank} className="flex items-center p-4 border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <span className="w-8 text-center font-bold text-slate-400">{rank}</span>
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 mx-4" />
            <div className="flex-1"><p className="font-bold text-sm">Player {rank}</p><p className="text-xs text-slate-500">Level {20 - rank}</p></div>
            <div className="font-mono font-bold text-violet-500">{9000 - (rank * 250)} XP</div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default Leaderboard;
