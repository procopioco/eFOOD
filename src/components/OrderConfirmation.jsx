import React from 'react';
import styled from 'styled-components';

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
  max-width: 360px;
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

const Header = styled.div`
  padding: 24px 12px;
`;

const HeaderTitle = styled.h2`
  color: #FFEBD9;
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  font-family: 'DM Sans', sans-serif;
`;

const SuccessContent = styled.div`
  padding: 0 12px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Message = styled.p`
  color: #FFEBD9;
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  opacity: 0.95;
`;

const SummaryBox = styled.div`
  background: rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  padding: 14px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SummaryRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SummaryLabel = styled.span`
  color: #FFEBD9;
  font-size: 12px;
  font-weight: 600;
  opacity: 0.85;
  font-family: 'DM Sans', sans-serif;
`;

const SummaryValue = styled.span`
  color: #FFEBD9;
  font-size: 14px;
  line-height: 1.45;
  font-family: 'DM Sans', sans-serif;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  background: #FFEBD9;
  border: none;
  outline: none;
  color: #E66767;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`;

function formatMoney(value) {
  if (value == null || Number.isNaN(Number(value))) return null;
  return `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
}

function resolveOrderId(data) {
  if (!data || typeof data !== 'object') return null;
  return (
    data.orderId ??
    data.order_id ??
    data.id ??
    data.pedidoId ??
    (data.order && (data.order.id ?? data.order.orderId)) ??
    null
  );
}

function OrderConfirmation({ isOpen, onClose, orderData }) {
  const orderId = resolveOrderId(orderData);
  const receiver =
    orderData?.delivery?.receiver ??
    orderData?.receiver ??
    orderData?.nomeRecebedor ??
    null;
  const addr = orderData?.delivery?.address ?? orderData?.address ?? null;
  const addressLine =
    addr &&
    [addr.description, addr.number, addr.complement, addr.city, addr.zipCode]
      .filter(Boolean)
      .join(', ');
  const totalFormatted = formatMoney(
    orderData?.total ?? orderData?.totalPrice ?? orderData?.valor
  );

  return (
    <>
      {isOpen && <ModalOverlay onClick={onClose} />}

      <ModalContainer $isOpen={isOpen}>
        <Header>
          <HeaderTitle>
            Pedido realizado{orderId != null && orderId !== '' ? ` — ${orderId}` : ''}
          </HeaderTitle>
        </Header>

        <SuccessContent>
          {(receiver || addressLine || totalFormatted) && (
            <SummaryBox>
              {receiver && (
                <SummaryRow>
                  <SummaryLabel>Recebedor</SummaryLabel>
                  <SummaryValue>{receiver}</SummaryValue>
                </SummaryRow>
              )}
              {addressLine && (
                <SummaryRow>
                  <SummaryLabel>Entrega</SummaryLabel>
                  <SummaryValue>{addressLine}</SummaryValue>
                </SummaryRow>
              )}
              {totalFormatted && (
                <SummaryRow>
                  <SummaryLabel>Total</SummaryLabel>
                  <SummaryValue>{totalFormatted}</SummaryValue>
                </SummaryRow>
              )}
            </SummaryBox>
          )}

          <Message>
            Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue no endereço fornecido.
          </Message>
          <Message>
            Gostaríamos de ressaltar que nossos entregadores não estão autorizados a realizar cobranças extras.
          </Message>
          <Message>
            Lembre-se da importância de higienizar as mãos após o recebimento do pedido, garantindo assim sua segurança e bem-estar durante a refeição.
          </Message>
          <Message>
            Esperamos que desfrute de uma deliciosa e agradável experiência gastronômica. Bom apetite!
          </Message>

          <Button type="button" onClick={onClose}>
            Concluir
          </Button>
        </SuccessContent>
      </ModalContainer>
    </>
  );
}

export default OrderConfirmation;
