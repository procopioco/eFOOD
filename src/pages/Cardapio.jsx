import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PizzaList from '../components/PizzaList';
import PizzaModal from '../components/PizzaModal';
import pizzaImage from '../pizza.png';
import logoImage from '../logo.png';
import vectorImage from '../Vector.png';
import {
  PageWrapper,
  Main,
  Container,
  Header,
  HeaderContent,
  HeaderLabel,
  LogoImage,
  CartText,
  Banner,
  BannerText,
  Category,
  Title,
  Footer,
  FooterText,
  FooterLogo,
  Social,
  SocialBtn,
  SocialIcon,
  FooterDisclaimer,
  GlobalStyle,
  CartOverlay,
  CartDrawer,
  CartHeader,
  CartItems,
  CartItem,
  CartItemImage,
  CartItemInfo,
  CartItemName,
  CartItemPrice,
  CartDivider,
  CartTotal,
  CartButton,
  CloseCart,
  CheckoutTitle,
  FormField,
  FormLabel,
  FormInput,
  FormActions,
  BackButton,
  SuccessMessage
} from '../styles/styles';

// Dados de exemplo para pizzas
const pizzas = [
  {
    id: 1,
    name: 'Margherita',
    description: 'Molho de tomate, mussarela, manjericão fresco.',
    price: 25.99,
    image: pizzaImage,
  },
  {
    id: 2,
    name: 'Pepperoni',
    description: 'Molho de tomate, mussarela, pepperoni.',
    price: 29.99,
    image: pizzaImage,
  },
  {
    id: 3,
    name: 'Quatro Queijos',
    description: 'Molho de tomate, mussarela, gorgonzola, parmesão, provolone.',
    price: 32.99,
    image: pizzaImage,
  },
];

function Cardapio() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [city, setCity] = useState('');
  const [cep, setCep] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardMonth, setCardMonth] = useState('');
  const [cardYear, setCardYear] = useState('');
  const [cartOpen, setCartOpen] = useState(false);

  const handleAddToCart = (pizza) => {
    setCartItems((prev) => {
      const found = prev.find((item) => item.id === pizza.id);
      if (found) {
        return prev.map((item) =>
          item.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...pizza, quantity: 1 }];
    });
  };

  const openCart = () => {
    setCartOpen(true);
    setCheckoutOpen(false);
    setCheckoutStep(1);
  };
  const closeCart = () => setCartOpen(false);
  const openCheckout = () => {
    setCheckoutOpen(true);
    setCheckoutStep(1);
  };
  const backToCart = () => {
    setCheckoutOpen(false);
    setCheckoutStep(1);
  };
  const openPayment = () => setCheckoutStep(2);
  const backToAddress = () => setCheckoutStep(1);
  const handleFinalizePayment = () => setCheckoutStep(3);

  const handlePizzaClick = (pizza) => {
    setSelectedPizza(pizza);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPizza(null);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.quantity * item.price, 0)
    .toFixed(2);

  return (
    <PageWrapper>
      <GlobalStyle />
      <Header image={vectorImage}>
        <Container>
          <HeaderContent>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <HeaderLabel style={{ cursor: 'pointer' }}>Restaurante</HeaderLabel>
            </Link>
            <LogoImage src={logoImage} alt="Efood" />
            <CartText onClick={openCart} style={{ cursor: 'pointer' }}>
              Carrinho ({totalItems})
            </CartText>
          </HeaderContent>
        </Container>
      </Header>
      <Main>
        <Banner image={pizzaImage}>
          <Container>
            <BannerText>
              <Category>Italiana</Category>
              <Title>La Dolce Vita Trattoria</Title>
            </BannerText>
          </Container>
        </Banner>
        <Container>
          <PizzaList
            pizzas={pizzas}
            onPizzaClick={handlePizzaClick}
            onAddToCart={handleAddToCart}
          />
        </Container>
      </Main>

      {cartOpen && (
        <CartOverlay onClick={closeCart}>
          <CartDrawer onClick={(e) => e.stopPropagation()}>
            <CartHeader>
              <div>
                {!checkoutOpen ? 'Carrinho' :
                 checkoutStep === 1 ? 'Endereço de entrega' :
                 checkoutStep === 2 ? 'Dados do cartão' :
                 'Pedido realizado'}
              </div>
              <CloseCart onClick={closeCart}>&times;</CloseCart>
            </CartHeader>

            {checkoutOpen ? (
              checkoutStep === 1 ? (
                <>
                  <CheckoutTitle>Insira os dados da entrega</CheckoutTitle>
                  <FormField>
                    <FormLabel>Endereço</FormLabel>
                    <FormInput value={address} onChange={(e) => setAddress(e.target.value)} />
                  </FormField>
                  <FormField>
                    <FormLabel>Número</FormLabel>
                    <FormInput value={number} onChange={(e) => setNumber(e.target.value)} />
                  </FormField>
                  <FormField>
                    <FormLabel>Complemento</FormLabel>
                    <FormInput value={complement} onChange={(e) => setComplement(e.target.value)} />
                  </FormField>
                  <FormField>
                    <FormLabel>Cidade</FormLabel>
                    <FormInput value={city} onChange={(e) => setCity(e.target.value)} />
                  </FormField>
                  <FormField>
                    <FormLabel>CEP</FormLabel>
                    <FormInput value={cep} onChange={(e) => setCep(e.target.value)} />
                  </FormField>
                  <FormActions>
                    <BackButton onClick={backToCart}>Voltar ao carrinho</BackButton>
                    <CartButton onClick={openPayment}>Continuar pagamento</CartButton>
                  </FormActions>
                </>
              ) : checkoutStep === 2 ? (
                <>
                  <CheckoutTitle>Dados do cartão</CheckoutTitle>
                  <FormField>
                    <FormLabel>Nome do cartão</FormLabel>
                    <FormInput value={cardName} onChange={(e) => setCardName(e.target.value)} />
                  </FormField>
                  <FormField>
                    <FormLabel>Número do cartão</FormLabel>
                    <FormInput value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                  </FormField>
                  <FormField>
                    <FormLabel>CVV</FormLabel>
                    <FormInput value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} />
                  </FormField>
                  <FormField>
                    <FormLabel>Mês de vencimento</FormLabel>
                    <FormInput value={cardMonth} onChange={(e) => setCardMonth(e.target.value)} />
                  </FormField>
                  <FormField>
                    <FormLabel>Ano de vencimento</FormLabel>
                    <FormInput value={cardYear} onChange={(e) => setCardYear(e.target.value)} />
                  </FormField>
                  <FormActions>
                    <BackButton onClick={backToAddress}>Voltar para edição de endereço</BackButton>
                    <CartButton onClick={handleFinalizePayment}>Finalizar pagamento</CartButton>
                  </FormActions>
                </>
              ) : (
                <SuccessMessage>Pedido realizado com sucesso!</SuccessMessage>
              )
            ) : (
              <>
                <CartItems>
                  {cartItems.length === 0 ? (
                    <p>O carrinho está vazio.</p>
                  ) : (
                    cartItems.map((item) => (
                      <CartItem key={item.id}>
                        <CartItemImage src={item.image} alt={item.name} />
                        <CartItemInfo>
                          <CartItemName>{item.name}</CartItemName>
                          <CartItemPrice>
                            {item.quantity} x R$ {item.price.toFixed(2)}
                          </CartItemPrice>
                        </CartItemInfo>
                      </CartItem>
                    ))
                  )}
                </CartItems>
                <CartDivider />
                <CartTotal>
                  <span>Valor total</span>
                  <strong>R$ {totalPrice}</strong>
                </CartTotal>
                <CartButton onClick={openCheckout}>Continuar com a entrega</CartButton>
              </>
            )}
          </CartDrawer>
        </CartOverlay>
      )}

      {isModalOpen && selectedPizza && (
        <PizzaModal
          pizza={selectedPizza}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}

      <Footer>
        <FooterLogo>
          <img src={logoImage} alt="efood" />
        </FooterLogo>
        <Social>
          <SocialBtn href="#">
            <SocialIcon>ig</SocialIcon>
          </SocialBtn>
          <SocialBtn href="#">
            <SocialIcon>f</SocialIcon>
          </SocialBtn>
          <SocialBtn href="#">
            <SocialIcon>tw</SocialIcon>
          </SocialBtn>
        </Social>
        <FooterDisclaimer>
          A efood é uma plataforma para divulgação de estabelecimentos. A responsabilidade pela entrega, qualidade dos produtos é toda do estabelecimento contratado.
        </FooterDisclaimer>
      </Footer>
    </PageWrapper>
  );
}

export default Cardapio;