import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';

const HeaderWrapper = styled.header<{ theme: any }>`
  position: fixed; /* Fixes the header at the top */
  top: 0;
  left: 0;
  width: 100%; /* Ensures the header spans the full width of the viewport */
  z-index: 1000; /* Ensures the header stays above other content */
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space between the logo and navigation */
  padding: 5px 20px; /* Reduced padding for a shorter header */
  height: 50px; /* Sets a consistent height */
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary.main};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Adds a subtle shadow for a floating effect */
  border: none;
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

  @media (min-width: 769px) {
    display: none;
  }
`;

const Logo = styled.div<{ theme: any }>`
  font-size: 1.25rem; /* Slightly reduced font size */
  font-weight: bold;
  text-align: left; /* Ensure the text alignment is left */
  color: ${({ theme }) => theme.palette.text.primary};
`;

const NavLinks = styled.nav<{ isActive: boolean; theme: any }>`
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  flex-direction: column;
  align-items: stretch; /* Ensure child elements stretch to the container width */
  position: absolute;
  top: 55px; /* Adjusted to align with the shorter header height */
  left: 10px; /* Margin from the left */
  background-color: ${({ theme }) => theme.palette?.background?.default || '#ffffff'};
  padding: 10px; /* Padding inside the nav menu */
  z-index: 2;
  border: 1px solid ${({ theme }) => theme.palette?.primary?.main || '#1976d2'};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Slight shadow */
  border-radius: 5px; /* Rounded corners */

  a {
    display: block; /* Ensures the anchor tag spans the full width */
    padding: 10px; /* Space inside each menu item */
    text-decoration: none;
    color: ${({ theme }) => theme.palette?.text?.primary || '#000000'};
    font-weight: bold;
    width: 100%; /* Ensures full width coverage for hover background */
    white-space: nowrap; /* Prevents text wrapping */
    text-align: left;

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
    border: none;
    box-shadow: none;

    a {
      padding: 10px 15px;
      text-align: center; /* Center-align text in desktop view */
    }
  }
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme(); // Access the theme context

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
        <Logo theme={theme}>Tim Montgomery</Logo>
      </LogoContainer>
      <NavLinks theme={theme} isActive={menuOpen}>
        <Link to="/" onClick={closeMenu}>
          About Me
        </Link>
        <Link to="/task-tracker" onClick={closeMenu}>
          Task Tracker
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
