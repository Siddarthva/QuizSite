import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Initialize with dummy data or null
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('quiz_user');
    return savedUser ? JSON.parse(savedUser) : {
      name: 'Alex Gamer',
      email: 'alex@example.com',
      level: 12,
      xp: 2450,
      nextLevelXp: 3000,
      streak: 5,
      stats: { quizzesPlayed: 42, questionsAnswered: 350, accuracy: 78, wins: 15 },
      history: []
    };
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    if (user) {
      localStorage.setItem('quiz_user', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('quiz_user');
      setIsAuthenticated(false);
    }
  }, [user]);

  const login = (email, password) => {
    // Dummy authentication logic
    // In a real app, this would make an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const dummyUser = {
            name: email.split('@')[0],
            email: email,
            level: 1,
            xp: 0,
            nextLevelXp: 100,
            streak: 0,
            stats: { quizzesPlayed: 0, questionsAnswered: 0, accuracy: 0, wins: 0 }
          };
          // For demo purposes, we'll just use the existing mock user if it matches "alex"
          // otherwise create a new one based on email
          if (email === 'alex@example.com') {
            setUser({
              name: 'Alex Gamer',
              email: 'alex@example.com',
              level: 12,
              xp: 2450,
              nextLevelXp: 3000,
              streak: 5,
              stats: { quizzesPlayed: 42, questionsAnswered: 350, accuracy: 78, wins: 15 },
              history: [
                { quizId: 'basic-math', title: 'Basic Math', score: 800, xpEarned: 80, date: new Date().toISOString() } // Sample history
              ]
            });
          } else {
            setUser(dummyUser);
          }
          resolve({ success: true });
        } else {
          reject({ message: "Invalid credentials" });
        }
      }, 800);
    });
  };

  const signup = (name, email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          name,
          email,
          level: 1,
          xp: 0,
          nextLevelXp: 100,
          streak: 0,
          stats: { quizzesPlayed: 0, questionsAnswered: 0, accuracy: 0, wins: 0 },
          history: []
        };
        setUser(newUser);
        resolve({ success: true });
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
    return Promise.resolve({ success: true });
  };

  // Helper to update game stats (xp, etc)
  const updateStats = (newStats) => {
    setUser(prev => ({ ...prev, ...newStats }));
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, updateProfile, updateStats }}>
      {children}
    </AuthContext.Provider>
  );
};
