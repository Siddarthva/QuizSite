import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Brain, User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import axios from 'axios';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
        const response = await axios.post(
            "http://localhost:5000/user/signup",
            {
                username: name,   
                email: email,
                password: password
            },
            {
               // withCredentials: true 
            }
        );

        console.log(response.data);
        navigate('/');

    } catch (err) {
        setError(
            err.response?.data?.message || 
            err.message || 
            "Failed to sign up"
        );
    } finally {
        setIsLoading(false);
    }
};

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-xl mb-4 text-violet-600 dark:text-violet-400">
                            <Brain size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create Account</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">Join thousands of learners today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-900/50">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full py-2.5 justify-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <><Loader2 className="animate-spin mr-2" size={18} /> Creating account...</>
                            ) : (
                                <>Get Started <ArrowRight className="ml-2" size={18} /></>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                        Already have an account?{' '}
                        <Link to="/signin" className="text-violet-600 dark:text-violet-400 font-medium hover:underline">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
