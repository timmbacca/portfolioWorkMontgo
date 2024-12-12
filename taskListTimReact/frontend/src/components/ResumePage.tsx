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
        Experienced Front-End Developer skilled in creating responsive, accessible, and engaging web 
interfaces using modern technologies. Passionate about building user-friendly applications that drive 
business success.
        </p>
      </ResumeSection>

      <ResumeSection>
        <h2>Computer Skills</h2>
        <ul>
          <li>Design and Development Tools: Adobe Creative Suite, Autodesk 3ds Max, VS Code, Eclipse, 
          SVN, Git, SonarQube, Oracle SQL Developer</li>
          <li>Continuous Integration & Cloud Services: Jenkins, Artifactory, Google Cloud Platform (GCP), 
          Render</li>
          <li>Full-Stack Development: Responsive Web Design, Cross-Browser Compatibility, 508/WCAG 
Accessibility, HTML, CSS (SASS/LESS), JavaScript, TypeScript, React, Bootstrap, jQuery, Node.js, 
Express, Java, JSP, JSON, XML, SQL, PostgreSQL, Gradle, Bash</li>
          <li>Project Management & Collaboration: MS Teams, SharePoint, Joomla, VersionOne, Trello, Jira</li>
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
          <li>Contributed to the development of responsive interfaces for various USPS platforms using HTML, 
          CSS, JavaScript, Bootstrap, JSP, React, and TypeScript.</li>
          <li>Created responsive HTML email templates for USPS, ensuring cross-client compatibility.</li>
          <li>Supported Google Cloud operations and DevOps tasks.</li>
          <li>Ensured 508/WCAG compliance through documentation and accessibility workshops.</li>
        </ul>

        <h3>Tiber Creek Consulting | 2009–2015</h3>
        <ul>
          <li>Designed and developed responsive interfaces and themes for National Guard and Department of 
          the Navy portals using HTML, CSS, Bootstrap, and jQuery UI.</li>
          <li>Styled icons, graphics, and branding for multiple platforms while ensuring 508/WCAG compliance.</li>
          <li>Created prototypes and mockups to support portal design and functionality enhancements.</li>
        </ul>

        <h3>Applied Research Associates | 2006–2009</h3>
        <ul>
          <li>Designed 3D assets for military simulation software and visual elements for proposals and 
          marketing materials.</li>
          <li>Produced interactive and print materials, including training content and trade show displays.</li>
        </ul>

        <h3>Surry Community College | 2005–2006</h3>
        <ul>
          <li>Taught Illustration and Computer Design Basics as an adjunct instructor for two semesters.</li>
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
      <StyledLink
        href="/CMontgomery_Resume_2024_Dec.pdf"
        download
        theme={theme}
        style={{ marginTop: '20px', display: 'inline-block' }}
      >
        Download Resume (PDF)
      </StyledLink>
    </ResumeWrapper>
  );
};

export default Resume;
