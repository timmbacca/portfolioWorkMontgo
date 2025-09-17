import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import { StyledLink } from './StyledLink';

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
  const theme = useTheme(); 

  return (
    <ResumeWrapper theme={theme}>
      <h1>Charles T. Montgomery</h1>
      <p>
        Cell: 703-336-9942 | Email:
        <StyledLink href="mailto:ctmontgo@gmail.com" theme={theme}>
          ctmontgo@gmail.com
        </StyledLink>
        <br />
        Website:
        <StyledLink href="https://www.tmontgo.com" target="_blank" rel="noopener noreferrer" theme={theme}>
          www.tmontgo.com
        </StyledLink>
      </p>

      <ResumeSection>
        <h2>Objective</h2>
        <p>
          Innovative UI/UX/Web Developer with extensive experience in building responsive, accessible, and engaging web applications. Eager and passionate about exploring and leveraging AI technologies to push the boundaries of user-friendly website design and development.
        </p>
      </ResumeSection>

      <ResumeSection>
        <h2>Skills</h2> {/* Updated section title */}
        <ul>
          <li><b>Full-Stack Development:</b><br />
            React, TypeScript, JavaScript, Node.js, Express, Java, Django, Python, HTML, CSS, SQL, PostgreSQL, JSON, XML, Bash, Gradle</li>

          <li><b>Graphic Design and UI/UX:</b><br />
            Adobe Creative Suite, Autodesk 3ds Max, Blender, Pixel Studio, DaVinci Resolve, Traditional Studio Art</li>

          <li><b>AI and Emerging Technologies:</b><br />
            ChatGPT, Gemini, Gemini CLI, Gemma 3, Llama 3, Prompt Engineering Techniques (Zero/One/Few-shot, Role, Prompt Chaining, Grounding, RAG)</li>

          <li><b>Tools & Platforms:</b><br />
            ANDI Trusted Tester, SonarQube, Jenkins, Artifactory, Google Cloud Platform (GCP), Google Tag Manager, Render, LM Studio, Firebase, Google AI Studio, Vertex AI, VS Code, Eclipse, Android Studio, Git, SVN</li>

          <li><b>Project Management & Collaboration:</b><br />
            MS Teams, SharePoint, Joomla, VersionOne, Jira</li>
        </ul>
      </ResumeSection>

      <ResumeSection>
        <h2>Projects</h2>
        <h3>
          <StyledLink href="https://www.tmontgo.com" target="_blank" rel="noopener noreferrer" theme={theme}>
            Portfolio Website: www.tmontgo.com
          </StyledLink>
        </h3>
        <ul>
          <li>Built a dynamic React-based website showcasing professional projects, resume, and a "How It's Put Together" section explaining technical approaches.</li>
          <li>Developed a full-stack task management application hosted on the Google Cloud platform, featuring a React frontend, Node.js backend, and PostgreSQL database.</li>
          <li>Integrated features such as CSV file uploads, calendar views, light/dark themes, and metrics dashboards for visualizing task performance and progress.</li>
          <li>Ensured 508/WCAG compliance and implemented Material-UI for a modern, responsive UI.</li>
        </ul>

        <h3>
          <StyledLink href="https://eztarotz.com" target="_blank" rel="noopener noreferrer" theme={theme}>
            Tarot Reading Website: www.eztarotz.com
          </StyledLink>
        </h3>
        <ul>
          <li>Engineered an AI-powered web application providing personalized 3 or 5-card tarot readings by integrating with Google's Gemini API for dynamic interpretations.</li>
          <li>Frontend developed with HTML, CSS, and JavaScript, hosted on Firebase Hosting.</li>
          <li>Backend implemented as a serverless Cloud Function for Firebase, managing API requests and data processing.</li>
        </ul>

        <h3>
          <StyledLink href="https://ezweatherz.com" target="_blank" rel="noopener noreferrer" theme={theme}>
            Ad-Free Weather Website: www.ezweatherz.com
          </StyledLink>
        </h3>
        <ul>
          <li>Developed a clean, ad-free weather application using Next.js and TypeScript, focused on delivering a simple and fast user experience.</li>
          <li>Utilized Docker for containerization and deployed on Google Cloud Run for scalability.</li>
          <li>Sourced real-time weather data from the National Weather Service (NWS) API.</li>
        </ul>
      </ResumeSection>

      <ResumeSection>
        <h2>Education / Certifications</h2> {/* Combined section title */}
        <ul>
          <li>Google Cloud Certification - Generative AI Leader - Series ID 1861</li>
          <li>DHS Trusted Tester Certification (TTv5) TT-2505-07367</li>
          <li>Praxis 2 Exam – Art: Content Knowledge (5134) – 172</li>
          <li>Professional Scrum Master 1 - Scrum.org</li>
          <li>BFA in Media Arts and Animation - Illinois Institute of Art, Schaumburg, IL</li>
          <li>AA in Computer Animation - Art Institute of Atlanta, Atlanta, GA</li>
          <li>AA in Pre-Liberal Arts - Surry Community College, Dobson, NC</li>
          <li>Substitute Teacher (Degreed) - Prince William County Schools, VA</li>
        </ul>
      </ResumeSection>

      <ResumeSection>
        <h2>Employment Experience</h2>

        <h3>Substitute Teacher | Prince William County Schools | 2025-Present</h3>
        <ul>
          <li>Substitute teaching for kindergarten through 12th-grade classes, as well as music and art classes.</li>
        </ul>

        <h3>Frontend Developer | Optimo-IT | 2015–2024</h3>
        <ul>
          <li>Contributed to the development of responsive interfaces for various USPS platforms, including USPS's Informed Delivery™ web application using React, TypeScript, JavaScript, Java, JSP, WebSphere, Spring Boot, and Bootstrap.</li>
          <li>Created responsive HTML email templates for USPS, ensuring cross-email client and web compatibility using Java, HTML, and Litmus.</li>
          <li>Supported Google Cloud operations and DevOps tasks using UNIX, Jenkins, Artifactory, and SonarQube.</li>
          <li>Ensured 508/WCAG compliance through documentation and accessibility workshops.</li>
        </ul>

        <h3>Graphic Web Designer | Tiber Creek Consulting | 2009–2015</h3>
        <ul>
          <li>Created responsive interfaces for National Guard and Department of the Navy portals using HTML, CSS, JavaScript, jQuery, Adobe Flash, SharePoint Designer, and Joomla.</li>
          <li>Styled icons, graphics, and branding for multiple platforms while ensuring 508/WCAG compliance.</li>
          <li>Created prototypes and mockups to support portal design and functionality enhancements.</li>
        </ul>

        <h3>Digital Media Artist | Applied Research Associates | 2006–2009</h3>
        <ul>
          <li>Modeled and Textured 3D assets for military training simulation software and visual elements for proposals and marketing materials using Adobe Creative Suite and Autodesk 3DS Max.</li>
          <li>Produced interactive and print materials, proposal graphics, and trade show displays.</li>
        </ul>

        <h3>Adjunct Instructor | Surry Community College | 2005–2006</h3>
        <ul>
          <li>Instructed Traditional Illustration and Computer Graphic Design as an adjunct instructor for two semesters using Adobe Illustrator, Adobe Photoshop, and Quark Express.</li>
        </ul>
      </ResumeSection>

      <StyledLink
        href="/CMontgomery_Resume_0805.pdf"
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
