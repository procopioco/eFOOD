import React from 'react';
import { Link } from 'react-router-dom';
import {
  PageWrapper,
  Main,
  Container,
  Header,
  HeaderContent,
  HeaderLabel,
  LogoImage,
  CartText,
  Footer,
  FooterText,
  GlobalStyle
} from '../styles/styles';
import logoImage from '../logo.png';
import vectorImage from '../Vector.png';

function AboutPage() {
  return (
    <PageWrapper>
      <GlobalStyle />
      <Header image={vectorImage}>
        <Container>
          <HeaderContent>
            <HeaderLabel>Restaurante</HeaderLabel>
            <LogoImage src={logoImage} alt="Efood" />
            <Link to="/" style={{ textDecoration: 'none' }}>
              <CartText style={{ cursor: 'pointer' }}>Voltar ao Início</CartText>
            </Link>
          </HeaderContent>
        </Container>
      </Header>
      <Main>
        <Container>
          <h1>Sobre o Efood</h1>
          <p>Bem-vindo ao Efood, o melhor lugar para pedir suas pizzas favoritas!</p>
          <p>Nós oferecemos uma variedade de pizzas deliciosas, feitas com ingredientes frescos e de alta qualidade.</p>
          <p>Volte para a <Link to="/">página inicial</Link> para ver nosso cardápio.</p>
        </Container>
      </Main>
      <Footer>
        <Container>
          <FooterText>© 2023 Efood. Todos os direitos reservados.</FooterText>
        </Container>
      </Footer>
    </PageWrapper>
  );
}

export default AboutPage;