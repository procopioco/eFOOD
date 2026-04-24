import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStorage } from '../hooks/useCartStorage';
import PizzaList from '../components/PizzaList';
import PizzaModal from '../components/PizzaModal';
import CartSidebar from '../components/CartSidebar';
import CheckoutModal from '../components/CheckoutModal';
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
  Footer,
  FooterLogo,
  Social,
  SocialBtn,
  SocialIcon,
  FooterDisclaimer,
  GlobalStyle,
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
  const [cartItems, setCartItems] = useCartStorage();
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [, setDeliveryData] = useState(null);

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

  const handleRemoveFromCart = (pizzaId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== pizzaId));
  };

  const handleCheckout = () => {
    setCheckoutOpen(true);
  };

  const handleContinueCheckout = (formData) => {
    setDeliveryData(formData);
    setCheckoutOpen(false);
    alert(`Endereço salvo: ${formData.address}, ${formData.number} - ${formData.city}`);
    // TODO: Implementar próxima etapa (pagamento)
  };

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  const handlePizzaClick = (pizza) => {
    setSelectedPizza(pizza);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPizza(null);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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

      <CartSidebar
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
        isOpen={cartOpen}
        onClose={closeCart}
      />

      {isModalOpen && selectedPizza && (
        <PizzaModal
          pizza={selectedPizza}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}

      <CheckoutModal
        isOpen={checkoutOpen}
        totalPrice={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        onClose={() => setCheckoutOpen(false)}
        onContinue={handleContinueCheckout}
      />

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