import React, { useState } from 'react';
import { User, Mail, Save, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await updateProfile(formData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Your Profile</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your account settings and preferences</p>
        </div>
        <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Stats Card */}
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
              {user.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
            <p className="text-slate-500 dark:text-slate-400">Level {user.level} Scholar</p>

            <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">{user.xp}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Total XP</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-500">{user.coins}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Coins</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Edit Profile Form */}
        <Card className="lg:col-span-2">
          <div className="p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Account Details</h3>

            {message.text && (
              <div className={`p-4 mb-6 rounded-xl ${message.type === 'success' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end pt-4">
                  <Button type="submit" variant="primary" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Save className="mr-2" size={18} />}
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quizzes Played</h4>
          <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">{user.stats.quizzesPlayed}</p>
        </Card>
        <Card className="p-6">
          <h4 className="font-bold text-slate-900 dark:text-white mb-2">Questions Answered</h4>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{user.stats.questionsAnswered}</p>
        </Card>
        <Card className="p-6">
          <h4 className="font-bold text-slate-900 dark:text-white mb-2">Accuracy</h4>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{user.stats.accuracy}%</p>
        </Card>
      </div>
    </div>
  );
}
