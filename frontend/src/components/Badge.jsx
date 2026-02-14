import React from 'react';
import { cn } from '../utils';

export const Badge = ({ icon, label, locked }) => (
  <div className={cn(
    "flex flex-col items-center p-3 rounded-2xl border transition-all",
    locked 
      ? "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-60 grayscale" 
      : "bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-slate-800 dark:to-slate-800 border-violet-200 dark:border-violet-900 shadow-sm"
  )}>
    <div className="text-3xl mb-2 filter drop-shadow-sm">{icon}</div>
    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 text-center leading-tight">{label}</span>
  </div>
);

export default Badge;
