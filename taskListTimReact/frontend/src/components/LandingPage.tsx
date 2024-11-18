import React from 'react';
import styled from 'styled-components';

const Banner = styled.div`
  background: ${({ theme }) =>
    `linear-gradient(to bottom, ${theme?.palette?.primary?.main || '#1976d2'}, ${theme?.palette?.background?.default || '#f5f5f5'})`};
  color: ${({ theme }) => theme?.palette?.text?.primary || '#000000'};
  text-align: center;
  padding: 50px 20px;
`;



const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Subheading = styled.p`
  font-size: 1.25rem;
  margin: 0;
`;

const LandingPage = () => {
  return (
    <Banner>
      <Heading>Welcome to Timmie's Portfolio</Heading>
      <Subheading>Discover my journey and projects.</Subheading>
    </Banner>
  );
};

export default LandingPage;
