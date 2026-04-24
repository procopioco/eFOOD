import styled, { createGlobalStyle } from 'styled-components'
import { colors } from './theme'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    margin: 0;
    min-height: 100%;
  }

  body {
    margin: 0;
    background: ${colors.background};
    color: ${colors.text};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
`

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export const Main = styled.main`
  flex: 1;
`

export const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 16px;
`

export const Header = styled.header`
  background-color: ${colors.secondary};
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 10;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 220px;
    height: 220px;
    top: -80px;
    left: -70px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    width: 180px;
    height: 180px;
    bottom: -60px;
    right: -50px;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 50%;
  }
`

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  min-height: 80px;
`

export const HeaderLabel = styled.span`
  color: ${colors.primary};
  font-weight: bold;
  font-size: 16px;
  z-index: 1;
`

export const LogoImage = styled.img`
  width: 70px;
  height: auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`

export const CartText = styled.span`
  color: ${colors.primary};
  font-weight: bold;
  z-index: 1;
`

export const CartOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 90;
  display: flex;
  justify-content: flex-end;
`

export const CartDrawer = styled.div`
  position: relative;
  width: 360px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: -12px 0 30px rgba(0, 0, 0, 0.18);
  padding: 24px;
  display: flex;
  flex-direction: column;
  z-index: 100;
`

export const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  font-weight: bold;
  color: ${colors.primary};
`

export const CloseCart = styled.span`
  cursor: pointer;
  font-size: 24px;
`;

export const CartItems = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;
`

export const CartItem = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  align-items: flex-start;
`

export const CartItemImage = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
`

export const CartItemInfo = styled.div`
  flex: 1;
`

export const CartItemName = styled.div`
  font-weight: bold;
  color: ${colors.primary};
  margin-bottom: 6px;
`

export const CartItemPrice = styled.div`
  font-size: 14px;
  color: ${colors.text};
`

export const CartDivider = styled.div`
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  margin: 16px 0;
`

export const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 16px;
`

export const CheckoutTitle = styled.h2`
  margin: 0 0 18px;
  font-size: 20px;
  color: ${colors.primary};
`

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`

export const FormLabel = styled.label`
  color: ${colors.text};
  font-size: 14px;
`

export const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 14px;
`

export const FormActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  flex-wrap: wrap;
`

export const BackButton = styled.button`
  width: 100%;
  background: ${colors.primary};
  color: ${colors.white};
  border: none;
  padding: 14px;
  cursor: pointer;
  font-weight: bold;
`

export const CartButton = styled.button`
  width: 100%;
  background: ${colors.primary};
  color: ${colors.white};
  border: none;
  padding: 14px;
  cursor: pointer;
  font-weight: bold;
`

export const Banner = styled.div`
  height: 280px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
  }
`

export const BannerText = styled.div`
  position: absolute;
  top: 32px;
  left: 16px;
  color: white;
  z-index: 1;
`;

export const Category = styled.p`
  font-size: 18px;
  margin: 0;
`

export const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  position: absolute;
  bottom: 32px;
  left: 16px;
  margin: 0;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin: 40px 0;
`

export const Card = styled.div`
  background-color: ${colors.primary};
  padding: 16px;
  color: ${colors.white};
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.14);
  }
`

export const CardImage = styled.img`
  width: 100%;
  object-fit: cover;
`

export const CardTitle = styled.h3`
  margin: 16px 0 8px;
`

export const CardDesc = styled.p`
  font-size: 14px;
  line-height: 1.4;
`

export const Button = styled.button`
  width: 100%;
  background-color: ${colors.secondary};
  color: ${colors.primary};
  border: none;
  padding: 12px;
  margin-top: 16px;
  cursor: pointer;
  font-weight: bold;
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Modal = styled.div`
  background: ${colors.primary};
  padding: 24px;
  width: min(700px, calc(100% - 48px));
  color: white;
  position: relative;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`

export const Close = styled.span`
  position: absolute;
  right: 16px;
  top: 8px;
  cursor: pointer;
  font-size: 24px;
`

export const ModalImage = styled.img`
  width: 100%;
  max-width: 280px;
  object-fit: cover;
`

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`

export const ModalButton = styled.button`
  margin-top: 16px;
  background: ${colors.secondary};
  color: ${colors.primary};
  border: none;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
`

export const Footer = styled.footer`
  background-color: ${colors.secondary};
  text-align: center;
  padding: 40px 0;
`

export const FooterText = styled.p`
  font-size: 12px;
  color: ${colors.primary};
`

export const SuccessMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${colors.primary};
  font-size: 18px;
  font-weight: bold;
`

export const FooterLogo = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  color: #C0392B;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  img {
    height: 30px;
    width: auto;
  }
`

export const Social = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
`

export const SocialBtn = styled.a`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #C0392B;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;

  &:hover {
    background: #a93226;
  }
`

export const SocialIcon = styled.span`
  color: #fff;
  font-size: 13px;
  font-weight: 500;
`

export const FooterDisclaimer = styled.p`
  font-size: 11.5px;
  color: #E66767;
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.5;
`