import React from 'react';
import { cn } from '../utils';

export const Card = ({ children, className, hover = false }) => (
  <div className={cn(
    "bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm transition-all duration-300",
    hover && "hover:shadow-xl hover:-translate-y-1 hover:border-violet-500/50 dark:hover:border-violet-400/50",
    className
  )}>
    {children}
  </div>
);

export default Card;
