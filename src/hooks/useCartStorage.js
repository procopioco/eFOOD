import { useState, useEffect } from 'react';

export const useCartStorage = () => {
  const [cartItems, setCartItems] = useState(() => {
    // Restaurar do localStorage ao inicializar
    try {
      const saved = localStorage.getItem('efood_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Erro ao restaurar carrinho:', error);
      return [];
    }
  });

  // Salvar no localStorage sempre que o carrinho muda
  useEffect(() => {
    localStorage.setItem('efood_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return [cartItems, setCartItems];
};
