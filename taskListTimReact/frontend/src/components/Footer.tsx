import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const FooterWrapper = styled.footer<{ theme: any }>`
  background-color: ${({ theme }) => theme.palette.background.paper};
  color: ${({ theme }) => theme.palette.text.primary};
  text-align: center;
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.palette.primary.main};
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

    &:hover {
      color: ${({ theme }) => theme.palette.secondary.main};
    }
  }
`;

const FooterInfo = styled.div<{ theme: any }>`
  font-size: 0.9rem;
  margin-top: 20px;

  a {
    color: ${({ theme }) => theme.palette.primary.main};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.palette.secondary.main};
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
