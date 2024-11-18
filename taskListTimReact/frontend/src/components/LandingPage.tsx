import React from 'react';
import styled from 'styled-components';

const LandingPageWrapper = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.palette?.background?.default || '#ffffff'};
`;

const HeroBanner = styled.section`
  width: 100%;
  height: 300px; /* Adjust height as needed */
  background: url('/path-to-hero-banner-graphic.png') no-repeat center center;
  background-size: cover;
  position: relative;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PhotoWrapper = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid ${({ theme }) => theme.palette?.primary?.main || '#1976d2'};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const WelcomeSection = styled.section`
  margin-bottom: 40px;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.palette?.text?.primary || '#000000'};
  }

  p {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.palette?.text?.secondary || '#555555'};
  }
`;

const AboutSection = styled.section`
  max-width: 800px;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.palette?.text?.primary || '#000000'};
    margin-bottom: 20px;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.palette?.text?.secondary || '#555555'};
  }
`;

const LandingPage = () => {
  return (
    <LandingPageWrapper>
      <HeroBanner>
        <PhotoWrapper>
          <img src="/path-to-your-photo.jpg" alt="Tim Montgomery" />
        </PhotoWrapper>
      </HeroBanner>
      <WelcomeSection>
        <h1>Tim Montgomery</h1>
        <p>Discover my journey, projects, and passion for web development.</p>
      </WelcomeSection>
      <AboutSection>
        <h2>About Me</h2>
        <p>
          Hi! I’m Tim Montgomery, a passionate web developer with over 20 years of experience
          creating innovative and user-friendly web applications. My expertise spans front-end
          and back-end development, with a focus on technologies like React, Node.js, TypeScript,
          and MySQL.
        </p>
        <p>
          I take pride in crafting accessible and visually appealing websites that solve real-world
          problems. Beyond coding, I’m a creative thinker, a problem solver, and an advocate for
          clean, maintainable code.
        </p>
        <p>
          When I’m not working on development projects, I enjoy exploring new technologies,
          spending time with my family, and indulging in hobbies like gaming and Taekwondo.
        </p>
      </AboutSection>
    </LandingPageWrapper>
  );
};

export default LandingPage;
