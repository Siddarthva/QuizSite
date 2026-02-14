import React, { useContext, useState } from 'react';
import { Plus } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { GameContext } from '../context/GameContext';
import { CATEGORIES } from '../data';

const HostQuiz = () => {
  const { saveNewQuiz } = useContext(GameContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ title: '', category: CATEGORIES[0].name, difficulty: 'Medium', questions: [] });
  const [currentQ, setCurrentQ] = useState({ text: '', options: ['', '', '', ''], correct: 0, explanation: '' });

  const addQuestion = () => {
    if (!currentQ.text || currentQ.options.some(o => !o)) return;
    setFormData(prev => ({ ...prev, questions: [...prev.questions, { ...currentQ, id: Date.now() }] }));
    setCurrentQ({ text: '', options: ['', '', '', ''], correct: 0, explanation: '' });
  };

  const publish = () => {
    saveNewQuiz({ ...formData, id: `custom-${Date.now()}`, questionsCount: formData.questions.length, plays: 0, rating: 'New', author: 'You', categoryId: 'custom' });
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Create a Quiz</h2>
        <div className="flex gap-2">
          <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-violet-500' : 'bg-slate-200'}`} />
          <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-violet-500' : 'bg-slate-200'}`} />
        </div>
      </div>

      {step === 1 ? (
        <Card className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">Quiz Title</label>
            <input className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl" placeholder="e.g., Advanced Astrophysics" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Category</label>
              <select className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Difficulty</label>
              <select className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl" value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})}>
                {['Easy', 'Medium', 'Hard', 'Expert'].map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setStep(2)} disabled={!formData.title}>Next Step</Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="p-6 space-y-4 border-violet-500 border-2">
            <h3 className="font-bold flex items-center gap-2"><Plus size={18}/> Add Question {formData.questions.length + 1}</h3>
            <input className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl" placeholder="Question text..." value={currentQ.text} onChange={e => setCurrentQ({...currentQ, text: e.target.value})} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentQ.options.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input type="radio" name="correct" checked={currentQ.correct === idx} onChange={() => setCurrentQ({...currentQ, correct: idx})} className="w-4 h-4 accent-violet-500" />
                  <input className="flex-1 p-2 bg-slate-50 dark:bg-slate-900 border rounded-lg text-sm" placeholder={`Option ${idx + 1}`} value={opt} onChange={e => { const newOpts = [...currentQ.options]; newOpts[idx] = e.target.value; setCurrentQ({...currentQ, options: newOpts}); }} />
                </div>
              ))}
            </div>
            <textarea className="w-full p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl text-sm h-20" placeholder="Explanation for the correct answer (optional)" value={currentQ.explanation} onChange={e => setCurrentQ({...currentQ, explanation: e.target.value})} />
            <Button variant="secondary" className="w-full" onClick={addQuestion}>Add to Quiz</Button>
          </Card>

          <div className="space-y-2">
             {formData.questions.map((q, i) => (
               <div key={q.id} className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center text-sm">
                 <span className="font-medium truncate flex-1">{i + 1}. {q.text}</span>
                 <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">Q{i+1}</span>
               </div>
             ))}
          </div>

          <div className="flex justify-between pt-4">
             <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
             <Button variant="primary" onClick={publish} disabled={formData.questions.length === 0}>Publish Quiz ({formData.questions.length} Qs)</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostQuiz;
