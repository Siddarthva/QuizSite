import React from 'react';

const CategoryCard = ({ category, onClick, className = '' }) => {
    const Icon = category.icon;

    return (
        <button
            onClick={onClick}
            className={`
        group relative flex flex-col items-center justify-center p-6
        bg-slate-900 rounded-3xl border border-white/5
        transition-all duration-300 ease-out
        hover:-translate-y-2 hover:shadow-lg hover:shadow-${category.shadow}/20
        ${className}
      `}
        >
            {/* Icon Container - Squircle */}
            <div className={`
        mb-4 p-4 rounded-2xl bg-slate-800 text-white
        group-hover:bg-${category.color} group-hover:text-white
        transition-colors duration-300
      `}>
                <Icon size={32} strokeWidth={1.5} />
            </div>

            {/* Label */}
            <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
                {category.name}
            </span>
        </button>
    );
};

export default CategoryCard;
