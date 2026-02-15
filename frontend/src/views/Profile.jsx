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
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <User className="text-violet-500" /> Your Profile
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your account settings and preferences</p>
        </div>
        <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="border-white/10 hover:bg-white/5 hover:border-violet-500">
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Stats Card */}
        <Card className="lg:col-span-1 bg-slate-900/50 border-white/5 backdrop-blur-md overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="flex flex-col items-center text-center p-8 relative z-10">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-amber-500 mb-6 shadow-2xl">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
                  {user.name.charAt(0)}
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-bold uppercase tracking-wider mb-6">
              Level {user.level} Scholar
            </div>

            <div className="grid grid-cols-2 gap-4 w-full pt-6 border-t border-white/5">
              <div className="p-3 rounded-2xl bg-slate-800/50">
                <div className="text-2xl font-black text-violet-400">{user.xp.toLocaleString()}</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Total XP</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Edit Profile Form */}
        <Card className="lg:col-span-2 bg-slate-900/50 border-white/5 backdrop-blur-md">
          <div className="p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-violet-500 rounded-full" />
              Account Details
            </h3>

            {message.text && (
              <div className={`p-4 mb-6 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-500 transition-colors" size={18} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-950/50 text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-500 transition-colors" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-950/50 text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end pt-4 border-t border-white/5">
                  <Button type="submit" variant="primary" disabled={isLoading} className="shadow-lg shadow-violet-500/20">
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
        <Card className="p-6 bg-slate-900/50 border-white/5 backdrop-blur-md group hover:border-violet-500/30 transition-colors">
          <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-2">Quizzes Played</h4>
          <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 group-hover:scale-105 transition-transform origin-left">
            {user.stats.quizzesPlayed}
          </p>
        </Card>
        <Card className="p-6 bg-slate-900/50 border-white/5 backdrop-blur-md group hover:border-blue-500/30 transition-colors">
          <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-2">Questions Answered</h4>
          <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:scale-105 transition-transform origin-left">
            {user.stats.questionsAnswered}
          </p>
        </Card>
        <Card className="p-6 bg-slate-900/50 border-white/5 backdrop-blur-md group hover:border-emerald-500/30 transition-colors">
          <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-2">Accuracy</h4>
          <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:scale-105 transition-transform origin-left">
            {user.stats.accuracy}%
          </p>
        </Card>
      </div>
    </div>
  );
}
