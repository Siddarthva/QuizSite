import React from 'react';
import Card from './Card';
import { Star, Brain, Play } from 'lucide-react';
import Button from './Button';

const QuizCard = ({ quiz, onPlay }) => (
  <Card hover className="flex flex-col h-full group relative overflow-hidden bg-slate-900 border-white/5 data-[hover]:-translate-y-2 transition-all duration-300">
    {/* Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div className="h-32 relative overflow-hidden">
      {quiz.image ? (
        <img src={quiz.image} alt={quiz.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" />
      ) : (
        <div className="absolute inset-0 bg-slate-800" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
      <div className="absolute top-3 left-3">
        <span className="px-2.5 py-1 text-[10px] font-bold bg-black/40 backdrop-blur-md rounded-lg uppercase tracking-wider text-white border border-white/10 shadow-sm">
          {quiz.category}
        </span>
      </div>
    </div>

    <div className="p-5 flex-1 flex flex-col relative z-10">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-bold text-lg leading-tight text-white group-hover:text-violet-200 transition-colors line-clamp-2">{quiz.title}</h4>
        <div className="flex items-center gap-1 text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
          <Star size={10} fill="currentColor" />
          <span className="text-xs font-bold">{quiz.rating}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-400 mb-6">
        <span className="flex items-center gap-1.5"><Brain size={14} className="text-violet-400" /> {quiz.questionsCount} Qs</span>
        <span className="flex items-center gap-1.5"><Play size={14} className="text-emerald-400" /> {quiz.plays} plays</span>
      </div>

      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${quiz.difficulty === 'Easy' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' :
            quiz.difficulty === 'Medium' ? 'border-amber-500/30 text-amber-400 bg-amber-500/10' :
              'border-rose-500/30 text-rose-400 bg-rose-500/10'
          }`}>
          {quiz.difficulty}
        </span>
        <Button size="sm" onClick={onPlay} className="rounded-full px-6 bg-white text-slate-900 hover:bg-violet-200 border-none shadow-lg shadow-violet-500/20">
          Play Now
        </Button>
      </div>
    </div>
  </Card>
);

export default QuizCard;
