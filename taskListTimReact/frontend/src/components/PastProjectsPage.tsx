import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

const ProjectsWrapper = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
  background-color: ${({ theme }) => theme.palette?.background?.default || '#ffffff'};
  color: ${({ theme }) => theme.palette?.text?.primary || '#000000'};
`;

const ProjectImage = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.palette?.primary?.main || '#1976d2'};
  border-radius: 8px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Description = styled.div`
  margin-top: 10px;
  font-size: 1rem;
  color: ${({ theme }) => theme.palette?.text?.secondary || '#555555'};
`;

const EnlargedImageWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const EnlargedImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: ${({ theme }) => theme.palette?.primary?.main || '#1976d2'};
  color: ${({ theme }) => theme.palette?.background?.default || '#ffffff'};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.palette?.secondary?.main || '#f50057'};
  }
`;

const ProjectsPage = () => {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  const projects = [
    {
      image: '/path-to-image1.jpg',
      description: 'Project 1: A sample description of this project.',
    },
    {
      image: '/path-to-image2.jpg',
      description: 'Project 2: Another project description here.',
    },
    {
      image: '/path-to-image3.jpg',
      description: 'Project 3: This is a placeholder description.',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <ProjectsWrapper>
      <h1>Projects</h1>
      <Slider {...settings}>
        {projects.map((project, index) => (
          <div key={index}>
            <ProjectImage
              src={project.image}
              alt={`Project ${index + 1}`}
              onClick={() => setEnlargedImage(project.image)}
            />
            <Description>{project.description}</Description>
          </div>
        ))}
      </Slider>

      {enlargedImage && (
        <EnlargedImageWrapper>
          <EnlargedImage src={enlargedImage} alt="Enlarged Project" />
          <CloseButton onClick={() => setEnlargedImage(null)}>&times;</CloseButton>
        </EnlargedImageWrapper>
      )}
    </ProjectsWrapper>
  );
};

export default ProjectsPage;
