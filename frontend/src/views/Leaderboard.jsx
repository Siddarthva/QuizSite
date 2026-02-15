import { Trophy, Crown, Medal, TrendingUp } from 'lucide-react';
import Card from '../components/Card';

const Leaderboard = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-8">
      <div className="text-center mb-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-violet-500/20 rounded-full blur-3xl" />
        <h2 className="text-4xl font-black mb-2 relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
          Global Leaderboard
        </h2>
        <p className="text-slate-400 relative z-10">See who's dominating the leagues this week</p>
      </div>

      {/* Top 3 Podium */}
      <div className="flex justify-center items-end gap-4 md:gap-8 mb-16 p-4">
        {[
          { name: "Sarah J.", xp: 12500, avatar: "bg-pink-500", rank: 2, height: "h-32 md:h-40", color: "from-pink-500/20 to-rose-500/5", border: "border-pink-500/30" },
          { name: "Alex Gamer", xp: 15400, avatar: "bg-violet-500", rank: 1, height: "h-40 md:h-52", color: "from-violet-500/20 to-indigo-500/5", border: "border-violet-500/30", crown: true },
          { name: "Mike T.", xp: 10200, avatar: "bg-blue-500", rank: 3, height: "h-24 md:h-32", color: "from-blue-500/20 to-cyan-500/5", border: "border-blue-500/30" },
        ].map((u, i) => (
          <div key={i} className={`flex flex-col items-center group relative ${i === 1 ? 'order-2 -mt-8' : i === 0 ? 'order-1' : 'order-3'}`}>
            {u.crown && <Crown size={32} className="text-amber-400 mb-2 animate-bounce drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" fill="currentColor" />}

            <div className="relative mb-4 transition-transform duration-300 group-hover:scale-110">
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${u.avatar} bg-gradient-to-br ring-4 ring-slate-900 shadow-2xl flex items-center justify-center text-white font-black text-xl md:text-2xl relative z-10`}>
                {u.name.charAt(0)}
              </div>
              <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10 shadow-lg z-20 whitespace-nowrap`}> Rank #{u.rank}</div>
            </div>

            <div className={`w-24 md:w-32 ${u.height} bg-gradient-to-t ${u.color} border-t border-x ${u.border} rounded-t-2xl flex flex-col justify-end pb-4 items-center backdrop-blur-sm`}>
              <div className="text-center p-2">
                <p className="font-bold text-white text-sm md:text-base truncate w-full px-2">{u.name}</p>
                <p className="text-violet-400 text-xs md:text-sm font-bold">{u.xp.toLocaleString()} XP</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* List */}
      <Card className="overflow-hidden bg-slate-900/50 border-white/5 backdrop-blur-md">
        <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span>Rank</span>
          <span>Player</span>
          <span>Score</span>
        </div>
        <div className="divide-y divide-white/5">
          {[4, 5, 6, 7, 8].map((rank) => (
            <div key={rank} className="flex items-center p-4 hover:bg-white/5 transition-colors group">
              <div className="w-8 text-center font-black text-slate-500 group-hover:text-white transition-colors">{rank}</div>

              <div className="w-10 h-10 rounded-full bg-slate-800 mx-4 flex items-center justify-center text-xs font-bold text-slate-400">
                P{rank}
              </div>

              <div className="flex-1">
                <p className="font-bold text-slate-200 group-hover:text-white transition-colors">Player {rank}</p>
                <p className="text-xs text-slate-500">Level {20 - rank} • <span className="text-emerald-500">Online</span></p>
              </div>

              <div className="text-right">
                <div className="font-mono font-bold text-violet-400 group-hover:text-violet-300 transition-colors">{(9000 - (rank * 250)).toLocaleString()} XP</div>
                <div className="text-[10px] text-slate-500 flex items-center justify-end gap-1">
                  <TrendingUp size={10} className="text-emerald-500" /> +24%
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Leaderboard;
