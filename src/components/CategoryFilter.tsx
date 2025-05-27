import React from 'react';
import { Utensils, Beer, Wine, Coffee, Trophy } from 'lucide-react';
import { CategoryInfo } from '../types/menu';

interface CategoryFilterProps {
  categories: CategoryInfo[];
  activeCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  activeCategory, 
  onSelectCategory 
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'utensils':
        return <Utensils size={20} />;
      case 'beer':
        return <Beer size={20} />;
      case 'wine':
        return <Wine size={20} />;
      case 'coffee':
        return <Coffee size={20} />;
      case 'trophy':
        return <Trophy size={20} />;
      default:
        return <Utensils size={20} />;
    }
  };

  return (
    <nav className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto py-4">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`transition-all duration-200 px-4 py-2 rounded-full flex items-center gap-2 font-medium ${
                  activeCategory === category.id
                    ? 'bg-black text-white shadow-lg transform -translate-y-0.5'
                    : 'bg-white hover:bg-gray-100 text-gray-700 hover:text-black border'
                }`}
              >
                {getIcon(category.icon)}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CategoryFilter;