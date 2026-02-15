import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import CategoryCard from '../components/CategoryCard';
import { CATEGORIES } from '../data';

const Categories = () => {
    const navigate = useNavigate();

    return (
        <div className="animate-fade-in space-y-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" className="p-2" onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold font-heading">All Categories</h2>
                    <p className="text-slate-500">Explore our full collection of quizzes</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-8">
                {CATEGORIES.map((cat) => (
                    <CategoryCard
                        key={cat.id}
                        category={cat}
                        onClick={() => navigate('/explore', { state: { category: cat.name } })}
                        className="h-48" // Make them slightly taller for the full page grid
                    />
                ))}
            </div>
        </div>
    );
};

export default Categories;
