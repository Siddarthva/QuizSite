import React from 'react';
import { cn } from '../utils';

export const Card = ({ children, className, hover = false }) => (
  <div className={cn(
    "bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-100 dark:border-slate-700/50 overflow-hidden shadow-sm transition-all duration-300",
    hover && "hover:shadow-xl hover:-translate-y-1 hover:border-violet-200 dark:hover:border-violet-500/30",
    className
  )}>
    {children}
  </div>
);

export default Card;
