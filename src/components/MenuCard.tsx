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
          
          <span className="font-bold text-black">
            {formatPrice(item.price)}
          </span>
        </div>
        {item.description && (
          <p className="text-gray-600 text-sm mt-1">{item.description}</p>
        )}
      </div>
    );
  }

  // Special styling for drinks
  const isDrink = item.category === 'drinks';

  return (
    <div className="menu-item bg-white rounded-lg overflow-hidden border border-gray-200 h-full flex flex-col">
      <div className={`relative ${isDrink ? 'p-4' : ''}`}>
        <div className={`${isDrink ? 'aspect-square rounded-full overflow-hidden' : 'h-48 overflow-hidden'}`}>
          <img
            src={item.image?.startsWith('http') ? item.image : item.image}
            alt={item.name}
            className={`w-full h-full ${isDrink ? 'object-cover rounded-full' : 'object-cover'} transition-transform duration-500 hover:scale-110`}
            loading="lazy"
          />
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow bg-white">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-serif font-bold text-lg">{item.name}</h3>
          <span className="font-bold text-black whitespace-nowrap">
            {formatPrice(item.price)}
          </span>
        </div>
        <p className="text-gray-600 text-sm mt-2">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default MenuCard;