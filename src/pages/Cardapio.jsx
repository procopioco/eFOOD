import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

function Cardapio() {
  const location = useLocation();
  const restaurant = location.state?.restaurant || null;
  const [cartItems, setCartItems] = useCartStorage();
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutSubmitting, setCheckoutSubmitting] = useState(false);
  const [orderSuccessOpen, setOrderSuccessOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const CHECKOUT_URL = 'https://api-ebac.vercel.app/api/efood/checkout';
  const pizzas = useMemo(
    () =>
      (restaurant?.cardapio || []).map((item) => ({
        id: item.id,
        name: item.nome,
        description: item.descricao,
        price: item.preco,
        image: item.foto,
      })),
    [restaurant]
  );

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

  const handleCompletePurchase = async ({ delivery, payment }) => {
    const products = cartItems.map((item) => ({
      id: item.id,
      price: item.price * item.quantity,
    }));

    const cardNumberDigits = payment.cardNumber.replace(/\s/g, '');
    const expiryYearFull = 2000 + parseInt(payment.expiryYear, 10);

    const body = {
      products,
      delivery: {
        receiver: delivery.recipient,
        address: {
          description: delivery.address,
          city: delivery.city,
          zipCode: delivery.cep,
          number: Number(String(delivery.number).replace(/\D/g, '')) || delivery.number,
          complement: delivery.complement || '',
        },
      },
      payment: {
        card: {
          name: payment.cardName.trim(),
          number: cardNumberDigits,
          code: Number(payment.cvv),
          expires: {
            month: parseInt(payment.expiryMonth, 10),
            year: expiryYearFull,
          },
        },
      },
    };

    setCheckoutSubmitting(true);
    try {
      const response = await fetch(CHECKOUT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const rawText = await response.text();
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch {
        data = { message: rawText };
      }

      if (!response.ok) {
        const msg =
          (data && (data.message || data.error)) ||
          `Não foi possível concluir o pedido (${response.status}).`;
        window.alert(typeof msg === 'string' ? msg : 'Erro ao finalizar o pedido.');
        return;
      }

      const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      setCompletedOrder({
        ...data,
        total: data?.total ?? data?.totalPrice ?? total,
        delivery: data?.delivery ?? {
          receiver: delivery.recipient,
          address: {
            description: delivery.address,
            city: delivery.city,
            zipCode: delivery.cep,
            number: delivery.number,
            complement: delivery.complement || '',
          },
        },
      });
      setCartItems([]);
      setCheckoutOpen(false);
      setOrderSuccessOpen(true);
    } catch {
      window.alert(
        'Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.'
      );
    } finally {
      setCheckoutSubmitting(false);
    }
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
        <Banner image={restaurant?.capa || pizzaImage}>
          <Container>
            <BannerText>
              <Category>{(restaurant?.tipo || 'Restaurante').split(';')[0]}</Category>
              <Title>{restaurant?.titulo || 'Selecione um restaurante'}</Title>
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
        isSubmitting={checkoutSubmitting}
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