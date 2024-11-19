import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  position: fixed; /* Fixes the header at the top */
  top: 0;
  left: 0;
  width: 100%; /* Ensures the header spans the full width of the viewport */
  z-index: 1000; /* Ensures the header stays above other content */
  background-color: ${({ theme }) => theme.palette?.background?.default || '#f5f5f5'};
  color: ${({ theme }) => theme.palette?.text?.primary || '#000000'};
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space between the logo and navigation */
  padding: 10px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.palette?.primary?.main || '#1976d2'};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Adds a subtle shadow for a floating effect */
`;


const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Hamburger = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.palette?.text?.primary || '#000000'};
  display: block;

  @media (min-width: 769px) {
    display: none;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: left; /* Ensure the text alignment is left */
  color: ${({ theme }) => theme.palette?.text?.primary || '#000000'};
`;

const NavLinks = styled.nav<{ isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: 125px;
  left: 0;
  background-color: ${({ theme }) => theme.palette?.background?.default || '#ffffff'};
  padding: 10px 20px;
  z-index: 2;

  a {
    padding: 10px 0;
    text-decoration: none;
    color: ${({ theme }) => theme.palette?.text?.primary || '#000000'};
    font-weight: bold;

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

    a {
      padding: 10px 15px;
    }
  }
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <HeaderWrapper>
      <LogoContainer>
        <Hamburger onClick={toggleMenu}>☰</Hamburger>
        <Logo>Tim Montgomery</Logo>
      </LogoContainer>
      <NavLinks isActive={menuOpen}>
        <Link to="/" onClick={closeMenu}>About Me</Link>
        <Link to="/task-tracker" onClick={closeMenu}>Task Tracker</Link>
        <Link to="/projects" onClick={closeMenu}>Projects</Link>
        <Link to="/resume" onClick={closeMenu}>Resume</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>
      </NavLinks>
    </HeaderWrapper>
  );
};

export default Header;
