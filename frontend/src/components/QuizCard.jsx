import React from 'react';
import Card from './Card';
import { Star, Brain, Play } from 'lucide-react';
import Button from './Button';

const QuizCard = ({ quiz, onPlay }) => (
  <Card hover className="flex flex-col h-full">
    <div className="h-32 bg-slate-100 dark:bg-slate-700/50 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
      {quiz.image ? (
        <img src={quiz.image} alt={quiz.title} className="w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, gray 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute top-3 left-3">
        <span className="px-2 py-1 text-xs font-bold bg-white/20 backdrop-blur rounded-md uppercase tracking-wider text-white shadow-sm">{quiz.category}</span>
      </div>
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-lg leading-tight line-clamp-2">{quiz.title}</h4>
        <span className="text-xs font-semibold text-amber-500 flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full">
          <Star size={10} fill="currentColor" /> {quiz.rating}
        </span>
      </div>
      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-6">
        <span className="flex items-center gap-1"><Brain size={12} /> {quiz.questionsCount} Qs</span>
        <span className="flex items-center gap-1"><Play size={12} /> {quiz.plays}</span>
        <span className="px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-[10px]">{quiz.difficulty}</span>
      </div>
      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
        <div className="flex -space-x-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 bg-slate-300"></div>
          ))}
        </div>
        <Button size="sm" onClick={onPlay} className="rounded-full px-6">Play</Button>
      </div>
    </div>
  </Card>
);

export default QuizCard;
