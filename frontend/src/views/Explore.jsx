import React, { useContext, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { GameContext } from '../context/GameContext';
import Button from '../components/Button';
import QuizCard from '../components/QuizCard';
import { CATEGORIES } from '../data';

const Explore = () => {
  const { library, startQuiz } = useContext(GameContext);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = library.filter(q => 
    q.title.toLowerCase().includes(search.toLowerCase()) && 
    (filter === 'All' || q.category === filter)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Explore Quizzes</h2>
          <p className="text-slate-500">Discover over {library.length} user-created challenges</p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search topics..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <Button variant="outline" className="px-3"><Filter size={18} /></Button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All', ...CATEGORIES.map(c => c.name)].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`${filter === cat ? 'bg-violet-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'} px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(quiz => (
          <QuizCard key={quiz.id} quiz={quiz} onPlay={() => startQuiz(quiz)} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-500">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p>No quizzes found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
