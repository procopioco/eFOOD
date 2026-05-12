import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
  display: flex;
  justify-content: flex-end;
`;

const Modal = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 360px;
  background: #E66767;
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.15);
  z-index: 60;
  display: flex;
  flex-direction: column;
  padding: 24px;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size:16px;
  margin-bottom: 24px;
  padding-bottom: 12px;
`;

const Title = styled.h2`
  margin: 0;
  color: #FFEBD9;
  font-size: 18px;
  font-weight: bold;
  font-family: 'DM Sans', sans-serif;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #FFEBD9;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #FFEBD9;
  font-size: 14px;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid rgba(44, 44, 44, 0.12);
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  background: #FFEBD9;
  color: #2c2c2c;
  box-sizing: border-box;
  width: 100%;

  &::placeholder {
    color: rgba(44, 44, 44, 0.42);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 235, 217, 0.75);
    box-shadow: 0 0 0 2px rgba(255, 235, 217, 0.25);
  }
`;

const InlineRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
`;

/* Linha com 3 colunas para: número do cartão (flex maior) + CVV (fixo) */
const CardNumberCvvRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 16px;
`;

const SecondaryButton = styled.button`
  width: 100%;
  height: 24px;
  background: transparent;
  border: none;
  outline: none;
  color: #E66767;
  background-color: #FFEBD9;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
`;

const PrimaryButton = styled.button`
  width: 100%;
  height: 24px;
  background: transparent;
  background-color: #FFEBD9;
  border: none;
  outline: none;
  color: #E66767;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
`;

const initialAddress = {
  recipient: '',
  address: '',
  number: '',
  complement: '',
  city: '',
  cep: '',
};

const initialPayment = {
  cardNumber: '',
  cardName: '',
  expiryMonth: '',
  expiryYear: '',
  cvv: '',
};

const CheckoutModal = ({ isOpen, totalPrice, onClose, onCompletePurchase }) => {
  const [step, setStep] = useState('address');
  const [addressData, setAddressData] = useState(initialAddress);
  const [paymentData, setPaymentData] = useState(initialPayment);

  useEffect(() => {
    if (isOpen) {
      setStep('address');
      setAddressData(initialAddress);
      setPaymentData(initialPayment);
    }
  }, [isOpen]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    let { name, value } = e.target;

    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      value = value.slice(0, 19);
    }
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 3);
    }
    if (name === 'expiryMonth') {
      value = value.replace(/\D/g, '').slice(0, 2);
    }
    if (name === 'expiryYear') {
      value = value.replace(/\D/g, '').slice(0, 2);
    }
    if (name === 'cardName') {
      value = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '').toUpperCase();
    }

    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const isAddressValid =
    addressData.recipient &&
    addressData.address &&
    addressData.number &&
    addressData.city &&
    addressData.cep;

  const isPaymentValid =
    paymentData.cardNumber.replace(/\s/g, '').length === 16 &&
    paymentData.cardName.trim().length >= 3 &&
    paymentData.expiryMonth.length === 2 &&
    paymentData.expiryYear.length === 2 &&
    paymentData.cvv.length === 3;

  const handleAddressContinue = () => {
    if (isAddressValid) setStep('payment');
  };

  const handleConfirmPurchase = () => {
    const month = parseInt(paymentData.expiryMonth, 10);
    if (month < 1 || month > 12) {
      alert('Mês de validade inválido');
      return;
    }
    if (!isPaymentValid) {
      alert('Preencha os dados do cartão corretamente');
      return;
    }
    const { cvv: _cvv, ...paymentWithoutCvv } = paymentData;
    onCompletePurchase({
      delivery: addressData,
      payment: paymentWithoutCvv,
    });
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>
            {step === 'address'
              ? 'Endereço de entrega'
              : `Pagamento - Valor a pagar R$ ${typeof totalPrice === 'number' ? totalPrice.toFixed(2).replace('.', ',') : '0,00'}`}
          </Title>
        </Header>

        {step === 'address' && (
          <>
            <FormContainer>
              <FormField>
                <Label>Quem Irá Receber</Label>
                <Input
                  type="text"
                  name="recipient"
                  value={addressData.recipient}
                  onChange={handleAddressChange}
                  placeholder="Nome de quem vai receber"
                />
              </FormField>

              <FormField>
                <Label>Rua</Label>
                <Input
                  type="text"
                  name="address"
                  value={addressData.address}
                  onChange={handleAddressChange}
                  placeholder="Rua..."
                />
              </FormField>

              <InlineRow>
                <FormField>
                  <Label>CEP</Label>
                  <Input
                    type="text"
                    name="cep"
                    value={addressData.cep}
                    onChange={handleAddressChange}
                    placeholder="00000-000"
                  />
                </FormField>
                <FormField>
                  <Label>Número</Label>
                  <Input
                    type="text"
                    name="number"
                    value={addressData.number}
                    onChange={handleAddressChange}
                    placeholder="Número..."
                  />
                </FormField>
              </InlineRow>

              <FormField>
                <Label>Complemento</Label>
                <Input
                  type="text"
                  name="complement"
                  value={addressData.complement}
                  onChange={handleAddressChange}
                  placeholder="Complemento (opcional)"
                />
              </FormField>

              <FormField>
                <Label>Cidade</Label>
                <Input
                  type="text"
                  name="city"
                  value={addressData.city}
                  onChange={handleAddressChange}
                  placeholder="Cidade..."
                />
              </FormField>
            </FormContainer>

            <ButtonContainer>
              <SecondaryButton type="button" onClick={onClose}>
                Voltar
              </SecondaryButton>
              <PrimaryButton
                type="button"
                disabled={!isAddressValid}
                onClick={handleAddressContinue}
              >
                Continuar para o pagamento
              </PrimaryButton>
            </ButtonContainer>
          </>
        )}

        {step === 'payment' && (
          <>
            <FormContainer>
              {/* 1. Nome no cartão — primeiro */}
              <FormField>
                <Label>Nome no cartão</Label>
                <Input
                  type="text"
                  name="cardName"
                  placeholder="NOME COMO NO CARTÃO"
                  value={paymentData.cardName}
                  onChange={handlePaymentChange}
                />
              </FormField>

              {/* 2. Número do cartão + CVV lado a lado, sem vazar */}
              <CardNumberCvvRow>
                <FormField>
                  <Label>Número do cartão</Label>
                  <Input
                    type="text"
                    name="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    value={paymentData.cardNumber}
                    onChange={handlePaymentChange}
                    maxLength={19}
                    inputMode="numeric"
                  />
                </FormField>
                <FormField>
                  <Label>CVV</Label>
                  <Input
                    type="text"
                    name="cvv"
                    placeholder="000"
                    value={paymentData.cvv}
                    onChange={handlePaymentChange}
                    maxLength={3}
                    inputMode="numeric"
                  />
                </FormField>
              </CardNumberCvvRow>

              {/* 3. Mês + Ano lado a lado */}
              <InlineRow>
                <FormField>
                  <Label>Mês</Label>
                  <Input
                    type="text"
                    name="expiryMonth"
                    placeholder="MM"
                    value={paymentData.expiryMonth}
                    onChange={handlePaymentChange}
                    maxLength={2}
                    inputMode="numeric"
                  />
                </FormField>
                <FormField>
                  <Label>Ano</Label>
                  <Input
                    type="text"
                    name="expiryYear"
                    placeholder="AA"
                    value={paymentData.expiryYear}
                    onChange={handlePaymentChange}
                    maxLength={2}
                    inputMode="numeric"
                  />
                </FormField>
              </InlineRow>
            </FormContainer>

            <ButtonContainer>
              <SecondaryButton type="button" onClick={() => setStep('address')}>
                Voltar ao endereço
              </SecondaryButton>
              <PrimaryButton
                type="button"
                disabled={!isPaymentValid}
                onClick={handleConfirmPurchase}
              >
                Confirmar compra
              </PrimaryButton>
            </ButtonContainer>
          </>
        )}
      </Modal>
    </Overlay>
  );
};

export default CheckoutModal;
