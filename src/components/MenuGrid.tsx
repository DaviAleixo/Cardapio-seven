import React from 'react';
import MenuCard from './MenuCard';
import SubcategoryHeading from './SubcategoryHeading';
import { MenuItem, SubcategoryInfo } from '../types/menu';

interface MenuGridProps {
  items: MenuItem[];
  subcategories: SubcategoryInfo[];
  activeCategory: string | null;
}

const MenuGrid: React.FC<MenuGridProps> = ({ items, subcategories, activeCategory }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Nenhum item encontrado nesta categoria.</p>
      </div>
    );
  }

  // Simple list layout for categories other than food and drinks
  if (activeCategory && !['food', 'drinks'].includes(activeCategory)) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="menu-item bg-white rounded-lg overflow-hidden border border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif font-medium">{item.name}</h3>
              <span className="font-bold text-black">
                {item.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </div>
            {item.description && (
              <p className="text-gray-600 text-sm mt-1">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    );
  }

  // If no active category, show all items in appropriate layout
  if (!activeCategory) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    );
  }

  // Filter subcategories for the active category
  const relevantSubcategories = subcategories.filter(
    (subcategory) => subcategory.categoryId === activeCategory
  );

  return (
    <div>
      {relevantSubcategories.map((subcategory) => {
        const subcategoryItems = items.filter(
          (item) => item.subcategory === subcategory.id
        );

        if (subcategoryItems.length === 0) return null;

        return (
          <div key={subcategory.id}>
            <SubcategoryHeading title={subcategory.name} />
            <div className={`grid grid-cols-1 ${
              ['food', 'drinks'].includes(activeCategory)
                ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'md:grid-cols-2 lg:grid-cols-3 gap-4'
            } mb-10`}>
              {subcategoryItems.map((item) => (
                ['food', 'drinks'].includes(activeCategory) ? (
                  <MenuCard key={item.id} item={item} />
                ) : (
                  <div key={item.id} className="menu-item bg-white rounded-lg overflow-hidden border border-gray-200 p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-serif font-medium">{item.name}</h3>
                      <span className="font-bold text-black">
                        {item.price.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuGrid;