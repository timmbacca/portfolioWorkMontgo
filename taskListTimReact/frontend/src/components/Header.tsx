import React, { useState } from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.palette?.background?.default || '#f5f5f5'};
  color: ${({ theme }) => theme.palette?.text?.primary || '#000000'};
  display: flex;
  align-items: center;
  justify-content: space-between; /* Ensures logo is on the left and nav is on the right */
  padding: 10px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.palette?.primary?.main || '#1976d2'};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* Space between hamburger and logo */
`;

const Hamburger = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.palette?.text?.primary || '#000000'};
  display: block;

  @media (min-width: 769px) {
    display: none; /* Hide hamburger on larger screens */
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette?.text?.primary || '#000000'};
`;

const NavLinks = styled.nav<{ isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.palette?.background?.default || '#ffffff'};
  border-top: 1px solid ${({ theme }) => theme.palette?.primary?.main || '#1976d2'};
  padding: 10px 20px;
  z-index: 2; /* Ensure it stacks above other elements */

  a {
    padding: 10px 0;
    text-decoration: none;
    text-align: left;
    color: ${({ theme }) => theme.palette?.text?.primary || '#000000'};
    font-weight: bold;
    width: 100%;

    &:hover {
      background-color: ${({ theme }) => theme.palette?.primary?.main || '#1976d2'};
      color: ${({ theme }) => theme.palette?.background?.default || '#ffffff'};
    }
  }

  @media (min-width: 769px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: static;
    background-color: transparent;
    width: auto;

    a {
      padding: 10px 15px;
      text-align: center;

      &:hover {
        background-color: ${({ theme }) => theme.palette?.primary?.main || '#1976d2'};
        color: ${({ theme }) => theme.palette?.background?.default || '#ffffff'};
      }
    }
  }
`;


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <HeaderWrapper>
      <LogoContainer>
        <Hamburger onClick={toggleMenu}>☰</Hamburger>
        <Logo>Timmie's Portfolio</Logo>
      </LogoContainer>
      <NavLinks isActive={menuOpen}>
        <a href="#landing">Home</a>
        <a href="#about">About Me</a>
        <a href="#task-tracker">Task Tracker</a>
        <a href="#projects">Projects</a>
        <a href="#resume">Resume</a>
        <a href="#faq">FAQ</a>
        <a href="#contact">Contact</a>
      </NavLinks>
    </HeaderWrapper>
  );
};

export default Header;
