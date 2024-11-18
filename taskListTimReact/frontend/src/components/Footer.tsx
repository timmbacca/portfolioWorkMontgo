import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.palette?.background?.paper || '#f5f5f5'};
  color: ${({ theme }) => theme.palette?.text?.primary || '#000000'};
  text-align: center;
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.palette?.primary?.main || '#1976d2'};
`;

const Sitemap = styled.nav`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.palette?.primary?.main || '#1976d2'};
    font-weight: bold;

    &:hover {
      color: ${({ theme }) => theme.palette?.secondary?.main || '#f50057'};
    }
  }
`;

const FooterInfo = styled.div`
  font-size: 0.9rem;
  margin-top: 20px;

  a {
    color: ${({ theme }) => theme.palette?.primary?.main || '#1976d2'};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.palette?.secondary?.main || '#f50057'};
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Sitemap>
        <Link to="/">Home</Link>
        <Link to="/about">About Me</Link>
        <Link to="/task-tracker">Task Tracker</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/resume">Resume</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/contact">Contact</Link>
      </Sitemap>
      <FooterInfo>
        <div>© 2024 Tim Montgomery. All rights reserved.</div>
        <div>
        Connect with me on{' '}
          <a href="https://www.linkedin.com/in/ctmontgo" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>.
        </div>
      </FooterInfo>
    </FooterWrapper>
  );
};

export default Footer;
