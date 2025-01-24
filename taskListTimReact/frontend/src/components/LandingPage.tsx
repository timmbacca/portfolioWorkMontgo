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
          <img src="./timmieM.webp" alt="Tim Montgomery" />
        </PhotoWrapper>
      </HeroBanner>
      <WelcomeSection theme={theme}>
        <h1>Tim Montgomery</h1>
        <p>Discover my journey, projects, and passion for web development.</p>
      </WelcomeSection>
      <AboutSection theme={theme}>
        <h2>About Tim</h2>
        <p>
        Tim Montgomery is a Front-End Developer and UI Designer with nearly two decades of experience working with both Federal agencies and private-sector clients. With expertise in React, TypeScript, Java, and a range of modern web technologies, Tim specializes in building responsive, accessible, and visually engaging user interfaces that meet both client objectives and user needs.
        </p>
        <p>
        A lifelong learner, Tim is always eager to expand his expertise in both front-end and back-end technologies, maintaining a keen eye for quality design and usability. Whether it's creating intuitive dashboards or ensuring Section 508 compliance, Tim is dedicated to crafting user-friendly, impactful applications.
        </p>
        <p>
        Currently, Tim is exploring new opportunities where he can apply his diverse skill set to support dynamic teams in achieving their mission. Connect with Tim at{' '}
          <a href="mailto:ctmontgo@gmail.com" target="_blank" rel="noopener noreferrer">
            ctmontgo@gmail.com
          </a>.
        </p>
      </AboutSection>
    </LandingPageWrapper>
  );
};

export default LandingPage;
