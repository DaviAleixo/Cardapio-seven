import React from 'react';
import { MenuItem } from '../types/menu';

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Special styling for non-alcoholic beverages
  if (item.category === 'non-alcoholic') {
    return (
      <div className="menu-item bg-white rounded-lg overflow-hidden border border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-serif font-medium">{item.name}</h3>
          <span className="font-bold text-black">{formatPrice(item.price)}</span>
        </div>
        {item.description && (
          <p className="text-gray-600 text-sm mt-1">{item.description}</p>
        )}
      </div>
    );
  }

  // Regular card with image for other categories
  return (
    <div className="menu-item bg-white rounded-lg overflow-hidden border border-gray-200 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {item.featured && (
          <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-full">
            Destaque
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif font-bold text-lg">{item.name}</h3>
          <span className="font-bold text-black">{formatPrice(item.price)}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{item.description}</p>
      </div>
    </div>
  );
};

export default MenuCard;