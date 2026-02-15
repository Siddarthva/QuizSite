import React from 'react';
import { cn } from '../utils';

export const Button = ({ children, variant = 'primary', size = 'md', className, icon: Icon, loading, onClick, disabled }) => {
  const variants = {
    primary: "bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/30",
    secondary: "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white",
    outline: "border-2 border-slate-200 dark:border-slate-700 hover:border-violet-500 text-slate-600 dark:text-slate-300",
    ghost: "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400",
    danger: "bg-rose-500 hover:bg-rose-600 text-white",
    success: "bg-emerald-500 hover:bg-emerald-600 text-white",
    white: "bg-white hover:bg-slate-100 text-violet-700 shadow-lg shadow-black/5"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-4 text-base font-semibold"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "relative rounded-xl font-medium transition-all active:scale-95 flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed grayscale",
        className
      )}
    >
      {loading && <span className="animate-spin mr-2">⏳</span>}
      {Icon && !loading && <Icon size={size === 'sm' ? 14 : 18} />}
      {children}
    </button>
  );
};

export default Button;