import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CarouselStyles.css';

type Project = {
  image: string;
  description: string;
};

const projects: Project[] = [
  { image: '/idDD.jpg', description: 'USPS Informed Delivery user interface to enhance mail preview accessibility for households. Focused on optimizing visual layouts and mobile responsiveness for a seamless user experience.' },
  { image: '/informed-delivery-screenshot.png', description: 'USPS Informed Delivery sign-up portal. Integrated clear visual cues and simple navigation to improve user onboarding and increase subscription rates.' },
  { image: '/id-package-image.jpg', description: 'USPS Informed Delivery tracking interface. Prioritized clarity and efficiency to allow users to easily track mailpieces and packages on the go.' },
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

  useEffect(() => {
    if (mainSliderRef.current && thumbSliderRef.current) {
      setMainSlider(mainSliderRef.current);
      setThumbSlider(thumbSliderRef.current);
    }
  }, [mainSliderRef, thumbSliderRef]);

  const mainSettings = {
    asNavFor: thumbSlider || undefined, // Only pass a valid instance
    ref: mainSliderRef,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const thumbSettings = {
    asNavFor: mainSlider || undefined, // Only pass a valid instance
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
      {/* Main Slider */}
      <Slider {...mainSettings}>
        {projects.map((project, index) => (
          <div key={index}>
            <img
              src={project.image}
              alt={project.description}
              style={{ width: '100%', height: 'auto', maxHeight: '400px' }}
            />
            <p style={{ textAlign: 'center', marginTop: '10px' }}>{project.description}</p>
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
