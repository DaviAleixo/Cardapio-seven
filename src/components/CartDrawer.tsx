import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, MessageSquare, QrCode } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CustomerInfoForm from './CustomerInfoForm';
import PixPaymentModal from './PixPaymentModal';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, customerInfo, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [isPixModalOpen, setIsPixModalOpen] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  
  // WhatsApp number
  const whatsappNumber = "31982607426";

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleIncrement = (itemId: string, currentQuantity: number) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  const handleDecrement = (itemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    } else {
      removeFromCart(itemId);
    }
  };

  const handleRemove = (itemId: string) => {
    removeFromCart(itemId);
  };

  const validateCustomerInfo = () => {
    return customerInfo.name.trim() !== '' && customerInfo.tableNumber.trim() !== '';
  };

  const handlePayWithPix = () => {
    if (!validateCustomerInfo()) {
      alert("Por favor, preencha seu nome e número da mesa antes de continuar.");
      return;
    }
    setIsPixModalOpen(true);
  };

  const handleConfirmPayment = () => {
    setPaymentCompleted(true);
    sendWhatsAppMessage(true);
  };

  const handleSendToWhatsApp = () => {
    if (!validateCustomerInfo()) {
      alert("Por favor, preencha seu nome e número da mesa antes de continuar.");
      return;
    }
    sendWhatsAppMessage(false);
  };

  const sendWhatsAppMessage = (isPaid: boolean) => {
    const total = getCartTotal();
    
    // Create the message with order details
    let message = "🍽️ *NOVO PEDIDO - BAR SEVEN* 🍽️\n\n";
    
    // Add customer info
    message += `*Cliente:* ${customerInfo.name}\n`;
    message += `*Mesa:* ${customerInfo.tableNumber}\n`;
    
    // Add observation if provided
    if (customerInfo.observation && customerInfo.observation.trim() !== '') {
      message += `*Observação:* ${customerInfo.observation}\n`;
    }
    
    message += "\n*ITENS DO PEDIDO:*\n";
    
    cart.forEach((cartItem, index) => {
      message += `${index + 1}. ${cartItem.item.name} x${cartItem.quantity} - ${formatPrice(cartItem.item.price * cartItem.quantity)}\n`;
    });
    
    message += "\n*TOTAL:* " + formatPrice(total);
    
    if (isPaid) {
      message += "\n\n✅ *PAGAMENTO REALIZADO VIA PIX*";
      message += "\n(Comprovante será enviado em seguida)";
    } else {
      message += "\n\n💵 *PAGAMENTO SERÁ REALIZADO NO LOCAL*";
    }
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  const closePixModal = () => {
    setIsPixModalOpen(false);
  };

  if (!isOpen) return null;

  const total = getCartTotal();

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose}></div>
      <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 overflow-y-auto animate-slideInRight">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-serif font-bold">Seu Carrinho</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-4">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Seu carrinho está vazio</p>
            </div>
          ) : (
            <>
              <CustomerInfoForm onSubmit={() => {}} />
              
              <ul className="divide-y divide-gray-200">
                {cart.map((cartItem) => (
                  <li key={cartItem.item.id} className="py-4 flex gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{cartItem.item.name}</h3>
                      <p className="text-black font-bold">
                        {formatPrice(cartItem.item.price)}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleDecrement(cartItem.item.id, cartItem.quantity)}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-2">{cartItem.quantity}</span>
                        <button
                          onClick={() => handleIncrement(cartItem.item.id, cartItem.quantity)}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => handleRemove(cartItem.item.id)}
                          className="ml-auto p-1 rounded-full hover:bg-gray-100 transition-colors text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total</span>
                  <span className="text-xl font-bold">{formatPrice(total)}</span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handlePayWithPix}
                    className="w-full py-3 px-4 bg-black hover:bg-gray-800 text-white rounded-md font-medium flex items-center justify-center gap-2"
                  >
                    <QrCode size={20} />
                    <span>Pagar com Pix</span>
                  </button>
                  
                  <button
                    onClick={handleSendToWhatsApp}
                    className="w-full py-3 px-4 border border-black text-black hover:bg-gray-100 rounded-md font-medium flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={20} />
                    <span>Finalizar Pedido (Pagar no Local)</span>
                  </button>
                  
                  <button
                    onClick={clearCart}
                    className="w-full py-2 px-4 border border-gray-200 hover:bg-gray-100 rounded-md font-medium"
                  >
                    Limpar Carrinho
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <PixPaymentModal
        isOpen={isPixModalOpen}
        onClose={closePixModal}
        amount={total}
        onConfirmPayment={handleConfirmPayment}
      />
    </>
  );
};

export default CartDrawer;