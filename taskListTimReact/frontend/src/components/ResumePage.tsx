import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import { StyledLink } from './StyledLink'; // Import the StyledLink component

const ResumeWrapper = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.palette?.background?.default || '#ffffff'};
  color: ${({ theme }) => theme.palette?.text?.primary || '#000000'};
  border: 1px solid ${({ theme }) => theme.palette?.primary?.main || '#1976d2'};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ResumeSection = styled.div`
  margin-bottom: 20px;
  text-align: left;

  h2,
  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p,
  ul {
    font-size: 1rem;
    line-height: 1.6;
    text-align: left;
  }

  ul {
    margin-left: 20px;
  }

  li {
    margin-bottom: 5px;
  }
`;

const Resume = () => {
  const theme = useTheme(); // Access theme

  return (
    <ResumeWrapper theme={theme}>
      <h1>Charles T. Montgomery</h1>
      <p>
        Cell: 703-336-9942 • Email: 
        <StyledLink href="mailto:ctmontgo@gmail.com" theme={theme}>
          ctmontgo@gmail.com
        </StyledLink>
      </p>

      <ResumeSection>
        <h2>Objective</h2>
        <p>
          Experienced Developer seeking a challenging position to design and develop engaging websites, user interfaces, and mobile applications. Aiming to utilize cutting-edge technologies to enhance the effectiveness of web/mobile applications.
        </p>
      </ResumeSection>

      <ResumeSection>
        <h2>Computer Skills</h2>
        <ul>
          <li>Design Software: Adobe Creative Suite, Corel Painter, Procreate</li>
          <li>3D Tools: Blender, Autodesk Maya, 3D Studio Max</li>
          <li>Programming: HTML, CSS, JavaScript, TypeScript, React, Node.js, Java, SQL (MySQL, Oracle SQL, PostgreSQL), </li>
          <li>Cloud: Google Cloud Platform, Render</li>
          <li>Project Management: Jira, Trello, Version One, Microsoft Teams</li>
          <li>Accessibility: 508 and WCAG compliance</li>
        </ul>
      </ResumeSection>

      <ResumeSection>
        <h2>Certification</h2>
        <ul>
          <li>Certified Scrum Master (CSM)</li>
        </ul>
      </ResumeSection>

      <ResumeSection>
        <h2>Employment Experience</h2>
        <h3>Optimo-IT | 2015–2024</h3>
        <ul>
          <li>Designed and maintained websites and portals.</li>
          <li>Developed React applications with TypeScript and integrated APIs.</li>
          <li>Created responsive HTML/CSS email templates tested across clients.</li>
          <li>Performed DevOps tasks using Jenkins, Gradle, and Google Cloud.</li>
        </ul>

        <h3>Tiber Creek Consulting | 2009–2015</h3>
        <ul>
          <li>Created responsive web pages and UI mockups for National Guard and Army Reserve portals.</li>
          <li>Updated web portals using Bootstrap and jQuery UI for responsive layouts.</li>
          <li>Themed multiple military websites for consistency and accessibility.</li>
        </ul>

        <h3>Applied Research Associates | 2006–2009</h3>
        <ul>
          <li>Modeled 3D military vehicles and equipment for simulations.</li>
          <li>Created graphics for proposals, brochures, and presentations.</li>
          <li>Developed interactive Adobe Flash training materials.</li>
        </ul>
      </ResumeSection>

      <ResumeSection>
        <h2>Education</h2>
        <ul>
          <li>B.F.A., Media Arts and Animation - Illinois Institute of Art</li>
          <li>A.A., Computer Animation - Art Institute of Atlanta</li>
          <li>A.A., Pre-Liberal Arts - Surry Community College</li>
        </ul>
      </ResumeSection>

    </ResumeWrapper>
  );
};

export default Resume;
