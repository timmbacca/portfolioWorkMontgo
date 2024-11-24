import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';

const LandingPageWrapper = styled.main<{ theme: any }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const HeroBanner = styled.section<{ theme: any }>`
  width: 100%;
  height: 270px; /* Adjust height as needed */
  background: url('/path-to-hero-banner-graphic.png') no-repeat center center;
  background-size: cover;
  position: relative;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PhotoWrapper = styled.div<{ theme: any }>`
  width: 269px;
  height: 269px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid ${({ theme }) => theme.palette.primary.main};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const WelcomeSection = styled.section<{ theme: any }>`
  margin-bottom: 40px;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.palette.text.primary};
  }

  p {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;

const AboutSection = styled.section<{ theme: any }>`
  max-width: 800px;
  text-align: justify;
  padding-left:20px;
  padding-right:20px;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.palette.primary.main};
    margin-bottom: 20px;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.palette.text.primary};
    margin-bottom: 20px;
  }
`;

const LandingPage = () => {
  const theme = useTheme(); // Access the theme context dynamically

  return (
    <LandingPageWrapper theme={theme}>
      <HeroBanner theme={theme}>
        <PhotoWrapper theme={theme}>
          <img src="/timmie.JPG" alt="Tim Montgomery" />
        </PhotoWrapper>
      </HeroBanner>
      <WelcomeSection theme={theme}>
        <h1>Tim Montgomery</h1>
        <p>Discover my journey, projects, and passion for web development.</p>
      </WelcomeSection>
      <AboutSection theme={theme}>
        <h2>About Me</h2>
        <p>
          With nearly two decades of experience as a UI Designer and Front-End Developer, I am passionate about building intuitive, accessible, and visually engaging user interfaces that align with both client objectives and user needs. I am also committed to growing and expanding my back-end development skills.
        </p>
        <p>
          I am grateful that my recent employment with Optimo-IT afforded me the opportunity to learn new languages, platforms, and techniques. As such, I have developed a versatile skill set that combines a depth of technical expertise with creative insight.
        </p>
        <p>
          In my recent role as a contractor to the US Postal Service, I created dynamic web pages, enhanced application interfaces, and maintained accessibility guidelines using a variety of programming languages, frameworks, platforms, and tools.
        </p>
      </AboutSection>
    </LandingPageWrapper>
  );
};

export default LandingPage;
