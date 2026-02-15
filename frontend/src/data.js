export const CATEGORIES = [
  { id: 'gk', name: 'General Knowledge', icon: '🌍', color: 'bg-blue-500' },
  { id: 'history', name: 'History', icon: 'scroll', color: 'bg-amber-600' },
  { id: 'science', name: 'Science', icon: 'atom', color: 'bg-emerald-500' },
  { id: 'movies', name: 'Movies', icon: 'film', color: 'bg-red-500' },
  { id: 'music', name: 'Music', icon: 'music', color: 'bg-pink-500' },
  { id: 'tech', name: 'Technology', icon: 'cpu', color: 'bg-indigo-500' },
  { id: 'sports', name: 'Sports', icon: 'medal', color: 'bg-orange-500' },
  { id: 'geo', name: 'Geography', icon: 'map', color: 'bg-teal-500' },
  { id: 'lit', name: 'Literature', icon: 'book', color: 'bg-yellow-600' },
  { id: 'art', name: 'Art', icon: 'palette', color: 'bg-purple-500' },
  { id: 'food', name: 'Food & Drink', icon: 'utensils', color: 'bg-lime-500' },
  { id: 'animals', name: 'Animals', icon: 'paw', color: 'bg-green-600' },
];

export const BADGES = [
  { id: 'newbie', name: 'First Steps', icon: '👣', desc: 'Completed your first quiz' },
  { id: 'streak_3', name: 'On Fire', icon: '🔥', desc: '3 Day Streak' },
  { id: 'master_gk', name: 'Trivia King', icon: '👑', desc: 'Level 5 in General Knowledge' },
  { id: 'creator', name: 'Architect', icon: '🏗️', desc: 'Created a Quiz' },
  { id: 'speed', name: 'Flash', icon: '⚡', desc: 'Answered in < 2s' },
];

export const generateMockQuizzes = () => {
  const quizzes = [];
  CATEGORIES.forEach(cat => {
    // specific keywords for better images
    const keyword = cat.name.split(' ')[0].toLowerCase();

    quizzes.push({
      id: `${cat.id}-hero`,
      title: `${cat.name} Masterclass`,
      category: cat.name,
      categoryId: cat.id,
      difficulty: 'Medium',
      questionsCount: 5,
      plays: Math.floor(Math.random() * 5000),
      rating: (4 + Math.random()).toFixed(1),
      author: 'System',
      image: `https://loremflickr.com/800/600/${keyword},quiz`,
      questions: [
        { id: 1, text: `What is a key concept in ${cat.name}?`, options: ["Concept A", "Concept B", "Concept C", "Concept D"], correct: 0, explanation: "Concept A is fundamental to this field.", image: `https://loremflickr.com/800/400/${keyword},concept` },
        { id: 2, text: "Which of these is most famous?", options: ["Option X", "Option Y", "Option Z", "Option W"], correct: 1, explanation: "Option Y is widely recognized globally.", image: `https://loremflickr.com/800/400/${keyword},famous` },
        { id: 3, text: "Identify the correct statement.", options: ["False statement", "False statement", "True statement", "False statement"], correct: 2, explanation: "This is the only factually correct choice." },
        { id: 4, text: "Who is a legend in this field?", options: ["Person A", "Person B", "Person C", "Person D"], correct: 3, explanation: "Person D revolutionized the industry.", image: `https://loremflickr.com/800/400/${keyword},person` },
        { id: 5, text: "When did the major event occur?", options: ["1900s", "1950s", "2000s", "Ancient Times"], correct: 1, explanation: "It happened during the mid-20th century." }
      ]
    });

    for (let i = 1; i <= 5; i++) {
      quizzes.push({
        id: `${cat.id}-${i}`,
        title: `${cat.name} Challenge ${i}`,
        category: cat.name,
        categoryId: cat.id,
        difficulty: i % 2 === 0 ? 'Hard' : 'Easy',
        questionsCount: 10 + i,
        plays: Math.floor(Math.random() * 1000),
        rating: (3.5 + Math.random() * 1.5).toFixed(1),
        author: 'Community',
        image: `https://loremflickr.com/800/600/${keyword},challenge`,
        questions: []
      });
    }
  });
  return quizzes;
};
