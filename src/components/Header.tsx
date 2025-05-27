import React, { useState } from 'react';
import { QrCode } from 'lucide-react';
import QrCodeModal from './QrCodeModal';

const Header: React.FC = () => {
  const [isQrCodeModalOpen, setIsQrCodeModalOpen] = useState(false);

  const showQrCode = () => {
    setIsQrCodeModalOpen(true);
  };

  return (
    <header className="bg-white text-black border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <img 
            src="/assets/logo-seven2.png" 
            alt="SEVEN"
            className="h-8"
          />
          <button 
            onClick={showQrCode}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Show QR Code"
          >
            <QrCode size={20} />
          </button>
        </div>
      </div>
      
      <div className="bg-black text-white py-16 px-4 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 animate-fadeIn">
            Cardápio Digital
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Experimente os melhores drinks e petiscos da Seven
          </p>
        </div>
      </div>

      <QrCodeModal
        isOpen={isQrCodeModalOpen}
        onClose={() => setIsQrCodeModalOpen(false)}
      />
    </header>
  );
};

export default Header;