import { useState, useRef, useEffect, useContext } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Minimize2, Maximize2, Zap, ArrowRight, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { cn } from '../utils';
import { GameContext } from '../context/GameContext';
import { CATEGORIES } from '../data';

const QuickAction = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-violet-100 dark:hover:bg-violet-900/30 text-xs font-medium rounded-full border border-slate-200 dark:border-slate-700 transition-colors whitespace-nowrap"
  >
    {text}
  </button>
);

const AIAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { id: 'bot-1', type: 'bot', text: "Hi! I'm your AI Quiz Assistant. I can help you find quizzes, check your stats, or explain answers! 🧠✨" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const navigate = useNavigate();
  const { startQuiz, saveNewQuiz, user } = useContext(GameContext);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const newUserMsg = { id: `user-${Date.now()}-${Math.random()}`, type: 'user', text: userText };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    // Local Logic (Mock)
    setTimeout(() => {
      const response = generateResponse(userText);
      setMessages(prev => [...prev, { id: `bot-${Date.now()}-${Math.random()}`, type: 'bot', text: response.text, action: response.action }]);

      if (response.action) {
        if (response.action.type === 'NAVIGATE') {
          navigate(response.action.payload);
        } else if (response.action.type === 'CREATE_QUIZ') {
          const topic = response.action.payload;
          setTimeout(() => {
            const newQuiz = generateAIQuiz(topic);
            saveNewQuiz(newQuiz);
            startQuiz(newQuiz);
          }, 1000);
        } else if (typeof response.action === 'function') {
          response.action();
        }
      }
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const generateResponse = (text) => {
    const lowerText = text.toLowerCase();

    // 1. Navigation Commands
    if (lowerText.includes('profile') || lowerText.includes('account')) {
      return { text: "Taking you to your profile settings! 👤", action: () => navigate('/profile') };
    }
    if (lowerText.includes('leaderboard') || lowerText.includes('rank')) {
      return { text: "Let's check who's winning! 🏆", action: () => navigate('/leaderboard') };
    }
    if (lowerText.includes('library') || lowerText.includes('history')) {
      return { text: "Opening your quiz library... 📚", action: () => navigate('/library') };
    }
    if (lowerText.includes('home') || lowerText.includes('dashboard')) {
      return { text: "Heading back to the dashboard! 🏠", action: () => navigate('/') };
    }

    // 2. Stats Queries
    if (lowerText.includes('xp') || lowerText.includes('level') || lowerText.includes('stats')) {
      if (!user) return { text: "Please sign in to view your stats!" };
      return { text: `You are currently **Level ${user.level}** with **${user.xp} XP**. You've played ${user.stats.quizzesPlayed} quizzes! Keep it up! 🔥` };
    }
    if (lowerText.includes('streak')) {
      return { text: `You're on a **${user?.streak || 0} day streak**! Log in every day to keep the fire burning! 🔥` };
    }

    // 3. Quiz Creation / Generation
    const createMatch = lowerText.match(/create.*quiz.*(?:about|on)\s+(.+)/i);
    if (createMatch) {
      const topic = createMatch[1];
      return {
        text: `Starting a generator for a **${topic}** quiz... This might take a second! ⚙️`,
        action: () => {
          setTimeout(() => {
            const newQuiz = generateAIQuiz(topic);
            saveNewQuiz(newQuiz);
            setMessages(prev => [...prev, { id: Date.now(), type: 'bot', text: `Quiz ready! Starting "${newQuiz.title}" now! 🚀` }]);
            startQuiz(newQuiz);
          }, 2000);
        }
      };
    }

    // 4. Content Discovery
    if (lowerText.includes('recommend') || lowerText.includes('suggest')) {
      const randomCat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
      return {
        text: `How about a **${randomCat.name}** quiz? It's one of our most popular topics!`,
        action: () => navigate('/explore')
      };
    }

    // Help / Greetings
    if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey')) {
      return { text: `Hello ${user?.name?.split(' ')[0] || 'Explorer'}! How can I help you today?` };
    }
    if (lowerText.includes('help') || lowerText.includes('can you do')) {
      return { text: "I can show you your stats, navigate to pages (try 'Go to profile'), or create custom quizzes (try 'Create a quiz about Space')!" };
    }

    // Fallback
    return { text: "That's interesting! I'm still learning, but you can ask me to navigate pages or check your stats. 🤖" };
  };

  const generateAIQuiz = (topic) => {
    // ... existing generation logic ...
    return {
      id: `ai-${Date.now()}`,
      title: `${topic.charAt(0).toUpperCase() + topic.slice(1)} Challenge`,
      category: 'AI Generated',
      difficulty: 'Dynamic',
      questionsCount: 5,
      plays: 0,
      rating: '5.0',
      author: 'AI Agent',
      image: `https://loremflickr.com/800/600/${topic.replace(' ', ',')},quiz`,
      questions: [
        {
          id: 1,
          text: `What is the most important fact about ${topic}?`,
          options: ["It is complex", "It is simple", "It is everywhere", "It is rare"],
          correct: 2,
          explanation: `${topic} is a broad subject with many applications.`,
          image: `https://loremflickr.com/800/400/${topic.replace(' ', ',')},fact`
        },
        {
          id: 2,
          text: `Who is a key figure in the history of ${topic}?`,
          options: ["Alan Turing", "Albert Einstein", "Marie Curie", "Isaac Newton"],
          correct: 0,
          explanation: "Many pioneers have contributed to this field.",
          image: `https://loremflickr.com/800/400/${topic.replace(' ', ',')},person`
        },
        {
          id: 3,
          text: `Which year was a milestone for ${topic}?`,
          options: ["1990", "2000", "2010", "2020"],
          correct: 1,
          explanation: "This period saw significant advancements."
        },
        {
          id: 4,
          text: `True or False: ${topic} is related to technology.`,
          options: ["True", "False", "Maybe", "Sometimes"],
          correct: 0,
          explanation: "It often intersects with modern tech.",
          image: `https://loremflickr.com/800/400/${topic.replace(' ', ',')},tech`
        },
        {
          id: 5,
          text: `What is a common application of ${topic}?`,
          options: ["Education", "Entertainment", "Healthcare", "All of the above"],
          correct: 3,
          explanation: "It has diverse use cases across industries."
        }
      ]
    };
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className={cn(
          "fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center border-4 border-white/10 backdrop-blur-md",
          isOpen ? "bg-rose-500 rotate-90 shadow-rose-500/20" : "bg-violet-600 hover:bg-violet-700 shadow-violet-600/30"
        )}
      >
        {isOpen ? <X className="text-white" /> : <Bot className="text-white" size={32} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-40 md:bottom-28 right-4 md:right-8 z-40 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-between shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm border border-white/10 shadow-inner">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-base">Quiz Assistant</h3>
                  <div className="flex items-center gap-1.5 opacity-90">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                    <span className="text-xs font-medium">Online & Ready</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2 h-auto rounded-lg relative z-10" onClick={toggleChat}>
                <Minimize2 size={18} />
              </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/50 dark:bg-slate-950/50 scroll-smooth">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={cn(
                    "flex w-full",
                    msg.type === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div className={cn("flex max-w-[85%] gap-2", msg.type === 'user' ? "flex-row-reverse" : "flex-row")}>
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1 shadow-md",
                      msg.type === 'user' ? "bg-slate-900 dark:bg-slate-700" : "bg-gradient-to-br from-violet-500 to-fuchsia-500"
                    )}>
                      {msg.type === 'user' ? <User size={14} /> : <Sparkles size={14} />}
                    </div>

                    <div
                      className={cn(
                        "p-4 rounded-2xl text-sm leading-relaxed shadow-sm relative",
                        msg.type === 'user'
                          ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-tr-none"
                          : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700"
                      )}
                    >
                      <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shrink-0 mt-1">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-700 flex gap-1.5 items-center h-12">
                    <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions Override */}
            <div className="px-4 py-2 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 flex gap-2 overflow-x-auto no-scrollbar">
              <QuickAction text="My Stats 📊" onClick={() => setInputValue("Show my stats")} />
              <QuickAction text="Surprise Quiz 🎲" onClick={() => setInputValue("Recommend a quiz")} />
              <QuickAction text="Create Space Quiz 🚀" onClick={() => setInputValue("Create a quiz about Space")} />
              <QuickAction text="Leaderboard 🏆" onClick={() => setInputValue("Go to leaderboard")} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2 relative z-20">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 placeholder:text-slate-400 transition-all font-medium"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-500/20 active:scale-95"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAgent;
