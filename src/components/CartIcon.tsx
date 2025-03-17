import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartIconProps {
  onClick: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ onClick }) => {
  const { getCartCount } = useCart();
  const itemCount = getCartCount();

  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full hover:bg-secondary transition-colors relative"
      aria-label="Open cart"
    >
      <ShoppingCart size={20} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 flex items-center justify-center rounded-full animate-fadeIn">
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;