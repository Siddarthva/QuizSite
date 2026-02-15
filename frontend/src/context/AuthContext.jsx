import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('quiz_user');
    return savedUser ? JSON.parse(savedUser) : null;
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

  // Helper to map backend user to frontend user structure
  const mapUser = (backendUser) => {
    return {
      id: backendUser._id || backendUser.id,
      name: backendUser.username,
      email: backendUser.email,
      level: backendUser.level || 1,
      xp: backendUser.xp || 0,
      nextLevelXp: (backendUser.level || 1) * 1000, // Example logic
      streak: backendUser.streak || 0,
      stats: {
        quizzesPlayed: backendUser.stats?.quizzesPlayed || 0,
        questionsAnswered: backendUser.stats?.questionsAnswered || 0,
        accuracy: backendUser.stats?.accuracy || 0,
        wins: backendUser.stats?.wins || 0
      },
      history: backendUser.history || []
    };
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/user/login', { email, password });
      const { token, user: initialUser } = response.data;

      localStorage.setItem('q_token', token);

      // Workaround: Fetch full stats by calling update-stats with empty body
      // This is because login endpoint doesn't return full stats in this backend
      try {
        const statsResponse = await api.put(`/user/update-stats/${initialUser.id}`, {});
        if (statsResponse.data && statsResponse.data.user) {
          const mappedUser = mapUser(statsResponse.data.user);
          setUser(mappedUser);
          return { success: true };
        }
      } catch (statsErr) {
        console.warn("Could not fetch latest stats, using login info", statsErr);
      }

      // Fallback if stats fetch fails
      setUser(mapUser(initialUser));
      return { success: true };

    } catch (error) {
      console.error("Login failed:", error);
      return Promise.reject({
        message: error.response?.data?.message || "Login failed"
      });
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await api.post('/user/signup', { username: name, email, password });
      const { token, user: initialUser } = response.data;

      localStorage.setItem('q_token', token);

      // New users have default stats, so we can just map what we got
      // Or optionally fetch to be consistent
      const mappedUser = mapUser(initialUser);
      setUser(mappedUser);
      return { success: true };

    } catch (error) {
      return Promise.reject({
        message: error.response?.data?.message || "Signup failed"
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('q_token');
    localStorage.removeItem('quiz_user');
    setUser(null);
  };

  const updateProfile = async (updates) => {
    // Not implemented in backend yet, so we just update local state
    setUser(prev => ({ ...prev, ...updates }));
    return Promise.resolve({ success: true });
  };

  const updateStats = async (newStats) => {
    // Optimistic update
    setUser(prev => ({ ...prev, ...newStats }));

    if (user && user.id) {
      try {
        // Calculate deltas for the backend $inc logic
        // Backend expects: { xp, completedQuestions, correctAnswers }

        // 1. XP Delta
        const xpDelta = (newStats.xp || 0) - (user.xp || 0);

        // 2. Questions Answered Delta
        // Note: newStats.stats might be partial, so careful with access
        const oldQuestions = user.stats?.questionsAnswered || 0;
        const newQuestions = newStats.stats?.questionsAnswered || oldQuestions;
        const questionsDelta = newQuestions - oldQuestions;

        // 3. Correct Answers Delta
        // App.jsx doesn't pass 'wins' or 'correctAnswers' explicitly in the root of newStats, 
        // it passes it inside 'stats' or in 'history'.
        // Looking at App.jsx: 
        // stats: { ...user.stats, quizzesPlayed: ..., questionsAnswered: ... }
        // history: [ { correctAnswers: ..., ... } ]
        // So we can find the latest history item to get correct answers count for THIS session?
        // Or better, let's look at what implicit data we have.

        // Actually, App.jsx calculates the new total questionsAnswered.
        // It doesn't seem to track 'total correct answers' in the user.stats object in App.jsx (only accuracy).
        // But backend User model HAS 'correctAnswers'.

        // Let's look at the history update in App.jsx to find the delta for correct answers.
        // history: [ { correctAnswers: results.correctAnswers, ... }, ... ]
        const latestHistory = newStats.history?.[0];
        const correctAnswersDelta = latestHistory?.correctAnswers || 0;

        // Construct the payload for backend
        const updatePayload = {};
        if (xpDelta > 0) updatePayload.xp = xpDelta;
        if (questionsDelta > 0) updatePayload.completedQuestions = questionsDelta;
        if (correctAnswersDelta > 0) updatePayload.correctAnswers = correctAnswersDelta;

        if (Object.keys(updatePayload).length > 0) {
          await incrementStats(updatePayload);
          console.log("Stats synced to backend:", updatePayload);
        }

      } catch (e) {
        console.error("Failed to sync stats", e);
      }
    }
  };

  // Specific function to handle the backend's specific update-stats logic
  const incrementStats = async (increments) => {
    if (!user?.id) return;
    try {
      const res = await api.put(`/user/update-stats/${user.id}`, increments);
      if (res.data?.user) {
        setUser(mapUser(res.data.user));
      }
    } catch (e) {
      console.error("Backend sync failed", e);
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      signup,
      logout,
      updateProfile,
      updateStats,
      incrementStats // Export this for components that know how to calculate deltas
    }}>
      {children}
    </AuthContext.Provider>
  );
};
