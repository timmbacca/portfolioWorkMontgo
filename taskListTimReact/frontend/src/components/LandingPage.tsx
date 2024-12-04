import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import HeroSVG from '../assets/ssspiral.svg';

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
  background: url(${HeroSVG}) no-repeat center center;
  background-size: cover;
  position: relative;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PhotoWrapper = styled.div<{ theme: any }>`
  width: 240px;
  height: 240px;
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
  margin-bottom: 0px;

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
  padding-left:10px;
  padding-right:10px;

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

  a {
    color: ${({ theme }) => theme.palette.primary.main};
    text-decoration: none;
    font-weight: bold;

    &:hover {
      color: ${({ theme }) => theme.palette.secondary.main};
    }
`;

const LandingPage = () => {
  const theme = useTheme(); // Access the theme context dynamically

  return (
    <LandingPageWrapper theme={theme}>
      <HeroBanner theme={theme}>
        <PhotoWrapper theme={theme}>
          <img src="./timmieM.jpg" alt="Tim Montgomery" />
        </PhotoWrapper>
      </HeroBanner>
      <WelcomeSection theme={theme}>
        <h1>Tim Montgomery</h1>
        <p>Discover my journey, projects, and passion for web development.</p>
      </WelcomeSection>
      <AboutSection theme={theme}>
        <h2>About Tim</h2>
        <p>
        Tim Montgomery is a UI Designer and Front-End Developer with experience working as a contractor for multiple Federal agencies. Tim has a passion for building intuitive, accessible, and visually engaging user interfaces that align with both client objectives and user needs.
        </p>
        <p>
        Throughout his career, Tim has been quick to adapt to changing needs by learning new languages, platforms, techniques, requirements, and more. As such, he has developed a versatile skill set that combines a depth of technical expertise with creative insight. Tim considers himself a life-long-learner and is looking forward to continuing to expand his Front and Back-end skill sets while maintaining his keen eye for quality design and easy-to-use interfaces.
        </p>
        <p>
        Tim is currently seeking a challenging and rewarding opportunity puting his unique skills and perspective to work in the private or public sector. Connect with Tim to learn more about how he can contribute to your Team's mission at{' '}
          <a href="mailto:ctmontgo@gmail.com" target="_blank" rel="noopener noreferrer">
            ctmontgo@gmail.com
          </a>.
        </p>
      </AboutSection>
    </LandingPageWrapper>
  );
};

export default LandingPage;
