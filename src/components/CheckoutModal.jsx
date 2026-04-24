import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowLeft } from 'lucide-react';

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
  width: 320px;
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
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 235, 217, 0.25);
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #FFEBD9;

  &:hover {
    opacity: 0.7;
  }
`;

const Title = styled.h2`
  margin: 0;
  color: #FFEBD9;
  font-size: 18px;
  font-weight: bold;
  font-family: 'DM Sans', sans-serif;
`;

const FormContainer = styled.div`
  flex: 1;
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
  border-radius: 8px;
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  background: #FFEBD9;
  color: #2c2c2c;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(44, 44, 44, 0.42);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 235, 217, 0.75);
    box-shadow: 0 0 0 2px rgba(255, 235, 217, 0.25);
  }
`;

const RowGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TotalHint = styled.p`
  margin: 0;
  font-size: 14px;
  color: #FFEBD9;
  font-family: 'DM Sans', sans-serif;
  opacity: 0.95;

  strong {
    font-weight: 700;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
  padding-top: 16px;
`;

const SecondaryButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(255, 235, 217, 0.45);
  background: transparent;
  color: #FFEBD9;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 235, 217, 0.12);
  }
`;

const PrimaryButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 235, 217, 0.12);
  color: #FFEBD9;
  border: 2px solid #FFEBD9;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 235, 217, 0.22);
  }

  &:disabled {
    border-color: rgba(255, 235, 217, 0.25);
    color: rgba(255, 235, 217, 0.4);
    background: transparent;
    cursor: not-allowed;
  }
`;

const initialAddress = {
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

  const handleHeaderBack = () => {
    if (step === 'payment') setStep('address');
    else onClose();
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <BackButton type="button" onClick={handleHeaderBack}>
            <ArrowLeft size={20} />
          </BackButton>
          <Title>
            {step === 'address' ? 'Endereço de entrega' : 'Pagamento'}
          </Title>
        </Header>

        {step === 'address' && (
          <>
            <FormContainer>
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

              <div style={{ marginTop: 'auto', minHeight: '20px' }} />
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
              <TotalHint>
                Total do pedido:{' '}
                <strong>
                  R${' '}
                  {typeof totalPrice === 'number'
                    ? totalPrice.toFixed(2).replace('.', ',')
                    : '0,00'}
                </strong>
              </TotalHint>

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
                <Label>Nome no cartão</Label>
                <Input
                  type="text"
                  name="cardName"
                  placeholder="NOME COMO NO CARTÃO"
                  value={paymentData.cardName}
                  onChange={handlePaymentChange}
                />
              </FormField>

              <RowGroup>
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
              </RowGroup>

              <div style={{ marginTop: 'auto', minHeight: '12px' }} />
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
