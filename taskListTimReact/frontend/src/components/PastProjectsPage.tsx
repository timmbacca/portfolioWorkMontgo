import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import './CarouselStyles.css';
import { useTheme } from '@mui/material/styles';
import { StyledLink } from './StyledLink';

type Project = {
  image: string;
  description: string;
  url?: string;
};

const projects: Project[] = [
  {
    image: '/eztarotz.png',
    url: 'https://eztarotz.com', 
    description: 'eztarotz.com - AI-Powered Tarot Reading Web Application. This modern web application provides users with personalized 3 or 5-card tarot readings, leveraging the power of Google’s Gemini API for insightful interpretations. Users can perform a spread, and the application’s backend service queries the Gemini API to generate dynamic, context-aware interpretations of the cards in their specific positions, offering a unique and engaging experience. The frontend is built with HTML, CSS, and JavaScript, deployed globally via Firebase Hosting, while the backend logic is implemented as a serverless Cloud Function for Firebase, securely handling API requests and integrating seamlessly with the frontend.'
  },
  {
    image: '/simpleweather.png',
    url: 'https://ezweatherz.com',
    description: 'ezweatherz.com - Ad-Free Weather Application This project is a clean, ad-free weather application engineered for a simple and fast user experience. It was developed in response to the prevalence of intrusive pop-ups and advertisements on many existing weather websites. The application leverages Next.js and TypeScript for a robust frontend, is containerized with Docker, and deployed on Google Cloud Run for high availability and scalability. Weather data is reliably sourced from the National Weather Service (NWS) API.'
  },
  
  { image: '/natguardg1personnelgateway.jpg', description: 'Army National Guard G1 Personnel Gateway, streamlining access to HR resources for soldiers, veterans, and families. Implemented user-friendly features such as announcements, news highlights, and quick access to essential tools and programs.' },
  { image: '/ngEdu.jpg', description: 'National Guard Patriot Academy website mockup, showcasing programs aimed at providing education and career opportunities for recruits.' },
  { image: '/MGMTmockContactInfo.jpg', description: 'ESC Single Source Tracker, a comprehensive tool for managing soldier information and actions. Developed an interface for accessing and updating detailed soldier profiles, contact information, and uploaded files, ensuring a user-friendly experience for military personnel management.' },
  { image: '/ccportal.png', description: 'Supported the user interface design and front-end development of the G1 Portal, a centralized platform for managing personnel information and career-related data. Created interactive components to streamline soldier search functionality and ensure seamless access to detailed profiles and administrative tools.' },
  { image: '/FORMbrn.jpg', description: 'Played a key role in designing and implementing the front-end for the G1 Portal’s personnel management interface. Enhanced the visualization of authorized and unauthorized positions, providing a clear, interactive overview for streamlined resource tracking and allocation.' },
  { image: '/arngPositionLocator.jpg', description: 'Contributed to the front-end development of the ARNG Career Center’s Position Locator tool. Integrated interactive map functionality to assist users in identifying and navigating career opportunities within specific geographic regions.' },
  { image: '/careerplanfull.jpg', description: 'Contributed to the design and front-end development of the ARNG G1 Personnel Gateway career planning tool. Created an interactive interface to visually compare individual performance metrics against peer benchmarks, enhancing user engagement and clarity.' },
  { image: '/companybanners.jpg', description: 'Designed a series of visually impactful banners for various Army National Guard programs, including the Career Center, Civilian Employment Information, and Warrant Officer initiatives. Focused on incorporating brand elements and imagery to convey professionalism and engage target audiences effectively.' },
  { image: '/c130.jpg', description: 'Created detailed 3D models of military vehicles like the C-130 aircraft for training simulations, ensuring accurate structures and textures. Used Autodesk 3ds Max and Adobe Photoshop to deliver immersive and realistic designs.' },
];

const PastProjectsPage: React.FC = () => {
  const mainSliderRef = useRef<Slider>(null);
  const thumbSliderRef = useRef<Slider>(null);

  const [mainSlider, setMainSlider] = useState<Slider | null>(null);
  const [thumbSlider, setThumbSlider] = useState<Slider | null>(null);

  const theme = useTheme(); 

  useEffect(() => {
    if (mainSliderRef.current && thumbSliderRef.current) {
      setMainSlider(mainSliderRef.current);
      setThumbSlider(thumbSliderRef.current);
    }
  }, [mainSliderRef, thumbSliderRef]);

  const mainSettings = {
    asNavFor: thumbSlider || undefined,
    ref: mainSliderRef,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, 
    prevArrow: <button className="slick-prev">‹</button>,
    nextArrow: <button className="slick-next">›</button>,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true, 
        },
      },
    ],
  };

  const thumbSettings = {
    asNavFor: mainSlider || undefined, 
    ref: thumbSliderRef,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <div className="carousel-container">

    {/* Instruction for users */}
    <p style={{ textAlign: 'center', fontSize: '1rem', marginBottom: '10px'}}>
      Swipe left to browse projects.
    </p>

      {/* Main Slider */}
    <Slider {...mainSettings}>
      {projects.map((project, index) => (
        <div key={index}>
          {/* Conditionally render <a> tag around the image if a URL exists */}
          {project.url ? (
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              <img
                src={project.image}
                alt={project.description.split(' - ')[0]}
                style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
              />
            </a>
          ) : (
            <img
              src={project.image}
              alt={project.description}
              style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
            />
          )}

          <p style={{ textAlign: 'center', marginTop: '10px', padding: '10px' }}>
            {/* Conditionally render StyledLink around the project name in description */}
            {project.url ? (
              <>
                <StyledLink href={project.url} target="_blank" rel="noopener noreferrer" theme={theme}>
                  {project.description.split(' - ')[0]} {/* "eztarotz.com" or "ezweatherz.com" */}
                </StyledLink>
                {" - "} {/* Add back the " - " separator */}
                {project.description.split(' - ').slice(1).join(' - ')} {/* Rest of the description */}
              </>
            ) : (
              project.description
            )}
          </p>
        </div>
      ))}
    </Slider>

      {/* Thumbnail Slider */}
      <Slider {...thumbSettings}>
        {projects.map((project, index) => (
          <div key={index}>
            <img
              src={project.image}
              alt={`Thumbnail ${index + 1}`}
              style={{
                height: '60px',
                width: 'auto',
                objectFit: 'cover',
                borderRadius: '5px',
                margin: '0 auto',
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PastProjectsPage;
