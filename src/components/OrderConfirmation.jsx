import React from 'react';
import styled from 'styled-components';
import { Check } from 'lucide-react';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 70;
`;

const ModalContainer = styled.aside`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  max-width: 320px;
  background: #E66767;
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.15);
  z-index: 80;
  display: flex;
  flex-direction: column;
  transform: translateX(${props => (props.$isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  overflow-y: auto;
  box-sizing: border-box;
`;

const SuccessContent = styled.div`
  flex: 1;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  text-align: center;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFEBD9;
  animation: scaleIn 0.5s ease-in-out;

  @keyframes scaleIn {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const Title = styled.h2`
  color: #FFEBD9;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  font-family: 'DM Sans', sans-serif;
`;

const Message = styled.p`
  color: #FFEBD9;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  font-family: 'DM Sans', sans-serif;
`;

const OrderDetails = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #FFEBD9;
  font-family: 'DM Sans', sans-serif;

  strong {
    font-weight: 600;
  }
`;

const ModalFooter = styled.div`
  padding: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background: #E66767;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 13px;
  border: 2px solid #fff;
  background: #fff;
  color: #E66767;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'DM Sans', sans-serif;

  &:hover {
    background: #FFEBD9;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const OrderConfirmation = ({ 
  isOpen, 
  onClose, 
  orderData 
}) => {
  return (
    <>
      {isOpen && <ModalOverlay onClick={onClose} />}

      <ModalContainer $isOpen={isOpen}>
        <SuccessContent>
          <IconWrapper>
            <Check size={48} strokeWidth={3} />
          </IconWrapper>

          <div>
            <Title>Pedido Realizado!</Title>
            <Message>
              Seu pedido foi confirmado com sucesso. Você receberá em breve!
            </Message>
          </div>

          {orderData && (
            <OrderDetails>
              <DetailRow>
                <span>Valor Total:</span>
                <strong>R$ {orderData.total?.toFixed(2) || '0,00'}</strong>
              </DetailRow>
              <DetailRow>
                <span>Endereço de Entrega:</span>
              </DetailRow>
              <DetailRow style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                <span style={{ fontSize: '12px', marginLeft: '8px' }}>
                  {orderData.address?.street}, {orderData.address?.number}
                </span>
                <span style={{ fontSize: '12px', marginLeft: '8px' }}>
                  {orderData.address?.city} - {orderData.address?.zipCode}
                </span>
              </DetailRow>
            </OrderDetails>
          )}
        </SuccessContent>

        <ModalFooter>
          <Button onClick={onClose}>
            Voltar ao Cardápio
          </Button>
        </ModalFooter>
      </ModalContainer>
    </>
  );
};

export default OrderConfirmation;
