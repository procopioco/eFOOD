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
  grid-template-columns: 2fr 1fr;
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

const CheckoutForm = ({ isOpen, onClose, onComplete, cartTotal }) => {
  const [formData, setFormData] = useState({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    zipCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isComplete = Object.values(formData).every(field => field.trim() !== '');
    
    if (isComplete) {
      onComplete(formData);
    } else {
      alert('Por favor, preencha todos os campos obrigatórios');
    }
  };

  return (
    <>
      {isOpen && <FormOverlay onClick={onClose} />}

      <FormContainer $isOpen={isOpen}>
        <FormHeader>
          <button onClick={onClose}>
            <ArrowLeft size={20} />
          </button>
          <h2>Entrega</h2>
        </FormHeader>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <FormContent>
            <FormGroup>
              <Label>Endereço</Label>
              <Input
                type="text"
                name="street"
                placeholder="Rua"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <RowGroup>
              <FormGroup>
                <Label>Número</Label>
                <Input
                  type="text"
                  name="number"
                  placeholder="Nº"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </RowGroup>

            <FormGroup>
              <Label>CEP</Label>
              <Input
                type="text"
                name="zipCode"
                placeholder="CEP"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Cidade</Label>
              <Input
                type="text"
                name="city"
                placeholder="Cidade"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Bairro</Label>
              <Input
                type="text"
                name="neighborhood"
                placeholder="Bairro"
                value={formData.neighborhood}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Complemento</Label>
              <Input
                type="text"
                name="complement"
                placeholder="Opcional"
                value={formData.complement}
                onChange={handleChange}
              />
            </FormGroup>
          </FormContent>

          <FormFooter>
            <Button type="submit">
              Continuar com o pagamento
            </Button>
            <Button $secondary type="button" onClick={onClose}>
              Voltar ao carrinho
            </Button>
          </FormFooter>
        </form>
      </FormContainer>
    </>
  );
};

export default CheckoutForm;
