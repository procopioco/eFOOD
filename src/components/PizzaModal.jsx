// PizzaModal.jsx - Componente Modal
import React from 'react';
import { Overlay, Modal, Close, ModalImage, ModalContent, ModalButton } from '../styles/styles';

const PizzaModal = ({ pizza, onClose, onAddToCart }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Close onClick={onClose}>&times;</Close>
        <ModalImage src={pizza.image} alt={pizza.name} />
        <ModalContent>
          <h2>{pizza.name}</h2>
          <p>{pizza.description}</p>
          <p>R$ {pizza.price.toFixed(2)}</p>
          <ModalButton
            onClick={() => {
              onAddToCart(pizza);
              onClose();
            }}
          >
            Adicionar ao carrinho
          </ModalButton>
        </ModalContent>
      </Modal>
    </Overlay>
  );
};

export default PizzaModal;