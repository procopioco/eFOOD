import React, { useState } from 'react';
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
  background: #FDF3EC;
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #E66767;
  
  &:hover {
    opacity: 0.7;
  }
`;

const Title = styled.h2`
  margin: 0;
  color: #E66767;
  font-size: 18px;
  font-weight: bold;
  font-family: 'DM Sans', sans-serif;
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #E66767;
  font-size: 14px;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #E66767;
  border-radius: 8px;
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  
  &:focus {
    outline: none;
    border-color: #C0392B;
    box-shadow: 0 0 0 2px rgba(230, 103, 103, 0.1);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
  pt: 16px;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #E66767;
  background: transparent;
  color: #E66767;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(230, 103, 103, 0.1);
  }
`;

const ContinueButton = styled.button`
  flex: 1;
  padding: 12px 16px;
  background: #E66767;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.2s ease;

  &:hover {
    background: #C0392B;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const CheckoutModal = ({ isOpen, totalPrice, onClose, onContinue }) => {
  const [formData, setFormData] = useState({
    address: '',
    number: '',
    complement: '',
    city: '',
    cep: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = formData.address && formData.number && formData.city && formData.cep;

  const handleContinue = () => {
    if (isFormValid) {
      onContinue(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <BackButton onClick={onClose}>
            <ArrowLeft size={20} />
          </BackButton>
          <Title>Endereço de entrega</Title>
        </Header>

        <FormContainer>
          <FormField>
            <Label>Rua</Label>
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Rua..."
            />
          </FormField>

          <FormField>
            <Label>Número</Label>
            <Input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Número..."
            />
          </FormField>

          <FormField>
            <Label>Complemento</Label>
            <Input
              type="text"
              name="complement"
              value={formData.complement}
              onChange={handleChange}
              placeholder="Complemento (opcional)"
            />
          </FormField>

          <FormField>
            <Label>Cidade</Label>
            <Input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Cidade..."
            />
          </FormField>

          <FormField>
            <Label>CEP</Label>
            <Input
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              placeholder="00000-000"
            />
          </FormField>

          <div style={{ marginTop: 'auto', minHeight: '20px' }} />
        </FormContainer>

        <ButtonContainer>
          <CancelButton onClick={onClose}>Voltar</CancelButton>
          <ContinueButton disabled={!isFormValid} onClick={handleContinue}>
            Continuar
          </ContinueButton>
        </ButtonContainer>
      </Modal>
    </Overlay>
  );
};

export default CheckoutModal;
