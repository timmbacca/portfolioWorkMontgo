import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';

const ContactWrapper = styled.div<{ theme: any }>`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ContactSection = styled.section<{ theme: any }>`
  margin-bottom: 20px;

  h1 {
    font-size: 2rem;
    font-weight: bold;
  }

  p {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  a {
    color: ${({ theme }) => theme.palette.primary.main};
    text-decoration: none;
    font-weight: bold;

    &:hover {
      color: ${({ theme }) => theme.palette.secondary.main};
    }
  }
`;

const ContactPage = () => {
  const theme = useTheme(); // Access the current theme

  return (
    <ContactWrapper theme={theme}>
      <ContactSection theme={theme}>
        <h1>Get in Touch</h1>
        <p>
          Feel free to reach out for project inquiries, collaboration opportunities, or just to
          connect!
        </p>
        <p>
          Email:{' '}
          <a href="mailto:ctmontgo@gmail.com" target="_blank" rel="noopener noreferrer">
            ctmontgo@gmail.com
          </a>
        </p>
        <p>
          LinkedIn:{' '}
          <a
            href="https://www.linkedin.com/in/ctmontgo"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/ctmontgo
          </a>
        </p>
      </ContactSection>
    </ContactWrapper>
  );
};

export default ContactPage;
