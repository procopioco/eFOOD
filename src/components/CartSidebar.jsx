import React from 'react';
import styled from 'styled-components';
import { Trash2 } from 'lucide-react';

const SidebarOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 30;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const SidebarContainer = styled.aside`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 320px;
  background: #E66767;
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.15);
  z-index: 40;
  display: flex;
  flex-direction: column;
  transform: translateX(${props => (props.$isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
`;

const SidebarHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  h2 {
    color: #FFEBD9;
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    font-family: 'DM Sans', sans-serif;
  }
`;

const ItemsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;

    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }
`;

const EmptyMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  p {
    color: #FFEBD9;
    text-align: center;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
  }
`;

const CartItemCard = styled.div`
  background: #FDF3EC;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
  padding: 8px;
  background: #FFEBD9;
`;

const ItemContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemName = styled.h3`
  font-weight: bold;
  color: #E66767;
  font-size: 14px;
  line-height: 1.4;
  margin: 0 0 8px 0;
  font-family: 'DM Sans', sans-serif;
`;

const ItemPrice = styled.p`
  color: #E66767;
  font-size: 14px;
  font-weight: 300;
  margin: 0 0 4px 0;
  font-family: 'DM Sans', sans-serif;
`;

const ItemQuantity = styled.p`
  color: #E66767;
  font-size: 12px;
  margin: 0;
  font-family: 'DM Sans', sans-serif;
`;

const RemoveButton = styled.button`
  flex-shrink: 0;
  padding: 8px;
  background: transparent;
  border: none;
  color: #E66767;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(230, 103, 103, 0.1);
  }

  &:active {
    background: rgba(230, 103, 103, 0.2);
  }
`;

const SidebarFooter = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 24px;
  background: #E66767;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span:first-child {
    color: #FFEBD9;
    font-weight: 600;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
  }

  span:last-child {
    color: #FFEBD9;
    font-weight: bold;
    font-size: 18px;
    font-family: 'DM Sans', sans-serif;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  border: 2px solid ${props => (props.$disabled ? 'rgba(255, 255, 255, 0.3)' : '#fff')};
  background: transparent;
  color: ${props => (props.$disabled ? 'rgba(255, 255, 255, 0.3)' : '#fff')};
  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  font-family: 'DM Sans', sans-serif;

  &:hover:not(:disabled) {
    background: #fff;
    color: #E8564A;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

export const CartSidebar = ({
  items,
  onRemoveItem,
  onCheckout,
  isOpen,
  onClose,
}) => {
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {isOpen && <SidebarOverlay onClick={onClose} />}

      <SidebarContainer $isOpen={isOpen}>
        <SidebarHeader>
          <h2>Carrinho</h2>
        </SidebarHeader>

        <ItemsList>
          {items.length === 0 ? (
            <EmptyMessage>
              <p>Seu carrinho está vazio</p>
            </EmptyMessage>
          ) : (
            items.map((item) => (
              <CartItemCard key={item.id}>
                <ItemImage src={item.image} alt={item.name} />

                <ItemContent>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>R$ {(item.price * item.quantity).toFixed(2)}</ItemPrice>
                  <ItemQuantity>Qtd: {item.quantity}</ItemQuantity>
                </ItemContent>

                <RemoveButton
                  onClick={() => onRemoveItem(item.id)}
                  aria-label={`Remover ${item.name} do carrinho`}
                >
                  <Trash2 size={18} />
                </RemoveButton>
              </CartItemCard>
            ))
          )}
        </ItemsList>

        <SidebarFooter>
          <TotalContainer>
            <span>Valor total:</span>
            <span>R$ {totalPrice.toFixed(2)}</span>
          </TotalContainer>

          <CheckoutButton
            onClick={onCheckout}
            $disabled={items.length === 0}
            disabled={items.length === 0}
          >
            Continuar com a entrega
          </CheckoutButton>
        </SidebarFooter>
      </SidebarContainer>
    </>
  );
};

export default CartSidebar;
