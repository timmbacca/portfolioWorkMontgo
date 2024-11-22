import React from 'react';
import './ContactMeStyles.css';

const ContactMe = () => {
  return (
    <div className="contact-container">
      <h1>Get in Touch</h1>
      <p>
        Feel free to reach out for project inquiries, collaboration opportunities, or just to connect!
      </p>
      <div className="contact-info">
        <p>
          <strong>Email:</strong>{' '}
          <a href="mailto:ctmontgo@gmail.com">ctmontgo@gmail.com</a>
        </p>
        <p>
          <strong>LinkedIn:</strong>{' '}
          <a href="https://www.linkedin.com/in/ctmontgo" target="_blank" rel="noopener noreferrer">
            linkedin.com/in/ctmontgo
          </a>
        </p>
        <p>
          <strong>GitHub:</strong>{' '}
          <a href="https://github.com/timmbacca" target="_blank" rel="noopener noreferrer">
          github.com/timmbacca
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactMe;
