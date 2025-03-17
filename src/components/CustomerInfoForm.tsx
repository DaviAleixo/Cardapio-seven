import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface CustomerInfoFormProps {
  onSubmit: () => void;
}

const CustomerInfoForm: React.FC<CustomerInfoFormProps> = ({ onSubmit }) => {
  const { customerInfo, updateCustomerInfo } = useCart();
  const [errors, setErrors] = useState({
    name: '',
    tableNumber: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateCustomerInfo({
      ...customerInfo,
      [name]: value
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      tableNumber: ''
    };

    if (!customerInfo.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      valid = false;
    }

    if (!customerInfo.tableNumber.trim()) {
      newErrors.tableNumber = 'Número da mesa é obrigatório';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit();
    }
  };

  return (
    <div className="mb-6 border border-gray-200 rounded-md p-4">
      <h3 className="text-lg font-medium mb-4">Informações do Cliente</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nome <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={customerInfo.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md text-black ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Seu nome"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="tableNumber" className="block text-sm font-medium mb-1">
            Número da Mesa <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="tableNumber"
            name="tableNumber"
            value={customerInfo.tableNumber}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md text-black ${errors.tableNumber ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Ex: 10"
          />
          {errors.tableNumber && <p className="text-red-500 text-xs mt-1">{errors.tableNumber}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="observation" className="block text-sm font-medium mb-1">
            Observação
          </label>
          <textarea
            id="observation"
            name="observation"
            value={customerInfo.observation || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
            placeholder="Ex: Sem cebola, ponto da carne, etc."
            rows={3}
          />
        </div>
      </form>
    </div>
  );
};

export default CustomerInfoForm;