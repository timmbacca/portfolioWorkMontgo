import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '@mui/material/styles';

// Keyframes for animations
const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Wrapper for header
const HeaderWrapper = styled.header<{ theme: any }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: ${({ theme }) => theme.palette.background.paper};
  color: ${({ theme }) => theme.palette.text.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;
  height: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary.main};
  animation: ${slideIn} 0.4s ease-out; /* Header slide-in animation */
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Hamburger = styled.button<{ theme: any }>`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.text.primary};
  display: block;

  &:hover {
    transform: scale(1.1); /* Subtle hover animation */
    transition: transform 0.2s ease-in-out;
  }

  @media (min-width: 845px) {
    display: none;
  }
`;

const Logo = styled.div<{ theme: any }>`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.primary};
  text-align: left;
  text-decoration: none !important;

  &:hover {
      color: ${({ theme }) => theme.palette.background.default};
      transform: translateX(5px); /* Subtle move on hover */
      transition: all 0.3s ease;
  }

    a {
    text-decoration: none !important;
    color: ${({ theme }) => theme.palette.text.primary};
    }

`;

const NavLinks = styled.nav<{ $isActive: boolean; theme: any }>`
  display: ${({ $isActive }) => ($isActive ? 'flex' : 'none')};
  flex-direction: column;
  align-items: stretch;
  position: absolute;
  top: 55px;
  left: 10px;
  background-color: ${({ theme }) => theme.palette.background.default};
  padding: 10px;
  z-index: 2;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  animation: ${fadeIn} 0.3s ease-out;

  a {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: ${({ theme }) => theme.palette.text.primary};
    font-weight: bold;
    text-align: left;
    white-space: nowrap;

    &:hover {
      background-color: ${({ theme }) => theme.palette.primary.main};
      color: ${({ theme }) => theme.palette.background.default};
      transform: translateX(5px); /* Subtle move on hover */
      transition: all 0.3s ease;
    }
  }

  @media (min-width: 845px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: static;
    background-color: transparent;
    border: none;
    box-shadow: none;

    a {
      padding: 10px 15px;
      text-align: center;

      &:hover {
        transform: translateY(-5px); /* Subtle lift on hover for desktop */
        transition: transform 0.3s ease;
      }
    }
  }
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <HeaderWrapper theme={theme}>
      <LogoContainer>
        <Hamburger theme={theme} onClick={toggleMenu}>
          ☰
        </Hamburger>
        <Logo theme={theme}>
          <Link to="/">
          Tim Montgomery
          </Link>
        </Logo>
      </LogoContainer>
      <NavLinks theme={theme} $isActive={menuOpen}>
        <Link to="/" onClick={closeMenu}>
          About Me
        </Link>
        <Link to="/task-tracker" onClick={closeMenu}>
          Task Tracker
        </Link>
        <Link to="/dashboard" onClick={closeMenu}>
          Task Dashboard
        </Link>
        <Link to="/owasp" onClick={closeMenu}>
          Helpful Tools
        </Link>
        <Link to="/projects" onClick={closeMenu}>
          Projects
        </Link>
        <Link to="/resume" onClick={closeMenu}>
          Resume
        </Link>
        <Link to="/contact" onClick={closeMenu}>
          Contact
        </Link>
      </NavLinks>
    </HeaderWrapper>
  );
};

export default Header;
