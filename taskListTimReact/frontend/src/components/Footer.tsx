import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const hoverGlow = keyframes`
  from {
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.4);
  }
  to {
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
  }
`;

const FooterWrapper = styled.footer<{ theme: any }>`
  background-color: ${({ theme }) => theme.palette.background.paper};
  color: ${({ theme }) => theme.palette.text.primary};
  text-align: center;
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.palette.primary.main};
  animation: ${fadeIn} 1s ease-out; /* Footer fade-in animation */
`;

const Sitemap = styled.nav<{ theme: any }>`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: bold;
    position: relative;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.palette.secondary.main};
      animation: ${hoverGlow} 0.5s alternate infinite ease-in-out; /* Glow effect on hover */
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: ${({ theme }) => theme.palette.secondary.main};
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%; /* Underline animation */
    }
  }
`;

const FooterInfo = styled.div<{ theme: any }>`
  font-size: 0.9rem;
  margin-top: 20px;
  animation: ${fadeIn} 1.5s ease-out; /* Footer info fade-in animation with delay */

  a {
    color: ${({ theme }) => theme.palette.primary.main};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.palette.secondary.main};
      animation: ${hoverGlow} 0.5s alternate infinite ease-in-out; /* Glow effect on hover */
    }
  }
`;

const Footer = () => {
  const theme = useTheme(); // Access the theme context

  return (
    <FooterWrapper theme={theme}>
      <Sitemap theme={theme}>
        <Link to="/">About Me</Link>
        <Link to="/task-tracker">Task Tracker</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/resume">Resume</Link>
        <Link to="/contact">Contact</Link>
      </Sitemap>
      <FooterInfo theme={theme}>
        <div>© 2024 Tim Montgomery. All rights reserved.</div>
        <div>
          Connect with me on{' '}
          <a
            href="https://www.linkedin.com/in/ctmontgo"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          .
        </div>
      </FooterInfo>
    </FooterWrapper>
  );
};

export default Footer;
