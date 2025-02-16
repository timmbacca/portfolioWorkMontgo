import React from "react";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Type for OWASP Item
type OWASPItem = {
  name: string;
  description: string;
  url: string;
};

// Static OWASP Top 10 Data
const owaspTop10: OWASPItem[] = [
  {
    name: "A01:2021 – Broken Access Control",
    description: "Restrictions on authenticated users are not properly enforced.",
    url: "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
  },
  {
    name: "A02:2021 – Cryptographic Failures",
    description: "Sensitive data is not adequately protected.",
    url: "https://owasp.org/Top10/A02_2021-Cryptographic_Failures/",
  },
  {
    name: "A03:2021 – Injection",
    description: "Untrusted data is sent to an interpreter as part of a command or query.",
    url: "https://owasp.org/Top10/A03_2021-Injection/",
  },
  {
    name: "A04:2021 – Insecure Design",
    description: "Security weaknesses are caused by design flaws.",
    url: "https://owasp.org/Top10/A04_2021-Insecure_Design/",
  },
  {
    name: "A05:2021 – Security Misconfiguration",
    description: "Improperly configured systems or components create vulnerabilities.",
    url: "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/",
  },
  {
    name: "A06:2021 – Vulnerable and Outdated Components",
    description: "Using outdated or vulnerable software introduces security risks.",
    url: "https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/",
  },
  {
    name: "A07:2021 – Identification and Authentication Failures",
    description: "Authentication mechanisms are improperly implemented.",
    url: "https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/",
  },
  {
    name: "A08:2021 – Software and Data Integrity Failures",
    description: "Code and infrastructure are vulnerable to supply chain attacks.",
    url: "https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/",
  },
  {
    name: "A09:2021 – Security Logging and Monitoring Failures",
    description: "Insufficient logging and monitoring enable undetected attacks.",
    url: "https://owasp.org/Top10/A09_2021-Security_Logging_and_Monitoring_Failures/",
  },
  {
    name: "A10:2021 – Server-Side Request Forgery (SSRF)",
    description: "Untrusted input causes the server to make unauthorized requests.",
    url: "https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_(SSRF)/",
  },
];

// Styled Components with Fallbacks
const PageWrapper = styled.div<{ theme: any }>`
  padding: 20px;
  max-width:600px;
  margin: 0 auto;
  text-align: left;
  background-color: ${({ theme }) => theme?.palette?.background?.default};
  color: ${({ theme }) => theme?.palette?.text?.primary};
`;

const HeaderSection = styled.div`
  margin-bottom: 30px;
`;

const ResourcesSection = styled.div`
  margin-top: 10px;

  h2 {
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      margin-bottom: 10px;

      a {
        color: ${({ theme }) => theme?.palette?.primary?.main};
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const ToolsSection = styled.div`
  margin-top: 30px;

  h2 {
    margin-bottom: 10px;
  }

  img {
    max-width: 100%;
    height: auto;
    margin-top: 10px;
    background-color: ${({ theme }) => theme.palette?.background?.default};
    color: ${({ theme }) => theme.palette?.text?.primary};
    border: 1px solid ${({ theme }) => theme.palette?.primary?.main};
    margin-bottom: 20px;
  }
`;

const OWASPPage = () => {
  const theme = useTheme();

  return (
    <PageWrapper theme={theme}>
      {/* Header Section */}
      <HeaderSection>
        <Typography variant="h4" component="h1" gutterBottom>
          OWASP Top 10
        </Typography>
        <Typography variant="body1">
          The OWASP Top 10 is a standard awareness document for developers and
          web application security. It represents a broad consensus about the
          most critical security risks to web applications. I strive to follow these principles in every project I work on by conducting thorough security reviews, adhering to best practices, and implementing proactive measures to mitigate potential vulnerabilities during development.
        </Typography>
      </HeaderSection>

      {/* Top 10 Accordion */}
      <Typography variant="h5" component="h2" gutterBottom>
        Top 10 Vulnerabilities
      </Typography>
      {owaspTop10.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{`${index + 1}. ${item.name}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">{item.description}</Typography>
            <Typography variant="body2">
              <strong>Learn more:</strong>{" "}
              <MuiLink
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.name}
              </MuiLink>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

       {/* Security Tools Section */}
       <ToolsSection>
        <Typography variant="h5" component="h2">
          How I Ensure Security Compliance
        </Typography>
        <Typography variant="body1">
          I use various tools to validate my work and ensure that my projects adhere to security best practices:
        </Typography>
        <Typography variant="h6">SonarQube Analysis</Typography>
        <Typography variant="body2">
          I regularly run my projects through SonarQube to identify security vulnerabilities and code quality issues.
        </Typography>
        <img src="./sonarQube.png" alt="SonarQube analysis screenshot" />

        <Typography variant="h6">Security Headers Scanner</Typography>
        <Typography variant="body2">
        To ensure my website's security, I regularly test it using SecurityHeaders.com, a tool that provides a comprehensive analysis of security headers. 
        This helps me monitor and improve my site's defense against attacks such as XSS, clickjacking, and data leaks. 
        </Typography>
        <img src="./securityHeadersTest.png" alt="Security Headers screenshot" />

        <Typography variant="h6">ANDI Accessibility Checker</Typography>
        <Typography variant="body2">
          I leverage the ANDI tool to ensure compliance with accessibility standards and improve user experience for all.
        </Typography>
        <img src="./andi.png" alt="ANDI tool screenshot" />
      </ToolsSection>

      {/* Additional Resources */}
      <ResourcesSection>
        <Typography variant="h5" component="h2">
          Additional Resources
        </Typography>
        <ul>
          <li>
            <MuiLink
              href="https://owasp.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Official Website
            </MuiLink>
          </li>
          <li>
            <MuiLink
              href="https://owasp.org/Top10/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Top 10 Project
            </MuiLink>
          </li>
          <li>
            <MuiLink
              href="https://www.cisa.gov/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CISA Security Resources
            </MuiLink>
          </li>
          <li>
            <MuiLink
              href="https://www.sonarqube.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SonarQube - Code Quality and Security Analysis
            </MuiLink>
          </li>
          <li>
            <MuiLink
              href="https://www.securityheaders.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Security Headers - Scan your site now
            </MuiLink>
          </li>
          <li>
            <MuiLink
              href="https://www.ssa.gov/accessibility/andi/help/install.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              ANDI - Accessibility Testing Tool
            </MuiLink>
          </li>
        </ul>
      </ResourcesSection>
    </PageWrapper>
  );
};

export default OWASPPage;
