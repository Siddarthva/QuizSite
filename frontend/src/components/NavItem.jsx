import React from 'react';
import { cn } from '../utils';

export const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
      active 
        ? "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-300" 
        : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
    )}
  >
    <Icon size={20} className={active ? "fill-current" : ""} />
    {label}
  </button>
);

export const MobileNavItem = ({ icon: Icon, active, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
      "p-3 rounded-xl transition-all",
      active ? "text-violet-500" : "text-slate-400"
    )}
  >
    <Icon size={24} className={active ? "fill-current" : ""} />
  </button>
);

export default NavItem;
