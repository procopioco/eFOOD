import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStorage } from '../hooks/useCartStorage';
import PizzaList from '../components/PizzaList';
import PizzaModal from '../components/PizzaModal';
import CartSidebar from '../components/CartSidebar';
import CheckoutModal from '../components/CheckoutModal';
import OrderConfirmation from '../components/OrderConfirmation';
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
  FooterLogo,
  Social,
  SocialBtn,
  FooterDisclaimer,
  GlobalStyle,
} from '../styles/styles';
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
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
  const [orderSuccessOpen, setOrderSuccessOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

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

  const handleCompletePurchase = ({ delivery }) => {
    setDeliveryData(delivery);
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setCompletedOrder({
      total,
      address: {
        street: delivery.address,
        number: delivery.number,
        city: delivery.city,
        zipCode: delivery.cep,
      },
    });
    setCartItems([]);
    setCheckoutOpen(false);
    setOrderSuccessOpen(true);
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
        totalPrice={cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )}
        onClose={() => setCheckoutOpen(false)}
        onCompletePurchase={handleCompletePurchase}
      />

      <OrderConfirmation
        isOpen={orderSuccessOpen}
        onClose={() => {
          setOrderSuccessOpen(false);
          setCompletedOrder(null);
        }}
        orderData={completedOrder}
      />

      <Footer>
        <FooterLogo>
          <img src={logoImage} alt="efood" />
        </FooterLogo>
        <Social>
          <SocialBtn href="#">
            <FaInstagram color="#fff" size={18} />
          </SocialBtn>
          <SocialBtn href="#">
            <FaFacebook color="#fff" size={18} />
          </SocialBtn>
          <SocialBtn href="#">
            <FaTwitter color="#fff" size={18} />
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