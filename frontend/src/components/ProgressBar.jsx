import React from 'react';

export const ProgressBar = ({ current, max, color = "bg-violet-500", height = "h-2" }) => {
  const percent = Math.min(100, Math.max(0, (current / max) * 100));
  return (
    <div className={`w-full ${height} bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden`}>
      <div 
        className={`${height} ${color} transition-all duration-1000 ease-out rounded-full relative`}
        style={{ width: `${percent}%` }}
      >
        <div className="absolute top-0 right-0 bottom-0 w-full bg-gradient-to-r from-transparent to-white/20" />
      </div>
    </div>
  );
};

export default ProgressBar;
