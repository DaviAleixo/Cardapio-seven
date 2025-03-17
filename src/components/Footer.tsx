import React from 'react';
import { MapPin, Phone, Clock, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5531998058308', '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://instagram.com/sevenbeercl', '_blank');
  };

  return (
    <footer className="bg-gray-100 mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">SEVEN</h3>
            <p className="text-gray-600 text-sm">
              O melhor bar da cidade com ambiente descontraído, drinks exclusivos e petiscos deliciosos.
            </p>
          </div>
          
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Informações</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-black" />
                <span>Rua Alex Milagre, 17 - Ouro Verde, Conselheiro Lafaiete</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone size={16} className="text-black" />
                <span>(31) 99805-8308</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-black" />
                <span>Qua-Sáb: 19h às 02h • Dom: 16h às 00h</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Redes Sociais</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleInstagramClick}
                className="flex items-center gap-1 px-3 py-1 rounded-full border text-sm hover:bg-black hover:text-white transition-colors"
              >
                <Instagram size={14} />
                <span>@sevenbeercl</span>
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center gap-1 px-3 py-1 rounded-full border text-sm hover:bg-black hover:text-white transition-colors"
              >
                <Phone size={14} />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} SEVEN. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;