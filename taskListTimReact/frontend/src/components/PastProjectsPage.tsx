import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CarouselStyles.css';

const projects = [
  {
    image: '/idDD.jpg',
    description: 'Informed Delivery Desktop',
  },
  {
    image: '/informed-delivery-screenshot.png',
    description: 'Informed Delivery Desktop',
  },
  {
    image: '/id-package-image.jpg',
    description: 'Informed Delivery Desktop',
  },
  {
    image: '/natguardg1personnelgateway.jpg',
    description: 'Project 1: A sample description of this project.',
  },
  {
    image: '/ngEdu.jpg',
    description: 'Project 3: This is a placeholder description.',
  },
  {
    image: '/MGMTmockContactInfo.jpg',
    description: 'Project 1: A sample description of this project.',
  },
  {
    image: '/ccportal.png',
    description: 'Project 2: Another project description here.',
  },
  {
    image: '/FORMbrn.jpg',
    description: 'Project 3: This is a placeholder description.',
  },
  {
    image: '/arngPositionLocator.jpg',
    description: 'Project 1: A sample description of this project.',
  },
  {
    image: '/careerplanfull.jpg',
    description: 'Project 2: Another project description here.',
  },
  {
    image: '/companybanners.jpg',
    description: 'Project 1: A sample description of this project.',
  },
  {
    image: '/FORMbrn.jpg',
    description: 'Project 2: Another project description here.',
  },
  {
    image: '/c130.jpg',
    description: 'Project 3: This is a placeholder description.',
  },
];

const ProjectsCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i: number) => (
      <img
        src={projects[i].image}
        alt={`Thumbnail ${i + 1}`}
        style={{
          height: '50px',
          width: '50px',
          objectFit: 'cover',
          borderRadius: '5px',
        }}
      />
    ),
    dotsClass: 'slick-dots slick-thumb',
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {projects.map((project, index) => (
          <div key={index}>
            <img
              src={project.image}
              alt={project.description}
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'contain',
              }}
            />
            <p style={{ textAlign: 'center' }}>{project.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProjectsCarousel;
