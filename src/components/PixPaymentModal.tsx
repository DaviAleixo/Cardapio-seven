import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';

interface PixPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onConfirmPayment: () => void;
}

const PixPaymentModal: React.FC<PixPaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  onConfirmPayment,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Real Pix key
  const pixKey = 'davialeixo_nogueira@outlook.com';

  // Generate QR code with Google Charts API - fixed URL encoding
  const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chs=250x250&chld=L|0&chl=${encodeURIComponent(
    `pix:${pixKey}?amount=${amount.toFixed(
      2
    )}&name=SEVEN%20BAR&city=Belo%20Horizonte`
  )}`;

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleCopyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmAndClose = () => {
    onConfirmPayment();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-serif font-bold">Pagamento via Pix</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center p-4">
          <p className="text-center mb-4">
            Copie a chave Pix para realizar o pagamento de{' '}
            <strong>{formatPrice(amount)}</strong>
          </p>

          <div className="w-full mb-4">
            <p className="text-sm text-gray-500 mb-1">Chave Pix:</p>
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-l-md flex-grow overflow-x-auto whitespace-nowrap">
                <code>{pixKey}</code>
              </div>
              <button
                onClick={handleCopyPixKey}
                className="bg-black hover:bg-gray-800 text-white p-2 rounded-r-md"
                aria-label="Copy Pix key"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>

          <div className="w-full space-y-4">
            <p className="text-center text-sm text-gray-500">
              Após o pagamento, envie o comprovante pelo WhatsApp (31)
              98260-7426 </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-yellow-800 font-medium">ATENÇÃO!</p>
              <p className="text-yellow-700">
                É <strong>CRUCIAL</strong> clicar no botão "Confirmar Pagamento" abaixo para finalizar seu pedido. 
                Sem esta confirmação, seu pedido <strong>NÃO</strong> será processado.
              </p>
            </div>

            <button
              onClick={handleConfirmAndClose}
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium animate-pulse"
            >
              Confirmar Pagamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixPaymentModal;