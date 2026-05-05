import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from '../logo.png';
import vector from '../Vector.png';
import macarrao from '../macarrao.png';
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

const PageWrapper = styled.div`
  background: #FDF0E8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
`;

const Hero = styled.section`
  text-align: center;
  padding: 80px 40px 100px;
  background-image: url(${props => props.bgImage || 'none'}), url(${props => props.bgImage || 'none'});
  background-size: 100% auto, 100% auto;
  background-repeat: repeat-y, repeat-y;
  background-position: top center, top center;
  background-attachment: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 384px;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  img {

    width: 125px;
    height: 57.5px;

    margin-bottom: 100px;
  }

  h1 {
    font-family: 'Roboto', sans-serif;
    font-size: 36px;
    color: #E66767;
    line-height: 1.2;
    max-width: 560px;
    margin: 0 auto;
  }

  @media (max-width: 100%) {
    padding: 50px 20px 60px;
    h1 {
      font-size: 28px;
    }
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
  padding: 0 40px 60px;
  max-width: 900px;
  margin: 60px auto 0;
  width: 100%;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 0 20px 40px;
    margin: 40px auto 0;
  }
`;

const Card = styled.div`
  background: #FFFFFF;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.07);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
  }
`;

const CardImg = styled.div`
  position: relative;
  height: 190px;
  overflow: hidden;
`;

const CardImgPlaceholder = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Badges = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 6px;
`;

const Badge = styled.span`
  background: #E66767;
  color: #fff;
  font-size: 11px;
  font-weight: 500;
  padding: 4px 10px;
  font-family: 'Roboto', sans-serif;
`;

const CardBody = styled.div`
  padding: 16px 18px 18px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const CardName = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: #E66767;
`;

const CardRating = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 500;
  font-size: 15px;
  color: #2C2C2A;
`;

const Star = styled.span`
  color: #E66767;
  font-size: 16px;
`;

const CardDesc = styled.p`
  font-size: 13px;
  color: #E66767;
  line-height: 1.55;
  margin-bottom: 14px;
`;

const Button = styled.button`
  display: inline-block;
  background: #E66767;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  padding: 8px 18px;
  border: none;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  transition: background 0.2s;

  &:hover {
    background: #E66767;
  }
`;

const Footer = styled.footer`
  background: #FFEBD9;
  border-top: 1px solid rgba(0,0,0,0.08);
  padding: 40px 40px 28px;
  text-align: center;
  margin-top: auto;
`;

const FooterLogo = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  color: #E66767;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  img {

    width: 125px;
    height: 57.5px;

  }
`;

const Social = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
`;



const SocialBtn = styled.a`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #E66767;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;

  &:hover {
    background: #E66767;
  }
`;


const FooterDisclaimer = styled.p`
  font-size: 11.5px;
  color: #E66767;
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.5;
`;

const restaurants = [
  {
    id: 1,
    name: 'Hioki Sushi',
    rating: 4.9,
    category: 'Japonesa',
    badge: 'Destaque da semana',
    description: 'Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida, embalagens cuidadosas e qualidade garantida. Experimente o Japão sem sair do lar com nosso delivery!',
    emoji: '🍣',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b1b 100%)',
  },
  {
    id: 2,
    name: 'La Dolce Vita Trattoria',
    rating: 4.6,
    category: 'Italiana',
    description: 'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    emoji: '🍝',
    gradient: 'linear-gradient(135deg, #2c1810 0%, #4a2c1a 100%)',
  },
  {
    id: 3,
    name: 'La Dolce Vita Trattoria',
    rating: 4.6,
    category: 'Italiana',
    description: 'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    emoji: '🍕',
    gradient: 'linear-gradient(135deg, #2c1810 0%, #4a2c1a 100%)',
  },
  {
    id: 4,
    name: 'La Dolce Vita Trattoria',
    rating: 4.6,
    category: 'Italiana',
    description: 'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    emoji: '🥩',
    gradient: 'linear-gradient(135deg, #2c1810 0%, #4a2c1a 100%)',
  },
  {
    id: 5,
    name: 'La Dolce Vita Trattoria',
    rating: 4.6,
    category: 'Italiana',
    description: 'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    emoji: '🍝',
    gradient: 'linear-gradient(135deg, #2c1810 0%, #4a2c1a 100%)',
  },
  {
    id: 6,
    name: 'La Dolce Vita Trattoria',
    rating: 4.6,
    category: 'Italiana',
    description: 'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    emoji: '🍜',
    gradient: 'linear-gradient(135deg, #2c1810 0%, #4a2c1a 100%)',
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Hero bgImage={vector}>
        <img src={logo} alt="efood" />
        <h1>Viva experiências gastronômicas no conforto da sua casa</h1>
      </Hero>

      <CardsGrid>
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id}>
            <CardImg>
              <CardImgPlaceholder src={macarrao} alt={restaurant.name} />
              <Badges>
                {restaurant.badge && (
                  <Badge alt>{restaurant.badge}</Badge>
                )}
                <Badge>{restaurant.category}</Badge>
              </Badges>
            </CardImg>
            <CardBody>
              <CardHeader>
                <CardName>{restaurant.name}</CardName>
                <CardRating>
                  {restaurant.rating} <Star>★</Star>
                </CardRating>
              </CardHeader>
              <CardDesc>{restaurant.description}</CardDesc>
              <Button onClick={() => navigate('/cardapio')}>
                Saiba mais
              </Button>
            </CardBody>
          </Card>
        ))}
      </CardsGrid>

      <Footer>
        <FooterLogo>
          <img src={logo} alt="efood" />
        </FooterLogo>
        <Social>
          <SocialBtn href="#">
            <FaInstagram color="#FFEBD9" size={18} />
          </SocialBtn>
          <SocialBtn href="#">
            <FaFacebook color="#FFEBD9" size={18} />
          </SocialBtn>
          <SocialBtn href="#">
            <FaTwitter color="#FFEBD9" size={18} />
          </SocialBtn>
        </Social>
        <FooterDisclaimer>
          A efood é uma plataforma para divulgação de estabelecimentos. A responsabilidade pela entrega, qualidade dos produtos é toda do estabelecimento contratado.
        </FooterDisclaimer>
      </Footer>
    </PageWrapper>
  );
}

export default Home;