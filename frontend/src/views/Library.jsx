import React from 'react';
import { BookOpen } from 'lucide-react';
import Button from '../components/Button';

const Library = () => {
  return (
    <div className="text-center py-20 animate-fade-in">
       <BookOpen size={64} className="mx-auto mb-4 text-violet-300" />
       <h2 className="text-2xl font-bold mb-2">Your Library</h2>
       <p className="text-slate-500 mb-6">Quizzes you've liked or created will appear here.</p>
       <Button onClick={() => window.alert('This feature connects to local storage in the full version!')}>Sync Library</Button>
    </div>
  )
}

export default Library;
