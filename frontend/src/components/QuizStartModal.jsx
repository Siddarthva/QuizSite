import React from 'react';
import Button from './Button';
import { Brain, Clock, Trophy, Target, X, Play } from 'lucide-react';
import Card from './Card';
import { CATEGORIES } from '../data';

const QuizStartModal = ({ quiz, onStart, onClose }) => {
    if (!quiz) return null;

    // Find category details for icon/color
    const category = CATEGORIES.find(c => c.name === quiz.category) || {};
    const CategoryIcon = category.icon || Brain;

    // Calculate stats
    const totalQuestions = quiz.questions ? quiz.questions.length : 0;
    const timePerQuestion = 20; // seconds
    const totalTime = totalQuestions * timePerQuestion;
    const totalPoints = totalQuestions * 100; // Base points

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-slide-up">

                {/* Header Image */}
                <div className="h-32 relative">
                    {quiz.image ? (
                        <img src={quiz.image} alt={quiz.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className={`w-full h-full bg-gradient-to-r ${category.from || 'from-violet-500'} ${category.to || 'to-fuchsia-500'}`} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 relative -mt-10">
                    {/* Title & Category */}
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${category.from || 'from-violet-500'} ${category.to || 'to-fuchsia-500'} shadow-lg shadow-violet-500/20`}>
                            <CategoryIcon size={24} className="text-white" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-slate-300 backdrop-blur-md">
                            {quiz.category}
                        </span>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 leading-tight">{quiz.title}</h2>

                    {/* Rules Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="p-4 rounded-2xl bg-slate-800/50 border border-white/5 flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                <Target size={14} className="text-emerald-400" /> Domain
                            </div>
                            <div className="text-white font-semibold">{quiz.category}</div>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-800/50 border border-white/5 flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                <Trophy size={14} className="text-amber-400" /> Points
                            </div>
                            <div className="text-white font-semibold">{totalPoints} XP</div>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-800/50 border border-white/5 flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                <Brain size={14} className="text-violet-400" /> Questions
                            </div>
                            <div className="text-white font-semibold">{totalQuestions} Qs</div>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-800/50 border border-white/5 flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                <Clock size={14} className="text-blue-400" /> Time
                            </div>
                            <div className="text-white font-semibold">{timePerQuestion}s / Q</div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button variant="secondary" size="lg" className="flex-1" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" size="lg" className="flex-1 shadow-xl shadow-violet-500/20" onClick={() => onStart(quiz)}>
                            Start Quiz <Play size={18} fill="currentColor" />
                        </Button>
                    </div>

                    <p className="text-center text-xs text-slate-500 mt-4">
                        By starting, you agree to the quiz rules. Good luck!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default QuizStartModal;
