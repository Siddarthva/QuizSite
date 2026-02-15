import {
  Globe, Scroll, Atom, Film, Music, Medal, Map, Book, Palette, Utensils,
  Dog, Cpu, Trophy, Zap, Rocket, TrendingUp, Landmark, Smartphone, Car
} from 'lucide-react';

// Import JSON Data
import animalsData from './data/Animals.json';
import moviesData from './data/Blockbuster_Movies_Oscars_2024_2025.json';
import booksData from './data/Books.json';
import computersData from './data/Computers.json';
import cricketData from './data/Cricket_World_Cup_IPL_2024_2025.json';
import evData from './data/Electric_Vehicles_Tesla_Cybertruck_etc.json';
import filmData from './data/Film.json';
import gkData from './data/General_Knowledge.json';
import geographyData from './data/Geography.json';
import geopoliticsData from './data/Global_Geopolitics_Elections_2024.json';
import historyData from './data/History.json';
import gadgetsData from './data/Latest_Smartphones_Tech_Gadgets_2025.json';
import musicData from './data/Music.json';
import scienceData from './data/Nature__Science.json';
import spacexData from './data/SpaceX_Starship_Space_Exploration_2025.json';
import sportsData from './data/Sports.json';
import viralData from './data/Viral_Social_Media_Trends_2024.json';

// Map data to categories
const DATA_MAP = {
  'animals': animalsData,
  'movies': moviesData,
  'books': booksData,
  'computers': computersData,
  'cricket': cricketData,
  'ev': evData,
  'film': filmData,
  'gk': gkData,
  'geo': geographyData,
  'politics': geopoliticsData,
  'history': historyData,
  'gadgets': gadgetsData,
  'music': musicData,
  'science': scienceData,
  'spacex': spacexData,
  'sports': sportsData,
  'viral': viralData
};

export const CATEGORIES = [
  { id: 'gk', name: 'General Knowledge', icon: Globe, color: 'bg-blue-500', from: 'from-blue-500', to: 'to-blue-600', shadow: 'shadow-blue-500', dataKey: 'gk' },
  { id: 'science', name: 'Nature & Science', icon: Atom, color: 'bg-emerald-500', from: 'from-emerald-500', to: 'to-emerald-600', shadow: 'shadow-emerald-500', dataKey: 'science' },
  { id: 'computers', name: 'Computers', icon: Cpu, color: 'bg-indigo-500', from: 'from-indigo-500', to: 'to-indigo-600', shadow: 'shadow-indigo-500', dataKey: 'computers' },
  { id: 'gadgets', name: 'Tech & Gadgets', icon: Smartphone, color: 'bg-cyan-500', from: 'from-cyan-500', to: 'to-cyan-600', shadow: 'shadow-cyan-500', dataKey: 'gadgets' },
  { id: 'spacex', name: 'Space Exploration', icon: Rocket, color: 'bg-slate-500', from: 'from-slate-500', to: 'to-slate-600', shadow: 'shadow-slate-500', dataKey: 'spacex' },
  { id: 'ev', name: 'Electric Vehicles', icon: Car, color: 'bg-lime-500', from: 'from-lime-500', to: 'to-lime-600', shadow: 'shadow-lime-500', dataKey: 'ev' },
  { id: 'history', name: 'History', icon: Scroll, color: 'bg-amber-600', from: 'from-amber-600', to: 'to-amber-700', shadow: 'shadow-amber-600', dataKey: 'history' },
  { id: 'politics', name: 'Geopolitics', icon: Landmark, color: 'bg-red-700', from: 'from-red-700', to: 'to-red-800', shadow: 'shadow-red-700', dataKey: 'politics' },
  { id: 'movies', name: 'Blockbuster Movies', icon: Film, color: 'bg-red-500', from: 'from-red-500', to: 'to-red-600', shadow: 'shadow-red-500', dataKey: 'movies' },
  { id: 'film', name: 'Film Classics', icon: Film, color: 'bg-rose-500', from: 'from-rose-500', to: 'to-rose-600', shadow: 'shadow-rose-500', dataKey: 'film' },
  { id: 'music', name: 'Music', icon: Music, color: 'bg-pink-500', from: 'from-pink-500', to: 'to-pink-600', shadow: 'shadow-pink-500', dataKey: 'music' },
  { id: 'books', name: 'Literature', icon: Book, color: 'bg-yellow-600', from: 'from-yellow-600', to: 'to-yellow-700', shadow: 'shadow-yellow-600', dataKey: 'books' },
  { id: 'sports', name: 'Sports', icon: Medal, color: 'bg-orange-500', from: 'from-orange-500', to: 'to-orange-600', shadow: 'shadow-orange-500', dataKey: 'sports' },
  { id: 'cricket', name: 'Cricket', icon: Trophy, color: 'bg-blue-700', from: 'from-blue-700', to: 'to-blue-800', shadow: 'shadow-blue-700', dataKey: 'cricket' },
  { id: 'viral', name: 'Viral Trends', icon: TrendingUp, color: 'bg-fuchsia-500', from: 'from-fuchsia-500', to: 'to-fuchsia-600', shadow: 'shadow-fuchsia-500', dataKey: 'viral' },
  { id: 'animals', name: 'Animals', icon: Dog, color: 'bg-green-600', from: 'from-green-600', to: 'to-green-700', shadow: 'shadow-green-600', dataKey: 'animals' },
  { id: 'geo', name: 'Geography', icon: Map, color: 'bg-teal-500', from: 'from-teal-500', to: 'to-teal-600', shadow: 'shadow-teal-500', dataKey: 'geo' },
];

export const BADGES = [
  { id: 'newbie', name: 'First Steps', icon: '👣', desc: 'Completed your first quiz' },
  { id: 'streak_3', name: 'On Fire', icon: '🔥', desc: '3 Day Streak' },
  { id: 'master_gk', name: 'Trivia King', icon: '👑', desc: 'Level 5 in General Knowledge' },
  { id: 'creator', name: 'Architect', icon: '🏗️', desc: 'Created a Quiz' },
  { id: 'speed', name: 'Flash', icon: '⚡', desc: 'Answered in < 2s' },
];

// Helper to shuffle array
const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const generateMockQuizzes = () => {
  const quizzes = [];

  CATEGORIES.forEach(cat => {
    const rawData = DATA_MAP[cat.dataKey] || [];
    const categoryQuestions = rawData.map((q, index) => ({
      id: index,
      text: q.question,
      options: q.options,
      correct: q.options.indexOf(q.answer), // Find index of correct answer
      explanation: `The correct answer is ${q.answer}.` // Simple explanation
    })).filter(q => q.correct !== -1); // Filter out invalid questions where answer isn't in options

    if (categoryQuestions.length === 0) return;

    // Create a "Masterclass" quiz (first 10 questions)
    if (categoryQuestions.length >= 5) {
      quizzes.push({
        id: `${cat.id}-master`,
        title: `${cat.name} Masterclass`,
        category: cat.name,
        categoryId: cat.id,
        difficulty: 'Hard',
        questionsCount: 10,
        plays: Math.floor(Math.random() * 5000),
        rating: (4.5 + Math.random() * 0.5).toFixed(1),
        author: 'System',
        image: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000)}?auto=format&fit=crop&w=800&q=80`,
        questions: shuffle([...categoryQuestions]).slice(0, 10)
      });
    }

    // Create randomized challenges
    for (let i = 1; i <= 3; i++) {
      const difficulty = i === 1 ? 'Easy' : i === 2 ? 'Medium' : 'Hard';
      const qCount = i * 5; // 5, 10, 15

      if (categoryQuestions.length >= qCount) {
        quizzes.push({
          id: `${cat.id}-challenge-${i}`,
          title: `${cat.name} ${difficulty} Challenge`,
          category: cat.name,
          categoryId: cat.id,
          difficulty: difficulty,
          questionsCount: qCount,
          plays: Math.floor(Math.random() * 2000),
          rating: (3.5 + Math.random() * 1.5).toFixed(1),
          author: 'Community',
          image: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000)}?auto=format&fit=crop&w=800&q=80`,
          questions: shuffle([...categoryQuestions]).slice(0, qCount)
        });
      }
    }
  });

  return quizzes;
};
