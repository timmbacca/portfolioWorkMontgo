import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const HowItsMade: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.2)',
        padding: '15px',
        borderRadius: '8px',
        maxWidth: '800px', 
        margin: '20px auto', 
        textAlign: 'left', 
      }}
    >
      <h2>
        How It's Put Together
      </h2>
      <ul
        style={{
          listStyleType: 'disc',
          margin: 'auto', 
          lineHeight: '1.5',
          textAlign: 'justify', 
          width: '90%', 
          marginBottom: '10px',
          paddingInlineStart: '0px'
        }}
      >
        <li style={{ marginBottom: '10px' }}>
          <strong>Frontend:</strong> Built using <strong>React</strong> with <strong>TypeScript</strong> and styled
          with <strong>Material-UI</strong> for a responsive, modern design. Features modular components for task
          management and form validations.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>Backend:</strong> Developed with <strong>Node.js</strong> and <strong>Express.js</strong>, using
          <strong>TypeScript</strong> for type safety. Provides RESTful endpoints for managing tasks, with robust
          validation and error handling.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>Database:</strong> Powered by <strong>PostgreSQL</strong>, hosted on Google Cloud. Includes a
          well-structured schema for tasks, with default values and constraints, and uses parameterized queries for
          security.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>API Setup:</strong> Integrates the frontend and backend via <strong>Axios</strong>, dynamically
          configured with environment variables for seamless deployment.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>Docker:</strong> Utilizes multi-stage Dockerfiles for both frontend and backend. The frontend is
          built and served using Nginx, while the backend compiles TypeScript and runs the server.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>Git:</strong> Hosted on <strong>GitHub</strong> with branches for feature development and
          production-ready code. Regular, meaningful commits track progress and maintain project stability.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>Deployment:</strong> This site was recently migrated from <strong>Render</strong> to{' '}
          <strong>Google Cloud Platform (GCP)</strong>. Frontend, backend, and PostgreSQL database are now deployed on{' '}
          GCP, with environment variables securely managing configurations for cross-service communication.
        </li>
      </ul>
    </Box>
  );
};

export default HowItsMade;
