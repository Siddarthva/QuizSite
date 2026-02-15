import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { cn } from '../utils';
import { GameContext } from '../context/GameContext';

const AIAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: "Hi! I'm your AI Quiz Assistant. I can help you find quizzes, explain answers, or just chat about cool facts! 🧠✨" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Consume GameContext to start quizzes
  const { startQuiz, saveNewQuiz } = React.useContext(GameContext); // Needs GameContext import

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const newUserMsg = { id: Date.now(), type: 'user', text: userText };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    // Check for "create quiz" intent
    const createQuizRegex = /create.*quiz.*(?:about|on)\s+(.+)/i;
    const match = userText.match(createQuizRegex);

    if (match) {
      const topic = match[1];
      setTimeout(() => {
        const newQuiz = generateAIQuiz(topic);
        saveNewQuiz(newQuiz);
        setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: `I've created a ${topic} quiz for you! Starting it now... 🚀` }]);
        setIsTyping(false);
        setTimeout(() => startQuiz(newQuiz), 1500);
      }, 2000);
      return;
    }

    // Default Mock AI Response
    setTimeout(() => {
      const botResponses = [
        "That's an interesting question! Let me think...",
        "Based on your recent quiz performance, you might enjoy the Science Masterclass.",
        "Did you know? The mitochondria is the powerhouse of the cell! 🦠",
        "I'm here to help you ace your next quiz! What topic are you studying?",
        "Great job keeping up your streak! 🔥",
        "If you're stuck on a question, feel free to ask for a hint!",
        "Try saying 'Create a quiz about Space' to generate a new challenge!"
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      const newBotMsg = { id: Date.now() + 1, type: 'bot', text: randomResponse };
      setMessages(prev => [...prev, newBotMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIQuiz = (topic) => {
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
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className={cn(
          "fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center",
          isOpen ? "bg-rose-500 rotate-90" : "bg-violet-600 hover:bg-violet-700"
        )}
      >
        {isOpen ? <X className="text-white" /> : <Bot className="text-white" size={28} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-40 md:bottom-28 right-4 md:right-8 z-40 w-[90vw] md:w-96 h-[500px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-violet-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Quiz Assistant</h3>
                  <div className="flex items-center gap-1.5 opacity-80">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-xs">Online</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1 h-auto" onClick={toggleChat}>
                <Minimize2 size={16} />
              </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex w-full",
                    msg.type === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                      msg.type === 'user'
                        ? "bg-violet-600 text-white rounded-br-none"
                        : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-100 dark:border-slate-700"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-100 dark:border-slate-700 flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 bg-violet-600 text-white rounded-xl hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAgent;
