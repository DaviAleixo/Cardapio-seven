import React from 'react';
import { X } from 'lucide-react';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QrCodeModal: React.FC<QrCodeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Generate QR code URL for the current page
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + window.location.href;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-serif font-bold">Acesse pelo seu celular</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex flex-col items-center justify-center p-4">
          <div className="bg-white p-2 rounded-lg mb-4 border">
            <img 
              src={qrCodeUrl} 
              alt="QR Code para acessar o cardápio" 
              className="w-48 h-48"
            />
          </div>
          <p className="text-center text-sm text-gray-500">
            Escaneie este QR code com a câmera do seu celular para acessar o cardápio digital.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QrCodeModal;