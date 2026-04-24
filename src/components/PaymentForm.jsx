import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowLeft } from 'lucide-react';

const FormOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 30;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const FormContainer = styled.aside`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  max-width: 320px;
  background: #E66767;
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.15);
  z-index: 40;
  display: flex;
  flex-direction: column;
  transform: translateX(${props => (props.$isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  overflow-y: auto;
  box-sizing: border-box;
`;

const FormHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;

  button {
    background: none;
    border: none;
    color: #FFEBD9;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      opacity: 0.8;
    }
  }

  h2 {
    color: #FFEBD9;
    font-size: 18px;
    font-weight: bold;
    margin: 0;
    font-family: 'DM Sans', sans-serif;
  }
`;

const FormContent = styled.div`
  flex: 1;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  color: #FFEBD9;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  font-family: 'DM Sans', sans-serif;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  background: #FDF3EC;
  color: #E66767;
  box-sizing: border-box;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 235, 217, 0.3);
  }

  &::placeholder {
    color: rgba(230, 103, 103, 0.5);
  }
`;

const RowGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const FormFooter = styled.div`
  padding: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #E66767;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 13px;
  border: 2px solid ${props => (props.$secondary ? 'rgba(255, 255, 255, 0.3)' : '#fff')};
  background: ${props => (props.$secondary ? 'transparent' : '#fff')};
  color: ${props => (props.$secondary ? '#FFEBD9' : '#E66767')};
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'DM Sans', sans-serif;

  &:hover {
    ${props => (props.$secondary ? 'opacity: 0.8;' : 'background: #FFEBD9; color: #E66767;')}
  }

  &:active {
    transform: scale(0.98);
  }
`;

const PaymentForm = ({ isOpen, onClose, onComplete, cartTotal }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Formatar número do cartão
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      value = value.slice(0, 19); // Limitar a 16 dígitos + espaços
    }

    // Apenas números para CVV
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 3);
    }

    // Limitar mês a 2 dígitos
    if (name === 'expiryMonth') {
      value = value.replace(/\D/g, '').slice(0, 2);
    }

    // Limitar ano a 2 dígitos
    if (name === 'expiryYear') {
      value = value.replace(/\D/g, '').slice(0, 2);
    }

    // Apenas letras para nome
    if (name === 'cardName') {
      value = value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validações
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
      alert('Número do cartão inválido');
      return;
    }

    if (!formData.cardName || formData.cardName.trim().length < 3) {
      alert('Nome do titular inválido');
      return;
    }

    if (!formData.expiryMonth || !formData.expiryYear) {
      alert('Data de expiração incompleta');
      return;
    }

    if (!formData.cvv || formData.cvv.length !== 3) {
      alert('CVV inválido');
      return;
    }

    onComplete(formData);
  };

  return (
    <>
      {isOpen && <FormOverlay onClick={onClose} />}

      <FormContainer $isOpen={isOpen}>
        <FormHeader>
          <button onClick={onClose}>
            <ArrowLeft size={20} />
          </button>
          <h2>Pagamento</h2>
        </FormHeader>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <FormContent>
            <FormGroup>
              <Label>Número do Cartão</Label>
              <Input
                type="text"
                name="cardNumber"
                placeholder="0000 0000 0000 0000"
                value={formData.cardNumber}
                onChange={handleChange}
                maxLength="19"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Nome do Titular</Label>
              <Input
                type="text"
                name="cardName"
                placeholder="JOÃO DA SILVA"
                value={formData.cardName}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <RowGroup>
              <FormGroup>
                <Label>Mês</Label>
                <Input
                  type="text"
                  name="expiryMonth"
                  placeholder="MM"
                  value={formData.expiryMonth}
                  onChange={handleChange}
                  maxLength="2"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Ano</Label>
                <Input
                  type="text"
                  name="expiryYear"
                  placeholder="AA"
                  value={formData.expiryYear}
                  onChange={handleChange}
                  maxLength="2"
                  required
                />
              </FormGroup>
            </RowGroup>

            <FormGroup>
              <Label>CVV</Label>
              <Input
                type="text"
                name="cvv"
                placeholder="000"
                value={formData.cvv}
                onChange={handleChange}
                maxLength="3"
                required
              />
            </FormGroup>
          </FormContent>

          <FormFooter>
            <Button type="submit">
              Confirmar Pagamento
            </Button>
            <Button $secondary type="button" onClick={onClose}>
              Voltar
            </Button>
          </FormFooter>
        </form>
      </FormContainer>
    </>
  );
};

export default PaymentForm;
